import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import { IoMdAddCircle } from "react-icons/io";
import { AnimatePresence } from "motion/react";
import { fetchTasks } from "../actions/fetchTasks";

export default function Tasks() {
  const [openForm, setOpenForm] = useState(false);
  useEffect(() => {
    document.title = "Tasks";
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data, error } = await fetchTasks();
        if (error) {
          // setError(error.message);
        } else {
          //setTasks(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        //setError("Failed to fetch tasks.");
      }
    };

    getTasks();
  }, []);

  return (
    <div className="dark:text-white">
      <header>
        <button
          onClick={() => setOpenForm(true)}
          className="cursor-pointer flex items-center gap-2 p-1 bg-yellow-500 rounded"
        >
          <IoMdAddCircle />
          <span>Add task</span>
        </button>
      </header>
      <AnimatePresence>
        {openForm && <AddTaskForm setOpenForm={setOpenForm} />}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import { IoMdAddCircle } from "react-icons/io";
import { AnimatePresence } from "motion/react";

export default function Tasks() {
  const [openForm, setOpenForm] = useState(false);
  useEffect(() => {
    document.title = "Tasks";
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

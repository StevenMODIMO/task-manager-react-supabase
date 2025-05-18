import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import { IoMdAddCircle } from "react-icons/io";
import { AnimatePresence } from "motion/react";
import { fetchTasks } from "../actions/fetchTasks";
import { type TaskTypes } from "../types/types";
import { supabase } from "../supabase-client";

export default function Tasks() {
  const [openForm, setOpenForm] = useState(false);
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  useEffect(() => {
    document.title = "Tasks";
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data, error } = await fetchTasks();
        if (error) {
          console.log(error.message);
        } else {
          setTasks(data ?? []);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        console.log("Failed to fetch tasks.");
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("tasks-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          const newTasks = payload.new as TaskTypes;
          setTasks((prev) => [newTasks, ...prev]);
        }
      )
      .subscribe((status) => {
        console.log(status);
      });
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
      <section>
        {tasks.map(
          ({
            id,
            title,
            description,
            priority,
            completed,
            status,
            created_at,
          }) => (
            <main key={id}>
              <h2 className="font-semibold text-lg">{title}</h2>
            </main>
          )
        )}
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import { IoMdAddCircle } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { AnimatePresence } from "motion/react";
import { fetchTasks } from "../actions/fetchTasks";
import { type TaskTypes } from "../types/types";
import { supabase } from "../supabase-client";
import EditTaskForm from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";

export default function Tasks() {
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

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

    // Listen for INSERT events
    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "tasks" },
      (payload) => {
        const newTask = payload.new as TaskTypes;
        setTasks((prev) => [...prev, newTask]);
      }
    );

    // Listen for DELETE events
    channel.on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "tasks" },
      (payload) => {
        const deletedTask = payload.old as TaskTypes;
        setTasks((prev) => prev.filter((task) => task.id !== deletedTask.id));
      }
    );

    // Subscribe to the channel
    channel.subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="dark:text-white">
      <header className="mb-4">
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
      <AnimatePresence>
        {openEditForm && (
          <EditTaskForm
            setOpenEditForm={setOpenEditForm}
            id={projectId as number}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openDelete && (
          <DeleteTask id={projectId as number} setOpenDelete={setOpenDelete} />
        )}
      </AnimatePresence>

      <section className="overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-yellow-500 text-white">
              <th className="p-2 rounded">ID</th>
              <th className="p-2 rounded">Title</th>
              <th className="p-2 rounded">Description</th>
              <th className="p-2 rounded">Priority</th>
              <th className="p-2 rounded">Completed</th>
              <th className="p-2 rounded">Status</th>
              <th className="p-2 rounded">Created At</th>
              <th className="p-2 rounded">Actions</th>
            </tr>
          </thead>
          <tbody>
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
                <tr key={id} className="border-b border-gray-700">
                  <td className="p-2">{id}</td>
                  <td className="p-2 font-semibold text-lg">{title}</td>
                  <td className="p-2">{description}</td>
                  <td className="p-2">{priority}</td>
                  <td className="p-2">
                    {completed ? "Completed" : "Not completed"}
                  </td>
                  <td className="p-2">{status}</td>
                  <td className="p-2">
                    {new Date(created_at)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </td>
                  <td className="p-2 flex items-center gap-2">
                    <MdEdit
                      onClick={() => {
                        setOpenEditForm(true);
                        setProjectId(id);
                      }}
                      className="text-blue-500 cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => {
                        setOpenDelete(true);
                        setProjectId(id);
                      }}
                      className="text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

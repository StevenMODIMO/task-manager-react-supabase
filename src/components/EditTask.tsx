import {
  useState,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
} from "react";
import { IoIosCreate } from "react-icons/io";
import { RiProgress5Fill } from "react-icons/ri";
import {
  MdCancel,
  MdOutlineTitle,
  MdDescription,
  MdLowPriority,
} from "react-icons/md";
import { motion } from "motion/react";
import { updateTask } from "../actions/updateTask";
import type { TaskTypes } from "../types/types";

interface FormProps {
  setOpenEditForm: Dispatch<SetStateAction<boolean>>;
  task: TaskTypes;
}

export default function EditTaskForm({ setOpenEditForm, task }: FormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed ?? false);
  const [status, setStatus] = useState(task.status ?? "todo");
  const [priority, setPriority] = useState(task.priority);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const validateForm = () => {
    if (title.trim().length < 3) {
      return "Title must be at least 3 characters.";
    }
    if (title.trim().length > 100) {
      return "Title must be less than 100 characters.";
    }
    if (description.trim().length < 5) {
      return "Description must be at least 5 characters.";
    }
    if (description.trim().length > 300) {
      return "Description must be less than 300 characters.";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const { error } = await updateTask({
      title,
      description,
      priority,
      status,
      completed,
      id: task.id,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      setMessage(null);
      return;
    }

    setTitle("");
    setDescription("");
    setPriority("low");
    setError(null);
    setMessage("Task edited successfully!");
    setOpenEditForm(false);
  };

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      exit={{ translateX: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col gap-4 fixed top-0 left-0 bg-[#242424] w-full h-full sm:w-[50%] sm:right-0 sm:left-auto lg:w-[30%]"
    >
      <header className="h-[12%] bg-yellow-500 text-black dark:text-white flex items-center justify-between px-4 font-semibold text-lg">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <IoIosCreate />
          <h1>Update task with id: {task.id}</h1>
        </div>
        <div onClick={() => setOpenEditForm(false)} className="cursor-pointer">
          <MdCancel />
        </div>
      </header>

      <div className="flex-grow flex flex-col justify-center px-4">
        <form
          onFocus={() => {
            setError(null);
            setMessage(null);
          }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-white dark:text-yellow-500"
        >
          <label className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlineTitle className="dark:text-yellow-500" />
              <span className="dark:text-white">Task title</span>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className={`p-1 rounded outline-none border dark:text-white ${
                error?.includes("Title") ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Task title (3-100 characters)"
            />
          </label>

          <label className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdDescription className="dark:text-yellow-500" />
              <span className="dark:text-white">Task description</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`p-1 h-20 rounded outline-none border dark:text-white ${
                error?.includes("Description")
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Task description (5-300 characters)"
            />
          </label>

          <label className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdLowPriority className="dark:text-yellow-500" />
              <span className="dark:text-white">Priority</span>
            </div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-1 rounded outline-none dark:bg-black"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="dark:text-white">Mark as completed</span>
          </label>
          <label className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RiProgress5Fill className="dark:text-yellow-500" />
              <span className="dark:text-white">Task status</span>
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-1 rounded outline-none dark:bg-black"
            >
              <option value="todo">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          {loading ? (
            <div className="flex items-center gap-2 justify-center bg-yellow-500 w-fit mx-auto p-2 rounded text-white text-sm">
              <div className="rounded-full w-5 h-5 border-2 border-white animate-spin border-t-transparent"></div>
              <span>Updating task...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="cursor-pointer bg-yellow-400 dark:text-black p-2 text-sm w-fit mx-auto rounded"
            >
              Update task
            </button>
          )}

          {error && (
            <div className="bg-red-500 text-white text-xs p-2 rounded w-full mx-auto text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500 text-white text-xs p-2 rounded w-full mx-auto text-center">
              {message}
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
}

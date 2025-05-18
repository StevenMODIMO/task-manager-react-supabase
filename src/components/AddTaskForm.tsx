import { useState, type Dispatch, type SetStateAction } from "react";
import { IoIosCreate } from "react-icons/io";
import {
  MdCancel,
  MdOutlineTitle,
  MdDescription,
  MdLowPriority,
} from "react-icons/md";
import { motion } from "motion/react";
import { supabase } from "../supabase-client";

interface FormProps {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}

export default function AddTaskForm({ setOpenForm }: FormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      exit={{ translateX: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col gap-4 fixed top-0 left-0 bg-white dark:bg-[rgba(0,0,0,0.5)] w-full h-full sm:w-[50%] sm:right-0 sm:left-auto"
    >
      <header className="h-[12%] bg-yellow-500 text-black dark:text-white flex items-center justify-between px-4 font-semibold text-lg">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <IoIosCreate />
          <h1>New task</h1>
        </div>
        <div onClick={() => setOpenForm(false)} className="cursor-pointer">
          <MdCancel />
        </div>
      </header>
      <div>
        <form className="flex flex-col gap-4 text-black dark:text-yellow-500">
          <label className="flex flex-col gap-2 mx-4">
            <div className="flex items-center gap-2">
              <MdOutlineTitle className="dark:text-yellow-500" />
              <span className="dark:text-white">Task title</span>
            </div>
            <input
              type="text"
              className="p-2 rounded outline-none border"
              placeholder="Task title"
            />
          </label>
          <label className="flex flex-col gap-2 mx-4">
            <div className="flex items-center gap-2">
              <MdDescription className="dark:text-yellow-500" />
              <span className="dark:text-white">Task description</span>
            </div>
            <textarea
              className="p-2 h-24 rounded outline-none border"
              placeholder="Task description"
            />
          </label>
          <label className="flex flex-col gap-2 mx-4">
            <div className="flex items-center gap-2">
              <MdLowPriority className="dark:text-yellow-500" />
              <span className="dark:text-white">Priority</span>
            </div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-2 rounded outline-none dark:bg-black"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <button className="bg-yellow-400 dark:text-black p-2 text-sm w-fit mx-auto rounded">
            Add task
          </button>
        </form>
      </div>
    </motion.div>
  );
}

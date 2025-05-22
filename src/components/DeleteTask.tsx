import { type Dispatch, type SetStateAction, useState } from "react";
import { motion } from "motion/react";
import { IoIosWarning } from "react-icons/io";
import { MdAutoDelete, MdCancel } from "react-icons/md";
import { deleteTask } from "../actions/deleteTask";

interface DeleteProps {
  id: number;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteTask({ id, setOpenDelete }: DeleteProps) {
  const [loading, setLoading] = useState(false);

  const deleteTaskHandler = async () => {
    setLoading(true);
    const { error } = await deleteTask(id);
    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      setLoading(false);
      setOpenDelete(false);
    }
  };
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="bg-[rgba(0,0,0,0.5)] h-full w-full absolute left-0 top-0 flex items-center justify-center backdrop-blur-xs"
    >
      <div className="border border-orange-500 p-2 rounded flex flex-col text-white gap-3 mx-4">
        <div className="flex flex-col items-center gap-2">
          <IoIosWarning className="text-3xl" />
          <span className="text-orange-500 font-bold text-center">
            Are you sure you want to delete task with id: {id}
          </span>
        </div>
        {!loading ? (
          <div className="flex justify-between text-sm">
            <button
              onClick={deleteTaskHandler}
              className="flex items-center gap-1 text-sm text-orange-500 w-fit mx-auto p-2 rounded bg-white"
            >
              <MdAutoDelete className="text-xl" />
              Delete Task
            </button>
            <button
              onClick={() => setOpenDelete(false)}
              className=" flex items-center gap-1 text-sm text-red-500 w-fit mx-auto p-2 rounded bg-white"
            >
              <MdCancel className="text-xl" />
              Cancel
            </button>
          </div>
        ) : (
          <div className="border-t-transparent border-2 border-orange-500 rounded-full h-5 w-5 mx-auto animate-spin"></div>
        )}
      </div>
    </motion.div>
  );
}

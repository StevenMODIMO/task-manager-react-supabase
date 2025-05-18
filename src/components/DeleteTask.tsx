import { type Dispatch, type SetStateAction } from "react";
import { motion } from "motion/react";

interface DeleteProps {
  id: number;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteTask({ id, setOpenDelete }: DeleteProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0.8 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="bg-[rgba(0,0,0,.5)] h-full w-full lg:w-[90%] absolute top-0 flex items-center justify-center"
    >
      <div className="bg-red-500 p-2 rounded flex flex-col text-white gap-3 mx-4">
        <h1 className="text-xs lg:text-sm">
          Are you sure you want to delete task with id: {id}
        </h1>
        <div className="flex justify-between text-sm">
          <button className="w-fit mx-auto p-2 rounded bg-white text-black">
            Delete Task
          </button>
          <button
            onClick={() => setOpenDelete(false)}
            className="w-fit mx-auto p-2 rounded bg-white text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

import { NavLink } from "react-router-dom";
import {
  MdHomeFilled,
  MdAccountCircle,
  MdOutlineSettings,
} from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { FaHourglassStart } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";

export default function Header() {
  return (
    <nav className="fixed bottom-0 flex justify-center py-4 w-full lg:w-fit lg:top-0 lg:py-0">
      <div className="flex items-center gap-4 mx-6 bg-yellow-500 dark:bg-[#313131] py-2 px-4 rounded-3xl lg:rounded-none lg:px-2 lg:gap-6 md:py-4 lg:items-start lg:flex-col lg:mx-0 lg:h-screen">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500  flex flex-col items-center gap-1 md:flex-row lg:flex-col lg:items-start"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row lg:flex-col lg:items-start"
          }
        >
          <MdHomeFilled />
          <span className="text-xs md:text-sm">Home</span>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row lg:flex-col lg:items-start"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row lg:flex-col lg:items-start"
          }
        >
          <IoMdLogIn />
          <span className="text-xs md:text-sm">Login</span>
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row lg:flex-col lg:items-start"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row lg:flex-col lg:items-start"
          }
        >
          <FaHourglassStart />
          <span className="text-xs md:text-sm">Signup</span>
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row lg:flex-col lg:items-start"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row lg:flex-col lg:items-start"
          }
        >
          <GrTasks />
          <span className="text-xs md:text-sm">Tasks</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row lg:flex-col lg:items-start"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row lg:flex-col lg:items-start"
          }
        >
          <MdAccountCircle />
          <span className="text-xs md:text-sm">Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row lg:flex-col lg:items-start"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row lg:flex-col lg:items-start"
          }
        >
          <MdOutlineSettings />
          <span className="text-xs md:text-sm">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

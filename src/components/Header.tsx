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
    <nav className="fixed bottom-0 flex justify-center py-4 w-full lg:static">
      <div className="flex items-center gap-4 mx-6 bg-[#f59e0b] dark:bg-[#313131] py-2 px-4 rounded-3xl md:py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500  flex flex-col items-center gap-1 md:flex-row"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row"
          }
        >
          <MdHomeFilled />
          <span className="text-xs md:text-sm">Home</span>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row"
          }
        >
          <IoMdLogIn />
          <span className="text-xs md:text-sm">Login</span>
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row"
          }
        >
          <FaHourglassStart />
          <span className="text-xs md:text-sm">Signup</span>
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row"
          }
        >
          <GrTasks />
          <span className="text-xs md:text-sm">Tasks</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row"
          }
        >
          <MdAccountCircle />
          <span className="text-xs md:text-sm">Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "text-white dark:text-yellow-500 flex flex-col items-center gap-1 md:flex-row"
              : "text-black flex flex-col items-center gap-1 dark:text-white md:flex-row"
          }
        >
          <MdOutlineSettings />
          <span className="text-xs md:text-sm">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

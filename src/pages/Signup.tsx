import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    document.title = "Signup for a new account";
  }, []);
  return (
    <div className="dark:text-white sm:w-[50%] mt-8 shadow-md sm:mx-auto lg:w-[30%] py-6 px-2 lg:border lg:border-yellow-500 lg:rounded-md">
      <h1 className="text-3xl font-bold">Signup</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Create account to get started.
      </p>
      <div className="mt-4">
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-yellow-500 dark:text-yellow-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="p-2 outline-none mt-1 block w-full rounded-md border border-yellow-300 dark:text-white"
              placeholder="johndoe@taskmanager.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-yellow-500 dark:text-yellow-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="p-2 outline-none mt-1 block w-full rounded-md border border-yellow-300 dark:text-white"
              placeholder="your strong password"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-yellow-500 w-fit mx-auto text-black dark:text-white rounded-md shadow-sm hover:bg-yellow-300"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

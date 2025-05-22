import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../supabase-client";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Signup for a new account";
  }, []);

  const validateForm = () => {
    if (!email.includes("@") || email.length < 5) {
      return "Enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      setMessage(null);
    } else {
      setError(null);
      setMessage("Signup successful! Check your email for confirmation.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="dark:text-white sm:w-[50%] mt-8 shadow-md sm:mx-auto lg:w-[30%] py-6 px-2 lg:border lg:border-yellow-500 lg:rounded-md">
      <h1 className="text-3xl font-bold">Signup</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Create account to get started.
      </p>
      <div className="mt-4">
        <form
          onFocus={() => {
            setError(null);
            setMessage(null);
          }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`p-2 outline-none mt-1 block w-full rounded-md border dark:text-white ${
                error?.toLowerCase().includes("email")
                  ? "border-red-500"
                  : "border-yellow-300"
              }`}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`p-2 outline-none mt-1 block w-full rounded-md border dark:text-white ${
                error?.toLowerCase().includes("password")
                  ? "border-red-500"
                  : "border-yellow-300"
              }`}
              placeholder="your strong password"
            />
          </div>

          {loading ? (
            <div className="flex items-center gap-2 justify-center bg-yellow-500 w-fit mx-auto p-2 rounded text-white text-sm">
              <div className="rounded-full w-5 h-5 border-2 border-white animate-spin border-t-transparent"></div>
              <span>Signing up...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 bg-yellow-500 w-fit mx-auto text-black dark:text-white rounded-md shadow-sm hover:bg-yellow-300"
            >
              Create account
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
    </div>
  );
}

import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "Login into your account";
  }, []);
  return <div className="dark:text-white">Login</div>;
}

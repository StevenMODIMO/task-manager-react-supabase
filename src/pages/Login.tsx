import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "Login into your account";
  }, []);
  return <div>Login</div>;
}

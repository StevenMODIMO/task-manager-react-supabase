import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    document.title = "Signup for a new account";
  }, []);
  return <div>Signup</div>;
}

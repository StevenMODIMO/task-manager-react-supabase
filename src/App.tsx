import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "Task Manager";
  }, []);
  return <div></div>;
}

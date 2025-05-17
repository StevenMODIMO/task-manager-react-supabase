import { useEffect } from "react";

export default function Tasks() {
  useEffect(() => {
    document.title = "Tasks";
  }, []);
  return <div>Tasks</div>;
}

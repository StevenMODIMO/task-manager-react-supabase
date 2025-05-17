import { useEffect } from "react";

export default function Settings() {
  useEffect(() => {
    document.title = "Settings";
  }, []);
  return <div className="dark:text-white">Settings</div>;
}

import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    document.title = "User Profile";
  }, []);
  return <div className="dark:text-white">Profile</div>;
}

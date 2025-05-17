import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Header from "./components/Header";
import Tasks from "./pages/Tasks.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";
import Logo from "./components/Logo.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="dark:bg-[#1f1f1f] h-screen w-full">
      <BrowserRouter>
        <Header />
        <div className="lg:ml-20 p-2 lg:flex lg:flex-col lg:gap-4 lg:items-start">
          <Logo />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  </StrictMode>
);

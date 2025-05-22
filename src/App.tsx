import { supabase } from "./supabase-client.ts";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Header from "./components/Header";
import Tasks from "./pages/Tasks.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";
import Logo from "./components/Logo.tsx";

export default function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.title = "Task Manager";
  }, []);

  return (
    <div className="dark:bg-[#1f1f1f] h-screen w-full">
      <BrowserRouter>
        <Header />
        <div className="lg:ml-20 p-2 lg:flex lg:flex-col lg:gap-4 lg:items-start">
          <Logo />
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                session ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={session ? <Navigate to="/tasks" replace /> : <Login />}
            />
            <Route
              path="/signup"
              element={session ? <Navigate to="/tasks" replace /> : <Signup />}
            />

            {/* Protected routes: redirect to login if no session */}
            <Route
              path="/tasks"
              element={session ? <Tasks /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={session ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/settings"
              element={
                session ? <Settings /> : <Navigate to="/login" replace />
              }
            />

            {/* Fallback for unknown routes */}
            <Route
              path="*"
              element={
                session ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

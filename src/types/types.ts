import React from "react";

export type Theme = "light" | "dark";

export interface AppContextTypes {
  theme: Theme;
  toggleTheme: () => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}


export interface TaskTypes {
  id: number
  title: string
  description: string
  priority: string
  completed: boolean
  status: string
  created_at: string
}
import React from "react";

export type Theme = "light" | "dark";

export interface AppContextTypes {
  theme: Theme;
  toggleTheme: () => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}

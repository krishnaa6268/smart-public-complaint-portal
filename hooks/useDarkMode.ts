"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "smart-portal-theme";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored ? stored === "dark" : true;
    setDarkMode(initial);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem(STORAGE_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  return { darkMode, setDarkMode };
};

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (value: Theme) => void;
  toggleTheme: () => void;
  hasMounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const setDocumentTheme = (value: Theme) => {
  if (typeof window === "undefined") {
    return;
  }

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(value);
  root.setAttribute("data-theme", value);
};

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? getPreferredTheme();

    setDocumentTheme(initial);
    setThemeState(initial);
    setHasMounted(true);
  }, []);

  const changeTheme = useCallback((value: Theme) => {
    setDocumentTheme(value);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", value);
    }

    setThemeState(value);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return;
      }

      changeTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [changeTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: changeTheme,
      toggleTheme: () => changeTheme(theme === "dark" ? "light" : "dark"),
      hasMounted,
    }),
    [changeTheme, hasMounted, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};

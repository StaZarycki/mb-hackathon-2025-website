"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme, hasMounted } = useTheme();
  const isDark = hasMounted ? theme === "dark" : false;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label="Toggle color scheme"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="h-9 w-9 rounded-xl border bg-transparent px-0"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle color scheme</span>
    </Button>
  );
}

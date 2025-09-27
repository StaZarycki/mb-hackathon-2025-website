"use client";

import { Github, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl border">
            <GitBranch className="h-4 w-4" />
          </div>
          PR & Issue Summarizer
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a className="hover:underline" href="#value">
            Value
          </a>
          <a className="hover:underline" href="#how">
            How
          </a>
          <a className="hover:underline" href="#demo">
            Demo
          </a>
          <a className="hover:underline" href="#install">
            Install
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl">
            <a href="#" aria-label="GitHub">
              <Github className="mr-1 h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

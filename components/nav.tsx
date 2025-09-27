"use client";

import { useEffect, useState } from "react";
import { GitBranch, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { REPO_URL } from "@/lib/config";

const NAV_LINKS = [
  { href: "#value", label: "Value" },
  { href: "#how", label: "How" },
  { href: "#demo", label: "Demo" },
  { href: "#install", label: "Install" },
];

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl border">
            <GitBranch className="h-4 w-4" />
          </div>
          PR & Issue Summarizer
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="hover:underline" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-xl sm:inline-flex">
            <a href={REPO_URL} target="_blank" aria-label="GitHub">
              <GithubIcon className="mr-1 h-4 w-4" /> GitHub
            </a>
          </Button>
          <a
            href={REPO_URL}
            target="_blank"
            aria-label="Open GitHub repository"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border md:hidden"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {isMenuOpen ? (
          <div
            id="mobile-nav"
            className="absolute inset-x-0 top-[calc(100%+1px)] z-30 flex flex-col gap-4 rounded-b-2xl border bg-background/95 p-4 text-sm shadow-lg backdrop-blur md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="flex items-center">
                {link.label}
              </a>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              onClick={closeMenu}
              className="inline-flex items-center gap-2"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}

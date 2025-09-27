import { Workflow } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { REPO_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:flex-row lg:px-8">
        <p>© {new Date().getFullYear()} PR & Issue Summarizer</p>
        <div className="flex items-center gap-4">
          <a href={REPO_URL} target="_blank" className="inline-flex items-center gap-2">
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
          <a href="#install" className="inline-flex items-center gap-2">
            <Workflow className="h-4 w-4" /> Quickstart
          </a>
        </div>
      </div>
    </footer>
  );
}

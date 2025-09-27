import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ExampleComment } from "@/components/example-comment";
import { CodeBlock } from "@/components/code-block";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { REPO_URL } from "@/lib/config";
import { GithubIcon } from "@/components/icons/github-icon";
import {
  FileText,
  Zap,
  GitPullRequest,
  ListChecks,
  Workflow,
  Bot,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />

      <Section
        id="value"
        title="Why teams use PR & Issue Summarizer"
        subtitle="A GitHub Action that reads your PR + Jira/Linear issue, then posts a crystal-clear summary for reviewers and stakeholders."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Ship reviews 2× faster",
              text: "Instant highlights of breaking changes, migrations, and risky areas. Reviewers focus on what matters.",
            },
            {
              icon: FileText,
              title: "Business context inside PRs",
              text: "Pulls business-relevant details from the linked issue (acceptance criteria, impact, owner).",
            },
            {
              icon: ShieldCheck,
              title: "Fewer surprises",
              text: "Calls out backwards-incompatible changes, env vars, feature flags, and post-merge actions.",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Icon className="h-6 w-6" />
                  <CardTitle className="text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        id="how"
        title="How it works"
        subtitle="Zero-config defaults. Smart heuristics. Works on feature, release, and hotfix branches."
      >
        <ol className="grid list-none gap-4 md:grid-cols-3">
          {[
            {
              icon: GitPullRequest,
              title: "Detect",
              text: "Action triggers on PR (including release branches). Parses PR title for task key (e.g., ABC-123).",
            },
            {
              icon: Workflow,
              title: "Enrich",
              text: "Fetches Jira/Linear issue. Extracts acceptance criteria, business impact, labels, and owner.",
            },
            {
              icon: Bot,
              title: "Summarize",
              text: "Reads the diff & commits. Posts a single structured comment with business context + tech highlights.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i}>
                <Card className="h-full rounded-2xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section
        id="demo"
        title="See it in action"
        subtitle="A single comment with the context everyone wants—no spelunking through tickets or commits."
      >
        <div className="grid gap-6 lg:grid-cols-1">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Example PR Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <ExampleComment />
            </CardContent>
          </Card>
          {/* <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Dry-run Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Run locally or in CI to generate a preview without posting to GitHub.
              </p>
              <CodeBlock code={`npx summarizer dry-run --pr 123 --repo your/repo`} />
            </CardContent>
          </Card> */}
        </div>
      </Section>

      <Section id="install" title="Install in minutes">
        <div className="grid gap-6 lg:grid-cols-1">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Add the Action</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`# .github/workflows/pr-summarizer.yml
name: PR Context Summarizer
on:
  pull_request:
    types: [opened, reopened, synchronize]
  workflow_dispatch:

jobs:
  summarize:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - name: Run PR Context Summarizer
        uses: your-username/pr-context-summarizer@v1
        with:
          jiraBaseUrl: \${{ vars.JIRA_BASE_URL }}
          jiraEmail: \${{ secrets.JIRA_EMAIL }}
          jiraApiToken: \${{ secrets.JIRA_API_TOKEN }}
          githubToken: \${{ secrets.GITHUB_TOKEN }}
          openaiApiKey: \${{ secrets.OPENAI_API_KEY }}
          openaiModel: gpt-4o-mini # optional, default
`}
              />
            </CardContent>
          </Card>
          {/* <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>2) Configure conventions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>
                  PR titles contain task key (e.g., <code>ABC-123</code>).
                </li>
                <li>
                  Release PRs: summarizes all merged PRs since last tag and links every relevant
                  ticket.
                </li>
                <li>Supports monorepos, conventional commits, and custom sections.</li>
              </ul>
              <div className="mt-4">
                <CodeBlock
                  code={`# .summarizerrc.json
{
  "sections": ["Business", "Tech highlights", "Breaking", "Post-merge"],
  "ticket_providers": ["jira", "linear"],
  "release": { "since": "last-tag", "groupBy": "scope" }
}`}
                />
              </div>
            </CardContent>
          </Card> */}
        </div>
      </Section>

      <Section id="cta" title="Ready to speed up reviews?">
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-2xl">
            <a href={REPO_URL} target="_blank" aria-label="Open GitHub repository">
              <div className="flex items-center gap-2">
                <GithubIcon className="h-5 w-5" /> Open on GitHub
              </div>
            </a>
          </Button>
          <Button variant="secondary" asChild size="lg" className="rounded-2xl">
            <a href="#install">Quickstart</a>
          </Button>
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" /> Built in an 8-hour hackathon sprint. Minimal setup,
          maximal signal.
        </p>
      </Section>

      <Footer />
    </div>
  );
}

import { Fragment, type ReactNode } from "react";

const baseMarkdown = `# ABC-123: As an admin, I can manage users

**Business context**
- Status: In Progress · Priority: High · Assignee: Ada Lovelace · Estimate: 3

### ✨ Most important changes
- Added new /users API endpoint
- Extended User entity with roles

### 💥 Breaking changes
- Removed old /account endpoint

### 🪲 Fixes
- Fixed null handling in UserService`;

const extraMarkdown = `### ⚠️ Things to consider
- Migration alters users table
- Major dependency bump: nestjs@10.x

**Links**
- PR: #42
- Jira: ABC-123`;

export function ExampleComment({ compact }: { compact?: boolean }) {
  const markdown = compact ? baseMarkdown : `${baseMarkdown}\n\n${extraMarkdown}`;

  return (
    <div className="text-sm">
      <div className="rounded-lg border border-border bg-muted/40 p-4">
        <div className="space-y-4 text-sm leading-6 text-muted-foreground">
          {renderMarkdown(markdown)}
        </div>
      </div>
    </div>
  );
}

function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split(/\r?\n/);
  const elements: ReactNode[] = [];
  let listBuffer: string[] = [];
  let keyCounter = 0;

  const nextKey = () => `md-${keyCounter++}`;

  const renderInline = (text: string, keyPrefix: string): ReactNode[] => {
    const segments = text.split(/(\*\*[^*]+?\*\*)/g).filter(Boolean);
    return segments.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return (
          <strong
            key={`${keyPrefix}-strong-${index}`}
            className="font-semibold text-foreground"
          >
            {segment.slice(2, -2)}
          </strong>
        );
      }

      return (
        <Fragment key={`${keyPrefix}-text-${index}`}>{segment}</Fragment>
      );
    });
  };

  const flushList = () => {
    if (listBuffer.length === 0) {
      return;
    }

    const listKey = nextKey();
    elements.push(
      <ul key={listKey} className="list-disc space-y-1 pl-5">
        {listBuffer.map((item, index) => (
          <li key={`${listKey}-item-${index}`}>
            {renderInline(item, `${listKey}-item-${index}`)}
          </li>
        ))}
      </ul>
    );

    listBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      const key = nextKey();
      elements.push(
        <h3 key={key} className="text-sm font-semibold text-foreground">
          {renderInline(trimmed.slice(4).trim(), `${key}-inline`)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      const key = nextKey();
      elements.push(
        <h3 key={key} className="text-sm font-semibold text-foreground">
          {renderInline(trimmed.slice(3).trim(), `${key}-inline`)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushList();
      const key = nextKey();
      elements.push(
        <h2 key={key} className="text-base font-semibold text-foreground">
          {renderInline(trimmed.slice(2).trim(), `${key}-inline`)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2));
      continue;
    }

    flushList();
    const key = nextKey();
    elements.push(
      <p key={key} className="text-sm leading-6">
        {renderInline(trimmed, `${key}-inline`)}
      </p>
    );
  }

  flushList();

  return elements;
}

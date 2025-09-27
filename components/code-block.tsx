export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-muted/30 p-4 font-mono text-sm leading-6">
      <code>{code}</code>
    </pre>
  );
}

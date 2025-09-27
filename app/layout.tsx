import "./globals.css";

export const metadata = {
  title: "PR & Issue Summarizer",
  description:
    "GitHub Action that reads your PR + Jira/Linear issue and posts a sharp summary with business & technical context.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}

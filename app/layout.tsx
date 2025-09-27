import Script from "next/script";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "PR & Issue Summarizer",
  description:
    "GitHub Action that reads your PR + Jira/Linear issue and posts a sharp summary with business & technical context.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const stored = localStorage.getItem('theme');
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const theme = stored === 'light' || stored === 'dark'
                  ? stored
                  : mediaQuery.matches
                    ? 'dark'
                    : 'light';

                const root = document.documentElement;
                root.classList.remove('light', 'dark');
                root.classList.add(theme);
                root.setAttribute('data-theme', theme);
              } catch (error) {
                // Ignore theme errors so render can continue.
              }
            })();
          `}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

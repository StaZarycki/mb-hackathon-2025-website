"use client";

import { motion } from "framer-motion";
import { ListChecks, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExampleComment } from "@/components/example-comment";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-5xl"
            >
              One PR comment. <span className="inline-block">All the context.</span>
            </motion.h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              A modern GitHub Action that reads your PR and linked Jira/Linear issue to
              auto-generate a sharp, structured summary for reviewers.
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild size="lg" className="rounded-2xl">
                <a href="#install">
                  <Zap className="mr-2 h-5 w-5" /> Get started
                </a>
              </Button>
              <Button variant="secondary" asChild size="lg" className="rounded-2xl">
                <a href="#demo">
                  <ListChecks className="mr-2 h-5 w-5" /> See example
                </a>
              </Button>
            </div>
            <div className="w-full max-w-sm sm:max-w-md md:max-w-none">
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3 sm:justify-items-start">
                {["Business context", "Tech highlights", "Breaking changes"].map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full border" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-xl sm:max-w-2xl md:max-w-none"
          >
            <Card className="mx-auto w-full max-w-md rounded-2xl shadow-lg sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none">
              <CardHeader>
                <CardTitle className="text-base">PR Comment Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ExampleComment compact />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

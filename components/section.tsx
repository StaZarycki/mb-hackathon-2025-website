"use client";

import { motion } from "framer-motion";

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-10 space-y-3 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
          {subtitle ? (
            <p className="mx-auto max-w-2xl text-muted-foreground md:mx-0">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { HeroDecision, Scenario } from "@/lib/types";

type YesPicksLaneProps = {
  children: ReactNode;
  hero: HeroDecision;
  scenario: Scenario;
};

export function YesPicksLane({ children, hero, scenario }: YesPicksLaneProps) {
  return (
    <motion.section
      key={scenario.key}
      animate={{ opacity: 1, y: 0 }}
      className="mt-7"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-yes-green">
            Yes Picks
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-normal text-yes-mist">
            {hero.kind === "none" ? "Balanced grid" : hero.title}
          </h3>
        </div>
        <span className="rounded-full border border-yes-line px-3 py-1 text-xs text-yes-muted">
          {scenario.label}
        </span>
      </div>
      <div className="space-y-3">{children}</div>
    </motion.section>
  );
}

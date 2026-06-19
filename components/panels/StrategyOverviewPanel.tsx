"use client";

import { useRef, useState } from "react";
import { RankingStrategyCard } from "@/components/panels/RankingStrategyCard";
import { SupportDocsModal } from "@/components/panels/SupportDocsModal";

export function StrategyOverviewPanel() {
  const [supportDocsOpen, setSupportDocsOpen] = useState(false);
  const supportDocsButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-yes-green px-2 py-1 text-sm font-black leading-none text-yes-ink">
            yes
          </span>
          <h1 className="min-w-0 flex-1 text-xl font-black tracking-normal text-white">
            Yes Picks Prototype
          </h1>
          <button
            className="shrink-0 rounded-lg border border-[#6DE27A] bg-[#10110E] px-3 py-1.5 text-xs font-semibold text-[#B9B7AA] transition hover:border-[#6DE27A] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6DE27A]"
            onClick={() => setSupportDocsOpen(true)}
            ref={supportDocsButtonRef}
            type="button"
          >
            Support Docs
          </button>
        </div>
        <p className="text-base font-semibold leading-5 text-yes-teal">
          Dynamic state-based casino carousel
        </p>
        <p className="max-w-[27rem] text-base leading-5 text-yes-muted">
          Control the scenario and review how the mobile Yes Picks carousel changes in the preview.
        </p>
      </header>

      <div className="h-px bg-yes-line" />

      <section aria-labelledby="strategy-overview-title" className="space-y-4">
        <h2
          id="strategy-overview-title"
          className="text-base font-black uppercase tracking-[0.12em] text-yes-green"
        >
          Strategy Overview
        </h2>

        <StrategyTextBlock label="Product Goal">
          Reduce mobile casino lobby decision friction while giving the operator a configurable way
          to balance player relevance, content priority, market performance and RG guardrails.
        </StrategyTextBlock>

        <StrategyTextBlock label="Hypothesis">
          State-based Yes Picks will increase lane-attributed game launches within 60 seconds
          compared with a static generic game row.
        </StrategyTextBlock>

        <StrategyTextBlock label="Primary Metric">
          Lane-attributed game launch conversion within 60 seconds of lobby view.
        </StrategyTextBlock>

        <div className="space-y-2">
          <h3 className="text-base font-black uppercase tracking-[0.08em] text-[#778492]">
            Ranking Strategy by Product Stage
          </h3>
          <RankingStrategyCard />
        </div>
      </section>

      <SupportDocsModal
        onClose={() => setSupportDocsOpen(false)}
        open={supportDocsOpen}
        returnFocusRef={supportDocsButtonRef}
      />
    </div>
  );
}

function StrategyTextBlock({
  children,
  label,
}: {
  children: string;
  label: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-black uppercase tracking-[0.08em] text-[#778492]">{label}</p>
      <p className="text-base leading-6 text-white">{children}</p>
    </div>
  );
}

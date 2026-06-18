import { RankingStrategyCard } from "@/components/panels/RankingStrategyCard";

export function StrategyOverviewPanel() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-yes-green px-2 py-1 text-sm font-black leading-none text-yes-ink">
            yes
          </span>
          <h1 className="text-xl font-black tracking-normal text-white">Yes Picks Prototype</h1>
        </div>
        <p className="text-base font-semibold leading-5 text-yes-teal">
          Dynamic state-based casino carousel
        </p>
        <p className="max-w-[27rem] text-base leading-5 text-yes-muted">
          Control the scenario and review how the mobile Yes Picks carousel changes on the right.
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

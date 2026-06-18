import {
  formatHeroType,
  formatLayoutMode,
  scenarioReviewCopy,
} from "@/components/panels/reviewContent";
import type { HeroDecision, Scenario } from "@/lib/types";

type CurrentStateSummaryProps = {
  hero: HeroDecision;
  scenario: Scenario;
};

export function CurrentStateSummary({ hero, scenario }: CurrentStateSummaryProps) {
  const copy = scenarioReviewCopy[scenario.id];

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          Current state
        </p>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-800">
          {formatLayoutMode(hero.layoutMode)}
        </span>
      </div>

      <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        <SummaryRow label="Scenario" value={scenario.title} />
        <SummaryRow label="Player state" value={copy.playerState} />
        <SummaryRow label="Carousel mode" value={formatLayoutMode(hero.layoutMode)} />
        <SummaryRow label="Hero type" value={formatHeroType(hero.heroType)} />
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Why</dt>
          <dd className="mt-1 leading-5 text-slate-700">{copy.whyLane}</dd>
        </div>
      </dl>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold leading-5 text-slate-900">{value}</dd>
    </div>
  );
}

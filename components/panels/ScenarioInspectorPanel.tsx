import { LaneAnatomy } from "@/components/panels/LaneAnatomy";
import { ImplementationDetailsTabs } from "@/components/panels/ImplementationDetailsTabs";
import { scenarioInspectorCopy } from "@/components/panels/reviewContent";
import type { HeroDecision, RankedGame, Scenario } from "@/lib/types";

type ScenarioInspectorPanelProps = {
  hero: HeroDecision;
  rankedGames: RankedGame[];
  scenario: Scenario;
};

export function ScenarioInspectorPanel({
  hero,
  rankedGames,
  scenario,
}: ScenarioInspectorPanelProps) {
  const copy = scenarioInspectorCopy[scenario.id];

  return (
    <div className="space-y-4">
      <section aria-labelledby="current-scenario-title" className="space-y-3">
        <h2
          id="current-scenario-title"
          className="text-base font-black uppercase tracking-[0.12em] text-yes-green"
        >
          Current Scenario
        </h2>

        <article className="rounded-lg border border-yes-line bg-[#222] p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-black text-white">{scenario.title}</h3>
            <span className="rounded-full border border-yes-green px-2 py-0.5 text-xs font-black uppercase tracking-[0.12em] text-yes-green">
              Active
            </span>
          </div>

          <dl className="mt-3 space-y-3">
            <InspectorRow label="Player State" value={copy.playerState} />
            <InspectorRow label="Trigger" value={copy.trigger} />
            <InspectorRow label="Carousel Mode" value={copy.carouselMode} />
            <InspectorRow label="Hero Behaviour" value={copy.heroBehaviour} />
            <InspectorRow label="Ordering Logic" value={copy.orderingLogic} />
          </dl>

          <div className="mt-4 rounded-md border border-violet-600 bg-violet-950/10 p-3">
            <p className="text-sm leading-5 text-white">
              <span className="font-semibold text-yes-green">Compliance - </span>
              {copy.complianceNote}
            </p>
          </div>
        </article>
      </section>

      <LaneAnatomy hero={hero} rankedGames={rankedGames} scenario={scenario} />
      <ImplementationDetailsTabs hero={hero} scenario={scenario} />
    </div>
  );
}

function InspectorRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-black uppercase tracking-[0.08em] text-[#8993a1]">{label}</dt>
      <dd className="mt-1 text-base leading-5 text-white">{value}</dd>
    </div>
  );
}

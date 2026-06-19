"use client";

import { useMemo, useState } from "react";
import { ScenarioSwitcher } from "@/components/controls/ScenarioSwitcher";
import { PrototypeShell } from "@/components/layout/PrototypeShell";
import { MobileLobby } from "@/components/lobby/MobileLobby";
import { PhoneFrame } from "@/components/lobby/PhoneFrame";
import { ScenarioInspectorPanel } from "@/components/panels/ScenarioInspectorPanel";
import { StrategyOverviewPanel } from "@/components/panels/StrategyOverviewPanel";
import { AnnotationRail, type AnnotationId } from "@/components/preview/AnnotationRail";
import { getScenarioById } from "@/data/ranking";
import { scenarios } from "@/data/scenarios";
import { getHeroDecision } from "@/lib/heroDecision";
import type { ScenarioId } from "@/lib/types";

export default function Home() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("new-player");
  const [activeAnnotation, setActiveAnnotation] = useState<AnnotationId | null>(null);
  const scenario = useMemo(() => getScenarioById(activeScenario), [activeScenario]);
  const hero = useMemo(() => getHeroDecision(scenario), [scenario]);
  const isLaneAnnotationActive = activeAnnotation === 2;

  return (
    <PrototypeShell
      inspectorPanel={<ScenarioInspectorPanel hero={hero} scenario={scenario} />}
      previewPanel={
        <div className="mx-auto flex min-w-[440px] max-w-[520px] flex-col items-center">
          <div className="w-full">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-yes-green">
              Scenario Preview
            </p>
            <div className="mt-3">
              <ScenarioSwitcher
                activeScenario={activeScenario}
                onChange={setActiveScenario}
                scenarios={scenarios}
              />
            </div>
          </div>

          {isLaneAnnotationActive ? (
            <div className="pointer-events-none fixed inset-0 z-20 bg-black/45 transition-opacity" />
          ) : null}

          <div
            className={`relative mt-6 flex w-full flex-col items-center gap-3 ${
              isLaneAnnotationActive ? "z-30" : ""
            }`}
          >
            <AnnotationRail
              activeAnnotation={activeAnnotation}
              className="sm:hidden"
              layout="horizontal"
              onAnnotationChange={setActiveAnnotation}
            />

            <div className="flex w-full justify-center sm:w-[480px] sm:justify-start">
              <AnnotationRail
                activeAnnotation={activeAnnotation}
                className="hidden sm:block"
                layout="vertical"
                onAnnotationChange={setActiveAnnotation}
              />
              <div className="sm:ml-2">
                <PhoneFrame>
                  <MobileLobby
                    highlightYesPicks={isLaneAnnotationActive}
                    scenarioId={activeScenario}
                  />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      }
      strategyPanel={<StrategyOverviewPanel />}
    />
  );
}

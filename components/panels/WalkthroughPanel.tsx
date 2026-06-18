"use client";

import { useState } from "react";

type WalkthroughPanelProps = {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
};

const walkthroughSteps = [
  "Select a scenario",
  "See how the carousel changes",
  "Tap info / CTA",
  "Review config and hypothesis",
];

export function WalkthroughPanel({ enabled, onToggle }: WalkthroughPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">
          Review mode: <span className={enabled ? "text-emerald-700" : "text-slate-500"}>{enabled ? "On" : "Off"}</span>
        </p>
        <button
          aria-pressed={enabled}
          className="flex min-h-9 items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-700 transition hover:border-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
          onClick={() => onToggle(!enabled)}
          type="button"
        >
          <span
            className={`grid h-6 w-10 place-items-center rounded-full px-1 transition ${
              enabled ? "bg-emerald-500" : "bg-slate-300"
            }`}
            aria-hidden="true"
          >
            <span
              className={`h-4 w-4 rounded-full bg-white transition ${
                enabled ? "translate-x-2" : "-translate-x-2"
              }`}
            />
          </span>
          <span>{enabled ? "On" : "Off"}</span>
        </button>
      </div>

      {enabled ? (
        <div className="mt-2">
          <button
            aria-expanded={expanded}
            className="min-h-8 rounded-md px-1 text-xs font-bold text-violet-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
            onClick={() => setExpanded(!expanded)}
            type="button"
          >
            {expanded ? "Hide steps" : "Show steps"}
          </button>
          {expanded ? (
            <ol className="mt-2 grid gap-1.5 text-xs text-slate-700 sm:grid-cols-2">
              {walkthroughSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-100 text-[0.68rem] font-black text-violet-800">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

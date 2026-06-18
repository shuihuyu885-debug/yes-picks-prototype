"use client";

type WalkthroughPanelProps = {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
};

const walkthroughSteps = [
  "Select a scenario",
  "See how the carousel changes",
  "Tap info for logic and compliance",
  "Tap CTA to simulate launch",
  "Review config panel",
];

export function WalkthroughPanel({ enabled, onToggle }: WalkthroughPanelProps) {
  return (
    <section className="rounded-lg border border-yes-line bg-yes-panel p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-yes-teal">
            Walkthrough
          </p>
          <h2 className="mt-1 text-lg font-semibold text-yes-mist">Review mode</h2>
        </div>
        <button
          aria-pressed={enabled}
          className="flex min-h-11 items-center gap-2 rounded-full border border-yes-line bg-yes-ink px-2 py-1 text-sm font-semibold text-yes-mist transition hover:border-yes-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yes-green"
          onClick={() => onToggle(!enabled)}
          type="button"
        >
          <span
            className={`grid h-7 w-12 place-items-center rounded-full px-1 transition ${
              enabled ? "bg-yes-green" : "bg-slate-700"
            }`}
            aria-hidden="true"
          >
            <span
              className={`h-5 w-5 rounded-full bg-white transition ${
                enabled ? "translate-x-2.5" : "-translate-x-2.5"
              }`}
            />
          </span>
          <span>{enabled ? "On" : "Off"}</span>
        </button>
      </div>

      {enabled ? (
        <ol className="mt-4 space-y-2 text-sm text-yes-muted">
          {walkthroughSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-2 rounded-lg bg-yes-ink p-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-yes-green text-xs font-black text-yes-ink">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

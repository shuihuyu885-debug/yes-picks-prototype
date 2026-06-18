export function HypothesisCard() {
  return (
    <section className="rounded-lg border border-yes-line bg-yes-panel p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-yes-teal">
        Hypothesis
      </p>
      <p className="mt-2 text-sm leading-6 text-yes-mist">
        For mobile casino players in Denmark, a state-based Yes Picks carousel will increase
        lane-attributed game launches within 60 seconds compared with a static generic game row.
      </p>

      <div className="mt-4 grid gap-3 text-sm">
        <div>
          <h3 className="font-semibold text-yes-mist">Primary metric</h3>
          <p className="mt-1 leading-6 text-yes-muted">
            Lane-attributed game launch conversion within 60 seconds of lobby view.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-yes-mist">Guardrails</h3>
          <p className="mt-1 leading-6 text-yes-muted">
            Responsible-gambling indicators, misleading bonus/winning claims, crash-game
            exclusion, DKK localisation.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HypothesisCard() {
  return (
    <section className="rounded-lg border border-yes-green/30 bg-yes-green/10 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-yes-green">
        Hypothesis
      </p>
      <p className="mt-1.5 text-sm font-semibold leading-5 text-yes-mist">
        State-based Yes Picks will increase lane-attributed game launches within 60 seconds
        compared with a static generic game row.
      </p>

      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-yes-green">
            Primary metric
          </h3>
          <p className="mt-1 leading-5 text-yes-muted">
            Lane-attributed game launch conversion within 60 seconds of lobby view.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-yes-green">
            Guardrails
          </h3>
          <p className="mt-1 leading-5 text-yes-muted">
            RG indicators · misleading claims · crash exclusion · DKK localisation
          </p>
        </div>
      </div>
    </section>
  );
}

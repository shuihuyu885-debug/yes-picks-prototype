import type { ReactNode } from "react";

type PrototypeShellProps = {
  inspectorPanel: ReactNode;
  previewPanel: ReactNode;
  strategyPanel: ReactNode;
};

export function PrototypeShell({
  inspectorPanel,
  previewPanel,
  strategyPanel,
}: PrototypeShellProps) {
  return (
    <main className="min-h-dvh bg-[#222] text-yes-mist">
      <div className="mx-auto grid min-h-dvh w-full max-w-[1440px] lg:grid-cols-[minmax(320px,460px)_minmax(440px,1fr)_minmax(340px,460px)]">
        <aside
          aria-label="Strategy overview"
          className="scrollbar-none bg-yes-ink px-5 py-5 lg:max-h-dvh lg:overflow-y-auto"
        >
          {strategyPanel}
        </aside>
        <section
          aria-label="Scenario preview"
          className="scrollbar-none overflow-x-auto bg-[#222] px-5 py-5"
        >
          {previewPanel}
        </section>
        <aside
          aria-label="Current scenario inspector"
          className="scrollbar-none bg-[#4c4c4c] px-5 py-5 lg:max-h-dvh lg:overflow-y-auto"
        >
          {inspectorPanel}
        </aside>
      </div>
    </main>
  );
}

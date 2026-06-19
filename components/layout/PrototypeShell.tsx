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
    <main className="min-h-dvh overflow-x-hidden bg-[#222] text-yes-mist">
      <div className="grid min-h-dvh w-full xl:grid-cols-[minmax(320px,460px)_minmax(440px,1fr)_minmax(340px,460px)] min-[1440px]:grid-cols-[460px_minmax(520px,calc(100vw_-_920px))_460px]">
        <aside
          aria-label="Strategy overview"
          className="scrollbar-none min-w-0 bg-yes-ink px-5 py-5 lg:max-h-dvh lg:overflow-y-auto"
        >
          {strategyPanel}
        </aside>
        <section
          aria-label="Scenario preview"
          className="scrollbar-none min-w-0 overflow-x-auto bg-[#222] px-3 py-5 sm:px-5 xl:overflow-visible"
        >
          {previewPanel}
        </section>
        <aside
          aria-label="Current scenario inspector"
          className="scrollbar-none min-w-0 bg-[#4c4c4c] px-5 py-5 lg:max-h-dvh lg:overflow-y-auto"
        >
          {inspectorPanel}
        </aside>
      </div>
    </main>
  );
}

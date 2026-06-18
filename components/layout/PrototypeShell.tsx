import type { ReactNode } from "react";

type PrototypeShellProps = {
  phonePreview: ReactNode;
  sidePanel: ReactNode;
};

export function PrototypeShell({ phonePreview, sidePanel }: PrototypeShellProps) {
  return (
    <main className="min-h-dvh bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(440px,560px)_minmax(320px,1fr)] xl:items-start">
        <section
          aria-label="Mobile lobby prototype preview"
          className="scrollbar-none flex justify-center overflow-x-auto"
        >
          {phonePreview}
        </section>
        <aside
          aria-label="Scenario controls and annotations"
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        >
          {sidePanel}
        </aside>
      </div>
    </main>
  );
}

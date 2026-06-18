import { PrototypeShell } from "@/components/layout/PrototypeShell";
import { MobileLobby } from "@/components/lobby/MobileLobby";
import { PhoneFrame } from "@/components/lobby/PhoneFrame";

export default function Home() {
  return (
    <PrototypeShell
      phonePreview={
        <PhoneFrame>
          <MobileLobby />
        </PhoneFrame>
      }
      sidePanel={<PlaceholderPanel />}
    />
  );
}

function PlaceholderPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">
          yes-picks-prototype
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
          Mobile lobby shell
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          This step establishes the iPhone-sized lobby preview, navigation structure and Yes
          Picks placement. Scenario controls and annotations will be wired in later.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-base font-semibold text-slate-950">Reserved panel</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Future controls will switch scenarios, explain hero decisions and show ranking logic.
          For now, the phone preview is intentionally a structural wireframe.
        </p>
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <dt className="font-semibold text-slate-950">Device target</dt>
          <dd className="mt-1 text-slate-600">440 × 956 CSS px</dd>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <dt className="font-semibold text-slate-950">Yes Picks status</dt>
          <dd className="mt-1 text-slate-600">Placeholder only; carousel implementation next.</dd>
        </div>
      </dl>
    </div>
  );
}

import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
};

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="w-[440px] shrink-0">
      <p className="mb-3 text-center text-sm font-medium text-slate-600">
        iPhone 16 Pro Max preview · 440 × 956 CSS px
      </p>
      <div className="relative h-[956px] w-[440px] overflow-hidden rounded-[3rem] border border-slate-300 bg-slate-950 p-2 shadow-2xl shadow-slate-400/40">
        <div className="h-full overflow-hidden rounded-[2.35rem] bg-slate-50">{children}</div>
      </div>
    </div>
  );
}

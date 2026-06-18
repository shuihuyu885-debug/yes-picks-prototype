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
      <div className="relative h-[956px] w-[440px] overflow-hidden rounded-[1.35rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/50">
        <div className="h-full overflow-hidden bg-white">{children}</div>
      </div>
    </div>
  );
}

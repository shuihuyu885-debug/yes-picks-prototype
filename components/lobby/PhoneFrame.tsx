import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
};

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="w-[440px] shrink-0">
      <div className="relative h-[956px] w-[440px] overflow-hidden rounded-[1.35rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/50">
        <div className="h-full overflow-hidden bg-white">{children}</div>
      </div>
      <p className="mt-4 text-center text-xs font-medium text-yes-muted">
        iPhone 16 Pro Max · 440 × 956 CSS px
      </p>
    </div>
  );
}

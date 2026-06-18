import type { ReactNode } from "react";

type PhoneShellProps = {
  children: ReactNode;
};

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="rounded-[2rem] border border-yes-line bg-black p-2 shadow-phone">
      <div className="min-h-[48rem] overflow-hidden rounded-[1.5rem] border border-yes-line bg-yes-ink px-4 py-5">
        {children}
      </div>
    </div>
  );
}

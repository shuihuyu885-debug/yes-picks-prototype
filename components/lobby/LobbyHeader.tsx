import { Bell, Search, ShieldCheck } from "lucide-react";

export function LobbyHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-yes-muted">Casino</p>
        <h2 className="text-2xl font-semibold tracking-normal text-yes-mist">Yes</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="Responsible gambling controls"
          className="grid h-11 w-11 place-items-center rounded-full border border-yes-line bg-yes-panel text-yes-green transition hover:border-yes-green"
          type="button"
        >
          <ShieldCheck aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          aria-label="Search games"
          className="grid h-11 w-11 place-items-center rounded-full border border-yes-line bg-yes-panel text-yes-mist transition hover:border-yes-teal"
          type="button"
        >
          <Search aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          aria-label="Notifications"
          className="grid h-11 w-11 place-items-center rounded-full border border-yes-line bg-yes-panel text-yes-mist transition hover:border-yes-gold"
          type="button"
        >
          <Bell aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

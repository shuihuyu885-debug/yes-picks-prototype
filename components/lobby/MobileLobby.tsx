import {
  CircleUserRound,
  Gift,
  Home,
  Plus,
  Search,
  Sparkles,
  Trophy,
  WalletCards,
} from "lucide-react";

const categories = ["Slots", "Jackpots", "Table Games", "Slingo", "Bingo", "Live Casino"];

const bottomNav = [
  { label: "Home", icon: Home },
  { label: "New", icon: Sparkles },
  { label: "Live Casino", icon: Trophy },
  { label: "Reward", icon: Gift },
  { label: "Search", icon: Search },
];

export function MobileLobby() {
  return (
    <div className="relative h-full overflow-hidden bg-slate-50 text-slate-950">
      <div className="h-full overflow-y-auto pb-28">
        <StatusBar />
        <TopBrandBar />
        <CategoryNav />
        <main className="space-y-5 px-4 pt-4">
          <HeroPlaceholder />
          <YesPicksPlaceholder />
          <GenericSectionPlaceholder />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-7 pt-1 text-[0.8rem] font-semibold text-slate-800">
      <span>9:52</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-4 rounded-sm border border-slate-700" />
        <span className="h-2.5 w-2 rounded-sm bg-slate-700" />
      </div>
    </div>
  );
}

function TopBrandBar() {
  return (
    <header className="flex items-center gap-3 px-4 pb-3 pt-1">
      <div className="mr-auto text-3xl font-black tracking-normal text-slate-950">yes</div>
      <div className="flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm">
        <WalletCards aria-hidden="true" className="h-4 w-4 text-violet-500" />
        <span>DKK 300.00</span>
      </div>
      <button
        aria-label="Add funds"
        className="grid h-11 w-11 place-items-center rounded-full bg-violet-600 text-white shadow-sm transition hover:bg-violet-700"
        type="button"
      >
        <Plus aria-hidden="true" className="h-5 w-5" />
      </button>
      <button
        aria-label="Open profile"
        className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-violet-300"
        type="button"
      >
        <CircleUserRound aria-hidden="true" className="h-5 w-5" />
      </button>
    </header>
  );
}

function CategoryNav() {
  return (
    <nav aria-label="Game categories" className="border-y border-slate-200 bg-white/85">
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {categories.map((category, index) => (
          <button
            key={category}
            aria-label={`Show ${category}`}
            className={
              index === 0
                ? "min-h-11 shrink-0 rounded-full bg-violet-600 px-4 text-sm font-semibold text-white"
                : "min-h-11 shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700"
            }
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HeroPlaceholder() {
  return (
    <section
      aria-label="Generic lobby hero placeholder"
      className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-200 to-violet-100 p-4"
    >
      <div className="flex min-h-44 flex-col justify-end rounded-xl border border-white/70 bg-white/45 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
          Hero placeholder
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">
          Top lobby campaign area
        </h1>
        <p className="mt-2 max-w-64 text-sm leading-6 text-slate-700">
          Reserved for a generic lobby message. No real casino imagery in this shell.
        </p>
      </div>
    </section>
  );
}

function YesPicksPlaceholder() {
  return (
    <section aria-labelledby="yes-picks-placeholder" className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
            Dynamic lane
          </p>
          <h2 id="yes-picks-placeholder" className="text-xl font-bold tracking-normal">
            Yes Picks
          </h2>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          placeholder
        </span>
      </div>
      <div className="rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-4">
        <div className="flex min-h-36 items-center justify-center rounded-xl border border-violet-200 bg-white/70 px-6 text-center">
          <p className="text-sm font-medium leading-6 text-slate-700">
            Yes Picks carousel will be implemented in the next step. This area marks the
            intended lane position below the top banner.
          </p>
        </div>
      </div>
    </section>
  );
}

function GenericSectionPlaceholder() {
  return (
    <section aria-labelledby="lower-section-placeholder" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="lower-section-placeholder" className="text-lg font-bold tracking-normal">
          Continue exploring
        </h2>
        <button
          aria-label="View all continue exploring items"
          className="min-h-11 rounded-full px-3 text-sm font-semibold text-violet-700"
          type="button"
        >
          View all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Content row", "Game row", "Live row", "Promo row"].map((label) => (
          <div key={label} className="min-h-32 rounded-2xl border border-slate-200 bg-white p-3">
            <div className="h-16 rounded-xl bg-slate-100" />
            <p className="mt-3 text-sm font-semibold text-slate-700">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomNav() {
  return (
    <nav
      aria-label="Primary mobile navigation"
      className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 px-3 pb-5 pt-2 shadow-[0_-12px_28px_rgba(15,23,42,0.08)]"
    >
      <div className="grid grid-cols-5 gap-1">
        {bottomNav.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <button
              key={item.label}
              aria-label={`Open ${item.label}`}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-violet-50 text-violet-700"
                  : "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-slate-600"
              }
              type="button"
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
              <span className="text-[0.7rem] font-semibold leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

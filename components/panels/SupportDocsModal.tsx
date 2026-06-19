"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type Tone = "green" | "muted" | "pink" | "purple";

type LeadBullet = {
  lead?: string;
  text: string;
  tone?: Tone;
};

type Tradeoff = {
  body: string;
  chosen?: boolean;
  title: string;
};

type RankingItem = {
  detail?: string;
  kind?: "exclusive" | "promoted" | "recent" | "standard";
  label: string;
  weight: number;
};

type RankingStage = {
  items: RankingItem[];
  title: string;
};

type CadenceRow = {
  description: string;
  tag: string;
  tagClassName: string;
};

type ControlRow = {
  description: string;
  label: string;
};

type KeyValueRow = {
  label: string;
  tone?: Tone;
  value: string;
};

type SupportDocsSection =
  | {
      bullets: LeadBullet[];
      eyebrow: string;
      tone?: Tone;
      type: "callout";
    }
  | {
      bullets: LeadBullet[];
      eyebrow?: string;
      tone?: Tone;
      type: "bullets";
    }
  | {
      items: Tradeoff[];
      eyebrow: string;
      type: "tradeoffs";
    }
  | {
      stages: RankingStage[];
      type: "ranking";
    }
  | {
      body: string;
      label?: string;
      type: "note";
    }
  | {
      closingBullet: string;
      rows: CadenceRow[];
      type: "cadence";
    }
  | {
      eyebrow: string;
      rows: ControlRow[];
      type: "rgControls";
    }
  | {
      rows: KeyValueRow[];
      type: "keyValues";
    }
  | {
      type: "divider";
    };

type SupportDocsCard = {
  badgeTone: "green" | "purple";
  intro: string;
  sections: SupportDocsSection[];
  title: string;
};

type SupportDocsModalProps = {
  onClose: () => void;
  open: boolean;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

const supportDocsCards: SupportDocsCard[] = [
  {
    badgeTone: "green",
    intro:
      "The lane is deliberately a horizontal hero carousel: one large hero tile leading a two-row scroll of compact tiles. Chosen against three alternatives.",
    title: "Why a carousel",
    sections: [
      {
        eyebrow: "BIGGEST ADVANTAGE — SPACE & ATTENTION",
        bullets: [
          {
            lead: "Space-efficient.",
            text: " A carousel surfaces many games in the footprint of a single row — the lane's biggest advantage over a grid or feed that pushes everything else down.",
          },
          {
            lead: "Front-loaded value.",
            text: " Engagement drops the further down or further back content sits, so the highest-value games go in the first ~4 cells. The lane is capped at 6–8 columns — beyond that, tiles are effectively buried.",
          },
          {
            lead: "Two rows = breadth + sizing room.",
            text: " Two rows guarantee enough visible slots while leaving room for differentiated tile sizes (hero vs compact) to signal priority.",
          },
        ],
        type: "callout",
      },
      {
        eyebrow: "FORMAT TRADE-OFFS",
        items: [
          {
            body: "Horizontal swipe matches mobile lobby behaviour and the EveryMatrix lane model. Hero carries one strong prompt; the two-row tail keeps breadth on one screen and makes ranking order legible.",
            chosen: true,
            title: "Hero carousel",
          },
          {
            body: "Good for a flat catalogue, but flattens priority — every tile reads as equal weight, so the ranking logic becomes invisible.",
            title: "Grid",
          },
          {
            body: "Strong for endless discovery, but pushes the lane below other lobby content and competes with the existing vertical scroll.",
            title: "Vertical feed",
          },
          {
            body: "High focus per card, but one-at-a-time hides breadth and adds a tap/swipe per game — wrong for a 60-second quick-launch lane.",
            title: "Card stack / swipe",
          },
        ],
        type: "tradeoffs",
      },
      {
        eyebrow: "WHY IT EARNS ITS PLACE",
        bullets: [
          { text: "Hero + tail gives one configurable \"strong prompt\" slot plus a ranked tail in a single component." },
          { text: "Position 1..n maps directly to ranking weights, so configuration is visible to the player as sequence." },
          { text: "Fits one mobile screen without displacing existing lobby rows." },
        ],
        type: "bullets",
      },
    ],
  },
  {
    badgeTone: "green",
    intro:
      "What the lane orders and how it weights content at each stage. Higher = higher ranking weight; final order then responds to live data and the rule below.",
    title: "Ranking hierarchy by stage",
    sections: [
      {
        stages: [
          {
            title: "Stage 1 — Strong IP titles to drive lobby engagement",
            items: [
              { kind: "promoted", label: "Promoted Games / Event", weight: 100 },
              { kind: "recent", label: "Recently Played Games (1–2 tiles)", weight: 88 },
              { kind: "exclusive", label: "Exclusive Tier 1 Game (1 tile)", weight: 78 },
              { detail: "e.g. Big Bass", label: "Top Local-Market Games", weight: 68 },
              {
                detail: "e.g. Cash Eruption, Huff N Even More Puff",
                label: "Top Global Games",
                weight: 58,
              },
              {
                detail: "e.g. Lightning Roulette, Blackjack Live",
                label: "Top Global Table Games",
                weight: 48,
              },
              { label: "New Game", weight: 38 },
            ],
          },
          {
            title: "Stage 2 — Balance revenue with player engagement",
            items: [
              { kind: "promoted", label: "Promoted Games / Event", weight: 100 },
              { kind: "recent", label: "Recently Played Games (1–2 tiles)", weight: 88 },
              { kind: "exclusive", label: "Exclusive Games (2 tiles)", weight: 78 },
              { label: "New Game", weight: 68 },
              { detail: "e.g. Big Bass", label: "Top Local-Market Games", weight: 58 },
              {
                detail: "e.g. Cash Eruption, Huff N Even More Puff",
                label: "Top Global Games",
                weight: 48,
              },
              {
                detail: "e.g. Lightning Roulette, Blackjack Live",
                label: "Top Global Table Games",
                weight: 38,
              },
            ],
          },
        ],
        type: "ranking",
      },
      {
        body: "Final ordering responds to live data and business strategy. If Live Casino becomes a stronger preference, the lane increases Live Casino exposure while keeping portfolio balance and RG guardrails.",
        label: "Note",
        type: "note",
      },
    ],
  },
  {
    badgeTone: "green",
    intro:
      "The lane refreshes in layers — each input updates on its own clock, so the lane stays current without feeling unstable mid-session.",
    title: "Refresh cadence",
    sections: [
      {
        rows: [
          {
            description:
              "Jackpot pool values and live-casino availability reflect immediately — a linked pot or a table going offline updates on the next data event.",
            tag: "REAL-TIME",
            tagClassName: "bg-[#6DE27A] text-[#10110E]",
          },
          {
            description:
              "Cold-start ordering, recently-played injection and personalisation are recomputed on lobby entry, then held stable for that session.",
            tag: "PER SESSION",
            tagClassName: "bg-[#9BD9A4] text-[#10110E]",
          },
          {
            description:
              "The Daily Picks set, the promoted / editorial slot, and market-performance ranking refresh once per day.",
            tag: "DAILY",
            tagClassName: "bg-[#B9B7AA] text-[#10110E]",
          },
          {
            description:
              "Ranking weights are re-tuned weekly against market performance, so the mix tracks real preference (e.g. rising Live Casino) within portfolio and RG limits.",
            tag: "WEEKLY",
            tagClassName: "bg-[#778492] text-white",
          },
        ],
        closingBullet:
          "The hero tile is locked for the duration of a session — it never swaps mid-view, to avoid disorienting the player.",
        type: "cadence",
      },
    ],
  },
  {
    badgeTone: "purple",
    intro:
      "Denmark (Spillemyndigheden) mandates player-set limits and self-exclusion, and heavily restricts bonuses. These shaped the lane design, not just its copy.",
    title: "Responsible-gambling controls — Denmark",
    sections: [
      {
        eyebrow: "MANDATORY CONTROLS (must be available)",
        rows: [
          {
            description:
              "Player-set daily / weekly / monthly deposit caps — reachable from the lobby at all times.",
            label: "Deposit limit",
          },
          {
            description:
              "Net-loss caps over the same periods; the lane never encourages exceeding them.",
            label: "Loss limit",
          },
          {
            description:
              "Time / session limits with reality-check reminders surfaced during play.",
            label: "Session limit",
          },
        ],
        type: "rgControls",
      },
      {
        eyebrow: "HOW THE LANE RESPECTS THEM",
        tone: "purple",
        bullets: [
          {
            text: "No urgency or win-led copy anywhere in the lane — no \"hot\", \"due to drop\", \"win big\", \"claim now\".",
          },
          {
            text: "Bonuses are heavily restricted in DK, so the lane is not bonus-led; Daily Picks shows key reward conditions (first deposit, prize cap, terms) up front.",
          },
          {
            text: "A player near or at a limit is never shown deposit-driven CTAs; the Play Responsibly entry point stays persistently reachable.",
          },
          {
            text: "Crash games are filtered out at the hard-filter stage — not eligible for DK.",
          },
        ],
        type: "bullets",
      },
    ],
  },
  {
    badgeTone: "green",
    intro: "Stated so it can be measured, shipped, or killed on evidence.",
    title: "Hypothesis — validate or kill",
    sections: [
      {
        rows: [
          {
            label: "BELIEF",
            value:
              "A state-based Yes Picks lane gets more game launches within 60s than a plain static game row.",
          },
          {
            label: "PRIMARY METRIC",
            value: "Launches from the lane within 60s of opening the lobby.",
          },
          {
            label: "BASELINE",
            value:
              "Yes isn't live yet, so there's no past data to compare to. We measure it at launch — the static row is the control, running next to the new lane from day one.",
          },
          {
            label: "SHIP",
            tone: "green",
            value:
              "The state-based lane clearly beats the static row, with no responsible-gambling metric getting worse. Exact number set with the team once we see real traffic.",
          },
        ],
        type: "keyValues",
      },
      { type: "divider" },
      {
        eyebrow: "HOW IT IS TESTED",
        bullets: [
          { text: "A/B from launch, 50/50: new lane vs static row, same spot in the lobby." },
          { text: "Run it until we have enough players to trust the result." },
          {
            text: "Check new vs returning separately, so both cold-start and personalised states earn their place.",
          },
        ],
        type: "bullets",
      },
      {
        eyebrow: "KILL CRITERIA",
        tone: "pink",
        bullets: [
          {
            text: "If the new lane doesn't beat the static row, or any RG metric gets worse — drop it.",
          },
        ],
        type: "bullets",
      },
    ],
  },
];

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function SupportDocsModal({
  onClose,
  open,
  returnFocusRef,
}: SupportDocsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const card = supportDocsCards[currentIndex];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < supportDocsCards.length - 1;

  useEffect(() => {
    if (!open) {
      return;
    }

    setCurrentIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const returnFocusTarget = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => dialogRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentIndex((index) => Math.max(index - 1, 0));
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((index) => Math.min(index + 1, supportDocsCards.length - 1));
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

      if (!focusableElements.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusTarget?.focus();
    };
  }, [onClose, open, returnFocusRef]);

  function goPrevious() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function goNext() {
    setCurrentIndex((index) => Math.min(index + 1, supportDocsCards.length - 1));
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(8,9,7,0.62)] px-12 py-8 backdrop-blur-[1px]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-[min(620px,calc(100vw-6rem))]"
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            initial={{ opacity: 0, scale: 0.98, y: 4 }}
            onMouseDown={(event) => event.stopPropagation()}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <button
              aria-label="Close"
              className="absolute -right-9 -top-9 grid h-11 w-11 place-items-center rounded-full border border-[#2B2F26] bg-[#181A15] text-[#B9B7AA] transition hover:border-[#6DE27A] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6DE27A]"
              onClick={onClose}
              type="button"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            {canGoPrevious ? (
              <button
                aria-label="Previous"
                className="absolute left-[-3.35rem] top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#2B2F26] bg-[#181A15] text-[#6DE27A] transition hover:border-[#6DE27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6DE27A]"
                onClick={goPrevious}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
            ) : null}

            {canGoNext ? (
              <button
                aria-label="Next"
                className="absolute right-[-3.35rem] top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#2B2F26] bg-[#181A15] text-[#6DE27A] transition hover:border-[#6DE27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6DE27A]"
                onClick={goNext}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            ) : null}

            <article
              aria-label="Supporting Docs"
              aria-modal="true"
              className="flex max-h-[86vh] flex-col overflow-hidden rounded-[14px] border border-[#2B2F26] bg-[#181A15] text-white shadow-2xl shadow-black/40"
              ref={dialogRef}
              role="dialog"
              tabIndex={-1}
            >
              <div className="flex items-center gap-2 border-b border-[#2B2F26] px-5 py-4">
                <span
                  className={
                    card.badgeTone === "purple"
                      ? "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-md bg-[#7C3AED] text-xs font-black text-[#10110E]"
                      : "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-md bg-[#6DE27A] text-xs font-black text-[#10110E]"
                  }
                >
                  {currentIndex + 1}
                </span>
                <h2 className="text-base font-black leading-5 text-white">{card.title}</h2>
              </div>

              <div className="scrollbar-none min-h-0 space-y-4 overflow-y-auto px-5 py-4">
                <p className="text-xs italic leading-[17px] text-[#B9B7AA]">{card.intro}</p>
                {card.sections.map((section, index) => (
                  <SupportDocsSectionRenderer
                    key={`${section.type}-${index}`}
                    section={section}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-[#2B2F26] px-5 py-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {supportDocsCards.map((_, index) => (
                    <span
                      className={
                        index === currentIndex
                          ? "h-1.5 w-5 rounded-full bg-[#6DE27A]"
                          : "h-1.5 w-1.5 rounded-full bg-[#778492]"
                      }
                      key={index}
                    />
                  ))}
                </div>
                <p className="text-[0.68rem] font-bold text-[#778492]">
                  {currentIndex + 1} / {supportDocsCards.length}
                </p>
              </div>
            </article>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SupportDocsSectionRenderer({ section }: { section: SupportDocsSection }) {
  switch (section.type) {
    case "callout":
      return (
        <section className="rounded-lg border-[1.5px] border-[#6DE27A] bg-[#10110E] p-3">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <BulletList bullets={section.bullets} className="mt-2" tone={section.tone} />
        </section>
      );

    case "tradeoffs":
      return (
        <section className="space-y-2">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div
                className={
                  item.chosen
                    ? "rounded-md border border-[#6DE27A] bg-[#10110E] p-3"
                    : "rounded-md border border-[#2B2F26] bg-[#10110E] p-3"
                }
                key={item.title}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-black text-white">{item.title}</p>
                  {item.chosen ? (
                    <span className="rounded-full bg-[#6DE27A] px-2 py-0.5 text-[0.56rem] font-black uppercase leading-none text-[#10110E]">
                      Chosen
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs leading-[17px] text-[#B9B7AA]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "bullets":
      return (
        <section className="space-y-2">
          {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
          <BulletList bullets={section.bullets} tone={section.tone} />
        </section>
      );

    case "ranking":
      return (
        <section className="space-y-4">
          {section.stages.map((stage) => (
            <div className="space-y-2" key={stage.title}>
              <h3 className="text-xs font-black text-white">{stage.title}</h3>
              <div className="space-y-1.5">
                {stage.items.map((item) => (
                  <RankingWeightRow item={item} key={`${stage.title}-${item.label}`} />
                ))}
              </div>
            </div>
          ))}
        </section>
      );

    case "note":
      return (
        <section className="rounded-md border border-[#4D2525] bg-[#10110E] p-3">
          {section.label ? (
            <p className="text-[0.68rem] font-black uppercase tracking-[0.05em] text-[#F28B82]">
              {section.label}
            </p>
          ) : null}
          <p className="mt-1 text-xs italic leading-[17px] text-[#D6A6A6]">{section.body}</p>
        </section>
      );

    case "cadence":
      return (
        <section className="space-y-3">
          <div className="space-y-2">
            {section.rows.map((row) => (
              <div
                className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-3 rounded-md border border-[#2B2F26] bg-[#10110E] p-3"
                key={row.tag}
              >
                <span
                  className={`inline-flex h-5 items-center justify-center rounded px-2 text-[0.56rem] font-black ${row.tagClassName}`}
                >
                  {row.tag}
                </span>
                <p className="text-xs leading-[17px] text-[#B9B7AA]">{row.description}</p>
              </div>
            ))}
          </div>
          <div className="h-px bg-[#2B2F26]" />
          <BulletList bullets={[{ text: section.closingBullet }]} />
        </section>
      );

    case "rgControls":
      return (
        <section className="space-y-2">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <div className="space-y-2">
            {section.rows.map((row) => (
              <div
                className="grid grid-cols-[7.25rem_minmax(0,1fr)] gap-3 rounded-md border border-[#4B238F] bg-[#10110E] p-3"
                key={row.label}
              >
                <span className="inline-flex h-5 items-center justify-center rounded border border-[#7C3AED] px-2 text-[0.58rem] font-black text-[#C4A6F2]">
                  {row.label}
                </span>
                <p className="text-xs leading-[17px] text-[#B9B7AA]">{row.description}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "keyValues":
      return (
        <section className="space-y-3">
          {section.rows.map((row) => (
            <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3" key={row.label}>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.05em] text-[#778492]">
                {row.label}
              </p>
              <p
                className={
                  row.tone === "green"
                    ? "text-xs font-semibold leading-[17px] text-[#6DE27A]"
                    : "text-xs leading-[17px] text-[#B9B7AA]"
                }
              >
                {row.value}
              </p>
            </div>
          ))}
        </section>
      );

    case "divider":
      return <div className="h-px bg-[#2B2F26]" />;

    default:
      return null;
  }
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[0.65rem] font-black uppercase leading-none tracking-[0.05em] text-[#778492]">
      {children}
    </p>
  );
}

function BulletList({
  bullets,
  className,
  tone = "green",
}: {
  bullets: LeadBullet[];
  className?: string;
  tone?: Tone;
}) {
  const dotClassName =
    tone === "purple"
      ? "bg-[#C4A6F2]"
      : tone === "pink"
        ? "bg-[#F28B82]"
        : "bg-[#6DE27A]";
  const textClassName =
    tone === "purple"
      ? "text-[#C4A6F2]"
      : tone === "pink"
        ? "text-[#F28B82]"
        : "text-[#B9B7AA]";

  return (
    <ul className={className ? `space-y-2 ${className}` : "space-y-2"}>
      {bullets.map((bullet) => (
        <li className="flex gap-2" key={`${bullet.lead ?? ""}-${bullet.text}`}>
          <span
            aria-hidden="true"
            className={`mt-[0.42rem] h-1 w-1 shrink-0 rounded-full ${dotClassName}`}
          />
          <span className={`text-xs leading-[17px] ${textClassName}`}>
            {bullet.lead ? <strong className="font-black text-white">{bullet.lead}</strong> : null}
            {bullet.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function RankingWeightRow({ item }: { item: RankingItem }) {
  const labelClassName =
    item.kind === "promoted"
      ? "text-[#B794F4]"
      : item.kind === "recent"
        ? "text-[#F28B82]"
        : item.kind === "exclusive"
          ? "text-white"
          : "text-[#9BA5AE]";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_6.25rem] items-center gap-3">
      <div className="min-w-0">
        <p className={`truncate text-xs font-bold leading-4 ${labelClassName}`}>{item.label}</p>
        {item.detail ? (
          <p className="truncate text-[0.68rem] italic leading-3 text-[#778492]">{item.detail}</p>
        ) : null}
      </div>
      <div className="h-1.5 rounded-full bg-[#22261E]">
        <div
          className="h-full rounded-full bg-[#6DE27A]"
          style={{ width: `${item.weight}%` }}
        />
      </div>
    </div>
  );
}

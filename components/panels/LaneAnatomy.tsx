"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Scenario } from "@/lib/types";

type LaneAnatomyProps = {
  scenario: Scenario;
};

type LaneAnatomyImage = {
  alt: string;
  height: number;
  src: string;
  title: string;
  width: number;
};

const laneAnatomyImages: Record<Scenario["id"], LaneAnatomyImage> = {
  "new-player": {
    alt: "New Player Yes Picks lane anatomy with featured hero tile and supporting game tiles",
    height: 290,
    src: "/lane-anatomy/new-player.png",
    title: "New Player",
    width: 830,
  },
  "daily-picks-available": {
    alt: "Daily Picks Yes Picks lane anatomy with daily game hero tile and supporting game tiles",
    height: 292,
    src: "/lane-anatomy/daily-picks.png",
    title: "Daily Picks",
    width: 830,
  },
  "jackpot-event-available": {
    alt: "Jackpot Event Yes Picks lane anatomy with Yes Pots hero tile and linked game tiles",
    height: 290,
    src: "/lane-anatomy/jackpot.png",
    title: "Jackpot Event",
    width: 1066,
  },
  "returning-player": {
    alt: "Returning Player Yes Picks lane anatomy with recently played tiles first",
    height: 291,
    src: "/lane-anatomy/returning-player.png",
    title: "Returning Player",
    width: 709,
  },
};

export function LaneAnatomy({ scenario }: LaneAnatomyProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const image = laneAnatomyImages[scenario.id];

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <section aria-labelledby="lane-anatomy-title" className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="lane-anatomy-title"
          className="text-base font-black uppercase tracking-[0.12em] text-yes-green"
        >
          Lane Anatomy
        </h2>
        <span className="text-xs font-semibold text-yes-muted">Click to enlarge</span>
      </div>

      <button
        aria-label={`Open larger ${image.title} lane anatomy image`}
        className="group relative block w-full overflow-hidden rounded-lg border border-yes-line bg-[#222] p-2 text-left transition hover:border-yes-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yes-green"
        onClick={() => setIsExpanded(true)}
        type="button"
      >
        <Image
          alt={image.alt}
          className="h-auto w-full rounded-md"
          height={image.height}
          priority={false}
          sizes="(min-width: 1440px) 420px, 100vw"
          src={image.src}
          width={image.width}
        />
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-90 transition group-hover:bg-yes-green group-hover:text-yes-ink">
          <Maximize2 aria-hidden="true" className="h-4 w-4" />
        </span>
      </button>

      {isExpanded ? (
        <div
          aria-labelledby="lane-anatomy-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
        >
          <button
            aria-label="Close enlarged lane anatomy image"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsExpanded(false)}
            type="button"
          />
          <div className="relative z-10 max-h-[92dvh] w-full max-w-[1120px] overflow-hidden rounded-xl border border-white/15 bg-[#111] p-3 shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 id="lane-anatomy-dialog-title" className="text-base font-black text-white">
                {image.title} Lane Anatomy
              </h3>
              <button
                aria-label="Close enlarged lane anatomy image"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setIsExpanded(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div className="scrollbar-none max-h-[78dvh] overflow-auto rounded-lg bg-black">
              <Image
                alt={image.alt}
                className="h-auto w-full min-w-[680px]"
                height={image.height}
                sizes="(min-width: 1280px) 1066px, 94vw"
                src={image.src}
                width={image.width}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

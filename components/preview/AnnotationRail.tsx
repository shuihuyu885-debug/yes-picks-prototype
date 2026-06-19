"use client";

import { clsx } from "clsx";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export type AnnotationId = 1 | 2 | 3;

type AnnotationRailProps = {
  activeAnnotation: AnnotationId | null;
  className?: string;
  layout: "vertical" | "horizontal";
  onAnnotationChange: (annotation: AnnotationId | null) => void;
};

type AnnotationContent = {
  body: string[];
  bullets?: string[];
  footer?: string;
  markerY: number;
  title: string;
};

const annotations: Record<AnnotationId, AnnotationContent> = {
  1: {
    body: [
      "Reserved for broad campaign messaging or high-level lobby communication. This area is not specific enough for Yes Picks because it is usually owned by wider promotional or brand messaging.",
    ],
    markerY: 245,
    title: "Top lobby campaign area",
  },
  2: {
    body: [
      "The first lane is usually a single-message hero - one banner, one push. Yes Picks sits directly below it because this is the first scrollable, multi-game slot with enough width to show breadth instead of one bet.",
      "It makes sense here for the concentrated best of everything Yes recommends:",
    ],
    bullets: [
      "strong pushes such as promoted or strategic content",
      "hottest content such as top games by local and global market performance",
      "recently played games for personalisation",
      "strongest pull for returning players",
    ],
    footer:
      "This position gives Yes Picks the highest-visibility scrollable slot without competing with the top campaign banner.",
    markerY: 505,
    title: "Why Yes Picks sits in the second lane",
  },
  3: {
    body: [
      "Lower content rows can support broader discovery, category browsing and secondary recommendations, but they are less suitable for the first decision-making lane.",
    ],
    markerY: 755,
    title: "Lower lobby content",
  },
};

const markerIds: AnnotationId[] = [1, 2, 3];

export function AnnotationRail({
  activeAnnotation,
  className,
  layout,
  onAnnotationChange,
}: AnnotationRailProps) {
  const [pinnedAnnotation, setPinnedAnnotation] = useState<AnnotationId | null>(null);
  const activeContent = activeAnnotation ? annotations[activeAnnotation] : null;

  useEffect(() => {
    if (!activeAnnotation) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPinnedAnnotation(null);
        onAnnotationChange(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeAnnotation, onAnnotationChange]);

  function handleMarkerEnter(annotation: AnnotationId) {
    if (!pinnedAnnotation) {
      onAnnotationChange(annotation);
    }
  }

  function handleRailLeave() {
    if (!pinnedAnnotation) {
      onAnnotationChange(null);
    }
  }

  function handleMarkerClick(annotation: AnnotationId) {
    if (pinnedAnnotation === annotation) {
      setPinnedAnnotation(null);
      onAnnotationChange(null);
      return;
    }

    setPinnedAnnotation(annotation);
    onAnnotationChange(annotation);
  }

  function handleClose() {
    setPinnedAnnotation(null);
    onAnnotationChange(null);
  }

  if (layout === "horizontal") {
    return (
      <div className={clsx("relative w-full", className)} onMouseLeave={handleRailLeave}>
        <div className="flex items-center justify-center gap-3">
          {markerIds.map((marker) => (
            <AnnotationMarker
              activeAnnotation={activeAnnotation}
              key={marker}
              marker={marker}
              onClick={() => handleMarkerClick(marker)}
              onFocus={() => handleMarkerEnter(marker)}
              onMouseEnter={() => handleMarkerEnter(marker)}
              pinned={pinnedAnnotation === marker}
            />
          ))}
        </div>

        {activeContent ? (
          <AnnotationNote
            annotation={activeContent}
            className="mt-3 w-full"
            onClose={handleClose}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      aria-label="Lane position annotation rail"
      className={clsx("relative h-[956px] w-8 shrink-0", className)}
      onMouseLeave={handleRailLeave}
    >
      <RailSegment active={activeAnnotation === 1} height={190} top={142} />
      <RailSegment active={activeAnnotation === 2} height={270} top={372} />
      <RailSegment active={activeAnnotation === 3} height={190} top={675} />

      {markerIds.map((marker) => (
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          key={marker}
          style={{ top: annotations[marker].markerY }}
        >
          <AnnotationMarker
            activeAnnotation={activeAnnotation}
            marker={marker}
            onClick={() => handleMarkerClick(marker)}
            onFocus={() => handleMarkerEnter(marker)}
            onMouseEnter={() => handleMarkerEnter(marker)}
            pinned={pinnedAnnotation === marker}
          />
        </div>
      ))}

      {activeContent && activeAnnotation ? (
        <AnnotationNote
          annotation={activeContent}
          className="absolute right-[calc(100%+0.75rem)] w-[300px] -translate-y-1/2"
          onClose={handleClose}
          style={{ top: annotations[activeAnnotation].markerY }}
          withPointer
        />
      ) : null}
    </div>
  );
}

function RailSegment({ active, height, top }: { active: boolean; height: number; top: number }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed transition-colors",
        active ? "border-red-500" : "border-white/55",
      )}
      style={{ height, top }}
    />
  );
}

function AnnotationMarker({
  activeAnnotation,
  marker,
  onClick,
  onFocus,
  onMouseEnter,
  pinned,
}: {
  activeAnnotation: AnnotationId | null;
  marker: AnnotationId;
  onClick: () => void;
  onFocus: () => void;
  onMouseEnter: () => void;
  pinned: boolean;
}) {
  const isActive = activeAnnotation === marker;
  const isPrimary = marker === 2;

  return (
    <button
      aria-expanded={isActive}
      aria-label={`Show note for ${annotations[marker].title}`}
      aria-pressed={pinned}
      className={clsx(
        "grid h-8 w-8 place-items-center rounded-full border text-sm font-black shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        isPrimary && isActive
          ? "border-red-400 bg-red-500 text-white shadow-red-500/40"
          : "border-white/35 bg-[#5b5f63] text-white hover:border-white/70",
      )}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      type="button"
    >
      {marker}
    </button>
  );
}

function AnnotationNote({
  annotation,
  className,
  onClose,
  style,
  withPointer = false,
}: {
  annotation: AnnotationContent;
  className?: string;
  onClose: () => void;
  style?: CSSProperties;
  withPointer?: boolean;
}) {
  return (
    <article
      className={clsx(
        "relative z-40 rounded-sm bg-white p-4 text-slate-950 shadow-2xl ring-1 ring-black/10",
        className,
      )}
      style={style}
    >
      {withPointer ? (
        <span
          aria-hidden="true"
          className="absolute right-[-8px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white"
        />
      ) : null}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-black leading-5">{annotation.title}</h3>
          <button
            aria-label="Close lane position note"
            className="-mr-2 -mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 space-y-2 text-sm font-semibold italic leading-5">
          {annotation.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {annotation.bullets ? (
          <ul className="mt-2 space-y-1.5 text-sm font-black leading-5">
            {annotation.bullets.map((bullet) => (
              <li className="flex gap-2" key={bullet}>
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {annotation.footer ? (
          <p className="mt-2 text-sm font-semibold italic leading-5">{annotation.footer}</p>
        ) : null}
      </div>
    </article>
  );
}

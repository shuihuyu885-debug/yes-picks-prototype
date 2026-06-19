"use client";

import { clsx } from "clsx";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  title: string;
};

const markerPositions: Record<
  AnnotationId,
  { markerY: number; segmentHeight: number; segmentTop: number }
> = {
  1: {
    markerY: 261,
    segmentHeight: 188,
    segmentTop: 167,
  },
  2: {
    markerY: 531,
    segmentHeight: 331,
    segmentTop: 365,
  },
  3: {
    markerY: 839,
    segmentHeight: 233,
    segmentTop: 723,
  },
};

const markerLabels: Record<AnnotationId, string> = {
  1: "Top lobby campaign area",
  2: "Why Yes Picks sits in the second lane",
  3: "Lower lobby content",
};

const yesPicksPositionNote: AnnotationContent = {
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
  title: "Why Yes Picks sits in the second lane",
};

const markerIds: AnnotationId[] = [1, 2, 3];
const annotationRed = "#ff0b1a";
const verticalNoteWidth = 312;
const dashlineLeftOffset = 7;

export function AnnotationRail({
  activeAnnotation,
  className,
  layout,
  onAnnotationChange,
}: AnnotationRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [pinnedAnnotation, setPinnedAnnotation] = useState<AnnotationId | null>(null);
  const [verticalNotePosition, setVerticalNotePosition] = useState<CSSProperties | null>(null);
  const activeContent = activeAnnotation === 2 ? yesPicksPositionNote : null;

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

  useEffect(() => {
    if (layout !== "vertical" || activeAnnotation !== 2) {
      setVerticalNotePosition(null);
      return;
    }

    function updateNotePosition() {
      const rail = railRef.current;

      if (!rail) {
        return;
      }

      const railRect = rail.getBoundingClientRect();
      const dashlineLeft = railRect.left + dashlineLeftOffset;

      setVerticalNotePosition({
        left: dashlineLeft - verticalNoteWidth,
        position: "fixed",
        top: railRect.top + markerPositions[2].markerY,
        width: verticalNoteWidth,
      });
    }

    updateNotePosition();
    window.addEventListener("resize", updateNotePosition);
    window.addEventListener("scroll", updateNotePosition, true);

    return () => {
      window.removeEventListener("resize", updateNotePosition);
      window.removeEventListener("scroll", updateNotePosition, true);
    };
  }, [activeAnnotation, layout]);

  function handleMarkerEnter(annotation: AnnotationId) {
    if (annotation !== 2) {
      return;
    }

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
    if (annotation !== 2) {
      return;
    }

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
          {activeContent ? (
            <AnnotationNote
              annotation={activeContent}
              className="min-w-0 max-w-[300px] flex-1"
              onClose={handleClose}
              withPointer
            />
          ) : null}

          <div className="flex shrink-0 items-center gap-2">
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
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Lane position annotation rail"
      className={clsx("relative h-[956px] w-8 shrink-0", className)}
      onMouseLeave={handleRailLeave}
      ref={railRef}
    >
      {markerIds.map((marker) => (
        <RailSegment
          height={markerPositions[marker].segmentHeight}
          highlighted={marker === 2}
          key={`segment-${marker}`}
          top={markerPositions[marker].segmentTop}
        />
      ))}

      {markerIds.map((marker) => (
        <div
          className="absolute left-[22px] -translate-x-1/2 -translate-y-1/2"
          key={marker}
          style={{ top: markerPositions[marker].markerY }}
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

      {activeContent && verticalNotePosition ? (
        <AnnotationNote
          annotation={activeContent}
          className="-translate-y-1/2"
          onClose={handleClose}
          style={verticalNotePosition}
        />
      ) : null}
    </div>
  );
}

function RailSegment({
  height,
  highlighted,
  top,
}: {
  height: number;
  highlighted: boolean;
  top: number;
}) {
  const color = highlighted ? annotationRed : "rgba(255,255,255,0.88)";

  return (
    <svg
      aria-hidden="true"
      className="absolute left-0 w-7"
      fill="none"
      height={height}
      style={{ top }}
      viewBox={`0 0 28 ${height}`}
      width="28"
    >
      <path
        d={`M24 1 H14 C9 1 7 5 7 10 V${height - 10} C7 ${height - 5} 9 ${height - 1} 14 ${height - 1} H24`}
        stroke={color}
        strokeDasharray="2 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
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
  const content = marker;

  if (!isPrimary) {
    return (
      <span
        aria-label={`${markerLabels[marker]} marker`}
        className="grid h-7 w-7 place-items-center rounded-full bg-black text-base font-black leading-none text-white shadow-sm ring-1 ring-white/15"
        role="img"
      >
        {content}
      </span>
    );
  }

  return (
    <button
      aria-expanded={isActive}
      aria-label={`Show note for ${markerLabels[marker]}`}
      aria-pressed={pinned}
      className={clsx(
        "grid h-7 w-7 place-items-center rounded-full bg-[#ff0b1a] text-base font-black leading-none text-white shadow-sm transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
      )}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      type="button"
    >
      {content}
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

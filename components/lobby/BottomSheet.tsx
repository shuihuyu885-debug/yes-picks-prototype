"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type BottomSheetProps = {
  open: boolean;
  title: string;
  body?: string;
  bullets?: string[];
  onClose: () => void;
};

export function BottomSheet({ body, bullets = [], onClose, open, title }: BottomSheetProps) {
  const titleId = useId();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-end bg-slate-950/35"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <button
            aria-label="Dismiss prototype message"
            className="absolute inset-0 cursor-default focus:outline-none"
            onClick={onClose}
            tabIndex={-1}
            type="button"
          />

          <motion.section
            aria-labelledby={titleId}
            aria-modal="true"
            className="relative w-full rounded-t-2xl bg-white px-5 pb-8 pt-4 text-slate-950 shadow-[0_-20px_45px_rgba(15,23,42,0.18)]"
            exit={{ y: 24, opacity: 0 }}
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            role="dialog"
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-slate-300" aria-hidden="true" />
            <button
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
              onClick={onClose}
              type="button"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="max-h-[360px] overflow-y-auto pr-11">
              <h2 id={titleId} className="text-xl font-black tracking-normal text-[#5d5a88]">
                {title}
              </h2>
              {body ? <p className="mt-3 text-sm leading-6 text-slate-700">{body}</p> : null}
              {bullets.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  {bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        className="mt-[0.56rem] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-700"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

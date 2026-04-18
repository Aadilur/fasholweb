"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export type AccordionItem = {
  index: string;
  title: string;
  tag?: string;
  body: React.ReactNode;
};

export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="border-t border-[var(--color-line-strong)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.index} className="border-b border-[var(--color-line-strong)]">
            <button
              type="button"
              className="w-full flex items-center justify-between py-7 tablet:py-8 text-left group"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className="flex items-start gap-6 tablet:gap-10 min-w-0 flex-1">
                <span className="t-mono text-[11px] text-[var(--color-ink-muted)] pt-2 shrink-0">{item.index}</span>
                <div className="min-w-0">
                  <h3 className="t-h4" style={{ fontWeight: 500 }}>{item.title}</h3>
                  {item.tag && (
                    <span className="t-mono text-[11px] text-[var(--color-ink-muted)] mt-2 inline-block">{item.tag}</span>
                  )}
                </div>
              </div>
              <span
                aria-hidden
                className={clsx(
                  "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-ink)] transition-transform duration-400",
                  isOpen && "rotate-45"
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 tablet:pl-[60px] max-w-3xl t-body">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import clsx from "clsx";

interface ComparisonPairProps {
  index: number;
  oldAnchor: string;
  oldBody: string;
  fasholAnchor: string;
  fasholAnchorIsNumeric: boolean;
  fasholBody: string;
}

// Longer anchors scale down so "AT THE HUB" and "FOUR-TIER" still fit the 70% column.
function anchorFontSize(anchor: string): string {
  const len = anchor.length;
  if (len > 9) return "clamp(36px, 6vw, 64px)";
  if (len > 6) return "clamp(40px, 7vw, 76px)";
  return "clamp(44px, 8vw, 88px)";
}

export function ComparisonPair({
  index,
  oldAnchor,
  oldBody,
  fasholAnchor,
  fasholAnchorIsNumeric,
  fasholBody,
}: ComparisonPairProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [numericValue, setNumericValue] = useState(0);

  const fasholOnLeft = index % 2 === 0;

  // "200+" → target=200, suffix="+". "50" → target=50, suffix="".
  const numericMatch = fasholAnchorIsNumeric ? fasholAnchor.match(/^(\d+)/) : null;
  const numericTarget = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const numericSuffix = numericMatch ? fasholAnchor.slice(numericMatch[0].length) : "";

  useEffect(() => {
    if (reduce) {
      setInView(true);
      if (fasholAnchorIsNumeric) setNumericValue(numericTarget);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce, fasholAnchorIsNumeric, numericTarget]);

  useEffect(() => {
    if (!inView || !fasholAnchorIsNumeric || reduce) return;
    const duration = 800;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      setNumericValue(Math.round(numericTarget * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 700);
    return () => {
      window.clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inView, fasholAnchorIsNumeric, numericTarget, reduce]);

  const shown = inView || !!reduce;
  const anchorSize = anchorFontSize(fasholAnchor);
  const displayAnchor = fasholAnchorIsNumeric
    ? `${numericValue}${numericSuffix}`
    : fasholAnchor;

  return (
    <div
      ref={rootRef}
      role="listitem"
      className="py-12 tablet:py-16 desktop:py-20 grid grid-cols-1 desktop:grid-cols-10 gap-8 desktop:gap-12 items-start"
    >
      {/* Old-way column (30% on desktop; always first on mobile via DOM order). */}
      <div
        className={clsx(
          "desktop:col-span-3",
          fasholOnLeft ? "desktop:order-2" : "desktop:order-1"
        )}
        style={{
          opacity: shown ? 0.6 : 0,
          transform: shown ? "translateY(0)" : "translateY(20px)",
          transition: reduce
            ? undefined
            : "opacity 500ms ease-out, transform 500ms ease-out",
        }}
      >
        {/* Inline-flex column shrinks to the tag's content width so the 60% line
            below is measured against the tag, not the whole column. */}
        <div className="inline-flex flex-col items-start">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(6, 94, 58, 0.5)",
              whiteSpace: "nowrap",
            }}
          >
            {oldAnchor}
          </span>
          <span
            aria-hidden
            style={{
              display: "block",
              marginTop: "16px",
              width: "60%",
              height: "1px",
              background: "rgba(184, 196, 165, 0.3)",
              transformOrigin: "left",
              transform: shown ? "scaleX(1)" : "scaleX(0)",
              transition: reduce ? undefined : "transform 400ms ease-out 300ms",
            }}
          />
        </div>
        <p
          style={{
            marginTop: "24px",
            fontFamily: "var(--font-display)",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "rgba(6, 94, 58, 0.6)",
          }}
        >
          {oldBody}
        </p>
      </div>

      {/* Fashol column (70% on desktop). */}
      <div
        className={clsx(
          "desktop:col-span-7",
          fasholOnLeft ? "desktop:order-1" : "desktop:order-2"
        )}
      >
        <strong
          style={{
            display: "block",
            fontFamily: "var(--font-display)",
            fontSize: anchorSize,
            fontWeight: 500,
            lineHeight: 0.95,
            color: "var(--color-deep-green)",
            opacity: shown ? 1 : 0,
            letterSpacing:
              shown || fasholAnchorIsNumeric ? "0em" : "0.08em",
            transition: reduce
              ? undefined
              : fasholAnchorIsNumeric
              ? "opacity 500ms ease-out 700ms"
              : "opacity 500ms ease-out 700ms, letter-spacing 600ms ease-out 700ms",
          }}
        >
          {displayAnchor}
        </strong>
        <p
          style={{
            marginTop: "24px",
            maxWidth: "480px",
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            lineHeight: 1.55,
            color: "var(--color-deep-green)",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(12px)",
            transition: reduce
              ? undefined
              : "opacity 500ms ease-out 900ms, transform 500ms ease-out 900ms",
          }}
        >
          {fasholBody}
        </p>
      </div>
    </div>
  );
}

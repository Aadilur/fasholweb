"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  to: number;
  duration?: number;
  delay?: number;
  format?: "comma" | "plain";
  trigger?: "mount" | "inview";
  inviewMargin?: string;
  suffix?: string;
  className?: string;
  /** If provided, animation runs only once per browser session (per unique key). */
  sessionKey?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function formatNum(n: number, fmt: "comma" | "plain") {
  return fmt === "comma" ? n.toLocaleString("en-US") : String(n);
}

// useLayoutEffect on the client, useEffect on the server — avoids paint flash
// when we synchronously resolve the "skip animation" branch on repeat session visits.
const useIsoLayoutEffect: typeof useEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function readSessionFlag(key: string | undefined): boolean {
  if (!key || typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string | undefined) {
  if (!key || typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    /* ignore storage errors (private mode, quota, etc.) */
  }
}

export function CountUp({
  to,
  duration = 1200,
  delay = 0,
  format = "plain",
  trigger = "mount",
  inviewMargin = "0px",
  suffix = "",
  className,
  sessionKey,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);

  const displayValue = reduce ? to : value;
  const displayDone = !!reduce || done;

  useIsoLayoutEffect(() => {
    if (reduce) return;
    if (startedRef.current) return;

    // Session-gate: if this CountUp has already animated this session,
    // snap straight to the final value without animating again.
    if (readSessionFlag(sessionKey)) {
      startedRef.current = true;
      setValue(to);
      setDone(true);
      return;
    }

    let startTs = 0;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      setValue(Math.round(to * easeOutCubic(t)));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
        writeSessionFlag(sessionKey);
      }
    };

    const begin = () => {
      startedRef.current = true;
      window.setTimeout(() => {
        requestAnimationFrame(tick);
      }, delay);
    };

    if (trigger === "mount") {
      begin();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            begin();
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: inviewMargin, threshold: 0 },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
    };
    // We intentionally don't cancel RAF on unmount/strict-mode cleanup — doing so
    // causes a visible flash to 0 when React strict mode double-invokes effects.
    // startedRef prevents re-setup; leaked RAFs ticking after true unmount are no-ops
    // in React 19 (setState on unmounted component is silently ignored).
  }, [reduce, trigger, to, duration, delay, inviewMargin, sessionKey]);

  return (
    <span ref={ref} className={className}>
      {formatNum(displayValue, format)}
      {displayDone ? suffix : ""}
    </span>
  );
}

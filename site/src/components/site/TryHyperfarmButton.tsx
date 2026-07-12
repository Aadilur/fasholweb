"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HYPERFARM_VIOLET = "#7E00FF";
const HYPERFARM_CREAM = "#F4EFD8";

const APP_STORE_URL = "https://apps.apple.com/bd/app/hyperfarm/";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.fashol.hyperfarm";
const WEB_URL = "https://hyperfarm.global/";

const PLATFORMS = [
  { label: "App Store", detail: "iPhone, iPad", href: APP_STORE_URL },
  { label: "Google Play", detail: "Android", href: PLAY_STORE_URL },
  { label: "hyperfarm.global", detail: "Web browser", href: WEB_URL },
];

type Tone = "violet" | "cream";

function detectPlatform(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  // iPadOS 13+ reports as Mac with touch support - catch that too.
  if (
    navigator.platform === "MacIntel" &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1
  ) {
    return "ios";
  }
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export function TryHyperfarmButton({
  tone = "violet",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    const p = detectPlatform();
    if (p === "ios") {
      window.open(APP_STORE_URL, "_blank", "noopener,noreferrer");
      return;
    }
    if (p === "android") {
      window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isViolet = tone === "violet";
  const baseStyle: React.CSSProperties = isViolet
    ? {
        background: HYPERFARM_VIOLET,
        color: "#FFFFFF",
        boxShadow: "0 1px 2px rgba(126,0,255,0.18)",
      }
    : {
        background: HYPERFARM_CREAM,
        color: HYPERFARM_VIOLET,
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`btn ${className}`.trim()}
        style={{
          ...baseStyle,
          border: "none",
          height: 50,
          paddingInline: 28,
          fontWeight: 500,
        }}
      >
        Try Hyperfarm
      </button>

      <AnimatePresence>
        {open && (
          <PlatformsModal key="hyperfarm-platforms" onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function PlatformsModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Try Hyperfarm"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(126,0,255,0.45)" }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 tablet:p-10 shadow-xl"
        style={{
          background: HYPERFARM_CREAM,
          border: "1px solid rgba(126,0,255,0.18)",
        }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ color: HYPERFARM_VIOLET }}
        >
          <span aria-hidden className="text-[22px] leading-none">
            ×
          </span>
        </button>
        <div className="relative h-14 w-14 mb-5">
          <Image
            src="/images/content/hyperfarm-logo.png"
            alt="Hyperfarm"
            width={128}
            height={128}
            sizes="56px"
            className="h-full w-full object-contain"
          />
        </div>
        <h3
          className="t-h3"
          style={{ fontWeight: 500, color: "var(--color-ink)" }}
        >
          Try Hyperfarm
        </h3>
        <p
          className="t-body-sm mt-2"
          style={{ color: "var(--color-ink-muted)" }}
        >
          Pick your platform. iOS, Android, or web.
        </p>
        <ul className="mt-7 flex flex-col gap-3">
          {PLATFORMS.map((p) => (
            <li key={p.label}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-colors"
                style={{
                  background: "var(--color-paper)",
                  border: "1px solid rgba(126,0,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = HYPERFARM_VIOLET;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,0,255,0.15)";
                }}
              >
                <div>
                  <div
                    className="t-body"
                    style={{ fontWeight: 500, color: "var(--color-ink)" }}
                  >
                    {p.label}
                  </div>
                  <div
                    className="text-[11px] tracking-[0.14em] uppercase mt-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: HYPERFARM_VIOLET,
                      fontWeight: 500,
                    }}
                  >
                    {p.detail}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

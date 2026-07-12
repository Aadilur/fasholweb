"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import clsx from "clsx";
import { useLang } from "./LanguageProvider";

/**
 * Flips the `lang` cookie and soft-refreshes so every server + client component
 * re-renders in the chosen language - no full reload, no scroll jump.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const lang = useLang();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = lang === "bn" ? "en" : "bn";

  const switchTo = () => {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      onClick={switchTo}
      disabled={pending}
      aria-label={next === "bn" ? "বাংলায় দেখুন" : "View in English"}
      className={clsx(
        "inline-flex items-center justify-center h-9 min-w-9 px-3 rounded-full border border-[rgba(19,19,19,0.14)]",
        "text-[13px] font-medium tracking-tight text-[var(--color-ink-subtle)]",
        "hover:text-[var(--color-ink)] hover:bg-[rgba(19,19,19,0.05)] transition-colors cursor-pointer",
        pending && "opacity-60",
        className
      )}
    >
      {lang === "bn" ? "EN" : <span className="lang-bn">বাংলা</span>}
    </button>
  );
}

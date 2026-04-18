"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

/**
 * Voiceflow nav, two states:
 *  • AT Y=0 — outer is transparent (no white band). Three visually-separate
 *    groups: [Logo naked] [Center pill with links (its own frosted bg)] [CTAs naked].
 *  • ON SCROLL — outer container shrinks to ~880px, morphs into a single
 *    frosted pill that unifies all three groups. The center pill's own
 *    background fades out so it merges cleanly into the outer shell.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 py-3 tablet:py-5 transition-opacity duration-700",
        mounted ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          "mx-auto relative",
          "transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled || open
            ? "max-w-[880px] rounded-full border border-[rgba(19,19,19,0.08)] shadow-[0_4px_24px_-12px_rgba(19,19,19,0.14)]"
            : "max-w-[1360px] border border-transparent",
          "w-[calc(100%-16px)] tablet:w-[calc(100%-40px)]"
        )}
      >
        {/* Outer frosted background — ONLY visible when scrolled/open */}
        <span
          aria-hidden
          className={clsx(
            "absolute inset-0 rounded-full overflow-hidden transition-opacity duration-[320ms] ease-out pointer-events-none",
            scrolled || open ? "opacity-100" : "opacity-0",
            "backdrop-blur-[24px] saturate-[1.5]"
          )}
        >
          <span className="absolute inset-0 bg-[rgba(255,255,255,0.35)]" />
          <span className="absolute inset-0" style={{ background: "rgba(228, 231, 231, 0.45)" }} />
        </span>

        <div className="relative flex items-center justify-between gap-4 h-12 tablet:h-14 px-4 tablet:px-5">

          {/* ── LEFT — logo (naked, no chip) ── */}
          <Link
            href="/"
            aria-label="Fashol home"
            className="relative flex items-center shrink-0 px-2 py-0.5"
          >
            <Image
              src="/fashol-logo-full.png"
              alt="Fashol"
              width={400}
              height={120}
              priority
              className="relative h-8 tablet:h-9 w-auto object-contain"
            />
          </Link>

          {/* ── CENTER — nav pill. Has its own frosted bg at Y=0, fades into outer on scroll ── */}
          <nav
            className={clsx(
              "hidden desktop:flex items-center gap-1 relative rounded-full px-2 py-1",
              "transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled
                ? "border border-transparent"
                : "border border-[rgba(19,19,19,0.06)]"
            )}
          >
            {/* Inner center-pill frosted bg — fades OUT on scroll */}
            <span
              aria-hidden
              className={clsx(
                "absolute inset-0 rounded-full overflow-hidden pointer-events-none transition-opacity duration-[320ms]",
                scrolled ? "opacity-0" : "opacity-100",
                "backdrop-blur-[24px] saturate-[1.5]"
              )}
            >
              <span className="absolute inset-0 bg-[rgba(255,255,255,0.78)]" />
              <span className="absolute inset-0" style={{ background: "rgba(228, 231, 231, 0.35)" }} />
            </span>

            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "group relative font-[var(--font-display)] text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors duration-200 tracking-tight",
                    active
                      ? "text-[var(--color-ink)] bg-[rgba(19,19,19,0.06)]"
                      : "text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]"
                  )}
                >
                  <span className="relative inline-block">
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT — standalone CTAs ── */}
          <div className="hidden desktop:flex items-center gap-2 shrink-0">
            <Button variant="primary" href="/contact" className="!h-9 !px-4 !text-[12px]">
              Partner with Fashol
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="desktop:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-[rgba(19,19,19,0.12)] bg-[rgba(255,255,255,0.7)] backdrop-blur-md"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-[4px]">
              <span className={clsx("block w-4 h-[1.5px] bg-[var(--color-ink)] transition-transform duration-300", open && "translate-y-[2.75px] rotate-45")} />
              <span className={clsx("block w-4 h-[1.5px] bg-[var(--color-ink)] transition-transform duration-300", open && "-translate-y-[2.75px] -rotate-45")} />
            </span>
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={clsx(
            "desktop:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-out",
            open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-3 pb-3 pt-1">
            <div className="rounded-2xl bg-[#262626] border border-[#404040] p-4">
              <ul className="flex flex-col">
                {LINKS.map((l) => {
                  const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={clsx(
                          "flex items-center justify-between py-2.5 transition-colors",
                          active ? "text-white" : "text-[rgba(255,255,255,0.6)] hover:text-white"
                        )}
                      >
                        <span className="font-[var(--font-display)] text-[14px] font-medium tracking-tight">{l.label}</span>
                        <span aria-hidden className="text-[13px]">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#404040] flex flex-col gap-2">
                <Button variant="primary" href="/contact">Partner with Fashol</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

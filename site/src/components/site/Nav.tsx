"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { NavDropdown } from "@/components/site/NavDropdown";
import { NAV_MENUS, allItems, PRODUCT_LOGOS, type NavMenu } from "@/data/nav";

type MenuId = (typeof NAV_MENUS)[number]["id"];

const LEAD_LINKS = [{ href: "/", label: "Overview" }];
const TAIL_LINKS = [
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

const CLOSE_DELAY_MS = 200;

// Pages whose hero sits directly under the nav in a dark tone — the green
// Fashol logo becomes invisible there, so we recolor it to cream. Add future
// stakeholder pages here as their dark-hero heroes are built out.
const DARK_HERO_PATHS: ReadonlySet<string> = new Set([
  "/solutions/farmers",
  "/solutions/restaurants",
  "/solutions/exporters",
  "/solutions/wholesalers",
  "/solutions/commission-agents",
  "/solutions/supershops",
  "/solutions/retailers",
]);

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [activeSlugs, setActiveSlugs] = useState<Record<MenuId, string>>(() => {
    const entries = NAV_MENUS.map((m) => [m.id, allItems(m)[0].slug] as const);
    return Object.fromEntries(entries) as Record<MenuId, string>;
  });
  const [mobileExpanded, setMobileExpanded] = useState<MenuId | null>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<MenuId, HTMLAnchorElement | null>>({
    products: null,
    solutions: null,
  });
  const panelListRef = useRef<HTMLDivElement | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const openMenuFor = useCallback(
    (id: MenuId) => {
      clearCloseTimer();
      setOpenMenu(id);
    },
    [clearCloseTimer]
  );

  const closeAllMenus = useCallback(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, [clearCloseTimer]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Defer the initial sync so setState doesn't fire synchronously in the
    // effect body (lint-clean + rAF runs on the next paint).
    const raf = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Close drawers and dropdowns on route change
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Escape key closes any open dropdown
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllMenus();
        triggerRefs.current[openMenu]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, closeAllMenus]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  const setActiveSlug = useCallback((id: MenuId, slug: string) => {
    setActiveSlugs((prev) => (prev[id] === slug ? prev : { ...prev, [id]: slug }));
  }, []);

  const handleMenuKeydown = useCallback(
    (e: React.KeyboardEvent, menu: NavMenu) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (openMenu !== menu.id) {
          openMenuFor(menu.id);
          // Focus first item after panel renders
          requestAnimationFrame(() => {
            const first = panelListRef.current?.querySelector<HTMLAnchorElement>(
              "[data-nav-item]"
            );
            first?.focus();
          });
          return;
        }
        const items = Array.from(
          panelListRef.current?.querySelectorAll<HTMLAnchorElement>(
            "[data-nav-item]"
          ) ?? []
        );
        if (items.length === 0) return;
        const currentIdx = items.findIndex((el) => el === document.activeElement);
        const nextIdx =
          e.key === "ArrowDown"
            ? (currentIdx + 1) % items.length
            : (currentIdx - 1 + items.length) % items.length;
        items[nextIdx]?.focus();
      }
      // Enter/Space on the link falls through to default navigation
    },
    [openMenu, openMenuFor]
  );

  const activeMenu = openMenu ? NAV_MENUS.find((m) => m.id === openMenu) : null;

  return (
    <>
      {/* Backdrop blur + overlay - closes dropdown when clicked outside */}
      <div
        aria-hidden="true"
        onClick={closeAllMenus}
        className={clsx(
          "hidden desktop:block fixed inset-0 z-30 transition-opacity duration-300 ease-out",
          "bg-[rgba(0,0,0,0.25)] backdrop-blur-[10px]",
          activeMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
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
          scrolled
            ? "max-w-[880px] rounded-full border border-[rgba(19,19,19,0.08)] shadow-[0_4px_24px_-12px_rgba(19,19,19,0.14)]"
            : "max-w-[1360px] border border-transparent",
          "w-[calc(100%-16px)] tablet:w-[calc(100%-40px)]"
        )}
      >
        {/* Outer frosted background */}
        <span
          aria-hidden
          className={clsx(
            "absolute inset-0 rounded-full overflow-hidden transition-opacity duration-[320ms] ease-out pointer-events-none",
            scrolled ? "opacity-100" : "opacity-0",
            "backdrop-blur-[24px] saturate-[1.5]"
          )}
        >
          <span className="absolute inset-0 bg-[rgba(255,255,255,0.35)]" />
          <span className="absolute inset-0" style={{ background: "rgba(228, 231, 231, 0.45)" }} />
        </span>

        <div className="relative flex items-center justify-between gap-4 h-12 tablet:h-14 px-4 tablet:px-5">
          {/* Logo — recolored to cream on pages whose hero is dark (see DARK_HERO_PATHS). */}
          <Link
            href="/"
            aria-label="Fashol home"
            className="relative flex items-center shrink-0 py-0.5"
          >
            <Image
              src="/fashol-logo-full.png"
              alt="Fashol"
              width={400}
              height={120}
              priority
              className="relative h-[38px] tablet:h-[43px] w-auto object-contain"
              style={
                DARK_HERO_PATHS.has(pathname ?? "") && !scrolled
                  ? { filter: "brightness(0) invert(1)" }
                  : undefined
              }
            />
          </Link>

          {/* Center nav pill */}
          <nav
            className={clsx(
              "hidden desktop:flex items-center gap-1 relative rounded-full px-2 py-1",
              "transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled ? "border border-transparent" : "border border-[rgba(19,19,19,0.06)]"
            )}
            onMouseLeave={scheduleClose}
          >
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

            {LEAD_LINKS.map((l) => (
              <DesktopLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={pathname === l.href}
                onHoverOther={closeAllMenus}
              />
            ))}

            {NAV_MENUS.map((menu) => {
              const isOpen = openMenu === menu.id;
              const sectionActive = pathname?.startsWith(menu.href);
              const panelId = `nav-panel-${menu.id}`;
              return (
                <Link
                  key={menu.id}
                  ref={(el) => {
                    triggerRefs.current[menu.id] = el;
                  }}
                  href={menu.href}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onMouseEnter={() => openMenuFor(menu.id)}
                  onKeyDown={(e) => handleMenuKeydown(e, menu)}
                  className={clsx(
                    "group relative inline-flex items-center gap-1 font-[var(--font-display)] text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors duration-200 tracking-tight cursor-pointer",
                    isOpen || sectionActive
                      ? "text-[var(--color-ink)] bg-[rgba(19,19,19,0.06)]"
                      : "text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]"
                  )}
                >
                  <span>{menu.label}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 10 6"
                    className={clsx(
                      "w-[9px] h-[5px] transition-transform duration-200",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}

            {TAIL_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <DesktopLink
                  key={l.href}
                  href={l.href}
                  label={l.label}
                  active={!!active}
                  onHoverOther={closeAllMenus}
                />
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden desktop:flex items-center gap-2 shrink-0">
            <Button variant="primary" href="/contact" className="!h-9 !px-4 !text-[12px]">
              Partner with Fashol
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="desktop:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-[rgba(19,19,19,0.12)] bg-[rgba(255,255,255,0.7)] backdrop-blur-md"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-[4px]">
              <span
                className={clsx(
                  "block w-4 h-[1.5px] bg-[var(--color-ink)] transition-transform duration-300",
                  open && "translate-y-[2.75px] rotate-45"
                )}
              />
              <span
                className={clsx(
                  "block w-4 h-[1.5px] bg-[var(--color-ink)] transition-transform duration-300",
                  open && "-translate-y-[2.75px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>

      </div>

      {/* Mobile drawer - sits below the nav bar as a separate card so the nav pill
          itself stays at its natural compact size when the drawer opens. */}
      <div
        aria-hidden={!open}
        className={clsx(
          "desktop:hidden mx-auto mt-2 w-[calc(100%-16px)] tablet:w-[calc(100%-40px)] max-w-[880px]",
          "overflow-hidden transition-[max-height,opacity] duration-400 ease-out",
          open ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="rounded-2xl bg-[var(--color-paper)] shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)] p-4 overflow-y-auto max-h-[80vh]">
          <ul className="flex flex-col">
            {LEAD_LINKS.map((l) => (
              <MobileLink key={l.href} href={l.href} label={l.label} active={pathname === l.href} />
            ))}

            {NAV_MENUS.map((menu) => {
              const expanded = mobileExpanded === menu.id;
              const sectionActive = pathname?.startsWith(menu.href);
              const isProducts = menu.id === "products";
              return (
                <li key={menu.id}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileExpanded((prev) => (prev === menu.id ? null : menu.id))
                    }
                    className={clsx(
                      "w-full flex items-center justify-between py-2.5 transition-colors cursor-pointer",
                      sectionActive
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]"
                    )}
                  >
                    <span className="font-[var(--font-display)] text-[14px] font-medium tracking-tight">
                      {menu.label}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 10 6"
                      className={clsx(
                        "w-[10px] h-[6px] transition-transform duration-200",
                        expanded ? "rotate-180" : "rotate-0"
                      )}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={clsx(
                      "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                      expanded ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {isProducts ? (
                      <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
                        {allItems(menu).map((item) => {
                          const logo = PRODUCT_LOGOS[item.slug];
                          if (!logo) return null;
                          return (
                            <Link
                              key={item.slug}
                              href={item.href}
                              aria-label={item.name}
                              className="group flex items-center justify-center overflow-hidden aspect-[2/1] rounded-2xl bg-[rgba(19,19,19,0.06)] transition-colors active:bg-white"
                            >
                              <Image
                                src={logo.src}
                                alt=""
                                width={480}
                                height={240}
                                sizes="200px"
                                style={{ transform: `scale(${logo.scale})` }}
                                className="w-[80%] h-[80%] object-contain"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="pl-2 pb-3 pt-1 flex flex-col gap-4">
                        {menu.groups.map((group, gi) => (
                          <div key={gi} className="flex flex-col">
                            {group.eyebrow && (
                              <div
                                className="t-eyebrow mb-2"
                                style={{ color: "var(--color-ink-muted)" }}
                              >
                                {group.eyebrow}
                              </div>
                            )}
                            <ul className="grid grid-cols-2 gap-x-4">
                              {group.items.map((item) => (
                                <li key={item.slug}>
                                  <Link
                                    href={item.href}
                                    className="block py-1.5 text-[14px] font-medium text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)] transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}

            {TAIL_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <MobileLink key={l.href} href={l.href} label={l.label} active={!!active} />
              );
            })}
          </ul>
          <div className="mt-4 pt-4 border-t border-[rgba(19,19,19,0.08)] flex flex-col gap-2">
            <Button variant="primary" href="/contact">
              Partner with Fashol
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop dropdown panel - outside the morphing container so it spans full site width */}
      {activeMenu && (
        <NavDropdown
          menu={activeMenu}
          activeSlug={activeSlugs[activeMenu.id]}
          onActiveChange={(slug) => setActiveSlug(activeMenu.id, slug)}
          onPanelEnter={clearCloseTimer}
          onPanelLeave={scheduleClose}
          panelId={`nav-panel-${activeMenu.id}`}
          listRef={panelListRef}
        />
      )}
    </header>
    </>
  );
}

function DesktopLink({
  href,
  label,
  active,
  onHoverOther,
}: {
  href: string;
  label: string;
  active: boolean;
  onHoverOther: () => void;
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onHoverOther}
      className={clsx(
        "group relative font-[var(--font-display)] text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors duration-200 tracking-tight",
        active
          ? "text-[var(--color-ink)] bg-[rgba(19,19,19,0.06)]"
          : "text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]"
      )}
    >
      <span className="relative inline-block">{label}</span>
    </Link>
  );
}

function MobileLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "flex items-center justify-between py-2.5 transition-colors",
          active
            ? "text-[var(--color-ink)]"
            : "text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]"
        )}
      >
        <span className="font-[var(--font-display)] text-[14px] font-medium tracking-tight">
          {label}
        </span>
      </Link>
    </li>
  );
}

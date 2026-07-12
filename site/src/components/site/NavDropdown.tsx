"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { NavItem, NavMenu } from "@/data/nav";
import { allItems, findMenuItem, PRODUCT_LOGOS } from "@/data/nav";
import { useLang } from "@/components/site/LanguageProvider";
import { t } from "@/lib/i18n";

const EYEBROW_BN: Record<string, string> = {
  Products: "প্রোডাক্ট",
  Solutions: "সলিউশন",
  Buyers: "বায়ার",
  Suppliers: "সাপ্লায়ার",
  Partners: "পার্টনার",
  "Urban buyers": "আরবান বায়ার",
  "Trade buyers": "ট্রেড বায়ার",
};

type Props = {
  menu: NavMenu;
  activeSlug: string;
  onActiveChange: (slug: string) => void;
  onPanelEnter: () => void;
  onPanelLeave: () => void;
  panelId: string;
  listRef?: React.RefObject<HTMLDivElement | null>;
};

type Column = { eyebrow?: string; items: NavItem[] }[];

export function NavDropdown({
  menu,
  activeSlug,
  onActiveChange,
  onPanelEnter,
  onPanelLeave,
  panelId,
  listRef,
}: Props) {
  const lang = useLang();
  const eb = (en: string) => t(lang, en, EYEBROW_BN[en] ?? en);
  const activeItem = findMenuItem(menu, activeSlug) ?? allItems(menu)[0];
  const isSolutions = menu.id === "solutions";
  const isProducts = menu.id === "products";
  const columns: Column[] = isSolutions ? buildSolutionsColumns(menu) : [flattenMenu(menu)];

  return (
    <div
      className="hidden desktop:block absolute top-[84px] inset-x-0 z-30"
      onMouseEnter={onPanelEnter}
      onMouseLeave={onPanelLeave}
    >
      <div className="container-page">
        <div
          id={panelId}
          role="menu"
          aria-label={menu.label}
          className={clsx(
            "rounded-3xl overflow-hidden",
            "bg-[var(--color-paper)] text-[var(--color-ink)]",
            "border border-[rgba(19,19,19,0.08)]",
            "shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)]",
            "grid grid-cols-1 p-8 gap-8 w-fit max-w-full"
          )}
        >
          {/* Left area - logo tile grid for Products, text columns for Solutions */}
          {isProducts ? (
            <div ref={listRef} className="flex flex-col">
              <div className="t-eyebrow mb-4">{eb(menu.label)}</div>
              <div className="grid grid-cols-2 gap-3 w-[554px] max-w-full">
                {allItems(menu).map((item) => {
                  const logo = PRODUCT_LOGOS[item.slug];
                  if (!logo) return null;
                  const isActive = item.slug === activeItem.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={item.href}
                      role="menuitem"
                      data-nav-item
                      data-slug={item.slug}
                      onMouseEnter={() => onActiveChange(item.slug)}
                      onFocus={() => onActiveChange(item.slug)}
                      className={clsx(
                        "group relative flex items-center justify-center overflow-hidden",
                        "aspect-[2/1] rounded-2xl",
                        "transition-colors duration-200",
                        isActive
                          ? "bg-white"
                          : "bg-[rgba(19,19,19,0.06)] hover:bg-white",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lime)]"
                      )}
                      aria-label={item.name}
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
            </div>
          ) : (
            <div
              ref={listRef}
              className="grid grid-cols-1 desktop:grid-cols-3 gap-8"
            >
              {columns.map((column, ci) => {
                const hasSecondary = column.length > 1;
                return (
                <div key={ci} className="flex flex-col gap-10">
                  {column.map((group, gi) => (
                    <div
                      key={gi}
                      className={clsx(
                        // Reserve space of a 4-item primary group so secondary
                        // eyebrows in Col 1 (Partners) and Col 3 (Financial)
                        // align to the same vertical baseline.
                        gi === 0 && isSolutions && hasSecondary && "desktop:min-h-[192px]"
                      )}
                    >
                      {group.eyebrow && (
                        <div className="t-eyebrow mb-4">{eb(group.eyebrow)}</div>
                      )}
                      <ul className="flex flex-col">
                        {group.items.map((item) => {
                          const isActive = item.slug === activeItem.slug;
                          return (
                            <li key={item.slug}>
                              <Link
                                href={item.href}
                                role="menuitem"
                                data-nav-item
                                data-slug={item.slug}
                                onMouseEnter={() => onActiveChange(item.slug)}
                                onFocus={() => onActiveChange(item.slug)}
                                className={clsx(
                                  "block rounded-xl px-3 py-2 transition-colors duration-200",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lime)]",
                                  isActive
                                    ? "bg-[rgba(19,19,19,0.08)]"
                                    : "hover:bg-[rgba(19,19,19,0.05)]"
                                )}
                              >
                                <div className="font-[var(--font-display)] text-[15px] font-medium tracking-tight text-[var(--color-ink)]">
                                  {t(lang, item.name, item.nameBn)}
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function flattenMenu(menu: NavMenu): Column {
  // Inject the menu label as the first group's eyebrow when the data has
  // none, so the first item aligns with the Solutions dropdown's first item.
  return menu.groups.map((g, gi) => ({
    eyebrow: g.eyebrow ?? (gi === 0 ? menu.label : undefined),
    items: g.items,
  }));
}

function buildSolutionsColumns(menu: NavMenu): Column[] {
  const byEyebrow = (eyebrow: string) =>
    menu.groups.find((g) => g.eyebrow === eyebrow);

  const buyers = byEyebrow("Buyers");
  const suppliers = byEyebrow("Suppliers");
  const partners = byEyebrow("Partners");

  if (!buyers || !suppliers || !partners) {
    return [flattenMenu(menu)];
  }

  const half = Math.ceil(buyers.items.length / 2);

  const col1: Column = [
    { eyebrow: "Urban buyers", items: buyers.items.slice(0, half) },
    { eyebrow: "Partners", items: partners.items },
  ];
  const col2: Column = [
    { eyebrow: "Trade buyers", items: buyers.items.slice(half) },
  ];
  const col3: Column = [
    { eyebrow: "Suppliers", items: suppliers.items },
  ];

  return [col1, col2, col3];
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PRODUCTS_MENU } from "@/data/nav";

export const metadata: Metadata = {
  title: "Products",
  description: "Fashol products: Jogaan, Hyperfarm, Banijjo, CropCash.",
};

export default function ProductsIndexPage() {
  const items = PRODUCTS_MENU.groups.flatMap((g) => g.items);
  return (
    <Section tone="paper">
      <div className="pt-[112px] tablet:pt-[144px] pb-16 tablet:pb-24">
        <Eyebrow>Products</Eyebrow>
        <h1 className="t-hero mt-6">Coming soon.</h1>
        <p className="t-body-lg mt-6 max-w-2xl">
          The Fashol products index is being written. Browse the placeholder pages below.
        </p>
        <ul className="mt-12 grid tablet:grid-cols-2 gap-4">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-[var(--color-line)] p-6 transition-colors hover:bg-[var(--color-surface)]"
              >
                <div className="t-h5" style={{ fontWeight: 500 }}>
                  {item.name}
                </div>
                <div className="t-body-sm mt-1 text-[var(--color-ink-muted)]">
                  {item.descriptor}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

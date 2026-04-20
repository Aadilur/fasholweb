import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductStack } from "@/components/figures/ProductStack";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Four products, one operating system. Jogaan, Hyperfarm, Banijjo, and Myfarm make up Fashol's platform for the food supply chain.",
};

type Block = {
  n: string;
  name: string;
  bengali?: string;
  audience: string;
  headline: string;
  body: string;
  who: string;
  status: string;
  href: string;
  linkLabel: string;
  tone: "surface" | "paper";
};

const BLOCKS: Block[] = [
  {
    n: "01",
    name: "Jogaan",
    bengali: "যোগান",
    audience: "For farmers and field agents.",
    headline: "The grower's view of the Fashol network.",
    body:
      "Farmers and Fashol's field agents use Jogaan to check live buyer demand across all operating districts, confirm mobile money payments within 24 hours of weighing, and keep a full record of every sale without any paperwork. Jogaan also hosts a marketplace for seed, feed, and farm machinery, and a community feed where registered growers share prices and advice.",
    who: "60,000-plus registered farmers and Fashol field agents across nine districts in Bangladesh.",
    status: "AVAILABLE ON GOOGLE PLAY",
    href: "/products/jogaan",
    linkLabel: "Learn more about Jogaan",
    tone: "surface",
  },
  {
    n: "02",
    name: "Hyperfarm",
    audience: "For restaurants, retailers, quick-commerce, wholesalers, and exporters.",
    headline: "The buyer's procurement desk.",
    body:
      "Buyers place orders, track stock, verify grading, follow cold-chain readings, and settle invoices on Hyperfarm. The dashboard shows the full picture of every order from the farm gate to the final delivery. Used by restaurants in Dhaka, quick-commerce platforms across the country, supershops, and exporters moving produce to Singapore, the Gulf, and Southeast Asia.",
    who: "7,000-plus buyers across four countries, including restaurants, quick-commerce platforms, supershops, and exporters.",
    status: "AVAILABLE ON iOS, ANDROID, AND WEB",
    href: "/products/hyperfarm",
    linkLabel: "Learn more about Hyperfarm",
    tone: "paper",
  },
  {
    n: "03",
    name: "Banijjo",
    bengali: "বাণিজ্য",
    audience: "For wholesalers, distributors, and commission agents.",
    headline: "The wholesale distribution layer.",
    body:
      "Banijjo runs the middle of the supply chain. Store-level inventory, route-level pricing, order routing, and two-sided settlement - growers on one end, buyers on the other. Used by wholesalers and commission agents operating inside the Fashol network across 200-plus wholesale markets in Bangladesh.",
    who: "Wholesalers, distributors, and commission agents across 40-plus Fashol hubs.",
    status: "AVAILABLE ON GOOGLE PLAY",
    href: "/products/banijjo",
    linkLabel: "Learn more about Banijjo",
    tone: "surface",
  },
  {
    n: "04",
    name: "Myfarm",
    audience:
      "For farmers, buyers, and exporters inside the Fashol network, in partnership with banks.",
    headline: "Supply chain financing, underwritten by transaction history.",
    body:
      "Myfarm offers input financing for farmers, working capital for buyers, and export receivables financing, all underwritten by the transaction history already recorded on Jogaan, Hyperfarm, and Banijjo. No collateral, no branch visits. Delivered in partnership with banks and development finance institutions. Launching 2026.",
    who: "Registered farmers, buyers, and exporters across the Fashol network, and partner banks.",
    status: "LAUNCHING 2026",
    href: "/products/myfarm",
    linkLabel: "Learn more about Myfarm",
    tone: "paper",
  },
];

const CTA_CARDS = [
  {
    n: "01",
    t: "Partner with Fashol",
    b: "Open an account as a buyer, supplier, or partner. We onboard in under two weeks.",
    cta: "Partner with Fashol",
    href: "/contact",
  },
  {
    n: "02",
    t: "Work with us",
    b: "Open roles in engineering, logistics, trade operations, and data.",
    cta: "Work with us",
    href: "/career",
  },
  {
    n: "03",
    t: "Read the data",
    b: "Full operational register, published and maintained. Numbers, hubs, districts, and volumes.",
    cta: "Read the data",
    href: "/data",
  },
];

export default function ProductsHubPage() {
  return (
    <>
      {/* Section 1 - Hero */}
      <Section tone="ink">
        <div className="pt-[64px] tablet:pt-[88px] pb-4 tablet:pb-8">
          <Reveal
            as="h1"
            className="t-hero !text-[var(--color-paper)] max-w-[900px]"
          >
            Four products. One operating system.
          </Reveal>
          <Reveal
            delay={0.08}
            as="p"
            className="t-body-lg mt-6 max-w-2xl !text-[rgba(255,251,234,0.75)]"
          >
            Fashol runs on software we built ourselves. Jogaan gives farmers live buyer demand and
            24-hour settlement. Hyperfarm gives buyers a procurement desk with full traceability.
            Banijjo runs the wholesale layer between them. Myfarm, launching 2026, finances the
            working capital that moves across all three. Four products, built to work together,
            run on the same data.
          </Reveal>
          <Reveal delay={0.16} className="mt-8">
            <Link
              href="#work-with-fashol"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium !text-[var(--color-lime)] hover:!text-[var(--color-emerald)] transition-colors"
            >
              Work with Fashol
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Section 2 - The stack diagram */}
      <Section tone="paper">
        <Reveal as="h2" className="t-h2 max-w-[880px]">
          Each product does one job. Together they make the platform.
        </Reveal>
        <Reveal delay={0.14} className="mt-14 tablet:mt-20 mx-auto max-w-[960px]">
          <ProductStack />
        </Reveal>
        <Reveal delay={0.2} className="mt-10 tablet:mt-14 max-w-[720px] mx-auto">
          <p className="t-body-sm text-[var(--color-ink-muted)] text-center">
            Data flows from the farmer (Jogaan) through the wholesale layer (Banijjo) to the buyer
            (Hyperfarm). Myfarm underwrites working capital based on the transaction record
            already sitting on the platform.
          </p>
        </Reveal>
      </Section>

      {/* Section 3 - Four product blocks */}
      {BLOCKS.map((block, i) => (
        <Section
          key={block.n}
          tone={block.tone}
          className={i > 0 ? "border-t border-[var(--color-line)]" : undefined}
        >
          <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16">
            {/* Left column */}
            <div className="desktop:col-span-4">
              <div className="desktop:sticky desktop:top-[120px]">
                <Reveal>
                  <span className="t-mono text-[12px] text-[var(--color-ink-muted)] block">
                    {block.n}
                  </span>
                </Reveal>
                <Reveal delay={0.06} as="h2" className="t-h2 mt-4" style={{ fontWeight: 500 }}>
                  {block.name}
                </Reveal>
                {block.bengali && (
                  <Reveal delay={0.1} className="mt-2">
                    <span
                      className="lang-bn block text-[var(--color-ink-muted)]"
                      style={{ fontSize: 22 }}
                    >
                      {block.bengali}
                    </span>
                  </Reveal>
                )}
                <Reveal delay={0.14} as="p" className="t-body-sm mt-6 text-[var(--color-ink-muted)]">
                  {block.audience}
                </Reveal>
              </div>
            </div>

            {/* Right column */}
            <div className="desktop:col-span-8 desktop:col-start-6">
              <Reveal as="h3" className="t-h3" style={{ fontWeight: 500 }}>
                {block.headline}
              </Reveal>
              <Reveal delay={0.06} as="p" className="t-body-lg mt-6">
                {block.body}
              </Reveal>
              <Reveal delay={0.12} as="p" className="t-body-sm mt-8 text-[var(--color-ink-muted)]">
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-ink-muted)] mr-2">
                  Who uses it
                </span>
                {block.who}
              </Reveal>
              <Reveal delay={0.16} className="mt-6">
                <span className="t-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink-muted)]">
                  {block.status}
                </span>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <Link href={block.href} className="link-arrow">
                  {block.linkLabel}
                </Link>
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      {/* Section 4 - CTA band (anchor target for hero link) */}
      <Section tone="ink" id="work-with-fashol">
        <Reveal>
          <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[rgba(255,251,234,0.55)] block">
            WORK WITH FASHOL
          </span>
        </Reveal>
        <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">
          Three ways in.
        </Reveal>
        <StaggerChildren className="grid tablet:grid-cols-3 gap-6 mt-14" stagger={0.1}>
          {CTA_CARDS.map((c) => (
            <StaggerItem
              key={c.n}
              className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4"
            >
              <span className="t-mono text-[11px] !text-[rgba(255,255,255,0.55)]">{c.n}</span>
              <h3 className="t-h4" style={{ fontWeight: 500 }}>
                {c.t}
              </h3>
              <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
              <div className="mt-auto pt-4">
                <Button variant="on-dark" href={c.href}>
                  {c.cta}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Farmers - Fashol",
  description:
    "A fair price for every crop, 24-hour mobile money settlement, and a marketplace for inputs and machinery. Fashol serves 60,000-plus farmers across Bangladesh through the Jogaan platform.",
};

const HERO_STATS: ReadonlyArray<{ v: string; l: string }> = [
  { v: "60,000+", l: "Registered farmers" },
  { v: "24 hr", l: "Settlement window" },
  { v: "200+", l: "Wholesale markets benchmarked" },
];

const BENEFITS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "A fair price, benchmarked live.",
    body: "Jogaan shows the farmer the price Fashol is paying that morning, benchmarked against live data from 200-plus wholesale markets across Bangladesh. The farmer can check the price before they leave home. If the offered price is lower than the market, they wait. If it is higher, they sell.",
  },
  {
    n: "02",
    headline: "Payment in 24 hours, straight to bKash.",
    body: "Settlement lands in the farmer's mobile money wallet within 24 hours of weighing at the hub. No invoices, no follow-up trips, no middleman deductions. The receipt sits in the app, and the farmer can show it to anyone.",
  },
  {
    n: "03",
    headline: "A marketplace for seed, feed, and machinery.",
    body: "Jogaan hosts a marketplace for quality-verified agricultural inputs. Seed, pesticide, livestock feed, and farm machinery, all available at prices negotiated by Fashol on behalf of the network. Farmers order from the same app they use to sell their produce.",
  },
  {
    n: "04",
    headline: "Financing, underwritten by the farmer's own record.",
    body: "CropCash, launching 2026, uses each farmer's transaction history on Jogaan to offer input loans and seasonal working capital. No collateral, no bank branch visits. The farmer's own sales record is the credit file.",
  },
];

const PRODUCTS: ReadonlyArray<{
  name: string;
  role: string;
  href: string;
}> = [
  {
    name: "Jogaan",
    role: "The farmer's app. Price alerts, settlement, marketplace, and record.",
    href: "/products/jogaan",
  },
  {
    name: "CropCash",
    role: "Supply chain financing, launching 2026. Underwritten by transaction history.",
    href: "/products/cropcash",
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "A field agent visits the village.",
    body: "Fashol's field agent visits the farmer's village, confirms the farmer's crops, growing cycle, and volume, and helps register the farmer on Jogaan.",
  },
  {
    n: "02",
    headline: "Jogaan goes on the phone.",
    body: "The agent walks the farmer through installing Jogaan on their phone and sets up the farmer's bKash or other mobile money wallet for settlement. No bank account required.",
  },
  {
    n: "03",
    headline: "First harvest sold.",
    body: "On the next harvest day, the agent returns. The crop is weighed and graded at the farm gate, and the farmer sees the price on the app before the crop leaves. Payment lands in the wallet within 24 hours.",
  },
  {
    n: "04",
    headline: "The farmer runs it themselves.",
    body: "After the first few transactions, the farmer runs the process independently. The field agent stays available on WhatsApp, but Jogaan handles the weighing, pricing, payment, and record on its own.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Agri input suppliers",
    description:
      "Distribution into the Fashol farmer network for seed, feed, and pesticide companies.",
    href: "/solutions/agri-input-suppliers",
  },
  {
    name: "Agri machinery suppliers",
    description:
      "Marketplace access to farmer demand for tractors, tillers, and harvest equipment.",
    href: "/solutions/agri-machinery-suppliers",
  },
  {
    name: "Supply chain financing",
    description:
      "Input credit and working capital for farmers, delivered in partnership with banks.",
    href: "/solutions/supply-chain-financing",
  },
];

export default function FarmersPage() {
  return (
    <>
      {/* Section 1 - Hero */}
      <Section tone="ink">
        <div className="pt-[64px] tablet:pt-[88px] pb-4 tablet:pb-8">
          <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
            {/* Left column */}
            <div className="desktop:col-span-7">
              <Reveal
                as="h1"
                className="t-hero !text-[var(--color-paper)]"
              >
                Farmers.
              </Reveal>
              <Reveal
                delay={0.08}
                as="p"
                className="t-body-lg mt-6 max-w-2xl !text-[rgba(255,251,234,0.75)]"
              >
                A fair price for every crop, payment in 24 hours, and a marketplace for everything
                that goes into the field. The grower&apos;s end of the Fashol network, run on a
                single app called Jogaan.
              </Reveal>
            </div>

            {/* Right column - stat tiles */}
            <Reveal delay={0.2} className="desktop:col-span-5">
              <dl className="flex flex-col gap-3">
                {HERO_STATS.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-[rgba(255,251,234,0.15)] bg-[rgba(255,251,234,0.04)] px-5 py-4 tablet:px-6 tablet:py-5"
                  >
                    <dd
                      className="t-tabular text-[28px] tablet:text-[34px] leading-none !text-[var(--color-paper)]"
                      style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}
                    >
                      {s.v}
                    </dd>
                    <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.6)]">{s.l}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Section 2 - The problem */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The traditional chain has worked against the farmer for generations.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A Bangladeshi farmer has historically had one buyer - the mahajan who shows up at the
              farm gate, offers whatever price the day allows, and takes the crop at a discount
              against the next season&apos;s seed loan. The farmer does not know what the market
              paid for that crop in Dhaka that morning. The farmer has no receipt.
            </p>
            <p className="mt-5">
              Payment takes two weeks, sometimes four. Deductions appear on settlement day for
              transport, for handling, for losses that the farmer never saw happen. The farmer has
              no way to contest any of it. This is not unusual. This is how the chain has worked
              for as long as anyone remembers.
            </p>
            <p className="mt-5">
              Access to seed, pesticide, feed, and machinery runs through the same middlemen.
              Access to credit does not exist at all, unless the farmer signs away the next harvest.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - What Fashol does for farmers */}
      <Section tone="surface">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Fashol gives the farmer a different chain.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Every farmer registered on Jogaan gets four things the old chain could not offer
              them. This is the core of what we do on the supplier side.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {BENEFITS.map((b) => (
            <Reveal key={b.n} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] p-8">
                <div
                  aria-hidden
                  className="w-20 h-20 rounded-[4px] bg-[var(--color-grain)] border border-[var(--color-line)]"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-4">
                  {b.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {b.headline}
                </h3>
                <p className="t-body-sm mt-3">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 4 - Powered by */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The two products behind this work.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {PRODUCTS.map((p) => (
            <Reveal key={p.name} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-grain)] rounded-[4px] p-8 tablet:p-10">
                <h3 className="t-h4" style={{ fontWeight: 500 }}>
                  {p.name}
                </h3>
                <p className="t-body mt-4">{p.role}</p>
                <div className="mt-auto pt-8">
                  <Link href={p.href} className="link-arrow">
                    Open product page
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 5 - In their words */}
      <Section tone="ink">
        <div className="max-w-[880px] mx-auto text-center">
          <Reveal>
            <blockquote
              className="!text-[var(--color-paper)] text-[24px] tablet:text-[32px] desktop:text-[38px] leading-[1.25] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              &ldquo;Before Fashol, I used to take my cauliflower to the mahajan and accept
              whatever price he gave that morning. Now I see the price on my phone the night
              before. If it&apos;s not good, I wait a day.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 tablet:mt-10 flex items-center justify-center gap-3">
              <div
                className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-grain)] flex items-center justify-center overflow-hidden"
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.4 }}
                >
                  <circle cx="12" cy="8.5" r="3.5" />
                  <path d="M4.5 20c1.2-4 4.2-6 7.5-6s6.3 2 7.5 6" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span
                  className="text-[14px] !text-[var(--color-paper)]"
                  style={{ fontWeight: 500 }}
                >
                  Abdul Karim
                </span>
                <span className="text-[13px] !text-[rgba(255,251,234,0.6)] mt-0.5">
                  Farmer, Jessore
                </span>
              </div>
            </figcaption>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="t-mono text-[11px] tracking-[0.12em] mt-10 tablet:mt-12 !text-[rgba(255,251,234,0.45)] uppercase">
              Composite voice. Drawn from farmer interviews across 2024 and 2025. Name changed.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - How it starts */}
      <Section tone="surface">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Two weeks from first conversation to first sale.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Farmers onboard through Fashol&apos;s field agents, who handle registration,
              WhatsApp group enrollment, and the first few transactions together with the farmer.
              No paperwork required at the farmer&apos;s end.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-paper)] rounded-[4px] p-6 tablet:p-8">
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)]">
                  {s.n}
                </span>
                <h3 className="t-h5 mt-4" style={{ fontWeight: 500 }}>
                  {s.headline}
                </h3>
                <p className="t-body-sm mt-3">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mt-10 tablet:mt-12">
          <Link href="/contact" className="link-arrow">
            Contact Fashol to enroll your farming community
          </Link>
        </Reveal>
      </Section>

      {/* Section 7 - Other roles on the chain */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Fashol serves the rest of the chain too.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-3 gap-6">
          {RELATED.map((r) => (
            <Reveal key={r.name} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-grain)] rounded-[4px] p-8">
                <h3 className="t-h5" style={{ fontWeight: 500 }}>
                  {r.name}
                </h3>
                <p className="t-body-sm mt-3">{r.description}</p>
                <div className="mt-auto pt-6">
                  <Link href={r.href} className="link-arrow">
                    Learn more
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

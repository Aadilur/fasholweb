import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { ComparisonPair } from "@/components/site/ComparisonPair";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
  QuoteReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Wholesalers - Fashol",
  description:
    "A modern supply stack behind your existing wholesale trading business. Consistent volumes, cold-chain fulfillment, transparent pricing, same-day settlement. Fashol serves wholesale traders across 50 districts in Bangladesh.",
};

type HeroStat =
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      tail: string;
      l: string;
    }
  | {
      kind: "text";
      text: string;
      l: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "number",
    n: 500,
    format: "plain",
    suffix: "+ MT",
    tail: "",
    l: "Daily cold-chain capacity",
  },
  { kind: "text", text: "Same day", l: "Settlement on delivered volume" },
  { kind: "text", text: "50 districts", l: "Origin reach across Bangladesh" },
];

type ComparisonPairData = {
  oldAnchor: string;
  oldBody: string;
  fasholAnchor: string;
  fasholAnchorIsNumeric: boolean;
  fasholBody: string;
};

const COMPARISON_PAIRS: ReadonlyArray<ComparisonPairData> = [
  {
    oldAnchor: "50+ SUPPLIERS",
    oldBody: "Sourcing from 50+ aratdars and farmers personally.",
    fasholAnchor: "ONE",
    fasholAnchorIsNumeric: false,
    fasholBody: "counterparty for sourcing, settlement, and grading.",
  },
  {
    oldAnchor: "30-60% DROP",
    oldBody: "Supply drops 30 to 60 percent in bad weather weeks.",
    fasholAnchor: "50",
    fasholAnchorIsNumeric: true,
    fasholBody: "districts of network redundancy keep supply steady across Bangladesh.",
  },
  {
    oldAnchor: "FRESH HAGGLE",
    oldBody: "Price negotiated fresh every morning, from zero.",
    fasholAnchor: "200+",
    fasholAnchorIsNumeric: true,
    fasholBody: "wholesale markets benchmarked for live, published daily pricing.",
  },
  {
    oldAnchor: "A GUESS",
    oldBody: "Quality is a guess until the crates are opened.",
    fasholAnchor: "FOUR-TIER",
    fasholAnchorIsNumeric: false,
    fasholBody: "grading applied at Fashol hubs before dispatch.",
  },
  {
    oldAnchor: "WORKING CAPITAL CAP",
    oldBody: "Credit to downstream buyers is capped by personal working capital.",
    fasholAnchor: "EXTENDED",
    fasholAnchorIsNumeric: false,
    fasholBody: "credit capacity via Banijjo same-day settlement and Myfarm underwriting.",
  },
  {
    oldAnchor: "PERSONAL CAP",
    oldBody: "Volume capped at the trader's personal bandwidth.",
    fasholAnchor: "NETWORK",
    fasholAnchorIsNumeric: false,
    fasholBody: "capacity scales with Fashol's hub and cold-chain infrastructure.",
  },
  {
    oldAnchor: "DOWNSTREAM",
    oldBody: "Quality disputes happen downstream, at the stall.",
    fasholAnchor: "AT THE HUB",
    fasholAnchorIsNumeric: false,
    fasholBody: "disputes resolved before dispatch, not after delivery.",
  },
  {
    oldAnchor: "T+7 TO T+14",
    oldBody: "Settlement takes 7 to 14 days after delivery.",
    fasholAnchor: "SAME-DAY",
    fasholAnchorIsNumeric: false,
    fasholBody: "settlement on delivered volume, every delivery, end of day.",
  },
];

const LEVERS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "Sourcing at network scale.",
    body: "Fashol's 60,000 farmer network across 50 districts replaces a personal supplier rolodex. Weather failure in one district is covered by another. Crop failures in one season are redistributed across crop cycles. Sourcing becomes statistical, not relational.",
  },
  {
    n: "02",
    headline: "Daily price discovery, published.",
    body: "Live prices from 200-plus wholesale markets, benchmarked and published daily on the Banijjo platform. Traders stop negotiating price from zero every morning. They trade on top of a published reference.",
  },
  {
    n: "03",
    headline: "Grading at the hub, disputes gone.",
    body: "Four-tier grading is applied at Fashol's hubs before produce ever reaches the wholesaler's stall. Grade A leaves as Grade A. Quality disputes at the downstream stall drop to near zero because the sorting already happened.",
  },
  {
    n: "04",
    headline: "Credit capacity, extended.",
    body: "Banijjo settles same-day on delivered volume. Myfarm (launching 2026) underwrites working capital against the trader's own Banijjo settlement history. The trader can offer downstream credit without tying up personal cash.",
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "First conversation.",
    body: "A Fashol wholesale representative walks through the trader's typical book - crops, volumes, downstream customers, current supply pattern. One phone call, sometimes a market-side visit.",
  },
  {
    n: "02",
    headline: "SKU and volume mapping.",
    body: "Within 24 hours, the trade team maps the trader's regular book to Banijjo SKUs with live pricing. Downstream customers on Hyperfarm are flagged for coordinated supply.",
  },
  {
    n: "03",
    headline: "First wholesale delivery.",
    body: "Within 72 hours of the first conversation, Fashol runs the first wholesale load at the trader's stall. Cold-chain fulfillment, graded at origin, settled same-day.",
  },
  {
    n: "04",
    headline: "The book scales.",
    body: "From week two onward, volume scales with the trader's downstream demand. Fashol's trade team stays embedded for the first month to tune pricing, grading preferences, and settlement cadence.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Commission agents",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and settlement.",
    href: "/solutions/commission-agents",
  },
  {
    name: "Importers",
    description:
      "Bulk produce supply for import-focused distributors, with origin documentation handled upstream.",
    href: "/solutions/importers",
  },
  {
    name: "Exporters",
    description:
      "End-to-end export corridors to the UK, Europe, the Middle East, and Southeast Asia.",
    href: "/solutions/exporters",
  },
];

export default function WholesalersPage() {
  return (
    <>
      {/* Section 1 - Hero (photo + forest gradient, height + padding match Farmers) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/shero5.jpg"
            alt="An aerial view of a wholesale produce market in Bangladesh at dawn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        {/* Brand orange gradient: tighter coverage so the photo reads through.
            Desktop wash fades out before mid-width; mobile keeps only a bottom
            scrim for the stat column. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,103,64,0) 0%, rgba(255,103,64,0.1) 40%, rgba(255,103,64,0.65) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(255,103,64,0.75) 0%, rgba(255,103,64,0.45) 25%, rgba(255,103,64,0.1) 45%, rgba(255,103,64,0) 55%)",
          }}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[640px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Wholesalers.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[560px] !text-[rgba(255,251,234,0.75)]"
            >
              A modern supply stack behind your existing trading business. Consistent volumes,
              cold-chain fulfillment, transparent pricing, and same-day settlement. Plug Fashol
              into the trade you already run.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
              {HERO_STATS.map((s, i) => (
                <div key={s.l} className="flex flex-col items-start">
                  <dd
                    className="t-tabular text-[28px] tablet:text-[32px] desktop:text-[36px] leading-none !text-[var(--color-paper)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.kind === "number" ? (
                      <>
                        <CountUp
                          to={s.n}
                          format={s.format}
                          suffix={s.suffix}
                          duration={1200}
                          delay={i * 150}
                          sessionKey={`wholesalers-hero-stat-${i}`}
                        />
                        {s.tail}
                      </>
                    ) : (
                      <Reveal
                        as="span"
                        delay={0.24 + i * 0.12}
                        duration={0.6}
                        y={0}
                      >
                        {s.text}
                      </Reveal>
                    )}
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">{s.l}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
              <TalkToSalesButton />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - The problem (paper, two-column, NO image) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The wholesale business has hit the ceiling of the old chain.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A wholesale trader at Karwan Bazar or any major city market has spent years
              building relationships, working out which aratdars to trust, which districts deliver
              on time, which farmers show up with Grade A consistently. Volume moves through
              because the trader is working the phone from 3 AM, chasing loads, negotiating every
              price in real time. The business scales with the trader&apos;s hours and contacts,
              not with a system.
            </p>
            <p className="mt-5">
              That model caps out. A trader can personally manage maybe 50 origin relationships.
              Bad weather in one district breaks the week&apos;s supply. A buyer calls asking for
              40 tons on two days&apos; notice and the trader cannot say yes without risking
              everything they promised the rest of the book. Credit terms are whatever the trader
              can float on their own working capital. Quality disputes happen downstream because
              grading was a guess, not a standard.
            </p>
            <p className="mt-5">
              The trader is not the problem. The infrastructure behind the trader is.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (sage + dotted texture) */}
      <section
        className="py-[56px] tablet:py-[72px] desktop:py-[96px]"
        style={{
          backgroundColor: "#D4DDC5",
          backgroundImage:
            "radial-gradient(circle, #B8C4A5 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
        }}
      >
        <div className="container-page">
          <div className="mx-auto text-center">
            <Reveal>
              <div
                className="whitespace-nowrap leading-[0.95] !text-[var(--color-deep-green)] text-[56px] tablet:text-[88px] desktop:text-[120px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                }}
              >
                Up to{" "}
                <CountUp
                  to={3}
                  duration={1000}
                  trigger="inview"
                  sessionKey="wholesalers-hinge-3x"
                />
                x
              </div>
            </Reveal>
            <DelayedFade
              as="p"
              delay={0.3}
              duration={0.5}
              className="t-body-lg mt-6 tablet:mt-8 max-w-[720px] mx-auto"
              viewportMargin="0px 0px -30% 0px"
            >
              <span style={{ color: "rgba(6, 94, 58, 0.75)" }}>
                The volume a wholesale trader typically moves after plugging into Fashol&apos;s
                sourcing and settlement stack. Same trader, same relationships, same market stall
                - now with a supply chain that does not cap at the trader&apos;s personal capacity.
              </span>
            </DelayedFade>
          </div>
        </div>
      </section>

      {/* Section 4 - The Comparison (ComparisonLedger) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal
              as="span"
              className="block t-eyebrow"
            >
              BEFORE AND AFTER FASHOL
            </Reveal>
            <Reveal as="h2" className="t-h2 mt-6">
              The same trader. A different ceiling.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Fashol does not replace the wholesale trade. It extends its capacity. Below is what
              changes when a wholesaler plugs in.
            </p>
          </Reveal>
        </div>

        {/* Transformation pairs — 8 asymmetric rows with display anchors, zigzag orientation. */}
        <div className="mt-12 tablet:mt-16" role="list">
          {COMPARISON_PAIRS.map((pair, idx) => (
            <ComparisonPair
              key={pair.fasholAnchor + idx}
              index={idx + 1}
              oldAnchor={pair.oldAnchor}
              oldBody={pair.oldBody}
              fasholAnchor={pair.fasholAnchor}
              fasholAnchorIsNumeric={pair.fasholAnchorIsNumeric}
              fasholBody={pair.fasholBody}
            />
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-16 tablet:mt-20 text-center">
          <Reveal>
            <p
              className="text-[28px] tablet:text-[36px] desktop:text-[40px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-deep-green)",
              }}
            >
              Not a new business. A bigger one.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 - Four levers of scale (surface, 2x2 grid) */}
      <Section tone="surface">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Four places the ceiling lifts.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Each of these is independently valuable. Together they move the whole book.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {LEVERS.map((l) => (
            <StaggerItem key={l.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] p-8">
                <div
                  aria-hidden
                  className="w-[120px] h-[120px] bg-[var(--color-grain)]"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-6">
                  {l.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {l.headline}
                </h3>
                <p className="t-body-sm mt-3">{l.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 6 - Powered by (paper, 2-up grid) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The two products behind this work.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/banijjo-logo.png"
                alt="Banijjo"
                width={1000}
                height={248}
                sizes="400px"
                className="h-10 tablet:h-12 w-auto object-contain self-start"
              />
              <p className="t-body mt-6">
                The wholesale trade platform. Live pricing from 200-plus markets, same-day
                settlement, and a full book of origin supply across 50 districts.
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/banijjo" className="link-arrow">
                  Open product page
                </Link>
              </div>
            </article>
          </Reveal>
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/hyperfarm%20logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain self-start mix-blend-multiply"
              />
              <p className="t-body mt-6">
                The buyer procurement desk. Wholesalers use Hyperfarm to service their downstream
                book - restaurants, supershops, quick commerce, institutional kitchens.
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/hyperfarm" className="link-arrow">
                  Open product page
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - Pull quote (sage + dotted texture) */}
      <section
        className="py-[56px] tablet:py-[72px] desktop:py-[96px]"
        style={{
          backgroundColor: "#D4DDC5",
          backgroundImage:
            "radial-gradient(circle, #B8C4A5 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
        }}
      >
        <div className="container-page">
          <div className="mx-auto text-center max-w-[820px]">
            <QuoteReveal
              className="!text-[var(--color-deep-green)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              &ldquo;I was moving around 80 tons a week before Fashol. I knew my ceiling. The
              relationships I had, the hours I could keep, the credit I could float - it worked
              out to 80 tons. Today I move above 250 tons a week. Same stall, same market. The
              difference is I am not sourcing alone anymore.&rdquo;
            </QuoteReveal>
            <Reveal delay={0.16}>
              <figcaption className="mt-8 flex flex-col items-center">
                <span
                  className="text-[14px]"
                  style={{ fontWeight: 500, color: "var(--color-deep-green)" }}
                >
                  Abul Kashem
                </span>
                <span
                  className="text-[12px] mt-1"
                  style={{ color: "rgba(6,94,58,0.65)" }}
                >
                  Wholesale trader, Karwan Bazar, Dhaka
                </span>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 8 - How it starts (surface, 4 step cards) */}
      <Section tone="surface">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Seventy-two hours from first conversation to wholesale delivery.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Wholesale traders do not need a rollout. Fashol&apos;s wholesale desk can run a
              live supply load within three days of the first conversation. The trade team scopes
              volume, maps SKUs to Banijjo pricing, and turns on the first delivery. The
              relationship grows from there.
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
            Talk to Fashol&apos;s wholesale team
          </Link>
        </Reveal>
      </Section>

      {/* Section 9 - Other roles on the chain (paper) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The rest of the trade side runs on Fashol too.
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

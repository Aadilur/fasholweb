import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
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
  title: "Supershops - Fashol",
  description:
    "Wholesale pricing locked for the week, daily replenishment to every outlet, and cold-chain fulfillment that protects fresh produce margin. Fashol supplies Shwapno, Meena Bazar, Agora, and Daily Shopping across hundreds of outlets in Bangladesh.",
};

const HERO_IMAGE_PATH = "/sshero.jpg";

type HeroStat =
  | { kind: "text"; value: string; label: string }
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      label: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "text",
    value: "Shwapno. Meena Bazar. Agora. Daily Shopping.",
    label: "Running on Fashol",
  },
  {
    kind: "number",
    n: 400,
    format: "plain",
    suffix: "+ outlets",
    label: "Across modern retail in Bangladesh",
  },
  {
    kind: "text",
    value: "Daily delivery",
    label: "Cold-chain to every store",
  },
];

// Bento card data types - discriminated union so each card variant renders
// with the right content slots.
type ClaimCard = {
  kind: "claim";
  tag: string;
  imageSrc: string;
  imageAlt: string;
  statement: string;
  body: string;
};

type ProofCard = {
  kind: "proof";
  tag: string;
  display: string;
  displayScale: "lg" | "md";
  body: string;
};

type ClosingCard = {
  kind: "closing";
  statement: string;
};

type BentoCard = ClaimCard | ProofCard | ClosingCard;

type BentoEntry = {
  card: BentoCard;
  // Tailwind col-span classes for each breakpoint tier (tablet 810+, desktop 1200+).
  span: string;
};

const BENTO: ReadonlyArray<BentoEntry> = [
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      tag: "CLAIM 01",
      imageSrc: "/claim1.png",
      imageAlt:
        "An isometric scale with a price tag stable on top next to a flat-line indicator",
      statement: "Margin that holds for the week.",
      body: "Wholesale pricing locked for the agreed window, regardless of spot-market shocks. The shelf price holds, the margin holds, the CFO's quarterly number stops moving.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      tag: "CLAIM 02",
      imageSrc: "/claim2.png",
      imageAlt:
        "An isometric delivery van tracing a supply route with multiple drop-off points",
      statement: "Daily replenishment to every outlet.",
      body: "Cold-chain delivery before opening hours to every store on the chain. No empty shelves at 10 AM. No overstock left at 9 PM. Volume per outlet is dialed against actual sell-through, not estimated demand.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      tag: "PROOF POINT",
      display: "1,000+",
      displayScale: "lg",
      body: "SKUs across fresh produce categories, available daily on Hyperfarm.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      tag: "CLAIM 03",
      imageSrc: "/claim3.png",
      imageAlt:
        "An isometric hub diagram showing one Fashol source connecting to many supershop outlets",
      statement: "One supplier across the whole chain.",
      body: "A 20-plus outlet supershop chain on Fashol manages one invoice, one delivery contract, one quality SLA. Procurement teams stop reconciling across vendors. Category heads stop explaining inconsistency between branches.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      tag: "PROOF POINT",
      display: "4-tier",
      displayScale: "md",
      body: "Grading applied at Fashol's hub before dispatch. Only the agreed grade reaches the outlet.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "Graded at origin. Delivered shelf-ready, every morning.",
    },
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "The conversation.",
    body: "A Fashol supershop representative walks through the chain's current produce program - SKU list, weekly volumes per outlet, supplier roster, margin baseline, freshness SLAs.",
  },
  {
    n: "02",
    headline: "First outlet live.",
    body: "Within 72 hours, one outlet starts running on Fashol. Cold-chain fulfillment, four-tier grading, daily replenishment. The chain's procurement team monitors against the existing supply for the first three days.",
  },
  {
    n: "03",
    headline: "Margin baseline confirmed.",
    body: "End of day five, the chain reviews the first outlet's margin, freshness, and replenishment performance against the rest of the network. Pricing windows are locked for the chain rollout.",
  },
  {
    n: "04",
    headline: "Full chain live.",
    body: "Days six and seven, the remaining outlets onboard in waves. The trade team stays embedded for the first month to tune SKU mix, replenishment volume, and quality SLAs per outlet.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Restaurants",
    description:
      "Morning delivery for 400+ restaurants including Domino's, with grading at the hub and transparent wholesale pricing.",
    href: "/solutions/restaurants",
  },
  {
    name: "Quick commerce",
    description:
      "Fill rate above 95% for Foodpanda, Chaldal, and Foodie, with same-day fulfillment to every dark store in Dhaka.",
    href: "/solutions/quick-commerce",
  },
  {
    name: "Retailers",
    description:
      "Supply partnerships for smaller retail chains and corner stores, with consistent grading and dependable volumes.",
    href: "/solutions/retailers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function SupershopsPage() {
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo, no overlay) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        {heroImageExists && (
          <Reveal
            delay={0}
            duration={0.8}
            y={0}
            amount={0}
            className="absolute inset-0 z-0"
          >
            <Image
              src={HERO_IMAGE_PATH}
              alt="A modern supershop produce aisle in Bangladesh"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
          </Reveal>
        )}

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Supershops.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-start max-w-[260px]"
                >
                  <dd
                    className="t-tabular text-[18px] tablet:text-[20px] desktop:text-[22px] leading-[1.15] !text-[var(--color-paper)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.kind === "number" ? (
                      <CountUp
                        to={s.n}
                        format={s.format}
                        suffix={s.suffix}
                        duration={1200}
                        delay={i * 150}
                        sessionKey={`supershops-hero-stat-${i}`}
                      />
                    ) : (
                      <Reveal
                        as="span"
                        delay={0.24 + i * 0.12}
                        duration={0.6}
                        y={0}
                      >
                        {s.value}
                      </Reveal>
                    )}
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.7)]">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.48} className="mt-8 tablet:mt-10">
              <TalkToSalesButton />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (paper, two-column, no image) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Fresh produce is where supershop margins quietly disappear.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A supershop&apos;s fresh produce section does two things at once. It is
              the category that brings shoppers into the store week after week, and it
              is the category that quietly eats the most margin. Tomato prices move 30
              percent in a week and the shelf price cannot move with it. A supplier
              delivers Grade B when the contract was Grade A and the produce gets
              discounted to clear before it spoils. A delivery van arrives late, the
              morning shoppers find empty shelves, and the day&apos;s basket size
              drops.
            </p>
            <p className="mt-5">
              Most supershops manage fresh produce through a roster of suppliers - one
              for vegetables, one for fruits, one for leafy greens, one for imports.
              Each has their own pricing, their own quality variance, their own
              delivery reliability. Procurement teams spend mornings reconciling
              invoices and afternoons explaining shrinkage to category heads. The CFO
              sees fresh produce margin numbers that move every quarter and cannot
              tell whether it is a supplier issue, a market issue, or a forecasting
              issue.
            </p>
            <p className="mt-5">
              Fresh produce should be a stable contributor, not a volatility center.
              The supply chain is what makes the difference.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <Reveal>
            <div
              className="whitespace-nowrap leading-[0.95] !text-[var(--color-paper)] text-[56px] tablet:text-[88px] desktop:text-[120px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              Up to{" "}
              <CountUp
                to={18}
                duration={1000}
                trigger="inview"
                sessionKey="supershops-hinge-18"
              />
              %
            </div>
          </Reveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[720px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              The fresh produce margin a supershop typically protects on Fashol
              compared to a spot-market supply model. Pricing locked for the week,
              grading at the hub, daily replenishment to every outlet - the
              volatility that used to live in the category disappears.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Four claims bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="span" className="block t-eyebrow">
              WHAT FASHOL DELIVERS TO A SUPERSHOP CHAIN
            </Reveal>
            <Reveal as="h2" className="t-h2 mt-6">
              Four things the procurement desk and the CFO both want.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Margin protection, replenishment reliability, multi-outlet coordination,
              and shelf-ready freshness. Every Fashol delivery to a supershop is built
              around these four, every day.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5"
          stagger={0.08}
        >
          {BENTO.map((entry, i) => (
            <StaggerItem key={i} className={entry.span} y={20}>
              <BentoCardView card={entry.card} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 5 - Powered by (paper) */}
      <Section tone="paper">
        <div className="text-center max-w-[720px] mx-auto">
          <Reveal as="h2" className="t-h2">
            The product behind this work.
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 flex justify-center">
          <Reveal className="w-full max-w-[500px]">
            <article className="flex flex-col items-start">
              <Image
                src="/images/content/hyperfarm-logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain"
              />
              <p className="t-body mt-6">
                The buyer procurement desk. Supershop chains use Hyperfarm to lock
                weekly pricing, schedule outlet replenishment, track quality SLAs,
                and reconcile multi-outlet supply on a single platform.
              </p>
              <div className="mt-6">
                <Link href="/products/hyperfarm" className="link-arrow">
                  Open product page
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - Pull quote (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;We were running fresh produce across nine suppliers, and our
            margin was a different story every quarter. Once we moved produce supply
            to Fashol, the procurement team stopped chasing invoices and category
            heads stopped chasing variance reports. The number that moves is volume
            now, not margin.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Mahmud Hasan
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                Category Head, Fresh Produce, Shwapno
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface-deep) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              One outlet first. Then the rest of the chain in one week.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Supershop chains do not switch fresh produce supply lightly.
              Fashol&apos;s supershop desk runs a one-outlet pilot first. Day one is
              the conversation - SKU list, weekly volume per outlet, current supplier
              mix, margin baseline. Day three is the first outlet live. Day seven is
              the full chain on Fashol. The trade team stays embedded for the first
              month to lock margins and tune SKU mix per outlet.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="h-full">
              <article className="h-full flex flex-col bg-[var(--card-bg)] rounded-[4px] p-6 tablet:p-8">
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
            Talk to Fashol&apos;s supershop team
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain (paper) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The rest of the demand side runs on Fashol too.
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

// ------------------------------------------------------------------
// Bento card rendering. Each card variant sits in a --card-bg block
// (brighter cream on surface-deep sections) with a tag at top-right
// plus variant-specific content below.
// ------------------------------------------------------------------

function BentoCardView({ card }: { card: BentoCard }) {
  if (card.kind === "claim") return <ClaimCardView card={card} />;
  if (card.kind === "proof") return <ProofCardView card={card} />;
  return <ClosingCardView card={card} />;
}

function CardTag({ text }: { text: string }) {
  return (
    <span
      className="t-mono text-[11px] tracking-[0.14em] uppercase absolute top-6 right-6 tablet:top-8 tablet:right-8"
      style={{ color: "rgba(6, 94, 58, 0.55)" }}
    >
      {text}
    </span>
  );
}

function ClaimCardView({ card }: { card: ClaimCard }) {
  const imageReady = publicFileExists(card.imageSrc);
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "360px" }}
    >
      <CardTag text={card.tag} />
      <div className="pt-4">
        {imageReady ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
            }}
          >
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(min-width: 1200px) 520px, (min-width: 810px) 45vw, 100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div
            aria-hidden
            style={{
              width: "100%",
              aspectRatio: "4 / 3",
              backgroundColor: "var(--color-paper)",
              border: "1px dashed rgba(184, 196, 165, 0.45)",
              borderRadius: "6px",
            }}
          />
        )}
      </div>
      <h3
        className="mt-auto pt-6"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(26px, 2.8vw, 40px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {card.statement}
      </h3>
      <p
        className="mt-4"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px",
          lineHeight: 1.55,
          color: "rgba(6, 94, 58, 0.85)",
        }}
      >
        {card.body}
      </p>
    </article>
  );
}

function ProofCardView({ card }: { card: ProofCard }) {
  const displayStyle =
    card.displayScale === "lg"
      ? {
          fontSize: "clamp(40px, 4.4vw, 64px)",
          letterSpacing: "-0.03em",
        }
      : {
          fontSize: "clamp(40px, 4.4vw, 64px)",
          letterSpacing: "-0.025em",
        };

  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "320px" }}
    >
      <CardTag text={card.tag} />
      <h3
        className="pt-10"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          lineHeight: 1,
          color: "var(--color-deep-green)",
          ...displayStyle,
        }}
      >
        {card.display}
      </h3>
      <p
        className="mt-auto pt-6"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px",
          lineHeight: 1.55,
          color: "rgba(6, 94, 58, 0.85)",
        }}
      >
        {card.body}
      </p>
    </article>
  );
}

function ClosingCardView({ card }: { card: ClosingCard }) {
  return (
    <article
      className="relative flex items-center justify-center rounded-[12px] text-center px-8 tablet:px-12"
      style={{
        backgroundColor: "var(--card-bg)",
        minHeight: "280px",
        paddingBlock: "56px",
      }}
    >
      <p
        className="max-w-[920px]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(28px, 3.6vw, 56px)",
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          color: "var(--color-deep-green)",
        }}
      >
        {card.statement}
      </p>
    </article>
  );
}

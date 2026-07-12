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
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Agri machinery suppliers - Fashol",
  description:
    "Tractors, tillers, pumps, threshers - sell them or finance them. Fashol puts machinery catalogs in front of 60,000 farmers on Jogaan, and underwrites farmer financing in partnership with banks. The machinery market in Bangladesh is not limited by demand. It is limited by financing.",
};

const HERO_IMAGE_PATH = "/agmahero.jpg";

type HeroStat =
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      tail: string;
      label: string;
    }
  | {
      kind: "text";
      text: string;
      label: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "number",
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    label: "Farmers on Jogaan, active buyers",
  },
  {
    kind: "number",
    n: 50,
    format: "plain",
    suffix: "",
    tail: " districts",
    label: "Active across Bangladesh",
  },
  {
    kind: "text",
    text: "Sell or finance",
    label: "Two ways to reach every farmer",
  },
];

type ClaimCard = {
  kind: "claim";
  imageSrc?: string;
  imageAlt?: string;
  cardBg?: string;
  statement: string;
  body: string;
};

type ProofCard = {
  kind: "proof";
  display: string;
  displayScale: "lg" | "md" | "sm";
  body: string;
};

type ClosingCard = {
  kind: "closing";
  statement: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type BentoCard = ClaimCard | ProofCard | ClosingCard;

type BentoEntry = {
  card: BentoCard;
  span: string;
};

const BENTO: ReadonlyArray<BentoEntry> = [
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agma4.png",
      imageAlt:
        "An isometric Jogaan platform view with a machinery catalog connected to farmer figures across a stylized geography",
      cardBg: "#F8EBDB",
      statement: "Your catalog in front of 60,000 farmers.",
      body: "List your machinery on Jogaan and reach the full farmer network directly. Farmers browse, compare, request demos, and place orders. You see who is interested, from which district, for which crop cycle, before the sale closes.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agma5.png",
      imageAlt:
        "An isometric split-path visualization with a tractor in the center, one path leading to a direct sale and another to a financing ledger, both arriving at a farmer figure",
      cardBg: "#F9EEDE",
      statement: "Sell the machinery, or finance it.",
      body: "A farmer who can pay outright buys directly. A farmer who cannot pay outright qualifies for Fashol financing, underwritten against their Jogaan transaction history and crop income. You receive full payment up front either way. Fashol carries the financing relationship with the farmer.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Financing",
      displayScale: "md",
      body: "Farmer financing underwritten by Fashol against live transaction data on Jogaan. No credit risk to you, no collection burden, no separate financing desk to build.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agma6.png",
      imageAlt:
        "An isometric delivery route showing a tractor being transported from a Fashol hub to a farmer's field",
      cardBg: "#F7EAD9",
      statement: "Delivered to the farm, assembled, and running.",
      body: "Machinery is heavy and awkward to ship. Fashol's hub network handles last-mile delivery, on-site assembly, and first-run setup. The farmer does not figure out logistics. You do not figure out logistics. The machinery arrives working.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Spare parts",
      displayScale: "sm",
      body: "Farmers order spare parts and service through Jogaan. The machinery stays running. Your brand reputation stays intact.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "The market was never small. The money to reach it was.",
      ctaLabel: "Talk to Fashol's agri-machinery team",
      ctaHref: "/contact",
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
    headline: "Catalog and service mapping.",
    body: "A Fashol agri-machinery representative walks through your product catalog, pricing, warranty terms, delivery requirements, and spare-parts availability. Your SKUs are mapped onto Jogaan with full technical specs.",
  },
  {
    n: "02",
    headline: "Listing goes live.",
    body: "Your machinery goes live on Jogaan with images, specs, pricing, Fashol financing terms, and warranty details. Farmers across 50 districts see your catalog.",
  },
  {
    n: "03",
    headline: "Farmer orders begin.",
    body: "Farmers place orders directly on Jogaan. For outright purchases, full payment settles to you on confirmation. For financed orders, full payment settles to you immediately - Fashol carries the installment relationship with the farmer.",
  },
  {
    n: "04",
    headline: "Fashol handles delivery and service.",
    body: "Fashol's hub network delivers the machinery to the farmer's field, handles on-site assembly, and supports spare-parts orders and service requests through Jogaan. Your operational footprint stays light.",
  },
];

type ProductCard = {
  name: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoHeightClass?: string;
  role: string;
  href: string;
};

const POWERED_BY: ReadonlyArray<ProductCard> = [
  {
    name: "Jogaan",
    logoSrc: "/jogaanlogo.png",
    logoWidth: 1000,
    logoHeight: 248,
    role: "The farmer platform. Machinery suppliers list their product catalog on Jogaan and reach 60,000 registered farmers directly, with live demand visibility and order handling.",
    href: "/products/jogaan",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Farmers",
    description:
      "60,000 registered farmers on Jogaan, selling produce with transparent pricing, same-day settlement, and access to agri inputs, machinery, and credit.",
    href: "/solutions/farmers",
  },
  {
    name: "Agri input suppliers",
    description:
      "Seeds, pesticides, fertilizers, livestock feed direct to the farmer. Last-mile logistics and crop-cycle data built in.",
    href: "/solutions/agri-input-suppliers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function AgriMachinerySuppliersPage() {
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay, left to right) */}
      <section className="relative min-h-[720px] h-[94vh] overflow-hidden">
        {heroImageExists ? (
          <Reveal
            delay={0}
            duration={0.8}
            y={0}
            amount={0}
            className="absolute inset-0 z-0"
          >
            <Image
              src={HERO_IMAGE_PATH}
              alt="A farmer using a tractor in a field in Bangladesh"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 50%" }}
            />
          </Reveal>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{ backgroundColor: "var(--color-deep-green)" }}
          />
        )}

        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 tablet:pl-[8vw] tablet:pr-8 pb-[108px] tablet:pb-[124px] desktop:pb-[140px] pt-40 tablet:pt-48">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[45px] tablet:!text-[58px] desktop:!text-[70px]"
            >
              Agri machinery suppliers.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px]"
            >
              Tractors, tillers, pumps, threshers. Sell them or finance them
              through Fashol.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-start max-w-[260px]"
                >
                  <dd
                    className="t-tabular text-[28px] tablet:text-[32px] desktop:text-[36px] leading-none !text-[var(--color-ink)]"
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
                          trigger="inview"
                          inviewMargin="0px"
                          sessionKey={`agri-machinery-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2">
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
              Farmers want the tractor. They cannot afford the tractor.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A tractor in Bangladesh costs somewhere between five and fifteen
              thousand US dollars. A thresher is two to five thousand. A power
              tiller is under two thousand but still out of reach for most
              smallholders. The farmer running two or three bighas of land, the
              farmer most machinery companies are actually selling to, has
              annual revenue of a few thousand dollars. The math does not work.
              The machinery sits on the dealer floor and the farmer keeps
              renting or borrowing.
            </p>
            <p className="mt-5">
              Machinery companies know this. They have known it for decades.
              The workaround has been dealer-led installment schemes, informal
              moneylender financing, or government subsidies that apply to a
              narrow segment. None of these reach the full farmer population.
              The result is a market that looks small when it is actually huge
              - most farmers want modern machinery, and most farmers cannot buy
              modern machinery, and the gap between those two facts is where
              the real Bangladesh agricultural market lives.
            </p>
            <p className="mt-5">
              The machinery companies do not have a demand problem. They have a
              financing problem.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) - phrase, letter-spacing ease-in (no count-up) */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.08em"
            duration={1.2}
            className="!text-[var(--color-paper)] text-[40px] tablet:text-[60px] desktop:text-[80px] leading-[1.02]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            From a small fraction to the full network.
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.4}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[780px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              The farmers who can afford machinery outright are a small
              fraction of the 60,000 on Jogaan. The farmers who can afford
              machinery on installments are most of them. Fashol
              converts the second group into real buyers, and the addressable
              market expands from a narrow slice to the full network.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Four claims bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Four things that turn machinery interest into machinery sales.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Direct farmer reach, Fashol financing built in, last-mile
              delivery, and post-sale service infrastructure. The complete
              stack between your catalog and the farmer&apos;s field.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5 [--card-bg:#F8EBDB]"
          stagger={0.08}
        >
          {BENTO.map((entry, i) => (
            <StaggerItem key={i} className={entry.span} y={20}>
              <BentoCardView card={entry.card} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 5 - Powered by (paper, 2-up grid) */}
      <Section tone="paper">
        <div className="text-center max-w-[720px] mx-auto">
          <Reveal as="h2" className="t-h2">
            The product behind this work.
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 max-w-[520px] mx-auto">
          {POWERED_BY.map((p) => (
            <Reveal key={p.name} className="w-full h-full">
              <article className="h-full flex flex-col items-start">
                <Image
                  src={p.logoSrc}
                  alt={p.name}
                  width={p.logoWidth}
                  height={p.logoHeight}
                  sizes="(min-width: 1200px) 400px, (min-width: 810px) 45vw, 90vw"
                  quality={95}
                  className={`${p.logoHeightClass ?? "h-10 tablet:h-12"} w-auto object-contain`}
                />
                <p className="t-body mt-6">{p.role}</p>
                <div className="mt-auto pt-6">
                  <Link href={p.href} className="link-arrow">
                    Open product page
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 6 - Statement (ink) - attribution-neutral editorial statement */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[900px]">
          <LetterSpaceReveal
            as="p"
            startSpacing="0.08em"
            duration={0.8}
            className="!text-[var(--color-paper)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(22px, 3vw, 44px)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
            }}
          >
            Not limited by what farmers want. Limited by what they can pay.
            Fashol closes the gap.
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface-deep) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Your catalog on Jogaan. Orders follow.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Machinery suppliers do not need a long rollout. Fashol&apos;s
              agri-machinery team maps your product catalog, pricing, and
              service terms onto Jogaan. Farmers begin viewing and requesting
              demos. Orders - paid outright or financed through Fashol -
              follow.
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
            Talk to Fashol&apos;s agri-machinery team
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain (paper) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The rest of the supply side runs on Fashol too.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6">
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
// Bento card rendering. Claim cards carry an illustration, big
// statement, and body. Proof cards carry a big display value. Closing
// card is a centered full-width statement with an optional inline CTA.
// ------------------------------------------------------------------

function BentoCardView({ card }: { card: BentoCard }) {
  if (card.kind === "claim") return <ClaimCardView card={card} />;
  if (card.kind === "proof") return <ProofCardView card={card} />;
  return <ClosingCardView card={card} />;
}

function ClaimCardView({ card }: { card: ClaimCard }) {
  const hasImage = !!card.imageSrc && publicFileExists(card.imageSrc);
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: card.cardBg ?? "var(--card-bg)", minHeight: hasImage ? "360px" : "320px" }}
    >
      {hasImage && card.imageSrc && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "2 / 1",
          }}
        >
          <Image
            src={card.imageSrc}
            alt={card.imageAlt ?? ""}
            fill
            sizes="(min-width: 1200px) 520px, (min-width: 810px) 45vw, 100vw"
            className="object-contain"
          />
        </div>
      )}
      <h3
        className={hasImage ? "mt-auto pt-6" : ""}
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
        className={hasImage ? "mt-4" : "mt-auto pt-6"}
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
          fontWeight: 500,
          lineHeight: 1,
        }
      : card.displayScale === "md"
        ? {
            fontSize: "clamp(36px, 4vw, 56px)",
            letterSpacing: "-0.025em",
            fontWeight: 500,
            lineHeight: 1,
          }
        : {
            fontSize: "clamp(24px, 2.6vw, 36px)",
            letterSpacing: "-0.02em",
            fontWeight: 500,
            lineHeight: 1.15,
          };

  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "320px" }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
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
      className="relative flex flex-col items-center justify-center rounded-[12px] text-center px-8 tablet:px-12"
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
      {card.ctaLabel && card.ctaHref && (
        <div className="mt-8">
          <Link href={card.ctaHref} className="link-arrow">
            {card.ctaLabel}
          </Link>
        </div>
      )}
    </article>
  );
}

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
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Retailers - Fashol",
  description:
    "Fresh produce delivered to your mudi shop before 6 AM, without the 4 AM trip to Karwan Bazar. Wholesale prices, quality dialed to your shop, no minimum order. Fashol has served 7,000+ mudi shops across Bangladesh for six years.",
};

const HERO_IMAGE_PATH = "/rehero.jpg";

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
    kind: "number",
    n: 7000,
    format: "comma",
    suffix: "+",
    label: "Mudi shops served, six years of supply",
  },
  {
    kind: "text",
    value: "Before 6 AM",
    label: "Daily delivery to your shop",
  },
  {
    kind: "text",
    value: "Grade matched",
    label: "Quality dialed to your shop",
  },
];

// Bento card types. Three display scales on Proof cards cover the range from
// short numeric displays ("6 years") to phrase-length text ("Cash on delivery").
type ClaimCard = {
  kind: "claim";
  imageSrc: string;
  imageAlt: string;
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
      imageSrc: "/re1.png",
      imageAlt:
        "An isometric mudi shop with produce arriving at the door from a delivery van, owner opening the shutter",
      statement: "Your sleep back.",
      body: "Fashol delivers to your shop before 6 AM, every day. Stop sleeping four hours. Stop driving to Karwan Bazar. Open your shop rested, with produce already stacked at the door.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/re3.png",
      imageAlt:
        "An isometric phone showing a simple price list with a stable flat-line indicator",
      statement: "Wholesale prices, delivered.",
      body: "The same prices you would pay at the wholesale market, with delivery included. No more vendor haggling. No more price shocks on tomato days. You know the price before you order.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "6 years",
      displayScale: "lg",
      body: "Of daily mudi shop supply across Bangladesh. Same shops, same routes, same trust.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/re2.png",
      imageAlt:
        "An isometric row of mudi shops receiving produce in crates of varying fills, suggesting different quality grades without labels",
      statement: "Whatever grade you want.",
      body: "A shop in one neighborhood does not serve the same customer as a shop in another. Fashol grades produce to match what your customers buy. Premium grade where premium sells. Standard grade where standard sells. Your margin holds because your quality matches your price.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Cash on delivery",
      displayScale: "sm",
      body: "Pay on delivery, every order. No contracts, no deposits, no monthly invoicing. The business runs on the same terms your shop does.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement:
        "The market comes to the shop now. Not the other way around.",
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
    headline: "WhatsApp message.",
    body: "Send a message to Fashol's mudi shop team listing what you usually buy and where your shop is located. A team member confirms within an hour.",
  },
  {
    n: "02",
    headline: "Next-day delivery.",
    body: "The next morning, before 6 AM, Fashol delivers your first order to your shop. Cold-chain, graded for your shop, wholesale prices. Pay cash on delivery.",
  },
  {
    n: "03",
    headline: "Daily or weekly orders.",
    body: "Order daily, weekly, or whenever you need. Change your order by WhatsApp any evening before 9 PM. No minimum, no maximum, no contract.",
  },
  {
    n: "04",
    headline: "Your sleep back.",
    body: "Stop going to the market. Open your shop when it is time to open, rested, with produce already at the door.",
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
    name: "Supershops",
    description:
      "Daily replenishment for Shwapno, Meena Bazar, Agora, and Daily Shopping, with pricing locked for the week.",
    href: "/solutions/supershops",
  },
  {
    name: "Quick commerce",
    description:
      "Fill rate above 95% for Foodpanda, Chaldal, and Foodie, with same-day fulfillment to every dark store.",
    href: "/solutions/quick-commerce",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function RetailersPage() {
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
              alt="A mudi shop in Dhaka with fresh produce on display at the front"
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
              Retailers.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[620px] !text-[rgba(255,251,234,0.78)]"
            >
              Fresh produce at your shop before 6 AM. Wholesale prices. No minimum
              order.
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
                        sessionKey={`retailers-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">
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
              A mudi shop owner does three jobs before the shop opens.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Running a mudi shop in Bangladesh means running three businesses before
              sunrise. At 4 AM the owner is at Karwan Bazar or the nearest wholesale
              market, haggling for the day&apos;s produce. By 6 AM the load is back at
              the shop, getting sorted and stacked for display. By 7 AM the shutters
              come up and the owner works the counter for the next twelve hours. The
              morning market run is not optional. The shop cannot open without it.
            </p>
            <p className="mt-5">
              The morning run costs more than hours. The prices are whatever the
              vendor decides that day. Quality is whatever was left by the time the
              shopkeeper reached the stall. Transport back to the shop is another
              cost, another delay, another risk. A single owner cannot compete with
              the supershop chains on price or freshness, and cannot scale without
              hiring help they cannot afford.
            </p>
            <p className="mt-5">
              A mudi shop does not need a procurement team. It needs a supply partner
              that brings the market to the shop, not the other way around.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) - phrase, letter-spacing ease-in (not count-up) */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.08em"
            duration={1}
            className="!text-[var(--color-paper)] text-[44px] tablet:text-[68px] desktop:text-[92px] leading-[0.98]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            No minimum order.
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[720px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              Order what you need, when you need it. Fashol delivers to mudi shops
              starting from a single crate. No wholesale contracts, no volume
              commitments, no haggling. Cash on delivery, wholesale prices, quality
              graded for your shop.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Four claims bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Four reasons to stop going to the market.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Your sleep back, wholesale prices, quality dialed to your shop, and no
              minimum order. Every Fashol delivery to a mudi shop is built around
              these four.
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
                The buyer procurement desk. Mudi shop owners order daily from
                Hyperfarm - by phone, by WhatsApp, or from the app - and receive
                cold-chain delivery before opening hours at wholesale prices.
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
            &ldquo;I went to Karwan Bazar every morning at 4 AM for nineteen years.
            My daughter asked me once when the last time was I had breakfast with her
            before school. I could not remember. I stopped going to the market six
            months ago when Fashol started bringing the produce to the shop. Now I
            have breakfast with my daughter. That is the real thing this business
            gave me.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Mohammad Salam
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                Mudi shop owner, Mohakhali, Dhaka
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
              One WhatsApp message. Next morning, delivered.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Mudi shops do not need contracts or onboarding. Send a WhatsApp message
              to Fashol&apos;s mudi shop team, list what you normally buy, and Fashol
              delivers the next morning. Payment is cash on delivery. The
              relationship grows from there.
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
            Message Fashol&apos;s mudi shop team
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
// Bento card rendering. Three variants sit in a --card-bg block
// (brighter cream on surface-deep sections). Claim cards carry an
// illustration; Proof cards display a big value; Closing card is a
// full-width centered statement.
// ------------------------------------------------------------------

function BentoCardView({ card }: { card: BentoCard }) {
  if (card.kind === "claim") return <ClaimCardView card={card} />;
  if (card.kind === "proof") return <ProofCardView card={card} />;
  return <ClosingCardView card={card} />;
}

function ClaimCardView({ card }: { card: ClaimCard }) {
  const imageReady = publicFileExists(card.imageSrc);
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "360px" }}
    >
      <div>
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
            // sm - phrase-length text like "Cash on delivery".
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

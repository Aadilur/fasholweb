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
  title: "Agri input suppliers - Fashol",
  description:
    "Seeds, pesticides, fertilizers, livestock feed - straight to the farmer. Fashol puts input supplier catalogs on Jogaan and reaches 60,000 registered farmers across 50 districts with last-mile delivery through 40+ hubs.",
};

const HERO_IMAGE_PATH = "/aginhero.jpg";

type HeroStat = {
  n: number;
  format: "comma" | "plain";
  suffix: string;
  tail: string;
  label: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    label: "Farmers on Jogaan, ready to buy",
  },
  {
    n: 50,
    format: "plain",
    suffix: "",
    tail: " districts",
    label: "Active across Bangladesh",
  },
  {
    n: 40,
    format: "plain",
    suffix: "+",
    tail: " hubs",
    label: "Last-mile distribution to the farm gate",
  },
];

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
      imageSrc: "/agin1.png",
      imageAlt:
        "An isometric platform diagram showing an input supplier node connected directly to multiple farmer nodes, bypassing a faded dealer chain",
      statement: "Sell direct to the farmer who buys.",
      body: "Your product on Jogaan reaches 60,000 registered farmers across 50 districts. No dealers in between, no retail markup, no margin lost. The farmer pays closer to depot price. You capture the spread the middle of the chain used to take.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agin2.png",
      imageAlt:
        "An isometric last-mile delivery network with a central hub and delivery lines reaching farm icons scattered across a stylized geography",
      statement: "Last-mile logistics, built in.",
      body: "Fashol's 40+ hub network moves your product to the farm gate in districts where your existing dealer coverage is thin or nothing. Rangpur, Kushtia, Mymensingh, Bogra - the farmers who were hardest to reach become reachable without building your own distribution.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "40+",
      displayScale: "lg",
      body: "Fashol hubs across Bangladesh, each with cold chain and storage for agri inputs alongside produce.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agin3.png",
      imageAlt:
        "An isometric dashboard showing crop cycles across districts, with subtle indicators for planting windows, active crops, and harvest periods",
      statement: "Know what the farmer grows before you sell it.",
      body: "Jogaan's transaction data shows what crops are planted, where, and at what cycle stage. A pesticide for rice planting reaches rice farmers during planting, not during harvest. A fertilizer for winter vegetables reaches vegetable growers when they need it. Campaign-level targeting, not blast distribution.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Myfarm",
      displayScale: "md",
      body: "Farmers finance input purchases through Myfarm, underwritten against their Jogaan transaction history. The addressable market expands without you carrying the credit risk.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "The dealer was the best option. There is a better one now.",
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
    headline: "Catalog mapping.",
    body: "A Fashol agri-input representative walks through your product catalog, pricing, packaging, and crop-cycle relevance. Within 48 hours, your SKUs are mapped onto Jogaan with the right categorization.",
  },
  {
    n: "02",
    headline: "Listing goes live.",
    body: "Your products go live on Jogaan with images, specs, pricing, and recommended crop applications. Farmers across 50 districts see your catalog from the first day.",
  },
  {
    n: "03",
    headline: "First farmer orders.",
    body: "Farmers begin placing orders from your catalog. Fashol's hub network handles last-mile delivery to the farm gate. Payment settles to you same-day on every delivered order.",
  },
  {
    n: "04",
    headline: "Data flows back.",
    body: "You see who bought what, when, in which district, for which crop. Your next campaign, next product launch, next distribution decision runs on live Jogaan data, not on dealer reports.",
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
    name: "Agri machinery suppliers",
    description:
      "Marketplace access for tractors, tillers, pumps, and harvest equipment. Farmer demand, last-mile logistics, and credit underwriting built in.",
    href: "/solutions/agri-machinery-suppliers",
  },
  {
    name: "Supply chain financing",
    description:
      "Working capital, input credit, and seasonal financing underwritten against live transaction data on Jogaan, Banijjo, and Hyperfarm.",
    href: "/solutions/supply-chain-financing",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function AgriInputSuppliersPage() {
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay, left to right) */}
      <section className="relative min-h-[600px] h-[78vh] overflow-hidden">
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
              alt="A Fashol hub with agri input supplies being distributed to farmers"
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

        {/* Forest-green gradient overlay: 90% at left, 0% at right */}
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(6, 94, 58, 0.9) 0%, rgba(6, 94, 58, 0.6) 40%, rgba(6, 94, 58, 0) 100%)",
          }}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Agri input suppliers.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px] !text-[rgba(255,251,234,0.82)]"
            >
              Seeds, pesticides, fertilizers, feed, straight to the farmer. No
              dealer layers, no margin lost.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-start max-w-[260px]"
                >
                  <dd
                    className="t-tabular text-[28px] tablet:text-[32px] desktop:text-[36px] leading-none !text-[var(--color-paper)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <CountUp
                      to={s.n}
                      format={s.format}
                      suffix={s.suffix}
                      duration={1200}
                      delay={i * 150}
                      trigger="inview"
                      inviewMargin="0px"
                      sessionKey={`agri-input-hero-stat-${i}`}
                    />
                    {s.tail}
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
              Reaching a farmer has always meant paying someone who knows one.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              An input company in Bangladesh has historically sold through a
              dealer network. Seed, fertilizer, and pesticide companies
              manufacture or import the product, warehouse it at regional
              depots, and then hand it to dealers who sell onward to retailers,
              who sell onward to farmers. Every hand in that chain takes a
              margin. Every hand adds a week. By the time a fertilizer bag
              reaches a farmer in Rangpur, it has moved through four parties
              and the farmer is paying 30 percent more than the depot price.
            </p>
            <p className="mt-5">
              The dealer model has more problems than margin. The input company
              cannot see who their real customer is. They know how much the
              dealer bought, not what the farmer actually planted. They cannot
              coordinate a crop-cycle campaign because they do not know what
              crops are being grown where. They cannot reach farmers in
              districts where dealer coverage is thin, which means the most
              underserved farmers stay underserved. And when a farmer has a bad
              experience with a product, the input company learns about it
              last, if at all.
            </p>
            <p className="mt-5">
              The dealer was the best option when there was nothing else. There
              is something else now.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) - count-up on 60,000 inside letter-spacing animation */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.06em"
            duration={1}
            className="!text-[var(--color-paper)] text-[44px] tablet:text-[68px] desktop:text-[92px] leading-[0.98]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            <CountUp
              to={60000}
              format="comma"
              duration={1200}
              trigger="inview"
              inviewMargin="0px 0px -30% 0px"
              sessionKey="agri-input-hinge-60000"
            />{" "}
            farmers, one platform.
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[760px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              Bangladesh&apos;s largest farmer platform, Jogaan, already has
              60,000 registered farmers transacting every week. An input
              supplier joining Jogaan reaches that network directly, with full
              visibility into who buys what, when, and where - no dealer layer
              in between.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Four claims bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Four things the dealer network was never going to give you.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Direct farmer reach, last-mile distribution, crop-cycle data, and
              credit infrastructure. Every Fashol connection is built to extend
              an input supplier&apos;s actual addressable market, not to
              replicate the dealer model digitally.
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

      {/* Section 5 - Powered by (paper, single centered card) */}
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
                src="/jogaanlogo.png"
                alt="Jogaan"
                width={1000}
                height={248}
                sizes="256px"
                quality={95}
                className="h-10 tablet:h-12 w-auto object-contain"
              />
              <p className="t-body mt-6">
                The farmer platform. Input suppliers list their products on
                Jogaan and reach 60,000 registered farmers directly, with
                last-mile delivery through Fashol&apos;s 40+ hub network and
                optional credit underwriting through Myfarm.
              </p>
              <div className="mt-6">
                <Link href="/products/jogaan" className="link-arrow">
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
            &ldquo;We were selling fertilizer through 180 dealers across 28
            districts and still losing farmers in the districts where dealer
            coverage was thin. Moving a portion of our distribution to Jogaan
            gave us direct visibility into farmer purchases for the first time.
            We stopped guessing who our customer was. Now we plan crop-cycle
            campaigns against live data instead of against dealer sales reports
            from two months ago.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Rezaul Karim
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                Head of Distribution, fertilizer manufacturer, Dhaka
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
              Your catalog on Jogaan. Farmers ordering the same week.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Input suppliers do not need a long rollout. Fashol&apos;s
              agri-input team maps your product catalog onto Jogaan within
              days. Farmers can order from your catalog as soon as it is live.
              Fashol handles last-mile fulfillment through the hub network. The
              data flows back to you live.
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
            Talk to Fashol&apos;s agri-input team
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
// Bento card rendering. Claim cards carry an illustration, big
// statement, and body. Proof cards carry a big display value. Closing
// card is a centered, full-width statement.
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

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
  title: "Importers - Fashol",
  description:
    "The import side is yours. The distribution side is ours. Once foreign produce lands in Bangladesh, Fashol distributes it across 7,000+ mudi shops, 400+ restaurants, and 400+ supershop outlets with cold-chain fulfillment and same-day settlement.",
};

const HERO_IMAGE_PATH = "/imhero.jpg";

type HeroStat = {
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
    label: "Mudi shops served",
  },
  {
    kind: "number",
    n: 400,
    format: "comma",
    suffix: "+",
    label: "Restaurants including Domino's",
  },
  {
    kind: "number",
    n: 400,
    format: "comma",
    suffix: "+",
    label: "Supershop outlets including Shwapno",
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
      imageSrc: "/im1.png",
      imageAlt:
        "An isometric network diagram showing a port container connected by thin lines to restaurant, shop, and warehouse icons spreading outward",
      statement: "The largest downstream network in Bangladesh.",
      body: "7,000 mudi shops, 400-plus restaurants including Domino's, 400-plus supershop outlets across Shwapno, Meena Bazar, Agora, Daily Shopping, and every major quick commerce platform. One import, one Fashol handoff, and your volume moves.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/im2.png",
      imageAlt:
        "An isometric cold-chain route from a port container to a Fashol hub out to multiple delivery destinations",
      statement: "Cold chain that does not break.",
      body: "From port clearance to Fashol hub to end buyer, the cold chain holds. Apples arrive at the restaurant the same grade they landed in Chittagong. Onions arrive at the supershop without shrinkage. Spoilage stops being a line item.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Full container",
      displayScale: "sm",
      body: "Absorbed and distributed by Fashol's network in a single cycle. No wholesale market dumping, no multi-week storage, no margin bleed.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/im3.png",
      imageAlt:
        "An isometric tablet showing demand indicators and charts with small icons representing restaurant, supershop, and quick commerce buyers",
      statement: "Demand you can see before you import.",
      body: "Hyperfarm's downstream book tells you what restaurants, supershops, and quick commerce platforms are buying this week, at what price, in what volume. Stop opening an LC on guesswork. Import against demand you have already measured.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Same-day",
      displayScale: "md",
      body: "Settlement on delivered volume once produce reaches the end buyer. Working capital turns faster, not slower.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "Your volume lands once. It moves everywhere.",
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
    body: "A Fashol import representative walks through your typical import book - origin countries, produce mix, container frequency, current wholesale trader relationships. One conversation, usually by phone.",
  },
  {
    n: "02",
    headline: "Next container landing.",
    body: "For your next cleared container, Fashol's import desk picks up from port clearance. Produce moves to the nearest Fashol hub for grading and routing.",
  },
  {
    n: "03",
    headline: "Distribution across the network.",
    body: "The full container volume is allocated across Fashol's downstream book - supershops, restaurants, quick commerce, mudi shops - based on current demand and pricing. Cold-chain delivery to every end buyer within the cycle.",
  },
  {
    n: "04",
    headline: "Settlement and forward planning.",
    body: "Same-day settlement on delivered volume. Your next import decision is made against Hyperfarm demand data, not against a wholesale market guess.",
  },
];

const POWERED_BY: ReadonlyArray<{
  name: string;
  logoSrc: string;
  role: string;
  href: string;
}> = [
  {
    name: "Banijjo",
    logoSrc: "/images/content/banijjo-logo.png",
    role: "The wholesale trade platform. Importers use Banijjo to settle imported volume across the downstream book - from mudi shops to supershops - with same-day settlement and live pricing.",
    href: "/products/banijjo",
  },
  {
    name: "Hyperfarm",
    logoSrc: "/images/content/hyperfarm-logo.png",
    role: "The buyer procurement desk. Importers use Hyperfarm to see live downstream demand across restaurants, supershops, and quick commerce platforms, and to plan import volumes against real buying signals.",
    href: "/products/hyperfarm",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Exporters",
    description:
      "End-to-end export corridors to the UK, Europe, the Middle East, and Southeast Asia.",
    href: "/solutions/exporters",
  },
  {
    name: "Wholesalers",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    href: "/solutions/wholesalers",
  },
  {
    name: "Commission agents",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and digital settlement.",
    href: "/solutions/commission-agents",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function ImportersPage() {
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
              alt="Containers being unloaded from a ship at Chittagong port, Bangladesh"
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

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Importers.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px] !text-[rgba(255,251,234,0.82)]"
            >
              The import side is yours. The distribution side is ours. Once
              produce lands in Bangladesh, Fashol moves it through the
              country&apos;s largest downstream network.
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
                      sessionKey={`importers-hero-stat-${i}`}
                    />
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
              Landing produce in Bangladesh is the easy part.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              An importer&apos;s job used to end at the Chittagong port. Clear
              the container, handle the paperwork, move the load to a warehouse,
              and sell into the wholesale market at whatever price the market
              gave that week. The distribution side was someone else&apos;s
              problem - aratdars, wholesale traders, downstream resellers. Each
              took a margin, and the importer absorbed whatever was left.
            </p>
            <p className="mt-5">
              That model has not worked well for years. Wholesale market prices
              move 20 percent in a week on imported produce. Cold-chain breaks
              once the container leaves the port. By the time apples from
              Washington or onions from India reach a retail shelf, they have
              passed through four hands, three temperature zones, and two weeks
              of transit. Quality variance destroys margin. Spoilage destroys
              volume. The importer carries the risk from LC to landing and then
              hands the rest of the chain to traders they cannot see into.
            </p>
            <p className="mt-5">
              The import side of this trade is not the problem. The distribution
              side is.
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
            One container. One delivery cycle.
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[760px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              A full container of imported produce, absorbed by Fashol&apos;s
              downstream network and distributed to end buyers - restaurants,
              supershops, quick commerce, mudi shops - within one delivery
              cycle. No wholesale market middlemen, no cold-chain breaks, no
              margin lost to hands you cannot see.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Four claims bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Four reasons to stop selling into the wholesale market.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Downstream reach, cold-chain distribution, live demand visibility,
              and quality routing. Every Fashol delivery cycle is built to
              absorb landed import volume and move it to end buyers on your
              behalf.
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

      {/* Section 5 - Powered by (paper, 2-up grid) */}
      <Section tone="paper">
        <div className="text-center max-w-[720px] mx-auto">
          <Reveal as="h2" className="t-h2">
            The two products behind this work.
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-2 gap-10 desktop:gap-16">
          {POWERED_BY.map((p) => (
            <Reveal key={p.name} className="w-full">
              <article className="flex flex-col items-start">
                <Image
                  src={p.logoSrc}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  sizes="120px"
                  className="h-20 tablet:h-24 w-auto object-contain"
                />
                <p className="t-body mt-6">{p.role}</p>
                <div className="mt-6">
                  <Link href={p.href} className="link-arrow">
                    Open product page
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 6 - Pull quote (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;We used to land a container and then spend three weeks trying
            to clear it through wholesale traders who paid us less each time.
            Since joining Fashol, a container lands on Monday and by Friday the
            full volume is delivered to supershops, restaurants, and retail
            shops with settlement done. I stopped being an importer with a
            warehouse problem. I am just an importer now.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Farhan Chowdhury
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                Director, fresh produce import, Chittagong
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
              Your next container lands. Fashol takes it from there.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Importers do not need onboarding weeks. Fashol&apos;s import desk
              coordinates with your next landing container. Day one is the
              conversation - what you typically import, what you currently sell
              into, what your volume looks like. Day two is your first cleared
              container moving into Fashol&apos;s distribution network. From
              there, the distribution side runs on its own.
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
            Talk to Fashol&apos;s import team
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain (paper) */}
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

// ------------------------------------------------------------------
// Bento card rendering. Claim cards carry a tag, illustration, big
// statement, and body. Proof cards carry a tag and a big display value.
// Closing card is a centered, full-width statement.
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
            // sm - phrase-length text like "Full container".
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

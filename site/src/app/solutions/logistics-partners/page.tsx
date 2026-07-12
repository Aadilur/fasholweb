import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
  QuoteReveal,
  LetterSpaceReveal,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Logistics partners - Fashol",
  description:
    "Fashol partners with small fleet owners across Bangladesh to route loads directly, match return trips, and keep trucks earning on both legs. 40+ hubs, 50 districts, 3,500+ MT of produce moving through the network every month.",
};

const HERO_IMAGE_PATH = "/images/solutions/logistics-partners/shero.jpg";
const CLAIM_01_IMAGE = "/images/solutions/logistics-partners/claim-01.png";
const CLAIM_02_IMAGE = "/images/solutions/logistics-partners/claim-02.png";

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
    n: 40,
    format: "plain",
    suffix: "+",
    tail: "",
    label: "Hubs of origin and destination",
  },
  {
    kind: "number",
    n: 50,
    format: "plain",
    suffix: "",
    tail: "",
    label: "Districts of operational reach",
  },
  {
    kind: "number",
    n: 3500,
    format: "comma",
    suffix: "+ MT",
    tail: "",
    label: "Moving through the network monthly",
  },
];

type AnchorCard = {
  kind: "anchor";
  imageSrc: string;
  imageAlt: string;
  title: string;
  body: string;
};

type TextCard = {
  kind: "text";
  title: string;
  body: string;
};

type BentoCard = AnchorCard | TextCard;

type BentoEntry = {
  card: BentoCard;
  span: string;
};

const BENTO: ReadonlyArray<BentoEntry> = [
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "anchor",
      imageSrc: CLAIM_01_IMAGE,
      imageAlt:
        "An isometric diagram of loads being dispatched from a Fashol hub to partner trucks across the network",
      title: "The load pipeline",
      body: "3,500+ MT of produce move through the network every month. Fashol's hub team dispatches these loads directly to partner fleets, no brokers, no commission off the top.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "anchor",
      imageSrc: CLAIM_02_IMAGE,
      imageAlt:
        "An isometric diagram of a truck loaded on both directions of its route, with upstream and downstream matched",
      title: "Return trips, not empty ones",
      body: "Fashol moves produce upstream from farms to hubs and downstream from hubs to buyers. Trucks loaded on the way out get matched on the way back. Both legs of the trip earn.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Loads visible across 50 districts",
      body: "See available work across the full Fashol network, not just the corridor you already know. Pick the routes that match your fleet.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Direct, not through a middleman",
      body: "Loads come from Fashol's hub team straight to you. What used to be broker commission stays with the truck.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Routes built around the hub network",
      body: "40+ hubs across 50 districts create natural corridors. Fashol matches your fleet to the routes that keep the kilometers efficient.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Steady work, by the month",
      body: "3,500+ MT moving every month needs trucks every day. Standing partnerships mean predictable utilization instead of chasing jobs job by job.",
    },
  },
];

type ProofTile = { figure: string; label: string };

const PROOF_STRIP: ReadonlyArray<ProofTile> = [
  { figure: "40+ hubs", label: "Of origin and destination" },
  { figure: "Direct dispatch", label: "No broker commission" },
];

type Step = {
  n: string;
  headline: string;
  tagline: string;
  body: string;
};

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    headline: "Fleet review.",
    tagline: "We look at what you run.",
    body: "Truck count, types, home corridor, cold-chain capability, driver availability. Map your fleet against the routes Fashol moves.",
  },
  {
    n: "02",
    headline: "Integration.",
    tagline: "The dispatch connects.",
    body: "Your fleet joins the Fashol load board. Upstream loads from Jogaan and downstream loads from Hyperfarm become visible to your dispatch.",
  },
  {
    n: "03",
    headline: "First cycle.",
    tagline: "Trips begin.",
    body: "Loads start routing through your trucks. Return trips get matched. The Fashol hub team coordinates pickup, delivery, and reconciliation.",
  },
  {
    n: "04",
    headline: "Standing partnership.",
    tagline: "The rhythm holds.",
    body: "Rate cards, volume forecasting, and seasonal planning happen together. Your fleet runs networked, not freelance.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Cold storage operators",
    description:
      "Cold storage facilities plugged into the Fashol network, with verified inbound bookings and outbound orders from the buyer side.",
    href: "/solutions/cold-storage-operators",
  },
  {
    name: "Commission agents",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and digital settlement.",
    href: "/solutions/commission-agents",
  },
  {
    name: "Wholesalers",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    href: "/solutions/wholesalers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function LogisticsPartnersPage() {
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
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
              alt="A truck in motion on a Bangladeshi highway carrying produce between hubs"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </Reveal>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{ backgroundColor: "var(--color-deep-green)" }}
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 z-10 tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,94,58,0.2), rgba(6,94,58,0.8))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(6,94,58,0.9) 0%, rgba(6,94,58,0.7) 45%, rgba(6,94,58,0.2) 70%, rgba(6,94,58,0) 100%)",
          }}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[44px] tablet:!text-[58px] desktop:!text-[72px]"
            >
              The loads were always there. Now so is the visibility.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px] !text-[rgba(255,251,234,0.82)]"
            >
              Fashol partners with small fleet owners across Bangladesh to route loads
              directly, match return trips, and keep trucks earning on both legs of
              every journey. No brokers. No empty returns. Just the network your truck
              was built for.
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
                          sessionKey={`lp-hero-stat-${i}`}
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
                  <dt
                    className="mt-2 uppercase !text-[rgba(255,251,234,0.7)]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.48} className="mt-8 tablet:mt-10">
              <Button variant="on-dark" href="/contact">
                Partner with Fashol
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (paper, two-column, no image, editorial closer) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The truck earns on one leg and loses on the other.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A truck owner in Bangladesh runs on margins the market has already
              thinned. Half the trips are empty returns - loaded with potato to Dhaka,
              deadheaded back to Rangpur. The loads come through brokers who take a
              commission off the top. The work is there, somewhere in the country, but
              you cannot see it from your home corridor. So the truck sits, or it runs
              at half capacity, or it goes out and comes back with nothing in the bed.
              Every kilometer unloaded is a kilometer paid for out of pocket.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 tablet:mt-20 max-w-[820px]">
          <Reveal>
            <p
              className="text-[28px] tablet:text-[36px] desktop:text-[40px] leading-[1.2]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
              }}
            >
              The fleet is there. The system that keeps it moving is not.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink, phrase variant) */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.08em"
            duration={1.2}
            className="!text-[var(--color-paper)] text-[48px] tablet:text-[72px] desktop:text-[96px] leading-[1.02]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            Full trip out. Full trip back.
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 4 - Signature claims bento (surface-deep) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              What a Fashol partnership keeps running.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Direct loads, matched returns, network-wide visibility, standing
              utilization. The difference between a truck that runs and a truck that
              earns on both legs.
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

        {/* Proof strip */}
        <div className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-10 border-t border-[var(--color-line)] pt-10 tablet:pt-12">
          {PROOF_STRIP.map((p) => (
            <Reveal key={p.figure} className="flex flex-col items-start">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-deep-green)",
                }}
              >
                {p.figure}
              </span>
              <span
                className="mt-2 uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: "var(--color-ink-muted)",
                }}
              >
                {p.label}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Editorial closing line */}
        <div className="mt-16 tablet:mt-20 max-w-[900px]">
          <Reveal>
            <p
              className="text-[28px] tablet:text-[36px] desktop:text-[44px] leading-[1.2]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
              }}
            >
              A truck that keeps moving is a truck that keeps earning.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 - Powered by (paper, 2-up) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The systems that route the trucks.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/jogaanlogo.png"
                alt="Jogaan"
                width={1000}
                height={248}
                sizes="256px"
                quality={95}
                className="h-10 tablet:h-12 w-auto object-contain self-start"
              />
              <p
                className="mt-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(18px, 1.8vw, 22px)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  color: "var(--color-deep-green)",
                }}
              >
                Loads from the farm side.
              </p>
              <p className="t-body mt-4">
                Farmers booking produce into Fashol hubs generate the upstream load.
                Jogaan handles registration, volume forecasting, and the dispatch to
                your fleet.
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/jogaan" className="link-arrow">
                  Open product page
                </Link>
              </div>
            </article>
          </Reveal>
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/images/content/hyperfarm-logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain self-start"
              />
              <p
                className="mt-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(18px, 1.8vw, 22px)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  color: "var(--color-deep-green)",
                }}
              >
                Loads from the buyer side.
              </p>
              <p className="t-body mt-4">
                Restaurants, supershops, and quick commerce place orders against hub
                inventory. Hyperfarm dispatches the downstream load - the return trip
                your truck was driving empty before.
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

      {/* Section 6 - Pull quote (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[900px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;I run three trucks on the Rangpur-Dhaka route. For years, we took
            potato down and came back empty. Brokers in the middle, always. Fashol
            loads us with potato from the hub, and when we drop it in Dhaka they have
            vegetables waiting for the return. Three trucks earning on both legs is a
            different business than three trucks earning on one.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Jahangir Alam
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.65)" }}
              >
                Small fleet operator, Rangpur-Dhaka corridor
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How the partnership starts (surface-deep, 4 step cards) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              How the partnership starts.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Partnership, not sign-up. A cycle of steps that sets the fleet up to run
              networked.
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
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.005em",
                    color: "var(--color-deep-green)",
                  }}
                >
                  {s.tagline}
                </p>
                <p className="t-body-sm mt-3">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mt-10 tablet:mt-12">
          <Button variant="primary" href="/contact">
            Partner with Fashol
          </Button>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles (paper, 3 related cards) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The rest of the chain runs on Fashol too.
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
// Bento card rendering. Anchor cards carry an illustration, title, and
// body. Text cards are title + body only. No eyebrow tags.
// ------------------------------------------------------------------

function BentoCardView({ card }: { card: BentoCard }) {
  if (card.kind === "anchor") return <AnchorCardView card={card} />;
  return <TextCardView card={card} />;
}

function AnchorCardView({ card }: { card: AnchorCard }) {
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
          fontSize: "clamp(24px, 2.6vw, 36px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {card.title}
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

function TextCardView({ card }: { card: TextCard }) {
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "280px" }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(20px, 1.9vw, 24px)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--color-deep-green)",
        }}
      >
        {card.title}
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

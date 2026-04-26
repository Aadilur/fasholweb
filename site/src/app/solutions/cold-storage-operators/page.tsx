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
  title: "Cold storage operators - Fashol",
  description:
    "Fashol partners with cold storage operators across Bangladesh to bring verified inbound bookings from 60,000 farmers and outbound orders from a buyer network of 7,000 mudi shops, 400+ restaurants, and 400+ supershop outlets. The facility stays yours. The traffic is what changes.",
};

const HERO_IMAGE_PATH = "/images/solutions/cold-storage-operators/hero.jpg";
const CLAIM_01_IMAGE = "/images/solutions/cold-storage-operators/claim-01.png";
const CLAIM_02_IMAGE = "/images/solutions/cold-storage-operators/claim-02.png";

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
    label: "Inbound farmer base",
  },
  {
    n: 7000,
    format: "comma",
    suffix: "+",
    tail: "",
    label: "Mudi shops, supershops, restaurants",
  },
  {
    n: 50,
    format: "plain",
    suffix: "",
    tail: "",
    label: "Districts of operation",
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
        "An isometric diagram of farmer nodes routing to a cold storage facility, organized by season and district",
      title: "The farmer pipeline",
      body: "60,000 farmers on the network need cold storage across the calendar. Fashol's hub team routes them to your facility, by crop and season, in your district.",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "anchor",
      imageSrc: CLAIM_02_IMAGE,
      imageAlt:
        "An isometric diagram of a cold storage facility with outbound orders flowing to retailers, restaurants, and supershops",
      title: "The buyer network",
      body: "7,000 mudi shops, 400+ restaurants, and 400+ supershop outlets place orders against what is in storage. Your outbound turns from cold calls into a ledger of buyers waiting.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Year-round, not just potato season",
      body: "Vegetables in summer, ginger and onion in winter, potato through spring. The calendar runs longer because the crop mix runs wider.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Bookings verified on the ledger",
      body: "Every reservation is confirmed through the Fashol platform before the sacks arrive. No held slots that do not show up.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Volume forecast on harvest data",
      body: "Fashol's hub team projects regional harvest weeks ahead and books against your capacity. You plan against real numbers, not phone calls.",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Payment and reconciliation through Fashol",
      body: "Orders clear through the platform, reconciled against your storage records. No chasing traders for settlement.",
    },
  },
];

type ProofTile = { figure: string; label: string };

const PROOF_STRIP: ReadonlyArray<ProofTile> = [
  { figure: "50 districts", label: "Of operational coverage" },
  { figure: "Full-cycle settlement", label: "Through the Fashol ledger" },
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
    headline: "Walk-through.",
    tagline: "We visit your facility.",
    body: "Understand your capacity, your current utilization rhythm, your crop mix. Map your district against our farmer base and buyer network.",
  },
  {
    n: "02",
    headline: "Integration.",
    tagline: "The ledger connects.",
    body: "Your booking system connects to the Fashol platform. Capacity becomes visible to our inbound pipeline. Inventory becomes visible to our buyer desk.",
  },
  {
    n: "03",
    headline: "First cycle.",
    tagline: "Traffic begins.",
    body: "Inbound farmers start routing through your facility. Outbound orders start pulling from your floor. The Fashol hub team handles grading, pickup, and reconciliation.",
  },
  {
    n: "04",
    headline: "Standing partnership.",
    tagline: "The rhythm holds.",
    body: "Pricing, volume forecasting, and seasonal planning happen together. You run a networked facility, not a rented one.",
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
      "Traditional arotdars on a modern stack, with transparent pricing and digital settlement on Banijjo.",
    href: "/solutions/commission-agents",
  },
  {
    name: "Wholesalers",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    href: "/solutions/wholesalers",
  },
  {
    name: "Farmers",
    description:
      "60,000 farmers on Jogaan, selling produce with transparent pricing, same-day settlement, and access to inputs and machinery.",
    href: "/solutions/farmers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function ColdStorageOperatorsPage() {
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
              alt="A row of cold storage warehouses at industrial scale in Bangladesh"
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

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[44px] tablet:!text-[58px] desktop:!text-[72px]"
            >
              Cold storage that sits inside the supply chain, not beside it.
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
                      sessionKey={`cso-hero-stat-${i}`}
                    />
                    {s.tail}
                  </dd>
                  <dt
                    className="mt-2 uppercase !text-[var(--color-paper)]"
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
              A building between two markets, integrated into neither.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              The cold storage in Bangladesh is full for three months and empty for nine.
              Potato comes in after harvest, goes out before the next one, and in between
              the facility sits with lights on and no traffic. Farmers book space and do
              not always deliver. Traders reserve slots and do not always pay. Rates are
              set by an association, and margins stay thin. All of it happens in isolation
              - no direct line to the farmers who need storage, no direct line to the
              buyers who need what is stored.
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
              The facility is built. The network around it is not.
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
            Booked inbound. Sold outbound.
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 4 - Signature claims bento (surface-deep) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              What a Fashol partnership brings through your door.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Two flows of traffic. Inbound from farmers, outbound to buyers. Underneath,
              a ledger that verifies bookings, forecasts volume, and clears payment across
              the cycle.
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
              Cold storage that sits inside the supply chain, not beside it.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 - Powered by (paper, 2-up) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The systems that route through your facility.
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
                Inbound from the farmer side.
              </p>
              <p className="t-body mt-4">
                Farmers booking storage through the Fashol hub route their harvest to
                your facility. Jogaan handles registration, volume forecasting, and
                booking verification.
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
                Outbound to the buyer side.
              </p>
              <p className="t-body mt-4">
                Fashol&apos;s buyer desk places orders against inventory in your cold
                room. Hyperfarm runs the order flow for restaurants, supershops, and
                quick commerce. Banijjo runs the wholesale side.
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
            &ldquo;We ran the cold storage for eighteen years. Full from February to
            May, empty the rest. Farmers would come with potato, and after potato
            moved out we would wait. Now Fashol sends us ginger farmers in October,
            onion in December, potato from February. And when it is time to sell,
            their buyers come to our door. It is not the same business anymore.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Shahidul Islam
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.65)" }}
              >
                Cold storage operator, Munshiganj
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
              Partnership, not sign-up. A cycle of steps that sets the facility up to
              run networked.
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
// body. Text cards are title + body only. No eyebrow tags, per the
// "less is more" rule.
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

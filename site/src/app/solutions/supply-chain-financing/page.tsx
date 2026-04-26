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
  LetterSpaceReveal,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Supply chain financing - Fashol",
  description:
    "Myfarm is Fashol's financing product, launching 2026. Built on six years of farm-level data. Working capital for farmers, inventory finance for trade, and portfolio tranches for banks, NBFIs, and impact funds.",
};

const HERO_IMAGE_PATH = "/images/solutions/supply-chain-financing/shero.jpg";
const LANE_FARMER_PATH = "/images/solutions/supply-chain-financing/lane-farmer.png";
const LANE_TRADE_PATH = "/images/solutions/supply-chain-financing/lane-trade.png";
const LANE_CAPITAL_PATH = "/images/solutions/supply-chain-financing/lane-capital.png";
const MYFARM_LOGO = "/myfarm.png";

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
    label: "Farmers on the network",
  },
  {
    kind: "number",
    n: 6,
    format: "plain",
    suffix: " years",
    tail: "",
    label: "Of verified transaction data",
  },
  {
    kind: "text",
    text: "2026",
    label: "Launch year",
  },
];

const LENDER_VIEW: ReadonlyArray<string> = [
  "A name on a loan application",
  "A photocopy of a NID",
  "A verbal statement of crop and acreage",
  "No record of past yields",
  "No record of past sales",
  "No record of past buyers",
  "A \"no\" on the application",
];

type FasholCard = { text: string; wide: boolean; emphasize?: boolean };

const FASHOL_VIEW: ReadonlyArray<FasholCard> = [
  { text: "Six years of harvest records", wide: true, emphasize: true },
  { text: "Every kilogram sold, every price paid", wide: false },
  { text: "Which buyers bought, how reliably", wide: false },
  { text: "Crop rotation pattern across seasons", wide: true },
  { text: "Seasonal cash flow signature", wide: false },
  { text: "Input purchase history", wide: false },
  { text: "A village network of 60,000 neighbors for reference", wide: true },
  { text: "Grade distribution across harvests", wide: false },
  { text: "A credit decision grounded in the actual farm", wide: false, emphasize: true },
];

type Lane = {
  eyebrow: string;
  tagline: string;
  paragraph: string;
  details: ReadonlyArray<string>;
  imagePath: string;
  imageAlt: string;
  withMyfarmMark?: boolean;
};

const LANES: ReadonlyArray<Lane> = [
  {
    eyebrow: "FARMERS",
    tagline: "Working capital for the season.",
    paragraph:
      "Access credit in the planting window, repay at harvest. Rates grounded in your own transaction history with Fashol, not in whether you own land. Priced in taka, released at the hub you already sell through.",
    details: [
      "Rates set by transaction history, not land ownership",
      "Released at the hub you already sell through",
      "Repay at harvest, in taka",
    ],
    imagePath: LANE_FARMER_PATH,
    imageAlt:
      "An isometric illustration of a farmer receiving credit at a Fashol hub, with seasonal flow from planting to harvest",
    withMyfarmMark: true,
  },
  {
    eyebrow: "TRADE",
    tagline: "Inventory and invoice financing.",
    paragraph:
      "For commission agents, wholesalers, and importers moving volume through the network. Finance the stock you carry between buy and sell. The collateral is the trade flow itself, verified on the Fashol ledger.",
    details: [
      "Collateral is the trade flow, verified on the Fashol ledger",
      "Available through Banijjo and Hyperfarm accounts",
      "Short-tenor, cycle-matched",
    ],
    imagePath: LANE_TRADE_PATH,
    imageAlt:
      "An isometric illustration of inventory moving through a wholesale ledger with finance flowing alongside",
  },
  {
    eyebrow: "CAPITAL PARTNERS",
    tagline: "Deploy into rural Bangladesh with real underwriting.",
    paragraph:
      "Banks, NBFIs, and impact funds can fund tranches of the Myfarm book. Every loan is backed by farm-level transaction data Fashol has been collecting since 2019. Performance reported monthly, with the underlying portfolio visible.",
    details: [
      "Six years of farm-level data backs every underwriting decision",
      "Tranches structured by season, district, or crop",
      "Monthly performance reporting with portfolio visibility",
    ],
    imagePath: LANE_CAPITAL_PATH,
    imageAlt:
      "An isometric illustration of a capital tranche being deployed across a portfolio of farms and districts",
  },
];

const TRACTION: ReadonlyArray<{ figure: string; label: string }> = [
  { figure: "60,000+", label: "farmers registered since 2019" },
  { figure: "6 years", label: "of continuous transaction data" },
  { figure: "50", label: "districts, 40+ hubs, 200+ wholesale markets" },
  { figure: "7,000+", label: "mudi shops served" },
  { figure: "400+", label: "restaurants including Domino's Pizza" },
  { figure: "400+", label: "supershop outlets" },
  { figure: "15,000+", label: "MT of food loss prevented" },
  { figure: "3,500+", label: "MT moving through the network monthly" },
];

type EarlyAccessCard = {
  eyebrow: string;
  title: string;
  body: string;
  linkLabel: string;
  linkHref: string;
};

const EARLY_ACCESS: ReadonlyArray<EarlyAccessCard> = [
  {
    eyebrow: "FOR FARMERS",
    title: "Register at your hub.",
    body: "Any farmer selling through a Fashol hub can register interest with the hub manager, or by WhatsApp at any collection point. You will be notified when Myfarm opens in your district.",
    linkLabel: "Find your nearest hub",
    linkHref: "/contact",
  },
  {
    eyebrow: "FOR TRADE",
    title: "Talk to the trade desk.",
    body: "Commission agents, wholesalers, and importers already working with Banijjo or Hyperfarm can request early access to trade finance through their Fashol account manager.",
    linkLabel: "Contact the trade desk",
    linkHref: "/contact",
  },
  {
    eyebrow: "FOR CAPITAL",
    title: "Meet the underwriting team.",
    body: "Banks, NBFIs, and funds evaluating the portfolio can request a data room and a session with the Myfarm credit team.",
    linkLabel: "capital@fashol.com",
    linkHref: "mailto:capital@fashol.com",
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
      "Fair pricing, 24-hour settlement, and a marketplace for inputs and machinery across 60,000 farmers on Jogaan.",
    href: "/solutions/farmers",
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
      "Traditional arotdars on a modern stack, with transparent pricing and digital settlement on Banijjo.",
    href: "/solutions/commission-agents",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default function SupplyChainFinancingPage() {
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay, farmers pattern) */}
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
              alt="A farmer's hand counting Bangladeshi taka at a Fashol hub, a moment of transaction"
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

        {/* Forest-green gradient overlay (responsive direction), matching farmers page. */}
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
          <div className="max-w-[680px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[48px] tablet:!text-[64px] desktop:!text-[80px]"
            >
              Capital where it has always been missing.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[560px] !text-[rgba(255,251,234,0.8)]"
            >
              Myfarm is Fashol&apos;s financing product, launching 2026. Built on six years
              of farm-level data. Designed for the farmers, traders, and capital partners
              the old system could not reach.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-start">
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
                          sessionKey={`scf-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
              <Button variant="on-dark" href="#early-access">
                Join the early access list
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (paper, copy-only, two-column with closing line) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              A credit system built for people the farm never had.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              The smallholder farmer in Bangladesh borrows at 10 to 15 percent a month from
              informal lenders, or does not borrow at all. The wholesale trader carries
              inventory on personal credit, one bad season from collapse. The commercial
              bank in Dhaka has capital to deploy, but no way to underwrite a grower 200
              kilometers away with no land title and no transaction history. Three sides
              of the same missing piece.
            </p>
          </Reveal>
        </div>

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
              Fashol built the supply chain for six years first. The financing comes next.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink, phrase variant with letter-spacing ease-in) */}
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
            Six years of data. One credit decision.
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 4 - Signature dual bento (surface-deep). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Same farmer. Two views.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              What a commercial lender sees when a smallholder applies for credit, set
              against what Fashol sees after six years of recording the same farmer&apos;s
              activity on the network.
            </p>
          </Reveal>
        </div>

        <UnderwritingDualBento />

        <div className="mt-16 tablet:mt-20 text-center">
          <Reveal>
            <p
              className="mx-auto max-w-[820px] text-[24px] tablet:text-[32px] desktop:text-[36px] leading-[1.2]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-deep-green)",
              }}
            >
              The risk was never the farmer. It was the absence of data about the farmer.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 - Three lanes (paper, signature visual weight) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Who Myfarm is for.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Three readers, three lanes. Each backed by the same underlying ledger of
              farm-level transactions Fashol has been building since 2019.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 desktop:grid-cols-3 gap-6 tablet:gap-8"
          stagger={0.1}
        >
          {LANES.map((lane) => (
            <StaggerItem key={lane.eyebrow} className="h-full" y={20}>
              <LaneCard lane={lane} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 6 - Proof of traction (surface-deep, data-forward) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The data did not start today.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Six years of recorded flow across the network. The ledger Fashol built to
              run the supply chain is the same ledger that underwrites Myfarm.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-3 tablet:gap-4"
          stagger={0.06}
        >
          {TRACTION.map((t) => (
            <StaggerItem key={`${t.figure}-${t.label}`} className="h-full" y={14}>
              <TractionTile figure={t.figure} label={t.label} />
            </StaggerItem>
          ))}
        </StaggerChildren>

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
              Six years of verified flow. That is the underwriting file.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - Statement (ink, attribution-neutral, letter-spacing ease-in) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[940px]">
          <LetterSpaceReveal
            as="p"
            startSpacing="0.08em"
            duration={0.9}
            className="!text-[var(--color-paper)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(22px, 3vw, 44px)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
            }}
          >
            For six years, Fashol has recorded what the farm does. Myfarm uses that record
            to finance what the farm needs. Launching 2026.
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 8 - Early access (surface-deep, three parallel cards) */}
      <Section tone="surface-deep" id="early-access">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Join the early access list.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Myfarm launches in 2026. Three ways to register interest now.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-3 gap-6">
          {EARLY_ACCESS.map((card) => (
            <Reveal key={card.eyebrow} className="h-full">
              <EarlyAccessTile card={card} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 9 - Other roles (paper, related cards) */}
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
// Section 4 - underwriting dual bento. Mirrors the commission-agents
// GenerationalBento pattern (left sparse/muted, right dense/lifted) but
// uses content specific to the underwriting comparison.
// ------------------------------------------------------------------

function UnderwritingDualBento() {
  return (
    <div className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-12">
      {/* Left column - sparse, flat. Cards sit back into the surface tone with
          a hairline border and loose vertical gap. No lift, no inner panel. */}
      <section aria-label="What a lender sees" className="flex flex-col">
        <Reveal>
          <span
            className="block uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.14em",
              color: "rgba(6, 94, 58, 0.45)",
            }}
          >
            What a lender sees
          </span>
        </Reveal>
        <StaggerChildren
          className="mt-8 flex flex-col gap-5 tablet:gap-6"
          stagger={0.05}
        >
          {LENDER_VIEW.map((line) => (
            <StaggerItem key={line} y={8}>
              <div
                className="rounded-lg px-5 py-4"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(6, 94, 58, 0.12)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: 1.5,
                  letterSpacing: "-0.005em",
                  color: "rgba(6, 94, 58, 0.5)",
                }}
              >
                {line}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Right column - dense, lifted, varied card sizes. Nested 2-col grid
          inside the column lets cards span the column or pair up two-across. */}
      <section aria-label="What Fashol sees" className="flex flex-col">
        <Reveal>
          <span
            className="block uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.14em",
              color: "var(--color-deep-green)",
            }}
          >
            What Fashol sees
          </span>
        </Reveal>
        <StaggerChildren
          className="mt-8 grid grid-cols-2 gap-3 tablet:gap-4 auto-rows-auto"
          stagger={0.05}
        >
          {FASHOL_VIEW.map((c) => (
            <StaggerItem
              key={c.text}
              y={12}
              className={c.wide ? "col-span-2" : ""}
            >
              <div
                className="h-full rounded-xl px-5 py-5 tablet:px-6 tablet:py-6 flex items-center"
                style={{
                  background: "var(--color-card-raised)",
                  border: "1px solid rgba(6, 94, 58, 0.15)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
                  fontFamily: "var(--font-display)",
                  fontWeight: c.emphasize ? 600 : 500,
                  fontSize: c.emphasize ? "18px" : "16px",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  color: "var(--color-deep-green)",
                  minHeight: c.emphasize ? "132px" : undefined,
                }}
              >
                {c.text}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------
// Section 5 - lane card with illustration header, eyebrow, italic
// tagline, body paragraph, and detail list.
// ------------------------------------------------------------------

function LaneCard({ lane }: { lane: Lane }) {
  const hasImage = publicFileExists(lane.imagePath);
  return (
    <article
      className="h-full flex flex-col rounded-[12px] p-8 tablet:p-10"
      style={{ backgroundColor: "var(--color-grain)", minHeight: "540px" }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "3 / 2" }}
      >
        {hasImage ? (
          <Image
            src={lane.imagePath}
            alt={lane.imageAlt}
            fill
            sizes="(min-width: 1200px) 360px, (min-width: 810px) 45vw, 100vw"
            className="object-contain"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 rounded-lg"
            style={{ background: "rgba(6, 94, 58, 0.05)" }}
          />
        )}
      </div>
      <span
        className="mt-6 uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "var(--color-ink-muted)",
        }}
      >
        {lane.eyebrow}
      </span>
      <p
        className="mt-3"
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
        {lane.tagline}
      </p>
      <p className="t-body-sm mt-4">{lane.paragraph}</p>
      <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--color-line)] pt-5">
        {lane.details.map((d) => (
          <li
            key={d}
            className="uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              lineHeight: 1.5,
              color: "var(--color-ink-muted)",
            }}
          >
            {d}
          </li>
        ))}
      </ul>
      {lane.withMyfarmMark && (
        <div className="mt-auto pt-6">
          <Image
            src={MYFARM_LOGO}
            alt="Myfarm"
            width={912}
            height={221}
            sizes="120px"
            className="h-6 w-auto object-contain object-left"
          />
        </div>
      )}
    </article>
  );
}

// ------------------------------------------------------------------
// Section 6 - traction stat tile. Splits the line at the first space
// so the number renders in Geist Mono and the label in body face.
// ------------------------------------------------------------------

function TractionTile({ figure, label }: { figure: string; label: string }) {
  return (
    <div
      className="h-full flex flex-col rounded-[8px] p-6"
      style={{ background: "var(--color-card-raised)" }}
    >
      <span
        className="t-tabular"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(26px, 2.6vw, 34px)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "var(--color-deep-green)",
        }}
      >
        {figure}
      </span>
      <span
        className="mt-3"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "14px",
          lineHeight: 1.45,
          color: "var(--color-ink-subtle)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ------------------------------------------------------------------
// Section 8 - early access card. Myfarm logo renders at top of the
// two product-adjacent cards (farmers, trade). Capital card stays
// logo-free since it addresses the platform-side audience.
// ------------------------------------------------------------------

function EarlyAccessTile({ card }: { card: EarlyAccessCard }) {
  return (
    <article
      className="h-full flex flex-col rounded-[12px] p-8 tablet:p-10"
      style={{ background: "var(--color-card-raised)", minHeight: "360px" }}
    >
      <span
        className="uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "var(--color-ink-muted)",
        }}
      >
        {card.eyebrow}
      </span>
      <h3
        className="mt-3"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(22px, 2.4vw, 28px)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--color-deep-green)",
        }}
      >
        {card.title}
      </h3>
      <p className="t-body-sm mt-4">{card.body}</p>
      <div className="mt-auto pt-6">
        <Link
          href={card.linkHref}
          className="inline-flex items-center text-[14px] font-medium text-[var(--color-deep-green)] hover:text-[var(--color-deep-green-pressed)] transition-colors"
        >
          {card.linkLabel}
        </Link>
      </div>
    </article>
  );
}

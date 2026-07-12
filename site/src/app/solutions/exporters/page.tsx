import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { Section, toneClass } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
  QuoteReveal,
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { JourneyStickyScroll } from "@/components/site/JourneyStickyScroll";

export const metadata: Metadata = {
  title: "Exporters - Fashol",
  description:
    "Source fresh produce from Bangladesh with 24-hour CNF pricing, packaging engineered for every destination, and compliance handled end to end. Fashol exports to the UK, Europe, the Middle East, and Southeast Asia.",
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
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    l: "Farmer network",
  },
  {
    kind: "number",
    n: 4,
    format: "plain",
    suffix: "",
    tail: "",
    l: "Regional corridors",
  },
  { kind: "text", text: "24/7", l: "Dedicated buyer desk" },
];

const REASONS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "Scale.",
    body: "60,000 registered farmers across nine operating districts, supplying 40-plus hubs and 200-plus wholesale markets. Any single RFQ can be matched against existing capacity without needing a new sourcing hunt.",
  },
  {
    n: "02",
    headline: "Reliability.",
    body: "Every order is assigned a dedicated Fashol export manager, tracked against a committed delivery window, and covered by a 24/7 buyer support desk. Delivery performance is published to the buyer, not hidden.",
  },
  {
    n: "03",
    headline: "Compliance.",
    body: "Fashol's compliance team handles destination-country phytosanitary and import documentation in-house. When a buyer requires HACCP, BRC, or GlobalGAP product, Fashol sources from pre-certified farmers and facilities already registered in the network.",
  },
  {
    n: "04",
    headline: "Cost that holds.",
    body: "Live pricing benchmarked against 200-plus wholesale markets, transparent CNF quotes within 24 hours, and packaging engineering that prevents the post-harvest loss that usually gets priced into other suppliers' margins.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Importers",
    description:
      "Bulk produce supply for import-focused distributors, with origin documentation and compliance handled upstream.",
    href: "/solutions/importers",
  },
  {
    name: "Wholesalers",
    description:
      "Direct sourcing for wholesale buyers moving high volumes into domestic and regional markets.",
    href: "/solutions/wholesalers",
  },
  {
    name: "Commission agents",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and settlement.",
    href: "/solutions/commission-agents",
  },
];

export default function ExportersPage() {
  return (
    <>
      {/* Section 1 - Hero - full-bleed photo with deep-green gradient overlay */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/shero3.jpg"
            alt="Stacked export shipping containers at a Chittagong port terminal"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-start px-6 tablet:pl-[7vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-[128px] desktop:pt-[144px]">
          <div className="max-w-[640px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Exporters.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-2 max-w-[560px]"
            >
              Fresh Bangladeshi produce, landed at retail across the UK, Europe, the Middle East,
              and Southeast Asia.
            </Reveal>
            <dl className="mt-[17px] tablet:mt-[25px] flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
              {HERO_STATS.map((s, i) => (
                <div key={s.l} className="flex flex-col items-start">
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
                          sessionKey={`exporters-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2">{s.l}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-[9px] tablet:mt-[17px]">
              <TalkToSalesButton />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - The problem */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Sourcing fresh produce out of Bangladesh has been a chain of handoffs.
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/images/solutions/exporters/i3.jpg"
                alt="A Bangladeshi wholesale market or container yard with produce handling"
                width={4026}
                height={3062}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A supermarket buyer in Manchester or Dubai placing a fresh produce order on Bangladesh
              has historically been working through layers of intermediaries. The farmer, the
              arotdar at the wholesale market, a consolidator, an exporter, a freight forwarder, a
              customs broker at the origin, another at the destination. Each handoff is a price
              margin added. Each handoff is also a quality risk, a documentation risk, and a
              timeline risk.
            </p>
            <p className="mt-5">
              Grading varies by whoever last touched the crate. Packaging is whatever was available.
              Export documentation gets put together at the last moment, often with errors that hold
              the shipment at customs. Cold chain breaks somewhere between the farm and the
              container yard and no one can tell you where. The produce that eventually lands at
              retail has lost days of shelf life and, often, a measurable share of the load.
            </p>
            <p className="mt-5">
              The buyer carries all of this risk, priced into a thin margin they already had no room
              to protect.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.06em"
            duration={1}
            className="whitespace-nowrap leading-[0.95] !text-[var(--color-paper)] text-[56px] tablet:text-[88px] desktop:text-[120px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            Up to{" "}
            <CountUp
              to={30}
              duration={1000}
              trigger="inview"
              inviewMargin="0px 0px -30% 0px"
              sessionKey="exporters-hinge-30"
            />
            %
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[680px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              The share of fresh produce lost globally during packaging and post-harvest
              handling. Fashol engineers packaging per product, per destination, per volume, and
              brings that loss down to single digits.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - The Journey (surface tone per rotation). */}
      <section className={toneClass["surface-deep"]}>
        <div className="container-page pt-20 tablet:pt-28 desktop:pt-32 pb-10 tablet:pb-12">
          <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
            <Reveal as="h2" className="t-h2 desktop:col-span-7">
              From RFQ to retail shelf, twelve operational stops under one roof.
            </Reveal>
            <Reveal delay={0.12} className="desktop:col-span-5 t-body-lg">
              <p>
                Most exporters can only account for the middle of the chain. Fashol runs the full
                arc - inquiry, sourcing, packaging, compliance, logistics, and post-delivery
                support - on a single platform, with a single accountable team.
              </p>
            </Reveal>
          </div>
        </div>
        <JourneyStickyScroll tone="surface-deep" />
      </section>

      {/* Section 5 - The four reasons (paper tone per rotation). */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Scale, reliability, compliance, and a cost structure that holds.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              These are the four things a regional retail buyer is actually trying to solve for when
              sourcing from Bangladesh. Fashol is built around each of them.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {REASONS.map((r) => (
            <StaggerItem key={r.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] p-8">
                <div
                  aria-hidden
                  className="w-[120px] h-[120px] bg-[var(--color-grain)]"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-6">
                  {r.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {r.headline}
                </h3>
                <p className="t-body-sm mt-3">{r.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 6 - Powered by (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The product behind this work.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 flex justify-center">
          <Reveal className="w-full max-w-[500px]">
            <article className="flex flex-col items-start text-left">
              <Image
                src="/hyperfarm%20logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain mix-blend-multiply"
              />
              <p className="t-body mt-6">
                The buyer&apos;s procurement desk. Export RFQs, quotes, shipment tracking,
                documentation, and post-delivery support on one platform.
              </p>
              <div className="mt-8">
                <Link href="/products/hyperfarm" className="link-arrow">
                  Open product page
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - Pull quote (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;We used to work with three separate exporters out of Bangladesh and still spent
            most of our quality team&apos;s time chasing paperwork. With Fashol, the documentation
            is on the portal before the shipment leaves Chittagong. Our compliance team stopped
            flagging Bangladesh origin last quarter. That tells me everything.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Rashid Mohammed
              </span>
              <span className="text-[12px] mt-1" style={{ color: "rgba(255,251,234,0.65)" }}>
                Director of Procurement, regional wholesale group, Dubai
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 8 - Other roles on the chain */}
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

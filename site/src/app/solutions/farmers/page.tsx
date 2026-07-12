import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Farmers - Fashol",
  description:
    "A fair price for every crop, 24-hour mobile money settlement, and a marketplace for inputs and machinery. Fashol serves 60,000-plus farmers across Bangladesh through the Jogaan platform.",
};

type HeroStat = {
  n: number;
  format: "comma" | "plain";
  suffix: string;
  tail: string;
  l: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  { n: 60000, format: "comma", suffix: "+", tail: "", l: "Registered farmers" },
  { n: 24, format: "plain", suffix: "", tail: " hr", l: "Settlement window" },
  { n: 200, format: "plain", suffix: "+", tail: "", l: "Wholesale markets benchmarked" },
];

const BENEFITS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
  img: string;
  imgAlt: string;
}> = [
  {
    n: "01",
    headline: "A fair price, benchmarked live.",
    body: "Jogaan shows the farmer the price Fashol is paying that morning, benchmarked against live data from 200-plus wholesale markets across Bangladesh. The farmer can check the price before they leave home. If the offered price is lower than the market, they wait. If it is higher, they sell.",
    img: "/images/farmer-value/value-01.png",
    imgAlt: "A farmer checking crop prices on a phone",
  },
  {
    n: "02",
    headline: "Payment in 24 hours, straight to bKash.",
    body: "Settlement lands in the farmer's mobile money wallet within 24 hours of weighing at the hub. No invoices, no follow-up trips, no middleman deductions. The receipt sits in the app, and the farmer can show it to anyone.",
    img: "/images/farmer-value/value-02.png",
    imgAlt: "A smartphone with coins flowing into it, representing instant payment",
  },
  {
    n: "03",
    headline: "A marketplace for seed, feed, and machinery.",
    body: "Jogaan hosts a marketplace for quality-verified agricultural inputs. Seed, pesticide, livestock feed, and farm machinery, all available at prices negotiated by Fashol on behalf of the network. Farmers order from the same app they use to sell their produce.",
    img: "/images/farmer-value/value-03.png",
    imgAlt: "A display of seed, feed, and farm machinery",
  },
  {
    n: "04",
    headline: "Financing, underwritten by the farmer's own record.",
    body: "Launching 2026, Fashol uses each farmer's transaction history on Jogaan to offer input loans and seasonal working capital, in partnership with banks. No collateral, no bank branch visits. The farmer's own sales record is the credit file.",
    img: "/images/farmer-value/value-04.png",
    imgAlt: "Hands cupping a growing plant with coins, representing financing",
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "A field agent visits the village.",
    body: "Fashol's field agent visits the farmer's village, confirms the farmer's crops, growing cycle, and volume, and helps register the farmer on Jogaan.",
  },
  {
    n: "02",
    headline: "Jogaan goes on the phone.",
    body: "The agent walks the farmer through installing Jogaan on their phone and sets up the farmer's bKash or other mobile money wallet for settlement. No bank account required.",
  },
  {
    n: "03",
    headline: "First harvest sold.",
    body: "On the next harvest day, the agent returns. The crop is weighed and graded at the farm gate, and the farmer sees the price on the app before the crop leaves. Payment lands in the wallet within 24 hours.",
  },
  {
    n: "04",
    headline: "The farmer runs it themselves.",
    body: "After the first few transactions, the farmer runs the process independently. The field agent stays available on WhatsApp, but Jogaan handles the weighing, pricing, payment, and record on its own.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Agri input suppliers",
    description:
      "Distribution into the Fashol farmer network for seed, feed, and pesticide companies.",
    href: "/solutions/agri-input-suppliers",
  },
  {
    name: "Agri machinery suppliers",
    description:
      "Marketplace access to farmer demand for tractors, tillers, and harvest equipment.",
    href: "/solutions/agri-machinery-suppliers",
  },
];

export default function FarmersPage() {
  return (
    <>
      {/* Section 1 - Hero - full-bleed photo with ink gradient + left-aligned overlay */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        {/* Layer 1 - Photo background */}
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/shero1.jpeg"
            alt="Bangladeshi farmers working in a rice paddy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Reveal>

        {/* Layer 2 - Deep-green overlay (responsive direction)
            rgba values = site's --color-deep-green (#065E3A) with varying alpha. */}
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

        {/* Layer 3 - Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[600px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Farmers.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[520px] !text-[rgba(255,251,234,0.75)]"
            >
              A fair price for every crop, payment in 24 hours, and a marketplace for everything
              that goes into the field.
            </Reveal>
            <dl className="mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
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
                    <CountUp
                      to={s.n}
                      format={s.format}
                      suffix={s.suffix}
                      duration={1200}
                      delay={i * 150}
                      sessionKey={`farmers-hero-stat-${i}`}
                    />
                    {s.tail}
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">{s.l}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
              <Button
                variant="on-dark"
                href="https://play.google.com/store/apps/details?id=com.fashol.agent"
                external
              >
                Sell with Fashol
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - The problem */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The chain was built against the farmer.
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/i1.jpeg"
                alt="A rural Bangladeshi farmer working in the traditional supply chain"
                width={5568}
                height={3712}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A Bangladeshi farmer has historically had one buyer - the mahajan who shows up at the
              farm gate, offers whatever price the day allows, and takes the crop at a discount
              against the next season&apos;s seed loan. The farmer does not know what the market
              paid for that crop in Dhaka that morning. The farmer has no receipt.
            </p>
            <p className="mt-5">
              Payment takes two weeks, sometimes four. Deductions appear on settlement day for
              transport, for handling, for losses that the farmer never saw happen. The farmer has
              no way to contest any of it. This is not unusual. This is how the chain has worked
              for as long as anyone remembers.
            </p>
            <p className="mt-5">
              Access to seed, pesticide, feed, and machinery runs through the same middlemen.
              Access to credit does not exist at all, unless the farmer signs away the next harvest.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink tone per rotation). */}
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
                to={20}
                duration={1500}
                trigger="inview"
                inviewMargin="0px 0px -30% 0px"
                sessionKey="farmers-hinge-20"
              />
              %
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="t-body-lg mt-6 tablet:mt-8 max-w-[600px] mx-auto"
              style={{ color: "rgba(255, 251, 234, 0.75)" }}
            >
              Price uplift for a Fashol farmer over what the traditional chain pays.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 4 - What Fashol does for farmers (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Fashol broke the chain and built a better one.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Every farmer registered on Jogaan gets four things the old chain could not offer
              them. This is the core of what we do on the supplier side.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {BENEFITS.map((b) => (
            <StaggerItem key={b.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--card-bg)] text-[var(--color-ink)] rounded-[4px] p-8">
                <Image
                  src={b.img}
                  alt={b.imgAlt}
                  width={120}
                  height={120}
                  sizes="120px"
                  className="w-[120px] h-[120px] object-contain"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-6">
                  {b.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {b.headline}
                </h3>
                <p className="t-body-sm mt-3">{b.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 5 - Powered by */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The product behind this work.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 max-w-[520px]">
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/jogaanlogo.png"
                alt="Jogaan"
                width={1000}
                height={248}
                sizes="400px"
                className="h-10 tablet:h-12 w-auto object-contain self-start"
              />
              <p className="t-body mt-6">
                The farmer&apos;s app. Price alerts, settlement, marketplace, and record.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.fashol.agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  Download on Google Play
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - In their words (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[640px]">
          <Reveal>
            <div className="mx-auto relative w-[64px] h-[64px] rounded-full overflow-hidden bg-[var(--color-grain)]">
              <Image
                src="/images/voices/voice-01.jpg"
                alt="Abdul Karim, farmer in Jessore"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote
              className="mt-6 tablet:mt-8 !text-[var(--color-paper)] text-[20px] tablet:text-[24px] desktop:text-[28px] leading-[1.45]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              &ldquo;Before Fashol, I used to take my cauliflower to the mahajan and accept
              whatever price he gave that morning. Now I see the price on my phone the night
              before. If it&apos;s not good, I wait a day.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-6 flex flex-col items-center">
              <span
                className="text-[14px] !text-[var(--color-paper)]"
                style={{ fontWeight: 500 }}
              >
                Abdul Karim
              </span>
              <span className="text-[12px] !text-[rgba(255,251,234,0.6)] mt-1">
                Farmer, Jessore
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Two weeks from first conversation to first sale.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Farmers onboard through Fashol&apos;s field agents, who handle registration,
              WhatsApp group enrollment, and the first few transactions together with the farmer.
              No paperwork required at the farmer&apos;s end.
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
            Contact Fashol to enroll your farming community
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Fashol serves the rest of the chain too.
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

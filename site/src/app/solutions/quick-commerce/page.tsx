import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  title: "Quick commerce - Fashol",
  description:
    "Fill rate above 95%, on-demand scale for surges, and wholesale pricing that holds. Fashol powers fresh produce supply for Foodpanda, Chaldal, and Foodie across Dhaka.",
};

type HeroStat = {
  value: string;
  label: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  { value: "Foodpanda. Chaldal. Foodie.", label: "Running on Fashol" },
  { value: "Thousands of SKUs", label: "Available daily, dark-store ready" },
  { value: "Same-day", label: "To every dark store in Dhaka" },
];

type PromiseCardData =
  | {
      kind: "illustration";
      imageSrc: string;
      imageAlt: string;
      statement: string;
      body: string;
      span: 1 | 2;
    }
  | {
      kind: "stat";
      display: string;
      body: string;
      span: 1 | 2;
    };

const PROMISE_IMAGES_READY: ReadonlySet<string> = new Set<string>([
  "/qc1.png",
  "/qc2.png",
  "/qc3.png",
]);

const PROMISES: ReadonlyArray<PromiseCardData> = [
  {
    kind: "illustration",
    imageSrc: "/qc1.png",
    imageAlt:
      "An isometric dark-store interior with shelves of fresh produce crates stocked in orderly rows",
    statement: "Fill rate that holds.",
    body: "Above 95% fill rate on fresh produce. Dark store inventory is planned against Fashol's confirmed daily supply, not against market hopes.",
    span: 2,
  },
  {
    kind: "illustration",
    imageSrc: "/qc2.png",
    imageAlt:
      "A line illustration of a bar chart with a tall lime-green peak and a person observing demand scaling up",
    statement: "Scale that matches demand.",
    body: "Weekend spikes, Ramadan surges, Eid demand. Fashol's 60,000-farmer network absorbs surges without price chaos or stockouts. Dark stores plan campaigns knowing supply will be there.",
    span: 2,
  },
  {
    kind: "stat",
    display: "5 AM to 10 PM",
    body: "Same-day cold-chain delivery windows to every dark store in Dhaka.",
    span: 1,
  },
  {
    kind: "illustration",
    imageSrc: "/qc3.png",
    imageAlt:
      "A line illustration of a price tag and pricing dashboard showing a flat stable line",
    statement: "Pricing that does not move mid-shift.",
    body: "Wholesale prices locked for the delivery window. A shopper sees Tk 60 per kg at 2 PM and pays Tk 60 at checkout. The platform does not absorb hidden spot-market shifts between order and fulfillment.",
    span: 2,
  },
  {
    kind: "stat",
    display: "1,000+",
    body: "SKUs across fresh produce categories, updated live on Hyperfarm.",
    span: 1,
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "Forecast shared.",
    body: "A Fashol q-commerce representative walks through the platform's current SKU list, daily volumes, peak patterns, and delivery windows per dark store. One call, usually under an hour.",
  },
  {
    n: "02",
    headline: "SKU mapping and pricing.",
    body: "Within hours, the platform's produce list is mapped to Hyperfarm SKUs with daily pricing locked for the delivery window. The platform approves the list before it goes live.",
  },
  {
    n: "03",
    headline: "First dark store live.",
    body: "The next morning, Fashol delivers to the first dark store. Fill rate, freshness, and delivery timing are tracked hourly for the first three days and tuned with the platform's ops team in real time.",
  },
  {
    n: "04",
    headline: "Full coverage.",
    body: "Remaining dark stores onboard over the following days using the first store's profile as the template. Fashol's trade team stays embedded for the first month to tune fill rate and SKU coverage across the full network.",
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
      "Supply partnerships for retail chains with consistent grading and dependable volumes.",
    href: "/solutions/supershops",
  },
  {
    name: "Wholesalers",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    href: "/solutions/wholesalers",
  },
];

export default function QuickCommercePage() {
  return (
    <>
      {/* Section 1 - Hero (photo, forest green gradient, content aligned left) */}
      <section
        className="relative min-h-[600px] h-[90vh] overflow-hidden"
        style={{ backgroundColor: "var(--color-deep-green)" }}
      >
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/qchero1.jpg"
            alt="A food delivery rider navigating Dhaka traffic on a motorbike"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px] tablet:whitespace-nowrap"
            >
              Quick commerce.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[560px] !text-[rgba(0,0,0,0.8)]"
            >
              Fill rate that holds, scale for festival surges, and wholesale prices that do not
              move mid-shift. Fashol keeps Dhaka&apos;s dark stores full, every order.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-start max-w-[240px]">
                  <Reveal
                    as="span"
                    delay={0.24 + i * 0.12}
                    duration={0.6}
                    y={0}
                    className="text-[18px] tablet:text-[20px] desktop:text-[22px] leading-[1.15] !text-[var(--color-ink)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </Reveal>
                  <Reveal
                    as="span"
                    delay={0.3 + i * 0.12}
                    duration={0.6}
                    y={0}
                    className="t-caption mt-2 !text-[rgba(0,0,0,0.7)]"
                  >
                    {s.label}
                  </Reveal>
                </div>
              ))}
            </dl>
            <Reveal delay={0.48} className="mt-8 tablet:mt-10">
              <TalkToSalesButton />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (paper, two-column, image below H2) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Fresh produce is where quick commerce fulfillment breaks.
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/qc4.jpg"
                alt="A dark-store operator checking fresh produce stock in Dhaka"
                width={1200}
                height={800}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A quick commerce platform promises one thing above all else: the customer&apos;s
              order will be fulfilled, fresh, within the delivery window. Packaged goods are the
              easy part. Fresh produce is where the model breaks. A shopper on Foodpanda or
              Chaldal sees tomatoes listed at 2 PM, places the order, and expects them at the
              door by 3. If the dark store&apos;s tomatoes ran out at noon, or arrived wilted at
              6 AM, or cost the platform 40 percent more than yesterday - the fill rate
              collapses, the customer experience collapses, and the platform&apos;s reputation
              takes the hit.
            </p>
            <p className="mt-5">
              The old supply for quick commerce depends on early-morning runs to the wholesale
              market, whatever a vendor showed up with, whatever the spot price was that morning.
              Dark stores plan a day&apos;s worth of inventory based on what they hope to get.
              Stockouts on popular SKUs happen every week. Price fluctuations mean either the
              platform absorbs the volatility or pushes it to the customer. Neither is
              sustainable.
            </p>
            <p className="mt-5">
              Quick commerce needs a supply partner that treats fresh produce like a warehouse
              SKU - predictable, priced, delivered.
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
              Above{" "}
              <CountUp
                to={95}
                duration={1000}
                trigger="inview"
                sessionKey="quick-commerce-hinge-95"
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
              Fill rate on fresh produce for quick commerce platforms running on Fashol. The
              number a dark store operator can plan around, not hope for.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Three promises bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="span" className="block t-eyebrow">
              WHAT FASHOL PROMISES A QUICK COMMERCE OPERATOR
            </Reveal>
            <Reveal as="h2" className="t-h2 mt-6">
              Three things the dark store can count on.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Fill rate, scale, and price stability. Every order Fashol fulfills for a quick
              commerce platform is optimized around these three, every day.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 min-[900px]:grid-cols-2 desktop:grid-cols-4 gap-5 [grid-auto-flow:dense]"
          stagger={0.08}
        >
          {PROMISES.map((p, i) => (
            <StaggerItem
              key={i}
              className={
                p.span === 2
                  ? "min-[900px]:col-span-2 desktop:col-span-2"
                  : "min-[900px]:col-span-1 desktop:col-span-1"
              }
              y={20}
            >
              <PromiseCard promise={p} />
            </StaggerItem>
          ))}
          {/* Card 6 - closing statement, full width */}
          <StaggerItem className="min-[900px]:col-span-2 desktop:col-span-4" y={20}>
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
                  fontSize: "clamp(28px, 3.6vw, 52px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  color: "var(--color-deep-green)",
                }}
              >
                Treated like a warehouse SKU. Priced like one. Delivered like one.
              </p>
            </article>
          </StaggerItem>
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
                The buyer procurement desk. Quick commerce operators use Hyperfarm to forecast
                demand, order daily, track fulfillment, and reconcile same-day settlement.
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
            &ldquo;I was managing seven fresh produce suppliers across eight dark stores and
            still spent my mornings explaining stockouts to category heads. Since moving to
            Fashol, I manage one. My team stopped tracking SKU-level stockouts in the daily
            stand-up because there were not enough of them to report.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Nabila Rahman
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                Category Manager, Fresh Produce, Foodpanda Bangladesh
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
              Twenty-four hours from forecast shared to first dark-store delivery.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Quick commerce platforms run on data and SLAs, not handshakes. Fashol&apos;s
              q-commerce desk onboards in one day. Share your forecast in the morning, map SKUs
              to Hyperfarm pricing by afternoon, and receive your first dark-store delivery the
              next morning. Fashol&apos;s trade team stays embedded for the first month to tune
              fill rate and SKU coverage.
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
            Talk to Fashol&apos;s quick commerce team
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

function PromiseCard({ promise }: { promise: PromiseCardData }) {
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{
        backgroundColor: "var(--card-bg)",
        minHeight: "320px",
      }}
    >
      {promise.kind === "illustration" ? (
        <PromiseIllustrationContent promise={promise} />
      ) : (
        <PromiseStatContent promise={promise} />
      )}
    </article>
  );
}

function PromiseIllustrationContent({
  promise,
}: {
  promise: Extract<PromiseCardData, { kind: "illustration" }>;
}) {
  const imageReady = PROMISE_IMAGES_READY.has(promise.imageSrc);

  return (
    <>
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
              src={promise.imageSrc}
              alt={promise.imageAlt}
              fill
              sizes="(min-width: 1200px) 520px, (min-width: 900px) 45vw, 100vw"
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
          fontSize: "clamp(26px, 2.8vw, 38px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {promise.statement}
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
        {promise.body}
      </p>
    </>
  );
}

function PromiseStatContent({
  promise,
}: {
  promise: Extract<PromiseCardData, { kind: "stat" }>;
}) {
  return (
    <>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 2.8vw, 38px)",
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {promise.display}
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
        {promise.body}
      </p>
    </>
  );
}

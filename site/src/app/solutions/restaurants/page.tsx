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
  title: "Restaurants - Fashol",
  description:
    "Fresh produce at your kitchen door before morning service. Fashol serves 400-plus restaurants in Dhaka, including Domino's Pizza, with next-day delivery between 5 and 11 AM.",
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
    n: 400,
    format: "plain",
    suffix: "+",
    tail: "",
    l: "Restaurants including Domino's",
  },
  { kind: "text", text: "5AM", l: "Morning delivery starts" },
  { kind: "text", text: "Dhaka", l: "Every corner, every day" },
];

const BENEFITS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "Fixed prices, no haggling.",
    body: "Every SKU on Hyperfarm has a published daily price. No negotiation, no kickback, no \u201Cspecial rate\u201D that changes by who is asking. The owner sees the same price the procurement manager sees, and both pay the same thing.",
  },
  {
    n: "02",
    headline: "Grading applied at the hub, not at the kitchen.",
    body: "Produce is graded four tiers at Fashol's hub before it ever leaves for delivery. A restaurant orders Grade A cauliflower and gets Grade A cauliflower. No sorting, no rejection, no 6 AM disputes at the back door.",
  },
  {
    n: "03",
    headline: "One supplier instead of ten.",
    body: "A restaurant running on Fashol replaces the usual roster of ten-plus vegetable, fish, meat, dairy, and spice suppliers with one invoice, one delivery window, one point of contact. Chains consolidate across branches.",
  },
  {
    n: "04",
    headline: "The owner sees everything.",
    body: "Every order, every price, every grade, every delivery, logged and visible on the Hyperfarm dashboard. The owner plans the next day's procurement from a phone, not from a back-office receipt pile.",
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "Sign up on Hyperfarm.",
    body: "Create a Hyperfarm account from the app or web. Fashol's restaurant team reaches out within the hour to confirm your location and volume.",
  },
  {
    n: "02",
    headline: "Map your produce list.",
    body: "A quick call with the restaurant team to match your regular produce list to Hyperfarm SKUs. Pricing is live and transparent. You approve the list before it goes active.",
  },
  {
    n: "03",
    headline: "Place your first order.",
    body: "Order from the app anytime before 10 PM. Choose your preferred delivery window between 5 and 11 AM.",
  },
  {
    n: "04",
    headline: "Receive by morning.",
    body: "Fashol's cold-chain fleet delivers to your kitchen the next morning. Graded, priced as quoted, invoiced in-app.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Supershops",
    description:
      "Supply partnerships for retail chains, with consistent grading and dependable volumes.",
    href: "/solutions/supershops",
  },
  {
    name: "Quick commerce",
    description:
      "Real-time stock visibility and daily pricing with cold-chain fulfillment to distribution centers.",
    href: "/solutions/quick-commerce",
  },
  {
    name: "Commission agents",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and settlement.",
    href: "/solutions/commission-agents",
  },
];

export default function RestaurantsPage() {
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
            src="/images/solutions/restaurants/shero2.jpg"
            alt="A restaurant kitchen in Dhaka preparing fresh produce for morning service"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Reveal>

        {/* Layer 2a - Dark ink wash underneath pink, lifts text contrast
            on the left without muddying the pink color itself. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[5] tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(19,19,19,0) 0%, rgba(19,19,19,0.45) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[5] hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(19,19,19,0.5) 0%, rgba(19,19,19,0.35) 30%, rgba(19,19,19,0) 60%)",
          }}
        />

        {/* Layer 2b - Pink overlay (responsive direction). rgba = #fe0186. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(254,1,134,0.2), rgba(254,1,134,0.8))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(254,1,134,0.9) 0%, rgba(254,1,134,0.7) 45%, rgba(254,1,134,0.2) 70%, rgba(254,1,134,0) 100%)",
          }}
        />

        {/* Layer 3 - Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[600px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Restaurants.
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[520px] !text-[rgba(255,251,234,0.75)]"
            >
              Fresh produce at your kitchen door before morning service, ordered the night before.
              No more 4 AM runs to Karwan Bazar, no more haggling.
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
                    {s.kind === "number" ? (
                      <>
                        <CountUp
                          to={s.n}
                          format={s.format}
                          suffix={s.suffix}
                          duration={1200}
                          delay={i * 150}
                          sessionKey={`restaurants-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">{s.l}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
              <Button variant="on-dark" href="/contact">
                Talk to the restaurant team
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
              You run the kitchen. We run procurement.
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/i2.webp"
                alt="A Dhaka restaurant kitchen team during morning service"
                width={1600}
                height={1627}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
              <p className="mt-2 text-[10px] tracking-[0.02em] !text-[var(--color-ink-muted)]">
                Photo:{" "}
                <a
                  href="https://www.tbsnews.net/features/pursuit/cook-your-career-perfection-chef-788626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:!text-[var(--color-ink)]"
                >
                  The Business Standard
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Running a restaurant in Dhaka has meant running a procurement operation on the side.
              An owner hires a procurement manager, who hires runners, who drive to Karwan Bazar at
              4 AM to haggle over the day&apos;s prices with aratdars who do not post rates. By the
              time the produce reaches the kitchen, no one on the owner&apos;s side can tell you
              what any of it actually cost, or why this week&apos;s price is different from last
              week&apos;s.
            </p>
            <p className="mt-5">
              Quality is the other half of the problem. Walk-in vendors send what they have, not
              what you asked for. Grade A and grade B sit in the same crate. A kitchen ordering
              consistent produce for consistent dishes is, in practice, rarely getting it. And the
              owner is managing ten or more separate suppliers for a single restaurant, each with
              their own invoicing, their own credit terms, their own excuses when deliveries slip.
            </p>
            <p className="mt-5">
              Multiply that by a chain, and the problem scales past what any manager can see.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (sage tone with dotted texture) */}
      <section
        className="py-[56px] tablet:py-[72px] desktop:py-[96px]"
        style={{
          backgroundColor: "#D4DDC5",
          backgroundImage:
            "radial-gradient(circle, #B8C4A5 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
        }}
      >
        <div className="container-page">
          <div className="mx-auto text-center">
            <Reveal>
              <div
                className="whitespace-nowrap leading-[0.95] !text-[var(--color-deep-green)] text-[56px] tablet:text-[88px] desktop:text-[120px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                }}
              >
                <CountUp
                  to={8}
                  duration={1500}
                  trigger="inview"
                  inviewMargin="0px 0px -30% 0px"
                  sessionKey="restaurants-hinge-8"
                />{" "}
                days a week
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="t-body-lg mt-6 tablet:mt-8 max-w-[600px] mx-auto"
                style={{ color: "rgba(6, 94, 58, 0.75)" }}
              >
                A procurement team spends roughly one full workday per week on the wholesale market
                run. Fashol gives that day back.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 4 - What Fashol does for restaurants */}
      <Section tone="surface">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Hyperfarm replaces the procurement desk.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              A restaurant on Hyperfarm orders the night before and receives cold-chain fresh
              produce between 5 AM and 11 AM, graded, priced transparently, delivered to every
              corner of Dhaka. Thousands of SKUs from a single platform. Same pricing for everyone.
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {BENEFITS.map((b) => (
            <StaggerItem key={b.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] p-8">
                <div
                  aria-hidden
                  className="w-[120px] h-[120px] bg-[var(--color-grain)]"
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

      {/* Section 5 - Powered by (single card, centered) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              The product behind this work.
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/hyperfarm%20logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain self-start mix-blend-multiply"
              />
              <p className="t-body mt-6">
                The buyer&apos;s procurement desk. Order, grade, cold-chain fulfillment, and
                settlement on one platform.
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

      {/* Section 6 - In their words - orange dotted hinge, no avatar */}
      <section
        className="py-[56px] tablet:py-[72px] desktop:py-[96px]"
        style={{
          backgroundColor: "#FFE0C4",
          backgroundImage:
            "radial-gradient(circle, #FFAF85 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
        }}
      >
        <div className="container-page">
          <div className="mx-auto text-center max-w-[640px]">
            <Reveal>
              <blockquote
                className="!text-[var(--color-ink)] text-[20px] tablet:text-[24px] desktop:text-[28px] leading-[1.45]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                &ldquo;We used to send two runners to Karwan Bazar every morning at 4 AM. We stopped
                the morning run six months ago. Now I check one dashboard before bed and the produce
                is at the kitchen by 7 AM. My head chef does not even come in for receiving
                anymore.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.16}>
              <figcaption className="mt-6 flex flex-col items-center">
                <span
                  className="text-[14px] !text-[var(--color-ink)]"
                  style={{ fontWeight: 500 }}
                >
                  Tanvir Ahmed
                </span>
                <span className="text-[12px] !text-[rgba(19,19,19,0.6)] mt-1">
                  Chef-Owner, six-branch restaurant group, Dhaka
                </span>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 7 - How it starts */}
      <Section tone="surface">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              24 Hours from sign up to the first kitchen delivery.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Restaurants do not need a rollout plan or a pilot period. Sign up on Hyperfarm, map
              your produce list with Fashol&apos;s restaurant team, place your first order by 10
              PM, and receive it by the next morning. The entire process, from first conversation
              to first delivery, takes one day.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-paper)] rounded-[4px] p-6 tablet:p-8">
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
            Talk to Fashol&apos;s restaurant team
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain */}
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

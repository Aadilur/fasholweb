import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { GenerationalBento } from "@/components/site/GenerationalBento";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  QuoteReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Commission agents - Fashol",
  description:
    "The arot your father built, the tools your generation needs to extend it. Fashol gives second-generation arotdars live pricing, same-day settlement, digital ledgers, and access to modern downstream buyers across Bangladesh.",
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
    n: 200,
    format: "plain",
    suffix: "+",
    tail: "",
    l: "Arotdars on Fashol",
  },
  {
    kind: "number",
    n: 50,
    format: "plain",
    suffix: " districts",
    tail: "",
    l: "Active across Bangladesh",
  },
  { kind: "text", text: "Same day", l: "Settlement on every transaction" },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  body: string;
}> = [
  {
    n: "01",
    headline: "The conversation.",
    body: "A Fashol trade representative sits with the arotdar to understand the arot's history, current book, regular farmers, and downstream buyers. No changes to the existing trade.",
  },
  {
    n: "02",
    headline: "Fashol account live.",
    body: "Within 24 hours, the arot's regular farmers are added to the Fashol platform. Downstream buyers - restaurants, supershops, wholesale partners - are mapped in if they are not already on Hyperfarm.",
  },
  {
    n: "03",
    headline: "First transactions.",
    body: "On day three, the first transactions flow through Fashol with live pricing, digital settlement, and grading at the hub. The paper ledger continues in parallel for the first week.",
  },
  {
    n: "04",
    headline: "Paper becomes backup.",
    body: "By the end of the first week, Fashol handles the primary record. The paper ledger stays for any transactions outside the platform - personal arrangements, long-standing relationships - but the bulk of the arot runs digitally.",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  description: string;
  href: string;
}> = [
  {
    name: "Wholesalers",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    href: "/solutions/wholesalers",
  },
  {
    name: "Importers",
    description:
      "Bulk produce supply for import-focused distributors, with origin documentation handled upstream.",
    href: "/solutions/importers",
  },
  {
    name: "Exporters",
    description:
      "End-to-end export corridors to the UK, Europe, the Middle East, and Southeast Asia.",
    href: "/solutions/exporters",
  },
];

export default function CommissionAgentsPage() {
  return (
    <>
      {/* Section 1 - Hero (photo, no overlay) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/cahero.jpg"
            alt="An older arotdar and his son with a phone or ledger at a Bangladeshi wholesale market"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[640px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              Commission agents.
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
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
                          sessionKey={`commission-agents-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2 !text-[var(--color-ink)]">
                    {s.l}
                  </dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
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
              The arot has not changed. The trade around it has.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              For generations, the arotdar has been the center of how produce moves in
              Bangladesh. The farmer brings the crop. The arotdar finds the buyer,
              sets the price by the day, and takes a commission. Settlement happens
              when it happens. Ledger entries are written in pen, in books that go
              back decades. Trust is built one season at a time, one farmer at a time,
              one buyer at a time. It works because everyone in the arot knows
              everyone else.
            </p>
            <p className="mt-5">
              The trade around the arot has changed. Buyers expect price transparency
              before they place an order. Farmers expect to be paid the same day they
              deliver. Restaurants and quick commerce platforms expect grading,
              packaging, and digital receipts. Modern wholesale buyers compare prices
              across districts before they commit. The arotdar who is still working
              with a paper ledger and weekly settlement is losing the trade his father
              held - not because the trade has moved on from him, but because the
              tools have.
            </p>
            <p className="mt-5">
              A young arotdar taking over the family business does not need to abandon
              the arot. He needs to bring the arot up to speed.
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
              Up to{" "}
              <CountUp
                to={4}
                duration={1000}
                trigger="inview"
                sessionKey="commission-agents-hinge-4x"
              />
              x
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
              The volume a young arotdar typically moves on Fashol compared to the
              old paper-and-handshake setup. Same arot, same family relationships,
              same place at the market - now with a platform that handles pricing,
              settlement, and downstream buyers.
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Dual bento comparison (paper, signature) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="span" className="block t-eyebrow">
              WITH AND WITHOUT FASHOL
            </Reveal>
            <Reveal as="h2" className="t-h2 mt-6">
              The same arot. The same trade. Two outcomes.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Below is a side-by-side look at the same six operational dimensions of
              running an arot - first as it works without Fashol, then as it works
              once Fashol is plugged in.
            </p>
          </Reveal>
        </div>

        <GenerationalBento />
      </Section>

      {/* Section 6 - Pull quote (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;My father built this arot in 1987. He knew every farmer who walked
            in by name, and every buyer who called. I took over four years ago and I
            was losing volume - the buyers I grew up with were going to younger
            arotdars who could send a price by WhatsApp before noon. Fashol did not
            replace what my father built. It gave me a way to keep building it.&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                Imran Hossain
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.65)" }}
              >
                Arotdar, second generation, Karwan Bazar, Dhaka
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              Forty-eight hours from first conversation to running on Fashol.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              Arotdars are not onboarded overnight, but they do not need a long
              rollout either. Day one is a conversation - the arot&rsquo;s history,
              the existing book, the family relationships. Day two is a Fashol
              account live with the arot&rsquo;s regular farmers and buyers mapped in.
              By day three the first transactions are flowing through Fashol
              alongside the paper ledger. By the end of the first week, the paper
              ledger becomes the backup, not the primary record.
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
            Talk to Fashol&rsquo;s trade team
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

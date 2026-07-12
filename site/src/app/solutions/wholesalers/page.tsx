import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { ComparisonBento } from "@/components/site/ComparisonBento";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  QuoteReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "Wholesalers - Fashol",
  description:
    "A modern supply stack behind your existing wholesale trading business. Consistent volumes, cold-chain fulfillment, transparent pricing, same-day settlement. Fashol serves wholesale traders across 50 districts in Bangladesh.",
};

type HeroStat =
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      tail: string;
      l: string;
      lBn: string;
    }
  | {
      kind: "text";
      text: string;
      textBn: string;
      l: string;
      lBn: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "number",
    n: 500,
    format: "plain",
    suffix: "+ MT",
    tail: "",
    l: "Daily cold-chain capacity",
    lBn: "দৈনিক কোল্ড-চেইন সক্ষমতা",
  },
  {
    kind: "text",
    text: "Same day",
    textBn: "একই দিনে",
    l: "Settlement on delivered volume",
    lBn: "সরবরাহকৃত পরিমাণে সেটেলমেন্ট",
  },
  {
    kind: "text",
    text: "50 districts",
    textBn: "50 জেলা",
    l: "Origin reach across Bangladesh",
    lBn: "বাংলাদেশজুড়ে উৎসের নাগাল",
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  headlineBn: string;
  body: string;
  bodyBn: string;
}> = [
  {
    n: "01",
    headline: "First conversation.",
    headlineBn: "প্রথম আলাপ।",
    body: "A Fashol wholesale representative walks through the trader's typical book - crops, volumes, downstream customers, current supply pattern. One phone call, sometimes a market-side visit.",
    bodyBn: "একজন ফসল পাইকারি প্রতিনিধি ব্যবসায়ীর সাধারণ কারবার ঘুরে দেখেন-ফসল, পরিমাণ, ডাউনস্ট্রিম বায়ার, বর্তমান সরবরাহের ধরন। একটি ফোন কল, কখনো বাজারে গিয়ে সরেজমিন।",
  },
  {
    n: "02",
    headline: "SKU and volume mapping.",
    headlineBn: "SKU ও পরিমাণ ম্যাপিং।",
    body: "Within 24 hours, the trade team maps the trader's regular book to Fashol SKUs with live pricing. Downstream customers on Hyperfarm are flagged for coordinated supply.",
    bodyBn: "24 ঘণ্টার মধ্যে ট্রেড টিম ব্যবসায়ীর নিয়মিত কারবারকে লাইভ দামসহ ফসল SKU-এর সঙ্গে ম্যাপ করে। হাইপারফার্মে থাকা ডাউনস্ট্রিম বায়ারদের সমন্বিত সরবরাহের জন্য চিহ্নিত করা হয়।",
  },
  {
    n: "03",
    headline: "First wholesale delivery.",
    headlineBn: "প্রথম পাইকারি ডেলিভারি।",
    body: "Within 72 hours of the first conversation, Fashol runs the first wholesale load at the trader's stall. Cold-chain fulfillment, graded at origin, settled same-day.",
    bodyBn: "প্রথম আলাপের 72 ঘণ্টার মধ্যে ফসল ব্যবসায়ীর দোকানে প্রথম পাইকারি চালান পৌঁছে দেয়। কোল্ড-চেইন ফুলফিলমেন্ট, উৎসেই গ্রেড করা, একই দিনে সেটেলমেন্ট।",
  },
  {
    n: "04",
    headline: "The book scales.",
    headlineBn: "কারবার বড় হয়।",
    body: "From week two onward, volume scales with the trader's downstream demand. Fashol's trade team stays embedded for the first month to tune pricing, grading preferences, and settlement cadence.",
    bodyBn: "দ্বিতীয় সপ্তাহ থেকে ব্যবসায়ীর ডাউনস্ট্রিম চাহিদার সঙ্গে পরিমাণ বাড়তে থাকে। দাম, গ্রেডিংয়ের পছন্দ ও সেটেলমেন্টের ছন্দ ঠিক করতে ফসলের ট্রেড টিম প্রথম মাসজুড়ে পাশে থাকে।",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  href: string;
}> = [
  {
    name: "Commission agents",
    nameBn: "কমিশন এজেন্ট",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and settlement.",
    descriptionBn:
      "আধুনিক ব্যবস্থায় পরিচালিত ঐতিহ্যবাহী আড়তদার, স্বচ্ছ দাম ও সেটেলমেন্টসহ।",
    href: "/solutions/commission-agents",
  },
  {
    name: "Importers",
    nameBn: "ইমপোর্টার",
    description:
      "Bulk produce supply for import-focused distributors, with origin documentation handled upstream.",
    descriptionBn:
      "আমদানি-কেন্দ্রিক পরিবেশকদের জন্য বাল্ক ফসল সরবরাহ, উৎসের ডকুমেন্টেশন আগেভাগেই সামলানো।",
    href: "/solutions/importers",
  },
  {
    name: "Exporters",
    nameBn: "এক্সপোর্টার",
    description:
      "End-to-end export corridors to the UK, Europe, the Middle East, and Southeast Asia.",
    descriptionBn:
      "যুক্তরাজ্য, ইউরোপ, মধ্যপ্রাচ্য ও দক্ষিণ-পূর্ব এশিয়ার জন্য শুরু থেকে শেষ পর্যন্ত এক্সপোর্ট করিডোর।",
    href: "/solutions/exporters",
  },
];

export default async function WholesalersPage() {
  const lang = await getLang();
  return (
    <>
      {/* Section 1 - Hero (photo + forest gradient, height + padding match Farmers) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/shero5.jpg"
            alt="An aerial view of a wholesale produce market in Bangladesh at dawn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        {/* Brand orange gradient: tighter coverage so the photo reads through.
            Desktop wash fades out before mid-width; mobile keeps only a bottom
            scrim for the stat column. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,103,64,0) 0%, rgba(255,103,64,0.1) 40%, rgba(255,103,64,0.65) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(255,103,64,0.75) 0%, rgba(255,103,64,0.45) 25%, rgba(255,103,64,0.1) 45%, rgba(255,103,64,0) 55%)",
          }}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[640px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Wholesalers.", "পাইকার।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[560px] !text-[rgba(255,251,234,0.75)]"
            >
              {t(
                lang,
                "A modern supply stack behind your existing trading business. Consistent volumes, cold-chain fulfillment, transparent pricing, and same-day settlement. Plug Fashol into the trade you already run.",
                "আপনার চালু ব্যবসার পেছনে একটি আধুনিক সাপ্লাই স্ট্যাক। ধারাবাহিক পরিমাণ, কোল্ড-চেইন ফুলফিলমেন্ট, স্বচ্ছ দাম, আর একই দিনে সেটেলমেন্ট। আপনি যে কারবার এখনই চালাচ্ছেন, তাতেই ফসলকে যুক্ত করুন।"
              )}
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
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
                          sessionKey={`wholesalers-hero-stat-${i}`}
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
                        {t(lang, s.text, s.textBn)}
                      </Reveal>
                    )}
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">
                    {t(lang, s.l, s.lBn)}
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

      {/* Section 2 - The problem (paper, two-column, NO image) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "The wholesale business has hit the ceiling of the old chain.",
                "পাইকারি ব্যবসা পুরনো শৃঙ্খলের সর্বোচ্চ সীমায় এসে ঠেকেছে।"
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A trader at Karwan Bazar or any city market spends years building relationships - which aratdars to trust, which districts deliver, which farmers bring Grade A. Volume moves because the trader works the phone from 3 AM. The business scales with the trader's hours, not a system.",
                "কারওয়ান বাজার কিংবা যেকোনো শহুরে বাজারের একজন ব্যবসায়ী বছরের পর বছর সম্পর্ক গড়েন-কোন আড়তদারকে বিশ্বাস করা যায়, কোন জেলা ঠিকঠাক দেয়, কোন কৃষক গ্রেড এ আনে। পরিমাণ নড়ে কারণ ব্যবসায়ী ভোর 3টা থেকে ফোন সামলান। ব্যবসা বড় হয় ব্যবসায়ীর শ্রমঘণ্টার সঙ্গে, কোনো ব্যবস্থার সঙ্গে নয়।"
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "That model caps out. A trader manages maybe 50 origin relationships. One district's bad weather breaks the week's supply. A 40-ton order on two days' notice risks the rest of the book. Credit is whatever the trader can float, and grading is a guess, so disputes happen downstream.",
                "এই মডেলের একটা সীমা আছে। একজন ব্যবসায়ী বড়জোর 50টি উৎস-সম্পর্ক সামলাতে পারেন। একটি জেলার খারাপ আবহাওয়া গোটা সপ্তাহের সরবরাহ ভেঙে দেয়। দুই দিনের নোটিশে 40 টনের একটি অর্ডার বাকি কারবারকেই ঝুঁকিতে ফেলে। ঋণ বলতে ব্যবসায়ী যতটুকু জোগাড় করতে পারেন, আর গ্রেডিং একরকম অনুমান-তাই বিরোধ বাধে ডাউনস্ট্রিমে।"
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The trader is not the problem. The infrastructure behind the trader is.",
                "ব্যবসায়ী সমস্যা নন। সমস্যা ব্যবসায়ীর পেছনের ইনফ্রাস্ট্রাকচার।"
              )}
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
              {t(lang, "Up to", "")}{lang === "bn" ? "" : " "}
              <CountUp
                to={3}
                duration={1000}
                trigger="inview"
                sessionKey="wholesalers-hinge-3x"
              />
              {t(lang, "x", "x পর্যন্ত")}
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
              {t(
                lang,
                "The volume a wholesale trader typically moves after plugging into Fashol's sourcing and settlement stack. Same trader, same relationships, same market stall - now with a supply chain that does not cap at the trader's personal capacity.",
                "ফসলের সোর্সিং ও সেটেলমেন্ট কাঠামোয় যুক্ত হওয়ার পর একজন পাইকারি ব্যবসায়ী সাধারণত যে পরিমাণ প্রোডাক্ট সরান। একই ব্যবসায়ী, একই সম্পর্ক, একই বাজারের দোকান-এখন এমন একটি সাপ্লাই চেইনসহ যা ব্যবসায়ীর ব্যক্তিগত সক্ষমতায় থেমে থাকে না।"
              )}
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Before/after bento comparison (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "The same trader. A different ceiling.",
                "একই ব্যবসায়ী। ভিন্ন এক সীমা।"
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Fashol does not replace the wholesale trade. It extends its capacity. Below is what changes when a wholesaler plugs in.",
                "ফসল পাইকারি বাণিজ্যকে প্রতিস্থাপন করে না। এটি তার সক্ষমতা বাড়ায়। একজন পাইকার যুক্ত হলে কী কী বদলায়, তা নিচে দেওয়া হলো।"
              )}
            </p>
          </Reveal>
        </div>

        {/* 8-card bento grid. */}
        <div className="mt-12 tablet:mt-16">
          <ComparisonBento />
        </div>

        {/* Closing line. */}
        <div className="mt-16 tablet:mt-20 text-center">
          <Reveal>
            <p
              className="text-[28px] tablet:text-[36px] desktop:text-[40px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-deep-green)",
              }}
            >
              {t(lang, "Not a new business. A bigger one.", "নতুন কোনো ব্যবসা নয়। বড় একটা ব্যবসা।")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 - Powered by (paper tone per rotation). */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "The product behind this work.", "এই কাজের পেছনের প্রোডাক্ট।")}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 max-w-[520px]">
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
              <p className="t-body mt-6">
                {t(
                  lang,
                  "The buyer procurement desk. Wholesalers use Hyperfarm to service their downstream book - restaurants, supershops, quick commerce, institutional kitchens.",
                  "বায়ারের প্রকিউরমেন্ট ডেস্ক। পাইকাররা হাইপারফার্ম ব্যবহার করে তাদের ডাউনস্ট্রিম কারবার সামলান-রেস্তোরাঁ, সুপারশপ, কুইক কমার্স, প্রাতিষ্ঠানিক রান্নাঘর।"
                )}
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/hyperfarm" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্টের পেজ দেখুন")}
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - Pull quote (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {t(
              lang,
              "“I was moving around 80 tons a week before Fashol. I knew my ceiling. The relationships I had, the hours I could keep, the credit I could float - it worked out to 80 tons. Today I move above 250 tons a week. Same stall, same market. The difference is I am not sourcing alone anymore.”",
              "“ফসলের আগে আমি সপ্তাহে প্রায় 80 টন প্রোডাক্ট সরাতাম। আমার সীমাটা জানতাম। যে সম্পর্ক ছিল, যত ঘণ্টা খাটতে পারতাম, যত ঋণ জোগাড় করতে পারতাম-সব মিলিয়ে দাঁড়াত 80 টন। আজ আমি সপ্তাহে 250 টনের বেশি সরাই। একই দোকান, একই বাজার। পার্থক্য একটাই-আমি আর একা সোর্সিং করি না।”"
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Abul Kashem", "আবুল কাশেম")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                {t(lang, "Wholesale trader, Karwan Bazar, Dhaka", "পাইকারি ব্যবসায়ী, কারওয়ান বাজার, ঢাকা")}
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
              {t(
                lang,
                "Seventy-two hours from first conversation to wholesale delivery.",
                "প্রথম আলাপ থেকে পাইকারি ডেলিভারি পর্যন্ত বাহাত্তর ঘণ্টা।"
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "No rollout needed. Fashol's wholesale desk runs a live supply load within three days of the first conversation - scoping volume, mapping SKUs to Fashol pricing, and turning on the first delivery. It grows from there.",
                "কোনো রোলআউটের দরকার নেই। ফসলের পাইকারি ডেস্ক প্রথম আলাপের তিন দিনের মধ্যেই একটি সরাসরি সরবরাহ চালু করে-পরিমাণ যাচাই, SKU-কে ফসলের দামের সঙ্গে ম্যাপ, আর প্রথম ডেলিভারি চালু করা। এরপর তা বাড়তেই থাকে।"
              )}
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
                  {t(lang, s.headline, s.headlineBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, s.body, s.bodyBn)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mt-10 tablet:mt-12">
          <Link href="/contact" className="link-arrow">
            {t(lang, "Talk to Fashol's wholesale team", "ফসলের পাইকারি টিমের সঙ্গে কথা বলুন")}
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain (paper) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "The rest of the trade side runs on Fashol too.",
                "বাণিজ্যের বাকি দিকটাও ফসলেই চলে।"
              )}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-3 gap-6">
          {RELATED.map((r) => (
            <Reveal key={r.name} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-grain)] rounded-[4px] p-8">
                <h3 className="t-h5" style={{ fontWeight: 500 }}>
                  {t(lang, r.name, r.nameBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, r.description, r.descriptionBn)}</p>
                <div className="mt-auto pt-6">
                  <Link href={r.href} className="link-arrow">
                    {t(lang, "Learn more", "আরও জানুন")}
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

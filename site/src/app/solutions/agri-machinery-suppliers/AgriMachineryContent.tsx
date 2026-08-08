"use client";

import { useLang } from "@/components/site/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { Section } from "@/components/ui/Section";
import {

  Reveal,
  StaggerChildren,
  StaggerItem,
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t, type Lang } from "@/lib/i18n";


const HERO_IMAGE_PATH = "/agmahero.jpg";

type HeroStat =
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      tail: string;
      label: string;
      labelBn: string;
    }
  | {
      kind: "text";
      text: string;
      textBn: string;
      label: string;
      labelBn: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "number",
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    label: "Farmers on Jogaan, active buyers",
    labelBn: "যোগানে কৃষক, সক্রিয় বায়ার",
  },
  {
    kind: "number",
    n: 50,
    format: "plain",
    suffix: "",
    tail: " districts",
    label: "Active across Bangladesh",
    labelBn: "বাংলাদেশজুড়ে সক্রিয়",
  },
  {
    kind: "text",
    text: "Sell or finance",
    textBn: "বিক্রি বা ফাইন্যান্সিং",
    label: "Two ways to reach every farmer",
    labelBn: "প্রতিটি কৃষকের কাছে পৌঁছানোর দুটি পথ",
  },
];

type ClaimCard = {
  kind: "claim";
  imageSrc?: string;
  imageAlt?: string;
  cardBg?: string;
  statement: string;
  statementBn: string;
  body: string;
  bodyBn: string;
};

type ProofCard = {
  kind: "proof";
  display: string;
  displayBn: string;
  displayScale: "lg" | "md" | "sm";
  body: string;
  bodyBn: string;
};

type ClosingCard = {
  kind: "closing";
  statement: string;
  statementBn: string;
  ctaLabel?: string;
  ctaLabelBn?: string;
  ctaHref?: string;
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
      imageSrc: "/agma4.png",
      imageAlt:
        "An isometric Jogaan platform view with a machinery catalog connected to farmer figures across a stylized geography",
      cardBg: "#F8EBDB",
      statement: "Your catalog in front of 60,000 farmers.",
      statementBn: "আপনার ক্যাটালগ 60,000 কৃষকের সামনে।",
      body: "List your machinery on Jogaan and reach the full farmer network directly. Farmers browse, compare, request demos, and order. You see who is interested, from which district and crop cycle, before the sale closes.",
      bodyBn: "যোগানে আপনার মেশিনারি তালিকাভুক্ত করুন আর সরাসরি পৌঁছে যান পুরো কৃষক নেটওয়ার্কে। কৃষকরা ঘুরে দেখেন, তুলনা করেন, ডেমো চান আর অর্ডার দেন। বিক্রি চূড়ান্ত হওয়ার আগেই আপনি জানতে পারেন কে আগ্রহী, কোন জেলা আর কোন ফসল মৌসুম থেকে।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agma5.png",
      imageAlt:
        "An isometric split-path visualization with a tractor in the center, one path leading to a direct sale and another to a financing ledger, both arriving at a farmer figure",
      cardBg: "#F9EEDE",
      statement: "Sell the machinery, or finance it.",
      statementBn: "যন্ত্র বিক্রি করুন, নয়তো ফাইন্যান্সিং দিন।",
      body: "A farmer who can pay outright buys directly. One who cannot qualifies for Fashol financing, underwritten against their Jogaan transaction history and crop income. Either way you get full payment up front, and Fashol carries the financing relationship.",
      bodyBn: "যে কৃষক পুরো দাম দিতে পারেন, তিনি সরাসরি কেনেন। যিনি পারেন না, তিনি ফসল ফাইন্যান্সিংয়ের জন্য যোগ্য হন - যার ভিত্তি তার যোগানের লেনদেনের ইতিহাস আর ফসলের আয়। যেভাবেই হোক, আপনি আগেই পুরো টাকা পান, আর ফাইন্যান্সিংয়ের সম্পর্কটি ফসল বহন করে।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Financing",
      displayBn: "ফাইন্যান্সিং",
      displayScale: "md",
      body: "Farmer financing underwritten by Fashol against live Jogaan transaction data. No credit risk, no collection burden, no financing desk to build.",
      bodyBn: "যোগানের সরাসরি লেনদেনের তথ্যের বিপরীতে ফসল কৃষকের ফাইন্যান্সিংয়ের দায় নেয়। কোনো ক্রেডিট রিস্ক নেই, আদায়ের বোঝা নেই, নতুন করে ফাইন্যান্সিং ডেস্ক গড়ার দরকার নেই।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agma6.png",
      imageAlt:
        "An isometric delivery route showing a tractor being transported from a Fashol hub to a farmer's field",
      cardBg: "#F7EAD9",
      statement: "Delivered to the farm, assembled, and running.",
      statementBn: "খামারে পৌঁছে, বসিয়ে, চালু করে দেওয়া।",
      body: "Machinery is heavy and awkward to ship. Fashol's hub network handles last-mile delivery, on-site assembly, and first-run setup. Neither you nor the farmer sorts out logistics. The machinery arrives working.",
      bodyBn: "মেশিনারি ভারী আর পরিবহনে ঝক্কির। ফসলের হাব নেটওয়ার্ক শেষ ধাপের ডেলিভারি, ঘটনাস্থলে সংযোজন আর প্রথম চালুর ব্যবস্থা সামলায়। লজিস্টিকস নিয়ে আপনাকেও ভাবতে হয় না, কৃষককেও না। যন্ত্র পৌঁছায় সচল অবস্থায়।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Spare parts",
      displayBn: "যন্ত্রাংশ",
      displayScale: "sm",
      body: "Farmers order spare parts and service through Jogaan. The machinery stays running. Your brand reputation stays intact.",
      bodyBn: "কৃষকরা যোগানের মাধ্যমেই যন্ত্রাংশ আর সার্ভিস অর্ডার করেন। যন্ত্র সচল থাকে। আপনার ব্র্যান্ডের সুনাম অটুট থাকে।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "The market was never small. The money to reach it was.",
      statementBn: "বাজার কখনো ছোট ছিল না। ছোট ছিল সেখানে পৌঁছানোর টাকাটা।",
      ctaLabel: "Talk to Fashol's agri-machinery team",
      ctaLabelBn: "ফসলের কৃষি-মেশিনারি টিমের সঙ্গে কথা বলুন",
      ctaHref: "/contact",
    },
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
    headline: "Catalog and service mapping.",
    headlineBn: "ক্যাটালগ ও সার্ভিস সাজানো।",
    body: "A Fashol representative walks through your catalog, pricing, warranty, delivery, and spare-parts availability. Your SKUs are mapped onto Jogaan with full technical specs.",
    bodyBn: "ফসলের একজন প্রতিনিধি আপনার ক্যাটালগ, দাম, ওয়ারেন্টি, ডেলিভারি আর যন্ত্রাংশের সাপ্লাই বুঝে নেন। আপনার প্রতিটি পণ্য পূর্ণ কারিগরি তথ্যসহ যোগানে সাজানো হয়।",
  },
  {
    n: "02",
    headline: "Listing goes live.",
    headlineBn: "তালিকা চালু হয়।",
    body: "Your machinery goes live with images, specs, pricing, Fashol financing terms, and warranty details. Farmers across 50 districts see your catalog.",
    bodyBn: "আপনার মেশিনারি ছবি, বিবরণ, দাম, ফসল ফাইন্যান্সিংয়ের শর্ত আর ওয়ারেন্টির বিস্তারিতসহ চালু হয়। 50 জেলার কৃষকরা আপনার ক্যাটালগ দেখেন।",
  },
  {
    n: "03",
    headline: "Farmer orders begin.",
    headlineBn: "কৃষকের অর্ডার শুরু হয়।",
    body: "Farmers order directly on Jogaan. Outright or financed, full payment settles to you up front - Fashol carries the installment relationship with the farmer.",
    bodyBn: "কৃষকরা সরাসরি যোগানে অর্ডার দেন। নগদে হোক বা ফাইন্যান্সিংে, পুরো টাকা আগেই আপনার কাছে সেটেলমেন্ট হয় - কিস্তির সম্পর্কটি ফসল কৃষকের সঙ্গে বহন করে।",
  },
  {
    n: "04",
    headline: "Fashol handles delivery and service.",
    headlineBn: "ডেলিভারি ও সার্ভিস ফসল সামলায়।",
    body: "Fashol's hub network delivers to the farmer's field, handles assembly, and supports spare-parts and service requests through Jogaan. Your operational footprint stays light.",
    bodyBn: "ফসলের হাব নেটওয়ার্ক কৃষকের খেতে পৌঁছে দেয়, সংযোজন সামলায় আর যোগানের মাধ্যমে যন্ত্রাংশ ও সার্ভিসের অনুরোধ সামাল দেয়। আপনার পরিচালনার ভার হালকা থাকে।",
  },
];

type ProductCard = {
  name: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoHeightClass?: string;
  role: string;
  roleBn: string;
  href: string;
};

const POWERED_BY: ReadonlyArray<ProductCard> = [
  {
    name: "Jogaan",
    logoSrc: "/jogaanlogo.png",
    logoWidth: 1000,
    logoHeight: 248,
    role: "The farmer platform. List your catalog on Jogaan and reach 60,000 registered farmers directly, with live demand visibility and order handling.",
    roleBn: "কৃষকদের প্ল্যাটফর্ম। যোগানে আপনার ক্যাটালগ তালিকাভুক্ত করুন আর সরাসরি পৌঁছে যান 60,000 নিবন্ধিত কৃষকের কাছে, সরাসরি চাহিদার স্পষ্টতা আর অর্ডার সামলানোসহ।",
    href: "/products/jogaan",
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
    name: "Farmers",
    nameBn: "কৃষক",
    description:
      "60,000 registered farmers on Jogaan, selling produce with transparent pricing, same-day settlement, and access to agri inputs, machinery, and credit.",
    descriptionBn:
      "যোগানে 60,000 নিবন্ধিত কৃষক, স্বচ্ছ দাম আর একই দিনে সেটেলমেন্টে ফসল বিক্রি করেন এবং কৃষি ইনপুট, মেশিনারি ও ক্রেডিটের সুবিধা পান।",
    href: "/solutions/farmers",
  },
  {
    name: "Agri input suppliers",
    nameBn: "কৃষি ইনপুট সাপ্লায়ার",
    description:
      "Seeds, pesticides, fertilizers, livestock feed direct to the farmer. Last-mile logistics and crop-cycle data built in.",
    descriptionBn:
      "বীজ, কীটনাশক, সার, পশুখাদ্য সরাসরি কৃষকের কাছে। শেষ ধাপের লজিস্টিকস আর ফসল মৌসুমের তথ্য এতে গাঁথা।",
    href: "/solutions/agri-input-suppliers",
  },
];



export function AgriMachineryContent() {
  const lang = useLang();
  const heroImageExists = true;

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay, left to right) */}
      <section className="relative min-h-[720px] h-[94vh] overflow-hidden">
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
              alt="A farmer using a tractor in a field in Bangladesh"
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

        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 tablet:pl-[8vw] tablet:pr-8 pb-[108px] tablet:pb-[124px] desktop:pb-[140px] pt-40 tablet:pt-48">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[45px] tablet:!text-[58px] desktop:!text-[70px]"
            >
              {t(lang, "Agri machinery suppliers.", "কৃষি মেশিনারি সাপ্লায়ার।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px]"
            >
              {t(
                lang,
                "Tractors, tillers, pumps, threshers. Sell them or finance them through Fashol.",
                "ট্রাক্টর, টিলার, পাম্প, মাড়াই যন্ত্র। ফসলের মাধ্যমে বিক্রি করুন কিংবা ফাইন্যান্সিং দিন।",
              )}
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-start max-w-[260px]"
                >
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
                          trigger="inview"
                          inviewMargin="0px"
                          sessionKey={`agri-machinery-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2">
                    {t(lang, s.label, s.labelBn)}
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
              {t(
                lang,
                "Farmers want the tractor. They cannot afford the tractor.",
                "কৃষক ট্রাক্টর চান। কিন্তু ট্রাক্টর কেনার সামর্থ্য নেই।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A tractor in Bangladesh costs five to fifteen thousand US dollars, a thresher two to five thousand, a power tiller under two thousand - still out of reach for most smallholders. The farmer working two or three bighas, whom most machinery companies actually sell to, earns a few thousand dollars a year. The math does not work, so the machinery sits on the dealer floor while the farmer rents or borrows.",
                "বাংলাদেশে একটি ট্রাক্টরের দাম পাঁচ থেকে পনেরো হাজার ডলার, একটি মাড়াই যন্ত্র দুই থেকে পাঁচ হাজার, একটি পাওয়ার টিলার দুই হাজারের নিচে - তবু বেশির ভাগ ক্ষুদ্র চাষির নাগালের বাইরে। যে কৃষক দুই-তিন বিঘা জমি চাষ করেন, যাদের কাছেই আসলে বেশির ভাগ যন্ত্র কোম্পানি বিক্রি করে, তার বছরে আয় মাত্র কয়েক হাজার ডলার। হিসাব মেলে না, তাই যন্ত্র পড়ে থাকে ডিলারের দোকানে, আর কৃষক ভাড়া নেন বা ধার করেন।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Machinery companies have known this for decades. The workarounds - dealer installment schemes, moneylender financing, narrow government subsidies - never reach the full farmer population. So the market looks small when it is huge. Most farmers want modern machinery and cannot buy it, and that gap is where the real Bangladesh agricultural market lives.",
                "যন্ত্র কোম্পানিগুলো দশকের পর দশক ধরে এটা জানে। যেসব উপায় বের করা হয় - ডিলারের কিস্তি স্কিম, মহাজনি ফাইন্যান্সিং, সীমিত সরকারি ভর্তুকি - কোনোটাই পুরো কৃষক জনগোষ্ঠীর কাছে পৌঁছায় না। ফলে বিশাল একটা বাজার দেখতে ছোট মনে হয়। বেশির ভাগ কৃষক আধুনিক যন্ত্র চান অথচ কিনতে পারেন না, আর এই ফাঁকটুকুতেই বাংলাদেশের আসল কৃষি বাজার লুকিয়ে আছে।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The machinery companies do not have a demand problem. They have a financing problem.",
                "যন্ত্র কোম্পানিগুলোর চাহিদার সমস্যা নেই। তাদের সমস্যা ফাইন্যান্সিংয়ের।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) - phrase, letter-spacing ease-in (no count-up) */}
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
            {t(
              lang,
              "From a small fraction to the full network.",
              "সামান্য একটি অংশ থেকে পুরো নেটওয়ার্কে।",
            )}
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.4}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[780px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              {t(
                lang,
                "Only a small fraction of the 60,000 farmers on Jogaan can afford machinery outright. Most can afford it on installments. Fashol converts that second group into real buyers, expanding the addressable market from a narrow slice to the full network.",
                "যোগানের 60,000 কৃষকের সামান্য একটি অংশই নগদে যন্ত্র কেনার সামর্থ্য রাখেন। বেশির ভাগই পারেন কিস্তিতে। ফসল সেই দ্বিতীয় দলটিকে সত্যিকারের বায়ারে পরিণত করে, বাজারের নাগালটা সংকীর্ণ একটি অংশ থেকে পুরো নেটওয়ার্ক পর্যন্ত ছড়িয়ে দেয়।",
              )}
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Four claims bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "Four things that turn machinery interest into machinery sales.",
                "যে চারটি জিনিস যন্ত্রের আগ্রহকে যন্ত্র বিক্রিতে বদলে দেয়।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Direct farmer reach, Fashol financing built in, last-mile delivery, and post-sale service infrastructure. The complete stack between your catalog and the farmer's field.",
                "সরাসরি কৃষকের নাগাল, সঙ্গে গাঁথা ফসল ফাইন্যান্সিং, শেষ ধাপের ডেলিভারি আর বিক্রয়-পরবর্তী সার্ভিসের কাঠামো। আপনার ক্যাটালগ আর কৃষকের খেতের মাঝের পুরো ব্যবস্থাটাই।",
              )}
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5 [--card-bg:#F8EBDB]"
          stagger={0.08}
        >
          {BENTO.map((entry, i) => (
            <StaggerItem key={i} className={entry.span} y={20}>
              <BentoCardView card={entry.card} lang={lang} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 5 - Powered by (paper, 2-up grid) */}
      <Section tone="paper">
        <div className="text-center max-w-[720px] mx-auto">
          <Reveal as="h2" className="t-h2">
            {t(lang, "The product behind this work.", "এই কাজের পেছনের প্রোডাক্ট।")}
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 max-w-[520px] mx-auto">
          {POWERED_BY.map((p) => (
            <Reveal key={p.name} className="w-full h-full">
              <article className="h-full flex flex-col items-start">
                <Image
                  src={p.logoSrc}
                  alt={p.name}
                  width={p.logoWidth}
                  height={p.logoHeight}
                  sizes="(min-width: 1200px) 400px, (min-width: 810px) 45vw, 90vw"
                  quality={95}
                  className={`${p.logoHeightClass ?? "h-10 tablet:h-12"} w-auto object-contain`}
                />
                <p className="t-body mt-6">{t(lang, p.role, p.roleBn)}</p>
                <div className="mt-auto pt-6">
                  <Link href={p.href} className="link-arrow">
                    {t(lang, "Open product page", "প্রোডাক্ট পেজ খুলুন")}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 6 - Statement (ink) - attribution-neutral editorial statement */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[900px]">
          <LetterSpaceReveal
            as="p"
            startSpacing="0.08em"
            duration={0.8}
            className="!text-[var(--color-paper)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(22px, 3vw, 44px)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
            }}
          >
            {t(
              lang,
              "Not limited by what farmers want. Limited by what they can pay. Fashol closes the gap.",
              "কৃষক কী চান তাতে আটকে নেই। আটকে আছে তারা কী দিতে পারেন তাতে। ফসল সেই ফাঁকটা মিটিয়ে দেয়।",
            )}
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface-deep) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "Your catalog on Jogaan. Orders follow.",
                "আপনার ক্যাটালগ যোগানে। অর্ডার আসতে থাকে।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "No long rollout. Fashol's agri-machinery team maps your catalog, pricing, and service terms onto Jogaan. Farmers start viewing and requesting demos, and orders - paid outright or financed through Fashol - follow.",
                "দীর্ঘ কোনো প্রস্তুতির দরকার নেই। ফসলের কৃষি-যন্ত্র টিম আপনার ক্যাটালগ, দাম আর সার্ভিসের শর্ত যোগানে সাজিয়ে দেয়। কৃষকরা দেখতে ও ডেমো চাইতে শুরু করেন, আর অর্ডার - নগদে সেটেলমেন্ট হোক বা ফসলের মাধ্যমে ফাইন্যান্সিংে - আসতে থাকে।",
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
            {t(
              lang,
              "Talk to Fashol's agri-machinery team",
              "ফসলের কৃষি-মেশিনারি টিমের সঙ্গে কথা বলুন",
            )}
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
                "The rest of the supply side runs on Fashol too.",
                "সাপ্লাই সাইডের বাকি দিকটাও চলে ফসলে।",
              )}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6">
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

// ------------------------------------------------------------------
// Bento card rendering. Claim cards carry an illustration, big
// statement, and body. Proof cards carry a big display value. Closing
// card is a centered full-width statement with an optional inline CTA.
// ------------------------------------------------------------------

function BentoCardView({ card, lang }: { card: BentoCard; lang: Lang }) {
  if (card.kind === "claim") return <ClaimCardView card={card} lang={lang} />;
  if (card.kind === "proof") return <ProofCardView card={card} lang={lang} />;
  return <ClosingCardView card={card} lang={lang} />;
}

function ClaimCardView({ card, lang }: { card: ClaimCard; lang: Lang }) {
  const hasImage = !!card.imageSrc;
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: card.cardBg ?? "var(--card-bg)", minHeight: hasImage ? "360px" : "320px" }}
    >
      {hasImage && card.imageSrc && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "2 / 1",
          }}
        >
          <Image
            src={card.imageSrc}
            alt={card.imageAlt ?? ""}
            fill
            sizes="(min-width: 1200px) 520px, (min-width: 810px) 45vw, 100vw"
            className="object-contain"
          />
        </div>
      )}
      <h3
        className={hasImage ? "mt-auto pt-6" : ""}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(26px, 2.8vw, 40px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, card.statement, card.statementBn)}
      </h3>
      <p
        className={hasImage ? "mt-4" : "mt-auto pt-6"}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px",
          lineHeight: 1.55,
          color: "rgba(6, 94, 58, 0.85)",
        }}
      >
        {t(lang, card.body, card.bodyBn)}
      </p>
    </article>
  );
}

function ProofCardView({ card, lang }: { card: ProofCard; lang: Lang }) {
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
        {t(lang, card.display, card.displayBn)}
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
        {t(lang, card.body, card.bodyBn)}
      </p>
    </article>
  );
}

function ClosingCardView({ card, lang }: { card: ClosingCard; lang: Lang }) {
  return (
    <article
      className="relative flex flex-col items-center justify-center rounded-[12px] text-center px-8 tablet:px-12"
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
        {t(lang, card.statement, card.statementBn)}
      </p>
      {card.ctaLabel && card.ctaHref && (
        <div className="mt-8">
          <Link href={card.ctaHref} className="link-arrow">
            {t(lang, card.ctaLabel, card.ctaLabelBn ?? card.ctaLabel)}
          </Link>
        </div>
      )}
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
  QuoteReveal,
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "Importers - Fashol",
  description:
    "The import side is yours. The distribution side is ours. Once foreign produce lands in Bangladesh, Fashol distributes it across 7,000+ mudi shops, 400+ restaurants, and 400+ supershop outlets with cold-chain fulfillment and same-day settlement.",
};

const HERO_IMAGE_PATH = "/imhero.jpg";

type HeroStat = {
  kind: "number";
  n: number;
  format: "comma" | "plain";
  suffix: string;
  label: string;
  labelBn: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "number",
    n: 7000,
    format: "comma",
    suffix: "+",
    label: "Mudi shops served",
    labelBn: "মুদি দোকানে সরবরাহ",
  },
  {
    kind: "number",
    n: 400,
    format: "comma",
    suffix: "+",
    label: "Restaurants including Domino's",
    labelBn: "রেস্তোরাঁ, ডমিনোজসহ",
  },
  {
    kind: "number",
    n: 400,
    format: "comma",
    suffix: "+",
    label: "Supershop outlets including Shwapno",
    labelBn: "সুপারশপ আউটলেট, স্বপ্নসহ",
  },
];

type ClaimCard = {
  kind: "claim";
  imageSrc: string;
  imageAlt: string;
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
      imageSrc: "/im1.png",
      imageAlt:
        "An isometric network diagram showing a port container connected by thin lines to restaurant, shop, and warehouse icons spreading outward",
      statement: "The largest downstream network in Bangladesh.",
      statementBn: "বাংলাদেশের সবচেয়ে বড় ডাউনস্ট্রিম নেটওয়ার্ক।",
      body: "7,000 mudi shops, 400-plus restaurants including Domino's, 400-plus supershop outlets across Shwapno, Meena Bazar, Agora, Daily Shopping, and every major quick commerce platform. One import, one Fashol handoff, and your volume moves.",
      bodyBn: "7,000 মুদি দোকান, ডমিনোজসহ 400-এর বেশি রেস্তোরাঁ, স্বপ্ন, মীনা বাজার, আগোরা, ডেইলি শপিং জুড়ে 400-এর বেশি সুপারশপ আউটলেট এবং প্রতিটি বড় কুইক কমার্স প্ল্যাটফর্ম। একবার আমদানি, একবার ফসলের হাতে তুলে দেওয়া, আর আপনার পুরো চালান ছড়িয়ে পড়ে সবখানে।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/im2.png",
      imageAlt:
        "An isometric cold-chain route from a port container to a Fashol hub out to multiple delivery destinations",
      statement: "Cold chain that does not break.",
      statementBn: "যে কোল্ড চেইন কখনো ভাঙে না।",
      body: "From port clearance to Fashol hub to end buyer, the cold chain holds. Apples arrive at the restaurant the same grade they landed in Chittagong. Onions arrive at the supershop without shrinkage. Spoilage stops being a line item.",
      bodyBn: "বন্দর থেকে ছাড় হয়ে ফসল হাব হয়ে শেষ বায়ার পর্যন্ত কোল্ড চেইন অটুট থাকে। যে গ্রেডে আপেল চট্টগ্রামে নেমেছিল, ঠিক সেই গ্রেডেই রেস্তোরাঁয় পৌঁছায়। পেঁয়াজ সুপারশপে পৌঁছায় ওজন না কমেই। নষ্ট হওয়া আর হিসাবের খাতায় থাকে না।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Full container",
      displayBn: "গোটা কন্টেইনার",
      displayScale: "sm",
      body: "Absorbed and distributed by Fashol's network in a single cycle. No wholesale market dumping, no multi-week storage, no margin bleed.",
      bodyBn: "ফসলের নেটওয়ার্ক একটি চক্রেই পুরোটা টেনে নিয়ে বিতরণ করে। পাইকারি বাজারে সস্তায় ছেড়ে দেওয়া নেই, সপ্তাহের পর সপ্তাহ গুদামজাত নেই, মার্জিন ক্ষয় নেই।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/im3.png",
      imageAlt:
        "An isometric tablet showing demand indicators and charts with small icons representing restaurant, supershop, and quick commerce buyers",
      statement: "Demand you can see before you import.",
      statementBn: "আমদানির আগেই দেখে নিন চাহিদা।",
      body: "Hyperfarm's downstream book tells you what restaurants, supershops, and quick commerce platforms are buying this week, at what price, in what volume. Stop opening an LC on guesswork. Import against demand you have already measured.",
      bodyBn: "হাইপারফার্মের ডাউনস্ট্রিম বুক আপনাকে জানায় এই সপ্তাহে রেস্তোরাঁ, সুপারশপ ও কুইক কমার্স প্ল্যাটফর্ম কী কিনছে, কোন দামে, কত পরিমাণে। অনুমানের ওপর ভরসা করে আর LC খুলবেন না। যে চাহিদা আগেই মেপে নিয়েছেন, তার বিপরীতে আমদানি করুন।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Same-day",
      displayBn: "একই দিনে",
      displayScale: "md",
      body: "Settlement on delivered volume once produce reaches the end buyer. Working capital turns faster, not slower.",
      bodyBn: "পণ্য শেষ বায়ারের হাতে পৌঁছানোমাত্র ডেলিভারি হওয়া পরিমাণের ওপর সেটেলমেন্ট। ওয়ার্কিং ক্যাপিটাল দ্রুত ঘোরে, ধীরে নয়।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "Your volume lands once. It moves everywhere.",
      statementBn: "আপনার চালান একবার নামে। ছড়িয়ে পড়ে সবখানে।",
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
    headline: "The conversation.",
    headlineBn: "প্রথম আলাপ।",
    body: "A Fashol import representative walks through your typical import book - origin countries, produce mix, container frequency, current wholesale trader relationships. One conversation, usually by phone.",
    bodyBn: "ফসলের একজন আমদানি প্রতিনিধি আপনার সাধারণ আমদানির খতিয়ান বুঝে নেন - কোন দেশ থেকে আনেন, কী কী পণ্য, কত ঘন ঘন কন্টেইনার আসে, এখন কোন পাইকারি ব্যবসায়ীদের সঙ্গে সম্পর্ক আছে। সাধারণত ফোনেই একটি আলাপ।",
  },
  {
    n: "02",
    headline: "Next container landing.",
    headlineBn: "পরের কন্টেইনার নামা।",
    body: "For your next cleared container, Fashol's import desk picks up from port clearance. Produce moves to the nearest Fashol hub for grading and routing.",
    bodyBn: "আপনার পরবর্তী ছাড়কৃত কন্টেইনার থেকে ফসলের আমদানি ডেস্ক বন্দর ছাড়ের পর দায়িত্ব নেয়। পণ্য গ্রেডিং ও রুটিংয়ের জন্য নিকটতম ফসল হাবে চলে যায়।",
  },
  {
    n: "03",
    headline: "Distribution across the network.",
    headlineBn: "নেটওয়ার্কজুড়ে বিতরণ।",
    body: "The full container volume is allocated across Fashol's downstream book - supershops, restaurants, quick commerce, mudi shops - based on current demand and pricing. Cold-chain delivery to every end buyer within the cycle.",
    bodyBn: "চলতি চাহিদা ও দাম অনুযায়ী গোটা কন্টেইনারের পণ্য ফসলের ডাউনস্ট্রিম বুকজুড়ে ভাগ করা হয় - সুপারশপ, রেস্তোরাঁ, কুইক কমার্স, মুদি দোকান। একই চক্রের মধ্যে প্রতিটি শেষ বায়ারের কাছে কোল্ড চেইনে ডেলিভারি।",
  },
  {
    n: "04",
    headline: "Settlement and forward planning.",
    headlineBn: "সেটেলমেন্ট ও সামনের পরিকল্পনা।",
    body: "Same-day settlement on delivered volume. Your next import decision is made against Hyperfarm demand data, not against a wholesale market guess.",
    bodyBn: "ডেলিভারি হওয়া পরিমাণের ওপর একই দিনে সেটেলমেন্ট। আপনার পরবর্তী আমদানির সিদ্ধান্ত হয় হাইপারফার্মের চাহিদার তথ্যের ভিত্তিতে, পাইকারি বাজারের অনুমানে নয়।",
  },
];

const POWERED_BY: ReadonlyArray<{
  name: string;
  logoSrc: string;
  role: string;
  roleBn: string;
  href: string;
}> = [
  {
    name: "Hyperfarm",
    logoSrc: "/images/content/hyperfarm-logo.png",
    role: "The buyer procurement desk. Importers use Hyperfarm to see live downstream demand across restaurants, supershops, and quick commerce platforms, and to plan import volumes against real buying signals.",
    roleBn: "বায়ারদের প্রকিউরমেন্ট ডেস্ক। ইমপোর্টাররা হাইপারফার্ম ব্যবহার করেন রেস্তোরাঁ, সুপারশপ ও কুইক কমার্স প্ল্যাটফর্মজুড়ে সরাসরি ডাউনস্ট্রিম চাহিদা দেখতে এবং প্রকৃত কেনাকাটার সিগন্যাল অনুযায়ী আমদানির পরিমাণ প্ল্যান করতে।",
    href: "/products/hyperfarm",
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
    name: "Exporters",
    nameBn: "এক্সপোর্টার",
    description:
      "End-to-end export corridors to the UK, Europe, the Middle East, and Southeast Asia.",
    descriptionBn:
      "যুক্তরাজ্য, ইউরোপ, মধ্যপ্রাচ্য ও দক্ষিণ-পূর্ব এশিয়ায় শুরু থেকে শেষ পর্যন্ত রপ্তানি করিডোর।",
    href: "/solutions/exporters",
  },
  {
    name: "Wholesalers",
    nameBn: "পাইকার",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    descriptionBn:
      "পাইকারি ব্যবসার পেছনে একটি আধুনিক সাপ্লাই স্ট্যাক, 50 জেলা থেকে সোর্সিং আর একই দিনে সেটেলমেন্টসহ।",
    href: "/solutions/wholesalers",
  },
  {
    name: "Commission agents",
    nameBn: "আড়তদার",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and digital settlement.",
    descriptionBn:
      "ঐতিহ্যবাহী আড়তদার আধুনিক স্ট্যাকে, স্বচ্ছ দাম আর ডিজিটাল সেটেলমেন্টসহ।",
    href: "/solutions/commission-agents",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default async function ImportersPage() {
  const lang = await getLang();
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay, left to right) */}
      <section className="relative min-h-[600px] h-[78vh] overflow-hidden">
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
              alt="Containers being unloaded from a ship at Chittagong port, Bangladesh"
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

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Importers.", "ইমপোর্টার।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px] !text-[rgba(255,251,234,0.82)]"
            >
              {t(
                lang,
                "The import side is yours. The distribution side is ours. Once produce lands in Bangladesh, Fashol moves it through the country's largest downstream network.",
                "আমদানির দিকটা আপনার। বিতরণের দিকটা আমাদের। পণ্য একবার বাংলাদেশে নামলে ফসল তা দেশের সবচেয়ে বড় ডাউনস্ট্রিম নেটওয়ার্ক দিয়ে পৌঁছে দেয়।",
              )}
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
                      sessionKey={`importers-hero-stat-${i}`}
                    />
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.7)]">
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
                "Landing produce in Bangladesh is the easy part.",
                "বাংলাদেশে পণ্য নামানোটাই সহজ অংশ।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "An importer's job used to end at the Chittagong port: clear the container, handle paperwork, warehouse it, sell into the wholesale market at that week's price. Distribution was someone else's problem - aratdars, traders, resellers - each taking a margin while the importer kept what was left.",
                "একজন ইমপোর্টারের কাজ আগে চট্টগ্রাম বন্দরেই শেষ হতো: কন্টেইনার ছাড় করানো, কাগজপত্র সামলানো, গুদামজাত করা, ওই সপ্তাহের দামে পাইকারি বাজারে বিক্রি করা। বিতরণ ছিল অন্য কারও মাথাব্যথা - আড়তদার, ব্যবসায়ী, রিসেলার - প্রত্যেকে মার্জিন কেটে নিত, আর ইমপোর্টার পেতেন যা পড়ে থাকত।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "That model has failed for years. Wholesale prices on imported produce swing 20 percent in a week, and the cold chain breaks once the container leaves the port. Apples from Washington or onions from India pass through four hands, three temperature zones, and two weeks of transit before reaching a shelf. Quality variance kills margin; spoilage kills volume. The importer carries the risk from LC to landing, then hands the chain to traders they cannot see into.",
                "এই মডেল বছরের পর বছর ধরে ব্যর্থ। আমদানি পণ্যের পাইকারি দাম এক সপ্তাহেই 20 শতাংশ ওঠানামা করে, আর কন্টেইনার বন্দর ছাড়ার পরই কোল্ড চেইন ভেঙে পড়ে। ওয়াশিংটনের আপেল কিংবা ভারতের পেঁয়াজ তাকে পৌঁছানোর আগে চার হাত, তিনটি তাপমাত্রার স্তর আর দুই সপ্তাহের যাত্রা পার হয়। কোয়ালিটির হেরফের মার্জিন খেয়ে ফেলে; নষ্ট হওয়া পরিমাণ খেয়ে ফেলে। ইমপোর্টার LC থেকে পণ্য নামা পর্যন্ত ঝুঁকি বহন করেন, তারপর চেইনটি এমন ব্যবসায়ীদের হাতে তুলে দেন যাদের ভেতরটা তিনি দেখতে পান না।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The import side of this trade is not the problem. The distribution side is.",
                "এই ব্যবসার আমদানির দিকটা সমস্যা নয়। সমস্যা বিতরণের দিকটা।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) - phrase, letter-spacing ease-in (not count-up) */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.08em"
            duration={1}
            className="!text-[var(--color-paper)] text-[44px] tablet:text-[68px] desktop:text-[92px] leading-[0.98]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            {t(lang, "One container. One delivery cycle.", "এক কন্টেইনার। এক ডেলিভারি চক্র।")}
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[760px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              {t(
                lang,
                "A full container absorbed by Fashol's network and delivered to end buyers - restaurants, supershops, quick commerce, mudi shops - within one cycle. No middlemen, no cold-chain breaks, no margin lost to hands you cannot see.",
                "গোটা একটি কন্টেইনার ফসলের নেটওয়ার্ক টেনে নেয় আর এক চক্রের মধ্যেই শেষ বায়ারদের কাছে পৌঁছে দেয় - রেস্তোরাঁ, সুপারশপ, কুইক কমার্স, মুদি দোকান। কোনো মধ্যস্বত্বভোগী নেই, কোল্ড চেইন ভাঙে না, চোখের আড়ালের হাতে মার্জিন হারায় না।",
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
                "Four reasons to stop selling into the wholesale market.",
                "পাইকারি বাজারে বিক্রি বন্ধ করার চারটি কারণ।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Downstream reach, cold-chain distribution, live demand visibility, and quality routing. Every Fashol delivery cycle is built to absorb landed import volume and move it to end buyers on your behalf.",
                "ডাউনস্ট্রিম নাগাল, কোল্ড চেইন বিতরণ, সরাসরি চাহিদার স্পষ্টতা আর কোয়ালিটি অনুযায়ী রাউটিং। ফসলের প্রতিটি ডেলিভারি চক্র তৈরি হয়েছে নামানো আমদানি পণ্য টেনে নিয়ে আপনার হয়ে শেষ বায়ারদের কাছে পৌঁছে দিতে।",
              )}
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5"
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
            <Reveal key={p.name} className="w-full">
              <article className="flex flex-col items-start">
                <Image
                  src={p.logoSrc}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  sizes="120px"
                  className="h-20 tablet:h-24 w-auto object-contain"
                />
                <p className="t-body mt-6">{t(lang, p.role, p.roleBn)}</p>
                <div className="mt-6">
                  <Link href={p.href} className="link-arrow">
                    {t(lang, "Open product page", "প্রোডাক্ট পেজ খুলুন")}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 6 - Pull quote (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {t(
              lang,
              "“We used to land a container and then spend three weeks trying to clear it through wholesale traders who paid us less each time. Since joining Fashol, a container lands on Monday and by Friday the full volume is delivered to supershops, restaurants, and retail shops with settlement done. I stopped being an importer with a warehouse problem. I am just an importer now.”",
              "“আগে একটা কন্টেইনার নামিয়ে তিন সপ্তাহ ঘুরতাম পাইকারি ব্যবসায়ীদের কাছে বিক্রি করতে, যারা প্রতিবার আগের চেয়ে কম দাম দিত। ফসলে যোগ দেওয়ার পর সোমবার কন্টেইনার নামে আর শুক্রবারের মধ্যে গোটা চালান সুপারশপ, রেস্তোরাঁ ও রিটেইল শপে পৌঁছে যায়, সেটেলমেন্টও শেষ। গুদামের সমস্যায় আটকে থাকা ইমপোর্টার আর নই আমি। এখন শুধুই একজন ইমপোর্টার।”",
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Farhan Chowdhury", "ফারহান চৌধুরী")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                {t(lang, "Director, fresh produce import, Chittagong", "পরিচালক, তাজা পণ্য আমদানি, চট্টগ্রাম")}
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
              {t(
                lang,
                "Your next container lands. Fashol takes it from there.",
                "আপনার পরের কন্টেইনার নামে। এরপরটা ফসল সামলায়।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Importers do not need onboarding weeks. Fashol's import desk works around your next landing container. Day one is the conversation - what you import, who you sell into, your volume. Day two, your first cleared container enters Fashol's distribution network. Distribution then runs on its own.",
                "ইমপোর্টারদের সপ্তাহজুড়ে অনবোর্ডিং লাগে না। ফসলের আমদানি ডেস্ক আপনার পরবর্তী নামা কন্টেইনারকে ঘিরেই কাজ করে। প্রথম দিন আলাপ - আপনি কী আমদানি করেন, কার কাছে বিক্রি করেন, আপনার পরিমাণ কত। দ্বিতীয় দিন আপনার প্রথম ছাড়কৃত কন্টেইনার ফসলের বিতরণ নেটওয়ার্কে ঢোকে। এরপর বিতরণ নিজে থেকেই চলে।",
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
            {t(lang, "Talk to Fashol's import team", "ফসলের আমদানি টিমের সঙ্গে কথা বলুন")}
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
                "ব্যবসার বাকি দিকটাও চলে ফসলে।",
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

// ------------------------------------------------------------------
// Bento card rendering. Claim cards carry a tag, illustration, big
// statement, and body. Proof cards carry a tag and a big display value.
// Closing card is a centered, full-width statement.
// ------------------------------------------------------------------

function BentoCardView({ card, lang }: { card: BentoCard; lang: Lang }) {
  if (card.kind === "claim") return <ClaimCardView card={card} lang={lang} />;
  if (card.kind === "proof") return <ProofCardView card={card} lang={lang} />;
  return <ClosingCardView card={card} lang={lang} />;
}

function ClaimCardView({ card, lang }: { card: ClaimCard; lang: Lang }) {
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
          fontSize: "clamp(26px, 2.8vw, 40px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, card.statement, card.statementBn)}
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
            // sm - phrase-length text like "Full container".
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
          fontSize: "clamp(28px, 3.6vw, 56px)",
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, card.statement, card.statementBn)}
      </p>
    </article>
  );
}

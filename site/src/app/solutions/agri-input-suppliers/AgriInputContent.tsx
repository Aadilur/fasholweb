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
  QuoteReveal,
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t, type Lang } from "@/lib/i18n";


const HERO_IMAGE_PATH = "/aginhero.jpg";

type HeroStat = {
  n: number;
  format: "comma" | "plain";
  suffix: string;
  tail: string;
  tailBn: string;
  label: string;
  labelBn: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    tailBn: "",
    label: "Farmers on Jogaan, ready to buy",
    labelBn: "যোগানে থাকা কৃষক, কিনতে প্রস্তুত",
  },
  {
    n: 50,
    format: "plain",
    suffix: "",
    tail: " districts",
    tailBn: " জেলা",
    label: "Active across Bangladesh",
    labelBn: "বাংলাদেশজুড়ে সক্রিয়",
  },
  {
    n: 40,
    format: "plain",
    suffix: "+",
    tail: " hubs",
    tailBn: " হাব",
    label: "Last-mile distribution to the farm gate",
    labelBn: "খামারের দুয়ার পর্যন্ত লাস্ট-মাইল বিতরণ",
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
      imageSrc: "/agin1.png",
      imageAlt:
        "An isometric platform diagram showing an input supplier node connected directly to multiple farmer nodes, bypassing a faded dealer chain",
      statement: "Sell direct to the farmer who buys.",
      statementBn: "যে কৃষক কেনে, তার কাছে সরাসরি বিক্রি করুন।",
      body: "Your product on Jogaan reaches 60,000 registered farmers across 50 districts. No dealers, no retail markup. The farmer pays closer to depot price, and you capture the spread the middle of the chain used to take.",
      bodyBn: "যোগানে আপনার পণ্য পৌঁছে যায় 50 জেলার 60,000 নিবন্ধিত কৃষকের কাছে। কোনো ডিলার নেই, খুচরা মূল্যবৃদ্ধি নেই। কৃষক দাম দেন ডিপো দরের কাছাকাছি, আর চেইনের মাঝখানের হাত যে ব্যবধান নিয়ে যেত, সেটা এখন আপনার ঘরে ওঠে।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agin2.png",
      imageAlt:
        "An isometric last-mile delivery network with a central hub and delivery lines reaching farm icons scattered across a stylized geography",
      statement: "Last-mile logistics, built in.",
      statementBn: "লাস্ট-মাইল লজিস্টিকস, সঙ্গেই।",
      body: "Fashol's 40+ hub network delivers to the farm gate where your dealer coverage is thin or nothing. Rangpur, Kushtia, Mymensingh, Bogra - the hardest-to-reach farmers become reachable, with no distribution of your own to build.",
      bodyBn: "যেখানে আপনার ডিলারের নাগাল কম কিংবা একেবারেই নেই, সেখানে ফসলের 40+ হাব নেটওয়ার্ক খামারের দুয়ার পর্যন্ত পৌঁছে দেয়। রংপুর, কুষ্টিয়া, ময়মনসিংহ, বগুড়া - যে কৃষকদের কাছে পৌঁছানো সবচেয়ে কঠিন, তারা নাগালে চলে আসে, নিজের কোনো বিতরণব্যবস্থা গড়ার দরকার ছাড়াই।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "40+",
      displayBn: "40+",
      displayScale: "lg",
      body: "Fashol hubs across Bangladesh, each with cold chain and storage for agri inputs alongside produce.",
      bodyBn: "বাংলাদেশজুড়ে ফসল হাব, প্রতিটিতে কোল্ড চেইন আর কৃষিপণ্যের পাশাপাশি কৃষি ইনপুট রাখার স্টোরেজ।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/agin3.png",
      imageAlt:
        "An isometric dashboard showing crop cycles across districts, with subtle indicators for planting windows, active crops, and harvest periods",
      statement: "Know what the farmer grows before you sell it.",
      statementBn: "বিক্রির আগেই জানুন কৃষক কী ফলায়।",
      body: "Jogaan's transaction data shows what crops are planted, where, and at what stage. A rice pesticide reaches rice farmers at planting, not harvest. A winter-vegetable fertilizer reaches growers when they need it. Campaign-level targeting, not blast distribution.",
      bodyBn: "যোগানের লেনদেনের তথ্য দেখায় কোথায়, কোন ফসল, কোন পর্যায়ে আছে। ধানের কীটনাশক ধানচাষিদের কাছে পৌঁছায় রোপণের সময়, ফসল কাটার সময় নয়। শীতকালীন সবজির সার চাষির কাছে পৌঁছায় ঠিক যখন তার দরকার। ঢালাও বিতরণ নয়, ক্যাম্পেইন-পর্যায়ের নিশানা।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Financing",
      displayBn: "ফাইন্যান্সিং",
      displayScale: "md",
      body: "Farmers finance input purchases through Fashol, underwritten against their Jogaan transaction history. The addressable market expands without you carrying the credit risk.",
      bodyBn: "কৃষকরা ফসলের মাধ্যমে ইনপুট কেনার ফাইন্যান্সিং পান, যা তাদের যোগানের লেনদেনের ইতিহাসের ভিত্তিতে অনুমোদিত হয়। ক্রেডিটের ঝুঁকি আপনার ঘাড়ে না নিয়েই আপনার সম্ভাব্য বাজার বড় হয়।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "The dealer was the best option. There is a better one now.",
      statementBn: "ডিলারই ছিল সেরা উপায়। এখন এর চেয়ে ভালো একটা আছে।",
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
    headline: "Catalog mapping.",
    headlineBn: "ক্যাটালগ ম্যাপিং।",
    body: "A Fashol representative walks through your catalog, pricing, packaging, and crop-cycle relevance. Within 48 hours, your SKUs are mapped onto Jogaan and categorized.",
    bodyBn: "ফসলের একজন প্রতিনিধি আপনার ক্যাটালগ, দাম, প্যাকেজিং আর ফসল-চক্রের প্রাসঙ্গিকতা বুঝে নেন। 48 ঘণ্টার মধ্যে আপনার SKU যোগানে তোলা হয় এবং শ্রেণিবদ্ধ করা হয়।",
  },
  {
    n: "02",
    headline: "Listing goes live.",
    headlineBn: "লিস্টিং চালু হয়।",
    body: "Your products go live with images, specs, pricing, and recommended crop applications. Farmers across 50 districts see your catalog from day one.",
    bodyBn: "আপনার পণ্য ছবি, স্পেসিফিকেশন, দাম আর প্রস্তাবিত ফসলে ব্যবহারের নির্দেশনাসহ চালু হয়। প্রথম দিন থেকেই 50 জেলার কৃষকরা আপনার ক্যাটালগ দেখতে পান।",
  },
  {
    n: "03",
    headline: "First farmer orders.",
    headlineBn: "প্রথম কৃষকের অর্ডার।",
    body: "Farmers place orders. Fashol's hub network delivers to the farm gate, and payment settles to you same-day on every delivered order.",
    bodyBn: "কৃষকরা অর্ডার দেন। ফসলের হাব নেটওয়ার্ক খামারের দুয়ার পর্যন্ত পৌঁছে দেয়, আর প্রতিটি ডেলিভারি হওয়া অর্ডারের টাকা আপনার কাছে একই দিনে সেটেলমেন্ট হয়।",
  },
  {
    n: "04",
    headline: "Data flows back.",
    headlineBn: "তথ্য ফিরে আসে।",
    body: "You see who bought what, when, where, and for which crop. Your next campaign, launch, and distribution decision runs on live Jogaan data, not dealer reports.",
    bodyBn: "কে কী কিনল, কখন, কোথায় আর কোন ফসলের জন্য - সব আপনি দেখতে পান। আপনার পরবর্তী ক্যাম্পেইন, নতুন পণ্য ছাড়া আর বিতরণের সিদ্ধান্ত চলে যোগানের সরাসরি তথ্যে, ডিলারের রিপোর্টে নয়।",
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
      "যোগানে 60,000 নিবন্ধিত কৃষক, স্বচ্ছ দামে ফসল বিক্রি করছেন, একই দিনে সেটেলমেন্ট পাচ্ছেন, আর কৃষি ইনপুট, মেশিনারি ও ক্রেডিটের সুবিধা পাচ্ছেন।",
    href: "/solutions/farmers",
  },
  {
    name: "Agri machinery suppliers",
    nameBn: "কৃষি মেশিনারি সাপ্লায়ার",
    description:
      "Marketplace access for tractors, tillers, pumps, and harvest equipment. Farmer demand, last-mile logistics, and credit underwriting built in.",
    descriptionBn:
      "ট্রাক্টর, টিলার, পাম্প আর ফসল কাটার যন্ত্রপাতির জন্য মার্কেটপ্লেসের সুযোগ। কৃষকের চাহিদা, লাস্ট-মাইল লজিস্টিকস আর ক্রেডিট অনুমোদন - সবই সঙ্গে।",
    href: "/solutions/agri-machinery-suppliers",
  },
];



export function AgriInputContent() {
  const lang = useLang();
  const heroImageExists = true;

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
              alt="A Fashol hub with agri input supplies being distributed to farmers"
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

        {/* Forest-green gradient overlay: 90% at left, 0% at right */}
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(6, 94, 58, 0.9) 0%, rgba(6, 94, 58, 0.6) 40%, rgba(6, 94, 58, 0) 100%)",
          }}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Agri input suppliers.", "কৃষি ইনপুট সাপ্লায়ার।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px] !text-[rgba(255,251,234,0.82)]"
            >
              {t(
                lang,
                "Seeds, pesticides, fertilizers, feed, straight to the farmer. No dealer layers, no margin lost.",
                "বীজ, কীটনাশক, সার, খাদ্য - সরাসরি কৃষকের কাছে। কোনো ডিলারের স্তর নেই, মার্জিন হারানো নেই।",
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
                      sessionKey={`agri-input-hero-stat-${i}`}
                    />
                    {t(lang, s.tail, s.tailBn)}
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
                "Reaching a farmer has always meant paying someone who knows one.",
                "কৃষকের কাছে পৌঁছাতে হলে চিরকালই এমন কাউকে টাকা দিতে হয়েছে যে একজন কৃষককে চেনে।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Input companies in Bangladesh sell through dealers. Seed, fertilizer, and pesticide move from depots to dealers to retailers to farmers. Every hand takes a margin and adds a week. By the time a fertilizer bag reaches a farmer in Rangpur, it has passed through four parties and costs 30 percent more than the depot price.",
                "বাংলাদেশে ইনপুট কোম্পানিগুলো বিক্রি করে ডিলারের মাধ্যমে। বীজ, সার আর কীটনাশক ডিপো থেকে ডিলার, ডিলার থেকে রিটেইলার, তারপর কৃষকের কাছে যায়। প্রতিটি হাত মার্জিন কেটে নেয় আর এক সপ্তাহ যোগ করে। রংপুরের একজন কৃষকের কাছে এক বস্তা সার পৌঁছাতে পৌঁছাতে সেটি চার হাত ঘোরে আর ডিপো দরের চেয়ে 30 শতাংশ বেশি দাম পড়ে।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The problem runs deeper than margin. The input company cannot see its real customer. It knows what the dealer bought, not what the farmer planted. It cannot run crop-cycle campaigns without knowing what grows where, and it cannot reach farmers where dealer coverage is thin. When a product fails a farmer, the company hears about it last, if at all.",
                "সমস্যা মার্জিনের চেয়েও গভীরে। ইনপুট কোম্পানি তার আসল বায়ারকেই দেখতে পায় না। ডিলার কী কিনেছে তা সে জানে, কিন্তু কৃষক কী চাষ করেছে তা জানে না। কোথায় কী ফলে তা না জেনে ফসল-চক্রভিত্তিক ক্যাম্পেইন চালানো যায় না, আর যেখানে ডিলারের নাগাল কম সেখানকার কৃষকের কাছে পৌঁছানো যায় না। কোনো পণ্য কৃষককে হতাশ করলে কোম্পানি তা জানতে পারে সবার শেষে, জানতে পারলেও।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The dealer was the best option when there was nothing else. There is something else now.",
                "যখন আর কিছু ছিল না, তখন ডিলারই ছিল সেরা উপায়। এখন আর একটা কিছু আছে।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink) - count-up on 60,000 inside letter-spacing animation */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.06em"
            duration={1}
            className="!text-[var(--color-paper)] text-[44px] tablet:text-[68px] desktop:text-[92px] leading-[0.98]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            <CountUp
              to={60000}
              format="comma"
              duration={1200}
              trigger="inview"
              inviewMargin="0px 0px -30% 0px"
              sessionKey="agri-input-hinge-60000"
            />{" "}
            {t(lang, "farmers, one platform.", "কৃষক, এক প্ল্যাটফর্ম।")}
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
                "Jogaan, Bangladesh's largest farmer platform, has 60,000 registered farmers transacting every week. Join it and you reach them directly, with full visibility into who buys what, when, and where - no dealer layer in between.",
                "যোগান, বাংলাদেশের সবচেয়ে বড় কৃষক প্ল্যাটফর্ম, যেখানে 60,000 নিবন্ধিত কৃষক প্রতি সপ্তাহে লেনদেন করেন। এতে যোগ দিলে আপনি তাদের কাছে সরাসরি পৌঁছান, কে কী কেনে, কখন আর কোথায় - সবটা স্পষ্ট দেখতে পান, মাঝখানে কোনো ডিলারের স্তর ছাড়াই।",
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
                "Four things the dealer network was never going to give you.",
                "ডিলার নেটওয়ার্ক আপনাকে যে চারটি জিনিস কখনোই দিত না।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Direct farmer reach, last-mile distribution, crop-cycle data, and credit infrastructure. Every connection extends an input supplier's addressable market - it does not just digitize the dealer model.",
                "কৃষকের কাছে সরাসরি নাগাল, লাস্ট-মাইল বিতরণ, ফসল-চক্রের তথ্য আর ক্রেডিটের অবকাঠামো। প্রতিটি সংযোগ একজন ইনপুট সাপ্লায়ারর সম্ভাব্য বাজার বাড়ায় - এটি নিছক ডিলার মডেলকে ডিজিটাল করে দেয় না।",
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

      {/* Section 5 - Powered by (paper, single centered card) */}
      <Section tone="paper">
        <div className="text-center max-w-[720px] mx-auto">
          <Reveal as="h2" className="t-h2">
            {t(lang, "The product behind this work.", "এই কাজের পেছনের প্রোডাক্ট।")}
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 flex justify-center">
          <Reveal className="w-full max-w-[500px]">
            <article className="flex flex-col items-start">
              <Image
                src="/jogaanlogo.png"
                alt="Jogaan"
                width={1000}
                height={248}
                sizes="256px"
                quality={95}
                className="h-10 tablet:h-12 w-auto object-contain"
              />
              <p className="t-body mt-6">
                {t(
                  lang,
                  "The farmer platform. List your products on Jogaan and reach 60,000 registered farmers directly, with last-mile delivery through Fashol's 40+ hub network and optional Fashol-backed credit.",
                  "কৃষকের প্ল্যাটফর্ম। যোগানে আপনার পণ্য তালিকাভুক্ত করুন আর 60,000 নিবন্ধিত কৃষকের কাছে সরাসরি পৌঁছান, ফসলের 40+ হাব নেটওয়ার্কের মাধ্যমে লাস্ট-মাইল ডেলিভারি আর ঐচ্ছিক ফসল-সমর্থিত ক্রেডিটসহ।",
                )}
              </p>
              <div className="mt-6">
                <Link href="/products/jogaan" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্ট পেজ খুলুন")}
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
            {t(
              lang,
              "“We were selling fertilizer through 180 dealers across 28 districts and still losing farmers in the districts where dealer coverage was thin. Moving a portion of our distribution to Jogaan gave us direct visibility into farmer purchases for the first time. We stopped guessing who our customer was. Now we plan crop-cycle campaigns against live data instead of against dealer sales reports from two months ago.”",
              "“আমরা 28 জেলায় 180 জন ডিলারের মাধ্যমে সার বিক্রি করছিলাম, তবু যেসব জেলায় ডিলারের নাগাল কম, সেখানে কৃষক হারাচ্ছিলাম। আমাদের বিতরণের একটা অংশ যোগানে সরিয়ে আনায় প্রথমবারের মতো কৃষকের কেনাকাটা সরাসরি দেখতে পেলাম। আমাদের বায়ার কে, তা নিয়ে অনুমান করা বন্ধ হলো। এখন দুই মাস আগের ডিলার বিক্রির রিপোর্ট নয়, সরাসরি তথ্যের ভিত্তিতে ফসল-চক্রের ক্যাম্পেইন পরিকল্পনা করি।”",
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Rezaul Karim", "রেজাউল করিম")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                {t(
                  lang,
                  "Head of Distribution, fertilizer manufacturer, Dhaka",
                  "ডিস্ট্রিবিউশন প্রধান, সার প্রস্তুতকারক, ঢাকা",
                )}
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
                "Your catalog on Jogaan. Farmers ordering the same week.",
                "আপনার ক্যাটালগ যোগানে। একই সপ্তাহে কৃষকের অর্ডার।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "No long rollout. Fashol's agri-input team maps your catalog onto Jogaan within days. Farmers order as soon as it is live, Fashol handles last-mile fulfillment through the hub network, and the data flows back to you live.",
                "দীর্ঘ প্রস্তুতির দরকার নেই। ফসলের কৃষি-ইনপুট টিম কয়েক দিনের মধ্যেই আপনার ক্যাটালগ যোগানে তুলে দেয়। চালু হওয়ামাত্র কৃষকরা অর্ডার করেন, ফসল হাব নেটওয়ার্কের মাধ্যমে লাস্ট-মাইল সাপ্লাই সামলায়, আর তথ্য আপনার কাছে সরাসরি ফিরে আসে।",
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
              "Talk to Fashol's agri-input team",
              "ফসলের কৃষি-ইনপুট টিমের সঙ্গে কথা বলুন",
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
                <p className="t-body-sm mt-3">
                  {t(lang, r.description, r.descriptionBn)}
                </p>
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
// card is a centered, full-width statement.
// ------------------------------------------------------------------

function BentoCardView({ card, lang }: { card: BentoCard; lang: Lang }) {
  if (card.kind === "claim") return <ClaimCardView card={card} lang={lang} />;
  if (card.kind === "proof") return <ProofCardView card={card} lang={lang} />;
  return <ClosingCardView card={card} lang={lang} />;
}

function ClaimCardView({ card, lang }: { card: ClaimCard; lang: Lang }) {
  const imageReady = true;
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

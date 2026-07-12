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
  QuoteReveal,
  LetterSpaceReveal,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "Cold storage operators - Fashol",
  description:
    "Fashol partners with cold storage operators across Bangladesh to bring verified inbound bookings from 60,000 farmers and outbound orders from a buyer network of 7,000 mudi shops, 400+ restaurants, and 400+ supershop outlets. The facility stays yours. The traffic is what changes.",
};

const HERO_IMAGE_PATH = "/images/solutions/cold-storage-operators/hero.jpg";
const CLAIM_01_IMAGE = "/images/solutions/cold-storage-operators/claim-01.png";
const CLAIM_02_IMAGE = "/images/solutions/cold-storage-operators/claim-02.png";

type HeroStat = {
  n: number;
  format: "comma" | "plain";
  suffix: string;
  tail: string;
  label: string;
  labelBn: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    label: "Inbound farmer base",
    labelBn: "ইনবাউন্ড কৃষকভিত্তি",
  },
  {
    n: 7000,
    format: "comma",
    suffix: "+",
    tail: "",
    label: "Mudi shops, supershops, restaurants",
    labelBn: "মুদি দোকান, সুপারশপ, রেস্তোরাঁ",
  },
  {
    n: 50,
    format: "plain",
    suffix: "",
    tail: "",
    label: "Districts of operation",
    labelBn: "জেলায় কার্যক্রম",
  },
];

type AnchorCard = {
  kind: "anchor";
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleBn: string;
  body: string;
  bodyBn: string;
};

type TextCard = {
  kind: "text";
  title: string;
  titleBn: string;
  body: string;
  bodyBn: string;
};

type BentoCard = AnchorCard | TextCard;

type BentoEntry = {
  card: BentoCard;
  span: string;
};

const BENTO: ReadonlyArray<BentoEntry> = [
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "anchor",
      imageSrc: CLAIM_01_IMAGE,
      imageAlt:
        "An isometric diagram of farmer nodes routing to a cold storage facility, organized by season and district",
      title: "The farmer pipeline",
      titleBn: "কৃষকের পাইপলাইন",
      body: "60,000 farmers on the network need storage year-round. Fashol's hub team routes them to your facility by crop and season, in your district.",
      bodyBn: "নেটওয়ার্কের 60,000 কৃষকের সারা বছরই স্টোরেজ লাগে। ফসলের হাব টিম ফসল আর মৌসুম বুঝে, আপনার জেলাতেই তাদের আপনার স্টোরেজে পাঠায়।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "anchor",
      imageSrc: CLAIM_02_IMAGE,
      imageAlt:
        "An isometric diagram of a cold storage facility with outbound orders flowing to retailers, restaurants, and supershops",
      title: "The buyer network",
      titleBn: "বায়ারের নেটওয়ার্ক",
      body: "7,000 mudi shops, 400+ restaurants, and 400+ supershop outlets order against what is in storage. Your outbound turns from cold calls into a ledger of waiting buyers.",
      bodyBn: "7,000 মুদি দোকান, 400+ রেস্তোরাঁ আর 400+ সুপারশপ আউটলেট স্টোরেজে যা আছে তার বিপরীতে অর্ডার দেয়। আপনার আউটবাউন্ড আর খুঁজে খুঁজে বিক্রি নয়, অপেক্ষমাণ বায়ারদের একটা খতিয়ান।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Year-round, not just potato season",
      titleBn: "সারা বছর, শুধু আলুর মৌসুমে নয়",
      body: "Vegetables in summer, ginger and onion in winter, potato through spring. The calendar runs longer because the crop mix runs wider.",
      bodyBn: "গরমে সবজি, শীতে আদা আর পেঁয়াজ, বসন্তজুড়ে আলু। ফসলের বৈচিত্র্য বাড়ে বলেই মৌসুমের হিসাব দীর্ঘ হয়।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Bookings verified on the ledger",
      titleBn: "খতিয়ানে যাচাই করা বুকিং",
      body: "Every reservation is confirmed through the Fashol platform before the sacks arrive. No held slots that do not show up.",
      bodyBn: "বস্তা পৌঁছানোর আগেই প্রতিটি বুকিং ফসল প্ল্যাটফর্মে নিশ্চিত হয়। ধরে রাখা জায়গা খালি পড়ে থাকার ঝুঁকি নেই।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Volume forecast on harvest data",
      titleBn: "ফসলের তথ্যে পরিমাণের পূর্বাভাস",
      body: "Fashol's hub team projects regional harvest weeks ahead and books against your capacity. You plan against real numbers, not phone calls.",
      bodyBn: "ফসলের হাব টিম সপ্তাহ আগেই আঞ্চলিক ফসলের পূর্বাভাস দেয় আর আপনার ক্যাপাসিটির বিপরীতে বুকিং করে। ফোনকল নয়, সত্যিকারের সংখ্যার ভিত্তিতে আপনি পরিকল্পনা করেন।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Payment and reconciliation through Fashol",
      titleBn: "ফসলের মাধ্যমে পেমেন্ট ও হিসাব মেলানো",
      body: "Orders clear through the platform, reconciled against your storage records. No chasing traders for settlement.",
      bodyBn: "অর্ডার প্ল্যাটফর্মের মাধ্যমে সেটেলমেন্ট হয়, আপনার স্টোরেজের রেকর্ডের সঙ্গে মিলিয়ে দেখা হয়। টাকার জন্য ব্যবসায়ীদের পেছনে ছুটতে হয় না।",
    },
  },
];

type ProofTile = {
  figure: string;
  figureBn: string;
  label: string;
  labelBn: string;
};

const PROOF_STRIP: ReadonlyArray<ProofTile> = [
  {
    figure: "50 districts",
    figureBn: "50 জেলা",
    label: "Of operational coverage",
    labelBn: "কার্যক্রমের বিস্তারে",
  },
  {
    figure: "Full-cycle settlement",
    figureBn: "পূর্ণ চক্রের সেটেলমেন্ট",
    label: "Through the Fashol ledger",
    labelBn: "ফসলের খতিয়ানের মাধ্যমে",
  },
];

type Step = {
  n: string;
  headline: string;
  headlineBn: string;
  tagline: string;
  taglineBn: string;
  body: string;
  bodyBn: string;
};

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    headline: "Walk-through.",
    headlineBn: "সরেজমিন পরিদর্শন।",
    tagline: "We visit your facility.",
    taglineBn: "আমরা আপনার স্টোরেজে যাই।",
    body: "Understand your capacity, your current utilization rhythm, your crop mix. Map your district against our farmer base and buyer network.",
    bodyBn: "আপনার ক্যাপাসিটি, এখনকার ব্যবহারের ধরন আর ফসলের বৈচিত্র্য বুঝে নিই। আপনার জেলাকে আমাদের কৃষকভিত্তি ও বায়ার নেটওয়ার্কের সঙ্গে মিলিয়ে দেখি।",
  },
  {
    n: "02",
    headline: "Integration.",
    headlineBn: "সংযুক্তি।",
    tagline: "The ledger connects.",
    taglineBn: "খতিয়ান যুক্ত হয়।",
    body: "Your booking system connects to the Fashol platform. Capacity becomes visible to our inbound pipeline, inventory to our buyer desk.",
    bodyBn: "আপনার বুকিং ব্যবস্থা ফসল প্ল্যাটফর্মের সঙ্গে যুক্ত হয়। ক্যাপাসিটি আমাদের ইনবাউন্ড পাইপলাইনে, স্টক আমাদের বায়ার ডেস্কে দৃশ্যমান হয়।",
  },
  {
    n: "03",
    headline: "First cycle.",
    headlineBn: "প্রথম চক্র।",
    tagline: "Traffic begins.",
    taglineBn: "চলাচল শুরু হয়।",
    body: "Inbound farmers route through your facility, outbound orders pull from your floor. The Fashol hub team handles grading, pickup, and reconciliation.",
    bodyBn: "ইনবাউন্ড কৃষকেরা আপনার স্টোরেজ দিয়ে চলে, আউটবাউন্ড অর্ডার আপনার ফ্লোর থেকে টেনে নেয়। ফসলের হাব টিম গ্রেডিং, তুলে নেওয়া আর হিসাব মেলানো সামলায়।",
  },
  {
    n: "04",
    headline: "Standing partnership.",
    headlineBn: "স্থায়ী পার্টনারশিপ।",
    tagline: "The rhythm holds.",
    taglineBn: "ছন্দ ধরে থাকে।",
    body: "Pricing, volume forecasting, and seasonal planning happen together. You run a networked facility, not a rented one.",
    bodyBn: "দাম নির্ধারণ, পরিমাণের পূর্বাভাস আর মৌসুমি পরিকল্পনা একসঙ্গে হয়। আপনি ভাড়া দেওয়া নয়, নেটওয়ার্কযুক্ত একটি স্টোরেজ চালান।",
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
    nameBn: "আড়তদার",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and digital settlement.",
    descriptionBn:
      "ঐতিহ্যবাহী আড়তদার আধুনিক স্ট্যাকে, স্বচ্ছ দাম আর ডিজিটাল সেটেলমেন্টসহ।",
    href: "/solutions/commission-agents",
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
    name: "Farmers",
    nameBn: "কৃষক",
    description:
      "60,000 farmers on Jogaan, selling produce with transparent pricing, same-day settlement, and access to inputs and machinery.",
    descriptionBn:
      "যোগানে 60,000 কৃষক, স্বচ্ছ দামে পণ্য বিক্রি করছেন, একই দিনে সেটেলমেন্ট পাচ্ছেন, আর পাচ্ছেন ইনপুট ও মেশিনারির সুবিধা।",
    href: "/solutions/farmers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default async function ColdStorageOperatorsPage() {
  const lang = await getLang();
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo with forest-green gradient overlay) */}
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
              alt="A row of cold storage warehouses at industrial scale in Bangladesh"
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

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[44px] tablet:!text-[58px] desktop:!text-[72px]"
            >
              {t(
                lang,
                "Cold storage that sits inside the supply chain, not beside it.",
                "কোল্ড স্টোরেজ, যা সাপ্লাই চেইনের পাশে নয়, ভেতরে থাকে।",
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
                      sessionKey={`cso-hero-stat-${i}`}
                    />
                    {s.tail}
                  </dd>
                  <dt
                    className="mt-2 uppercase !text-[var(--color-paper)]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {t(lang, s.label, s.labelBn)}
                  </dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.48} className="mt-8 tablet:mt-10">
              <Button variant="on-dark" href="/contact">
                {t(lang, "Partner with Fashol", "ফসলের পার্টনার হন")}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (paper, two-column, no image, editorial closer) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "A building between two markets, integrated into neither.",
                "দুই বাজারের মাঝখানে দাঁড়ানো একটা ভবন, অথচ কোনোটার সঙ্গেই যুক্ত নয়।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Cold storage in Bangladesh is full for three months and empty for nine. Potato comes in after harvest and leaves before the next; in between the lights stay on with no traffic. Farmers book space and skip delivery. Traders reserve slots and skip payment. Rates are set by an association, margins stay thin, and it all runs in isolation - no direct line to the farmers who need storage or the buyers who need what is stored.",
                "বাংলাদেশে কোল্ড স্টোরেজ তিন মাস ভরা থাকে, নয় মাস খালি। ফসল কাটার পর আলু ঢোকে আর পরের মৌসুম আসার আগেই বেরিয়ে যায়; এর মাঝে কোনো চলাচল ছাড়াই বাতি জ্বলে থাকে। কৃষকেরা জায়গা বুকিং করে, কিন্তু পণ্য দেয় না। ব্যবসায়ীরা জায়গা ধরে রাখে, কিন্তু টাকা দেয় না। দাম ঠিক করে সমিতি, মার্জিন থাকে সরু, আর পুরোটাই চলে বিচ্ছিন্নভাবে - যে কৃষকের স্টোরেজ দরকার কিংবা যে বায়ারের স্টক পণ্য দরকার, কারও সঙ্গেই সরাসরি যোগ নেই।",
              )}
            </p>
          </Reveal>
        </div>

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
              {t(
                lang,
                "The facility is built. The network around it is not.",
                "স্টোরেজটা তৈরি। কিন্তু তার চারপাশের নেটওয়ার্কটা নয়।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink, phrase variant) */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.08em"
            duration={1.2}
            className="!text-[var(--color-paper)] text-[48px] tablet:text-[72px] desktop:text-[96px] leading-[1.02]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            {t(lang, "Booked inbound. Sold outbound.", "ঢোকে বুকিংয়ে। বেরোয় বিক্রিতে।")}
          </LetterSpaceReveal>
        </div>
      </Section>

      {/* Section 4 - Signature claims bento (surface-deep) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "What a Fashol partnership brings through your door.",
                "ফসলের সঙ্গে পার্টনারশিপ আপনার দরজায় যা নিয়ে আসে।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Two flows of traffic. Inbound from farmers, outbound to buyers. Underneath, a ledger that verifies bookings, forecasts volume, and clears payment across the cycle.",
                "দুই দিকের চলাচল। কৃষকের দিক থেকে ইনবাউন্ড, বায়ারের দিকে আউটবাউন্ড। এর নিচে একটি খতিয়ান, যা বুকিং যাচাই করে, পরিমাণের পূর্বাভাস দেয় আর গোটা চক্রজুড়ে পেমেন্ট সেটেলমেন্ট করে।",
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

        {/* Proof strip */}
        <div className="mt-12 tablet:mt-16 grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-10 border-t border-[var(--color-line)] pt-10 tablet:pt-12">
          {PROOF_STRIP.map((p) => (
            <Reveal key={p.figure} className="flex flex-col items-start">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-deep-green)",
                }}
              >
                {t(lang, p.figure, p.figureBn)}
              </span>
              <span
                className="mt-2 uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: "var(--color-ink-muted)",
                }}
              >
                {t(lang, p.label, p.labelBn)}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Editorial closing line */}
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
              {t(
                lang,
                "Cold storage that sits inside the supply chain, not beside it.",
                "কোল্ড স্টোরেজ, যা সাপ্লাই চেইনের পাশে নয়, ভেতরে থাকে।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 5 - Powered by (paper, 2-up) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "The systems that route through your facility.",
                "যে সিস্টেমগুলো আপনার স্টোরেজ দিয়ে চলে।",
              )}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/jogaanlogo.png"
                alt="Jogaan"
                width={1000}
                height={248}
                sizes="256px"
                quality={95}
                className="h-10 tablet:h-12 w-auto object-contain self-start"
              />
              <p
                className="mt-5"
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
                {t(lang, "Inbound from the farmer side.", "কৃষকের দিক থেকে ইনবাউন্ড।")}
              </p>
              <p className="t-body mt-4">
                {t(
                  lang,
                  "Farmers booking storage through the Fashol hub route their harvest to your facility. Jogaan handles registration, volume forecasting, and booking verification.",
                  "ফসল হাবের মাধ্যমে স্টোরেজ বুকিং করা কৃষকেরা তাদের ফসল আপনার স্টোরেজে পাঠায়। যোগান নিবন্ধন, পরিমাণের পূর্বাভাস আর বুকিং যাচাই সামলায়।",
                )}
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/jogaan" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্ট পেজ খুলুন")}
                </Link>
              </div>
            </article>
          </Reveal>
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
              <p
                className="mt-5"
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
                {t(lang, "Outbound to the buyer side.", "বায়ারের দিকে আউটবাউন্ড।")}
              </p>
              <p className="t-body mt-4">
                {t(
                  lang,
                  "Fashol's buyer desk places orders against inventory in your cold room. Hyperfarm runs the order flow for restaurants, supershops, quick commerce, and the wholesale trade.",
                  "ফসলের বায়ার ডেস্ক আপনার কোল্ড রুমের স্টকের বিপরীতে অর্ডার দেয়। হাইপারফার্ম রেস্তোরাঁ, সুপারশপ, কুইক কমার্স আর পাইকারি ব্যবসার অর্ডার প্রবাহ চালায়।",
                )}
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/hyperfarm" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্ট পেজ খুলুন")}
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - Pull quote (ink) */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[900px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {t(
              lang,
              "“We ran the cold storage for eighteen years. Full from February to May, empty the rest. Farmers would come with potato, and after potato moved out we would wait. Now Fashol sends us ginger farmers in October, onion in December, potato from February. And when it is time to sell, their buyers come to our door. It is not the same business anymore.”",
              "“আঠারো বছর ধরে কোল্ড স্টোরেজ চালিয়েছি। ফেব্রুয়ারি থেকে মে ভরা, বাকি সময় খালি। কৃষকেরা আলু নিয়ে আসত, আর আলু বেরিয়ে গেলে আমরা বসে থাকতাম। এখন ফসল আমাদের কাছে অক্টোবরে আদার কৃষক, ডিসেম্বরে পেঁয়াজ, ফেব্রুয়ারি থেকে আলু পাঠায়। আর বিক্রির সময় হলে ওদের বায়াররা আমাদের দরজায় আসে। এটা আর আগের সেই ব্যবসা নেই।”",
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Shahidul Islam", "শাহিদুল ইসলাম")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.65)" }}
              >
                {t(lang, "Cold storage operator, Munshiganj", "কোল্ড স্টোরেজ পরিচালক, মুন্সিগঞ্জ")}
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How the partnership starts (surface-deep, 4 step cards) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "How the partnership starts.", "পার্টনারশিপ যেভাবে শুরু হয়।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Partnership, not sign-up. A cycle of steps that sets the facility up to run networked.",
                "নিছক সাইন-আপ নয়, পার্টনারশিপ। কয়েক ধাপের একটি চক্র, যা স্টোরেজটিকে নেটওয়ার্কযুক্ত হয়ে চলার জন্য প্রস্তুত করে।",
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
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.005em",
                    color: "var(--color-deep-green)",
                  }}
                >
                  {t(lang, s.tagline, s.taglineBn)}
                </p>
                <p className="t-body-sm mt-3">{t(lang, s.body, s.bodyBn)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mt-10 tablet:mt-12">
          <Button variant="primary" href="/contact">
            {t(lang, "Partner with Fashol", "ফসলের পার্টনার হন")}
          </Button>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles (paper, 3 related cards) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "The rest of the chain runs on Fashol too.",
                "চেইনের বাকি অংশও চলে ফসলে।",
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
// Bento card rendering. Anchor cards carry an illustration, title, and
// body. Text cards are title + body only. No eyebrow tags, per the
// "less is more" rule.
// ------------------------------------------------------------------

function BentoCardView({ card, lang }: { card: BentoCard; lang: Lang }) {
  if (card.kind === "anchor")
    return <AnchorCardView card={card} lang={lang} />;
  return <TextCardView card={card} lang={lang} />;
}

function AnchorCardView({ card, lang }: { card: AnchorCard; lang: Lang }) {
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
          fontSize: "clamp(24px, 2.6vw, 36px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, card.title, card.titleBn)}
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

function TextCardView({ card, lang }: { card: TextCard; lang: Lang }) {
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "280px" }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(20px, 1.9vw, 24px)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, card.title, card.titleBn)}
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

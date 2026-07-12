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
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "Supershops - Fashol",
  description:
    "Wholesale pricing locked for the week, daily replenishment to every outlet, and cold-chain fulfillment that protects fresh produce margin. Fashol supplies Shwapno, Meena Bazar, Agora, and Daily Shopping across hundreds of outlets in Bangladesh.",
};

const HERO_IMAGE_PATH = "/sshero.jpg";

type HeroStat =
  | { kind: "text"; value: string; valueBn: string; label: string; labelBn: string }
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      suffixBn: string;
      label: string;
      labelBn: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "text",
    value: "Shwapno. Meena Bazar. Agora. Daily Shopping.",
    valueBn: "স্বপ্ন। মীনা বাজার। আগোরা। ডেইলি শপিং।",
    label: "Running on Fashol",
    labelBn: "ফসলে চলছে",
  },
  {
    kind: "number",
    n: 400,
    format: "plain",
    suffix: "+ outlets",
    suffixBn: "+ আউটলেট",
    label: "Across modern retail in Bangladesh",
    labelBn: "বাংলাদেশের মডার্ন রিটেইলজুড়ে",
  },
  {
    kind: "text",
    value: "Daily delivery",
    valueBn: "প্রতিদিন ডেলিভারি",
    label: "Cold-chain to every store",
    labelBn: "প্রতিটি স্টোরে কোল্ড-চেইন",
  },
];

// Bento card data types - discriminated union so each card variant renders
// with the right content slots.
type ClaimCard = {
  kind: "claim";
  tag: string;
  tagBn: string;
  imageSrc: string;
  imageAlt: string;
  statement: string;
  statementBn: string;
  body: string;
  bodyBn: string;
};

type ProofCard = {
  kind: "proof";
  tag: string;
  tagBn: string;
  display: string;
  displayBn: string;
  displayScale: "lg" | "md";
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
  // Tailwind col-span classes for each breakpoint tier (tablet 810+, desktop 1200+).
  span: string;
};

const BENTO: ReadonlyArray<BentoEntry> = [
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      tag: "CLAIM 01",
      tagBn: "দাবি 01",
      imageSrc: "/claim1.png",
      imageAlt:
        "An isometric scale with a price tag stable on top next to a flat-line indicator",
      statement: "Margin that holds for the week.",
      statementBn: "সপ্তাহজুড়ে অটুট মুনাফা।",
      body: "Wholesale pricing locked for the agreed window, regardless of spot-market shocks. The shelf price holds, the margin holds, the CFO's quarterly number stops moving.",
      bodyBn: "স্পট-মার্কেটের ধাক্কা যাই হোক, নির্ধারিত সময়ের জন্য পাইকারি দাম লক করা। তাকের দাম অটুট থাকে, মুনাফা অটুট থাকে, সিএফও-র প্রান্তিক হিসাব আর নড়ে না।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      tag: "CLAIM 02",
      tagBn: "দাবি 02",
      imageSrc: "/claim2.png",
      imageAlt:
        "An isometric delivery van tracing a supply route with multiple drop-off points",
      statement: "Daily replenishment to every outlet.",
      statementBn: "প্রতিটি আউটলেটে দৈনিক পুনঃসরবরাহ।",
      body: "Cold-chain delivery before opening hours to every store on the chain. No empty shelves at 10 AM. No overstock left at 9 PM. Volume per outlet is dialed against actual sell-through, not estimated demand.",
      bodyBn: "চেইনের প্রতিটি স্টোরে দোকান খোলার আগেই কোল্ড-চেইন ডেলিভারি। সকাল 10টায় খালি তাক নেই। রাত 9টায় জমে থাকা অতিরিক্ত স্টক নেই। প্রতিটি আউটলেটের পরিমাণ ঠিক হয় প্রকৃত বিক্রির ভিত্তিতে, আন্দাজের চাহিদায় নয়।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      tag: "PROOF POINT",
      tagBn: "প্রমাণ",
      display: "1,000+",
      displayBn: "1,000+",
      displayScale: "lg",
      body: "SKUs across fresh produce categories, available daily on Hyperfarm.",
      bodyBn: "টাটকা সবজির নানা শ্রেণিতে এসকেইউ, হাইপারফার্মে প্রতিদিন পাওয়া যায়।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      tag: "CLAIM 03",
      tagBn: "দাবি 03",
      imageSrc: "/claim3.png",
      imageAlt:
        "An isometric hub diagram showing one Fashol source connecting to many supershop outlets",
      statement: "One supplier across the whole chain.",
      statementBn: "গোটা চেইনজুড়ে একজন সাপ্লায়ার।",
      body: "A 20-plus outlet supershop chain on Fashol manages one invoice, one delivery contract, one quality SLA. Procurement teams stop reconciling across vendors. Category heads stop explaining inconsistency between branches.",
      bodyBn: "ফসলে চলা 20-এর বেশি আউটলেটের একটি সুপারশপ চেইন সামলায় একটি চালান, একটি ডেলিভারি চুক্তি, একটি কোয়ালিটি এসএলএ। সংগ্রহ টিম নানা বিক্রেতার হিসাব মেলানো বন্ধ করে। ক্যাটাগরি হেডরা শাখায় শাখায় অসামঞ্জস্যের কৈফিয়ত দেওয়া বন্ধ করেন।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      tag: "PROOF POINT",
      tagBn: "প্রমাণ",
      display: "4-tier",
      displayBn: "4 স্তর",
      displayScale: "md",
      body: "Grading applied at Fashol's hub before dispatch. Only the agreed grade reaches the outlet.",
      bodyBn: "পাঠানোর আগেই ফসলের হাবে গ্রেডিং করা হয়। শুধু নির্ধারিত গ্রেডটিই আউটলেটে পৌঁছায়।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement: "Graded at origin. Delivered shelf-ready, every morning.",
      statementBn: "উৎসেই গ্রেড করা। তাকের জন্য প্রস্তুত হয়ে পৌঁছায়, প্রতিদিন সকালে।",
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
    headlineBn: "আলোচনা।",
    body: "A Fashol supershop representative walks through the chain's current produce program - SKU list, weekly volumes per outlet, supplier roster, margin baseline, freshness SLAs.",
    bodyBn: "ফসলের একজন সুপারশপ প্রতিনিধি চেইনের বর্তমান সবজি কর্মসূচি নিয়ে আলোচনা করেন - এসকেইউ তালিকা, প্রতিটি আউটলেটের সাপ্তাহিক পরিমাণ, সাপ্লায়ার তালিকা, মুনাফার ভিত্তি, সতেজতার এসএলএ।",
  },
  {
    n: "02",
    headline: "First outlet live.",
    headlineBn: "প্রথম আউটলেট চালু।",
    body: "Within 72 hours, one outlet starts running on Fashol. Cold-chain fulfillment, four-tier grading, daily replenishment. The chain's procurement team monitors against the existing supply for the first three days.",
    bodyBn: "72 ঘণ্টার মধ্যে একটি আউটলেট ফসলে চলতে শুরু করে। কোল্ড-চেইন সরবরাহ, চার স্তরের গ্রেডিং, দৈনিক পুনঃসরবরাহ। চেইনের সংগ্রহ টিম প্রথম তিন দিন বিদ্যমান সরবরাহের সাথে মিলিয়ে পর্যবেক্ষণ করে।",
  },
  {
    n: "03",
    headline: "Margin baseline confirmed.",
    headlineBn: "মুনাফার ভিত্তি নিশ্চিত।",
    body: "End of day five, the chain reviews the first outlet's margin, freshness, and replenishment performance against the rest of the network. Pricing windows are locked for the chain rollout.",
    bodyBn: "পঞ্চম দিনের শেষে চেইন প্রথম আউটলেটের মুনাফা, সতেজতা আর পুনঃসরবরাহের ফলাফল বাকি নেটওয়ার্কের সাথে মিলিয়ে দেখে। গোটা চেইনে চালুর জন্য দামের সময়সীমা লক করা হয়।",
  },
  {
    n: "04",
    headline: "Full chain live.",
    headlineBn: "গোটা চেইন চালু।",
    body: "Days six and seven, the remaining outlets onboard in waves. The trade team stays embedded for the first month to tune SKU mix, replenishment volume, and quality SLAs per outlet.",
    bodyBn: "ষষ্ঠ ও সপ্তম দিনে বাকি আউটলেটগুলো ধাপে ধাপে যুক্ত হয়। প্রতিটি আউটলেটের এসকেইউ মিশ্রণ, পুনঃসরবরাহের পরিমাণ আর কোয়ালিটি এসএলএ ঠিক করতে ট্রেড টিম প্রথম মাস পাশে থাকে।",
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
    name: "Restaurants",
    nameBn: "রেস্তোরাঁ",
    description:
      "Morning delivery for 400+ restaurants including Domino's, with grading at the hub and transparent wholesale pricing.",
    descriptionBn:
      "ডমিনোজসহ 400+ রেস্তোরাঁর জন্য সকালের ডেলিভারি, সঙ্গে হাবে গ্রেডিং আর স্বচ্ছ পাইকারি দাম।",
    href: "/solutions/restaurants",
  },
  {
    name: "Quick commerce",
    nameBn: "কুইক কমার্স",
    description:
      "Fill rate above 95% for Foodpanda, Chaldal, and Foodie, with same-day fulfillment to every dark store in Dhaka.",
    descriptionBn:
      "ফুডপান্ডা, চালডাল আর ফুডির জন্য 95%-এর বেশি ফিল রেট, সঙ্গে ঢাকার প্রতিটি ডার্ক স্টোরে একই দিনে সরবরাহ।",
    href: "/solutions/quick-commerce",
  },
  {
    name: "Retailers",
    nameBn: "রিটেইলার",
    description:
      "Supply partnerships for smaller retail chains and corner stores, with consistent grading and dependable volumes.",
    descriptionBn:
      "ছোট রিটেইল চেইন আর মোড়ের দোকানের জন্য সাপ্লাই পার্টনারশিপ, সঙ্গে ধারাবাহিক গ্রেডিং আর নির্ভরযোগ্য পরিমাণ।",
    href: "/solutions/retailers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default async function SupershopsPage() {
  const lang = await getLang();
  const heroImageExists = publicFileExists(HERO_IMAGE_PATH);

  return (
    <>
      {/* Section 1 - Hero (photo, no overlay) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        {heroImageExists && (
          <Reveal
            delay={0}
            duration={0.8}
            y={0}
            amount={0}
            className="absolute inset-0 z-0"
          >
            <Image
              src={HERO_IMAGE_PATH}
              alt="A modern supershop produce aisle in Bangladesh"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
          </Reveal>
        )}

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Supershops.", "সুপারশপ।")}
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-start max-w-[260px]"
                >
                  <dd
                    className="t-tabular text-[18px] tablet:text-[20px] desktop:text-[22px] leading-[1.15] !text-[var(--color-paper)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.kind === "number" ? (
                      <CountUp
                        to={s.n}
                        format={s.format}
                        suffix={t(lang, s.suffix, s.suffixBn)}
                        duration={1200}
                        delay={i * 150}
                        sessionKey={`supershops-hero-stat-${i}`}
                      />
                    ) : (
                      <Reveal
                        as="span"
                        delay={0.24 + i * 0.12}
                        duration={0.6}
                        y={0}
                      >
                        {t(lang, s.value, s.valueBn)}
                      </Reveal>
                    )}
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
              {t(lang, "Fresh produce is where supershop margins quietly disappear.", "টাটকা সবজিতেই নীরবে হারিয়ে যায় সুপারশপের মুনাফা।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Fresh produce does two jobs at once: it pulls shoppers in every week and quietly eats the most margin. Tomato prices swing 30 percent in a week while the shelf price cannot. Suppliers ship Grade B on a Grade A contract, forcing discounts to clear stock. A late van means empty shelves and smaller baskets.",
                "টাটকা সবজি একসাথে দুটি কাজ করে: প্রতি সপ্তাহে ক্রেতা টানে, আর নীরবে সবচেয়ে বেশি মুনাফা খেয়ে ফেলে। এক সপ্তাহে টমেটোর দাম 30 শতাংশ ওঠানামা করে, অথচ তাকের দাম বদলানো যায় না। সাপ্লায়াররা গ্রেড এ চুক্তিতে গ্রেড বি পাঠায়, ফলে স্টক খালি করতে ছাড় দিতে হয়। একটা ভ্যান দেরিতে আসা মানে খালি তাক আর ছোট বাজারের ঝুড়ি।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Most supershops juggle a roster of suppliers - vegetables, fruits, leafy greens, imports - each with its own pricing, quality, and reliability. Procurement spends mornings reconciling invoices and afternoons explaining shrinkage. The CFO sees margin swing every quarter and cannot tell a supplier issue from a market or forecasting one.",
                "বেশির ভাগ সুপারশপকে সামলাতে হয় একগাদা সাপ্লায়ার - সবজি, ফল, শাক, আমদানি পণ্য - প্রত্যেকের আলাদা দাম, কোয়ালিটি আর নির্ভরযোগ্যতা। সংগ্রহ টিমের সকাল কাটে চালান মেলাতে আর বিকেল কাটে ক্ষতির কৈফিয়ত দিতে। সিএফও প্রতি প্রান্তিকে মুনাফার ওঠানামা দেখেন, কিন্তু বলতে পারেন না সেটা সাপ্লায়ারের সমস্যা, নাকি বাজারের, নাকি পূর্বাভাসের।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Fresh produce should be a stable contributor, not a volatility center. The supply chain is what makes the difference.",
                "টাটকা সবজির হওয়া উচিত একটি স্থিতিশীল আয়ের উৎস, অস্থিরতার কেন্দ্র নয়। পার্থক্যটা গড়ে দেয় সাপ্লাই চেইনই।",
              )}
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
              {t(lang, "Up to", "সর্বোচ্চ")}{" "}
              <CountUp
                to={18}
                duration={1000}
                trigger="inview"
                sessionKey="supershops-hinge-18"
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
              {t(
                lang,
                "The fresh produce margin a supershop typically protects on Fashol versus a spot-market model. Pricing locked for the week, grading at the hub, daily replenishment to every outlet - the volatility disappears.",
                "স্পট-মার্কেট মডেলের তুলনায় ফসলে একটি সুপারশপ সাধারণত টাটকা সবজিতে যতটা মুনাফা রক্ষা করে। সপ্তাহজুড়ে নির্ধারিত দাম, হাবে গ্রেডিং, প্রতিটি আউটলেটে দৈনিক পুনঃসরবরাহ - অস্থিরতা মিলিয়ে যায়।",
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
              {t(lang, "Four things the procurement desk and the CFO both want.", "সংগ্রহ ডেস্ক আর সিএফও - দুজনেই চান এমন চারটি জিনিস।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Margin protection, replenishment reliability, multi-outlet coordination, and shelf-ready freshness. Every Fashol delivery to a supershop is built around these four, every day.",
                "মুনাফা রক্ষা, নির্ভরযোগ্য পুনঃসরবরাহ, একাধিক আউটলেটের সমন্বয়, আর তাকের জন্য প্রস্তুত সতেজতা। সুপারশপে ফসলের প্রতিটি ডেলিভারি প্রতিদিন এই চারটি ঘিরেই গড়া।",
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

      {/* Section 5 - Powered by (paper) */}
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
                src="/images/content/hyperfarm-logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain"
              />
              <p className="t-body mt-6">
                {t(
                  lang,
                  "The buyer procurement desk. Supershop chains use Hyperfarm to lock weekly pricing, schedule outlet replenishment, track quality SLAs, and reconcile multi-outlet supply on a single platform.",
                  "বায়ারের সংগ্রহ ডেস্ক। সুপারশপ চেইন হাইপারফার্ম ব্যবহার করে সাপ্তাহিক দাম লক করতে, আউটলেটের পুনঃসরবরাহ সূচি করতে, কোয়ালিটি এসএলএ পর্যবেক্ষণ করতে আর একটিমাত্র প্ল্যাটফর্মে একাধিক আউটলেটের সরবরাহ মেলাতে।",
                )}
              </p>
              <div className="mt-6">
                <Link href="/products/hyperfarm" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্ট পৃষ্ঠা দেখুন")}
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
            &ldquo;{t(
              lang,
              "We were running fresh produce across nine suppliers, and our margin was a different story every quarter. Once we moved produce supply to Fashol, the procurement team stopped chasing invoices and category heads stopped chasing variance reports. The number that moves is volume now, not margin.",
              "আমরা টাটকা সবজি চালাতাম নয়জন সাপ্লায়ারের মাধ্যমে, আর আমাদের মুনাফা প্রতি প্রান্তিকে ছিল ভিন্ন এক গল্প। সবজির সরবরাহ ফসলে নিয়ে আসার পর সংগ্রহ টিম চালানের পেছনে ছোটা বন্ধ করল, আর ক্যাটাগরি হেডরা তারতম্যের রিপোর্টের পেছনে ছোটা বন্ধ করলেন। এখন যে সংখ্যাটা নড়ে তা পরিমাণ, মুনাফা নয়।",
            )}&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Mahmud Hasan", "মাহমুদ হাসান")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                {t(lang, "Category Head, Fresh Produce, Shwapno", "ক্যাটাগরি হেড, ফ্রেশ প্রোডিউস, স্বপ্ন")}
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
              {t(lang, "One outlet first. Then the rest of the chain in one week.", "প্রথমে একটি আউটলেট। তারপর এক সপ্তাহে গোটা চেইন।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Supershop chains do not switch produce supply lightly, so Fashol pilots one outlet first. Day one is the conversation: SKU list, weekly volume per outlet, supplier mix, margin baseline. Day three the outlet is live; day seven the full chain runs on Fashol. The trade team stays embedded the first month to tune SKU mix per outlet.",
                "সুপারশপ চেইন সহজে সবজির সরবরাহ বদলায় না, তাই ফসল প্রথমে একটি আউটলেট দিয়ে পাইলট চালায়। প্রথম দিন আলোচনা: এসকেইউ তালিকা, প্রতিটি আউটলেটের সাপ্তাহিক পরিমাণ, সাপ্লায়ার মিশ্রণ, মুনাফার ভিত্তি। তৃতীয় দিনে আউটলেট চালু; সপ্তম দিনে গোটা চেইন ফসলে চলে। প্রতিটি আউটলেটের এসকেইউ মিশ্রণ ঠিক করতে ট্রেড টিম প্রথম মাস পাশে থাকে।",
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
            {t(lang, "Talk to Fashol's supershop team", "ফসলের সুপারশপ টিমের সাথে কথা বলুন")}
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain (paper) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "The rest of the demand side runs on Fashol too.", "চাহিদার দিকের বাকি অংশও ফসলে চলে।")}
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
// Bento card rendering. Each card variant sits in a --card-bg block
// (brighter cream on surface-deep sections) with a tag at top-right
// plus variant-specific content below.
// ------------------------------------------------------------------

function BentoCardView({ card, lang }: { card: BentoCard; lang: Lang }) {
  if (card.kind === "claim") return <ClaimCardView card={card} lang={lang} />;
  if (card.kind === "proof") return <ProofCardView card={card} lang={lang} />;
  return <ClosingCardView card={card} lang={lang} />;
}

function CardTag({ text }: { text: string }) {
  return (
    <span
      className="t-mono text-[11px] tracking-[0.14em] uppercase absolute top-6 right-6 tablet:top-8 tablet:right-8"
      style={{ color: "rgba(6, 94, 58, 0.55)" }}
    >
      {text}
    </span>
  );
}

function ClaimCardView({ card, lang }: { card: ClaimCard; lang: Lang }) {
  const imageReady = publicFileExists(card.imageSrc);
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "360px" }}
    >
      <CardTag text={t(lang, card.tag, card.tagBn)} />
      <div className="pt-4">
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
        }
      : {
          fontSize: "clamp(40px, 4.4vw, 64px)",
          letterSpacing: "-0.025em",
        };

  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{ backgroundColor: "var(--card-bg)", minHeight: "320px" }}
    >
      <CardTag text={t(lang, card.tag, card.tagBn)} />
      <h3
        className="pt-10"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          lineHeight: 1,
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

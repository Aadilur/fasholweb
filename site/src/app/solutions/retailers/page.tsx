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
  title: "Retailers - Fashol",
  description:
    "Fresh produce delivered to your mudi shop before 6 AM, without the 4 AM trip to Karwan Bazar. Wholesale prices, quality dialed to your shop, no minimum order. Fashol has served 7,000+ mudi shops across Bangladesh for six years.",
};

const HERO_IMAGE_PATH = "/rehero.jpg";

type HeroStat =
  | { kind: "text"; value: string; valueBn: string; label: string; labelBn: string }
  | {
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
    label: "Mudi shops served, six years of supply",
    labelBn: "মুদি দোকানে সরবরাহ, ছয় বছর ধরে",
  },
  {
    kind: "text",
    value: "Before 6 AM",
    valueBn: "ভোর 6টার আগে",
    label: "Daily delivery to your shop",
    labelBn: "প্রতিদিন আপনার দোকানে ডেলিভারি",
  },
  {
    kind: "text",
    value: "Grade matched",
    valueBn: "গ্রেড মিলিয়ে",
    label: "Quality dialed to your shop",
    labelBn: "আপনার দোকান অনুযায়ী কোয়ালিটি",
  },
];

// Bento card types. Three display scales on Proof cards cover the range from
// short numeric displays ("6 years") to phrase-length text ("Cash on delivery").
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
      imageSrc: "/re1.png",
      imageAlt:
        "An isometric mudi shop with produce arriving at the door from a delivery van, owner opening the shutter",
      statement: "Your sleep back.",
      statementBn: "আপনার ঘুম ফিরে পান।",
      body: "Fashol delivers to your shop before 6 AM, every day. Stop sleeping four hours. Stop driving to Karwan Bazar. Open your shop rested, with produce already stacked at the door.",
      bodyBn: "ফসল প্রতিদিন ভোর 6টার আগেই আপনার দোকানে পৌঁছে দেয়। চার ঘণ্টার ঘুম আর নয়। কারওয়ান বাজারে ছোটাছুটি আর নয়। বিশ্রাম নিয়ে দোকান খুলুন, সবজি তখন দরজাতেই সাজানো।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/re3.png",
      imageAlt:
        "An isometric phone showing a simple price list with a stable flat-line indicator",
      statement: "Wholesale prices, delivered.",
      statementBn: "পাইকারি দাম, দোরগোড়ায়।",
      body: "The same prices you would pay at the wholesale market, with delivery included. No more vendor haggling. No more price shocks on tomato days. You know the price before you order.",
      bodyBn: "পাইকারি বাজারে আপনি যে দাম দিতেন, ঠিক সেই দাম - সাথে ডেলিভারিও। বিক্রেতার সাথে দরদাম আর নয়। টমেটোর দিনে দামের ধাক্কা আর নয়। অর্ডার দেওয়ার আগেই আপনি দাম জানেন।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "6 years",
      displayBn: "6 বছর",
      displayScale: "lg",
      body: "Of daily mudi shop supply across Bangladesh. Same shops, same routes, same trust.",
      bodyBn: "সারা বাংলাদেশে মুদি দোকানে দৈনিক সরবরাহের। একই দোকান, একই পথ, একই আস্থা।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "claim",
      imageSrc: "/re2.png",
      imageAlt:
        "An isometric row of mudi shops receiving produce in crates of varying fills, suggesting different quality grades without labels",
      statement: "Whatever grade you want.",
      statementBn: "আপনি যে গ্রেড চান।",
      body: "Different neighborhoods, different customers. Fashol grades produce to match what your customers buy - premium where premium sells, standard where standard sells. Your margin holds because quality matches price.",
      bodyBn: "ভিন্ন এলাকা, ভিন্ন ক্রেতা। ফসল সবজি এমনভাবে গ্রেড করে যা আপনার ক্রেতারা কেনেন তার সাথে মেলে - যেখানে প্রিমিয়াম বিকোয় সেখানে প্রিমিয়াম, যেখানে সাধারণ বিকোয় সেখানে সাধারণ। কোয়ালিটি দামের সাথে মেলে বলেই আপনার মুনাফা ঠিক থাকে।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "proof",
      display: "Cash on delivery",
      displayBn: "ক্যাশ অন ডেলিভারি",
      displayScale: "sm",
      body: "Pay on delivery, every order. No contracts, no deposits, no monthly invoicing. The business runs on the same terms your shop does.",
      bodyBn: "প্রতিটি অর্ডারে ডেলিভারির সময় টাকা দিন। কোনো চুক্তি নেই, জামানত নেই, মাসিক চালান নেই। আপনার দোকান যে শর্তে চলে, এই ব্যবসাও সেই শর্তেই চলে।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-4",
    card: {
      kind: "closing",
      statement:
        "The market comes to the shop now. Not the other way around.",
      statementBn: "এখন বাজারই দোকানে আসে। উল্টোটা নয়।",
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
    headline: "WhatsApp message.",
    headlineBn: "হোয়াটসঅ্যাপ বার্তা।",
    body: "Send a message to Fashol's mudi shop team listing what you usually buy and where your shop is located. A team member confirms within an hour.",
    bodyBn: "ফসলের মুদি দোকান টিমকে একটি বার্তা পাঠান, যেখানে আপনি সাধারণত যা কেনেন আর আপনার দোকান কোথায় তা লিখুন। এক ঘণ্টার মধ্যে একজন টিম সদস্য নিশ্চিত করবেন।",
  },
  {
    n: "02",
    headline: "Next-day delivery.",
    headlineBn: "পরদিনই ডেলিভারি।",
    body: "The next morning, before 6 AM, Fashol delivers your first order to your shop. Cold-chain, graded for your shop, wholesale prices. Pay cash on delivery.",
    bodyBn: "পরদিন সকালে, ভোর 6টার আগেই, ফসল আপনার প্রথম অর্ডার দোকানে পৌঁছে দেয়। কোল্ড-চেইন, আপনার দোকান অনুযায়ী গ্রেড করা, পাইকারি দাম। ডেলিভারির সময় ক্যাশে পরিশোধ করুন।",
  },
  {
    n: "03",
    headline: "Daily or weekly orders.",
    headlineBn: "দৈনিক বা সাপ্তাহিক অর্ডার।",
    body: "Order daily, weekly, or whenever you need. Change your order by WhatsApp any evening before 9 PM. No minimum, no maximum, no contract.",
    bodyBn: "প্রতিদিন, প্রতি সপ্তাহে, বা যখন দরকার তখনই অর্ডার দিন। রাত 9টার আগে যেকোনো সন্ধ্যায় হোয়াটসঅ্যাপে অর্ডার বদলান। কোনো ন্যূনতম নেই, সর্বোচ্চ নেই, চুক্তিও নেই।",
  },
  {
    n: "04",
    headline: "Your sleep back.",
    headlineBn: "আপনার ঘুম ফিরে পান।",
    body: "Stop going to the market. Open your shop when it is time to open, rested, with produce already at the door.",
    bodyBn: "বাজারে যাওয়া বন্ধ করুন। যখন দোকান খোলার সময় তখনই খুলুন - বিশ্রাম নিয়ে, সবজি তখন দরজাতেই।",
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
    name: "Supershops",
    nameBn: "সুপারশপ",
    description:
      "Daily replenishment for Shwapno, Meena Bazar, Agora, and Daily Shopping, with pricing locked for the week.",
    descriptionBn:
      "স্বপ্ন, মীনা বাজার, আগোরা আর ডেইলি শপিংয়ের জন্য দৈনিক পুনঃসরবরাহ, সঙ্গে সপ্তাহজুড়ে নির্ধারিত দাম।",
    href: "/solutions/supershops",
  },
  {
    name: "Quick commerce",
    nameBn: "কুইক কমার্স",
    description:
      "Fill rate above 95% for Foodpanda, Chaldal, and Foodie, with same-day fulfillment to every dark store.",
    descriptionBn:
      "ফুডপান্ডা, চালডাল আর ফুডির জন্য 95%-এর বেশি ফিল রেট, সঙ্গে প্রতিটি ডার্ক স্টোরে একই দিনে সরবরাহ।",
    href: "/solutions/quick-commerce",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default async function RetailersPage() {
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
              alt="A mudi shop in Dhaka with fresh produce on display at the front"
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
              {t(lang, "Retailers.", "রিটেইলার।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[620px] !text-[rgba(255,251,234,0.78)]"
            >
              {t(
                lang,
                "Fresh produce at your shop before 6 AM. Wholesale prices. No minimum order.",
                "ভোর 6টার আগেই আপনার দোকানে টাটকা সবজি। পাইকারি দাম। কোনো ন্যূনতম অর্ডার নেই।",
              )}
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
                        suffix={s.suffix}
                        duration={1200}
                        delay={i * 150}
                        sessionKey={`retailers-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">
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
              {t(lang, "A mudi shop owner does three jobs before the shop opens.", "দোকান খোলার আগেই একজন মুদি দোকানি তিনটি কাজ সেরে ফেলেন।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A mudi shop in Bangladesh is three businesses before sunrise. At 4 AM the owner haggles for the day's produce at Karwan Bazar or the nearest wholesale market. By 6 AM it is back and stacked for display. By 7 AM the shutters go up and the counter runs twelve hours. The morning run is not optional.",
                "বাংলাদেশে একটি মুদি দোকান সূর্য ওঠার আগেই যেন তিনটি ব্যবসা। ভোর 4টায় দোকানি কারওয়ান বাজার বা কাছের পাইকারি বাজারে গিয়ে সেদিনের সবজির দরদাম করেন। 6টার মধ্যে তা দোকানে ফিরে সাজানো হয়। 7টার মধ্যে শাটার ওঠে, আর কাউন্টার চলে টানা বারো ঘণ্টা। সকালের এই ছোটাছুটি এড়ানোর উপায় নেই।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The run costs more than hours. Prices are whatever the vendor decides; quality is whatever is left on arrival. Transport back adds cost, delay, and risk. One owner cannot match the supershop chains on price or freshness, or scale without help they cannot afford.",
                "এই ছোটাছুটির দাম শুধু সময় নয়। দাম যা বিক্রেতা ঠিক করেন তা-ই; মান বলতে পৌঁছানোর পর যা পড়ে থাকে তা-ই। ফেরার পরিবহন যোগ করে বাড়তি খরচ, দেরি আর ঝুঁকি। একা একজন দোকানি দাম বা সতেজতায় সুপারশপ চেইনের সাথে পেরে ওঠেন না, আর যে সাহায্য তাঁর সাধ্যের বাইরে তা ছাড়া বড়ও হতে পারেন না।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "A mudi shop does not need a procurement team. It needs a supply partner that brings the market to the shop, not the other way around.",
                "একটি মুদি দোকানের কোনো সংগ্রহ টিম লাগে না। লাগে এমন একজন সাপ্লাই পার্টনার, যে বাজারকে দোকানে এনে দেয় - উল্টোটা নয়।",
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
            {t(lang, "No minimum order.", "কোনো ন্যূনতম অর্ডার নেই।")}
          </LetterSpaceReveal>
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
                "Order what you need, when you need it. Fashol delivers to mudi shops starting from a single crate. No wholesale contracts, no volume commitments, no haggling. Cash on delivery, wholesale prices, quality graded for your shop.",
                "যা দরকার, যখন দরকার, ততটুকুই অর্ডার করুন। ফসল মুদি দোকানে পৌঁছে দেয় একটি ঝুড়ি থেকেই শুরু করে। কোনো পাইকারি চুক্তি নেই, পরিমাণের বাধ্যবাধকতা নেই, দরদাম নেই। ক্যাশ অন ডেলিভারি, পাইকারি দাম, আর আপনার দোকান অনুযায়ী গ্রেড করা কোয়ালিটি।",
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
              {t(lang, "Four reasons to stop going to the market.", "বাজারে যাওয়া বন্ধ করার চারটি কারণ।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Your sleep back, wholesale prices, quality dialed to your shop, and no minimum order. Every Fashol delivery to a mudi shop is built around these four.",
                "আপনার ঘুম ফিরে পাওয়া, পাইকারি দাম, দোকান অনুযায়ী কোয়ালিটি, আর কোনো ন্যূনতম অর্ডার নয়। মুদি দোকানে ফসলের প্রতিটি ডেলিভারি এই চারটি ঘিরেই গড়া।",
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
                  "The buyer procurement desk. Mudi shop owners order daily from Hyperfarm - by phone, by WhatsApp, or from the app - and receive cold-chain delivery before opening hours at wholesale prices.",
                  "বায়ারের সংগ্রহ ডেস্ক। মুদি দোকানিরা হাইপারফার্ম থেকে প্রতিদিন অর্ডার দেন - ফোনে, হোয়াটসঅ্যাপে, কিংবা অ্যাপ থেকে - আর দোকান খোলার আগেই পাইকারি দামে কোল্ড-চেইন ডেলিভারি পান।",
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
              "I went to Karwan Bazar every morning at 4 AM for nineteen years. My daughter asked me once when the last time was I had breakfast with her before school. I could not remember. I stopped going to the market six months ago when Fashol started bringing the produce to the shop. Now I have breakfast with my daughter. That is the real thing this business gave me.",
              "উনিশ বছর ধরে আমি প্রতিদিন ভোর 4টায় কারওয়ান বাজারে যেতাম। একদিন আমার মেয়ে জিজ্ঞেস করল, স্কুলে যাওয়ার আগে শেষ কবে তার সাথে নাশতা করেছিলাম। মনে করতে পারিনি। ছয় মাস আগে ফসল যখন দোকানে সবজি আনতে শুরু করল, আমি বাজারে যাওয়া বন্ধ করে দিলাম। এখন মেয়ের সাথে নাশতা করি। এই ব্যবসা আমাকে আসলে এটাই দিয়েছে।",
            )}&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Mohammad Salam", "মোহাম্মদ সালাম")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                {t(lang, "Mudi shop owner, Mohakhali, Dhaka", "মুদি দোকানি, মহাখালী, ঢাকা")}
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
              {t(lang, "One WhatsApp message. Next morning, delivered.", "একটি হোয়াটসঅ্যাপ বার্তা। পরদিন সকালেই ডেলিভারি।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Mudi shops need no contracts or onboarding. WhatsApp Fashol's mudi shop team what you normally buy, and Fashol delivers the next morning, cash on delivery. It grows from there.",
                "মুদি দোকানের কোনো চুক্তি বা অনবোর্ডিং লাগে না। আপনি সাধারণত যা কেনেন তা ফসলের মুদি দোকান টিমকে হোয়াটসঅ্যাপে জানান, আর ফসল পরদিন সকালে ক্যাশ অন ডেলিভারিতে পৌঁছে দেয়। এরপর সেখান থেকেই বাড়তে থাকে।",
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
            {t(lang, "Message Fashol's mudi shop team", "ফসলের মুদি দোকান টিমকে বার্তা পাঠান")}
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
// Bento card rendering. Three variants sit in a --card-bg block
// (brighter cream on surface-deep sections). Claim cards carry an
// illustration; Proof cards display a big value; Closing card is a
// full-width centered statement.
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
            // sm - phrase-length text like "Cash on delivery".
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

"use client";

import { useLang } from "@/components/site/LanguageProvider";
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
import { t } from "@/lib/i18n";


type HeroStat = {
  n: number;
  format: "comma" | "plain";
  suffix: string;
  tail: string;
  tailBn: string;
  l: string;
  lBn: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  { n: 60000, format: "comma", suffix: "+", tail: "", tailBn: "", l: "Registered farmers", lBn: "নিবন্ধিত কৃষক" },
  { n: 24, format: "plain", suffix: "", tail: " hr", tailBn: " ঘণ্টা", l: "Settlement window", lBn: "সেটেলমেন্টের সময়" },
  { n: 200, format: "plain", suffix: "+", tail: "", tailBn: "", l: "Wholesale markets benchmarked", lBn: "যাচাই করা পাইকারি বাজার" },
];

const BENEFITS: ReadonlyArray<{
  n: string;
  headline: string;
  headlineBn: string;
  body: string;
  bodyBn: string;
  img: string;
  imgAlt: string;
}> = [
  {
    n: "01",
    headline: "A fair price, benchmarked live.",
    headlineBn: "ন্যায্য দাম, বাজারের সাথে তাৎক্ষণিক মিলিয়ে।",
    body: "Jogaan shows Fashol's morning price, benchmarked against live data from 200-plus wholesale markets across Bangladesh. The farmer checks before leaving home, and sells only when the price beats the market.",
    bodyBn: "যোগান দেখায় ফসলের সকালের দাম, যা বাংলাদেশের 200-এর বেশি পাইকারি বাজারের তাৎক্ষণিক তথ্যের সাথে মিলিয়ে দেওয়া। কৃষক ঘর থেকে বেরোনোর আগেই দেখে নেন, আর দাম বাজারদরকে ছাড়িয়ে গেলে তবেই বিক্রি করেন।",
    img: "/images/farmer-value/value-01.png",
    imgAlt: "A farmer checking crop prices on a phone",
  },
  {
    n: "02",
    headline: "Payment in 24 hours, straight to bKash.",
    headlineBn: "24 ঘণ্টায় পেমেন্ট, সরাসরি বিকাশে।",
    body: "Settlement lands in the farmer's mobile money wallet within 24 hours of weighing at the hub. No invoices, no follow-up trips, no middleman deductions. The receipt sits in the app, and the farmer can show it to anyone.",
    bodyBn: "হাবে ওজন করার 24 ঘণ্টার মধ্যেই টাকা পৌঁছে যায় কৃষকের মোবাইল মানি ওয়ালেটে। কোনো চালান নেই, বারবার ছোটাছুটি নেই, মধ্যস্বত্বভোগীর কাটছাঁটও নেই। রসিদ থাকে অ্যাপেই, কৃষক তা যে কাউকে দেখাতে পারেন।",
    img: "/images/farmer-value/value-02.png",
    imgAlt: "A smartphone with coins flowing into it, representing instant payment",
  },
  {
    n: "03",
    headline: "A marketplace for seed, feed, and machinery.",
    headlineBn: "বীজ, খাদ্য আর যন্ত্রপাতির একটি মার্কেটপ্লেস।",
    body: "A marketplace for quality-verified inputs: seed, pesticide, feed, and machinery, at prices Fashol negotiates for the whole network. Farmers order from the same app they sell on.",
    bodyBn: "কোয়ালিটি যাচাই করা উপকরণের মার্কেটপ্লেস: বীজ, কীটনাশক, পশুখাদ্য আর যন্ত্রপাতি - ফসল যে দাম গোটা নেটওয়ার্কের জন্য দর কষে ঠিক করে, সেই দামেই। কৃষকরা যে অ্যাপে বিক্রি করেন, সেই অ্যাপেই অর্ডার দেন।",
    img: "/images/farmer-value/value-03.png",
    imgAlt: "A display of seed, feed, and farm machinery",
  },
  {
    n: "04",
    headline: "Financing, underwritten by the farmer's own record.",
    headlineBn: "অর্থায়ন, কৃষকের নিজের লেনদেনের রেকর্ডের ভিত্তিতে।",
    body: "Launching 2026: input loans and seasonal working capital, offered with banks against each farmer's Jogaan transaction history. No collateral, no branch visits. The sales record is the credit file.",
    bodyBn: "2026 সালে আসছে: উপকরণ ঋণ আর মৌসুমি চলতি মূলধন, ব্যাংকের সাথে মিলে দেওয়া হবে প্রতিটি কৃষকের যোগান লেনদেনের ইতিহাসের ভিত্তিতে। কোনো জামানত নেই, ব্যাংকের শাখায় যাওয়া নেই। বিক্রির রেকর্ডই হলো ঋণের ফাইল।",
    img: "/images/farmer-value/value-04.png",
    imgAlt: "Hands cupping a growing plant with coins, representing financing",
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
    headline: "A field agent visits the village.",
    headlineBn: "একজন মাঠকর্মী গ্রামে আসেন।",
    body: "Fashol's field agent visits the farmer's village, confirms the farmer's crops, growing cycle, and volume, and helps register the farmer on Jogaan.",
    bodyBn: "ফসলের মাঠকর্মী কৃষকের গ্রামে আসেন, তাঁর ফসল, চাষের সময়কাল আর পরিমাণ যাচাই করেন, এবং কৃষককে যোগান-এ নিবন্ধন করতে সাহায্য করেন।",
  },
  {
    n: "02",
    headline: "Jogaan goes on the phone.",
    headlineBn: "ফোনে আসে যোগান।",
    body: "The agent walks the farmer through installing Jogaan on their phone and sets up the farmer's bKash or other mobile money wallet for settlement. No bank account required.",
    bodyBn: "মাঠকর্মী কৃষককে তাঁর ফোনে যোগান ইনস্টল করতে দেখিয়ে দেন এবং সেটেলমেন্টের জন্য কৃষকের বিকাশ বা অন্য মোবাইল মানি ওয়ালেট ঠিক করে দেন। কোনো ব্যাংক অ্যাকাউন্ট লাগে না।",
  },
  {
    n: "03",
    headline: "First harvest sold.",
    headlineBn: "প্রথম ফসল বিক্রি।",
    body: "On the next harvest day, the agent returns. The crop is weighed and graded at the farm gate, and the farmer sees the price on the app before the crop leaves. Payment lands in the wallet within 24 hours.",
    bodyBn: "পরের ফসল কাটার দিনে মাঠকর্মী আবার আসেন। জমির পাশেই ফসল ওজন ও গ্রেডিং করা হয়, আর ফসল যাওয়ার আগেই কৃষক অ্যাপে দাম দেখে নেন। 24 ঘণ্টার মধ্যে টাকা ওয়ালেটে চলে আসে।",
  },
  {
    n: "04",
    headline: "The farmer runs it themselves.",
    headlineBn: "কৃষক নিজেই সব সামলান।",
    body: "After the first few transactions, the farmer runs the process independently. The field agent stays available on WhatsApp, but Jogaan handles the weighing, pricing, payment, and record on its own.",
    bodyBn: "প্রথম কয়েকটি লেনদেনের পর কৃষক নিজেই পুরো কাজটি চালান। মাঠকর্মী হোয়াটসঅ্যাপে পাশে থাকেন, তবে ওজন, দাম, পেমেন্ট আর রেকর্ড - সবই যোগান নিজে থেকে সামলে নেয়।",
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
    name: "Agri input suppliers",
    nameBn: "কৃষি উপকরণ সাপ্লায়ার",
    description:
      "Distribution into the Fashol farmer network for seed, feed, and pesticide companies.",
    descriptionBn:
      "বীজ, খাদ্য আর কীটনাশক কোম্পানির জন্য ফসলের কৃষক নেটওয়ার্কে প্রোডাক্ট ডিস্ট্রিবিউশনের সুযোগ।",
    href: "/solutions/agri-input-suppliers",
  },
  {
    name: "Agri machinery suppliers",
    nameBn: "কৃষি যন্ত্রপাতি সাপ্লায়ার",
    description:
      "Marketplace access to farmer demand for tractors, tillers, and harvest equipment.",
    descriptionBn:
      "ট্রাক্টর, টিলার আর ফসল কাটার যন্ত্রের জন্য কৃষকের চাহিদার মার্কেটপ্লেসে প্রবেশাধিকার।",
    href: "/solutions/agri-machinery-suppliers",
  },
];


export function FarmersContent() {
  const lang = useLang();
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
            src="/shero1.jpeg"
            alt="Bangladeshi farmers working in a rice paddy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Reveal>

        {/* Layer 2 - Deep-green overlay (responsive direction)
            rgba values = site's --color-deep-green (#065E3A) with varying alpha. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,94,58,0.2), rgba(6,94,58,0.8))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(6,94,58,0.9) 0%, rgba(6,94,58,0.7) 45%, rgba(6,94,58,0.2) 70%, rgba(6,94,58,0) 100%)",
          }}
        />

        {/* Layer 3 - Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[600px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Farmers.", "কৃষক।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[520px] !text-[rgba(255,251,234,0.75)]"
            >
              {t(
                lang,
                "A fair price for every crop, payment in 24 hours, and a marketplace for everything that goes into the field.",
                "প্রতিটি ফসলের ন্যায্য দাম, 24 ঘণ্টায় পেমেন্ট, আর মাঠের সব উপকরণের জন্য একটি মার্কেটপ্লেস।",
              )}
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
                    <CountUp
                      to={s.n}
                      format={s.format}
                      suffix={s.suffix}
                      duration={1200}
                      delay={i * 150}
                      sessionKey={`farmers-hero-stat-${i}`}
                    />
                    {t(lang, s.tail, s.tailBn)}
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">{t(lang, s.l, s.lBn)}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
              <Button
                variant="on-dark"
                href="https://play.google.com/store/apps/details?id=com.fashol.agent"
                external
              >
                {t(lang, "Sell with Fashol", "ফসলের সাথে বিক্রি করুন")}
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
              {t(lang, "The chain was built against the farmer.", "সাপ্লাই চেইন গড়ে উঠেছিল কৃষকের বিরুদ্ধেই।")}
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/i1.jpeg"
                alt="A rural Bangladeshi farmer working in the traditional supply chain"
                width={5568}
                height={3712}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Historically the farmer had one buyer: the mahajan at the farm gate. He pays whatever the day allows and discounts the crop against next season's seed loan. The farmer never sees the Dhaka market price and has no receipt.",
                "চিরকাল কৃষকের বায়ার ছিল একজনই: জমির পাশে দাঁড়িয়ে থাকা মহাজন। সেদিনের বাজার যতটুকু দেয় তিনি ততটুকুই দেন, আর আগামী মৌসুমের বীজঋণের হিসাব কেটে ফসলের দাম কমিয়ে দেন। কৃষক কখনো ঢাকার বাজারদর দেখেন না, হাতে থাকে না কোনো রসিদও।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Payment takes two to four weeks. Deductions appear on settlement day - transport, handling, unseen losses - with no way to contest them. This is how the chain has always worked.",
                "টাকা পেতে লাগে দুই থেকে চার সপ্তাহ। সেটেলমেন্টের দিনে হঠাৎ হাজির হয় নানা কাটছাঁট - পরিবহন, হ্যান্ডলিং, চোখে না পড়া ক্ষতি - অথচ তা নিয়ে প্রশ্ন তোলার কোনো উপায় নেই। সাপ্লাই চেইন চিরকাল এভাবেই চলে এসেছে।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Access to seed, pesticide, feed, and machinery runs through the same middlemen. Access to credit does not exist at all, unless the farmer signs away the next harvest.",
                "বীজ, কীটনাশক, পশুখাদ্য আর যন্ত্রপাতি - সবকিছুর নাগাল মেলে সেই একই মধ্যস্বত্বভোগীদের হাত ঘুরে। আর ঋণের সুযোগ বলতে কিছুই নেই, যদি না কৃষক আগামী ফসল বন্ধক দিয়ে দেন।",
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
              {t(lang, "Up to", "সর্বোচ্চ")}{" "}
              <CountUp
                to={20}
                duration={1500}
                trigger="inview"
                inviewMargin="0px 0px -30% 0px"
                sessionKey="farmers-hinge-20"
              />
              %
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="t-body-lg mt-6 tablet:mt-8 max-w-[600px] mx-auto"
              style={{ color: "rgba(255, 251, 234, 0.75)" }}
            >
              {t(
                lang,
                "Price uplift for a Fashol farmer over what the traditional chain pays.",
                "প্রচলিত সাপ্লাই চেইন যা দেয়, তার চেয়ে ফসলের একজন কৃষক এতটা বেশি দাম পান।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 4 - What Fashol does for farmers (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "Fashol broke the chain and built a better one.", "ফসল পুরোনো সাপ্লাই চেইন ভেঙে গড়েছে আরও ভালো একটি।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Every farmer registered on Jogaan gets four things the old chain could not offer them. This is the core of what we do on the supplier side.",
                "যোগান-এ নিবন্ধিত প্রতিটি কৃষক এমন চারটি জিনিস পান, পুরোনো সাপ্লাই চেইন যা কখনো দিতে পারেনি। সাপ্লাই সাইডে আমাদের কাজের মূলটা এখানেই।",
              )}
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {BENEFITS.map((b) => (
            <StaggerItem key={b.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--card-bg)] text-[var(--color-ink)] rounded-[4px] p-8">
                <Image
                  src={b.img}
                  alt={b.imgAlt}
                  width={120}
                  height={120}
                  sizes="120px"
                  className="w-[120px] h-[120px] object-contain"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-6">
                  {b.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {t(lang, b.headline, b.headlineBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, b.body, b.bodyBn)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 5 - Powered by */}
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
                src="/jogaanlogo.png"
                alt="Jogaan"
                width={1000}
                height={248}
                sizes="400px"
                className="h-10 tablet:h-12 w-auto object-contain self-start"
              />
              <p className="t-body mt-6">
                {t(
                  lang,
                  "The farmer's app. Price alerts, settlement, marketplace, and record.",
                  "কৃষকের অ্যাপ। দামের অ্যালার্ট, সেটেলমেন্ট, মার্কেটপ্লেস আর রেকর্ড।",
                )}
              </p>
              <div className="mt-auto pt-8">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.fashol.agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  {t(lang, "Download on Google Play", "গুগল প্লে থেকে ডাউনলোড করুন")}
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - In their words (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[640px]">
          <Reveal>
            <div className="mx-auto relative w-[64px] h-[64px] rounded-full overflow-hidden bg-[var(--color-grain)]">
              <Image
                src="/images/voices/voice-01.jpg"
                alt="Abdul Karim, farmer in Jessore"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote
              className="mt-6 tablet:mt-8 !text-[var(--color-paper)] text-[20px] tablet:text-[24px] desktop:text-[28px] leading-[1.45]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              &ldquo;{t(
                lang,
                "Before Fashol, I used to take my cauliflower to the mahajan and accept whatever price he gave that morning. Now I see the price on my phone the night before. If it's not good, I wait a day.",
                "ফসল আসার আগে আমি আমার ফুলকপি মহাজনের কাছে নিয়ে যেতাম, সকালে সে যে দাম দিত তাতেই রাজি হতাম। এখন আগের রাতেই ফোনে দাম দেখে নিই। দাম পছন্দ না হলে একটা দিন অপেক্ষা করি।",
              )}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-6 flex flex-col items-center">
              <span
                className="text-[14px] !text-[var(--color-paper)]"
                style={{ fontWeight: 500 }}
              >
                {t(lang, "Abdul Karim", "আব্দুল করিম")}
              </span>
              <span className="text-[12px] !text-[rgba(255,251,234,0.6)] mt-1">
                {t(lang, "Farmer, Jessore", "কৃষক, যশোর")}
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
              {t(lang, "Two weeks from first conversation to first sale.", "প্রথম কথা থেকে প্রথম বিক্রি, দুই সপ্তাহে।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Farmers onboard through Fashol's field agents, who handle registration, WhatsApp group enrollment, and the first few transactions together with the farmer. No paperwork required at the farmer's end.",
                "কৃষকরা যুক্ত হন ফসলের মাঠকর্মীদের মাধ্যমে, যাঁরা নিবন্ধন, হোয়াটসঅ্যাপ গ্রুপে যুক্ত করা আর প্রথম কয়েকটি লেনদেন কৃষকের সাথে থেকে সামলে দেন। কৃষকের দিক থেকে কোনো কাগজপত্রের ঝামেলা নেই।",
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
              "Contact Fashol to enroll your farming community",
              "আপনার কৃষক সম্প্রদায়কে যুক্ত করতে ফসলের সাথে যোগাযোগ করুন",
            )}
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "Fashol serves the rest of the chain too.", "ফসল সাপ্লাই চেইনের বাকি অংশকেও সেবা দেয়।")}
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

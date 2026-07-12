import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  title: "Quick commerce - Fashol",
  description:
    "Fill rate above 95%, on-demand scale for surges, and wholesale pricing that holds. Fashol powers fresh produce supply for Foodpanda, Chaldal, and Foodie across Dhaka.",
};

type HeroStat = {
  value: string;
  valueBn: string;
  label: string;
  labelBn: string;
};

const HERO_STATS: ReadonlyArray<HeroStat> = [
  { value: "Foodpanda. Chaldal. Foodie.", valueBn: "ফুডপান্ডা। চালডাল। ফুডি।", label: "Running on Fashol", labelBn: "ফসলে চলছে" },
  { value: "Thousands of SKUs", valueBn: "হাজার হাজার এসকেইউ", label: "Available daily, dark-store ready", labelBn: "প্রতিদিন প্রস্তুত, ডার্ক স্টোরের জন্য তৈরি" },
  { value: "Same-day", valueBn: "একই দিনে", label: "To every dark store in Dhaka", labelBn: "ঢাকার প্রতিটি ডার্ক স্টোরে" },
];

type PromiseCardData =
  | {
      kind: "illustration";
      imageSrc: string;
      imageAlt: string;
      statement: string;
      statementBn: string;
      body: string;
      bodyBn: string;
      span: 1 | 2;
    }
  | {
      kind: "stat";
      display: string;
      displayBn: string;
      body: string;
      bodyBn: string;
      span: 1 | 2;
    };

const PROMISE_IMAGES_READY: ReadonlySet<string> = new Set<string>([
  "/qc1.png",
  "/qc2.png",
  "/qc3.png",
]);

const PROMISES: ReadonlyArray<PromiseCardData> = [
  {
    kind: "illustration",
    imageSrc: "/qc1.png",
    imageAlt:
      "An isometric dark-store interior with shelves of fresh produce crates stocked in orderly rows",
    statement: "Fill rate that holds.",
    statementBn: "স্থির ফিল রেট।",
    body: "Above 95% fill rate on fresh produce. Dark store inventory is planned against Fashol's confirmed daily supply, not against market hopes.",
    bodyBn: "টাটকা সবজিতে 95%-এর বেশি ফিল রেট। ডার্ক স্টোরের ইনভেন্টরি পরিকল্পনা হয় ফসলের নিশ্চিত দৈনিক সরবরাহের ভিত্তিতে, বাজারের আশার উপর নয়।",
    span: 2,
  },
  {
    kind: "illustration",
    imageSrc: "/qc2.png",
    imageAlt:
      "A line illustration of a bar chart with a tall lime-green peak and a person observing demand scaling up",
    statement: "Scale that matches demand.",
    statementBn: "চাহিদার সাথে মেলানো সক্ষমতা।",
    body: "Weekend spikes, Ramadan surges, Eid demand. Fashol's 60,000-farmer network absorbs surges without price chaos or stockouts. Dark stores plan campaigns knowing supply will be there.",
    bodyBn: "সপ্তাহান্তের চাপ, রমজানের ঢল, ঈদের চাহিদা। ফসলের 60,000 কৃষকের নেটওয়ার্ক দামের বিশৃঙ্খলা বা স্টক ফুরানো ছাড়াই এই চাপ সামলে নেয়। সরবরাহ থাকবে জেনেই ডার্ক স্টোরগুলো ক্যাম্পেইনের পরিকল্পনা করে।",
    span: 2,
  },
  {
    kind: "stat",
    display: "5 AM to 10 PM",
    displayBn: "সকাল 5টা থেকে রাত 10টা",
    body: "Same-day cold-chain delivery windows to every dark store in Dhaka.",
    bodyBn: "ঢাকার প্রতিটি ডার্ক স্টোরে একই দিনে কোল্ড-চেইন ডেলিভারির সময়।",
    span: 1,
  },
  {
    kind: "illustration",
    imageSrc: "/qc3.png",
    imageAlt:
      "A line illustration of a price tag and pricing dashboard showing a flat stable line",
    statement: "Pricing that does not move mid-shift.",
    statementBn: "যে দাম শিফটের মাঝপথে বদলায় না।",
    body: "Wholesale prices locked for the delivery window. A shopper sees Tk 60 per kg at 2 PM and pays Tk 60 at checkout. The platform does not absorb hidden spot-market shifts between order and fulfillment.",
    bodyBn: "ডেলিভারির সময়ের জন্য পাইকারি দাম নির্ধারিত। একজন ক্রেতা দুপুর 2টায় কেজিপ্রতি 60 টাকা দেখেন আর চেকআউটে 60 টাকাই দেন। অর্ডার আর সরবরাহের মাঝে স্পট-মার্কেটের লুকানো ওঠানামা প্ল্যাটফর্মকে বইতে হয় না।",
    span: 2,
  },
  {
    kind: "stat",
    display: "1,000+",
    displayBn: "1,000+",
    body: "SKUs across fresh produce categories, updated live on Hyperfarm.",
    bodyBn: "টাটকা সবজির নানা শ্রেণিতে এসকেইউ, হাইপারফার্মে তাৎক্ষণিক হালনাগাদ।",
    span: 1,
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
    headline: "Forecast shared.",
    headlineBn: "পূর্বাভাস শেয়ার।",
    body: "A Fashol q-commerce representative walks through the platform's current SKU list, daily volumes, peak patterns, and delivery windows per dark store. One call, usually under an hour.",
    bodyBn: "ফসলের একজন কিউ-কমার্স প্রতিনিধি প্ল্যাটফর্মের বর্তমান এসকেইউ তালিকা, দৈনিক পরিমাণ, চাপের ধরন আর প্রতিটি ডার্ক স্টোরের ডেলিভারির সময় নিয়ে আলোচনা করেন। একটি কল, সাধারণত এক ঘণ্টারও কম।",
  },
  {
    n: "02",
    headline: "SKU mapping and pricing.",
    headlineBn: "এসকেইউ ম্যাপিং আর দাম।",
    body: "Within hours, the platform's produce list is mapped to Hyperfarm SKUs with daily pricing locked for the delivery window. The platform approves the list before it goes live.",
    bodyBn: "কয়েক ঘণ্টার মধ্যেই প্ল্যাটফর্মের সবজির তালিকা হাইপারফার্মের এসকেইউ-এর সাথে মেলানো হয়, ডেলিভারির সময়ের জন্য দৈনিক দাম নির্ধারিত করে। তালিকা চালু হওয়ার আগে প্ল্যাটফর্ম তা অনুমোদন করে।",
  },
  {
    n: "03",
    headline: "First dark store live.",
    headlineBn: "প্রথম ডার্ক স্টোর চালু।",
    body: "The next morning, Fashol delivers to the first dark store. Fill rate, freshness, and delivery timing are tracked hourly for the first three days and tuned with the platform's ops team in real time.",
    bodyBn: "পরদিন সকালে ফসল প্রথম ডার্ক স্টোরে সরবরাহ করে। প্রথম তিন দিন প্রতি ঘণ্টায় ফিল রেট, সতেজতা আর ডেলিভারির সময় পর্যবেক্ষণ করা হয় এবং প্ল্যাটফর্মের অপস টিমের সাথে তাৎক্ষণিকভাবে ঠিক করা হয়।",
  },
  {
    n: "04",
    headline: "Full coverage.",
    headlineBn: "পূর্ণ কভারেজ।",
    body: "Remaining dark stores onboard over the following days using the first store's profile as the template. Fashol's trade team stays embedded for the first month to tune fill rate and SKU coverage across the full network.",
    bodyBn: "প্রথম স্টোরের প্রোফাইলকে নমুনা ধরে বাকি ডার্ক স্টোরগুলো পরের দিনগুলোতে যুক্ত হয়। গোটা নেটওয়ার্কজুড়ে ফিল রেট আর এসকেইউ কভারেজ ঠিক করতে ফসলের ট্রেড টিম প্রথম মাস পাশে থাকে।",
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
      "Supply partnerships for retail chains with consistent grading and dependable volumes.",
    descriptionBn:
      "রিটেইল চেইনের জন্য সাপ্লাই পার্টনারশিপ, সঙ্গে ধারাবাহিক গ্রেডিং আর নির্ভরযোগ্য পরিমাণ।",
    href: "/solutions/supershops",
  },
  {
    name: "Wholesalers",
    nameBn: "পাইকার",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    descriptionBn:
      "পাইকারি বাণিজ্যের পেছনে একটি আধুনিক সাপ্লাই স্ট্যাক, সঙ্গে 50 জেলা থেকে সংগ্রহ আর একই দিনে সেটেলমেন্ট।",
    href: "/solutions/wholesalers",
  },
];

export default async function QuickCommercePage() {
  const lang = await getLang();
  return (
    <>
      {/* Section 1 - Hero (photo, forest green gradient, content aligned left) */}
      <section
        className="relative min-h-[600px] h-[90vh] overflow-hidden"
        style={{ backgroundColor: "var(--color-deep-green)" }}
      >
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/qchero1.jpg"
            alt="A food delivery rider navigating Dhaka traffic on a motorbike"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px] tablet:whitespace-nowrap"
            >
              {t(lang, "Quick commerce.", "কুইক কমার্স।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[560px] !text-[rgba(0,0,0,0.8)]"
            >
              {t(
                lang,
                "Fill rate that holds, scale for festival surges, and wholesale prices that do not move mid-shift. Fashol keeps Dhaka's dark stores full, every order.",
                "স্থির ফিল রেট, উৎসবের চাপ সামলানোর সক্ষমতা, আর পাইকারি দাম যা শিফটের মাঝপথে বদলায় না। ফসল ঢাকার ডার্ক স্টোরগুলো ভরা রাখে, প্রতিটি অর্ডারে।",
              )}
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-10">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-start max-w-[240px]">
                  <Reveal
                    as="span"
                    delay={0.24 + i * 0.12}
                    duration={0.6}
                    y={0}
                    className="text-[18px] tablet:text-[20px] desktop:text-[22px] leading-[1.15] !text-[var(--color-ink)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t(lang, s.value, s.valueBn)}
                  </Reveal>
                  <Reveal
                    as="span"
                    delay={0.3 + i * 0.12}
                    duration={0.6}
                    y={0}
                    className="t-caption mt-2 !text-[rgba(0,0,0,0.7)]"
                  >
                    {t(lang, s.label, s.labelBn)}
                  </Reveal>
                </div>
              ))}
            </dl>
            <Reveal delay={0.48} className="mt-8 tablet:mt-10">
              <TalkToSalesButton />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (paper, two-column, image below H2) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "Fresh produce is where quick commerce fulfillment breaks.", "কুইক কমার্সের সরবরাহ ভেঙে পড়ে টাটকা সবজিতেই।")}
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/qc4.jpg"
                alt="A dark-store operator checking fresh produce stock in Dhaka"
                width={1200}
                height={800}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A quick commerce platform promises one thing: the order arrives fresh, within the window. Packaged goods are easy; fresh produce breaks the model. A shopper on Foodpanda or Chaldal orders tomatoes at 2 PM and expects them by 3. If the dark store ran out at noon, took them in wilted at 6 AM, or paid 40 percent more than yesterday, fill rate and reputation take the hit.",
                "একটি কুইক কমার্স প্ল্যাটফর্ম একটি জিনিসেরই প্রতিশ্রুতি দেয়: অর্ডার টাটকা অবস্থায়, নির্ধারিত সময়ের মধ্যে পৌঁছাবে। প্যাকেটজাত পণ্য সহজ; টাটকা সবজি এই মডেল ভেঙে দেয়। ফুডপান্ডা বা চালডালের একজন ক্রেতা দুপুর 2টায় টমেটোর অর্ডার দেন আর 3টার মধ্যে চান। ডার্ক স্টোরের যদি দুপুরেই স্টক ফুরিয়ে যায়, ভোর 6টায় নেতিয়ে পড়া মাল ঢোকে, কিংবা গতকালের চেয়ে 40 শতাংশ বেশি দাম দিতে হয় - তাহলে ফিল রেট আর সুনাম দুটোই ধাক্কা খায়।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The old model runs on early-morning trips to the wholesale market - whatever the vendor had, at whatever the spot price was. Dark stores plan inventory on hope. Popular SKUs stock out weekly, and price swings force the platform to absorb the volatility or pass it to customers. Neither lasts.",
                "পুরোনো মডেল চলে ভোরবেলা পাইকারি বাজারে ছোটাছুটির ওপর - বিক্রেতার হাতে যা ছিল, স্পট দাম যা ছিল, তাতেই। ডার্ক স্টোরগুলো আশার ওপর ইনভেন্টরি সাজায়। জনপ্রিয় এসকেইউ প্রতি সপ্তাহে ফুরিয়ে যায়, আর দামের ওঠানামা প্ল্যাটফর্মকে বাধ্য করে হয় সেই অস্থিরতা নিজে বইতে, নয়তো ক্রেতার ঘাড়ে চাপাতে। কোনোটাই টেকে না।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Quick commerce needs a supply partner that treats fresh produce like a warehouse SKU - predictable, priced, delivered.",
                "কুইক কমার্সের দরকার এমন একজন সাপ্লাই পার্টনার, যে টাটকা সবজিকে একটি গুদামের এসকেইউ-এর মতোই দেখে - অনুমেয়, দামসহ, পৌঁছে দেওয়া।",
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
              {t(lang, "Above", "অন্তত")}{" "}
              <CountUp
                to={95}
                duration={1000}
                trigger="inview"
                sessionKey="quick-commerce-hinge-95"
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
                "Fill rate on fresh produce for quick commerce platforms running on Fashol. The number a dark store operator can plan around, not hope for.",
                "ফসলে চলা কুইক কমার্স প্ল্যাটফর্মগুলোর টাটকা সবজিতে ফিল রেট। যে সংখ্যাটা ঘিরে একজন ডার্ক স্টোর অপারেটর পরিকল্পনা করতে পারেন, শুধু আশা করতে নয়।",
              )}
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Three promises bento (surface-deep, signature section) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "Three things the dark store can count on.", "তিনটি জিনিস, যেগুলোর ওপর ডার্ক স্টোর নির্ভর করতে পারে।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Fill rate, scale, and price stability. Every order Fashol fulfills for a quick commerce platform is optimized around these three, every day.",
                "ফিল রেট, সক্ষমতা আর দামের স্থিতিশীলতা। কুইক কমার্স প্ল্যাটফর্মের জন্য ফসল যে প্রতিটি অর্ডার সরবরাহ করে, তা প্রতিদিন এই তিনটি ঘিরেই সাজানো।",
              )}
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-12 tablet:mt-16 grid grid-cols-1 min-[900px]:grid-cols-2 desktop:grid-cols-4 gap-5 [grid-auto-flow:dense]"
          stagger={0.08}
        >
          {PROMISES.map((p, i) => (
            <StaggerItem
              key={i}
              className={
                p.span === 2
                  ? "min-[900px]:col-span-2 desktop:col-span-2"
                  : "min-[900px]:col-span-1 desktop:col-span-1"
              }
              y={20}
            >
              <PromiseCard promise={p} lang={lang} />
            </StaggerItem>
          ))}
          {/* Card 6 - closing statement, full width */}
          <StaggerItem className="min-[900px]:col-span-2 desktop:col-span-4" y={20}>
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
                  fontSize: "clamp(28px, 3.6vw, 52px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  color: "var(--color-deep-green)",
                }}
              >
                {t(
                  lang,
                  "Treated like a warehouse SKU. Priced like one. Delivered like one.",
                  "গুদামের এসকেইউ-এর মতোই দেখা হয়। সেভাবেই দাম, সেভাবেই সরবরাহ।",
                )}
              </p>
            </article>
          </StaggerItem>
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
                  "The buyer procurement desk. Quick commerce operators use Hyperfarm to forecast demand, order daily, track fulfillment, and reconcile same-day settlement.",
                  "বায়ারের সংগ্রহ ডেস্ক। কুইক কমার্স অপারেটররা হাইপারফার্ম ব্যবহার করেন চাহিদার পূর্বাভাস, দৈনিক অর্ডার, সরবরাহ পর্যবেক্ষণ আর একই দিনের হিসাব মেলাতে।",
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
              "I was managing seven fresh produce suppliers across eight dark stores and still spent my mornings explaining stockouts to category heads. Since moving to Fashol, I manage one. My team stopped tracking SKU-level stockouts in the daily stand-up because there were not enough of them to report.",
              "আমি আটটি ডার্ক স্টোরে টাটকা সবজির সাতজন সাপ্লায়ার সামলাতাম, তবু সকালগুলো কেটে যেত ক্যাটাগরি হেডদের কাছে স্টক ফুরানোর কৈফিয়ত দিতে। ফসলে আসার পর আমি সামলাই একজনকে। আমার টিম দৈনিক স্ট্যান্ড-আপে এসকেইউ ধরে স্টক ফুরানোর হিসাব রাখা বন্ধ করে দিয়েছে, কারণ রিপোর্ট করার মতো যথেষ্ট ঘটনাই ছিল না।",
            )}&rdquo;
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Nabila Rahman", "নাবিলা রহমান")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.6)" }}
              >
                {t(lang, "Category Manager, Fresh Produce, Foodpanda Bangladesh", "ক্যাটাগরি ম্যানেজার, ফ্রেশ প্রোডিউস, ফুডপান্ডা বাংলাদেশ")}
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
              {t(lang, "Twenty-four hours from forecast shared to first dark-store delivery.", "পূর্বাভাস শেয়ার থেকে প্রথম ডার্ক-স্টোর ডেলিভারি, চব্বিশ ঘণ্টায়।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Quick commerce runs on data and SLAs, not handshakes. Fashol's q-commerce desk onboards in a day: forecast shared in the morning, SKUs mapped to Hyperfarm pricing by afternoon, first dark-store delivery the next morning. The trade team stays embedded the first month to tune fill rate and SKU coverage.",
                "কুইক কমার্স চলে ডেটা আর এসএলএ-র ওপর, হাত মেলানোর ওপর নয়। ফসলের কিউ-কমার্স ডেস্ক এক দিনেই যুক্ত করে: সকালে পূর্বাভাস শেয়ার, দুপুরের মধ্যে হাইপারফার্মের দামের সাথে এসকেইউ মেলানো, পরদিন সকালে প্রথম ডার্ক-স্টোর ডেলিভারি। ফিল রেট আর এসকেইউ কভারেজ ঠিক করতে ট্রেড টিম প্রথম মাস পাশে থাকে।",
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
            {t(lang, "Talk to Fashol's quick commerce team", "ফসলের কুইক কমার্স টিমের সাথে কথা বলুন")}
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

function PromiseCard({ promise, lang }: { promise: PromiseCardData; lang: Lang }) {
  return (
    <article
      className="relative h-full flex flex-col rounded-[12px] p-6 tablet:p-8"
      style={{
        backgroundColor: "var(--card-bg)",
        minHeight: "320px",
      }}
    >
      {promise.kind === "illustration" ? (
        <PromiseIllustrationContent promise={promise} lang={lang} />
      ) : (
        <PromiseStatContent promise={promise} lang={lang} />
      )}
    </article>
  );
}

function PromiseIllustrationContent({
  promise,
  lang,
}: {
  promise: Extract<PromiseCardData, { kind: "illustration" }>;
  lang: Lang;
}) {
  const imageReady = PROMISE_IMAGES_READY.has(promise.imageSrc);

  return (
    <>
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
              src={promise.imageSrc}
              alt={promise.imageAlt}
              fill
              sizes="(min-width: 1200px) 520px, (min-width: 900px) 45vw, 100vw"
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
          fontSize: "clamp(26px, 2.8vw, 38px)",
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, promise.statement, promise.statementBn)}
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
        {t(lang, promise.body, promise.bodyBn)}
      </p>
    </>
  );
}

function PromiseStatContent({
  promise,
  lang,
}: {
  promise: Extract<PromiseCardData, { kind: "stat" }>;
  lang: Lang;
}) {
  return (
    <>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 2.8vw, 38px)",
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
        }}
      >
        {t(lang, promise.display, promise.displayBn)}
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
        {t(lang, promise.body, promise.bodyBn)}
      </p>
    </>
  );
}

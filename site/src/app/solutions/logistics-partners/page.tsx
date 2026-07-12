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
  title: "Logistics partners - Fashol",
  description:
    "Fashol partners with small fleet owners across Bangladesh to route loads directly, match return trips, and keep trucks earning on both legs. 40+ hubs, 50 districts, 3,500+ MT of produce moving through the network every month.",
};

const HERO_IMAGE_PATH = "/images/solutions/logistics-partners/shero.jpg";
const CLAIM_01_IMAGE = "/images/solutions/logistics-partners/claim-01.png";
const CLAIM_02_IMAGE = "/images/solutions/logistics-partners/claim-02.png";

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
    n: 40,
    format: "plain",
    suffix: "+",
    tail: "",
    label: "Hubs of origin and destination",
    labelBn: "উৎস ও গন্তব্যের হাব",
  },
  {
    kind: "number",
    n: 50,
    format: "plain",
    suffix: "",
    tail: "",
    label: "Districts of operational reach",
    labelBn: "কার্যক্রমের আওতায় জেলা",
  },
  {
    kind: "number",
    n: 3500,
    format: "comma",
    suffix: "+ MT",
    tail: "",
    label: "Moving through the network monthly",
    labelBn: "প্রতি মাসে নেটওয়ার্ক দিয়ে চলাচল",
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
        "An isometric diagram of loads being dispatched from a Fashol hub to partner trucks across the network",
      title: "The load pipeline",
      titleBn: "লোডের ধারা",
      body: "3,500+ MT of produce move through the network monthly. Fashol's hub team dispatches these loads straight to partner fleets - no brokers, no commission.",
      bodyBn: "প্রতি মাসে 3,500+ MT পণ্য নেটওয়ার্ক দিয়ে চলাচল করে। ফসলের হাব টিম এই লোডগুলো সরাসরি পার্টনার ফ্লিটের কাছে পাঠায় - কোনো দালাল নেই, কোনো কমিশন নেই।",
    },
  },
  {
    span: "tablet:col-span-2 desktop:col-span-2",
    card: {
      kind: "anchor",
      imageSrc: CLAIM_02_IMAGE,
      imageAlt:
        "An isometric diagram of a truck loaded on both directions of its route, with upstream and downstream matched",
      title: "Return trips, not empty ones",
      titleBn: "খালি নয়, ভরা ফিরতি ট্রিপ",
      body: "Fashol moves produce upstream from farms to hubs and downstream to buyers. A truck loaded on the way out gets matched on the way back. Both legs earn.",
      bodyBn: "ফসল খামার থেকে হাবে পণ্য আনে আপস্ট্রিমে, আর হাব থেকে বায়ারের কাছে পাঠায় ডাউনস্ট্রিমে। যাওয়ার পথে বোঝাই হওয়া ট্রাক ফেরার পথেও লোড পায়। দুই পথেই আয় হয়।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Loads visible across 50 districts",
      titleBn: "50 জেলাজুড়ে দৃশ্যমান লোড",
      body: "See available work across the full Fashol network, not just the corridor you already know. Pick the routes that match your fleet.",
      bodyBn: "শুধু চেনা করিডোর নয়, পুরো ফসল নেটওয়ার্কজুড়ে থাকা কাজ দেখুন। আপনার ফ্লিটের সঙ্গে মানানসই রুট বেছে নিন।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Direct, not through a middleman",
      titleBn: "মধ্যস্বত্বভোগী নয়, সরাসরি",
      body: "Loads come from Fashol's hub team straight to you. What used to be broker commission stays with the truck.",
      bodyBn: "লোড আসে ফসলের হাব টিম থেকে সরাসরি আপনার কাছে। যা আগে দালালের কমিশনে যেত, তা এখন ট্রাকের হাতেই থাকে।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Routes built around the hub network",
      titleBn: "হাব নেটওয়ার্ক ঘিরে গড়া রুট",
      body: "40+ hubs across 50 districts create natural corridors. Fashol matches your fleet to the routes that keep the kilometers efficient.",
      bodyBn: "50 জেলাজুড়ে 40+ হাব স্বাভাবিক করিডোর তৈরি করে। ফসল আপনার ফ্লিটকে এমন রুটে মেলায়, যা প্রতিটি কিলোমিটার কাজে লাগায়।",
    },
  },
  {
    span: "tablet:col-span-1 desktop:col-span-1",
    card: {
      kind: "text",
      title: "Steady work, by the month",
      titleBn: "মাসজুড়ে নিয়মিত কাজ",
      body: "3,500+ MT moving every month needs trucks every day. Standing partnerships mean predictable utilization instead of chasing jobs job by job.",
      bodyBn: "প্রতি মাসে 3,500+ MT পণ্য চলাচলের জন্য প্রতিদিন ট্রাক দরকার। স্থায়ী পার্টনারশিপ মানে কাজের পেছনে একটার পর একটা না ছুটে অনুমানযোগ্য নিয়মিত কাজ।",
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
    figure: "40+ hubs",
    figureBn: "40+ হাব",
    label: "Of origin and destination",
    labelBn: "উৎস ও গন্তব্যের",
  },
  {
    figure: "Direct dispatch",
    figureBn: "সরাসরি ডিসপ্যাচ",
    label: "No broker commission",
    labelBn: "কোনো দালাল কমিশন নেই",
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
    headline: "Fleet review.",
    headlineBn: "ফ্লিট পর্যালোচনা।",
    tagline: "We look at what you run.",
    taglineBn: "আপনি যা চালান, তা দেখি।",
    body: "Truck count, types, home corridor, cold-chain capability, driver availability. Map your fleet against the routes Fashol moves.",
    bodyBn: "ট্রাকের সংখ্যা, ধরন, নিজের করিডোর, কোল্ড চেইনের সক্ষমতা, চালকের প্রাপ্যতা। ফসল যে রুটে চলে, তার সঙ্গে আপনার ফ্লিট মিলিয়ে দেখা হয়।",
  },
  {
    n: "02",
    headline: "Integration.",
    headlineBn: "ইন্টিগ্রেশন।",
    tagline: "The dispatch connects.",
    taglineBn: "ডিসপ্যাচ যুক্ত হয়।",
    body: "Your fleet joins the Fashol load board. Upstream loads from Jogaan and downstream loads from Hyperfarm become visible to your dispatch.",
    bodyBn: "আপনার ফ্লিট ফসলের লোড বোর্ডে যুক্ত হয়। যোগানের আপস্ট্রিম লোড আর হাইপারফার্মের ডাউনস্ট্রিম লোড আপনার ডিসপ্যাচে দৃশ্যমান হয়।",
  },
  {
    n: "03",
    headline: "First cycle.",
    headlineBn: "প্রথম চক্র।",
    tagline: "Trips begin.",
    taglineBn: "ট্রিপ শুরু হয়।",
    body: "Loads start routing through your trucks. Return trips get matched. The Fashol hub team coordinates pickup, delivery, and reconciliation.",
    bodyBn: "লোড আপনার ট্রাকে চলতে শুরু করে। ফিরতি ট্রিপ মিলিয়ে দেওয়া হয়। ফসলের হাব টিম পিকআপ, ডেলিভারি আর হিসাব মেলানোর সমন্বয় করে।",
  },
  {
    n: "04",
    headline: "Standing partnership.",
    headlineBn: "স্থায়ী পার্টনারশিপ।",
    tagline: "The rhythm holds.",
    taglineBn: "ছন্দ ধরে রাখে।",
    body: "Rate cards, volume forecasting, and seasonal planning happen together. Your fleet runs networked, not freelance.",
    bodyBn: "রেট কার্ড, পরিমাণের পূর্বাভাস আর মৌসুমি পরিকল্পনা একসঙ্গে হয়। আপনার ফ্লিট চলে নেটওয়ার্কে যুক্ত হয়ে, ফ্রিল্যান্স হিসেবে নয়।",
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
    name: "Cold storage operators",
    nameBn: "কোল্ড স্টোরেজ পরিচালক",
    description:
      "Cold storage facilities plugged into the Fashol network, with verified inbound bookings and outbound orders from the buyer side.",
    descriptionBn:
      "ফসল নেটওয়ার্কে যুক্ত কোল্ড স্টোরেজ, যাচাই করা ইনবাউন্ড বুকিং আর বায়ারের দিক থেকে আউটবাউন্ড অর্ডারসহ।",
    href: "/solutions/cold-storage-operators",
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
  {
    name: "Wholesalers",
    nameBn: "পাইকার",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    descriptionBn:
      "পাইকারি ব্যবসার পেছনে একটি আধুনিক সাপ্লাই স্ট্যাক, 50 জেলা থেকে সোর্সিং আর একই দিনে সেটেলমেন্টসহ।",
    href: "/solutions/wholesalers",
  },
];

function publicFileExists(relative: string): boolean {
  return existsSync(join(process.cwd(), "public", relative));
}

export default async function LogisticsPartnersPage() {
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
              alt="A truck in motion on a Bangladeshi highway carrying produce between hubs"
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

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[820px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[44px] tablet:!text-[58px] desktop:!text-[72px]"
            >
              {t(
                lang,
                "The loads were always there. Now so is the visibility.",
                "লোড সবসময়ই ছিল। এখন সেগুলো চোখের সামনেও এসেছে।",
              )}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[640px] !text-[rgba(255,251,234,0.82)]"
            >
              {t(
                lang,
                "Fashol partners with small fleet owners across Bangladesh to route loads directly, match return trips, and keep trucks earning on both legs. No brokers. No empty returns.",
                "ফসল বাংলাদেশজুড়ে ছোট ফ্লিটের মালিকদের সঙ্গে কাজ করে সরাসরি লোড পৌঁছে দিতে, ফিরতি ট্রিপ মিলিয়ে দিতে আর দুই পথেই ট্রাককে আয়ে রাখতে। কোনো দালাল নেই। খালি ফেরা নেই।",
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
                          sessionKey={`lp-hero-stat-${i}`}
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
                  <dt
                    className="mt-2 uppercase !text-[rgba(255,251,234,0.7)]"
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
                "The truck earns on one leg and loses on the other.",
                "ট্রাক এক পথে আয় করে, অন্য পথে লোকসান গোনে।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A truck owner in Bangladesh runs on margins the market has already thinned. Half the trips are empty returns - potato down to Dhaka, deadhead back to Rangpur. Loads come through brokers who take a commission off the top, and the work you cannot see from your home corridor might as well not exist. So the truck sits or runs half full, and every unloaded kilometer is paid for out of pocket.",
                "বাংলাদেশে একজন ট্রাক মালিক এমন মার্জিনে চলেন, যা বাজার আগেই কমিয়ে এনেছে। অর্ধেক ট্রিপই খালি ফেরা - আলু নিয়ে ঢাকায় নামা, তারপর খালি ট্রাকে রংপুরে ফেরা। লোড আসে দালালদের হাত ঘুরে, যারা ওপর থেকেই কমিশন কেটে নেয়; আর নিজের চেনা করিডোরের বাইরের কাজ চোখে না পড়লে সেটা যেন থাকেই না। ফলে ট্রাক বসে থাকে কিংবা অর্ধেক ভরে চলে, আর প্রতিটি খালি কিলোমিটারের খরচ যায় নিজের পকেট থেকে।",
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
                "The fleet is there. The system that keeps it moving is not.",
                "ফ্লিট আছে। যে ব্যবস্থা তাকে সচল রাখে, সেটাই নেই।",
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
            {t(lang, "Full trip out. Full trip back.", "যাওয়ার পথ ভরা। ফেরার পথও ভরা।")}
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
                "What a Fashol partnership keeps running.",
                "ফসলের সঙ্গে পার্টনারশিপ যা সচল রাখে।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Direct loads, matched returns, network-wide visibility, standing utilization. The difference between a truck that runs and a truck that earns on both legs.",
                "সরাসরি লোড, মিলিয়ে দেওয়া ফিরতি ট্রিপ, পুরো নেটওয়ার্কজুড়ে স্পষ্টতা, নিয়মিত ব্যবহার। শুধু চলা ট্রাক আর দুই পথেই আয় করা ট্রাকের মধ্যে এটাই পার্থক্য।",
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
                "A truck that keeps moving is a truck that keeps earning.",
                "যে ট্রাক চলতে থাকে, সে ট্রাক আয় করতে থাকে।",
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
                "The systems that route the trucks.",
                "যে ব্যবস্থাগুলো ট্রাকের পথ ঠিক করে।",
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
                {t(lang, "Loads from the farm side.", "খামারের দিক থেকে লোড।")}
              </p>
              <p className="t-body mt-4">
                {t(
                  lang,
                  "Farmers booking produce into Fashol hubs generate the upstream load. Jogaan handles registration, volume forecasting, and the dispatch to your fleet.",
                  "ফসল হাবে পণ্য বুক করা কৃষকরাই আপস্ট্রিম লোড তৈরি করেন। যোগান সামলায় নিবন্ধন, পরিমাণের পূর্বাভাস আর আপনার ফ্লিটে লোড পাঠানোর কাজ।",
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
                {t(lang, "Loads from the buyer side.", "বায়ারের দিক থেকে লোড।")}
              </p>
              <p className="t-body mt-4">
                {t(
                  lang,
                  "Restaurants, supershops, and quick commerce order against hub inventory. Hyperfarm dispatches the downstream load - the return trip your truck used to drive empty.",
                  "রেস্তোরাঁ, সুপারশপ আর কুইক কমার্স হাবের স্টকের বিপরীতে অর্ডার দেয়। হাইপারফার্ম পাঠায় ডাউনস্ট্রিম লোড - সেই ফিরতি ট্রিপ, যা আগে আপনার ট্রাক খালি চালাত।",
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
              "“I run three trucks on the Rangpur-Dhaka route. For years, we took potato down and came back empty. Brokers in the middle, always. Fashol loads us with potato from the hub, and when we drop it in Dhaka they have vegetables waiting for the return. Three trucks earning on both legs is a different business than three trucks earning on one.”",
              "“রংপুর-ঢাকা রুটে আমার তিনটি ট্রাক চলে। বছরের পর বছর আলু নিয়ে নামতাম, ফিরতাম খালি হাতে। মাঝখানে সবসময় দালাল। এখন ফসল হাব থেকে আলু বোঝাই করে দেয়, আর ঢাকায় নামিয়ে দিলে ফেরার জন্য সবজি তৈরি রাখে। দুই পথেই আয় করা তিনটি ট্রাক আর এক পথে আয় করা তিনটি ট্রাক - দুটো এক ব্যবসা নয়।”",
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Jahangir Alam", "জাহাঙ্গীর আলম")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.65)" }}
              >
                {t(
                  lang,
                  "Small fleet operator, Rangpur-Dhaka corridor",
                  "ছোট ফ্লিট পরিচালক, রংপুর-ঢাকা করিডোর",
                )}
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
                "Partnership, not sign-up. A cycle of steps that sets the fleet up to run networked.",
                "সাইন-আপ নয়, পার্টনারশিপ। কয়েকটি ধাপের একটি চক্র, যা ফ্লিটকে নেটওয়ার্কে যুক্ত হয়ে চলার জন্য তৈরি করে।",
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
// body. Text cards are title + body only. No eyebrow tags.
// ------------------------------------------------------------------

function BentoCardView({ card, lang }: { card: BentoCard; lang: Lang }) {
  if (card.kind === "anchor") return <AnchorCardView card={card} lang={lang} />;
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

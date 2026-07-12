import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { Section, toneClass } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
  QuoteReveal,
  LetterSpaceReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { JourneyStickyScroll } from "@/components/site/JourneyStickyScroll";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "Exporters - Fashol",
  description:
    "Source fresh produce from Bangladesh with 24-hour CNF pricing, packaging engineered for every destination, and compliance handled end to end. Fashol exports to the UK, Europe, the Middle East, and Southeast Asia.",
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
    n: 60000,
    format: "comma",
    suffix: "+",
    tail: "",
    l: "Farmer network",
    lBn: "কৃষক নেটওয়ার্ক",
  },
  {
    kind: "number",
    n: 4,
    format: "plain",
    suffix: "",
    tail: "",
    l: "Regional corridors",
    lBn: "আঞ্চলিক করিডোর",
  },
  {
    kind: "text",
    text: "24/7",
    textBn: "24/7",
    l: "Dedicated buyer desk",
    lBn: "ডেডিকেটেড বায়ার ডেস্ক",
  },
];

const REASONS: ReadonlyArray<{
  n: string;
  headline: string;
  headlineBn: string;
  body: string;
  bodyBn: string;
}> = [
  {
    n: "01",
    headline: "Scale.",
    headlineBn: "পরিসর।",
    body: "60,000 registered farmers across nine operating districts, supplying 40-plus hubs and 200-plus wholesale markets. Any single RFQ can be matched against existing capacity without needing a new sourcing hunt.",
    bodyBn: "নয়টি সক্রিয় জেলায় নিবন্ধিত 60,000 কৃষক, যারা 40টির বেশি হাব ও 200টির বেশি পাইকারি বাজারে সরবরাহ করেন। যেকোনো একটি RFQ নতুন করে উৎস খোঁজা ছাড়াই বিদ্যমান সক্ষমতার সঙ্গে মেলানো যায়।",
  },
  {
    n: "02",
    headline: "Reliability.",
    headlineBn: "নির্ভরযোগ্যতা।",
    body: "Every order is assigned a dedicated Fashol export manager, tracked against a committed delivery window, and covered by a 24/7 buyer support desk. Delivery performance is published to the buyer, not hidden.",
    bodyBn: "প্রতিটি অর্ডারের জন্য একজন ডেডিকেটেড ফসল এক্সপোর্ট ম্যানেজার নির্ধারিত হয়, প্রতিশ্রুত ডেলিভারি সময়সীমার বিপরীতে তা ট্র্যাক করা হয়, এবং 24/7 বায়ার সাপোর্ট ডেস্ক সবসময় পাশে থাকে। ডেলিভারির পারফরম্যান্স বায়ারের কাছে প্রকাশ করা হয়, লুকানো হয় না।",
  },
  {
    n: "03",
    headline: "Compliance.",
    headlineBn: "কমপ্লায়েন্স।",
    body: "Fashol's compliance team handles destination-country phytosanitary and import documentation in-house. When a buyer requires HACCP, BRC, or GlobalGAP product, Fashol sources from pre-certified farmers and facilities already registered in the network.",
    bodyBn: "ফসলের কমপ্লায়েন্স টিম গন্তব্য-দেশের ফাইটোস্যানিটারি ও আমদানি ডকুমেন্টেশন নিজেরাই সামলায়। বায়ারের যখন HACCP, BRC বা GlobalGAP প্রোডাক্ট প্রয়োজন হয়, তখন ফসল নেটওয়ার্কে আগে থেকেই নিবন্ধিত সার্টিফায়েড কৃষক ও স্থাপনা থেকে সংগ্রহ করে।",
  },
  {
    n: "04",
    headline: "Cost that holds.",
    headlineBn: "যে খরচ স্থির থাকে।",
    body: "Live pricing benchmarked against 200-plus wholesale markets, transparent CNF quotes within 24 hours, and packaging engineering that prevents the post-harvest loss that usually gets priced into other suppliers' margins.",
    bodyBn: "200টির বেশি পাইকারি বাজারের বিপরীতে যাচাই করা লাইভ দাম, 24 ঘণ্টার মধ্যে স্বচ্ছ CNF কোটেশন, এবং এমন প্যাকেজিং ইঞ্জিনিয়ারিং যা ফসল-পরবর্তী ক্ষতি ঠেকায়-যে ক্ষতি সাধারণত অন্য সাপ্লায়ারদের মার্জিনে ধরা থাকে।",
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
    name: "Importers",
    nameBn: "ইমপোর্টার",
    description:
      "Bulk produce supply for import-focused distributors, with origin documentation and compliance handled upstream.",
    descriptionBn:
      "আমদানি-কেন্দ্রিক পরিবেশকদের জন্য বাল্ক ফসল সরবরাহ, উৎসের ডকুমেন্টেশন ও কমপ্লায়েন্স আগেভাগেই সামলানো।",
    href: "/solutions/importers",
  },
  {
    name: "Wholesalers",
    nameBn: "পাইকার",
    description:
      "Direct sourcing for wholesale buyers moving high volumes into domestic and regional markets.",
    descriptionBn:
      "দেশীয় ও আঞ্চলিক বাজারে বড় পরিমাণ প্রোডাক্ট সরানো পাইকারি বায়ারদের জন্য সরাসরি সোর্সিং।",
    href: "/solutions/wholesalers",
  },
  {
    name: "Commission agents",
    nameBn: "কমিশন এজেন্ট",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and settlement.",
    descriptionBn:
      "আধুনিক ব্যবস্থায় পরিচালিত ঐতিহ্যবাহী আড়তদার, স্বচ্ছ দাম ও সেটেলমেন্টসহ।",
    href: "/solutions/commission-agents",
  },
];

export default async function ExportersPage() {
  const lang = await getLang();
  return (
    <>
      {/* Section 1 - Hero - full-bleed photo with deep-green gradient overlay */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/shero3.jpg"
            alt="Stacked export shipping containers at a Chittagong port terminal"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-start px-6 tablet:pl-[7vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-[128px] desktop:pt-[144px]">
          <div className="max-w-[640px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Exporters.", "এক্সপোর্টার।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-2 max-w-[560px]"
            >
              {t(
                lang,
                "Fresh Bangladeshi produce, landed at retail across the UK, Europe, the Middle East, and Southeast Asia.",
                "টাটকা বাংলাদেশি ফসল, যুক্তরাজ্য, ইউরোপ, মধ্যপ্রাচ্য ও দক্ষিণ-পূর্ব এশিয়ার খুচরা বাজারে পৌঁছে দেওয়া।"
              )}
            </Reveal>
            <dl className="mt-[17px] tablet:mt-[25px] flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
              {HERO_STATS.map((s, i) => (
                <div key={s.l} className="flex flex-col items-start">
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
                          sessionKey={`exporters-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2">{t(lang, s.l, s.lBn)}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-[9px] tablet:mt-[17px]">
              <TalkToSalesButton />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - The problem */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "Sourcing fresh produce out of Bangladesh has been a chain of handoffs.",
                "বাংলাদেশ থেকে টাটকা ফসল সোর্সিং এতদিন ছিল হাতবদলের এক দীর্ঘ শৃঙ্খল।"
              )}
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/images/solutions/exporters/i3.jpg"
                alt="A Bangladeshi wholesale market or container yard with produce handling"
                width={4026}
                height={3062}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A supermarket buyer in Manchester or Dubai sourcing fresh produce from Bangladesh has worked through layers of intermediaries: farmer, arotdar, consolidator, exporter, freight forwarder, and a customs broker at each end. Every handoff adds a price margin - and a quality, documentation, and timeline risk.",
                "ম্যানচেস্টার বা দুবাইয়ের কোনো সুপারমার্কেট বায়ার বাংলাদেশ থেকে টাটকা ফসল আনতে গেলে স্তরে স্তরে মধ্যস্থতাকারীর ভেতর দিয়ে যেতে হয়েছে: কৃষক, আড়তদার, কনসলিডেটর, এক্সপোর্টার, ফ্রেইট ফরওয়ার্ডার, আর দুই প্রান্তে কাস্টমস ব্রোকার। প্রতিটি হাতবদলে যোগ হয় দামের একটি মার্জিন-আর কোয়ালিটি, ডকুমেন্টেশন ও সময়সূচির ঝুঁকি।"
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Grading varies by whoever last touched the crate; packaging is whatever was available. Last-minute documentation errors hold shipments at customs. The cold chain breaks between farm and container yard, unseen. Produce reaches retail short days of shelf life and often part of the load.",
                "শেষবার যে বাক্স ধরেছে তার উপর গ্রেডিং নির্ভর করে; প্যাকেজিং যা হাতের কাছে ছিল তাই। শেষ মুহূর্তের ডকুমেন্টেশন ভুলে চালান কাস্টমসে আটকে থাকে। খামার থেকে কন্টেইনার ইয়ার্ড পর্যন্ত কোল্ড চেইন ভাঙে, কারও চোখেই পড়ে না। ফসল খুচরা বাজারে পৌঁছায় শেলফ-লাইফের কয়েক দিন কমিয়ে, প্রায়ই চালানের একটা অংশও নষ্ট হয়ে।"
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The buyer carries all of this risk, priced into a thin margin they already had no room to protect.",
                "এই পুরো ঝুঁকিটাই বায়ারকে বইতে হয়, যা ধরা থাকে এমন এক পাতলা মার্জিনে যা রক্ষা করার কোনো সুযোগই তার ছিল না।"
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <LetterSpaceReveal
            as="div"
            startSpacing="0.06em"
            duration={1}
            className="whitespace-nowrap leading-[0.95] !text-[var(--color-paper)] text-[56px] tablet:text-[88px] desktop:text-[120px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            {t(lang, "Up to", "")}{lang === "bn" ? "" : " "}
            <CountUp
              to={30}
              duration={1000}
              trigger="inview"
              inviewMargin="0px 0px -30% 0px"
              sessionKey="exporters-hinge-30"
            />
            {t(lang, "%", "% পর্যন্ত")}
          </LetterSpaceReveal>
          <DelayedFade
            as="p"
            delay={0.3}
            duration={0.5}
            className="t-body-lg mt-6 tablet:mt-8 max-w-[680px] mx-auto"
            viewportMargin="0px 0px -30% 0px"
          >
            <span style={{ color: "rgba(255, 251, 234, 0.75)" }}>
              {t(
                lang,
                "The share of fresh produce lost globally during packaging and post-harvest handling. Fashol engineers packaging per product, per destination, per volume, and brings that loss down to single digits.",
                "প্যাকেজিং ও ফসল-পরবর্তী হ্যান্ডলিংয়ের সময় বিশ্বজুড়ে টাটকা ফসলের যে অংশ নষ্ট হয়। ফসল প্রতিটি প্রোডাক্ট, প্রতিটি গন্তব্য ও প্রতিটি পরিমাণের জন্য আলাদা প্যাকেজিং তৈরি করে সেই ক্ষতি এক অঙ্কে নামিয়ে আনে।"
              )}
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - The Journey (surface tone per rotation). */}
      <section className={toneClass["surface-deep"]}>
        <div className="container-page pt-20 tablet:pt-28 desktop:pt-32 pb-10 tablet:pb-12">
          <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
            <Reveal as="h2" className="t-h2 desktop:col-span-7">
              {t(
                lang,
                "From RFQ to retail shelf, twelve operational stops under one roof.",
                "RFQ থেকে খুচরা তাক পর্যন্ত, এক ছাদের নিচে বারোটি কার্যকরী ধাপ।"
              )}
            </Reveal>
            <Reveal delay={0.12} className="desktop:col-span-5 t-body-lg">
              <p>
                {t(
                  lang,
                  "Most exporters can only account for the middle of the chain. Fashol runs the full arc - inquiry, sourcing, packaging, compliance, logistics, and post-delivery support - on a single platform, with a single accountable team.",
                  "বেশিরভাগ এক্সপোর্টার শুধু শৃঙ্খলের মাঝের অংশটুকুর হিসাব রাখতে পারে। ফসল পুরো ধারাটাই চালায়-অনুসন্ধান, সোর্সিং, প্যাকেজিং, কমপ্লায়েন্স, লজিস্টিকস ও ডেলিভারি-পরবর্তী সাপোর্ট-একটিই প্ল্যাটফর্মে, একটিই দায়বদ্ধ টিমের হাতে।"
                )}
              </p>
            </Reveal>
          </div>
        </div>
        <JourneyStickyScroll tone="surface-deep" />
      </section>

      {/* Section 5 - The four reasons (paper tone per rotation). */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "Scale, reliability, compliance, and a cost structure that holds.",
                "পরিসর, নির্ভরযোগ্যতা, কমপ্লায়েন্স, আর এমন এক খরচের কাঠামো যা স্থির থাকে।"
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "These are the four things a regional retail buyer is actually trying to solve for when sourcing from Bangladesh. Fashol is built around each of them.",
                "বাংলাদেশ থেকে সোর্সিং করার সময় একজন আঞ্চলিক খুচরা বায়ার আসলে এই চারটি বিষয়েরই সমাধান খোঁজেন। ফসল প্রতিটির ভিত্তিতেই গড়ে তোলা।"
              )}
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {REASONS.map((r) => (
            <StaggerItem key={r.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] p-8">
                <div
                  aria-hidden
                  className="w-[120px] h-[120px] bg-[var(--color-grain)]"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-6">
                  {r.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {t(lang, r.headline, r.headlineBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, r.body, r.bodyBn)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 6 - Powered by (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "The product behind this work.", "এই কাজের পেছনের প্রোডাক্ট।")}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 flex justify-center">
          <Reveal className="w-full max-w-[500px]">
            <article className="flex flex-col items-start text-left">
              <Image
                src="/hyperfarm%20logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain mix-blend-multiply"
              />
              <p className="t-body mt-6">
                {t(
                  lang,
                  "The buyer's procurement desk. Export RFQs, quotes, shipment tracking, documentation, and post-delivery support on one platform.",
                  "বায়ারের প্রকিউরমেন্ট ডেস্ক। এক্সপোর্টের RFQ, কোটেশন, চালান ট্র্যাকিং, ডকুমেন্টেশন ও ডেলিভারি-পরবর্তী সাপোর্ট এক প্ল্যাটফর্মে।"
                )}
              </p>
              <div className="mt-8">
                <Link href="/products/hyperfarm" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্টের পেজ দেখুন")}
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - Pull quote (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[820px]">
          <QuoteReveal
            className="!text-[var(--color-paper)] text-[22px] tablet:text-[28px] desktop:text-[32px] leading-[1.4]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {t(
              lang,
              "“We used to work with three separate exporters out of Bangladesh and still spent most of our quality team's time chasing paperwork. With Fashol, the documentation is on the portal before the shipment leaves Chittagong. Our compliance team stopped flagging Bangladesh origin last quarter. That tells me everything.”",
              "“বাংলাদেশ থেকে আমরা আগে তিনটি আলাদা এক্সপোর্টারের সঙ্গে কাজ করতাম, তবু আমাদের কোয়ালিটি টিমের বেশিরভাগ সময় কাগজপত্রের পেছনে ছুটতেই যেত। ফসলের সঙ্গে চালান চট্টগ্রাম ছাড়ার আগেই সব ডকুমেন্টেশন পোর্টালে থাকে। আমাদের কমপ্লায়েন্স টিম গত ত্রৈমাসিক থেকে বাংলাদেশ-উৎসের চালানে আর কোনো ফ্ল্যাগ তোলে না। এতেই সব বোঝা যায়।”"
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Rashid Mohammed", "রশিদ মোহাম্মদ")}
              </span>
              <span className="text-[12px] mt-1" style={{ color: "rgba(255,251,234,0.65)" }}>
                {t(
                  lang,
                  "Director of Procurement, regional wholesale group, Dubai",
                  "ডিরেক্টর অব প্রকিউরমেন্ট, আঞ্চলিক পাইকারি গ্রুপ, দুবাই"
                )}
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 8 - Other roles on the chain */}
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

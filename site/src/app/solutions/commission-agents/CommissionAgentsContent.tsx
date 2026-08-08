"use client";

import { useLang } from "@/components/site/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { GenerationalBento } from "@/components/site/GenerationalBento";
import { Section } from "@/components/ui/Section";
import {

  Reveal,
  QuoteReveal,
  DelayedFade,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t } from "@/lib/i18n";


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
    n: 200,
    format: "plain",
    suffix: "+",
    tail: "",
    l: "Arotdars on Fashol",
    lBn: "ফসলে আড়তদার",
  },
  {
    kind: "number",
    n: 50,
    format: "plain",
    suffix: " districts",
    tail: "",
    l: "Active across Bangladesh",
    lBn: "বাংলাদেশজুড়ে সক্রিয়",
  },
  {
    kind: "text",
    text: "Same day",
    textBn: "একই দিনে",
    l: "Settlement on every transaction",
    lBn: "প্রতিটি লেনদেনে সেটেলমেন্ট",
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
    body: "A Fashol trade representative sits with the arotdar to understand the arot's history, current book, regular farmers, and downstream buyers. No changes to the existing trade.",
    bodyBn: "ফসলের একজন ট্রেড প্রতিনিধি আড়তদারের সঙ্গে বসেন আড়তের ইতিহাস, চলতি খতিয়ান, নিয়মিত কৃষক ও ডাউনস্ট্রিম বায়ারদের বুঝতে। চলমান ব্যবসায় কোনো পরিবর্তন নেই।",
  },
  {
    n: "02",
    headline: "Fashol account live.",
    headlineBn: "ফসল অ্যাকাউন্ট চালু।",
    body: "Within 24 hours, the arot's regular farmers are added to the Fashol platform. Downstream buyers - restaurants, supershops, wholesale partners - are mapped in if they are not already on Hyperfarm.",
    bodyBn: "24 ঘণ্টার মধ্যে আড়তের নিয়মিত কৃষকরা ফসল প্ল্যাটফর্মে যুক্ত হন। ডাউনস্ট্রিম বায়ার - রেস্তোরাঁ, সুপারশপ, পাইকারি সহযোগী - হাইপারফার্মে না থাকলে তাদেরও যুক্ত করা হয়।",
  },
  {
    n: "03",
    headline: "First transactions.",
    headlineBn: "প্রথম লেনদেন।",
    body: "On day three, the first transactions flow through Fashol with live pricing, digital settlement, and grading at the hub. The paper ledger continues in parallel for the first week.",
    bodyBn: "তৃতীয় দিনে প্রথম লেনদেনগুলো ফসলের মধ্য দিয়ে চলে - সরাসরি দাম, ডিজিটাল সেটেলমেন্ট আর হাবে গ্রেডিংসহ। প্রথম সপ্তাহে কাগজের খাতাও পাশাপাশি চলতে থাকে।",
  },
  {
    n: "04",
    headline: "Paper becomes backup.",
    headlineBn: "কাগজ হয়ে যায় ব্যাকআপ।",
    body: "By the end of the first week, Fashol handles the primary record. The paper ledger stays for any transactions outside the platform - personal arrangements, long-standing relationships - but the bulk of the arot runs digitally.",
    bodyBn: "প্রথম সপ্তাহের শেষে মূল হিসাব সামলায় ফসল। প্ল্যাটফর্মের বাইরের লেনদেনের জন্য কাগজের খাতা থেকে যায় - ব্যক্তিগত বোঝাপড়া, বহুদিনের সম্পর্ক - তবে আড়তের বেশিরভাগটাই চলে ডিজিটালে।",
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
    name: "Wholesalers",
    nameBn: "পাইকার",
    description:
      "A modern supply stack behind the wholesale trade, with 50-district sourcing and same-day settlement.",
    descriptionBn:
      "পাইকারি ব্যবসার পেছনে একটি আধুনিক সাপ্লাই স্ট্যাক, 50 জেলা থেকে সোর্সিং আর একই দিনে সেটেলমেন্টসহ।",
    href: "/solutions/wholesalers",
  },
  {
    name: "Importers",
    nameBn: "ইমপোর্টার",
    description:
      "Bulk produce supply for import-focused distributors, with origin documentation handled upstream.",
    descriptionBn:
      "ইমপোর্টনির্ভর ডিস্ট্রিবিউটরদের জন্য বড় পরিমাণে পণ্য সাপ্লাই, উৎসের কাগজপত্র আপস্ট্রিমেই সামলানো।",
    href: "/solutions/importers",
  },
  {
    name: "Exporters",
    nameBn: "এক্সপোর্টার",
    description:
      "End-to-end export corridors to the UK, Europe, the Middle East, and Southeast Asia.",
    descriptionBn:
      "যুক্তরাজ্য, ইউরোপ, মধ্যপ্রাচ্য ও দক্ষিণ-পূর্ব এশিয়ায় শুরু থেকে শেষ পর্যন্ত রপ্তানি করিডোর।",
    href: "/solutions/exporters",
  },
];


export function CommissionAgentsContent() {
  const lang = useLang();
  return (
    <>
      {/* Section 1 - Hero (photo, no overlay) */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/cahero.jpg"
            alt="An older arotdar and his son with a phone or ledger at a Bangladeshi wholesale market"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </Reveal>

        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[640px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-ink)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Commission agents.", "আড়তদার।")}
            </Reveal>
            <dl className="mt-10 tablet:mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
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
                          sessionKey={`commission-agents-hero-stat-${i}`}
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
                  <dt className="t-caption mt-2 !text-[var(--color-ink)]">
                    {t(lang, s.l, s.lBn)}
                  </dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
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
                "The arot has not changed. The trade around it has.",
                "আড়ত বদলায়নি। বদলেছে তার চারপাশের ব্যবসা।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "For generations, the arotdar has sat at the center of produce trade in Bangladesh. The farmer brings the crop; the arotdar finds the buyer, sets the day's price, and takes a commission. Settlement happens when it happens; ledgers are written in pen, in books decades old. Trust builds season by season, because everyone in the arot knows everyone else.",
                "প্রজন্মের পর প্রজন্ম ধরে আড়তদার বাংলাদেশের পণ্য ব্যবসার কেন্দ্রে বসে আছেন। কৃষক ফসল আনেন; আড়তদার বায়ার খুঁজে দেন, দিনের দাম ঠিক করেন আর কমিশন নেন। সেটেলমেন্ট হয় যখন হয়; হিসাব লেখা হয় কলমে, দশক পুরনো খাতায়। বিশ্বাস গড়ে ওঠে মৌসুমের পর মৌসুম, কারণ আড়তের সবাই সবাইকে চেনে।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "The trade around it has changed. Buyers want price transparency before they order; farmers want paying the day they deliver; restaurants and quick commerce platforms want grading, packaging, and digital receipts; wholesale buyers compare prices across districts before committing. An arotdar still on a paper ledger and weekly settlement is losing his father's trade - not because the trade left him, but because the tools did.",
                "চারপাশের ব্যবসা বদলে গেছে। বায়াররা অর্ডারের আগেই দামের স্বচ্ছতা চান; কৃষকরা যেদিন পণ্য দেন সেদিনই টাকা চান; রেস্তোরাঁ আর কুইক কমার্স প্ল্যাটফর্ম চায় গ্রেডিং, প্যাকেজিং আর ডিজিটাল রসিদ; পাইকারি বায়াররা কথা দেওয়ার আগে জেলায় জেলায় দাম মিলিয়ে দেখেন। যে আড়তদার এখনো কাগজের খাতা আর সাপ্তাহিক সেটেলমেন্টে আটকে, তিনি বাবার ব্যবসা হারাচ্ছেন - ব্যবসা তাঁকে ছেড়ে যায়নি বলে নয়, বরং হাতিয়ারগুলো ছেড়ে গেছে বলে।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "A young arotdar taking over the family business does not need to abandon the arot. He needs to bring the arot up to speed.",
                "পারিবারিক ব্যবসার হাল ধরা তরুণ আড়তদারকে আড়ত ছেড়ে দিতে হবে না। তাঁকে শুধু আড়তকে সময়ের সঙ্গে তাল মিলিয়ে নিতে হবে।",
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
                to={4}
                duration={1000}
                trigger="inview"
                sessionKey="commission-agents-hinge-4x"
              />
              {t(lang, "x", " গুণ")}
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
                "The volume a young arotdar typically moves on Fashol versus the old paper-and-handshake setup. Same arot, same family, same place at the market - now with a platform handling pricing, settlement, and downstream buyers.",
                "পুরনো কাগজ-আর-হাত মেলানোর ব্যবস্থার তুলনায় একজন তরুণ আড়তদার ফসলে সাধারণত যত বেশি পণ্য চালান। একই আড়ত, একই পরিবার, বাজারে একই জায়গা - এখন শুধু দাম, সেটেলমেন্ট আর ডাউনস্ট্রিম বায়ার সামলানোর একটি প্ল্যাটফর্মসহ।",
              )}
            </span>
          </DelayedFade>
        </div>
      </Section>

      {/* Section 4 - Dual bento comparison (paper, signature) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "The same arot. The same trade. Two outcomes.",
                "একই আড়ত। একই ব্যবসা। দুই ফল।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A side-by-side look at six operational dimensions of running an arot - first without Fashol, then once Fashol is plugged in.",
                "আড়ত চালানোর ছয়টি দিক পাশাপাশি রেখে দেখা - প্রথমে ফসল ছাড়া, তারপর ফসল যুক্ত হওয়ার পর।",
              )}
            </p>
          </Reveal>
        </div>

        <GenerationalBento />
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
              "“My father built this arot in 1987. He knew every farmer who walked in by name, and every buyer who called. I took over four years ago and I was losing volume - the buyers I grew up with were going to younger arotdars who could send a price by WhatsApp before noon. Fashol did not replace what my father built. It gave me a way to keep building it.”",
              "“আমার বাবা 1987 সালে এই আড়ত গড়ে তোলেন। যে কৃষক আসতেন তাঁকে নামে চিনতেন, যে বায়ার ফোন করতেন তাঁকেও। চার বছর আগে আমি হাল ধরি আর পণ্য হারাচ্ছিলাম - যে বায়ারদের সঙ্গে বড় হয়েছি তাঁরা চলে যাচ্ছিলেন এমন তরুণ আড়তদারদের কাছে যারা দুপুরের আগেই হোয়াটসঅ্যাপে দাম পাঠিয়ে দিতে পারত। বাবা যা গড়েছিলেন ফসল তা প্রতিস্থাপন করেনি। বরং তা ধরে রেখে আরও গড়ে তোলার একটা পথ দিয়েছে।”",
            )}
          </QuoteReveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-8 flex flex-col items-center">
              <span
                className="text-[14px]"
                style={{ fontWeight: 500, color: "var(--color-paper)" }}
              >
                {t(lang, "Imran Hossain", "ইমরান হোসেন")}
              </span>
              <span
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,251,234,0.65)" }}
              >
                {t(lang, "Arotdar, second generation, Karwan Bazar, Dhaka", "আড়তদার, দ্বিতীয় প্রজন্ম, কারওয়ান বাজার, ঢাকা")}
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface) */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(
                lang,
                "Forty-eight hours from first conversation to running on Fashol.",
                "প্রথম আলাপ থেকে ফসলে চালু হওয়া পর্যন্ত আটচল্লিশ ঘণ্টা।",
              )}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Arotdars are not onboarded overnight, but the rollout is short. Day one is a conversation - the arot's history, its book, the family relationships. Day two, a Fashol account goes live with regular farmers and buyers mapped in. Day three, transactions flow through Fashol alongside the paper ledger. By the end of week one, the ledger is the backup, not the primary record.",
                "আড়তদাররা এক রাতেই যুক্ত হন না, তবে পুরো প্রক্রিয়াটা সংক্ষিপ্ত। প্রথম দিন একটি আলাপ - আড়তের ইতিহাস, খতিয়ান, পারিবারিক সম্পর্ক। দ্বিতীয় দিন নিয়মিত কৃষক ও বায়ারদের যুক্ত করে একটি ফসল অ্যাকাউন্ট চালু হয়। তৃতীয় দিন কাগজের খাতার পাশাপাশি লেনদেন ফসলের মধ্য দিয়ে চলে। প্রথম সপ্তাহের শেষে খাতা হয়ে যায় ব্যাকআপ, মূল হিসাব নয়।",
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
            {t(lang, "Talk to Fashol's trade team", "ফসলের ট্রেড টিমের সঙ্গে কথা বলুন")}
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

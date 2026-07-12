"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";
import { t, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/site/LanguageProvider";

type Stop = {
  n: string;
  title: string;
  titleBn: string;
  body: string;
  bodyBn: string;
};

type Phase = {
  label: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  stops: Stop[];
};

const PHASES: ReadonlyArray<Phase> = [
  {
    label: "PHASE 01",
    title: "Inquiry",
    titleBn: "অনুসন্ধান",
    subtitle: "The first 24 hours.",
    subtitleBn: "প্রথম 24 ঘণ্টা।",
    stops: [
      {
        n: "1",
        title: "RFQ received.",
        titleBn: "RFQ গৃহীত।",
        body: "A buyer submits a request for quote through Hyperfarm or directly to the export desk. Volume, product spec, destination, target delivery window.",
        bodyBn: "একজন বায়ার হাইপারফার্মের মাধ্যমে অথবা সরাসরি এক্সপোর্ট ডেস্কে দরপত্রের অনুরোধ পাঠান। পরিমাণ, প্রোডাক্টের স্পেসিফিকেশন, গন্তব্য, কাঙ্ক্ষিত ডেলিভারির সময়সীমা।",
      },
      {
        n: "2",
        title: "CNF priced in 24 hours.",
        titleBn: "24 ঘণ্টায় CNF দাম।",
        body: "Fashol returns a full CNF quote within a business day. Pricing is live, benchmarked against 200-plus wholesale markets on the platform.",
        bodyBn: "ফসল এক কর্মদিবসের মধ্যেই পূর্ণ CNF কোটেশন দেয়। দাম লাইভ, প্ল্যাটফর্মের 200টির বেশি পাইকারি বাজারের বিপরীতে যাচাই করা।",
      },
      {
        n: "3",
        title: "Order placed.",
        titleBn: "অর্ডার নিশ্চিত।",
        body: "The buyer confirms. A dedicated Fashol export manager is assigned to the order from this point onward.",
        bodyBn: "বায়ার নিশ্চিত করেন। এই মুহূর্ত থেকে অর্ডারটির জন্য একজন ডেডিকেটেড ফসল এক্সপোর্ট ম্যানেজার নির্ধারিত হন।",
      },
    ],
  },
  {
    label: "PHASE 02",
    title: "Sourcing",
    titleBn: "সোর্সিং",
    subtitle: "Choosing the right farmer, the right crop, the right price.",
    subtitleBn: "সঠিক কৃষক, সঠিক ফসল, সঠিক দাম বেছে নেওয়া।",
    stops: [
      {
        n: "4",
        title: "Farmer matching.",
        titleBn: "কৃষক মেলানো।",
        body: "The order is matched against Fashol's network of 60,000 farmers across nine districts. GAP-certified products source from pre-certified farmers.",
        bodyBn: "নয়টি জেলাজুড়ে ফসলের 60,000 কৃষকের নেটওয়ার্কের সঙ্গে অর্ডারটি মেলানো হয়। GAP-সার্টিফায়েড প্রোডাক্ট আগে থেকেই সার্টিফায়েড কৃষকদের কাছ থেকে সংগ্রহ করা হয়।",
      },
      {
        n: "5",
        title: "Packaging engineered.",
        titleBn: "প্যাকেজিং তৈরি।",
        body: "Packaging is designed and tested for the specific product, destination climate, volume, and transit mode. It is the single biggest lever on post-harvest loss.",
        bodyBn: "নির্দিষ্ট প্রোডাক্ট, গন্তব্যের জলবায়ু, পরিমাণ ও পরিবহন মাধ্যমের জন্য প্যাকেজিং নকশা করা ও পরীক্ষা করা হয়। ফসল-পরবর্তী ক্ষতি ঠেকাতে এটিই সবচেয়ে বড় হাতিয়ার।",
      },
      {
        n: "6",
        title: "Sourcing begins.",
        titleBn: "সোর্সিং শুরু।",
        body: "Farmers are notified, harvest windows are coordinated, and produce is collected at the nearest Fashol hub.",
        bodyBn: "কৃষকদের জানানো হয়, ফসল তোলার সময় সমন্বয় করা হয়, আর ফসল নিকটতম ফসল হাবে সংগ্রহ করা হয়।",
      },
    ],
  },
  {
    label: "PHASE 03",
    title: "Processing",
    titleBn: "প্রসেসিং",
    subtitle: "Export-grade handling inside the Fashol hub.",
    subtitleBn: "ফসল হাবের ভেতরে এক্সপোর্ট-গ্রেড হ্যান্ডলিং।",
    stops: [
      {
        n: "7",
        title: "Grading and sorting.",
        titleBn: "গ্রেডিং ও বাছাই।",
        body: "Four-tier grading at intake. Only Grade A moves to export. Grade B and below route to domestic channels, so nothing is wasted.",
        bodyBn: "গ্রহণের সময়ই চার স্তরের গ্রেডিং। কেবল গ্রেড এ এক্সপোর্টে যায়। গ্রেড বি ও তার নিচের প্রোডাক্ট দেশীয় চ্যানেলে যায়, ফলে কিছুই নষ্ট হয় না।",
      },
      {
        n: "8",
        title: "EPZ-approved.",
        titleBn: "EPZ-অনুমোদিত।",
        body: "The graded shipment is moved through Fashol's EPZ-approved facility for final inspection, phytosanitary review, and pack-out.",
        bodyBn: "গ্রেড করা চালান চূড়ান্ত পরিদর্শন, ফাইটোস্যানিটারি যাচাই ও প্যাক-আউটের জন্য ফসলের EPZ-অনুমোদিত স্থাপনার ভেতর দিয়ে যায়।",
      },
      {
        n: "9",
        title: "Destination docs filed.",
        titleBn: "গন্তব্যের কাগজপত্র জমা।",
        body: "Export permits, phytosanitary certificates, certificates of origin, and destination import paperwork handled in-house. HACCP, BRC, and GlobalGAP sourced when required.",
        bodyBn: "এক্সপোর্ট অনুমতি, ফাইটোস্যানিটারি সনদ, উৎস সনদ ও গন্তব্যের আমদানি কাগজপত্র নিজেরাই সামলানো হয়। প্রয়োজনে HACCP, BRC ও GlobalGAP সংগ্রহ করা হয়।",
      },
    ],
  },
  {
    label: "PHASE 04",
    title: "Delivery",
    titleBn: "ডেলিভারি",
    subtitle: "Air and sea to the destination, with accountability after landing.",
    subtitleBn: "আকাশ ও সমুদ্রপথে গন্তব্যে, পৌঁছানোর পরও দায়বদ্ধতা বজায় রেখে।",
    stops: [
      {
        n: "10",
        title: "Logistics locked.",
        titleBn: "লজিস্টিকস চূড়ান্ত।",
        body: "Fashol selects air or sea based on product perishability, volume, destination, and buyer's commercial window. Booking is done on pre-negotiated rates with freight partners.",
        bodyBn: "প্রোডাক্টের পচনশীলতা, পরিমাণ, গন্তব্য ও বায়ারের বাণিজ্যিক সময়সীমার ভিত্তিতে ফসল আকাশ না সমুদ্রপথ বেছে নেয়। বুকিং হয় ফ্রেইট পার্টনারদের সঙ্গে আগে থেকে ঠিক করা হারে।",
      },
      {
        n: "11",
        title: "Booked and cleared.",
        titleBn: "বুকড ও ছাড়পত্র সম্পন্ন।",
        body: "The shipment is booked and cleared at origin. Buyer receives live tracking and customs documentation in the Hyperfarm dashboard.",
        bodyBn: "চালান উৎসেই বুক করা ও ছাড়পত্র সম্পন্ন হয়। বায়ার হাইপারফার্ম ড্যাশবোর্ডে লাইভ ট্র্যাকিং ও কাস্টমস ডকুমেন্টেশন পান।",
      },
      {
        n: "12",
        title: "Arrived, supported.",
        titleBn: "পৌঁছেছে, পাশে আছি।",
        body: "The buyer receives the shipment. Fashol's 24/7 desk handles any post-delivery issue - quality, documentation, reorder. The relationship continues past the port.",
        bodyBn: "বায়ার চালান বুঝে পান। ডেলিভারির পরের যেকোনো বিষয়-কোয়ালিটি, ডকুমেন্টেশন, রিঅর্ডার-ফসলের 24/7 ডেস্ক সামলায়। সম্পর্ক বন্দরের পরেও চলতে থাকে।",
      },
    ],
  },
];

const FOREST_85 = "rgba(6, 94, 58, 0.85)";
const CREAM_75 = "rgba(255, 251, 234, 0.75)";
const CREAM_25 = "rgba(255, 251, 234, 0.25)";
const BLACK_25 = "rgba(0, 0, 0, 0.25)";

type JourneyTone = "paper" | "surface" | "surface-deep" | "ink";

const TONE_BG: Record<JourneyTone, string> = {
  paper: "var(--color-paper)",
  surface: "var(--color-surface)",
  "surface-deep": "var(--color-surface-deep)",
  ink: "var(--color-ink)",
};

const DARK_TONES: ReadonlySet<JourneyTone> = new Set(["ink"]);

function PhaseHeader({
  phase,
  reduce,
  tone,
  lang,
}: {
  phase: Phase;
  reduce: boolean;
  tone: JourneyTone;
  lang: Lang;
}) {
  const initial = reduce ? false : { opacity: 0, y: 20 };
  const whileInView = reduce ? undefined : { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 4vw, 40px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          fontWeight: 500,
          color: DARK_TONES.has(tone)
            ? "var(--color-paper)"
            : "var(--color-deep-green)",
        }}
      >
        {t(lang, phase.title, phase.titleBn)}
      </h3>
    </motion.div>
  );
}

function StopCard({ stop, reduce, lang }: { stop: Stop; reduce: boolean; lang: Lang }) {
  const initial = reduce ? false : { opacity: 0, y: 20 };
  const whileInView = reduce ? undefined : { opacity: 1, y: 0 };
  return (
    <motion.article
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative overflow-hidden rounded-[12px] grid grid-cols-[110px_1fr] desktop:grid-cols-[220px_1fr] gap-6 desktop:gap-10 px-6 py-5 desktop:px-10 desktop:py-6 h-[200px] desktop:h-[220px]"
      style={{
        background: "var(--card-bg, var(--color-paper))",
      }}
    >
      <div
        className="self-center text-[120px] desktop:text-[180px]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          color: "var(--color-deep-green)",
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          fontFeatureSettings: '"lnum"',
          whiteSpace: "nowrap",
          clipPath: "inset(0 0 24% 0)",
          transform: "translateY(12%)",
        }}
      >
        {stop.n}
      </div>
      <div className="flex flex-col justify-center">
        <h4
          className="text-[22px] desktop:text-[26px]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-deep-green)",
          }}
        >
          {t(lang, stop.title, stop.titleBn)}
        </h4>
        <p
          className="mt-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            lineHeight: 1.6,
            color: FOREST_85,
          }}
        >
          {t(lang, stop.body, stop.bodyBn)}
        </p>
      </div>
    </motion.article>
  );
}

function ProgressBar({
  currentPhase,
  tone = "light",
}: {
  currentPhase: number;
  tone?: "light" | "dark";
}) {
  const filledColor = tone === "dark" ? "#000" : "var(--color-paper)";
  const emptyColor = tone === "dark" ? BLACK_25 : CREAM_25;
  return (
    <div className="flex gap-2">
      {PHASES.map((p, i) => {
        const filled = i <= currentPhase;
        return (
          <div
            key={p.label}
            className="h-[2px] flex-1"
            style={{
              background: filled ? filledColor : emptyColor,
              transition: "background 200ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

function LeftPanel({ currentPhase, lang }: { currentPhase: number; lang: Lang }) {
  return (
    <>
      <Image
        src="/images/solutions/exporters/journey3.jpg"
        alt="A Bangladeshi farmer at harvest in the golden morning light"
        fill
        sizes="(min-width: 1200px) 45vw, 100vw"
        className="object-cover"
        style={{ objectPosition: "center" }}
      />
      <div className="relative h-full w-full flex flex-col items-center p-8 tablet:p-12 desktop:p-16">
        <div className="flex flex-col">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 10vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 500,
            color: "var(--color-paper)",
          }}
        >
          {t(lang, "Journey.", "যাত্রা।")}
        </h2>

        <div
          style={{
            paddingLeft: "clamp(28px, 4.2vw, 52px)",
            marginTop: "7px",
          }}
        >
          <div className="w-[74%]">
            <ProgressBar currentPhase={currentPhase} />
          </div>
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 15,
              lineHeight: 1,
              color: CREAM_75,
            }}
          >
            {t(lang, "RFQ to retail shelf in twelve precise stops.", "RFQ থেকে খুচরা তাক পর্যন্ত বারোটি নিখুঁত ধাপে।")}
          </p>
        </div>
        </div>
      </div>
    </>
  );
}

export function JourneyStickyScroll({
  tone = "paper",
}: {
  tone?: JourneyTone;
} = {}) {
  const lang = useLang();
  const reduce = useReducedMotion() ?? false;
  const [currentPhase, setCurrentPhase] = useState(0);
  const phaseRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx: number | null = null;
        let bestDist = Infinity;
        const mid = window.innerHeight / 2;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = phaseRefs.current.indexOf(e.target as HTMLDivElement);
          if (i < 0) return;
          const rect = e.boundingClientRect;
          const entryMid = rect.top + rect.height / 2;
          const dist = Math.abs(entryMid - mid);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        });
        if (bestIdx !== null) setCurrentPhase(bestIdx);
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    phaseRefs.current.forEach((el) => {
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-label="Export journey stops"
      className="relative"
      style={{ background: TONE_BG[tone] }}
    >
      <div className="flex flex-col desktop:flex-row desktop:gap-4 desktop:px-8 desktop:py-8">
        {/* Left: sticky photo panel on desktop, static image block on mobile */}
        <div className="w-full desktop:w-[45%] relative">
          <div
            className="relative w-full overflow-hidden h-[70vh] min-h-[480px] desktop:h-[calc(100vh-64px)] desktop:sticky desktop:top-8 desktop:rounded-[16px]"
            style={{ background: "var(--color-deep-green)" }}
          >
            <LeftPanel currentPhase={currentPhase} lang={lang} />
          </div>
        </div>

        {/* Right: scrolling bento panel. Page bg; only cards carry color. */}
        <div className="w-full desktop:w-[55%] px-6 tablet:px-10 desktop:px-16 py-16 desktop:py-20">
          {PHASES.map((phase, pi) => (
            <div
              key={phase.label}
              ref={(el) => {
                phaseRefs.current[pi] = el;
              }}
              className={pi > 0 ? "mt-16" : ""}
            >
              <div className="mb-12">
                <PhaseHeader phase={phase} reduce={reduce} tone={tone} lang={lang} />
              </div>
              <div className="flex flex-col gap-5">
                {phase.stops.map((stop) => (
                  <StopCard key={stop.n} stop={stop} reduce={reduce} lang={lang} />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-10 flex justify-center">
            <TalkToSalesButton />
          </div>
        </div>
      </div>
    </section>
  );
}

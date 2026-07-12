"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/site/LanguageProvider";

type CardBase = {
  id: number;
  // 12-col grid on desktop. Row 1 = 5/3/4, Row 2 = 3/6/3, Row 3 = 3/9.
  colsDesktop: 3 | 4 | 5 | 6 | 9;
  colsTablet: 1 | 2;
};

type StatCard = CardBase & {
  kind: "stat";
  display: string;
  displayBn: string;
  displaySize: "lg" | "phrase";
  body: string;
  bodyBn: string;
};

type IllustrationCard = CardBase & {
  kind: "illustration";
  // Omit `illustrationSrc` to render the cream placeholder until artwork ships.
  illustrationSrc?: string;
  illustrationAlt: string;
  illustrationWidth: number;
  illustrationHeight: number;
  illustrationAlign: "left" | "center" | "bleed";
  statement: string;
  statementBn: string;
  statementSize: "sm" | "md" | "lg" | "xl";
  body?: string;
  bodyBn?: string;
};

type Card = StatCard | IllustrationCard;

const CARDS: ReadonlyArray<Card> = [
  {
    id: 1,
    colsDesktop: 5,
    colsTablet: 2,
    kind: "illustration",
    illustrationSrc: "/images/solutions/wholesalers/comparison/network.png",
    illustrationAlt:
      "Six farmers on field plots connected by lines to a single orange-roofed Fashol hub at the center",
    illustrationWidth: 400,
    illustrationHeight: 400,
    illustrationAlign: "left",
    statement: "One counterparty for sourcing, settlement, and grading.",
    statementBn: "সোর্সিং, সেটেলমেন্ট ও গ্রেডিংয়ের জন্য একটিই পক্ষ।",
    statementSize: "md",
  },
  {
    id: 2,
    colsDesktop: 3,
    colsTablet: 1,
    kind: "stat",
    display: "50",
    displayBn: "50",
    displaySize: "lg",
    body: "districts of network redundancy keep supply steady.",
    bodyBn: "জেলাজুড়ে নেটওয়ার্কের বাড়তি সক্ষমতা সরবরাহ স্থির রাখে।",
  },
  {
    id: 3,
    colsDesktop: 4,
    colsTablet: 1,
    kind: "stat",
    display: "200+",
    displayBn: "200+",
    displaySize: "lg",
    body: "wholesale markets benchmarked for live, published pricing.",
    bodyBn: "পাইকারি বাজার যাচাই করে লাইভ, প্রকাশিত দাম নির্ধারণ করা হয়।",
  },
  {
    id: 4,
    colsDesktop: 3,
    colsTablet: 1,
    kind: "illustration",
    illustrationSrc: "/images/solutions/wholesalers/comparison/grading.png",
    illustrationAlt:
      "Four grading tiers separated at a Fashol hub before dispatch",
    illustrationWidth: 160,
    illustrationHeight: 120,
    illustrationAlign: "center",
    statement: "Four-tier grading applied at the hub.",
    statementBn: "হাবেই চার স্তরের গ্রেডিং।",
    statementSize: "sm",
  },
  {
    id: 5,
    colsDesktop: 6,
    colsTablet: 2,
    kind: "illustration",
    illustrationSrc: "/images/solutions/wholesalers/comparison/credit.png",
    illustrationAlt:
      "Credit lines extending from the Fashol network through to downstream buyers",
    illustrationWidth: 280,
    illustrationHeight: 180,
    illustrationAlign: "center",
    statement: "Credit underwritten by the Fashol network.",
    statementBn: "ফসল নেটওয়ার্কের নিশ্চয়তায় দেওয়া ঋণ।",
    statementSize: "md",
    body: "The trader extends downstream terms without touching personal working capital.",
    bodyBn: "ব্যবসায়ী নিজের চলতি মূলধনে হাত না দিয়েই ডাউনস্ট্রিমে বাকির সুবিধা দিতে পারেন।",
  },
  {
    id: 6,
    colsDesktop: 3,
    colsTablet: 1,
    kind: "stat",
    display: "T+0",
    displayBn: "T+0",
    displaySize: "lg",
    body: "same-day settlement on delivered volume.",
    bodyBn: "সরবরাহকৃত পরিমাণে একই দিনে সেটেলমেন্ট।",
  },
  {
    id: 7,
    colsDesktop: 3,
    colsTablet: 1,
    kind: "stat",
    display: "At the hub.",
    displayBn: "হাবেই।",
    displaySize: "phrase",
    body: "Quality disputes resolved before dispatch, not after.",
    bodyBn: "কোয়ালিটির বিরোধ চালান পাঠানোর আগেই মেটানো হয়, পরে নয়।",
  },
  {
    id: 8,
    colsDesktop: 9,
    colsTablet: 2,
    kind: "illustration",
    illustrationSrc: "/images/solutions/wholesalers/comparison/scale.png",
    illustrationAlt:
      "A wide network of hubs and cold-chain routes scaling beyond a single trader",
    illustrationWidth: 1600,
    illustrationHeight: 800,
    illustrationAlign: "bleed",
    statement: "Volume scales with the network, not the trader.",
    statementBn: "পরিমাণ বাড়ে নেটওয়ার্কের সঙ্গে, ব্যবসায়ীর সঙ্গে নয়।",
    statementSize: "xl",
  },
];

export function ComparisonBento() {
  const lang = useLang();
  const reduce = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduce) {
      setInView(true);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-1 min-[900px]:grid-cols-2 desktop:grid-cols-12 gap-5"
      style={{ gridAutoRows: "minmax(320px, auto)" }}
    >
      {CARDS.map((card, i) => (
        <BentoCard
          key={card.id}
          card={card}
          index={i}
          visible={inView}
          reduce={reduce}
          lang={lang}
        />
      ))}
    </div>
  );
}

function BentoCard({
  card,
  index,
  visible,
  reduce,
  lang,
}: {
  card: Card;
  index: number;
  visible: boolean;
  reduce: boolean;
  lang: Lang;
}) {
  const colSpanClass = buildColSpan(card.colsTablet, card.colsDesktop);
  const transitionDelay = reduce ? 0 : index * 80;

  const cardStyle: CSSProperties = {
    backgroundColor: "var(--card-bg, var(--color-paper))",
    borderRadius: "12px",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: reduce
      ? undefined
      : `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}ms`,
  };

  return (
    <article
      className={`relative flex flex-col p-6 min-[900px]:p-8 ${colSpanClass}`}
      style={cardStyle}
    >
      <div className="flex-1 flex flex-col">
        {card.kind === "stat" ? (
          <StatContent card={card} lang={lang} />
        ) : (
          <IllustrationContent card={card} lang={lang} />
        )}
      </div>
    </article>
  );
}

function StatContent({ card, lang }: { card: StatCard; lang: Lang }) {
  const fontSize =
    card.displaySize === "lg"
      ? "clamp(48px, 6.5vw, 88px)"
      : "clamp(32px, 4vw, 56px)";

  return (
    <>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize,
          fontWeight: 500,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          color: "var(--color-deep-green)",
          margin: 0,
        }}
      >
        {t(lang, card.display, card.displayBn)}
      </h3>
      <p
        style={{
          marginTop: "20px",
          fontFamily: "var(--font-display)",
          fontSize: "17px",
          lineHeight: 1.5,
          color: "rgba(6, 94, 58, 0.85)",
        }}
      >
        {t(lang, card.body, card.bodyBn)}
      </p>
    </>
  );
}

function IllustrationContent({ card, lang }: { card: IllustrationCard; lang: Lang }) {
  const statementSize =
    card.statementSize === "xl"
      ? "clamp(32px, 4vw, 48px)"
      : card.statementSize === "lg"
      ? "clamp(28px, 3.6vw, 40px)"
      : card.statementSize === "md"
      ? "clamp(24px, 2.8vw, 32px)"
      : "clamp(20px, 2vw, 24px)";

  return (
    <>
      <Illustration card={card} />
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: statementSize,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--color-deep-green)",
          margin: "24px 0 0 0",
        }}
      >
        {t(lang, card.statement, card.statementBn)}
      </h3>
      {card.body && (
        <p
          style={{
            marginTop: "16px",
            fontFamily: "var(--font-display)",
            fontSize: "15px",
            lineHeight: 1.5,
            color: "rgba(6, 94, 58, 0.85)",
          }}
        >
          {t(lang, card.body, card.bodyBn ?? card.body)}
        </p>
      )}
    </>
  );
}

function Illustration({ card }: { card: IllustrationCard }) {
  const wrapperStyle: CSSProperties =
    card.illustrationAlign === "bleed"
      ? {
          width: "100%",
          aspectRatio: `${card.illustrationWidth} / ${card.illustrationHeight}`,
        }
      : {
          width: "100%",
          maxWidth: `${card.illustrationWidth}px`,
          aspectRatio: `${card.illustrationWidth} / ${card.illustrationHeight}`,
          alignSelf:
            card.illustrationAlign === "center" ? "center" : "flex-start",
        };

  if (!card.illustrationSrc) {
    return <IllustrationPlaceholder style={wrapperStyle} />;
  }

  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        src={card.illustrationSrc}
        alt={card.illustrationAlt}
        fill
        sizes={`${card.illustrationWidth}px`}
        className="object-contain"
      />
    </div>
  );
}

function IllustrationPlaceholder({ style }: { style: CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        ...style,
        backgroundColor: "var(--color-paper)",
        border: "1px dashed rgba(184, 196, 165, 0.45)",
        borderRadius: "6px",
      }}
    />
  );
}

function buildColSpan(tablet: 1 | 2, desktop: 3 | 4 | 5 | 6 | 9): string {
  const parts: string[] = ["col-span-1"];
  if (tablet === 2) parts.push("min-[900px]:col-span-2");
  // Desktop switch maps to 12-col spans. Literals only so Tailwind's JIT sees each class.
  switch (desktop) {
    case 3:
      parts.push("desktop:col-span-3");
      break;
    case 4:
      parts.push("desktop:col-span-4");
      break;
    case 5:
      parts.push("desktop:col-span-5");
      break;
    case 6:
      parts.push("desktop:col-span-6");
      break;
    case 9:
      parts.push("desktop:col-span-9");
      break;
  }
  return parts.join(" ");
}

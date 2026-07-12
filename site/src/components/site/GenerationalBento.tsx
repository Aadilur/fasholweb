"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/site/LanguageProvider";

// Editorial ease-out curve shared across every reveal in this section.
const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

type BentoCard = {
  dim: string;
  dimBn: string;
  text: string;
  textBn: string;
  wide: boolean;
};

// Without Fashol - row 1 wide, then 2+2, then wide.
const LEFT_CARDS: ReadonlyArray<BentoCard> = [
  {
    dim: "PRICING",
    dimBn: "দাম",
    text: "Set every morning by what walked into the market. Negotiated from zero, every day.",
    textBn: "প্রতিদিন সকালে বাজারে যা আসে তা দিয়েই দাম ঠিক হয়। প্রতিদিন শূন্য থেকে দর-কষাকষি।",
    wide: true,
  },
  {
    dim: "SETTLEMENT",
    dimBn: "সেটেলমেন্ট",
    text: "When it happens. Sometimes a week, sometimes more.",
    textBn: "যখন হয় তখন। কখনো এক সপ্তাহ, কখনো আরও বেশি।",
    wide: false,
  },
  {
    dim: "BUYERS",
    dimBn: "বায়ার",
    text: "Found one phone call at a time.",
    textBn: "একটা একটা ফোন করে খুঁজে বের করা।",
    wide: false,
  },
  {
    dim: "REACH",
    dimBn: "নাগাল",
    text: "Defined by who could come to the market.",
    textBn: "যে বাজারে আসতে পারত, তাতেই সীমাবদ্ধ।",
    wide: false,
  },
  {
    dim: "QUALITY",
    dimBn: "কোয়ালিটি",
    text: "Disputed at the stall, after delivery.",
    textBn: "ডেলিভারির পর দোকানের সামনে নিয়ে বিতর্ক।",
    wide: false,
  },
  {
    dim: "CREDIT",
    dimBn: "ক্রেডিট",
    text: "Floated from personal cash. Capped by what the arot can afford to risk.",
    textBn: "নিজের পকেটের টাকায় চালানো। আড়ত যতটুকু রিস্ক নিতে পারে, ততটুকুতেই সীমা।",
    wide: true,
  },
];

// With Fashol - 2+2, wide, 2+2, wide. Intentionally asymmetric to the left.
const RIGHT_CARDS: ReadonlyArray<BentoCard> = [
  {
    dim: "PRICING",
    dimBn: "দাম",
    text: "Live pricing benchmarked against 200+ wholesale markets, daily.",
    textBn: "প্রতিদিন 200-এর বেশি পাইকারি বাজারের সঙ্গে বেঞ্চমার্ক করা লাইভ দাম।",
    wide: false,
  },
  {
    dim: "SETTLEMENT",
    dimBn: "সেটেলমেন্ট",
    text: "Same-day, digital, on every transaction.",
    textBn: "প্রতিটি ট্রানজেকশনে একই দিনে, ডিজিটাল সেটেলমেন্ট।",
    wide: false,
  },
  {
    dim: "BUYERS",
    dimBn: "বায়ার",
    text: "Restaurants, supershops, quick commerce - already on Hyperfarm. The downstream book is built in.",
    textBn: "রেস্তোরাঁ, সুপারশপ, কুইক কমার্স - সবাই আগে থেকেই হাইপারফার্মে। ডাউনস্ট্রিম বুক ভেতরেই তৈরি।",
    wide: true,
  },
  {
    dim: "REACH",
    dimBn: "নাগাল",
    text: "Extended to 50 districts and platforms across Bangladesh.",
    textBn: "বাংলাদেশজুড়ে 50 জেলা ও প্ল্যাটফর্ম পর্যন্ত বিস্তৃত।",
    wide: false,
  },
  {
    dim: "QUALITY",
    dimBn: "কোয়ালিটি",
    text: "Four-tier grading at the hub, before dispatch.",
    textBn: "পাঠানোর আগে হাবেই চার স্তরের গ্রেডিং।",
    wide: false,
  },
  {
    dim: "CREDIT",
    dimBn: "ক্রেডিট",
    text: "Same-day settlement and Fashol-backed credit extend working capital without touching personal cash.",
    textBn: "একই দিনে সেটেলমেন্ট আর ফসল-ব্যাকড ক্রেডিট নিজের পকেটের টাকা না ছুঁয়েই ওয়ার্কিং ক্যাপিটাল বাড়ায়।",
    wide: true,
  },
];

// Cascade timing, all in ms and relative to the section's trigger moment.
// Left completes around 1100ms, right starts 300ms later at 1400ms,
// right completes around 2300ms, closing line starts 300ms later at 2600ms.
const DELAY_LEFT_LABEL = 200;
const DELAY_LEFT_CARDS = 400;
const DELAY_RIGHT_LABEL = 1400;
const DELAY_RIGHT_CARDS = 1600;
const DELAY_CLOSING = 2600;
const CARD_STAGGER = 80;
const CARD_DURATION = 400;

// Card shadow applied to the right-half (With Fashol) cards so they visibly
// lift off the surface-deep half background. Deliberately soft - presence
// not assertion.
const RIGHT_CARD_SHADOW = "0 1px 3px rgba(0, 0, 0, 0.06)";

export function GenerationalBento() {
  const lang = useLang();
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const started = reduce ? true : triggered;

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTriggered(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  const fade = (delay: number, duration = CARD_DURATION): CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? "translateY(0)" : "translateY(12px)",
    transition: reduce
      ? "none"
      : `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
  });

  return (
    <div ref={containerRef} className="mt-12 tablet:mt-16">
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-6">
        {/* Left half - Without Fashol. Paper bg (blends into section). */}
        <section
          aria-label="Without Fashol"
          className="rounded-2xl p-3 tablet:p-4"
          style={{ background: "var(--color-paper)" }}
        >
          <div style={fade(DELAY_LEFT_LABEL)}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.7vw, 20px)",
                lineHeight: 1.15,
                letterSpacing: "-0.035em",
                fontWeight: 500,
                color: "rgba(6, 94, 58, 0.35)",
              }}
            >
              {t(lang, "Without Fashol.", "ফসল ছাড়া।")}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 tablet:gap-4">
            {LEFT_CARDS.map((c, i) => (
              <div
                key={c.dim}
                className={`rounded-xl p-6 ${c.wide ? "col-span-2" : ""}`}
                style={{
                  background: "var(--color-surface-deep)",
                  ...fade(DELAY_LEFT_CARDS + i * CARD_STAGGER),
                }}
              >
                <span
                  className="block text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    color: "rgba(6, 94, 58, 0.35)",
                  }}
                >
                  {t(lang, c.dim, c.dimBn)}
                </span>
                <p
                  className="mt-4 text-[17px] leading-[1.5]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "rgba(6, 94, 58, 0.45)",
                  }}
                >
                  {t(lang, c.text, c.textBn)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Right half - With Fashol. Surface-deep bg + raised cream cards. */}
        <section
          aria-label="With Fashol"
          className="rounded-2xl p-3 tablet:p-4"
          style={{ background: "var(--color-surface-deep)" }}
        >
          <div style={fade(DELAY_RIGHT_LABEL)}>
            <Image
              src="/fashol-icon-green.png"
              alt="Fashol"
              width={1876}
              height={1506}
              sizes="60px"
              className="block h-12 tablet:h-[60px] w-auto object-contain object-left -ml-2 tablet:-ml-3"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 tablet:gap-4">
            {RIGHT_CARDS.map((c, i) => (
              <div
                key={c.dim}
                className={`rounded-xl p-6 ${c.wide ? "col-span-2" : ""}`}
                style={{
                  background: "var(--color-card-raised)",
                  border: "1px solid rgba(6, 94, 58, 0.15)",
                  boxShadow: RIGHT_CARD_SHADOW,
                  ...fade(DELAY_RIGHT_CARDS + i * CARD_STAGGER),
                }}
              >
                <span
                  className="block text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    color: "rgba(6, 94, 58, 0.8)",
                  }}
                >
                  {t(lang, c.dim, c.dimBn)}
                </span>
                <p
                  className="mt-4 text-[17px] leading-[1.5]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--color-deep-green)",
                  }}
                >
                  {t(lang, c.text, c.textBn)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Closing line - letter-spacing ease-in */}
      <div className="mt-16 tablet:mt-20 text-center">
        <p
          className="text-[28px] tablet:text-[36px] desktop:text-[40px] leading-[1.15]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--color-deep-green)",
            opacity: started ? 1 : 0,
            letterSpacing: started ? "0em" : "0.06em",
            transition: reduce
              ? "none"
              : `opacity 800ms ${EASE} ${DELAY_CLOSING}ms, letter-spacing 800ms ${EASE} ${DELAY_CLOSING}ms`,
          }}
        >
          {t(lang, "Same arot. Two arots.", "একই আড়ত। দুই আড়ত।")}
        </p>
      </div>
    </div>
  );
}

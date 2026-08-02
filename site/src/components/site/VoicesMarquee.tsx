"use client";

import Image from "next/image";
import { VOICES } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/site/LanguageProvider";

export function VoicesMarquee() {
  const lang = useLang();

  return (
    <>
      <style>{`
        @keyframes voices-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .voices-track {
          animation: voices-scroll 60s linear infinite;
          will-change: transform;
        }
        .voices-viewport:hover .voices-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .voices-viewport { overflow-x: auto; }
          .voices-track { animation: none; }
        }
      `}</style>

      <Reveal>
        <h2 className="t-h2 !text-[var(--color-paper)]">
          {t(
            lang,
            "The network, in the words of the people on it.",
            "নেটওয়ার্ক, যারা এর অংশ তাদের নিজেদের কথায়।",
          )}
        </h2>
      </Reveal>

      <div
        aria-label={t(lang, "Customer voices", "ক্রেতাদের কথা")}
        className="voices-viewport relative mt-6 tablet:mt-8 left-1/2 -translate-x-1/2 w-screen overflow-hidden"
      >
        <div className="voices-track flex gap-6 w-max py-1">
          {[...VOICES, ...VOICES].map((v, i) => (
            <figure
              key={`${v.name}-${i}`}
              className="shrink-0 w-[320px] tablet:w-[380px] bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] p-8 flex flex-col gap-6 min-h-[280px]"
            >
              <blockquote className="text-[15px] leading-[1.55] !text-[var(--color-ink)] flex-1">
                {t(lang, v.quote, v.quoteBn)}
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-auto">
                <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden border border-[rgba(19,19,19,0.08)] bg-[var(--color-grain)]">
                  <Image
                    src={v.image}
                    alt=""
                    width={40}
                    height={40}
                    className="block w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[13px] !text-[var(--color-ink)]"
                    style={{ fontWeight: 500 }}
                  >
                    {t(lang, v.name, v.nameBn)}
                  </span>
                  <span className="text-[12px] !text-[var(--color-ink-muted)] mt-0.5">
                    {t(lang, v.role, v.roleBn)}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}

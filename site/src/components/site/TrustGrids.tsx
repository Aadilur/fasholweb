"use client";

import Image from "next/image";
import { PARTNERS, INVESTORS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/site/LanguageProvider";

export function TrustGrids() {
  const lang = useLang();

  return (
    <>
      <Reveal as="h2" className="t-h2 max-w-[900px]">
        {t(
          lang,
          "The buyers on the platform. The investors behind it.",
          "প্ল্যাটফর্মে থাকা বায়াররা। পেছনে থাকা বিনিয়োগকারীরা।",
        )}
      </Reveal>

      <div className="mt-14 tablet:mt-16">
        <div className="grid grid-cols-3 tablet:grid-cols-4 desktop:grid-cols-6 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-2xl overflow-hidden">
          {PARTNERS.map((p) => (
            <div
              key={p.alt}
              className="bg-white aspect-[4/3] flex items-center justify-center p-4 tablet:p-5"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={240}
                height={120}
                className="max-h-[64px] w-auto max-w-[82%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 tablet:mt-14">
        <div className="grid grid-cols-2 tablet:grid-cols-5 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-2xl overflow-hidden">
          {INVESTORS.map((p) => (
            <div
              key={p.alt}
              className="bg-white aspect-[4/3] flex items-center justify-center p-6"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={160}
                height={60}
                className="max-h-[52px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

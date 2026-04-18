import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  meta?: React.ReactNode;
  align?: "left" | "center";
};

export function PageHeader({ eyebrow, title, lede, meta, align = "left" }: Props) {
  return (
    <div className="container-page pt-[112px] tablet:pt-[144px] pb-16 tablet:pb-24">
      <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-4xl"}>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} as="h1" className="t-hero mt-6">
          {title}
        </Reveal>
        {lede && (
          <Reveal delay={0.16} as="p" className="t-body-lg mt-6 max-w-2xl">
            {lede}
          </Reveal>
        )}
        {meta && (
          <Reveal delay={0.24} className="mt-8 t-mono text-[11px] text-[var(--color-ink-muted)]">
            {meta}
          </Reveal>
        )}
      </div>
    </div>
  );
}

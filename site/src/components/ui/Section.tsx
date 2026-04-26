import clsx from "clsx";

export type SectionTone = "paper" | "surface" | "surface-deep" | "ink" | "grain";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
  size?: "base" | "sm";
  id?: string;
};

export const toneClass: Record<SectionTone, string> = {
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)] [--card-bg:var(--color-paper)]",
  surface: "bg-[var(--color-surface)] text-[var(--color-ink)] [--card-bg:var(--color-paper)]",
  "surface-deep":
    "bg-[var(--color-surface-deep)] text-[var(--color-ink)] [--card-bg:var(--color-card-raised)]",
  ink: "bg-[var(--color-ink)] text-[var(--color-paper)] [--card-bg:var(--color-paper)]",
  grain: "bg-[var(--color-grain)] text-[var(--color-ink)] [--card-bg:var(--color-paper)]",
};

export function Section({ children, className, tone = "paper", size = "base", id }: Props) {
  return (
    <section
      id={id}
      className={clsx(size === "sm" ? "section-y-sm" : "section-y", toneClass[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "ink" | "grain";
  size?: "base" | "sm";
  id?: string;
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
  surface: "bg-[var(--color-surface)] text-[var(--color-ink)]",
  ink: "bg-[var(--color-ink)] text-[var(--color-paper)]",
  grain: "bg-[var(--color-grain)] text-[var(--color-ink)]",
};

export function Section({ children, className, tone = "paper", size = "base", id }: Props) {
  return (
    <section
      id={id}
      className={clsx(size === "sm" ? "section-y-sm" : "section-y", toneMap[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

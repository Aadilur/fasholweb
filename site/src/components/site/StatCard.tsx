import clsx from "clsx";

type Props = {
  value: React.ReactNode;
  label: React.ReactNode;
  note?: React.ReactNode;
  tone?: "paper" | "surface" | "ink" | "lime";
  size?: "md" | "lg";
  className?: string;
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  paper: "bg-[var(--color-paper)] border border-[var(--color-line)]",
  surface: "bg-[var(--color-surface)]",
  ink: "bg-[var(--color-ink)] text-[var(--color-paper)]",
  lime: "bg-[var(--color-lime)] text-[var(--color-ink)] border border-[var(--color-ink)]",
};

export function StatCard({ value, label, note, tone = "paper", size = "md", className }: Props) {
  return (
    <div
      className={clsx(
        "rounded-3xl p-6 tablet:p-8 flex flex-col gap-3",
        toneMap[tone],
        size === "lg" ? "min-h-[220px]" : "min-h-[170px]",
        className
      )}
    >
      <div
        className={clsx(
          size === "lg" ? "text-[56px] tablet:text-[72px]" : "text-[40px] tablet:text-[56px]",
          "leading-[1] tracking-[-0.04em] t-tabular",
        )}
        style={{ fontWeight: 500 }}
      >
        {value}
      </div>
      <div className="t-body-sm mt-auto">{label}</div>
      {note && <div className="t-mono text-[11px] opacity-70">{note}</div>}
    </div>
  );
}

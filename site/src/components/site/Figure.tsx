import Image from "next/image";
import clsx from "clsx";

type Props = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  credit?: React.ReactNode;
  figNumber?: string;
  priority?: boolean;
  aspect?: string; // e.g. "16/9"
  className?: string;
  rounded?: boolean;
};

export function Figure({
  src,
  alt,
  caption,
  credit,
  figNumber,
  priority,
  aspect = "16/9",
  className,
  rounded = true,
}: Props) {
  return (
    <figure className={clsx("flex flex-col gap-4", className)}>
      <div
        className={clsx("relative overflow-hidden bg-[var(--color-surface)]", rounded && "rounded-3xl")}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1200px) 1100px, (min-width: 810px) 90vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      {(caption || credit || figNumber) && (
        <figcaption className="flex flex-col tablet:flex-row tablet:items-baseline tablet:justify-between gap-2 t-body-sm text-[var(--color-ink-muted)]">
          <div className="max-w-2xl">
            {figNumber && <span className="t-mono text-[11px] text-[var(--color-ink)] mr-2">{figNumber}</span>}
            {caption}
          </div>
          {credit && <div className="t-mono text-[11px]">{credit}</div>}
        </figcaption>
      )}
    </figure>
  );
}

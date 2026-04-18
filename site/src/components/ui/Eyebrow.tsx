import clsx from "clsx";

export function Eyebrow({
  children,
  className,
  withBar = true,
}: {
  children: React.ReactNode;
  className?: string;
  withBar?: boolean;
}) {
  return (
    <span className={clsx("t-eyebrow", withBar && "eyebrow-bar", className)}>
      {children}
    </span>
  );
}

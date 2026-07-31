"use client";

import dynamic from "next/dynamic";

const GlobeFigure = dynamic(
  () =>
    import("@/components/figures/Globe").then((mod) => ({
      default: mod.GlobeFigure,
    })),
  { ssr: false },
);

export { GlobeFigure };

/**
 * Bangladesh map figure: country outline with pulsing hub markers.
 * Coordinates are derived from real lat/lon (88.0-92.7 E, 26.6-20.7 N)
 * mapped into a 100 x 125 viewBox. Boundary is a hand-tuned approximation,
 * not GIS-grade.
 */

type Hub = { name: string; x: number; y: number; hq?: boolean };

const HUBS: Hub[] = [
  { name: "Rajshahi",   x: 13, y: 47 },
  { name: "Bogura",     x: 29, y: 37 },
  { name: "Mymensingh", x: 51, y: 39 },
  { name: "Sylhet",     x: 82, y: 36 },
  { name: "Dhaka",      x: 51, y: 59, hq: true },
  { name: "Comilla",    x: 68, y: 66 },
  { name: "Jashore",    x: 26, y: 73 },
  { name: "Barishal",   x: 50, y: 83 },
  { name: "Khulna",     x: 33, y: 80 },
  { name: "Satkhira",   x: 23, y: 82 },
  { name: "Chattogram", x: 80, y: 90 },
];

const BANGLADESH_PATH =
  "M 16 2 L 18 10 L 20 18 L 26 22 L 32 18 L 38 14 L 44 16 L 50 12 L 56 16 L 62 14 L 68 18 L 74 14 L 80 12 L 86 16 L 92 22 L 96 28 L 94 34 L 88 36 L 82 38 L 78 40 L 74 36 L 70 40 L 70 46 L 74 50 L 78 54 L 76 60 L 78 66 L 82 72 L 84 78 L 86 84 L 88 92 L 90 100 L 92 110 L 90 118 L 86 122 L 82 116 L 78 108 L 76 100 L 72 92 L 68 88 L 62 90 L 58 88 L 54 92 L 48 94 L 42 92 L 36 94 L 30 90 L 24 92 L 18 90 L 12 86 L 10 80 L 14 74 L 18 68 L 14 60 L 16 52 L 10 46 L 12 38 L 8 32 L 10 24 L 12 16 Z";

export function BangladeshMapFigure() {
  return (
    <div className="card-plain p-4 tablet:p-8 bg-[var(--color-grain)] w-full">
      <div className="relative aspect-[4/5] w-full max-w-[520px] mx-auto">
        <svg
          viewBox="0 0 100 125"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <radialGradient id="hubGlow">
              <stop offset="0%" stopColor="var(--color-deep-green)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-deep-green)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hqGlow">
              <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Country outline */}
          <path
            d={BANGLADESH_PATH}
            fill="rgba(19,19,19,0.045)"
            stroke="rgba(19,19,19,0.32)"
            strokeWidth="0.45"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Hub markers: outer pulsing halo + solid center */}
          {HUBS.map((h, i) => {
            const delay = (i * 0.35) % 2.6;
            const halo = h.hq ? { from: 3, to: 8 } : { from: 2, to: 5.5 };
            const dotR = h.hq ? 1.8 : 1.2;
            const fill = h.hq ? "var(--color-terracotta)" : "var(--color-deep-green)";
            const gradId = h.hq ? "hqGlow" : "hubGlow";
            return (
              <g key={h.name}>
                <circle cx={h.x} cy={h.y} r={halo.from} fill={`url(#${gradId})`}>
                  <animate
                    attributeName="r"
                    values={`${halo.from};${halo.to};${halo.from}`}
                    dur="2.8s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.15;0.85;0.15"
                    dur="2.8s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={h.x} cy={h.y} r={dotR} fill={fill}>
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2.8s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

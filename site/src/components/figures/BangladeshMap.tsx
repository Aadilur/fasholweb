/**
 * Schematic map of Bangladesh with 9 hub markers across 8 divisions.
 * Coordinates are rough geographic proportions — this is an editorial
 * schematic, not a GIS-accurate render.
 */

type Hub = { name: string; x: number; y: number; hq?: boolean; division: string };

const HUBS: Hub[] = [
  { name: "Rangpur",     division: "Rangpur",     x: 36, y: 18 },
  { name: "Rajshahi",    division: "Rajshahi",    x: 26, y: 40 },
  { name: "Bogura",      division: "Rajshahi",    x: 38, y: 34 },
  { name: "Mymensingh",  division: "Mymensingh",  x: 54, y: 38 },
  { name: "Sylhet",      division: "Sylhet",      x: 78, y: 36 },
  { name: "Dhaka · HQ",  division: "Dhaka",       x: 52, y: 54, hq: true },
  { name: "Jashore",     division: "Khulna",      x: 32, y: 64 },
  { name: "Khulna",      division: "Khulna",      x: 38, y: 72 },
  { name: "Satkhira",    division: "Khulna",      x: 28, y: 76 },
  { name: "Comilla",     division: "Chattogram",  x: 62, y: 62 },
  { name: "Barishal",    division: "Barishal",    x: 48, y: 72 },
  { name: "Chattogram",  division: "Chattogram",  x: 74, y: 76 },
];

export function BangladeshMapFigure() {
  return (
    <div className="card-plain p-4 tablet:p-8 bg-[var(--color-grain)]">
      <div className="relative aspect-[4/5] tablet:aspect-[1/1] max-w-[560px] mx-auto">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
          {/* Abstract country shape */}
          <path
            d="M22 22 L40 10 L56 12 L70 18 L78 22 L82 32 L86 40 L78 48 L82 58 L80 68 L74 78 L66 86 L54 90 L44 88 L34 80 L28 72 L24 62 L18 54 L14 44 L14 32 Z"
            fill="rgba(19,19,19,0.04)"
            stroke="rgba(19,19,19,0.25)"
            strokeWidth="0.3"
          />
          {/* Subtle division lines */}
          <path d="M18 40 L86 40" stroke="rgba(19,19,19,0.08)" strokeWidth="0.2" strokeDasharray="1 1" />
          <path d="M50 12 L50 90" stroke="rgba(19,19,19,0.08)" strokeWidth="0.2" strokeDasharray="1 1" />

          {/* Hub markers */}
          {HUBS.map((h) => (
            <g key={h.name}>
              <circle cx={h.x} cy={h.y} r={h.hq ? 1.6 : 1.1}
                fill={h.hq ? "var(--color-terracotta)" : "var(--color-ink)"} />
              {h.hq && (
                <circle cx={h.x} cy={h.y} r={2.6}
                  fill="none" stroke="var(--color-terracotta)" strokeWidth="0.3" opacity="0.6" />
              )}
            </g>
          ))}

          {/* N compass */}
          <g transform="translate(88 12)">
            <text fontSize="2.4" fill="rgba(19,19,19,0.55)" fontFamily="monospace">N</text>
            <line x1="0.8" y1="2.2" x2="0.8" y2="4.5" stroke="rgba(19,19,19,0.55)" strokeWidth="0.2" />
            <polygon points="0.3,2.2 0.8,1.2 1.3,2.2" fill="rgba(19,19,19,0.55)" />
          </g>

          {/* Scale bar */}
          <g transform="translate(14 92)">
            <line x1="0" y1="0" x2="12" y2="0" stroke="rgba(19,19,19,0.45)" strokeWidth="0.3" />
            <line x1="0" y1="-0.8" x2="0" y2="0.8" stroke="rgba(19,19,19,0.45)" strokeWidth="0.3" />
            <line x1="6" y1="-0.8" x2="6" y2="0.8" stroke="rgba(19,19,19,0.45)" strokeWidth="0.3" />
            <line x1="12" y1="-0.8" x2="12" y2="0.8" stroke="rgba(19,19,19,0.45)" strokeWidth="0.3" />
            <text x="0" y="-2" fontSize="1.6" fill="rgba(19,19,19,0.55)" fontFamily="monospace">0</text>
            <text x="5" y="-2" fontSize="1.6" fill="rgba(19,19,19,0.55)" fontFamily="monospace">100</text>
            <text x="10.5" y="-2" fontSize="1.6" fill="rgba(19,19,19,0.55)" fontFamily="monospace">200 km</text>
          </g>
        </svg>

        {/* Labels layer (HTML for better typography) */}
        <div className="absolute inset-0 pointer-events-none">
          {HUBS.map((h) => (
            <div
              key={h.name}
              className="absolute t-mono text-[10px] whitespace-nowrap translate-x-2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%`, color: h.hq ? "var(--color-terracotta)" : "var(--color-ink)" }}
            >
              {h.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 t-mono text-[10px] text-[var(--color-ink-muted)] justify-center">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]" /> HQ · Dhaka
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-ink)]" /> District hub
        </span>
        <span>08 divisions · 09 listed</span>
      </div>
    </div>
  );
}

const BOXES = [
  { name: "Jogaan", descriptor: "farmer app" },
  { name: "Hyperfarm", descriptor: "buyer desk" },
];

export function ProductStack() {
  return (
    <div
      className="w-full"
      style={{ color: "var(--color-deep-green)" }}
      role="img"
      aria-label="Diagram: Jogaan, the farmer app, feeds a left-to-right supply chain into Hyperfarm, the buyer desk."
    >
      {/* Desktop diagram */}
      <div className="hidden tablet:block">
        <svg
          viewBox="0 0 720 200"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="product-stack-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="currentColor" />
            </marker>
          </defs>

          {/* Horizontal flow: Jogaan -> Hyperfarm */}
          <line
            x1="320"
            y1="100"
            x2="400"
            y2="100"
            stroke="currentColor"
            strokeWidth="1.25"
            markerEnd="url(#product-stack-arrow)"
          />

          {/* Two boxes */}
          {BOXES.map((box, i) => {
            const x = i === 0 ? 80 : 420;
            const cx = x + 110;
            return (
              <g key={box.name}>
                <rect
                  x={x}
                  y={55}
                  width={220}
                  height={90}
                  rx={8}
                  fill="var(--color-paper)"
                  stroke="currentColor"
                  strokeWidth={1.25}
                />
                <text
                  x={cx}
                  y={93}
                  textAnchor="middle"
                  fontFamily="var(--font-plus-jakarta)"
                  fontSize={19}
                  fontWeight={500}
                  fill="var(--color-ink)"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {box.name}
                </text>
                <text
                  x={cx}
                  y={119}
                  textAnchor="middle"
                  fontFamily="var(--font-plus-jakarta)"
                  fontSize={13}
                  fill="var(--color-ink-muted)"
                >
                  {box.descriptor}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile diagram: vertical stack */}
      <div className="tablet:hidden flex flex-col items-center gap-3">
        {BOXES.map((box, i, arr) => (
          <div key={box.name} className="w-full max-w-[280px] flex flex-col items-center">
            <div
              className="w-full rounded-lg px-5 py-4 text-center"
              style={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-deep-green)",
              }}
            >
              <div
                className="text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: 17,
                  letterSpacing: "-0.01em",
                }}
              >
                {box.name}
              </div>
              <div className="mt-1 text-[13px] text-[var(--color-ink-muted)]">
                {box.descriptor}
              </div>
            </div>
            {i < arr.length - 1 && (
              <svg
                width="14"
                height="22"
                viewBox="0 0 14 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                aria-hidden="true"
                className="my-1"
              >
                <line x1="7" y1="0" x2="7" y2="18" />
                <polyline points="2,13 7,19 12,13" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

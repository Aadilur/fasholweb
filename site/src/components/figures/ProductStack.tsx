const TOP_BOXES = [
  { name: "Jogaan", descriptor: "farmer app" },
  { name: "Banijjo", descriptor: "wholesale layer" },
  { name: "Hyperfarm", descriptor: "buyer desk" },
];

const BOTTOM_BOX = { name: "CropCash", descriptor: "financing" };

export function ProductStack() {
  return (
    <div
      className="w-full"
      style={{ color: "var(--color-deep-green)" }}
      role="img"
      aria-label="Diagram: Jogaan, Banijjo, and Hyperfarm form a left-to-right supply chain. CropCash sits below, financing the transactions recorded across the three."
    >
      {/* Desktop diagram */}
      <div className="hidden tablet:block">
        <svg
          viewBox="0 0 900 420"
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

          {/* Horizontal flow: Jogaan -> Banijjo -> Hyperfarm */}
          <line
            x1="280"
            y1="125"
            x2="340"
            y2="125"
            stroke="currentColor"
            strokeWidth="1.25"
            markerEnd="url(#product-stack-arrow)"
          />
          <line
            x1="560"
            y1="125"
            x2="620"
            y2="125"
            stroke="currentColor"
            strokeWidth="1.25"
            markerEnd="url(#product-stack-arrow)"
          />

          {/* Convergence into CropCash */}
          <polyline
            points="170,170 170,240 400,240 400,290"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            markerEnd="url(#product-stack-arrow)"
          />
          <line
            x1="450"
            y1="170"
            x2="450"
            y2="290"
            stroke="currentColor"
            strokeWidth="1.25"
            markerEnd="url(#product-stack-arrow)"
          />
          <polyline
            points="730,170 730,240 500,240 500,290"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            markerEnd="url(#product-stack-arrow)"
          />

          {/* Top row boxes */}
          {TOP_BOXES.map((box, i) => {
            const x = 60 + i * 280;
            const cx = x + 110;
            return (
              <g key={box.name}>
                <rect
                  x={x}
                  y={80}
                  width={220}
                  height={90}
                  rx={8}
                  fill="var(--color-paper)"
                  stroke="currentColor"
                  strokeWidth={1.25}
                />
                <text
                  x={cx}
                  y={118}
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
                  y={144}
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

          {/* Bottom box: CropCash */}
          <rect
            x={340}
            y={290}
            width={220}
            height={90}
            rx={8}
            fill="var(--color-paper)"
            stroke="currentColor"
            strokeWidth={1.25}
          />
          <text
            x={450}
            y={328}
            textAnchor="middle"
            fontFamily="var(--font-plus-jakarta)"
            fontSize={19}
            fontWeight={500}
            fill="var(--color-ink)"
            style={{ letterSpacing: "-0.01em" }}
          >
            {BOTTOM_BOX.name}
          </text>
          <text
            x={450}
            y={354}
            textAnchor="middle"
            fontFamily="var(--font-plus-jakarta)"
            fontSize={13}
            fill="var(--color-ink-muted)"
          >
            {BOTTOM_BOX.descriptor}
          </text>
        </svg>
      </div>

      {/* Mobile diagram: vertical stack */}
      <div className="tablet:hidden flex flex-col items-center gap-3">
        {[...TOP_BOXES, BOTTOM_BOX].map((box, i, arr) => (
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

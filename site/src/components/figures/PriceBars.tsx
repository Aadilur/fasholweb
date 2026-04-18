export function PriceBarsFigure() {
  const max = 60;
  const rows = [
    { label: "TRADITIONAL", sub: "aratdar chain", value: 12, share: "20%", endPrice: 60 },
    { label: "FASHOL", sub: "direct procurement", value: 27, share: "46%", endPrice: 58, highlight: true },
  ];

  return (
    <div className="card-plain p-6 tablet:p-10">
      <div className="flex flex-col gap-8">
        {/* Axis header */}
        <div className="flex items-center justify-between t-mono text-[11px] text-[var(--color-ink-muted)]">
          <span>BDT / kg</span>
          <div className="flex gap-8 tabular-nums">
            <span>0</span><span>20</span><span>40</span><span>60</span>
          </div>
        </div>

        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[120px_1fr_auto] tablet:grid-cols-[200px_1fr_auto] gap-4 items-center">
            <div>
              <div className="t-mono text-[11px] text-[var(--color-ink)]">{row.label}</div>
              <div className="t-caption">{row.sub}</div>
            </div>
            <div className="relative h-10 bg-[var(--color-surface)] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end px-4 t-mono text-[11px] text-[var(--color-ink)] tabular-nums"
                style={{
                  width: `${(row.value / max) * 100}%`,
                  background: row.highlight ? "var(--color-lime)" : "var(--color-clay)",
                }}
              >
                BDT {row.value}
              </div>
            </div>
            <div className="text-right t-mono text-[11px] text-[var(--color-ink-muted)]">
              <div>{row.share} farmer share</div>
              <div>BDT {row.endPrice} end</div>
            </div>
          </div>
        ))}

        {/* Delta */}
        <div className="border-t border-[var(--color-line)] pt-5 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-2">
          <div className="t-h5" style={{ fontWeight: 500 }}>+ BDT 15 / kg</div>
          <div className="t-body-sm">= <span className="font-medium text-[var(--color-ink)]">+125%</span> farmer income</div>
        </div>
      </div>
    </div>
  );
}

const ROWS = [
  { d: "Satkhira",       km: 9,  v: 180, below: true },
  { d: "Dhaka (Savar)",  km: 11, v: 74,  below: true },
  { d: "Jashore",        km: 14, v: 142, below: true },
  { d: "Khulna",         km: 18, v: 96,  below: true },
  { d: "Bogura",         km: 26, v: 110, below: false },
  { d: "Rajshahi",       km: 32, v: 128, below: false },
  { d: "Mymensingh",     km: 42, v: 84,  below: false },
  { d: "Comilla",        km: 58, v: 78,  below: false },
  { d: "Sylhet",         km: 78, v: 62,  below: false },
];

const MAX = 80;

export function RouteEfficiencyFigure() {
  return (
    <div className="card-plain p-6 tablet:p-10">
      <div className="flex flex-col gap-3">
        {/* Axis header */}
        <div className="grid grid-cols-[160px_1fr_auto] tablet:grid-cols-[200px_1fr_160px] gap-4 items-end t-mono text-[10px] text-[var(--color-ink-muted)] mb-2">
          <span />
          <div className="flex justify-between">
            <span>0</span><span>20</span><span>40</span><span>60</span><span>80 km / MT</span>
          </div>
          <span className="text-right">Vol / mo.</span>
        </div>

        {/* Threshold marker background */}
        {ROWS.map((r) => (
          <div key={r.d} className="grid grid-cols-[160px_1fr_auto] tablet:grid-cols-[200px_1fr_160px] gap-4 items-center">
            <span className="t-body-sm" style={{ fontWeight: 500 }}>{r.d}</span>
            <div className="relative h-8 bg-[var(--color-surface)] rounded-full overflow-hidden">
              {/* Threshold line at 20 */}
              <div className="absolute top-0 bottom-0 border-l border-dashed border-[var(--color-terracotta)]" style={{ left: `${(20/MAX)*100}%` }} />
              <div
                className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end px-3 t-mono text-[11px] tabular-nums"
                style={{
                  width: `${(r.km / MAX) * 100}%`,
                  background: r.below ? "var(--color-lime)" : "var(--color-clay)",
                  color: "var(--color-ink)",
                }}
              >
                {r.km}
              </div>
            </div>
            <span className="t-mono text-[11px] text-[var(--color-ink-muted)] text-right">{r.v} MT</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 t-mono text-[10px] text-[var(--color-ink-muted)]">
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[var(--color-lime)]" /> Below threshold - profitable</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[var(--color-clay)]" /> Above threshold - requires cross-subsidy</span>
        <span className="inline-flex items-center gap-2">- - Profitable threshold: 20 km / MT</span>
      </div>
    </div>
  );
}

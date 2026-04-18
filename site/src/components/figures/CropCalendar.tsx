const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

type Intensity = "off" | "low" | "mid" | "peak";
type Row = { crop: string; latin: string; cells: Intensity[] };

const INTENSITY_COLOR: Record<Intensity, string> = {
  off: "var(--color-surface)",
  low: "var(--color-clay)",
  mid: "#DA8664",
  peak: "var(--color-terracotta)",
};

const ROWS: Row[] = [
  { crop: "Paddy",   latin: "Oryza sativa",     cells: ["peak","mid","low","off","off","low","mid","mid","low","mid","peak","peak"] },
  { crop: "Cabbage", latin: "B. oleracea",      cells: ["peak","peak","mid","off","off","off","off","off","low","mid","peak","peak"] },
  { crop: "Potato",  latin: "S. tuberosum",     cells: ["peak","peak","peak","mid","low","off","off","off","off","low","mid","peak"] },
  { crop: "Tomato",  latin: "S. lycopersicum",  cells: ["peak","mid","low","off","off","off","off","off","low","mid","peak","peak"] },
  { crop: "Chilli",  latin: "Capsicum",         cells: ["mid","mid","peak","peak","mid","low","off","low","mid","peak","peak","mid"] },
  { crop: "Onion",   latin: "A. cepa",          cells: ["low","mid","peak","peak","mid","low","off","off","off","low","mid","mid"] },
  { crop: "Mango",   latin: "M. indica",        cells: ["off","off","off","low","mid","peak","peak","mid","low","off","off","off"] },
];

export function CropCalendarFigure() {
  return (
    <div className="card-plain p-6 tablet:p-8 overflow-x-auto">
      <div className="min-w-[680px]">
        {/* Header */}
        <div className="grid grid-cols-[160px_repeat(12,1fr)] t-mono text-[10px] text-[var(--color-ink-muted)]">
          <div />
          {MONTHS.map((m) => (
            <div key={m} className="py-2 text-center">{m}</div>
          ))}
        </div>
        {/* Rows */}
        {ROWS.map((r) => (
          <div key={r.crop} className="grid grid-cols-[160px_repeat(12,1fr)] items-center border-t border-[var(--color-line)] py-2">
            <div className="pr-4">
              <div className="t-body-sm" style={{ fontWeight: 500, color: "var(--color-ink)" }}>{r.crop}</div>
              <div className="t-caption italic">{r.latin}</div>
            </div>
            {r.cells.map((c, i) => (
              <div
                key={i}
                className="h-6 mx-0.5 rounded-[4px]"
                style={{ background: INTENSITY_COLOR[c] }}
                title={`${r.crop} ${MONTHS[i]} — ${c}`}
              />
            ))}
          </div>
        ))}
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 t-mono text-[10px] text-[var(--color-ink-muted)]">
          {(Object.keys(INTENSITY_COLOR) as Intensity[]).map((k) => (
            <div key={k} className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ background: INTENSITY_COLOR[k] }} />
              {k.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

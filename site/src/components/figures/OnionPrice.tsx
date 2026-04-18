/**
 * Weekly onion farm-gate price, Sep–Dec 2023.
 * Retail (terracotta), Fashol contract (lime), Aratdar (ink).
 */

const WEEKS = ["Sep W1","Sep W3","Oct W1","Oct W3","Nov W1","Nov W3","Dec W1","Dec W2","Dec W4"];

type Series = { name: string; color: string; values: number[]; end: string };

const SERIES: Series[] = [
 { name: "Open-market retail (Karwan Bazar wholesale)", color: "var(--color-terracotta)", values: [60, 70, 85, 110, 140, 170, 210, 216, 216], end: "BDT 216" },
 { name: "Fashol contract farm-gate", color: "var(--color-ink)", values: [48, 55, 60, 68, 75, 82, 88, 90, 85], end: "BDT 85" },
 { name: "Traditional aratdar farm-gate", color: "rgba(19,19,19,0.45)", values: [38, 40, 42, 45, 52, 60, 70, 52, 38], end: "BDT 38" },
];

function mapX(i: number) { return 60 + (i / (WEEKS.length - 1)) * 820; }
function mapY(v: number) { return 380 - (v / 220) * 320; }

export function OnionPriceFigure() {
 return (
 <div className="card-plain p-4 tablet:p-8">
 <div className="overflow-x-auto">
 <svg viewBox="0 0 960 440" className="w-full h-auto min-w-[680px]">
 {[0,50,100,150,200].map((y) => (
 <g key={y}>
 <line x1="60" y1={mapY(y)} x2="880" y2={mapY(y)} stroke="rgba(19,19,19,0.08)" strokeWidth="1" strokeDasharray="2 3" />
 <text x="50" y={mapY(y)+4} fontSize="11" fontFamily="monospace" fill="rgba(19,19,19,0.5)" textAnchor="end">{y}</text>
 </g>
 ))}
 {WEEKS.map((w, i) => (
 <text key={w} x={mapX(i)} y="406" fontSize="11" fontFamily="monospace" fill="rgba(19,19,19,0.55)" textAnchor="middle">{w}</text>
 ))}

 {/* India export ban marker */}
 <line x1={mapX(7)} y1="60" x2={mapX(7)} y2="380" stroke="rgba(19,19,19,0.4)" strokeDasharray="3 3" strokeWidth="1" />
 <text x={mapX(7)} y="55" fontSize="10" fontFamily="monospace" fill="rgba(19,19,19,0.6)" textAnchor="middle">India export ban · 08 Dec 2023</text>

 {/* Lines */}
 {SERIES.map((s) => {
 const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"} ${mapX(i)},${mapY(v)}`).join(" ");
 return (
 <g key={s.name}>
 <path d={d} stroke={s.color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
 {s.values.map((v, i) => (
 <circle key={i} cx={mapX(i)} cy={mapY(v)} r="2" fill={s.color} />
 ))}
 <text x={mapX(WEEKS.length - 1) + 10} y={mapY(s.values[s.values.length - 1]) + 4} fontSize="11" fontFamily="monospace" fill={s.color}>
 {s.end}
 </text>
 </g>
 );
 })}
 </svg>
 </div>
 {/* Legend */}
 <div className="flex flex-wrap gap-5 mt-6 t-mono text-[11px]">
 {SERIES.map((s) => (
 <span key={s.name} className="inline-flex items-center gap-2">
 <span className="w-4 h-[2px]" style={{ background: s.color }} />
 {s.name}
 </span>
 ))}
 </div>
 </div>
 );
}

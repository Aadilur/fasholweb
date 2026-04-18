/**
 * Cumulative registered farmers, Jan 2019 → Apr 2026.
 * 300 at 2019, 10,000 at Mar 2022, 20,000 at Feb 2024, 40,120 at Apr 2026.
 * Plateaus in Apr 2020 (Covid) and Aug 2022 (fuel crisis).
 */

const POINTS: [string, number][] = [
 ["2019-01", 300], ["2019-06", 520], ["2019-12", 1150],
 ["2020-04", 1200], ["2020-06", 1260], ["2020-12", 2480],
 ["2021-06", 5100], ["2021-12", 8400],
 ["2022-03", 10000], ["2022-08", 10200], ["2022-11", 11400],
 ["2023-04", 14200], ["2023-11", 17800],
 ["2024-02", 20300], ["2024-07", 23400], ["2024-12", 27100],
 ["2025-06", 31800], ["2025-12", 36400], ["2026-04", 40120],
];

function mapX(i: number) {
 return 50 + (i / (POINTS.length - 1)) * 900;
}
function mapY(v: number) {
 return 380 - (v / 40000) * 320;
}

export function OnboardingCurve() {
 const path = POINTS.map(([, v], i) => `${i === 0 ? "M" : "L"} ${mapX(i)},${mapY(v)}`).join(" ");
 const area = `${path} L ${mapX(POINTS.length - 1)},380 L ${mapX(0)},380 Z`;
 const years = ["2019","2020","2021","2022","2023","2024","2025","2026"];
 const yTicks = [0, 10000, 20000, 30000, 40000];

 return (
 <div className="card-plain p-4 tablet:p-8">
 <div className="overflow-x-auto">
 <svg viewBox="0 0 1000 440" className="w-full h-auto min-w-[680px]">
 {/* Grid */}
 {yTicks.map((t) => (
 <g key={t}>
 <line x1="50" y1={mapY(t)} x2="950" y2={mapY(t)} stroke="rgba(19,19,19,0.08)" strokeWidth="1" strokeDasharray="2 3" />
 <text x="40" y={mapY(t) + 4} fontSize="11" fontFamily="monospace" fill="rgba(19,19,19,0.5)" textAnchor="end">
 {t.toLocaleString()}
 </text>
 </g>
 ))}
 {years.map((y, i) => {
 const x = 50 + (i / (years.length - 1)) * 900;
 return (
 <g key={y}>
 <line x1={x} y1="380" x2={x} y2="386" stroke="rgba(19,19,19,0.3)" strokeWidth="1" />
 <text x={x} y="406" fontSize="11" fontFamily="monospace" fill="rgba(19,19,19,0.5)" textAnchor="middle">{y}</text>
 </g>
 );
 })}

 {/* Event markers */}
 <line x1={mapX(3)} y1="60" x2={mapX(3)} y2="380" stroke="rgba(19,19,19,0.3)" strokeDasharray="3 3" strokeWidth="1" />
 <text x={mapX(3)} y="55" fontSize="10" fontFamily="monospace" fill="rgba(19,19,19,0.6)" textAnchor="middle">Covid · lockdown · Apr 2020</text>
 <line x1={mapX(10)} y1="60" x2={mapX(10)} y2="380" stroke="rgba(19,19,19,0.3)" strokeDasharray="3 3" strokeWidth="1" />
 <text x={mapX(10)} y="55" fontSize="10" fontFamily="monospace" fill="rgba(19,19,19,0.6)" textAnchor="middle">$1M pre-seed · Nov 2022</text>

 {/* Area */}
 <path d={area} fill="var(--color-lime)" opacity="0.35" />
 {/* Line */}
 <path d={path} fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
 {/* Points */}
 {POINTS.map(([, v], i) => (
 <circle key={i} cx={mapX(i)} cy={mapY(v)} r="2.5" fill="var(--color-ink)" />
 ))}
 {/* End marker */}
 <circle cx={mapX(POINTS.length - 1)} cy={mapY(40120)} r="6" fill="var(--color-terracotta)" />
 <text x={mapX(POINTS.length - 1) - 8} y={mapY(40120) - 12} fontSize="11" fontFamily="monospace" fill="var(--color-terracotta)" textAnchor="end">
 40,120 · Apr 2026
 </text>
 <text x={mapX(8) + 10} y={mapY(10000) - 8} fontSize="10" fontFamily="monospace" fill="rgba(19,19,19,0.55)">
 10,000 · Mar 2022
 </text>
 <text x={mapX(13) + 8} y={mapY(20300) - 6} fontSize="10" fontFamily="monospace" fill="rgba(19,19,19,0.55)">
 20,000 · Feb 2024
 </text>
 </svg>
 </div>
 </div>
 );
}

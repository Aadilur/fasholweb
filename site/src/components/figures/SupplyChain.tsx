const NODES = [
  { n: "01", name: "FARMER",      role: "Smallholder",            m1: "60,000 onboarded",         m2: "Records via Jogaan app",  t: "T + 0h" },
  { n: "02", name: "FIELD AGENT", role: "Collection & price lock", m1: "40+ hubs",                m2: "4-tier grade at intake",  t: "T + 4h" },
  { n: "03", name: "COLD HUB",    role: "Storage & dispatch",      m1: "26% waste reduction",     m2: "Route-planned fleet",     t: "T + 12h" },
  { n: "04", name: "PLATFORM",    role: "Matching & settlement",   m1: "24h farmer payout",       m2: "Mobile financial services", t: "T + 18h" },
  { n: "05", name: "BUYER",       role: "MSME / QC / Exporter",    m1: "7,000+ buyer accounts",   m2: "Dhaka / SG / Dubai",      t: "(final)" },
];

export function SupplyChainFigure() {
  return (
    <div className="card-plain p-6 tablet:p-10 overflow-hidden">
      <div className="grid grid-cols-1 tablet:grid-cols-5 gap-4 tablet:gap-0 relative">
        {NODES.map((node, i) => (
          <div key={node.n} className="relative flex flex-col gap-3">
            {/* connector dot */}
            <div className="flex items-center gap-2 tablet:pr-4">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-[10px] t-mono">
                {node.n}
              </span>
              <span className="t-mono text-[10px] text-[var(--color-ink-muted)] flex-1 truncate">{node.t}</span>
            </div>
            <div className="t-h5 tracking-[-0.02em]" style={{ fontWeight: 500 }}>{node.name}</div>
            <div className="t-caption">{node.role}</div>
            <div className="mt-2 t-body-sm text-[var(--color-ink-subtle)]">{node.m1}</div>
            <div className="t-caption">{node.m2}</div>

            {/* connector line */}
            {i < NODES.length - 1 && (
              <div className="hidden tablet:block absolute top-[11px] left-[calc(100%-10px)] right-0 h-[1px] bg-[var(--color-line-strong)]">
                <div className="absolute -right-[5px] -top-[3px] w-0 h-0 border-t-[3px] border-b-[3px] border-l-[6px] border-t-transparent border-b-transparent border-l-[var(--color-line-strong)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
 title: "Contact",
 description: "Fashol's three offices — Dhaka HQ at 130 Kabbokash, Kawran Bazar; Singapore regional; Dubai Gulf. Direct contact within 24 business hours.",
};

const OFFICES = [
 {
 tag: "BD",
 country: "Dhaka, Bangladesh",
 role: "Headquarters",
 lines: ["Fashol Dotcom Limited", "130 Kabbokash, Kawran Bazar", "Dhaka 1215, Bangladesh"],
 coord: "23.7514° N / 90.3943° E",
 cta: { label: "+880 9613 105 505", href: "tel:+8809613105505" },
 },
 {
 tag: "SG",
 country: "Singapore",
 role: "Regional, export & capital",
 lines: ["Fashol Singapore Pte Ltd", "33A Pagoda Street", "Singapore 059192"],
 coord: "1.2839° N / 103.8451° E",
 cta: { label: "sg@fashol.com", href: "mailto:sg@fashol.com" },
 },
 {
 tag: "AE",
 country: "Dubai, UAE",
 role: "Gulf buyers & partnerships",
 lines: ["Office 406, Abdullah Fahed Bldg 2", "Al Qussais 2", "Dubai, United Arab Emirates"],
 coord: "25.2867° N / 55.3847° E",
 cta: { label: "ae@fashol.com", href: "mailto:ae@fashol.com" },
 },
];

const CHANNELS = [
 ["Email · general", "info@fashol.com", "mailto:info@fashol.com"],
 ["Email · press", "press@fashol.com", "mailto:press@fashol.com"],
 ["WhatsApp · farmer", "Register as farmer", "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20register%20as%20a%20farmer%20with%20Fashol."],
 ["WhatsApp · buyer", "Open a buyer account", "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20open%20a%20buyer%20account%20with%20Fashol."],
 ["Facebook", "/fasholcom", "https://www.facebook.com/fasholcom/"],
 ["LinkedIn", "/company/fashol", "https://www.linkedin.com/company/fashol"],
 ["YouTube", "Fashol channel", "https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ"],
 ["App", "Jogaan · Google Play", "https://play.google.com/store/apps/details?id=com.fashol.agent"],
];

export default function ContactPage() {
 return (
 <><PageHeader
 eyebrow="§ Contact"
 title="Three offices. One phone line. Direct reply within 24 hours."
 lede="Partnerships, press, career speculation, or a question from a buyer or farmer — all below. Fastest response is email."
 />

 {/* Primary contact specs */}
 <Section tone="surface" size="sm">
 <Eyebrow>Contact specifications</Eyebrow>
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-y-6 gap-x-10 mt-8">
 {[
 ["Primary", "info@fashol.com", "mailto:info@fashol.com"],
 ["Press", "press@fashol.com", "mailto:press@fashol.com"],
 ["Careers", "careers@fashol.com", "mailto:careers@fashol.com"],
 ["Phone", "+880 9613 105 505", "tel:+8809613105505"],
 ["Hours", "Sun–Thu, 09:00–18:00 BST", null],
 ["Reply", "Within 24 business hours", null],
 ].map(([k, v, href]) => (
 <div key={k as string} className="border-t border-[var(--color-line)] pt-4">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</div>
 {href ? (
 <a href={href as string} className="t-body-lg mt-1 link block">{v}</a>
 ) : (
 <div className="t-body-lg mt-1 text-[var(--color-ink)]">{v}</div>
 )}
 </div>
 ))}
 </div>
 </Section>

 {/* Offices */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">Three countries. One company.</h2>
 <p className="t-body-lg mt-4 max-w-3xl">
 The HQ is in Dhaka. Singapore handles export, funding, and regional partnerships. Dubai covers Middle-East buyers
 and the Gulf perishables corridor.
 </p>

 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {OFFICES.map((o) => (
 <div key={o.tag} className="card-plain p-8 flex flex-col gap-5">
 <div className="flex items-baseline justify-between">
 <div className="t-mono text-[11px] text-[var(--color-terracotta)]">{o.tag} — {o.country}</div>
 </div>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{o.role}</h3>
 <address className="not-italic t-body space-y-1">
 {o.lines.map((l) => <div key={l}>{l}</div>)}
 </address>
 <p className="t-mono text-[11px] text-[var(--color-ink-muted)]">{o.coord}</p>
 <div className="mt-auto pt-4">
 <Button variant="secondary" href={o.cta.href}>{o.cta.label}</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>

 {/* Direct channels */}
 <Section tone="surface">
 <h2 className="t-h2 mt-6 max-w-3xl">Where we are, and what each channel is for.</h2>

 <ul className="mt-14 border-t border-[var(--color-line-strong)]">
 {CHANNELS.map(([k, v, href]) => (
 <li key={k} className="grid tablet:grid-cols-[220px_1fr_40px] items-center py-5 border-b border-[var(--color-line)] gap-4">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</span>
 <a href={href} className="t-h5 link" style={{ fontWeight: 500 }} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
 {v}
 </a>
 <span className="text-right text-[var(--color-ink-muted)]">↗</span>
 </li>
 ))}
 </ul>
 </Section>

 {/* Visit / Kawran Bazar */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">Find us at Kawran Bazar.</h2>
 <p className="t-body-lg mt-4 max-w-3xl">
 The HQ is above the Kawran Bazar wholesale market in central Dhaka. Karwan Bazar MRT (Metro Rail Line 6) is a six-minute
 walk; the nearest rickshaw stand is on Kazi Nazrul Islam Avenue, directly out front.
 </p>

 <div className="grid desktop:grid-cols-12 gap-10 mt-14">
 {/* Schematic map */}
 <div className="desktop:col-span-7">
 <div className="card-plain aspect-[4/3] relative bg-[var(--color-grain)] overflow-hidden">
 <svg viewBox="0 0 600 450" className="absolute inset-0 w-full h-full">
 {/* streets */}
 <rect x="0" y="0" width="600" height="450" fill="transparent" />
 <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(19,19,19,0.15)" strokeWidth="18" />
 <line x1="0" y1="260" x2="600" y2="260" stroke="rgba(19,19,19,0.15)" strokeWidth="22" />
 <line x1="0" y1="360" x2="600" y2="360" stroke="rgba(19,19,19,0.12)" strokeWidth="14" />
 <line x1="240" y1="0" x2="240" y2="450" stroke="rgba(19,19,19,0.18)" strokeWidth="26" />
 {/* hatirjheel lake blob */}
 <path d="M380,200 Q500,180 540,260 Q560,340 470,360 Q400,380 380,310 Q360,250 380,200 Z" fill="rgba(56, 198, 246, 0.2)" stroke="rgba(56,198,246,0.6)" strokeWidth="1" />
 {/* wholesale market */}
 <rect x="130" y="290" width="90" height="60" fill="rgba(182, 74, 47, 0.1)" stroke="rgba(182,74,47,0.4)" strokeWidth="1" />
 {/* MRT stations */}
 <circle cx="140" cy="150" r="6" fill="var(--color-ink)" />
 <circle cx="210" cy="90" r="6" fill="var(--color-ink)" />
 {/* HQ pin */}
 <circle cx="270" cy="220" r="10" fill="var(--color-terracotta)" />
 <circle cx="270" cy="220" r="20" fill="none" stroke="var(--color-terracotta)" strokeWidth="1" opacity="0.5" />
 {/* walking path */}
 <path d="M140,150 Q190,160 240,200 L270,220" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
 </svg>

 {/* labels */}
 <div className="absolute text-[10px] font-mono text-[var(--color-ink-muted)]" style={{ left: "2%", top: "14%" }}>PANTHAPATH</div>
 <div className="absolute text-[10px] font-mono text-[var(--color-ink-muted)]" style={{ left: "2%", top: "35%" }}>KAZI NAZRUL ISLAM AVE</div>
 <div className="absolute text-[10px] font-mono text-[var(--color-ink-muted)]" style={{ left: "2%", top: "56%" }}>KAWRAN BAZAR RD</div>
 <div className="absolute text-[10px] font-mono text-[var(--color-ink-muted)]" style={{ left: "2%", top: "77%" }}>Indira Road</div>
 <div className="absolute text-[10px] font-mono text-[var(--color-sky)]" style={{ left: "72%", top: "56%" }}>HATIRJHEEL</div>
 <div className="absolute text-[10px] font-mono text-[var(--color-terracotta)]" style={{ left: "18%", top: "63%" }}>KAWRAN BAZAR</div>
 <div className="absolute text-[10px] font-mono" style={{ left: "19%", top: "29%" }}>⬤ Karwan Bazar MRT</div>
 <div className="absolute text-[10px] font-mono" style={{ left: "34%", top: "15%" }}>⬤ Farm Gate MRT</div>
 <div className="absolute text-[11px] font-mono font-medium" style={{ left: "46%", top: "47%", color: "var(--color-terracotta)" }}>
 FASHOL HQ — 130 Kabbokash
 </div>
 <div className="absolute text-[10px] font-mono text-[var(--color-terracotta)]" style={{ left: "46%", top: "53%" }}>
 23.7514° N · 90.3895° E
 </div>
 <div className="absolute text-[9px] font-mono text-[var(--color-ink-muted)]" style={{ left: "22%", top: "39%" }}>~6 min walk</div>

 {/* Scale bar */}
 <div className="absolute bottom-3 left-4 t-mono text-[9px] text-[var(--color-ink-muted)]">
 0 — 250 m — 500 m · N
 </div>
 </div>
 <p className="mt-4 t-caption">
 Fashol HQ, marked in terracotta. Six-minute walk from Karwan Bazar MRT (Line 6). Taxi from Hazrat Shahjalal Intl. Airport: 35–50 min.
 </p>
 </div>

 {/* Getting here */}
 <div className="desktop:col-span-5">
 <h3 className="t-h4" style={{ fontWeight: 500 }}>Getting here</h3>
 <dl className="mt-8 space-y-5 border-t border-[var(--color-line-strong)] pt-6">
 {[
 ["By MRT", "Karwan Bazar station, Line 6. Exit 03 → 6-minute walk north."],
 ["By bus", "Any Mohakhali-bound route on Kazi Nazrul Islam Avenue. Alight at Kawran Bazar."],
 ["By rickshaw", "Any rickshaw from Dhanmondi, Banani, or Gulshan — \"Kawran Bazar wholesale market.\""],
 ["By taxi", "Uber / Pathao — drop-pin \"Fashol Dotcom Limited, Kabbokash.\""],
 ["From airport", "~35 – 50 min by taxi, depending on traffic."],
 ["Parking", "Limited street parking; market-side paid lot under the MRT station."],
 ].map(([k, v]) => (
 <div key={k} className="grid grid-cols-[120px_1fr] gap-3 border-b border-[var(--color-line)] pb-4">
 <dt className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</dt>
 <dd className="t-body">{v}</dd>
 </div>
 ))}
 </dl>
 </div>
 </div>
 </Section>
 </>
 );
}

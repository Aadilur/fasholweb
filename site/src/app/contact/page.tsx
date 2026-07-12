import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
 title: "Contact",
 description: "Contact Fashol by email or phone. Offices in Dhaka, Singapore, and Dubai. We reply within one business day.",
};

const DETAILS: Array<[string, string, string | null]> = [
 ["General", "info@fashol.com", "mailto:info@fashol.com"],
 ["Press", "press@fashol.com", "mailto:press@fashol.com"],
 ["Careers", "careers@fashol.com", "mailto:careers@fashol.com"],
 ["Phone", "+880 9613 105 505", "tel:+8809613105505"],
 ["Hours", "Sun-Thu, 09:00-18:00 BST", null],
 ["Response time", "Within one business day", null],
];

const OFFICES = [
 {
 country: "Dhaka, Bangladesh",
 role: "Head office",
 lines: ["Fashol Dotcom Limited", "130 Kabbokash, Kawran Bazar", "Dhaka 1215, Bangladesh"],
 cta: { label: "+880 9613 105 505", href: "tel:+8809613105505" },
 },
 {
 country: "Singapore",
 role: "Regional office",
 lines: ["Fashol Singapore Pte Ltd", "33A Pagoda Street", "Singapore 059192"],
 cta: { label: "sg@fashol.com", href: "mailto:sg@fashol.com" },
 },
 {
 country: "Dubai, UAE",
 role: "Regional office",
 lines: ["Office 406, Abdullah Fahed Bldg 2", "Al Qussais 2", "Dubai, United Arab Emirates"],
 cta: { label: "ae@fashol.com", href: "mailto:ae@fashol.com" },
 },
];

const CHANNELS: Array<[string, string, string]> = [
 ["Farmer registration", "Register on WhatsApp", "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20register%20as%20a%20farmer%20with%20Fashol."],
 ["Buyer account", "Open an account on WhatsApp", "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20open%20a%20buyer%20account%20with%20Fashol."],
 ["Facebook", "/fasholcom", "https://www.facebook.com/fasholcom/"],
 ["LinkedIn", "/company/fashol", "https://www.linkedin.com/company/fashol"],
 ["YouTube", "Fashol channel", "https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ"],
 ["App", "Jogaan on Google Play", "https://play.google.com/store/apps/details?id=com.fashol.agent"],
];

export default function ContactPage() {
 return (
 <><PageHeader
 title="Contact"
 lede="Reach us by email or phone. We reply within one business day."
 />

 {/* Contact details */}
 <Section tone="surface" size="sm">
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-y-6 gap-x-10">
 {DETAILS.map(([k, v, href]) => (
 <div key={k} className="border-t border-[var(--color-line)] pt-4">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</div>
 {href ? (
 <a href={href} className="t-body-lg mt-1 link block">{v}</a>
 ) : (
 <div className="t-body-lg mt-1 text-[var(--color-ink)]">{v}</div>
 )}
 </div>
 ))}
 </div>
 </Section>

 {/* Offices */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">Offices</h2>

 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {OFFICES.map((o) => (
 <div key={o.country} className="card-plain p-8 flex flex-col gap-5">
 <div>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{o.country}</h3>
 <p className="t-mono text-[11px] text-[var(--color-ink-muted)] mt-1">{o.role}</p>
 </div>
 <address className="not-italic t-body space-y-1">
 {o.lines.map((l) => <div key={l}>{l}</div>)}
 </address>
 <div className="mt-auto pt-4">
 <Button variant="secondary" href={o.cta.href}>{o.cta.label}</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>

 {/* Other channels */}
 <Section tone="surface">
 <h2 className="t-h2 mt-6 max-w-3xl">Other channels</h2>

 <ul className="mt-14 border-t border-[var(--color-line-strong)]">
 {CHANNELS.map(([k, v, href]) => (
 <li key={k} className="grid tablet:grid-cols-[220px_1fr] items-center py-5 border-b border-[var(--color-line)] gap-4">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</span>
 <a href={href} className="t-h5 link" style={{ fontWeight: 500 }} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
 {v}
 </a>
 </li>
 ))}
 </ul>
 </Section>
 </>
 );
}

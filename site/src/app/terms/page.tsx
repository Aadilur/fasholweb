import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
 title: "Terms of Service",
 description: "Terms of Service for the Fashol platform and the Jogaan mobile application.",
};

const SECTIONS = [
 {
 title: "§ 01 Acceptance of terms",
 items: [
 "By accessing or using Fashol's platform or mobile applications, you agree to be bound by these Terms.",
 "These terms apply to all users - farmers, retailers, field agents, buyers, and other stakeholders.",
 "If you do not agree with these terms, please do not use our services.",
 "We reserve the right to modify these terms with appropriate notice; continued use after changes constitutes acceptance.",
 ],
 },
 {
 title: "§ 02 Platform services",
 items: [
 "Fashol provides agricultural technology solutions, including mobile applications and web platforms.",
 "Services include connecting farmers with buyers, supply-chain management, and market intelligence.",
 "We facilitate transactions between users but are not party to the agreements that users enter into.",
 "Service availability may vary by location and is subject to technical limitations; 24/7 availability is a target, not a guarantee.",
 ],
 },
 {
 title: "§ 03 User responsibilities",
 items: [
 "Provide accurate and complete information when registering and using our services.",
 "Maintain the confidentiality of your account credentials.",
 "Use the platform only for lawful agricultural business purposes.",
 "Respect intellectual-property rights and do not misuse platform content.",
 "Report suspicious activity or security breaches to us promptly.",
 "Comply with all applicable laws and regulations in your jurisdiction.",
 ],
 },
 {
 title: "§ 04 Prohibited activities",
 items: [
 "Using the platform for illegal activity or fraudulent transactions.",
 "Attempting to gain unauthorised access to platform systems or user accounts.",
 "Distributing malware, spam, or other harmful content.",
 "Manipulating pricing information or engaging in anti-competitive practices.",
 "Harassing, threatening, or discriminating against other users.",
 "Violating intellectual-property rights or applicable agricultural regulations.",
 ],
 },
 {
 title: "§ 05 Limitation of liability",
 items: [
 "Fashol is not liable for indirect, incidental, or consequential damages.",
 "Our aggregate liability is limited to the amount paid for services in the twelve months preceding the event.",
 "We are not responsible for the quality, safety, or legality of the agricultural products traded through the platform.",
 "Users are responsible for their own business decisions and the transactions they enter into.",
 "Force-majeure events - including natural disasters - may affect service availability.",
 "Third-party integrations and external services are governed by their respective terms.",
 ],
 },
 {
 title: "§ 06 Intellectual property",
 items: [
 "Fashol retains all rights to platform software, design, trade-marks, and proprietary technology.",
 "Users retain ownership of their agricultural data and business information.",
 "A limited license is granted to use platform features for agricultural-business purposes.",
 "Unauthorised copying, distribution, or modification of platform content is prohibited.",
 "User-generated content may be used by Fashol in an aggregated form for platform improvement.",
 "Respect for third-party intellectual-property rights is required.",
 ],
 },
];

export default function TermsPage() {
 return (
 <><PageHeader
 eyebrow="§ Legal · Terms"
 title="Terms of Service."
 lede="These terms govern access to and use of the Fashol platform - websites, mobile applications, and related services - provided by Fashol Dotcom Limited. By using our services, you enter into a legally binding agreement with us."
 />

 <Section tone="paper">
 <div className="container-narrow">
 <div className="space-y-16">
 {SECTIONS.map((sec) => (
 <div key={sec.title}>
 <h2 className="t-h3">{sec.title}</h2>
 <ul className="mt-6 space-y-3">
 {sec.items.map((it) => (
 <li key={it} className="flex gap-4 t-body">
 <span className="w-1 h-1 rounded-full bg-[var(--color-ink)] mt-3 shrink-0" />
 <span>{it}</span>
 </li>
 ))}
 </ul>
 </div>
 ))}

 <div>
 <h2 className="t-h3">§ 07 Account termination</h2>
 <p className="mt-6 t-body">
 We reserve the right to suspend or terminate accounts for violation of these terms, or for legitimate business reasons, with appropriate notice.
 </p>
 </div>

 <div>
 <h2 className="t-h3">§ 08 Data protection</h2>
 <p className="mt-6 t-body">
 Your data-protection rights are governed by our <Link href="/privacy" className="link">Privacy Policy</Link>, which forms an integral part of these terms.
 </p>
 </div>

 <div>
 <h2 className="t-h3">§ 09 Dispute resolution &amp; governing law</h2>
 <p className="mt-6 t-body">
 Disputes will be resolved through good-faith negotiation first, then mediation or arbitration under Bangladesh law. The courts of Dhaka have exclusive jurisdiction.
 </p>
 </div>

 <div>
 <h2 className="t-h3">§ 10 Updates &amp; notifications</h2>
 <p className="mt-6 t-body">
 Material updates to these terms are communicated through the platform, by email, or by mobile notification.
 </p>
 </div>

 <div>
 <h2 className="t-h3">§ 11 Contact</h2>
 <p className="mt-6 t-body">
 Questions about these terms can be sent to <a href="mailto:info@fashol.com" className="link">info@fashol.com</a>, or by post to
 Fashol Dotcom Limited, 130 Kabbokash, Kawran Bazar, Dhaka 1215, Bangladesh.
 </p>
 </div>
 </div>
 </div>
 </Section>
 </>
 );
}

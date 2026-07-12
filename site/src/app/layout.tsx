import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LanguageProvider } from "@/components/site/LanguageProvider";
import { getLang } from "@/lib/i18n.server";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const bengali = Hind_Siliguri({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fashol.com"),
  title: {
    default: "Fashol - A supply chain for 60,000 smallholder farmers in Bangladesh",
    template: "%s · Fashol",
  },
  description:
    "Fashol moves perishable produce from smallholder farms in Bangladesh to buyers in Dhaka, Singapore, and Dubai. Direct pricing, real-time logistics, 26 percent less waste.",
  openGraph: {
    title: "Fashol - A supply chain for 60,000 smallholder farmers in Bangladesh",
    description:
      "Direct-from-farm produce, four-tier quality grading, 24-hour settlement. Nine districts, 40+ hubs.",
    type: "website",
    locale: "en_US",
    images: ["/images/content/hero-paddy-aerial.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      data-lang={lang}
      className={`${plusJakarta.variable} ${geistMono.variable} ${bengali.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <LanguageProvider lang={lang}>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

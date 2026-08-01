import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bengali = Hind_Siliguri({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Service Temporarily Unavailable · Fashol",
  description:
    "Fashol is temporarily unavailable while we resolve an unexpected issue.",
  robots: { index: false, follow: false },
};

function RailwayIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Railway"
    >
      <circle cx="32" cy="32" r="32" fill="#0B0C0E" />
      <path
        d="M16 32C16 32 24 20 32 20C40 20 48 32 48 32C48 32 40 44 32 44C24 44 16 32 16 32Z"
        fill="white"
      />
      <path d="M26 28L38 32L26 36V28Z" fill="#0B0C0E" />
    </svg>
  );
}

export default async function RootLayout() {
  return (
    <html
      lang="en"
      data-lang="en"
      className={`${plusJakarta.variable} ${bengali.variable}`}
    >
      <body className="min-h-screen flex items-center justify-center bg-white">
        <main className="flex flex-col items-center text-center px-6 max-w-lg mx-auto">
          {/* Railway Icon */}
          <div className="mb-8">
            <RailwayIcon />
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Service Temporarily Unavailable
          </h1>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-gray-200 mb-6" />

          {/* Message */}
          <div className="space-y-4 text-gray-600 font-[family-name:var(--font-plus-jakarta)] leading-relaxed">
            <p className="text-base sm:text-lg">
              You have already used up{" "}
              <span className="font-semibold text-gray-800">$5</span> of your
              monthly limit and exceeded your billing cap of{" "}
              <span className="font-semibold text-gray-800">$10</span>.
            </p>

            <p className="text-sm sm:text-base">
              It appears your service has experienced an unexpected surge in
              activity. To protect your infrastructure, we have temporarily
              suspended the service. To reactivate it, please pay your
              outstanding balance and restart the service.
            </p>
          </div>

          {/* Contact hint */}
          <p className="mt-10 text-xs text-gray-400 font-[family-name:var(--font-plus-jakarta)]">
            If you believe this is a mistake, please contact{" "}
            <a
              href="mailto:support@railway.com"
              className="underline hover:text-gray-600 transition-colors"
            >
              support@railway.com
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}

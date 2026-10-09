import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below may add `motion-intro` before React hydrates.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion-intro')",
          }}
        />
      </head>
      <body className="font-sans">
        {/* Site chrome lives in app/(site)/layout.tsx, so the /keystatic admin renders without it. */}
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Nav />
        {/* The continuous dragline runs from under the nav to the top of the footer. */}
        <div className="relative">
          <main>{children}</main>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[9px] z-10 w-px bg-thread opacity-28 lg:left-[32px]"
          />
        </div>
        <Footer />
      </body>
    </html>
  );
}

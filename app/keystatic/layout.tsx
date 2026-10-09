import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import KeystaticApp from "./keystatic";

/** CMS admin: never indexed (also blocked in robots.txt and via X-Robots-Tag in next.config.ts). */
export const metadata: Metadata = {
  title: "CMS",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  // Local storage mode edits files on disk: development only, never in production.
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local") notFound();
  // Keystatic renders entirely in the browser. `children` is the page's request-time marker (it
  // renders nothing) — Cache Components needs it to know this route is rendered per request.
  return (
    <div id="keystatic">
      <Suspense fallback={null}>
        <KeystaticApp />
      </Suspense>
      {children}
    </div>
  );
}

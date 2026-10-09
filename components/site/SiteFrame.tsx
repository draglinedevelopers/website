import PageTransition from "@/components/motion/PageTransition";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ThreadLine from "@/components/motion/ThreadLine";
import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";

/**
 * The public site's chrome: smooth scroll, page transitions, nav, the continuous thread line and
 * the footer. Used by app/(site)/layout.tsx and the root 404. The /keystatic admin never gets it.
 */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <PageTransition>
        <Nav />
        {/* The continuous dragline runs from under the nav to the top of the footer. */}
        <ThreadLine>
          <main>{children}</main>
        </ThreadLine>
        <Footer />
      </PageTransition>
    </>
  );
}

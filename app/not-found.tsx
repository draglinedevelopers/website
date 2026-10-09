import NotFoundContent from "@/components/site/NotFoundContent";
import SiteFrame from "@/components/site/SiteFrame";

/** Unmatched URLs render outside the (site) group, so this page brings the site chrome itself. */
export default function NotFound() {
  return (
    <SiteFrame>
      <NotFoundContent />
    </SiteFrame>
  );
}

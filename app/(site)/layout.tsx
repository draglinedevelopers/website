import SiteFrame from "@/components/site/SiteFrame";

/** Layout for every public page (the route group keeps the CMS admin outside the site chrome). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteFrame>{children}</SiteFrame>;
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The CMS admin and its API must never be indexed.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/keystatic", headers: noindex },
      { source: "/keystatic/:path*", headers: noindex },
      { source: "/api/keystatic/:path*", headers: noindex },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  pageExtensions: ['ts','tsx','md','mdx']
};
export default nextConfig;

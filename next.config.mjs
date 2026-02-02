/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Increase limit to 50MB for file uploads (base64 increases size by ~33%)
    },
  },
}

export default nextConfig

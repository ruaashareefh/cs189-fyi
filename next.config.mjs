/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // shiki does heavy filesystem reads — keep it server-side only
    serverComponentsExternalPackages: ['shiki', 'katex'],
  },
}

export default nextConfig

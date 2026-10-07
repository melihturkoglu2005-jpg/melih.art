/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stil kuralları (eslint.config.mjs) canlıya alma sırasında build'i durdurmasın
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig

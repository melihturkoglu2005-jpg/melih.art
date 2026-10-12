/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/duolingo", destination: "/duolingo.html" }]
  },
  // Stil kuralları (eslint.config.mjs) canlıya alma sırasında build'i durdurmasın
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default (phase) => ({
  ...nextConfig,
  // Keep production builds from replacing files used by the running dev server.
  distDir: phase === "phase-development-server" ? ".next-dev" : ".next"
})

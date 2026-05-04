import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig = {
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [ "@svgr/webpack" ]
    })

    return config
  },

  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        loaders: [ "@svgr/webpack" ],
        as: "*.js"
      }
    }
  }
}

module.exports = withNextIntl(nextConfig)
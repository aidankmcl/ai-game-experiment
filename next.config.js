// @ts-check

const UnoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, context) => {
    config.plugins.push(
      UnoCSS(),
    )

    if (context.buildId !== "development") {
      config.cache = false; // Allow for unocss to build properly
    }
    return config
  },
}

module.exports = nextConfig

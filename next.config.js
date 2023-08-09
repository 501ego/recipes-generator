/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = config.resolve.fallback || {}
      config.resolve.fallback.dns = false
      config.resolve.fallback.os = false
    }
    return config
  },
}

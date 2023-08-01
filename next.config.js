// PWA SUPPORT

const withPWAInit = require("next-pwa")

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // Solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
  buildExcludes: ["app-build-manifest.json"],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com", "cdn.myanimelist.net", "gogocdn.net"],
  },
}

module.exports = withPWA(nextConfig)



// WITHOUT PWA

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["img.youtube.com", "cdn.myanimelist.net", "gogocdn.net"],
//   },
// }

// module.exports = nextConfig

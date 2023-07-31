import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com", "cdn.myanimelist.net", "gogocdn.net"],
  },
}

module.exports = withPlaiceholder(nextConfig)

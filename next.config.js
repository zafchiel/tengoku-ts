const nextConfig = {
  serverExternalPackages: ["@react-email"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "gogocdn.net",
      },
    ],
  },
};

module.exports = nextConfig;

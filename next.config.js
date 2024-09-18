/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "www.youtube.com",
      "img.youtube.com",
      "res.cloudinary.com",
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", port: "" },
      { protocol: "https", hostname: "images.unsplash.com", port: "" },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

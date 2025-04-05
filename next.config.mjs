/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "glasmuseum-frauenau.de",
      },
    ],
  },
};

export default nextConfig;

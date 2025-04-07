/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'glasmuseum-frauenau.de',
      },
    ],
  },
};

export default nextConfig;

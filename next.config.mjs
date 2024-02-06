const hostnames = ["invidious.fdn.fr"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname: hostname,
    })),
  },
};

export default nextConfig;

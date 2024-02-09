const hostnames = ["invidious.fdn.fr"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname: hostname,
    })),
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};

export default nextConfig;

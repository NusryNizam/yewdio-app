const hostnames = ["invidious.fdn.fr"];

/** @type {import('next').NextConfig} */
const nextConfig = {};

import withPWA from "next-pwa";

export default withPWA({ ...nextConfig, dest: "public" });

import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true, // Commenting this out or setting to false
  webpack: (config, { isServer }) => {
    // Add src directory to the module resolution paths
    config.resolve.modules.push("./src");
    config.resolve.modules.push("./src/components");


    return config;
  },
};

export default nextConfig;

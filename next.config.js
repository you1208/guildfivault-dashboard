/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force new build outputs with timestamp
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Disable SWC minifier cache
  swcMinify: true,
  // Add cache busting
  generateEtags: false,
};

export default nextConfig;
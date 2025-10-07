const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" }
    ]
  },
  experimental: { appDir: true }
};

export default nextConfig;

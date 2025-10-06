import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 👈 permite Cloudinary
        pathname: "/**", // permite todas las rutas de imágenes
      },
    ],
  },
};

export default nextConfig;

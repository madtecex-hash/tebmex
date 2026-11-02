import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para producción en Netlify.
  // NOTA: NO usar output: "standalone" — el plugin @netlify/plugin-nextjs
  // se encarga del build y empaquetado del servidor.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  poweredByHeader: false,
};

export default nextConfig;

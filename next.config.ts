import type { NextConfig } from "next";
import { ServerConfig } from "./app.config";

const withBaseURL = (route: string) => {
  return `${ServerConfig.backendUrl}/${route}`;
};

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/hotels",
        destination: withBaseURL("/api/hotels"),
      },
      {
        source: "/api/reviews",
        destination: withBaseURL("/api/reviews"),
      },
      {
        source: "/api/user-itineraries",
        destination: withBaseURL("/api/user-itineraries"),
      },
      {
        source: "/api/itineraries/:path*",
        destination: withBaseURL("/api/itineraries/:path*"),
      },
      {
        source: "/api/hotels/:path*",
        destination: withBaseURL("/api/hotels/:path*"),
      },
      {
        source: "/api/places/:path*",
        destination: withBaseURL("/api/places/:path*"),
      },
      {
        source: "/api/search/:path*",
        destination: withBaseURL("/api/search/:path*"),
      },
    ];
  },
};

export default nextConfig;

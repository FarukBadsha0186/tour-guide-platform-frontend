import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination:
          "https://tour-guide-platform-backend.vercel.app/api/v1/:path*",
      },
    ]
  },
}

export default nextConfig
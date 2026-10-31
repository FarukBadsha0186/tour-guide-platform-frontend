// import type { NextConfig } from "next"

// const nextConfig: NextConfig = {
//   devIndicators: false,
//   async rewrites() {
//     return [
//       {
//         source: "/api/backend/:path*",
//         destination:
//           "https://tour-guide-platform-backend.vercel.app/api/v1/:path*",
//             "https://tour-guide-platform-backend.vercel.app/api/v1/:path*",
//       },
//     ]
//   },
// }

// export default nextConfig


import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/backend/:path*",
          destination:
            "https://tour-guide-platform-backend.vercel.app/api/v1/:path*",
        },
      ],
    }
  },
}

export default nextConfig
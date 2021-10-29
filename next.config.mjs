/**
 * @type {import('next').NextConfig}
 */
export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

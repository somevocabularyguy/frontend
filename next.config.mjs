/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // Optional: Add any SVGR options here
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;

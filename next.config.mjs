/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure the output to be a static export.
  output: 'export',

  // Configure the base path for the project.
  // This is the name of the GitHub repository.
  basePath: process.env.NODE_ENV === 'production' ? '/pragvalues' : '',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

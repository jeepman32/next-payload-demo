import { withPayload } from '@payloadcms/next-payload'
import bundleAnalyzer from '@next/bundle-analyzer'
import * as path from 'path'
import * as url from 'url'

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url))

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = withPayload(
  withBundleAnalyzer({
    experimental: {
      webpackBuildWorker: true,
      serverMinification: false,
    },
    outputFileTracingIncludes: {
      '/api/**': ['**/@swc/**'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    transpilePackages: [
      '@payloadcms/plugin-seo',
      'src/payload/components/forms',
      'src/payload/components',
    ],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_S3_ENDPOINT.replace('https://', ''),
          pathname: `/${process.env.NEXT_PUBLIC_S3_BUCKET}/**`,
        },
      ],
    },
  }),
  {
    configPath: path.resolve(currentDirectory, './src/payload/payload.config.ts'),
    payloadPath: path.resolve(process.cwd(), './src/payload/payloadClient.ts'),
  },
)

export default nextConfig

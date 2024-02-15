import { withPayload } from '@payloadcms/next-payload'
import bundleAnalyzer from '@next/bundle-analyzer'
import * as path from 'path'
import * as url from 'url'

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = withPayload(
  {
    eslint: {
      ignoreDuringBuilds: true,
    },
    transpilePackages: [
      '@payloadcms/plugin-seo',
      'src/payload/components/forms',
      'src/payload/components',
    ],
    images: {
      domains: [
        'localhost',
        'nextjs-vercel.payloadcms.com',
        process.env.NEXT_PUBLIC_APP_URL,
        `${process.env.NEXT_PUBLIC_S3_ENDPOINT}`.replace('https://', ''),
      ],
    },
    webpack: {
      resolve: {
        alias: {},
      },
    },
  },
  {
    configPath: path.resolve(currentDirectory, './src/payload/payload.config.ts'),
    payloadPath: path.resolve(process.cwd(), './src/payload/payloadClient.ts'),
  },
)

const withBundleAnalyzer = bundleAnalyzer({
  enabled: true,
})

export default process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig

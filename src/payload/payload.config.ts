import { buildConfig } from 'payload/config'
import path from 'path'
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { MainMenu } from './globals/MainMenu'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { Media } from './collections/Media'
import seo from '@payloadcms/plugin-seo'
import { webpackBundler } from '@payloadcms/bundler-webpack'
// import { postgresAdapter } from '@payloadcms/db-postgres';
import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { slateEditor } from '@payloadcms/richtext-slate';
import type { RichTextAdapter } from 'payload/types'

const adapter = s3Adapter({
  acl: 'public-read',
  config: {
    endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
    forcePathStyle: true,
  },
  bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
})

export function emptyEditor(): RichTextAdapter<any, {}, {}> {
  return {
    CellComponent: () => null,
    FieldComponent: () => null,
    outputSchema: () => {
      return {
        items: {
          type: 'object',
        },
        type: ['array'],
      }
    },
    populationPromise() {
      return null
    },
    validate: () => true,
  }
}

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
    connectOptions: {
      minPoolSize: 1,
      maxPoolSize: 1,
      ssl: true,
      family: 4,
      loggerLevel: 'debug',
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 2000,
      keepAlive: true,
      keepAliveInitialDelay: 60000,
    },
  }),
  editor: emptyEditor(),
  admin: {
    bundler: webpackBundler(),
  },
  collections: [
    Pages,
    Users,
    Media,
    {
      slug: 'examples',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
  ],
  globals: [MainMenu],
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    seo({
      collections: ['pages'],
    }),
    cloudStorage({
      collections: {
        media: {
          adapter,
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
  telemetry: false,
})

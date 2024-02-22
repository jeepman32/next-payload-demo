import { SSTConfig } from 'sst'
import { Api, Bucket, NextjsSite } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'next-payload-demo',
      region: process.env.S3_REGION,
    }
  },
  stacks(app) {
    app.setDefaultFunctionProps((stack) => ({
      nodejs: {
        format: 'cjs',
      },
    }))

    app.stack(({ stack }) => {
      const bucket = new Bucket(stack, 'images')

      const site = new NextjsSite(stack, 'site', {
        bind: [bucket],
        permissions: ['s3'],
        buildCommand: `open-next build --minify --buildCommand="next build"`,
        logging: 'combined',
        timeout: '60 seconds',
        runtime: 'nodejs20.x',
        warm: 1,
      })

      stack.addOutputs({
        SiteUrl: site.url,
        Instructions: `
Check your .env and ensure the following keys are set to the following values.
These values are required for PayloadCMS to build, as these values are not resolved from tokens before it tries to build.

See https://docs.aws.amazon.com/cdk/v2/guide/tokens.html for more information.

NEXT_PUBLIC_S3_BUCKET=${bucket.bucketName}
        `,
      })

      if (app.stage !== 'prod') {
        app.setDefaultRemovalPolicy('destroy')
      }
    })
  },
} satisfies SSTConfig

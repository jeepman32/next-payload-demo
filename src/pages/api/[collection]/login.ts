import handler from '@payloadcms/next-payload/dist/handlers/[collection]/login'
import { Payload } from 'payload'

import getPayloadClient from '../../../payload/payloadClient'

export default async (request, response) => {
  const client: Payload = await getPayloadClient()

  console.log('WUGGLE')
  await client.db.connection.asPromise()
  console.log('TRUGGLE')
  // await new Promise<void>((resolve) => client.db.connection.once('open', () => resolve()))
  // console.log('ZUGGLE')

  return handler(request, response)
}

export const config = {
  api: {
    bodyParser: false,
    // externalResolver: true,
  },
}

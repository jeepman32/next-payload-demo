const withPayload = require('../../../middleware/withPayload')
const convertPayloadJSONBody = require('../../../middleware/convertPayloadJSONBody')
const fileUpload = require('../../../middleware/fileUpload')
const registerFirstUser = require('payload/dist/auth/operations/registerFirstUser').default
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const withCookies = require('../../../middleware/cookie')
const withDataLoader = require('../../../middleware/dataLoader')

async function handler(req, res) {
  try {
    const firstUser = await registerFirstUser({
      req,
      res,
      collection: req.payload.collections[req.query.collection],
      data: req.body,
    })
  
    return res.status(200).json(firstUser)
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }
}

export const config = {
  api: {
    bodyParser: false,
  }
}

export default withPayload(
  withDataLoader(
    fileUpload(
      withCookies(
        convertPayloadJSONBody(
          handler
        )
      )
    )
  )
)

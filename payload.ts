import { getPayload } from "payload/dist/payload";
import config from "./payload/payload.config";
import { timestamp } from "./utilities/timestamp";

const getInitializedPayload = async () => {
  timestamp('before getting payload')

  const payload = await getPayload({
    // Make sure that your environment variables are filled out accordingly
    mongoURL: process.env.MONGODB_URI as string,
    secret: process.env.PAYLOAD_SECRET as string,
    // Notice that we're passing our Payload config
    config,
  });

  timestamp('after getting payload')

  return payload
};

export default getInitializedPayload;
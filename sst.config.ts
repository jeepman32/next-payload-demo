import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "next-payload-demo",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site");

      stack.addOutputs({
        SiteUrl: site.url,
      });

      if (app.stage !== "prod") {
        app.setDefaultRemovalPolicy("destroy");
      }
    });
  },
} satisfies SSTConfig;

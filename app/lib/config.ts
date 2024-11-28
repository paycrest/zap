import type { Config } from "@/app/types";

const config: Config = {
  env: process.env.NODE_ENV || "development",
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "testnet",
  mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "",
  hotjarSiteId: Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID || ""),
  aggregatorUrl: process.env.NEXT_PUBLIC_AGGREGATOR_URL || "",
  paymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "",
  paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || "",
  bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL || "",
};

export default config;

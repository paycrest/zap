import mixpanel from "mixpanel-browser";
import config from "@/app/lib/config";

const { env, mixpanelToken } = config;

if (mixpanelToken) {
  mixpanel.init(mixpanelToken, {
    debug: env === "development",
    track_pageview: true,
    persistence: "localStorage",
    ignore_dnt: true,
    verbose: true,
  });
} else {
  console.warn("Mixpanel token is not defined");
}

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
) => {
  if (mixpanelToken) {
    mixpanel.track(eventName, { app: "Zap", ...properties });
  }
};

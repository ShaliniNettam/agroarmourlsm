import mixpanel from 'mixpanel-browser';

// Mixpanel Project Token
const MIXPANEL_TOKEN = 'a2047d00a7a76d30cff8e363149d4db2';

// Safe initialization
const initMixpanel = () => {
  if (MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV !== 'production',
      track_pageview: true,
      persistence: 'localStorage',
      record_sessions_percent: 100,
      autocapture: true,
    });
  }
};

// Tracking helper
export const trackEvent = (name: string, props?: Record<string, any>) => {
  mixpanel.track(name, props);
};

// Identify helper
export const identifyUser = (id: string, profile?: Record<string, any>) => {
  mixpanel.identify(id);
  if (profile) {
    mixpanel.people.set(profile);
  }
};

export { initMixpanel };
export default mixpanel;

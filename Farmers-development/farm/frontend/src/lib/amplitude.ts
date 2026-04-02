import * as amplitude from '@amplitude/analytics-browser';

// Amplitude API Key
const AMPLITUDE_API_KEY = 'YOUR_AMPLITUDE_API_KEY'; // Replace with your actual key

export const initAmplitude = () => {
  if (AMPLITUDE_API_KEY && AMPLITUDE_API_KEY !== 'YOUR_AMPLITUDE_API_KEY') {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: true,
    });
  } else {
    console.warn('Amplitude API key not set. Analytics disabled.');
  }
};

export const trackAmplitudeEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  if (AMPLITUDE_API_KEY && AMPLITUDE_API_KEY !== 'YOUR_AMPLITUDE_API_KEY') {
    amplitude.track(eventName, eventProperties);
  }
};

export const identifyAmplitudeUser = (userId: string, userProperties?: Record<string, any>) => {
  if (AMPLITUDE_API_KEY && AMPLITUDE_API_KEY !== 'YOUR_AMPLITUDE_API_KEY') {
    amplitude.setUserId(userId);
    if (userProperties) {
      const identifyEvent = new amplitude.Identify();
      Object.keys(userProperties).forEach((key) => {
        identifyEvent.set(key, userProperties[key]);
      });
      amplitude.identify(identifyEvent);
    }
  }
};

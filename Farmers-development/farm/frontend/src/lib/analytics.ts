/**
 * Unified Analytics Helper — AgroArmor V2
 *
 * Single function to send events to all three destinations simultaneously:
 *   - GA4 (via gtag — both V1 + V2 measurement IDs)
 *   - Mixpanel
 *   - Amplitude
 *
 * Also bumps local A/B stats counters for the admin dashboard.
 */

import { trackEvent as mpTrack } from './mixpanel';
import { trackAmplitudeEvent } from './amplitude';
import { incrementStat, ExperimentVariant } from './abTesting';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Send an event to GA4 + Mixpanel + Amplitude simultaneously.
 * Properties are forwarded as-is to all three platforms.
 */
export function trackAnalyticsEvent(
  eventName: string,
  properties: Record<string, unknown> = {}
): void {
  // 1. GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  // 2. Mixpanel
  try {
    mpTrack(eventName, properties as any);
  } catch (e) {
    console.warn('[Analytics] Mixpanel error:', e);
  }

  // 3. Amplitude
  try {
    trackAmplitudeEvent(eventName, properties as any);
  } catch (e) {
    console.warn('[Analytics] Amplitude error:', e);
  }

  // 4. Bump local A/B stats counters
  if (properties.experiment_id) {
    const expId = properties.experiment_id as string;
    const variant = (properties.variant ?? 'control') as ExperimentVariant;

    if (eventName === 'experiment_viewed') {
      incrementStat(expId, variant, 'views');
    } else if (eventName === 'experiment_converted') {
      incrementStat(expId, variant, 'conversions');
    }
  }
}

/**
 * Track a voice navigation command.
 * Fires to GA4 + Mixpanel + Amplitude.
 */
export function trackVoiceNavigation(command: string, destination: string): void {
  trackAnalyticsEvent('voice_navigation', { command, destination });
}

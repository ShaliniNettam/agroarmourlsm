/**
 * useExperiment — React hook for A/B testing
 *
 * Usage:
 *   const { variant, trackConversion } = useExperiment('hero_cta');
 *
 * - Assigns (or restores) the user's variant on mount
 * - Fires `experiment_viewed` once per session (deduped by sessionStorage)
 * - Returns a `trackConversion` helper scoped to this experiment
 */

import { useEffect, useRef } from 'react';
import {
  getVariant,
  trackExperimentView,
  trackConversion as _trackConversion,
  ExperimentVariant,
} from '@/lib/abTesting';

interface UseExperimentResult {
  /** The variant this user is assigned to: 'control' | 'variant_a' */
  variant: ExperimentVariant;
  /** Call when the user completes the experiment goal */
  trackConversion: (extra?: Record<string, unknown>) => void;
}

export function useExperiment(experimentId: string): UseExperimentResult {
  const variant = getVariant(experimentId);
  const viewFiredRef = useRef(false);

  useEffect(() => {
    // Dedupe experiment_viewed per session
    const sessionKey = `ab_viewed_${experimentId}`;
    if (!sessionStorage.getItem(sessionKey)) {
      trackExperimentView(experimentId, variant);
      sessionStorage.setItem(sessionKey, '1');
    }
    viewFiredRef.current = true;
  }, [experimentId, variant]);

  const trackConversion = (extra?: Record<string, unknown>) => {
    _trackConversion(experimentId, variant, extra);
  };

  return { variant, trackConversion };
}

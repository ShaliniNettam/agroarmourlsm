/**
 * A/B Testing Engine — AgroArmor V2
 *
 * Deterministic variant assignment using userId + localStorage.
 * All experiment events fire to GA4 + Mixpanel + Amplitude simultaneously.
 */

import { trackAnalyticsEvent } from './analytics';

// ----- Types -----

export type ExperimentVariant = 'control' | 'variant_a';

export interface Experiment {
  id: string;
  variants: ExperimentVariant[];
  description: string;
}

// ----- Registered experiments -----

export const EXPERIMENTS: Record<string, Experiment> = {
  hero_cta: {
    id: 'hero_cta',
    variants: ['control', 'variant_a'],
    description: 'Hero CTA button text',
  },
  hero_subtitle: {
    id: 'hero_subtitle',
    variants: ['control', 'variant_a'],
    description: 'Hero subtitle copy',
  },
  auth_layout: {
    id: 'auth_layout',
    variants: ['control', 'variant_a'],
    description: 'Auth form layout (centered card vs split-screen)',
  },
};

// ----- Storage key -----

const STORAGE_KEY = 'ab_assignments';

// ----- Helpers -----

/** Simple deterministic hash: string → 0..modulus-1 */
function hashStringToIndex(str: string, modulus: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // keep unsigned 32-bit
  }
  return hash % modulus;
}

/** Return a stable anonymous user id (persisted in localStorage). */
export function getOrCreateUserId(): string {
  const key = 'ab_user_id';
  let userId = localStorage.getItem(key);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(key, userId);
  }
  return userId;
}

// ----- Core API -----

/** Load all current assignments from localStorage. */
function loadAssignments(): Record<string, ExperimentVariant> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Persist assignments to localStorage. */
function saveAssignments(assignments: Record<string, ExperimentVariant>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

/**
 * Get (or deterministically assign) the variant for a given experiment.
 * Assignments are stable: the same user always gets the same variant.
 */
export function getVariant(experimentId: string): ExperimentVariant {
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) {
    console.warn(`[A/B] Unknown experiment: ${experimentId}`);
    return 'control';
  }

  // Check for admin override first
  const overrideKey = `ab_override_${experimentId}`;
  const override = localStorage.getItem(overrideKey) as ExperimentVariant | null;
  if (override && experiment.variants.includes(override)) {
    return override;
  }

  // Load or generate persistent assignment
  const assignments = loadAssignments();
  if (assignments[experimentId] && experiment.variants.includes(assignments[experimentId])) {
    return assignments[experimentId];
  }

  // Deterministic assignment based on userId + experimentId
  const userId = getOrCreateUserId();
  const seed = `${userId}:${experimentId}`;
  const index = hashStringToIndex(seed, experiment.variants.length);
  const assigned = experiment.variants[index];

  assignments[experimentId] = assigned;
  saveAssignments(assignments);

  return assigned;
}

// ----- Analytics -----

/**
 * Call once when a user is exposed to an experiment variant.
 * Fires to GA4 + Mixpanel + Amplitude.
 */
export function trackExperimentView(experimentId: string, variant: ExperimentVariant): void {
  trackAnalyticsEvent('experiment_viewed', {
    experiment_id: experimentId,
    variant,
  });
}

/**
 * Call when the user completes the primary goal of the experiment.
 */
export function trackConversion(experimentId: string, variant: ExperimentVariant, extra?: Record<string, unknown>): void {
  trackAnalyticsEvent('experiment_converted', {
    experiment_id: experimentId,
    variant,
    ...extra,
  });
}

// ----- Admin overrides -----

/** Force a specific variant for QA purposes. */
export function forceVariant(experimentId: string, variant: ExperimentVariant): void {
  localStorage.setItem(`ab_override_${experimentId}`, variant);
}

/** Clear a forced variant override. */
export function clearForceVariant(experimentId: string): void {
  localStorage.removeItem(`ab_override_${experimentId}`);
}

/** Return live stats for admin dashboard (from localStorage event counters). */
export function getExperimentStats(): Record<string, {
  views: Record<ExperimentVariant, number>;
  conversions: Record<ExperimentVariant, number>;
}> {
  const statsKey = 'ab_stats';
  try {
    const raw = localStorage.getItem(statsKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Increment a counter in the stats object (used internally by analytics.ts). */
export function incrementStat(
  experimentId: string,
  variant: ExperimentVariant,
  type: 'views' | 'conversions'
): void {
  const statsKey = 'ab_stats';
  let stats: Record<string, any> = {};
  try {
    const raw = localStorage.getItem(statsKey);
    stats = raw ? JSON.parse(raw) : {};
  } catch { /* ignore */ }

  if (!stats[experimentId]) {
    stats[experimentId] = {
      views: { control: 0, variant_a: 0 },
      conversions: { control: 0, variant_a: 0 },
    };
  }
  stats[experimentId][type][variant] = (stats[experimentId][type][variant] ?? 0) + 1;
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

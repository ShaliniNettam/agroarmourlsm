/**
 * ABTestingDashboard — AgroArmor V2
 *
 * Admin-only dashboard showing:
 *  - Live variant assignment counts (reads localStorage stats)
 *  - View counts, conversion counts, conversion rate %
 *  - "Force Variant" override for QA testing
 *  - "Clear Override" to reset back to deterministic assignment
 */

import React, { useState, useEffect } from 'react';
import { EXPERIMENTS, getExperimentStats, forceVariant, clearForceVariant, getVariant, ExperimentVariant } from '@/lib/abTesting';
import { FlaskConical, RefreshCw, Zap, Target, Eye, TrendingUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Stats = ReturnType<typeof getExperimentStats>;

const VARIANT_LABELS: Record<ExperimentVariant, string> = {
  control: 'Control',
  variant_a: 'Variant A',
};

const VARIANT_COLORS: Record<ExperimentVariant, string> = {
  control: 'bg-slate-100 text-slate-700 border-slate-200',
  variant_a: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export const ABTestingDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({});
  const [overrides, setOverrides] = useState<Record<string, ExperimentVariant | null>>({});
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const refresh = () => {
    setStats(getExperimentStats());
    const newOverrides: Record<string, ExperimentVariant | null> = {};
    Object.keys(EXPERIMENTS).forEach(id => {
      const raw = localStorage.getItem(`ab_override_${id}`) as ExperimentVariant | null;
      newOverrides[id] = raw;
    });
    setOverrides(newOverrides);
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleForce = (expId: string, variant: ExperimentVariant) => {
    forceVariant(expId, variant);
    refresh();
  };

  const handleClear = (expId: string) => {
    clearForceVariant(expId);
    refresh();
  };

  const convRate = (views: number, conversions: number): string => {
    if (!views) return '—';
    return `${((conversions / views) * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">A/B Experiments</h2>
            <p className="text-xs text-slate-400">
              Last refreshed: {lastRefreshed.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refresh}
          className="flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </div>

      {/* Experiment Cards */}
      {Object.values(EXPERIMENTS).map(exp => {
        const expStats = stats[exp.id];
        const currentVariant = overrides[exp.id] ?? getVariant(exp.id);

        return (
          <div key={exp.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono font-bold">
                      {exp.id}
                    </code>
                    {overrides[exp.id] && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                        QA OVERRIDE ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{exp.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <span>Your variant:</span>
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${VARIANT_COLORS[currentVariant as ExperimentVariant]}`}>
                    {VARIANT_LABELS[currentVariant as ExperimentVariant]}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Table */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-5">
                {(['control', 'variant_a'] as ExperimentVariant[]).map(v => {
                  const views = expStats?.views?.[v] ?? 0;
                  const conversions = expStats?.conversions?.[v] ?? 0;
                  return (
                    <React.Fragment key={v}>
                      <div className={`col-span-3 grid grid-cols-4 items-center gap-3 p-3 rounded-xl border ${VARIANT_COLORS[v]}`}>
                        <div className="font-black text-sm">{VARIANT_LABELS[v]}</div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Eye className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase">Views</span>
                          </div>
                          <div className="text-xl font-black">{views}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Target className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase">Conv.</span>
                          </div>
                          <div className="text-xl font-black">{conversions}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase">Rate</span>
                          </div>
                          <div className="text-xl font-black text-emerald-600">{convRate(views, conversions)}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Force Variant Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Force variant (QA):</span>
                {(['control', 'variant_a'] as ExperimentVariant[]).map(v => (
                  <button
                    key={v}
                    onClick={() => handleForce(exp.id, v)}
                    className={`flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${
                      overrides[exp.id] === v
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-600'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    {VARIANT_LABELS[v]}
                  </button>
                ))}
                {overrides[exp.id] && (
                  <button
                    onClick={() => handleClear(exp.id)}
                    className="flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-lg border border-rose-200 text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Clear Override
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer Note */}
      <p className="text-[11px] text-slate-400 text-center">
        Stats are stored locally in this browser via <code className="font-mono">localStorage</code>. 
        In production, connect to GA4 Realtime API for server-side aggregates.
      </p>
    </div>
  );
};

export default ABTestingDashboard;

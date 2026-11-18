import React from 'react';
import { Search, ShieldCheck, Database } from 'lucide-react';
import type { NavigationTab } from '../../types';

interface HeaderProps {
  activeTab: NavigationTab;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenDataAudit: () => void;
}

const tabTitles: Record<NavigationTab, { title: string; subtitle: string }> = {
  'overview': { 
    title: 'Executive Overview', 
    subtitle: 'Strategic Acquisition Snapshot • Pressure Performance vs Real-World Auction Feasibility' 
  },
  'squad-requirements': { 
    title: 'Squad Requirements & Gap Analysis', 
    subtitle: 'Provisional Target Modeling • Dynamic Roster Simulator & Positional Needs' 
  },
  'acquisition-board': { 
    title: 'Player Acquisition Board', 
    subtitle: 'Complete 50 Player-Role Candidate Register • Filters, Rankings & Deep Profiles' 
  },
  'batter-intelligence': { 
    title: 'Batter Intelligence & Pressure Scoring', 
    subtitle: 'Crunch-Overs Impact • Strike Rate & Average Under High Pressure Conditions' 
  },
  'bowler-intelligence': { 
    title: 'Bowler Intelligence & Death Overs Control', 
    subtitle: 'Economy Rate vs Wicket-Taking Threat • Dot Ball Percentages in Pressure Overs' 
  },
  'comparison': { 
    title: 'Original vs Alternative Comparison', 
    subtitle: 'Side-by-Side Analytical Evaluation • Original Top 10 Benchmarking against 40 Alternatives' 
  },
  'reliability': { 
    title: 'Player Reliability & Sample Adequacy', 
    subtitle: 'Consistency Frequency • Stability Across Scenarios & Sample Validation Limits' 
  },
  'squad-builder': { 
    title: 'Squad Combination Builder', 
    subtitle: 'Interactive Playing XI Architect • Balance Rules, Overseas Caps & Tactical Depth' 
  },
  'decisions': { 
    title: 'Acquisition Decisions & Strategy', 
    subtitle: 'Franchise Target Categorization • Analytical Rankings, Custom Notes & Auction Roadmaps' 
  },
  'data-quality': { 
    title: 'Data Quality, Transparency & Methodology', 
    subtitle: 'Audit Logs • Role Inconsistency Resolutions, Missing Data Governance & File Inventory' 
  },
};

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  searchQuery, 
  setSearchQuery,
  onOpenDataAudit
}) => {
  const current = tabTitles[activeTab] || tabTitles['overview'];

  return (
    <header className="sticky top-0 z-10 bg-[#090E1A]/90 backdrop-blur-md border-b border-[#1E2D4A] px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-widest text-[#EA1A85] uppercase">
            SupeRR Selector
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-medium text-slate-400">
            RR 2027 Acquisition Intelligence
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
          {current.title}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5 font-normal">
          {current.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Candidate Quick Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates (e.g. Rinku, Rashid)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-9 pr-3 py-1.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#EA1A85] transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Data Quality & Audit Quick Pill */}
        <button
          onClick={onOpenDataAudit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142036] hover:bg-[#1A2A47] border border-[#223558] text-xs text-slate-300 transition-colors"
          title="Review data quality and verification methodology"
        >
          <Database size={13} className="text-[#EA1A85]" />
          <span className="font-medium text-[11px]">Audit: 50 Validated</span>
        </button>

        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-400 font-mono">
          <ShieldCheck size={13} />
          <span>RR Sandbox Model</span>
        </div>
      </div>
    </header>
  );
};

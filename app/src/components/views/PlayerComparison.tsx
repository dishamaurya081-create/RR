import React, { useState, useMemo } from 'react';
import { 
  GitCompare, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Crosshair, 
  Target,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { CANDIDATES } from '../../data/intelligenceData';
import type { Candidate } from '../../data/intelligenceData';

interface PlayerComparisonProps {
  onSelectPlayer: (player: Candidate) => void;
  preselectedPlayer?: Candidate | null;
}

export const PlayerComparison: React.FC<PlayerComparisonProps> = ({ 
  onSelectPlayer,
  preselectedPlayer
}) => {
  // Default to comparing Rinku Singh (Original #1 Batter) vs Ashutosh Sharma (Alternative #10 Batter)
  const defaultPlayerA = CANDIDATES.find(c => c.player_name === 'Rinku Singh') || CANDIDATES[0];
  const defaultPlayerB = CANDIDATES.find(c => c.player_name === 'Ashutosh Sharma') || CANDIDATES[9];

  const [playerAId, setPlayerAId] = useState<string>(preselectedPlayer?.candidate_id || defaultPlayerA.candidate_id);
  const [playerBId, setPlayerBId] = useState<string>(defaultPlayerB.candidate_id);
  const [filterRole, setFilterRole] = useState<'All' | 'Batter' | 'Bowler'>('All');

  const playerA = CANDIDATES.find(c => c.candidate_id === playerAId) || defaultPlayerA;
  const playerB = CANDIDATES.find(c => c.candidate_id === playerBId) || defaultPlayerB;

  const isCrossDiscipline = playerA.player_type !== playerB.player_type;
  const isBattingComparison = playerA.player_type === 'Batter' && playerB.player_type === 'Batter';
  const isBowlingComparison = playerA.player_type === 'Bowler' && playerB.player_type === 'Bowler';

  // Quick preset pairs
  const comparisonPresets = [
    { label: 'Finisher Benchmarking (Rinku vs Ashutosh)', a: 'Rinku Singh', b: 'Ashutosh Sharma' },
    { label: 'Original vs Alt Pace (Hazlewood vs Arshdeep)', a: 'Josh Hazlewood', b: 'Arshdeep Singh' },
    { label: 'Spin Mastery (Chahal vs Rashid Khan Bowler)', a: 'Yuzvendra Chahal', b: 'Rashid Khan', bType: 'Bowler' },
    { label: 'All-Rounder Slugfest (Shardul vs Andre Russell)', a: 'Shardul Thakur', b: 'Andre Russell', bType: 'Bowler' },
    { label: 'Power Keepers (Klaasen vs Dhoni)', a: 'Heinrich Klaasen', b: 'Mahendra Singh Dhoni' },
  ];

  const handleApplyPreset = (preset: typeof comparisonPresets[0]) => {
    const candA = CANDIDATES.find(c => c.player_name === preset.a);
    const candB = CANDIDATES.find(c => c.player_name === preset.b && (!preset.bType || c.player_type === preset.bType));
    if (candA) setPlayerAId(candA.candidate_id);
    if (candB) setPlayerBId(candB.candidate_id);
  };

  // Normalized comparative radar metrics
  const radarData = useMemo(() => {
    return [
      {
        metric: 'Balanced Score',
        A: (playerA.balanced_score / 80) * 100,
        B: (playerB.balanced_score / 80) * 100,
        fullMark: 100,
      },
      {
        metric: 'Pressure Impact',
        A: isBattingComparison 
          ? ((playerA.batting.pressure_sr ?? 100) / 240) * 100 
          : ((12 - (playerA.bowling.pressure_economy ?? 10)) / 7) * 100,
        B: isBattingComparison 
          ? ((playerB.batting.pressure_sr ?? 100) / 240) * 100 
          : ((12 - (playerB.bowling.pressure_economy ?? 10)) / 7) * 100,
        fullMark: 100,
      },
      {
        metric: 'Reliability Rate',
        A: playerA.reliability.consistency_rate ? playerA.reliability.consistency_rate * 100 : 50,
        B: playerB.reliability.consistency_rate ? playerB.reliability.consistency_rate * 100 : 50,
        fullMark: 100,
      },
      {
        metric: 'Squad Fit',
        A: (playerA.squad_fit_score / 100) * 100,
        B: (playerB.squad_fit_score / 100) * 100,
        fullMark: 100,
      },
      {
        metric: 'Sample Volume',
        A: Math.min(100, ((playerA.batting.pressure_balls ?? playerA.bowling.pressure_balls ?? 30) / 150) * 100),
        B: Math.min(100, ((playerB.batting.pressure_balls ?? playerB.bowling.pressure_balls ?? 30) / 150) * 100),
        fullMark: 100,
      },
    ];
  }, [playerA, playerB, isBattingComparison]);

  const candidateOptions = useMemo(() => {
    return CANDIDATES.filter(c => filterRole === 'All' || c.player_type === filterRole);
  }, [filterRole]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-[11px] font-bold tracking-wider text-purple-400 uppercase">
                Player Head-to-Head Comparative Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Original Recommendations vs Alternative Candidate Benchmarking
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct multi-metric comparison across pressure performance, reliability, squad fit and auction feasibility
            </p>
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Filter Pool:</span>
            {['All', 'Batter', 'Bowler'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r as any)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  filterRole === r
                    ? 'bg-[#EA1A85] text-white'
                    : 'bg-[#142036] text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}s
              </button>
            ))}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-3 border-t border-[#1C2A44] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Presets:
          </span>
          {comparisonPresets.map((pr) => (
            <button
              key={pr.label}
              onClick={() => handleApplyPreset(pr)}
              className="px-2.5 py-1 rounded-lg bg-[#121B2F] hover:bg-[#1A2844] border border-[#1E2D4A] text-slate-300 text-[11px] font-medium transition-colors"
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cross-Discipline Caution Warning */}
      {isCrossDiscipline && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Methodological Rule: Cross-Discipline Comparison Warning</span>
              <p className="mt-0.5 text-slate-300 leading-relaxed">
                You are comparing a <strong>{playerA.player_type}</strong> ({playerA.player_name}) against a <strong>{playerB.player_type}</strong> ({playerB.player_name}). Batting and bowling balanced scores use distinct underlying distributions (strike rate & average vs economy & dot ball %). While normalized scores allow strategic balance evaluation, direct head-to-head metric comparisons should be interpreted within each discipline.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selectors & Side-by-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Player A Selector Card */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border-2 border-[#EA1A85]/50 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2D4A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EA1A85] text-white font-mono text-xs font-bold flex items-center justify-center">
                A
              </span>
              <span className="font-bold text-white text-sm">Primary Candidate (A)</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EA1A85]/20 text-[#EA1A85]">
              {playerA.candidate_source}
            </span>
          </div>

          {/* Dropdown */}
          <div>
            <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">
              Select Player A
            </label>
            <select
              value={playerAId}
              onChange={(e) => setPlayerAId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#121B2F] border border-[#1E2D4A] text-white font-bold text-sm focus:outline-none focus:border-[#EA1A85]"
            >
              {candidateOptions.map(c => (
                <option key={c.candidate_id} value={c.candidate_id}>
                  {c.player_name} ({c.verified_role}) — Balanced: {c.balanced_score.toFixed(2)} [{c.candidate_source}]
                </option>
              ))}
            </select>
          </div>

          {/* Quick Metrics */}
          <div className="p-4 rounded-xl bg-[#121B2E] border border-[#1E2D4A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Target Role</span>
              <span className="text-xs font-bold text-white">{playerA.priority_role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Balanced Score</span>
              <span className="text-xl font-black text-[#EA1A85] font-mono">{playerA.balanced_score.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Reliability Score</span>
              <span className="text-xs font-bold font-mono">
                {playerA.reliability.reliability_score !== null ? (
                  <span className="text-emerald-400">{playerA.reliability.reliability_score.toFixed(2)}</span>
                ) : (
                  <span className="text-amber-400 font-sans font-semibold">Pending / N/A</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">2027 Acquisition Status</span>
              <span className={`text-xs font-semibold ${playerA.acquisition.status_2027.includes('Retained') ? 'text-amber-400' : 'text-emerald-400'}`}>
                {playerA.acquisition.status_2027} ({playerA.acquisition.franchise_2027})
              </span>
            </div>
          </div>
        </div>

        {/* Player B Selector Card */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border-2 border-blue-500/50 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2D4A]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                B
              </span>
              <span className="font-bold text-white text-sm">Benchmark Candidate (B)</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
              {playerB.candidate_source}
            </span>
          </div>

          {/* Dropdown */}
          <div>
            <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">
              Select Player B
            </label>
            <select
              value={playerBId}
              onChange={(e) => setPlayerBId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#121B2F] border border-[#1E2D4A] text-white font-bold text-sm focus:outline-none focus:border-blue-500"
            >
              {candidateOptions.map(c => (
                <option key={c.candidate_id} value={c.candidate_id}>
                  {c.player_name} ({c.verified_role}) — Balanced: {c.balanced_score.toFixed(2)} [{c.candidate_source}]
                </option>
              ))}
            </select>
          </div>

          {/* Quick Metrics */}
          <div className="p-4 rounded-xl bg-[#121B2E] border border-[#1E2D4A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Target Role</span>
              <span className="text-xs font-bold text-white">{playerB.priority_role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Balanced Score</span>
              <span className="text-xl font-black text-blue-400 font-mono">{playerB.balanced_score.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Reliability Score</span>
              <span className="text-xs font-bold font-mono">
                {playerB.reliability.reliability_score !== null ? (
                  <span className="text-emerald-400">{playerB.reliability.reliability_score.toFixed(2)}</span>
                ) : (
                  <span className="text-amber-400 font-sans font-semibold">Pending / N/A</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">2027 Acquisition Status</span>
              <span className={`text-xs font-semibold ${playerB.acquisition.status_2027.includes('Retained') ? 'text-amber-400' : 'text-emerald-400'}`}>
                {playerB.acquisition.status_2027} ({playerB.acquisition.franchise_2027})
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Comparative Radar & Metrics Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Comparison Chart */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-sm">Multi-Dimensional Profile Radar</h3>
              <p className="text-[11px] text-slate-400">Normalized 0-100 scale across analytical dimensions</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Comparative Scale</span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#223558" />
                <PolarAngleAxis dataKey="metric" stroke="#94A3B8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar 
                  name={playerA.player_name} 
                  dataKey="A" 
                  stroke="#EA1A85" 
                  fill="#EA1A85" 
                  fillOpacity={0.4} 
                />
                <Radar 
                  name={playerB.player_name} 
                  dataKey="B" 
                  stroke="#38BDF8" 
                  fill="#38BDF8" 
                  fillOpacity={0.4} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side-by-Side Detailed Metrics Table */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-sm">Direct Metric Delta Breakdown</h3>
              <p className="text-[11px] text-slate-400">Head-to-head metric differences</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Delta Analysis</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Metric Row: Balanced Score */}
            <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Balanced Score</span>
                <span className="text-[10px] text-slate-400">Primary overall analytical ranking</span>
              </div>
              <div className="flex items-center gap-4 font-mono font-bold">
                <span className="text-[#EA1A85]">{playerA.balanced_score.toFixed(2)}</span>
                <span className="text-slate-500">vs</span>
                <span className="text-blue-400">{playerB.balanced_score.toFixed(2)}</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded ${
                  playerA.balanced_score >= playerB.balanced_score ? 'bg-emerald-950 text-emerald-400' : 'bg-blue-950 text-blue-400'
                }`}>
                  {playerA.balanced_score >= playerB.balanced_score 
                    ? `+${(playerA.balanced_score - playerB.balanced_score).toFixed(2)} A`
                    : `+${(playerB.balanced_score - playerA.balanced_score).toFixed(2)} B`}
                </span>
              </div>
            </div>

            {/* Metric Row: Pressure Strike Rate / Economy */}
            {isBattingComparison && (
              <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Pressure Strike Rate</span>
                  <span className="text-[10px] text-slate-400">Scoring speed in crunch overs</span>
                </div>
                <div className="flex items-center gap-4 font-mono font-bold">
                  <span className="text-[#EA1A85]">{playerA.batting.pressure_sr?.toFixed(1) ?? 'N/A'}</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-blue-400">{playerB.batting.pressure_sr?.toFixed(1) ?? 'N/A'}</span>
                </div>
              </div>
            )}

            {isBowlingComparison && (
              <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Pressure Economy Rate</span>
                  <span className="text-[10px] text-slate-400">Runs per over (Lower is Better)</span>
                </div>
                <div className="flex items-center gap-4 font-mono font-bold">
                  <span className="text-[#EA1A85]">{playerA.bowling.pressure_economy?.toFixed(2) ?? 'N/A'}</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-blue-400">{playerB.bowling.pressure_economy?.toFixed(2) ?? 'N/A'}</span>
                </div>
              </div>
            )}

            {/* Metric Row: Sample Size */}
            <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Pressure Balls Sample</span>
                <span className="text-[10px] text-slate-400">Sample volume for reliability</span>
              </div>
              <div className="flex items-center gap-4 font-mono font-bold">
                <span className="text-[#EA1A85]">{playerA.batting.pressure_balls ?? playerA.bowling.pressure_balls ?? '-'}</span>
                <span className="text-slate-500">vs</span>
                <span className="text-blue-400">{playerB.batting.pressure_balls ?? playerB.bowling.pressure_balls ?? '-'}</span>
              </div>
            </div>

            {/* Metric Row: Sample Validation */}
            <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Sample Validation Label</span>
                <span className="text-[10px] text-slate-400">Pipeline classification adequacy</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-[#EA1A85] font-semibold">{playerA.reliability.sample_validation}</span>
                <span className="text-slate-500">vs</span>
                <span className="text-blue-400 font-semibold">{playerB.reliability.sample_validation}</span>
              </div>
            </div>

            {/* Metric Row: Franchise Feasibility */}
            <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Acquisition Realism</span>
                <span className="text-[10px] text-slate-400">Real-world auction accessibility</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div className="text-[11px] font-semibold text-slate-300">
                  <span className="text-[#EA1A85]">{playerA.acquisition.status_2027}</span> vs <span className="text-blue-400">{playerB.acquisition.status_2027}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

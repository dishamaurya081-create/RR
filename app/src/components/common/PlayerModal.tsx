import React from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Target,
  Crosshair,
  Sparkles
} from 'lucide-react';
import type { Candidate } from '../../data/intelligenceData';

interface PlayerModalProps {
  player: Candidate | null;
  onClose: () => void;
  onCompareWith?: (player: Candidate) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose, onCompareWith }) => {
  if (!player) return null;

  const hasBattingStats = player.batting.pressure_sr !== null;
  const hasBowlingStats = player.bowling.pressure_economy !== null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-[#0E1626] border border-[#223558] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-r from-[#121E36] via-[#10192D] to-[#1C172E] border-b border-[#1E2D4A]">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#18253E] hover:bg-[#253759] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
              player.candidate_source === 'Original Top 10' 
                ? 'bg-[#EA1A85]/20 text-[#EA1A85] border border-[#EA1A85]/40' 
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}>
              {player.candidate_source}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {player.verified_role}
            </span>
            {player.is_overseas && (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ✈ Overseas
              </span>
            )}
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Balanced Score: {player.balanced_score.toFixed(2)}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            {player.player_name}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <div>
              <span className="text-slate-400">Target Role:</span>{' '}
              <span className="text-slate-200 font-medium">{player.priority_role}</span>
            </div>
            <div>
              <span className="text-slate-400">2027 Franchise:</span>{' '}
              <span className="text-slate-200 font-medium">{player.acquisition.franchise_2027}</span>
            </div>
            <div>
              <span className="text-slate-400">Auction Status:</span>{' '}
              <span className={`font-semibold ${
                player.acquisition.status_2027.includes('Retained') 
                  ? 'text-amber-400' 
                  : 'text-emerald-400'
              }`}>
                {player.acquisition.status_2027}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Role Warning / Inconsistency Callout if applicable */}
          {player.role_warning && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-300 mb-1">Important Data Verification Note</h4>
                  <p className="leading-relaxed">{player.role_warning}</p>
                  {player.corrected_role_note && (
                    <p className="mt-1.5 text-amber-300/80 font-mono text-[11px]">{player.corrected_role_note}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Key Score Breakdown Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#131E33] border border-[#203152]">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Balanced Score
              </span>
              <div className="text-2xl font-bold text-white font-mono">
                {player.balanced_score.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Rank #{player.balanced_rank ?? 'N/A'} in role pool
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131E33] border border-[#203152]">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Reliability Score
              </span>
              <div className="text-2xl font-bold font-mono">
                {player.reliability.reliability_score !== null ? (
                  <span className="text-emerald-400">{player.reliability.reliability_score.toFixed(2)}</span>
                ) : (
                  <span className="text-amber-400 text-sm font-sans font-semibold">Not Available</span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block truncate">
                {player.reliability.reliability_status}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131E33] border border-[#203152]">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Squad Fit Score
              </span>
              <div className="text-2xl font-bold text-blue-400 font-mono">
                {player.squad_fit_score.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Provisional planning fit
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131E33] border border-[#203152]">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Sample Validation
              </span>
              <div className="text-xs font-semibold text-white mt-1">
                {player.reliability.sample_validation}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {player.reliability.consistency_matches ? `${player.reliability.consistency_matches} consistency matches` : 'Historical sample check'}
              </span>
            </div>
          </div>

          {/* Batting Pressure Impact (if applicable) */}
          {hasBattingStats && (
            <div className="p-4 rounded-xl bg-[#121B2E] border border-[#1E2D4A]">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Crosshair size={14} className="text-[#EA1A85]" />
                Pressure Batting Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Pressure Runs:</span>
                  <span className="text-base font-bold text-white font-mono">{player.batting.pressure_runs ?? 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 block">Balls: {player.batting.pressure_balls ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pressure Strike Rate:</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{player.batting.pressure_sr?.toFixed(1) ?? 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 block">Ord SR: {player.batting.ordinary_sr?.toFixed(1) ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pressure Average:</span>
                  <span className="text-base font-bold text-blue-400 font-mono">{player.batting.pressure_average?.toFixed(1) ?? 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 block">Ord Avg: {player.batting.ordinary_average?.toFixed(1) ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Boundaries (4s / 6s):</span>
                  <span className="text-base font-bold text-purple-300 font-mono">
                    {player.batting.pressure_fours ?? '-'} / {player.batting.pressure_sixes ?? '-'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Matches: {player.batting.pressure_matches ?? 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bowling Pressure Impact (if applicable) */}
          {hasBowlingStats && (
            <div className="p-4 rounded-xl bg-[#121B2E] border border-[#1E2D4A]">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target size={14} className="text-blue-400" />
                Pressure Bowling Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Pressure Economy:</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{player.bowling.pressure_economy?.toFixed(2) ?? 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 block">Ord Econ: {player.bowling.ordinary_economy?.toFixed(2) ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pressure Wickets:</span>
                  <span className="text-base font-bold text-white font-mono">{player.bowling.pressure_wickets ?? 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 block">Balls: {player.bowling.pressure_balls ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Dot Ball %:</span>
                  <span className="text-base font-bold text-blue-400 font-mono">
                    {player.bowling.pressure_dot_percentage ? `${player.bowling.pressure_dot_percentage.toFixed(1)}%` : 'N/A'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Dots: {player.bowling.pressure_dots ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Wickets / 100 Balls:</span>
                  <span className="text-base font-bold text-purple-300 font-mono">
                    {player.bowling.pressure_wickets_per_100 ? player.bowling.pressure_wickets_per_100.toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Matches: {player.bowling.pressure_matches ?? 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Qualitative Scouting & Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#101726] border border-[#1A2844]">
              <h5 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                Key Analytical Strength
              </h5>
              <p className="text-slate-300 leading-relaxed">{player.qualitative.main_strength}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#101726] border border-[#1A2844]">
              <h5 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
                RR Squad Contribution
              </h5>
              <p className="text-slate-300 leading-relaxed">{player.qualitative.rr_squad_contribution}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#101726] border border-[#1A2844]">
              <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-amber-400" />
                Validation / Risk Check
              </h5>
              <p className="text-slate-400 leading-relaxed">{player.qualitative.risk_or_validation}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#101726] border border-[#1A2844]">
              <h5 className="font-bold text-blue-300 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                <Activity size={13} className="text-blue-400" />
                Acquisition Recommendation
              </h5>
              <p className="text-slate-300 font-medium leading-relaxed">{player.acquisition.acquisition_decision}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#090E1A] border-t border-[#1E2D4A] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Player ID: <code className="text-slate-400">{player.player_id || 'N/A'}</code>
          </span>
          <div className="flex items-center gap-3">
            {onCompareWith && (
              <button
                onClick={() => {
                  onCompareWith(player);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-[#1E2D4A] hover:bg-[#283C62] text-xs font-semibold text-white transition-colors"
              >
                Compare This Player
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#EA1A85] hover:bg-[#D81177] text-xs font-semibold text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

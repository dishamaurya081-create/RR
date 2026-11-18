import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Eye, 
  Info
} from 'lucide-react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { CANDIDATES } from '../../data/intelligenceData';
import type { Candidate } from '../../data/intelligenceData';

interface PlayerReliabilityProps {
  onSelectPlayer: (player: Candidate) => void;
}

export const PlayerReliability: React.FC<PlayerReliabilityProps> = ({ onSelectPlayer }) => {
  const [sampleFilter, setSampleFilter] = useState('All');

  // Sample adequacy counts
  const adequateCount = CANDIDATES.filter(c => c.reliability.sample_validation === 'Adequate consistency sample').length;
  const limitedCount = CANDIDATES.filter(c => c.reliability.sample_validation === 'Limited consistency sample').length;
  const needsValidationCount = CANDIDATES.filter(c => c.reliability.sample_validation === 'Needs sample validation').length;
  const missingReliabilityCount = CANDIDATES.filter(c => c.reliability.reliability_score === null).length;

  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter((c) => {
      if (sampleFilter !== 'All' && c.reliability.sample_validation !== sampleFilter) return false;
      return true;
    }).sort((a, b) => {
      // Sort with real reliability scores first, then balanced score
      const scoreA = a.reliability.reliability_score ?? -1;
      const scoreB = b.reliability.reliability_score ?? -1;
      return scoreB - scoreA;
    });
  }, [sampleFilter]);

  // Scatter data: Consistency Matches vs Consistency Rate
  const scatterData = useMemo(() => {
    return CANDIDATES
      .filter(c => c.reliability.consistency_matches !== null && c.reliability.consistency_rate !== null)
      .map(c => ({
        x: c.reliability.consistency_matches ?? 0,
        y: c.reliability.consistency_rate ? parseFloat((c.reliability.consistency_rate * 100).toFixed(0)) : 0,
        z: c.balanced_score,
        name: c.player_name,
        role: c.verified_role,
        source: c.candidate_source,
        sample: c.reliability.sample_validation,
        player: c
      }));
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
            Consistency & Statistical Governance
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Player Reliability, Sample Adequacy & Scenario Stability
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
          Cricket performance in crunch situations exhibits high variance. This module separates <strong>peak performance potential (Balanced Score)</strong> from <strong>reproducible stability (Reliability Score)</strong>, strictly distinguishing verified sample sizes from statistical noise.
        </p>
      </div>

      {/* Critical Methodological Alert: Balanced vs Reliability & 3-Appearance Fallacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-300 mb-1">Statistical Rule: The 3-Appearance Fallacy</h4>
              <p className="text-slate-300 leading-relaxed">
                In franchise cricket, <strong>3 scenario appearances do NOT establish statistical reliability</strong>. A player who finishes 3 games successfully could simply be enjoying a random hot streak. Adequate sample validation requires continuous multi-season match tracking (10+ consistency matches) across varying game states.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/40 text-blue-200">
          <div className="flex items-start gap-2.5">
            <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-300 mb-1">Zero-Fabrication Data Governance</h4>
              <p className="text-slate-300 leading-relaxed">
                In the supplied datasets, <strong>5 of 5 original batters</strong> have no independent reliability score calculated by the original pipeline. As required, these records are displayed as <strong>"Pending / Unavailable"</strong> and are <strong>NEVER replaced with zero or synthetic approximations</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Adequacy KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div 
          onClick={() => setSampleFilter('Adequate consistency sample')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            sampleFilter === 'Adequate consistency sample' 
              ? 'bg-emerald-950/40 border-emerald-400 ring-1 ring-emerald-400' 
              : 'bg-[#0F172A] border-[#1E293B] hover:border-emerald-500/50'
          }`}
        >
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
            Adequate Sample (10+ Matches)
          </span>
          <div className="text-2xl font-black text-white font-mono mt-1">{adequateCount}</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">High statistical confidence</span>
        </div>

        <div 
          onClick={() => setSampleFilter('Limited consistency sample')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            sampleFilter === 'Limited consistency sample' 
              ? 'bg-blue-950/40 border-blue-400 ring-1 ring-blue-400' 
              : 'bg-[#0F172A] border-[#1E293B] hover:border-blue-500/50'
          }`}
        >
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
            Limited Sample (4-9 Matches)
          </span>
          <div className="text-2xl font-black text-white font-mono mt-1">{limitedCount}</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Moderate confidence</span>
        </div>

        <div 
          onClick={() => setSampleFilter('Needs sample validation')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            sampleFilter === 'Needs sample validation' 
              ? 'bg-amber-950/40 border-amber-400 ring-1 ring-amber-400' 
              : 'bg-[#0F172A] border-[#1E293B] hover:border-amber-500/50'
          }`}
        >
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            Needs Validation (&lt;4 Matches)
          </span>
          <div className="text-2xl font-black text-white font-mono mt-1">{needsValidationCount}</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Includes original batters</span>
        </div>

        <div 
          onClick={() => setSampleFilter('All')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            sampleFilter === 'All' 
              ? 'bg-purple-950/40 border-purple-400 ring-1 ring-purple-400' 
              : 'bg-[#0F172A] border-[#1E293B] hover:border-purple-500/50'
          }`}
        >
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
            Reliability Pending / N/A
          </span>
          <div className="text-2xl font-black text-purple-300 font-mono mt-1">{missingReliabilityCount}</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Preserved without fake data</span>
        </div>
      </div>

      {/* Consistency Distribution Scatterplot */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1E2D4A]">
          <div>
            <h3 className="font-bold text-white text-sm">Consistency Rate vs Consistency Matches Tested</h3>
            <p className="text-[11px] text-slate-400">Comparing player consistency percentage against the size of the test sample</p>
          </div>
          <span className="text-xs font-mono text-emerald-400">Sample Depth Analysis</span>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Consistency Matches" 
                domain={[0, 16]} 
                stroke="#64748B" 
                fontSize={11}
                unit=" Matches"
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Consistency Rate" 
                domain={[0, 100]} 
                stroke="#64748B" 
                fontSize={11}
                unit="%"
              />
              <ZAxis type="number" dataKey="z" range={[40, 160]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="p-3 bg-[#0F172A] border border-[#334155] rounded-xl text-xs space-y-1 shadow-xl">
                      <div className="font-bold text-white text-sm">{d.name}</div>
                      <div className="text-slate-400 text-[11px]">{d.role} • {d.source}</div>
                      <div className="text-emerald-400 font-mono">Consistency: {d.y}%</div>
                      <div className="text-blue-400 font-mono">Sample Size: {d.x} matches</div>
                      <div className="text-purple-300 font-mono">Balanced Score: {d.z.toFixed(2)}</div>
                      <div className="text-amber-300 text-[10px] mt-1">{d.sample}</div>
                    </div>
                  );
                }}
              />
              <Scatter name="Reliability" data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`rel-scatter-${index}`} 
                    fill={
                      entry.sample === 'Adequate consistency sample' ? '#10B981' :
                      entry.sample === 'Limited consistency sample' ? '#38BDF8' : '#F59E0B'
                    } 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-3 border-t border-[#1E2D4A] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-slate-300">Adequate Sample (High Confidence)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#38BDF8]" />
            <span className="text-slate-300">Limited Sample (Moderate Confidence)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="text-slate-300">Needs Sample Validation (&lt;4 Matches)</span>
          </div>
        </div>
      </div>

      {/* Reliability Register Table */}
      <div className="rounded-2xl bg-[#0E1626] border border-[#1E2D4A] overflow-hidden shadow-xl">
        <div className="p-4 bg-[#090E1A] border-b border-[#1E2D4A] flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Full Candidate Reliability & Sample Register</h3>
          <span className="text-xs font-mono text-slate-400">{filteredCandidates.length} Candidates Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0D1424] border-b border-[#1E2D4A] text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Source</th>
                <th className="py-3 px-3 text-right">Balanced Score</th>
                <th className="py-3 px-3 text-right">Reliability Score</th>
                <th className="py-3 px-3 text-right">Consistency Rate</th>
                <th className="py-3 px-3 text-right">Consistency Matches</th>
                <th className="py-3 px-3 text-center">Scenario Stability</th>
                <th className="py-3 px-4">Sample Adequacy</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#17233B]">
              {filteredCandidates.map((player) => (
                <tr 
                  key={player.candidate_id}
                  onClick={() => onSelectPlayer(player)}
                  className="hover:bg-[#131D31] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {player.player_name}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {player.verified_role}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      player.candidate_source === 'Original Top 10' ? 'bg-[#EA1A85]/20 text-[#EA1A85]' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {player.candidate_source}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {player.balanced_score.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {player.reliability.reliability_score !== null ? (
                      <span className="font-bold text-emerald-400">
                        {player.reliability.reliability_score.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-sans font-semibold">
                        Pending / N/A
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {player.reliability.consistency_rate !== null ? (
                      <span className="text-slate-200">{(player.reliability.consistency_rate * 100).toFixed(0)}%</span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {player.reliability.consistency_matches ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-purple-300">
                    {player.reliability.scenario_stability ?? 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      player.reliability.sample_validation === 'Adequate consistency sample'
                        ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30'
                        : player.reliability.sample_validation === 'Limited consistency sample'
                        ? 'bg-blue-950/30 text-blue-300 border-blue-500/30'
                        : 'bg-amber-950/30 text-amber-300 border-amber-500/30'
                    }`}>
                      {player.reliability.sample_validation}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlayer(player);
                      }}
                      className="p-1.5 rounded-lg bg-[#18243D] hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

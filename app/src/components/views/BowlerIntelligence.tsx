import React, { useState, useMemo } from 'react';
import { 
  Target, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  TrendingDown, 
  Award,
  Eye,
  Info,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { CANDIDATES } from '../../data/intelligenceData';
import type { Candidate } from '../../data/intelligenceData';

interface BowlerIntelligenceProps {
  onSelectPlayer: (player: Candidate) => void;
}

export const BowlerIntelligence: React.FC<BowlerIntelligenceProps> = ({ onSelectPlayer }) => {
  const [minBalls, setMinBalls] = useState(40);
  const [sourceFilter, setSourceFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // All 24 candidate records evaluated in the bowling pool
  const bowlers = useMemo(() => {
    return CANDIDATES.filter(c => c.player_type === 'Bowler' || c.bowling.pressure_economy !== null);
  }, []);

  const filteredBowlers = useMemo(() => {
    return bowlers.filter(b => {
      if (b.bowling.pressure_balls && b.bowling.pressure_balls < minBalls) return false;
      if (sourceFilter !== 'All' && b.candidate_source !== sourceFilter) return false;
      if (searchTerm.trim() && !b.player_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    }).sort((a, b) => (a.bowling.pressure_economy ?? 99) - (b.bowling.pressure_economy ?? 99)); // Lower economy is better
  }, [bowlers, minBalls, sourceFilter, searchTerm]);

  // Economy ranking chart (lower is better)
  const rankingData = filteredBowlers.slice(0, 12).map(b => ({
    name: b.player_name,
    pressure_economy: b.bowling.pressure_economy ? parseFloat(b.bowling.pressure_economy.toFixed(2)) : 0,
    ordinary_economy: b.bowling.ordinary_economy ? parseFloat(b.bowling.ordinary_economy.toFixed(2)) : 0,
    source: b.candidate_source,
    role: b.verified_role,
    wickets: b.bowling.pressure_wickets ?? 0,
    player: b
  }));

  // Scatter plot data: Economy vs Wickets per 100 balls
  const scatterData = filteredBowlers
    .filter(b => b.bowling.pressure_economy !== null && b.bowling.pressure_wickets_per_100 !== null)
    .map(b => ({
      x: b.bowling.pressure_economy ? parseFloat(b.bowling.pressure_economy.toFixed(2)) : 0,
      y: b.bowling.pressure_wickets_per_100 ? parseFloat(b.bowling.pressure_wickets_per_100.toFixed(1)) : 0,
      z: b.bowling.pressure_balls ?? 30,
      name: b.player_name,
      source: b.candidate_source,
      role: b.verified_role,
      player: b
    }));

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[11px] font-bold tracking-wider text-blue-400 uppercase">
              Bowling Analytical Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Pressure Overs Bowling & Death-Phase Containment
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates economy rate under pressure, dot ball percentage, strike rate and wicket frequency
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Source Filter</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="All">All Sources</option>
              <option value="Original Top 10">Original Top 10</option>
              <option value="Alternative Pool">Alternative Pool</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Min Pressure Balls</label>
            <select
              value={minBalls}
              onChange={(e) => setMinBalls(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value={0}>Any Balls (0+)</option>
              <option value={40}>40+ Balls</option>
              <option value={70}>70+ Balls</option>
              <option value={100}>100+ Balls</option>
            </select>
          </div>
        </div>
      </div>

      {/* Analytical Principle Alert */}
      <div className="p-4 rounded-xl bg-[#141A29] border border-blue-500/30 text-xs text-slate-300">
        <div className="flex items-start gap-2.5">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-300">Analytical Metric Guidance:</span>{' '}
            In pressure overs (death overs & match-defining phases), <strong>a lower economy rate is superior</strong>. However, an elite bowler cannot rely on dot balls alone; <strong>wicket-taking frequency (wickets per 100 balls) and sample size</strong> must be jointly evaluated to guard against small-sample skew.
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pressure Economy Ranking Chart */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-sm">Pressure Economy Rate Leaderboard</h3>
              <p className="text-[11px] text-slate-400">Runs conceded per over in pressure conditions</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">Lower is Better</span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[4, 12]} stroke="#64748B" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={130} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: any, item: any) => [
                    `${val} RPO (${item.payload.wickets} Wkts)`, 
                    `${item.payload.role} • ${item.payload.source}`
                  ]}
                />
                <Bar dataKey="pressure_economy" radius={[0, 4, 4, 0]}>
                  {rankingData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.source === 'Original Top 10' ? '#FF64B0' : '#3B82F6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-[#1E2D4A] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#FF64B0]" />
              <span className="text-slate-300">Original Top 10</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#3B82F6]" />
              <span className="text-slate-300">Alternative Pool</span>
            </div>
          </div>
        </div>

        {/* Scatterplot: Pressure Economy vs Wickets / 100 Balls */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-sm">Economy vs Wickets Per 100 Balls</h3>
              <p className="text-[11px] text-slate-400">Containment control versus genuine breakthrough threat</p>
            </div>
            <span className="text-xs font-mono text-purple-300">Optimal: Low Econ + High Wkts</span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Economy" 
                  domain={[5, 12]} 
                  stroke="#64748B" 
                  fontSize={11}
                  unit=" RPO"
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Wickets/100" 
                  domain={[0, 20]} 
                  stroke="#64748B" 
                  fontSize={11}
                  unit=" Wkts"
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
                        <div className="text-emerald-400 font-mono">Pressure Econ: {d.x} RPO</div>
                        <div className="text-blue-400 font-mono">Wkts / 100 Balls: {d.y}</div>
                        <div className="text-purple-300 font-mono">Pressure Balls: {d.z}</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Bowlers" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell 
                      key={`scatter-cell-${index}`} 
                      fill={entry.source === 'Original Top 10' ? '#FF64B0' : '#38BDF8'} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-center text-[11px] text-slate-400">
            Top-Left quadrant represents premier death specialists (low economy + high wicket taking frequency).
          </div>
        </div>

      </div>

      {/* Comprehensive Bowling Intelligence Table */}
      <div className="rounded-2xl bg-[#0E1626] border border-[#1E2D4A] overflow-hidden shadow-xl">
        <div className="p-4 bg-[#090E1A] border-b border-[#1E2D4A] flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Detailed Pressure Bowling Records</h3>
          <span className="text-xs font-mono text-slate-400">{filteredBowlers.length} Bowlers Analyzed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0D1424] border-b border-[#1E2D4A] text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-3">Role Profile</th>
                <th className="py-3 px-3">Source</th>
                <th className="py-3 px-3 text-right">Pressure Balls</th>
                <th className="py-3 px-3 text-right">Pressure Wkts</th>
                <th className="py-3 px-3 text-right">Pressure Econ</th>
                <th className="py-3 px-3 text-right">Dot Ball %</th>
                <th className="py-3 px-3 text-right">Wkts / 100 Balls</th>
                <th className="py-3 px-3 text-right">Ordinary Econ</th>
                <th className="py-3 px-3 text-right">Econ Improvement</th>
                <th className="py-3 px-3 text-right">Consistency Rate</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#17233B]">
              {filteredBowlers.map((player) => (
                <tr 
                  key={player.candidate_id}
                  onClick={() => onSelectPlayer(player)}
                  className="hover:bg-[#131D31] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-white group-hover:text-blue-400 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <span>{player.player_name}</span>
                      {player.is_overseas && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">✈</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {player.verified_role}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      player.candidate_source === 'Original Top 10'
                        ? 'bg-[#FF64B0]/20 text-[#FF64B0]'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {player.candidate_source}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {player.bowling.pressure_balls ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {player.bowling.pressure_wickets ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                    {player.bowling.pressure_economy?.toFixed(2) ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-blue-400">
                    {player.bowling.pressure_dot_percentage ? `${player.bowling.pressure_dot_percentage.toFixed(1)}%` : '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-purple-300">
                    {player.bowling.pressure_wickets_per_100 ? player.bowling.pressure_wickets_per_100.toFixed(1) : '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {player.bowling.ordinary_economy?.toFixed(2) ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {player.bowling.economy_improvement !== null ? (
                      <span className={player.bowling.economy_improvement > 0 ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                        {player.bowling.economy_improvement > 0 ? `+${player.bowling.economy_improvement.toFixed(2)}` : player.bowling.economy_improvement.toFixed(2)}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {player.reliability.consistency_rate !== null ? (
                      <span className="text-slate-300">{(player.reliability.consistency_rate * 100).toFixed(0)}%</span>
                    ) : (
                      <span className="text-amber-400 text-[10px]">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlayer(player);
                      }}
                      className="p-1.5 rounded-lg bg-[#18243D] hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
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

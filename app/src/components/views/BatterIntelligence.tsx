import React, { useState, useMemo } from 'react';
import { 
  Crosshair, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
  Search, 
  BarChart3, 
  Eye,
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

interface BatterIntelligenceProps {
  onSelectPlayer: (player: Candidate) => void;
}

export const BatterIntelligence: React.FC<BatterIntelligenceProps> = ({ onSelectPlayer }) => {
  const [minBalls, setMinBalls] = useState(20);
  const [sourceFilter, setSourceFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // All 26 candidate records evaluated in the batting pool
  const batters = useMemo(() => {
    return CANDIDATES.filter(c => c.player_type === 'Batter' || c.batting.pressure_sr !== null);
  }, []);

  const filteredBatters = useMemo(() => {
    return batters.filter(b => {
      if (b.batting.pressure_balls && b.batting.pressure_balls < minBalls) return false;
      if (sourceFilter !== 'All' && b.candidate_source !== sourceFilter) return false;
      if (searchTerm.trim() && !b.player_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    }).sort((a, b) => (b.batting.pressure_sr ?? 0) - (a.batting.pressure_sr ?? 0));
  }, [batters, minBalls, sourceFilter, searchTerm]);

  // Ranking chart data
  const rankingChartData = filteredBatters.slice(0, 12).map(b => ({
    name: b.player_name,
    pressure_sr: b.batting.pressure_sr ? parseFloat(b.batting.pressure_sr.toFixed(1)) : 0,
    ordinary_sr: b.batting.ordinary_sr ? parseFloat(b.batting.ordinary_sr.toFixed(1)) : 0,
    source: b.candidate_source,
    role: b.verified_role,
    player: b
  }));

  // Scatter plot data (Strike Rate vs Average)
  const scatterData = filteredBatters
    .filter(b => b.batting.pressure_sr !== null && b.batting.pressure_average !== null)
    .map(b => ({
      x: b.batting.pressure_sr ? parseFloat(b.batting.pressure_sr.toFixed(1)) : 0,
      y: b.batting.pressure_average ? parseFloat(b.batting.pressure_average.toFixed(1)) : 0,
      z: b.batting.pressure_balls ?? 20,
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
            <span className="w-2 h-2 rounded-full bg-[#EA1A85]" />
            <span className="text-[11px] font-bold tracking-wider text-[#EA1A85] uppercase">
              Batting Analytical Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Crunch-Overs Batting Intelligence & Strike Rate Expansion
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates strike rate, scoring average, boundary frequency and ordinary-to-pressure improvement
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
              <option value={20}>20+ Balls</option>
              <option value={40}>40+ Balls</option>
              <option value={80}>80+ Balls</option>
            </select>
          </div>
        </div>
      </div>

      {/* Role Verification Notice */}
      <div className="p-4 rounded-xl bg-[#141A29] border border-blue-500/30 text-xs text-slate-300">
        <div className="flex items-start gap-2.5">
          <Sparkles size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-300">Role Classification Integrity:</span>{' '}
            Candidates with verified keeper roles (Dhoni, Klaasen, Jurel, Karthik) and all-rounder roles (Rashid Khan, Andre Russell, Jadeja, Axar, Tewatia, Krunal) are explicitly labeled. <strong className="text-white">Rashid Khan</strong> is cataloged with an elite death-overs SR of 189.17 but remains classified as an All-Rounder/Bowler in team construction.
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pressure Strike Rate Ranking Chart */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-sm">Pressure Strike Rate Leaderboard</h3>
              <p className="text-[11px] text-slate-400">Comparing Strike Rate in pressure situations</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">Higher is Better</span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingChartData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[100, 250]} stroke="#64748B" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={130} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: any, item: any) => [
                    `${val} SR (${item.payload.role})`, 
                    item.payload.source
                  ]}
                />
                <Bar dataKey="pressure_sr" radius={[0, 4, 4, 0]}>
                  {rankingChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.source === 'Original Top 10' ? '#EA1A85' : '#3B82F6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-[#1E2D4A] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#EA1A85]" />
              <span className="text-slate-300">Original Top 10</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#3B82F6]" />
              <span className="text-slate-300">Alternative Pool</span>
            </div>
          </div>
        </div>

        {/* Scatterplot: Pressure Strike Rate vs Pressure Average */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-sm">Pressure Strike Rate vs Pressure Average</h3>
              <p className="text-[11px] text-slate-400">Scoring speed versus wicket preservation</p>
            </div>
            <span className="text-xs font-mono text-purple-300">Quadrant Analysis</span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Strike Rate" 
                  domain={[120, 240]} 
                  stroke="#64748B" 
                  fontSize={11}
                  unit=" SR"
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Average" 
                  domain={[10, 100]} 
                  stroke="#64748B" 
                  fontSize={11}
                  unit=" Avg"
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
                        <div className="text-emerald-400 font-mono">Pressure SR: {d.x}</div>
                        <div className="text-blue-400 font-mono">Pressure Avg: {d.y}</div>
                        <div className="text-purple-300 font-mono">Pressure Balls: {d.z}</div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Batters" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell 
                      key={`scatter-cell-${index}`} 
                      fill={entry.source === 'Original Top 10' ? '#EA1A85' : '#38BDF8'} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-center text-[11px] text-slate-400">
            Top-Right quadrant represents elite finishers combining high SR and high wicket preservation (e.g. Rinku Singh).
          </div>
        </div>

      </div>

      {/* Comprehensive Batting Intelligence Table */}
      <div className="rounded-2xl bg-[#0E1626] border border-[#1E2D4A] overflow-hidden shadow-xl">
        <div className="p-4 bg-[#090E1A] border-b border-[#1E2D4A] flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Detailed Pressure Batting Records</h3>
          <span className="text-xs font-mono text-slate-400">{filteredBatters.length} Candidates Analyzed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0D1424] border-b border-[#1E2D4A] text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-3">Role Classification</th>
                <th className="py-3 px-3">Source</th>
                <th className="py-3 px-3 text-right">Pressure Runs</th>
                <th className="py-3 px-3 text-right">Pressure Balls</th>
                <th className="py-3 px-3 text-right">Pressure SR</th>
                <th className="py-3 px-3 text-right">Pressure Avg</th>
                <th className="py-3 px-3 text-right">Boundaries (4/6)</th>
                <th className="py-3 px-3 text-right">Ordinary SR</th>
                <th className="py-3 px-3 text-right">SR Improvement</th>
                <th className="py-3 px-3 text-right">Consistency Rate</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#17233B]">
              {filteredBatters.map((player) => (
                <tr 
                  key={player.candidate_id}
                  onClick={() => onSelectPlayer(player)}
                  className="hover:bg-[#131D31] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-white group-hover:text-[#EA1A85] transition-colors">
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
                        ? 'bg-[#EA1A85]/20 text-[#EA1A85]'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {player.candidate_source}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {player.batting.pressure_runs ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {player.batting.pressure_balls ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                    {player.batting.pressure_sr?.toFixed(1) ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-blue-400">
                    {player.batting.pressure_average?.toFixed(1) ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-purple-300">
                    {player.batting.pressure_fours !== null ? `${player.batting.pressure_fours} / ${player.batting.pressure_sixes}` : '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {player.batting.ordinary_sr?.toFixed(1) ?? '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {player.batting.sr_difference !== null ? (
                      <span className={player.batting.sr_difference > 0 ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                        {player.batting.sr_difference > 0 ? `+${player.batting.sr_difference.toFixed(1)}` : player.batting.sr_difference.toFixed(1)}
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
                      className="p-1.5 rounded-lg bg-[#18243D] hover:bg-[#EA1A85] text-slate-300 hover:text-white transition-colors"
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

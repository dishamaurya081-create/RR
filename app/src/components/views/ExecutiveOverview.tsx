import React from 'react';
import { 
  Target, 
  Crosshair, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Flame
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { CANDIDATES } from '../../data/intelligenceData';
import type { Candidate } from '../../data/intelligenceData';
import type { NavigationTab } from '../../types';

interface ExecutiveOverviewProps {
  onSelectPlayer: (player: Candidate) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ 
  onSelectPlayer, 
  setActiveTab 
}) => {
  const origBatters = CANDIDATES
    .filter(c => c.candidate_source === 'Original Top 10' && c.player_type === 'Batter')
    .sort((a, b) => b.balanced_score - a.balanced_score);

  const origBowlers = CANDIDATES
    .filter(c => c.candidate_source === 'Original Top 10' && c.player_type === 'Bowler')
    .sort((a, b) => b.balanced_score - a.balanced_score);

  const topPressureBatters = [...CANDIDATES]
    .filter(c => (c.batting.pressure_balls ?? 0) >= 30 && c.batting.pressure_sr !== null)
    .sort((a, b) => (b.batting.pressure_sr ?? 0) - (a.batting.pressure_sr ?? 0))
    .slice(0, 6);

  const topPressureBowlers = [...CANDIDATES]
    .filter(c => (c.bowling.pressure_balls ?? 0) >= 50 && c.bowling.pressure_economy !== null)
    .sort((a, b) => (a.bowling.pressure_economy ?? 99) - (b.bowling.pressure_economy ?? 99))
    .slice(0, 6);

  const sourceComparisonData = [
    { name: 'Original Batters', count: 5, avgScore: 69.27, fill: '#EA1A85' },
    { name: 'Original Bowlers', count: 5, avgScore: 68.42, fill: '#FF64B0' },
    { name: 'Alternative Batters', count: 21, avgScore: 49.13, fill: '#3B82F6' },
    { name: 'Alternative Bowlers', count: 19, avgScore: 47.08, fill: '#60A5FA' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Strategic Franchise Callout Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-[#17172E] via-[#1A1A38] to-[#12203D] border border-[#EA1A85]/30 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-[#EA1A85]/10 to-transparent pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EA1A85]/20 text-[#EA1A85] border border-[#EA1A85]/40 uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={12} /> Official IPL 2027 Strategy Directive
              </span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">Purse: ₹27.05 Cr Available</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Statistical Dominance vs Real-World Auction Feasibility
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Rajasthan Royals enters the 2027 Mega-Auction with an official <strong className="text-white">19-player roster (17 retained, 2 traded-in)</strong>, <strong className="text-emerald-400">₹27.05 crore remaining purse</strong>, and <strong className="text-amber-300">6 available squad positions (including 3 open overseas slots)</strong>.
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              While the <strong className="text-white">Original Top 10 Recommendations</strong> represent the highest historical crunch-time scores, <span className="text-red-400 font-semibold">8 of the 10 players are confirmed retained by rival franchises</span> (KKR, DC, SRH, MI, RCB, PBKS). Dhruv Jurel is retained by RR, leaving only Maheesh Theekshana unconfirmed. <strong className="text-[#EA1A85]">The 40 Alternative Candidates</strong> (including released targets like Ashutosh Sharma, Arshdeep Singh, and former Royal Shimron Hetmyer) are critical to filling RR’s 6 available auction positions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('acquisition-board')}
              className="px-5 py-2.5 rounded-xl bg-[#EA1A85] hover:bg-[#D81177] text-white text-xs font-bold transition-all shadow-lg shadow-[#EA1A85]/25 flex items-center justify-center gap-2"
            >
              <span>Explore 50 Candidates</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setActiveTab('squad-requirements')}
              className="px-5 py-2.5 rounded-xl bg-[#142340] hover:bg-[#1A2E54] border border-[#233B6B] text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Squad & Purse Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official 2027 Franchise Snapshot Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official RR Squad</span>
          <div className="text-2xl font-black text-white font-mono mt-1">19 Players</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">17 Retained + 2 Traded</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Remaining Purse</span>
          <div className="text-2xl font-black text-emerald-300 font-mono mt-1">₹27.05 Cr</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Avg ₹4.51 Cr / slot</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Available Slots</span>
          <div className="text-2xl font-black text-amber-300 font-mono mt-1">6 Positions</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Max capacity 25</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-blue-500/30">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Overseas Open</span>
          <div className="text-2xl font-black text-blue-300 font-mono mt-1">3 Slots</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">5 Retained / 8 Cap</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#EA1A85]/40 bg-gradient-to-br from-[#EA1A85]/5 to-transparent">
          <span className="text-[10px] font-bold text-[#EA1A85] uppercase tracking-wider block">Candidate Pool</span>
          <div className="text-2xl font-black text-white font-mono mt-1">50 Records</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">10 Orig + 40 Alt</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-purple-500/30">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Auction Eligible</span>
          <div className="text-2xl font-black text-purple-300 font-mono mt-1">21 Players</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Released targets</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-red-500/30">
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Retained by Rivals</span>
          <div className="text-2xl font-black text-red-300 font-mono mt-1">23 Records</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Unavailable</span>
        </div>
      </div>

      {/* Sections A & B: Top Recommended Batters & Bowlers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Recommended Batters */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2D4A]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EA1A85]/20 flex items-center justify-center text-[#EA1A85]">
                  <Crosshair size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Top Recommended Batters</h3>
                  <p className="text-[11px] text-slate-400">Original Top 10 validated balanced scores</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('batter-intelligence')}
                className="text-xs text-[#EA1A85] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View All 26</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="divide-y divide-[#1A2740] mt-3">
              {origBatters.map((player) => (
                <div 
                  key={player.candidate_id}
                  onClick={() => onSelectPlayer(player)}
                  className="py-3 flex items-center justify-between hover:bg-[#131E33] px-2 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#18253E] text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                      {player.balanced_rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs group-hover:text-[#EA1A85] transition-colors">
                          {player.player_name}
                        </span>
                        {player.is_overseas && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            Overseas
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {player.priority_role} • Pressure SR: <strong className="text-emerald-400">{player.batting.pressure_sr?.toFixed(1)}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-white font-mono">
                      {player.balanced_score.toFixed(2)}
                    </div>
                    <span className={`text-[10px] font-semibold ${
                      player.acquisition.status_2027 === 'Retained by RR' ? 'text-[#EA1A85]' : 'text-red-400'
                    }`}>
                      {player.acquisition.status_2027} ({player.acquisition.franchise_2027})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#121B2F] border border-[#1C2B47] text-[11px] text-slate-400 flex items-center justify-between">
            <span>Historical Balanced Scores strictly preserved.</span>
            <span className="text-slate-300 font-semibold">1 RR Asset • 4 Retained Elsewhere</span>
          </div>
        </div>

        {/* Top Recommended Bowlers */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2D4A]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Target size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Top Recommended Bowlers</h3>
                  <p className="text-[11px] text-slate-400">Original Top 10 validated balanced scores</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('bowler-intelligence')}
                className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1"
              >
                <span>View All 24</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="divide-y divide-[#1A2740] mt-3">
              {origBowlers.map((player) => (
                <div 
                  key={player.candidate_id}
                  onClick={() => onSelectPlayer(player)}
                  className="py-3 flex items-center justify-between hover:bg-[#131E33] px-2 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#18253E] text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                      {player.balanced_rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs group-hover:text-blue-400 transition-colors">
                          {player.player_name}
                        </span>
                        {player.is_overseas && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            Overseas
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {player.priority_role} • Pressure Econ: <strong className="text-emerald-400">{player.bowling.pressure_economy?.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-white font-mono">
                      {player.balanced_score.toFixed(2)}
                    </div>
                    <span className={`text-[10px] font-semibold ${
                      player.acquisition.status_2027 === 'Pending auction registration verification' 
                        ? 'text-yellow-400' 
                        : 'text-red-400'
                    }`}>
                      {player.acquisition.status_2027} ({player.acquisition.franchise_2027})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#121B2F] border border-[#1C2B47] text-[11px] text-slate-400 flex items-center justify-between">
            <span>Economy rate, dot ball % and wickets per 100 balls weighted.</span>
            <span className="text-slate-300 font-semibold">1 Pending Check • 4 Retained Elsewhere</span>
          </div>
        </div>

      </div>

      {/* Sections C & D: Original vs Alternative Distribution & Real-World Feasibility */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Source Comparison Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-sm">Candidate Pool Distribution & Average Score</h3>
              <p className="text-[11px] text-slate-400">Original Top 10 recommendations versus Alternative Pool</p>
            </div>
            <span className="text-xs font-mono text-slate-400">50 Total Records</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceComparisonData} layout="vertical" margin={{ left: 30, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[0, 85]} stroke="#64748B" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={130} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, _name: any, item: any) => [
                    `${val} (Avg Balanced Score)`, 
                    `${item.payload.count} Players`
                  ]}
                />
                <Bar dataKey="avgScore" radius={[0, 6, 6, 0]}>
                  {sourceComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#1E2D4A] text-center">
            <div>
              <span className="text-[10px] text-slate-400 block">Original Batters Avg</span>
              <span className="text-base font-bold text-[#EA1A85] font-mono">69.27</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Original Bowlers Avg</span>
              <span className="text-base font-bold text-[#FF64B0] font-mono">68.42</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Alternative Batters Avg</span>
              <span className="text-base font-bold text-blue-400 font-mono">49.13</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Alternative Bowlers Avg</span>
              <span className="text-base font-bold text-blue-300 font-mono">47.08</span>
            </div>
          </div>
        </div>

        {/* Real-World 2027 Acquisition Availability Reality */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-sm mb-1">Official 2027 Acquisition Status Breakdown</h3>
            <p className="text-[11px] text-slate-400 mb-4">Status classification across all 50 candidate records</p>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-red-300 block">Retained by another franchise</span>
                  <span className="text-[10px] text-slate-400">Rinku, Stubbs, Miller, Klaasen, Shardul, Hazlewood, Chahal, etc.</span>
                </div>
                <span className="text-base font-black text-red-400 font-mono">23</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#EA1A85]/10 border border-[#EA1A85]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#EA1A85] block">Retained by RR</span>
                  <span className="text-[10px] text-slate-400">Dhruv Jurel, Ravindra Jadeja, Sandeep Sharma</span>
                </div>
                <span className="text-base font-black text-[#EA1A85] font-mono">3</span>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-300 block">Released & potentially auction-eligible</span>
                  <span className="text-[10px] text-slate-400">Hetmyer (Released by RR), Ashutosh, Arshdeep, Stoinis, etc.</span>
                </div>
                <span className="text-base font-black text-purple-300 font-mono">21</span>
              </div>

              <div className="p-2.5 rounded-xl bg-yellow-950/20 border border-yellow-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-yellow-300 block">Pending auction registration verification</span>
                  <span className="text-[10px] text-slate-400">Maheesh Theekshana (Unconfirmed overseas register)</span>
                </div>
                <span className="text-base font-black text-yellow-400 font-mono">1</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Auction eligibility unverified</span>
                  <span className="text-[10px] text-slate-400">Dinesh Karthik (Retired), Jason Holder (Unconfirmed)</span>
                </div>
                <span className="text-base font-black text-slate-400 font-mono">2</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E2D4A] text-center">
            <span className="text-[11px] text-slate-400">
              Only <strong className="text-white">1 of 10 Original targets</strong> is unconfirmed. Real-world focus is on the <strong className="text-purple-400">21 released alternatives</strong>.
            </span>
          </div>
        </div>

      </div>

      {/* Section E: Highest-Performing Pressure Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Highest Pressure Strike Rate Candidates */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              <h3 className="font-bold text-white text-sm">Pressure Strike Rate Extremes (Batting)</h3>
            </div>
            <span className="text-[11px] text-slate-400">Min. 30 Pressure Balls</span>
          </div>

          <div className="space-y-2.5">
            {topPressureBatters.map((player) => (
              <div 
                key={player.candidate_id}
                onClick={() => onSelectPlayer(player)}
                className="p-3 rounded-xl bg-[#121B2F] hover:bg-[#18243D] border border-[#1E2D4A] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{player.player_name}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      player.acquisition.status_2027 === 'Retained by RR' ? 'bg-[#EA1A85]/20 text-[#EA1A85]' :
                      player.acquisition.status_2027 === 'Released and potentially auction-eligible' ? 'bg-purple-500/20 text-purple-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {player.acquisition.status_2027}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Runs: {player.batting.pressure_runs} • Balls: {player.batting.pressure_balls} • Avg: {player.batting.pressure_average?.toFixed(1) ?? 'N/A'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-emerald-400 font-mono block">
                    {player.batting.pressure_sr?.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-400">Strike Rate</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Pressure Economy Bowlers */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2D4A]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-400" />
              <h3 className="font-bold text-white text-sm">Pressure Economy Leaders (Bowling)</h3>
            </div>
            <span className="text-[11px] text-slate-400">Min. 50 Pressure Balls (Lower is Better)</span>
          </div>

          <div className="space-y-2.5">
            {topPressureBowlers.map((player) => (
              <div 
                key={player.candidate_id}
                onClick={() => onSelectPlayer(player)}
                className="p-3 rounded-xl bg-[#121B2F] hover:bg-[#18243D] border border-[#1E2D4A] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{player.player_name}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      player.acquisition.status_2027 === 'Retained by RR' ? 'bg-[#EA1A85]/20 text-[#EA1A85]' :
                      player.acquisition.status_2027 === 'Released and potentially auction-eligible' ? 'bg-purple-500/20 text-purple-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {player.acquisition.status_2027}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Wickets: {player.bowling.pressure_wickets} • Balls: {player.bowling.pressure_balls} • Dot %: {player.bowling.pressure_dot_percentage?.toFixed(1)}%
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-blue-400 font-mono block">
                    {player.bowling.pressure_economy?.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400">Economy RPO</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

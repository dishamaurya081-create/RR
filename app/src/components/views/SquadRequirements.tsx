import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Plane,
  Coins
} from 'lucide-react';
import { 
  OFFICIAL_RR_2027_SQUAD 
} from '../../data/intelligenceData';
import type { SquadPlayer } from '../../data/intelligenceData';

export const SquadRequirements: React.FC = () => {
  // Live editable squad state initialized with the official 19-player squad
  const [squad, setSquad] = useState<SquadPlayer[]>(OFFICIAL_RR_2027_SQUAD);
  
  // Analytical recommended planning targets (Explicitly labeled as analytical recommendations)
  const targets: Record<string, number> = {
    'WK': 2,
    'Top-order': 3,
    'Middle-order': 4,
    'Finisher': 3,
    'All-rounder': 4,
    'Pace': 8,
    'Spin': 4,
  };

  // New player input state for simulator
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState<SquadPlayer['role']>('Batter');
  const [newPlayerSubRole, setNewPlayerSubRole] = useState<SquadPlayer['subRole']>('Finisher');
  const [newPlayerOverseas, setNewPlayerOverseas] = useState(false);
  const [newPlayerStatus, setNewPlayerStatus] = useState<SquadPlayer['status']>('Acquired');
  const [roleFilter, setRoleFilter] = useState('All');

  // Compute live counts from current editable squad
  const currentCounts = {
    'WK': squad.filter(p => p.subRole === 'Wicketkeeper' || p.role === 'Wicketkeeper-batter').length,
    'Top-order': squad.filter(p => p.subRole === 'Top-order').length,
    'Middle-order': squad.filter(p => p.subRole === 'Middle-order').length,
    'Finisher': squad.filter(p => p.subRole === 'Finisher').length,
    'All-rounder': squad.filter(p => p.role === 'All-rounder' || p.subRole.includes('All-rounder')).length,
    'Pace': squad.filter(p => p.subRole === 'Fast bowler' || p.subRole === 'Pace All-rounder').length,
    'Spin': squad.filter(p => p.subRole === 'Spin bowler' || p.subRole === 'Spin All-rounder').length,
  };

  const overseasCount = squad.filter(p => p.isOverseas).length;
  const availableSquadPositions = Math.max(0, 25 - squad.length);
  const availableOverseasPositions = Math.max(0, 8 - overseasCount);
  const retainedCount = squad.filter(p => p.status === 'Retained').length;
  const tradedCount = squad.filter(p => p.status === 'Traded in').length;

  // Add new player to simulator
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    const newP: SquadPlayer = {
      id: `sim_${Date.now()}`,
      name: newPlayerName.trim(),
      role: newPlayerRole,
      subRole: newPlayerSubRole,
      status: newPlayerStatus,
      isOverseas: newPlayerOverseas
    };

    setSquad([newP, ...squad]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id: string) => {
    setSquad(squad.filter(p => p.id !== id));
  };

  const handleResetSquad = () => {
    setSquad(OFFICIAL_RR_2027_SQUAD);
  };

  // Dynamic gap analysis comparing live squad to analytical planning targets
  const gapAnalysis = Object.keys(targets).map(roleKey => {
    const target = targets[roleKey] || 0;
    const current = currentCounts[roleKey as keyof typeof currentCounts] || 0;
    const gap = Math.max(0, target - current);
    const surplus = Math.max(0, current - target);

    let status = 'Secured / Balanced';
    let statusColor = 'text-emerald-400 bg-emerald-950/30 border-emerald-500/30';
    if (gap > 0) {
      status = `Vacancy (-${gap})`;
      statusColor = 'text-amber-400 bg-amber-950/30 border-amber-500/30';
    } else if (surplus > 1) {
      status = `Surplus (+${surplus})`;
      statusColor = 'text-blue-400 bg-blue-950/30 border-blue-500/30';
    }

    return {
      role: roleKey,
      planning_target: target,
      current_count: current,
      gap,
      status,
      statusColor
    };
  });

  const filteredSquad = squad.filter(p => {
    if (roleFilter === 'All') return true;
    if (roleFilter === 'Overseas') return p.isOverseas;
    if (roleFilter === 'Retained') return p.status === 'Retained';
    if (roleFilter === 'Traded in') return p.status === 'Traded in';
    if (roleFilter === 'Acquired') return p.status === 'Acquired' || p.status === 'Provisional';
    return p.role === roleFilter;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Official 2027 Retentions Verification Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#121B2E] via-[#10172A] to-[#181126] border border-[#EA1A85]/40 text-xs shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EA1A85]/20 text-[#EA1A85] border border-[#EA1A85]/40 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Official IPL 2027 Announcement
              </span>
              <span className="text-slate-400 text-[11px] font-mono">Verified: iplt20.com</span>
            </div>
            <h3 className="font-extrabold text-white text-base">
              Rajasthan Royals Official 19-Player Core Roster & ₹27.05 Cr Purse
            </h3>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Rajasthan Royals enters the 2027 auction cycle with <strong>19 secured players (17 Retained, 2 Traded in)</strong>, leaving exactly <strong className="text-amber-300">6 available squad positions</strong> (out of 25 maximum), <strong className="text-blue-300">3 available overseas positions</strong> (out of 8 maximum), and <strong className="text-emerald-400 font-mono">₹27.05 crore remaining purse</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetSquad}
              className="px-4 py-2 rounded-xl bg-[#1E2D4A] hover:bg-[#283C62] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Reset Roster</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Purse & Squad Capacity KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Remaining Purse */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Remaining Purse</span>
            <Coins size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">₹27.05 Cr</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Avg ₹4.51 Cr / open slot</span>
        </div>

        {/* Current Squad Size */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Squad</span>
            <Users size={14} className="text-slate-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">{squad.length} / 25</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">{retainedCount} Retained • {tradedCount} Traded</span>
        </div>

        {/* Available Squad Positions */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-transparent">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Available Positions</span>
          <div className="text-2xl font-black text-amber-300 font-mono mt-1">{availableSquadPositions} Slots</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">To reach 25-player maximum</span>
        </div>

        {/* Available Overseas Positions */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-blue-500/40 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Overseas Open</span>
            <Plane size={14} className="text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-300 font-mono mt-1">{availableOverseasPositions} Slots</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">{overseasCount} Retained / 8 Allowed</span>
        </div>

        {/* Wicketkeepers Secured */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-purple-500/30">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Wicketkeepers</span>
          <div className="text-2xl font-black text-purple-300 font-mono mt-1">{currentCounts.WK} Keepers</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Jurel (Ind) & Pretorius (OS)</span>
        </div>

        {/* Pace Battery */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#EA1A85]/30">
          <span className="text-[10px] font-bold text-[#EA1A85] uppercase tracking-wider block">Pace Battery</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{currentCounts.Pace} Seamers</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Archer, Shami, Sandeep, Burger</span>
        </div>
      </div>

      {/* Dynamic Gap Analysis Table & Squad Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Gap Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2D4A]">
            <div>
              <h3 className="font-bold text-white text-base">Role Coverage & Analytical Gap Matrix</h3>
              <p className="text-[11px] text-slate-400">Comparing active live roster against analytical recommended targets</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              Live Simulator
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1E2D4A] text-slate-400 uppercase font-semibold text-[10px]">
                  <th className="py-2.5 px-3">Role Group</th>
                  <th className="py-2.5 px-3 text-center">Analytical Target</th>
                  <th className="py-2.5 px-3 text-center">Active Roster Count</th>
                  <th className="py-2.5 px-3 text-center">Net Gap / Status</th>
                  <th className="py-2.5 px-3 text-right">Strategic Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17233B]">
                {gapAnalysis.map((row) => (
                  <tr key={row.role} className="hover:bg-[#131D31] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#EA1A85]" />
                      <span>{row.role}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-300">
                      {row.planning_target}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-white">
                      {row.current_count}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold">
                      {row.gap > 0 ? (
                        <span className="text-amber-400">-{row.gap} Vacancy</span>
                      ) : (
                        <span className="text-emerald-400">Covered</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>* Planning targets are analytical recommendations, not official franchise requirements.</span>
            <span className="text-slate-300 font-mono">Purse: ₹27.05 Cr Available</span>
          </div>
        </div>

        {/* Existing Squad Strengths, Weaknesses & Tactical Breakdown */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-white text-base mb-1">Squad Strengths & Tactical Gaps</h3>
            <p className="text-[11px] text-slate-400 mb-4">Official 19-player roster analytical audit</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Key Strength: Fast Bowling Depth
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Jofra Archer (OS), Mohammed Shami (Traded in), Sandeep Sharma, and Nandre Burger (OS) give RR one of the most feared pace attacks in T20 cricket. Backed by Sushant Mishra, Brijesh Sharma, and Yash Raj Punja.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Key Strength: Spin & Keeping Foundation
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Ravi Bishnoi, Ravindra Jadeja, and M Siddharth lock down middle-overs spin control. Dhruv Jurel and Lhuan-dre Pretorius secure the wicketkeeping department.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/40">
                <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-amber-400" />
                  Critical Gap: Marquee Death Finisher
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  With <strong>Shimron Hetmyer released</strong> and top alternatives like Rinku Singh (KKR), Tristan Stubbs (DC), and David Miller (DC) retained by rivals, RR must target <strong>Ashutosh Sharma</strong> or look to re-acquire Hetmyer at auction with a portion of the ₹27.05 Cr purse.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141F38] border border-[#233558] text-[11px] text-slate-300">
            <strong>Overseas Balance:</strong> 5 overseas spots locked (Shanaka, Ferreira, Archer, Pretorius, Burger). Exactly <strong>3 overseas positions available</strong> for the auction.
          </div>
        </div>

      </div>

      {/* Interactive Roster Simulator Section */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2D4A]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Official 19-Player Roster & Live Simulator</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EA1A85]/20 text-[#EA1A85]">
                {squad.length} Players in Roster
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Distinguishes Retained, Traded in, and Acquired signings. Add candidates below to simulate 25-man roster scenarios.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Retained', 'Traded in', 'Acquired', 'Batter', 'Wicketkeeper-batter', 'All-rounder', 'Bowler', 'Overseas'].map((rf) => (
              <button
                key={rf}
                onClick={() => setRoleFilter(rf)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  roleFilter === rf
                    ? 'bg-[#EA1A85] text-white'
                    : 'bg-[#142036] text-slate-400 hover:text-slate-200'
                }`}
              >
                {rf}
              </button>
            ))}
          </div>
        </div>

        {/* Add Player Form */}
        <form onSubmit={handleAddPlayer} className="p-4 rounded-xl bg-[#121B2F] border border-[#1E2D4A] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end text-xs">
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">Player Name</label>
            <input
              type="text"
              placeholder="e.g. Ashutosh Sharma"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A101D] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">Discipline</label>
            <select
              value={newPlayerRole}
              onChange={(e) => setNewPlayerRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A101D] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="Batter">Batter</option>
              <option value="Wicketkeeper-batter">Wicketkeeper-batter</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Bowler">Bowler</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">Specialization</label>
            <select
              value={newPlayerSubRole}
              onChange={(e) => setNewPlayerSubRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A101D] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="Top-order">Top-order</option>
              <option value="Middle-order">Middle-order</option>
              <option value="Finisher">Finisher</option>
              <option value="Wicketkeeper">Wicketkeeper</option>
              <option value="Pace All-rounder">Pace All-rounder</option>
              <option value="Spin All-rounder">Spin All-rounder</option>
              <option value="Fast bowler">Fast bowler</option>
              <option value="Spin bowler">Spin bowler</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">Acquisition Status</label>
            <select
              value={newPlayerStatus}
              onChange={(e) => setNewPlayerStatus(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A101D] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="Acquired">Acquired (Auction Target)</option>
              <option value="Retained">Retained</option>
              <option value="Traded in">Traded in</option>
              <option value="Provisional">Provisional</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              id="overseasCheckbox"
              checked={newPlayerOverseas}
              onChange={(e) => setNewPlayerOverseas(e.target.checked)}
              className="w-4 h-4 rounded text-[#EA1A85] bg-[#0A101D] border-[#1E2D4A]"
            />
            <label htmlFor="overseasCheckbox" className="text-slate-300 font-medium cursor-pointer">
              Overseas Player
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-[#EA1A85] hover:bg-[#D81177] text-white font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus size={15} />
            <span>Add to Roster</span>
          </button>
        </form>

        {/* Official Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSquad.map((player) => (
            <div
              key={player.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                player.status === 'Traded in' 
                  ? 'bg-[#121A30] border-blue-500/40 hover:border-blue-400' 
                  : player.status === 'Retained' 
                  ? 'bg-[#101726] border-[#1A2844] hover:border-[#24375D]' 
                  : 'bg-[#1A1428] border-purple-500/40 hover:border-purple-400'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">{player.name}</span>
                  {player.isOverseas && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                      ✈ Overseas
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-300">{player.subRole}</span> • {player.role}
                </div>
                <span className={`text-[10px] font-mono font-bold ${
                  player.status === 'Retained' ? 'text-emerald-400' :
                  player.status === 'Traded in' ? 'text-blue-400' : 'text-purple-400'
                }`}>
                  {player.status === 'Traded in' ? 'Trade In (Pre-Auction)' : player.status}
                </span>
              </div>

              <button
                onClick={() => handleRemovePlayer(player.id)}
                className="w-7 h-7 rounded-lg bg-red-950/20 hover:bg-red-950/50 text-red-400 flex items-center justify-center transition-colors"
                title="Remove player from roster"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

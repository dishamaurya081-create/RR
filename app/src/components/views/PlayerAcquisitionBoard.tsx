import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  Crosshair,
  Target,
  Sparkles,
  Plane,
  Eye
} from 'lucide-react';
import { CANDIDATES } from '../../data/intelligenceData';
import type { Candidate } from '../../data/intelligenceData';

interface PlayerAcquisitionBoardProps {
  onSelectPlayer: (player: Candidate) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const PlayerAcquisitionBoard: React.FC<PlayerAcquisitionBoardProps> = ({ 
  onSelectPlayer,
  searchQuery,
  setSearchQuery
}) => {
  const [roleFilter, setRoleFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sampleFilter, setSampleFilter] = useState('All');
  const [overseasOnly, setOverseasOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'balanced_score' | 'selection_rank' | 'pressure_impact' | 'reliability_score'>('balanced_score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort candidates
  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter((c) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.player_name.toLowerCase().includes(q);
        const matchesRole = c.verified_role.toLowerCase().includes(q);
        const matchesFranchise = c.acquisition.franchise_2027.toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesFranchise) return false;
      }

      // Role filter
      if (roleFilter !== 'All') {
        if (roleFilter === 'Batter') {
          if (c.player_type !== 'Batter') return false;
        } else if (roleFilter === 'Bowler') {
          if (c.player_type !== 'Bowler') return false;
        } else if (roleFilter === 'All-rounder') {
          if (!c.verified_role.toLowerCase().includes('all-rounder')) return false;
        } else if (roleFilter === 'Wicketkeeper') {
          if (!c.verified_role.toLowerCase().includes('wicketkeeper') && !c.priority_role.toLowerCase().includes('wk')) return false;
        }
      }

      // Source filter
      if (sourceFilter !== 'All') {
        if (c.candidate_source !== sourceFilter) return false;
      }

      // Official 2027 Status filter
      if (statusFilter !== 'All') {
        if (c.acquisition.status_2027 !== statusFilter) return false;
      }

      // Sample filter
      if (sampleFilter !== 'All') {
        if (c.reliability.sample_validation !== sampleFilter) return false;
      }

      // Overseas only
      if (overseasOnly && !c.is_overseas) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'balanced_score') {
        comparison = b.balanced_score - a.balanced_score;
      } else if (sortBy === 'selection_rank') {
        const rankA = a.selection_rank ?? 999;
        const rankB = b.selection_rank ?? 999;
        comparison = rankA - rankB;
      } else if (sortBy === 'reliability_score') {
        const scoreA = a.reliability.reliability_score ?? -1;
        const scoreB = b.reliability.reliability_score ?? -1;
        comparison = scoreB - scoreA;
      } else if (sortBy === 'pressure_impact') {
        const impactA = a.player_type === 'Batter' ? (a.batting.pressure_sr ?? 0) : -(a.bowling.pressure_economy ?? 99);
        const impactB = b.player_type === 'Batter' ? (b.batting.pressure_sr ?? 0) : -(b.bowling.pressure_economy ?? 99);
        comparison = impactB - impactA;
      }
      return sortDirection === 'desc' ? comparison : -comparison;
    });
  }, [searchQuery, roleFilter, sourceFilter, statusFilter, sampleFilter, overseasOnly, sortBy, sortDirection]);

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Retained by RR') {
      return 'bg-[#EA1A85]/20 text-[#EA1A85] border border-[#EA1A85]/40';
    }
    if (status === 'Retained by another franchise') {
      return 'bg-red-950/30 text-red-300 border border-red-500/30';
    }
    if (status === 'Released and potentially auction-eligible') {
      return 'bg-purple-950/30 text-purple-300 border border-purple-500/30';
    }
    if (status === 'Pending auction registration verification') {
      return 'bg-yellow-950/30 text-yellow-300 border border-yellow-500/30';
    }
    return 'bg-slate-900 text-slate-400 border border-slate-700';
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Board Header & Controls */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Player Acquisition Candidate Master Board
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              50 player-role candidates evaluated under high-pressure scenarios for IPL 2027
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Displaying <strong className="text-white">{filteredCandidates.length}</strong> of 50 records
            </span>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-[#1C2A44] text-xs">
          
          {/* Role Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Role Category
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="All">All Roles (50)</option>
              <option value="Batter">Batters (26)</option>
              <option value="Bowler">Bowlers (24)</option>
              <option value="All-rounder">All-rounders</option>
              <option value="Wicketkeeper">Wicketkeepers</option>
            </select>
          </div>

          {/* Candidate Source Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Candidate Pool
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="All">All Sources (50)</option>
              <option value="Original Top 10">Original Top 10 (10)</option>
              <option value="Alternative Pool">Alternative Pool (40)</option>
            </select>
          </div>

          {/* Official 2027 Acquisition Status Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Official 2027 Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="All">All Official Statuses (50)</option>
              <option value="Retained by RR">Retained by RR (3)</option>
              <option value="Retained by another franchise">Retained by another franchise (23)</option>
              <option value="Released and potentially auction-eligible">Released and potentially auction-eligible (21)</option>
              <option value="Pending auction registration verification">Pending auction registration verification (1)</option>
              <option value="Auction eligibility unverified">Auction eligibility unverified (2)</option>
            </select>
          </div>

          {/* Sample Validation Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Sample Validation
            </label>
            <select
              value={sampleFilter}
              onChange={(e) => setSampleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-white focus:outline-none focus:border-[#EA1A85]"
            >
              <option value="All">All Sample Levels</option>
              <option value="Adequate consistency sample">Adequate Consistency Sample</option>
              <option value="Limited consistency sample">Limited Consistency Sample</option>
              <option value="Needs sample validation">Needs Sample Validation</option>
            </select>
          </div>

          {/* Overseas & Clear Filters */}
          <div className="flex items-center gap-3 pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium select-none">
              <input
                type="checkbox"
                checked={overseasOnly}
                onChange={(e) => setOverseasOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#EA1A85] bg-[#121B2F] border-[#1E2D4A]"
              />
              <span>✈ Overseas Only</span>
            </label>
          </div>

        </div>
      </div>

      {/* Candidate Master Table */}
      <div className="rounded-2xl bg-[#0E1626] border border-[#1E2D4A] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#090E1A] border-b border-[#1E2D4A] text-slate-400 uppercase font-bold text-[10px] tracking-wider select-none">
                <th 
                  onClick={() => toggleSort('selection_rank')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Rank</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th className="py-3 px-4">Player & Identity</th>
                <th className="py-3 px-3">Role Profile</th>
                <th className="py-3 px-3">Candidate Source</th>
                <th 
                  onClick={() => toggleSort('balanced_score')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Balanced Score</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('pressure_impact')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Pressure Metric</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('reliability_score')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Reliability</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th className="py-3 px-3">Sample Validation</th>
                <th className="py-3 px-4">Official 2027 Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#17233B]">
              {filteredCandidates.map((player, idx) => {
                const isBatter = player.player_type === 'Batter';
                return (
                  <tr 
                    key={player.candidate_id}
                    className="hover:bg-[#131D31] transition-colors group cursor-pointer"
                    onClick={() => onSelectPlayer(player)}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-400 text-xs">
                      #{player.balanced_rank ?? (idx + 1)}
                    </td>

                    {/* Player & Identity */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs group-hover:text-[#EA1A85] transition-colors">
                          {player.player_name}
                        </span>
                        {player.is_overseas && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                            ✈
                          </span>
                        )}
                        {player.role_warning && (
                          <span 
                            title={player.role_warning}
                            className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold"
                          >
                            Role Alert
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        ID: {player.player_id || 'N/A'} • {player.player_type} Dataset
                      </span>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-3">
                      <span className="text-slate-200 font-medium block">
                        {player.verified_role}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Target: {player.priority_role}
                      </span>
                    </td>

                    {/* Candidate Source */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        player.candidate_source === 'Original Top 10'
                          ? 'bg-[#EA1A85]/20 text-[#EA1A85] border border-[#EA1A85]/30'
                          : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      }`}>
                        {player.candidate_source}
                      </span>
                    </td>

                    {/* Balanced Score */}
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-black text-white font-mono block">
                        {player.balanced_score.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Rank #{player.overall_candidate_rank ?? player.balanced_rank ?? '-'}
                      </span>
                    </td>

                    {/* Pressure Metric */}
                    <td className="py-3 px-4 text-right font-mono">
                      {isBatter ? (
                        <div>
                          <span className="font-bold text-emerald-400 text-xs">
                            {player.batting.pressure_sr?.toFixed(1) ?? 'N/A'} SR
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Avg: {player.batting.pressure_average?.toFixed(1) ?? 'N/A'}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-blue-400 text-xs">
                            {player.bowling.pressure_economy?.toFixed(2) ?? 'N/A'} Econ
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Wkts: {player.bowling.pressure_wickets ?? 'N/A'}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Reliability Score */}
                    <td className="py-3 px-4 text-right font-mono">
                      {player.reliability.reliability_score !== null ? (
                        <span className="font-bold text-emerald-400 text-xs">
                          {player.reliability.reliability_score.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-400 font-sans font-semibold">
                          Pending / N/A
                        </span>
                      )}
                    </td>

                    {/* Sample Validation */}
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                        player.reliability.sample_validation === 'Adequate consistency sample'
                          ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30'
                          : player.reliability.sample_validation === 'Limited consistency sample'
                          ? 'bg-blue-950/30 text-blue-300 border-blue-500/30'
                          : 'bg-amber-950/30 text-amber-300 border-amber-500/30'
                      }`}>
                        {player.reliability.sample_validation}
                      </span>
                    </td>

                    {/* Official 2027 Status */}
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded block w-fit ${getStatusBadge(player.acquisition.status_2027)}`}>
                        {player.acquisition.status_2027}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {player.acquisition.franchise_2027}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlayer(player);
                        }}
                        className="p-1.5 rounded-lg bg-[#18243D] hover:bg-[#EA1A85] text-slate-300 hover:text-white transition-colors"
                        title="View complete dossier"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="p-12 text-center space-y-2">
            <p className="text-slate-400 font-semibold text-sm">No candidates match your active filters.</p>
            <button
              onClick={() => {
                setRoleFilter('All');
                setSourceFilter('All');
                setStatusFilter('All');
                setSampleFilter('All');
                setOverseasOnly(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#EA1A85] text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

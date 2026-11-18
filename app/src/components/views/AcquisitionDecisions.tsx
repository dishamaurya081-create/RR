import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Edit3, 
  Save, 
  Eye
} from 'lucide-react';
import { CANDIDATES } from '../../data/intelligenceData';
import type { Candidate } from '../../data/intelligenceData';

interface AcquisitionDecisionsProps {
  onSelectPlayer: (player: Candidate) => void;
}

export type DecisionCategory = 
  | 'Priority Target (Auction)'
  | 'Strong Alternative (Auction)'
  | 'Backup Option (Auction)'
  | 'Further Evaluation'
  | 'Retained by RR'
  | 'Retained by another franchise'
  | 'Pending auction registration verification'
  | 'Auction eligibility unverified';

export const AcquisitionDecisions: React.FC<AcquisitionDecisionsProps> = ({ onSelectPlayer }) => {
  // Initialize state based on official 2027 status
  const [decisions, setDecisions] = useState<Record<string, { category: DecisionCategory; notes: string }>>(() => {
    const map: Record<string, { category: DecisionCategory; notes: string }> = {};
    CANDIDATES.forEach(c => {
      let defaultCat: DecisionCategory = 'Strong Alternative (Auction)';
      
      if (c.acquisition.status_2027 === 'Retained by RR') {
        defaultCat = 'Retained by RR';
      } else if (c.acquisition.status_2027 === 'Retained by another franchise') {
        defaultCat = 'Retained by another franchise';
      } else if (c.acquisition.status_2027 === 'Pending auction registration verification') {
        defaultCat = 'Pending auction registration verification';
      } else if (c.acquisition.status_2027 === 'Auction eligibility unverified') {
        defaultCat = 'Auction eligibility unverified';
      } else if (c.acquisition.status_2027 === 'Released and potentially auction-eligible') {
        if (c.balanced_score > 58 || c.player_name === 'Ashutosh Sharma' || c.player_name === 'Shimron Hetmyer' || c.player_name === 'Arshdeep Singh') {
          defaultCat = 'Priority Target (Auction)';
        } else if (c.balanced_score < 40) {
          defaultCat = 'Further Evaluation';
        } else {
          defaultCat = 'Strong Alternative (Auction)';
        }
      }

      map[c.candidate_id] = {
        category: defaultCat,
        notes: c.qualitative.validation_required || ''
      };
    });
    return map;
  });

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const categoryBadges: Record<DecisionCategory, { color: string; border: string }> = {
    'Priority Target (Auction)': { color: 'text-emerald-400 bg-emerald-950/40', border: 'border-emerald-500/40' },
    'Strong Alternative (Auction)': { color: 'text-blue-400 bg-blue-950/40', border: 'border-blue-500/40' },
    'Backup Option (Auction)': { color: 'text-purple-400 bg-purple-950/40', border: 'border-purple-500/40' },
    'Further Evaluation': { color: 'text-amber-400 bg-amber-950/40', border: 'border-amber-500/40' },
    'Retained by RR': { color: 'text-[#EA1A85] bg-[#EA1A85]/20', border: 'border-[#EA1A85]/40' },
    'Retained by another franchise': { color: 'text-red-400 bg-red-950/40', border: 'border-red-500/40' },
    'Pending auction registration verification': { color: 'text-yellow-400 bg-yellow-950/40', border: 'border-yellow-500/40' },
    'Auction eligibility unverified': { color: 'text-slate-400 bg-slate-900', border: 'border-slate-700' },
  };

  const categoriesList: DecisionCategory[] = [
    'Priority Target (Auction)',
    'Strong Alternative (Auction)',
    'Backup Option (Auction)',
    'Further Evaluation',
    'Retained by RR',
    'Retained by another franchise',
    'Pending auction registration verification',
    'Auction eligibility unverified'
  ];

  const handleCategoryChange = (candidateId: string, newCategory: DecisionCategory) => {
    setDecisions(prev => ({
      ...prev,
      [candidateId]: {
        ...prev[candidateId],
        category: newCategory
      }
    }));
  };

  const handleSaveNotes = (candidateId: string) => {
    setDecisions(prev => ({
      ...prev,
      [candidateId]: {
        ...prev[candidateId],
        notes: editNotes
      }
    }));
    setEditingId(null);
  };

  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter(c => {
      const dec = decisions[c.candidate_id];
      if (categoryFilter !== 'All' && dec.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!c.player_name.toLowerCase().includes(q) && !c.verified_role.toLowerCase().includes(q) && !c.acquisition.franchise_2027.toLowerCase().includes(q)) return false;
      }
      return true;
    }).sort((a, b) => b.balanced_score - a.balanced_score);
  }, [decisions, categoryFilter, searchQuery]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
              Target Feasibility & Decisions
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            IPL 2027 Acquisition Decisions & Strategy Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Classifies all 50 candidates into actionable scouting tiers with customizable scout notes and feasibility audits
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              categoryFilter === 'All' ? 'bg-[#EA1A85] text-white' : 'bg-[#142036] text-slate-400 hover:text-slate-200'
            }`}
          >
            All Tiers (50)
          </button>
          <button
            onClick={() => setCategoryFilter('Priority Target (Auction)')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              categoryFilter === 'Priority Target (Auction)' ? 'bg-emerald-600 text-white' : 'bg-[#142036] text-slate-400 hover:text-slate-200'
            }`}
          >
            Priority Target (Auction)
          </button>
          <button
            onClick={() => setCategoryFilter('Retained by RR')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              categoryFilter === 'Retained by RR' ? 'bg-[#EA1A85] text-white' : 'bg-[#142036] text-slate-400 hover:text-slate-200'
            }`}
          >
            Retained by RR (3)
          </button>
          <button
            onClick={() => setCategoryFilter('Retained by another franchise')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              categoryFilter === 'Retained by another franchise' ? 'bg-red-600 text-white' : 'bg-[#142036] text-slate-400 hover:text-slate-200'
            }`}
          >
            Retained by Rival (23)
          </button>
        </div>
      </div>

      {/* Analytical Reality Callout */}
      <div className="p-4 rounded-xl bg-[#141A29] border border-blue-500/30 text-xs text-slate-300 flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-300">Decision Tier Governance:</span>{' '}
          These decision tiers represent <strong>analytical recommendations based on statistical modeling and official retention announcements</strong>, not confirmed internal franchise decisions. You may dynamically reclassify candidates and append internal scouting observations below.
        </div>
      </div>

      {/* Decisions Master Table */}
      <div className="rounded-2xl bg-[#0E1626] border border-[#1E2D4A] overflow-hidden shadow-xl">
        <div className="p-4 bg-[#090E1A] border-b border-[#1E2D4A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-white text-sm">Target Evaluation Board</h3>
            <span className="text-xs font-mono text-slate-400">{filteredCandidates.length} Candidates Listed</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EA1A85] w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0D1424] border-b border-[#1E2D4A] text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Candidate Source</th>
                <th className="py-3 px-3 text-right">Balanced Score</th>
                <th className="py-3 px-3">2027 Franchise</th>
                <th className="py-3 px-3">Official 2027 Status</th>
                <th className="py-3 px-4">Strategic Decision Tier</th>
                <th className="py-3 px-4">Scout Notes & Verification</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#17233B]">
              {filteredCandidates.map((player) => {
                const dec = decisions[player.candidate_id];
                const badgeStyle = categoryBadges[dec.category] || categoryBadges['Strong Alternative (Auction)'];
                const isEditing = editingId === player.candidate_id;

                return (
                  <tr 
                    key={player.candidate_id}
                    className="hover:bg-[#131D31] transition-colors group"
                  >
                    {/* Player */}
                    <td className="py-3 px-4 font-bold text-white group-hover:text-[#EA1A85] transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span onClick={() => onSelectPlayer(player)} className="cursor-pointer">{player.player_name}</span>
                        {player.is_overseas && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">✈</span>
                        )}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-3 text-slate-300">
                      {player.verified_role}
                    </td>

                    {/* Source */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        player.candidate_source === 'Original Top 10' ? 'bg-[#EA1A85]/20 text-[#EA1A85]' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {player.candidate_source}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-white">
                      {player.balanced_score.toFixed(2)}
                    </td>

                    {/* Franchise */}
                    <td className="py-3 px-3 font-semibold text-slate-300">
                      {player.acquisition.franchise_2027}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span className={`text-xs font-semibold ${
                        player.acquisition.status_2027 === 'Retained by RR' ? 'text-[#EA1A85]' :
                        player.acquisition.status_2027 === 'Retained by another franchise' ? 'text-red-400' :
                        player.acquisition.status_2027 === 'Released and potentially auction-eligible' ? 'text-purple-300' : 'text-yellow-400'
                      }`}>
                        {player.acquisition.status_2027}
                      </span>
                    </td>

                    {/* Strategic Decision Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={dec.category}
                        onChange={(e) => handleCategoryChange(player.candidate_id, e.target.value as DecisionCategory)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${badgeStyle.color} ${badgeStyle.border} bg-[#0A101D] focus:outline-none`}
                      >
                        {categoriesList.map(cat => (
                          <option key={cat} value={cat} className="bg-[#0A101D] text-white">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Notes / Validation */}
                    <td className="py-3 px-4 text-slate-400">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="px-2 py-1 rounded bg-[#0A101D] border border-[#1E2D4A] text-white text-xs w-48"
                          />
                          <button
                            onClick={() => handleSaveNotes(player.candidate_id)}
                            className="p-1 rounded bg-emerald-600 text-white"
                          >
                            <Save size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate max-w-xs text-[11px]">{dec.notes || 'No notes added'}</span>
                          <button
                            onClick={() => {
                              setEditingId(player.candidate_id);
                              setEditNotes(dec.notes);
                            }}
                            className="text-slate-500 hover:text-slate-300 p-1"
                          >
                            <Edit3 size={12} />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onSelectPlayer(player)}
                        className="p-1.5 rounded-lg bg-[#18243D] hover:bg-[#EA1A85] text-slate-300 hover:text-white transition-colors"
                        title="View complete candidate dossier"
                      >
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

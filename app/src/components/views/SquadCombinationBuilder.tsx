import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Save, 
  RefreshCw,
  Sparkles,
  Plane
} from 'lucide-react';
import { CANDIDATES, OFFICIAL_RR_2027_SQUAD } from '../../data/intelligenceData';

interface PositionSlot {
  order: number;
  positionName: string;
  recommendedRole: string;
  assignedPlayerName: string | null;
  assignedRole: string | null;
  isOverseas: boolean;
  source: string | null;
  balancedScore: number | null;
}

const DEFAULT_OFFICIAL_SLOTS: PositionSlot[] = [
  { order: 1, positionName: 'Opening Batter 1', recommendedRole: 'Top-order Batter', assignedPlayerName: 'Yashasvi Jaiswal', assignedRole: 'Top-order Batter', isOverseas: false, source: 'RR Retained', balancedScore: null },
  { order: 2, positionName: 'Opening Batter 2', recommendedRole: 'Top-order Batter', assignedPlayerName: 'Vaibhav Sooryavanshi', assignedRole: 'Top-order Batter', isOverseas: false, source: 'RR Retained', balancedScore: null },
  { order: 3, positionName: 'Anchor / #3', recommendedRole: 'Top/Middle Batter', assignedPlayerName: 'Riyan Parag', assignedRole: 'Middle-order / All-rounder', isOverseas: false, source: 'RR Retained', balancedScore: null },
  { order: 4, positionName: 'Middle Order 1', recommendedRole: 'Middle-order Batter', assignedPlayerName: 'Aman Rao Perala', assignedRole: 'Middle-order Batter', isOverseas: false, source: 'RR Retained', balancedScore: null },
  { order: 5, positionName: 'Wicketkeeper / #5', recommendedRole: 'WK-Batter', assignedPlayerName: 'Dhruv Jurel', assignedRole: 'Wicketkeeper-batter', isOverseas: false, source: 'RR Retained', balancedScore: 66.67 },
  { order: 6, positionName: 'Spin All-Rounder / #6', recommendedRole: 'All-Rounder (Spin)', assignedPlayerName: 'Ravindra Jadeja', assignedRole: 'Premier All-rounder (Spin)', isOverseas: false, source: 'RR Retained', balancedScore: 61.70 },
  { order: 7, positionName: 'Power Finisher #7', recommendedRole: 'Finisher / Power Hitter', assignedPlayerName: 'Donovan Ferreira', assignedRole: 'Finisher / All-rounder', isOverseas: true, source: 'RR Retained', balancedScore: null },
  { order: 8, positionName: 'Strike Fast Bowler #8', recommendedRole: 'Express Pace', assignedPlayerName: 'Jofra Archer', assignedRole: 'Fast bowler', isOverseas: true, source: 'RR Retained', balancedScore: null },
  { order: 9, positionName: 'Lead Spinner #9', recommendedRole: 'Spin Bowler', assignedPlayerName: 'Ravi Bishnoi', assignedRole: 'Spin bowler', isOverseas: false, source: 'RR Retained', balancedScore: null },
  { order: 10, positionName: 'Strike Seamer #10', recommendedRole: 'Fast Bowler', assignedPlayerName: 'Mohammed Shami', assignedRole: 'Fast bowler (Traded in)', isOverseas: false, source: 'RR Traded in', balancedScore: null },
  { order: 11, positionName: 'Death Specialist #11', recommendedRole: 'Fast Bowler', assignedPlayerName: 'Sandeep Sharma', assignedRole: 'Fast bowler (Death)', isOverseas: false, source: 'RR Retained', balancedScore: 31.85 },
  { order: 12, positionName: 'Tactical Impact Player', recommendedRole: 'Impact Specialist', assignedPlayerName: 'Shubham Dubey', assignedRole: 'Finisher', isOverseas: false, source: 'RR Retained', balancedScore: null },
];

export const SquadCombinationBuilder: React.FC = () => {
  const [slots, setSlots] = useState<PositionSlot[]>(DEFAULT_OFFICIAL_SLOTS);
  const [activeSlotOrder, setActiveSlotOrder] = useState<number | null>(null);
  const [savedCombinations, setSavedCombinations] = useState<{ id: string; name: string; slots: PositionSlot[] }[]>([
    { id: 'default_official_xi', name: 'RR 2027 Retained Core XI', slots: DEFAULT_OFFICIAL_SLOTS }
  ]);
  const [comboNameInput, setComboNameInput] = useState('');

  // Combined pool of available players (Official 19 RR squad + 50 Candidates)
  const selectablePlayers = useMemo(() => {
    const list: { name: string; role: string; source: string; isOverseas: boolean; score: number | null }[] = [];

    // Add RR Official 19 players
    OFFICIAL_RR_2027_SQUAD.forEach(p => {
      list.push({
        name: p.name,
        role: p.subRole || p.role,
        source: p.status === 'Traded in' ? 'RR Traded in' : 'RR Retained',
        isOverseas: p.isOverseas,
        score: null
      });
    });

    // Add 50 Candidates
    CANDIDATES.forEach(c => {
      if (!list.some(p => p.name === c.player_name)) {
        list.push({
          name: c.player_name,
          role: c.verified_role,
          source: c.candidate_source,
          isOverseas: c.is_overseas,
          score: c.balanced_score
        });
      }
    });

    return list;
  }, []);

  const playingXI = slots.slice(0, 11);

  const overseasInXI = playingXI.filter(s => s.isOverseas).length;
  const wkInXI = playingXI.filter(s => 
    s.assignedRole?.toLowerCase().includes('wk') || 
    s.assignedRole?.toLowerCase().includes('wicketkeeper') || 
    ['Dhruv Jurel', 'Lhuan-dre Pretorius', 'Heinrich Klaasen', 'Mahendra Singh Dhoni', 'Dinesh Karthik'].includes(s.assignedPlayerName || '')
  ).length;
  
  const paceOptions = playingXI.filter(s => 
    s.assignedRole?.toLowerCase().includes('fast') || 
    s.assignedRole?.toLowerCase().includes('pace') || 
    s.assignedRole?.toLowerCase().includes('seam') ||
    ['Jofra Archer', 'Mohammed Shami', 'Sandeep Sharma', 'Nandre Burger', 'Sushant Mishra', 'Brijesh Sharma', 'Yash Raj Punja', 'Josh Hazlewood', 'Shardul Thakur', 'Harshal Patel', 'Arshdeep Singh'].includes(s.assignedPlayerName || '')
  ).length;

  const spinOptions = playingXI.filter(s => 
    s.assignedRole?.toLowerCase().includes('spin') || 
    ['Ravi Bishnoi', 'Ravindra Jadeja', 'Manimaran Siddharth', 'Riyan Parag', 'Yuzvendra Chahal', 'Varun Chakravarthy', 'Maheesh Theekshana', 'Rashid Khan'].includes(s.assignedPlayerName || '')
  ).length;

  const finisherOptions = playingXI.filter(s => 
    s.assignedRole?.toLowerCase().includes('finisher') || 
    ['Donovan Ferreira', 'Ravindra Jadeja', 'Shubham Dubey', 'Ashutosh Sharma', 'Shimron Hetmyer', 'Rinku Singh', 'Tristan Stubbs', 'David Miller', 'Ramandeep Singh'].includes(s.assignedPlayerName || '')
  ).length;

  // Validation Warnings
  const warnings: string[] = [];
  if (wkInXI === 0) warnings.push('Critical: No designated wicketkeeper selected in Playing XI.');
  if (overseasInXI > 4) warnings.push(`Rule Violation: ${overseasInXI} Overseas players in Playing XI (Maximum 4 allowed).`);
  if (paceOptions < 3) warnings.push(`Pace Shortage: Only ${paceOptions} pace options (Recommended minimum: 3).`);
  if (spinOptions < 2) warnings.push(`Spin Shortage: Only ${spinOptions} spin options (Recommended minimum: 2).`);
  if (finisherOptions < 2) warnings.push(`Finishing Concern: Only ${finisherOptions} power finishers designated at death.`);

  const handleAssignPlayer = (order: number, player: typeof selectablePlayers[0]) => {
    setSlots(slots.map(s => {
      if (s.order === order) {
        return {
          ...s,
          assignedPlayerName: player.name,
          assignedRole: player.role,
          isOverseas: player.isOverseas,
          source: player.source,
          balancedScore: player.score
        };
      }
      return s;
    }));
    setActiveSlotOrder(null);
  };

  const handleClearSlot = (order: number) => {
    setSlots(slots.map(s => {
      if (s.order === order) {
        return {
          ...s,
          assignedPlayerName: null,
          assignedRole: null,
          isOverseas: false,
          source: null,
          balancedScore: null
        };
      }
      return s;
    }));
  };

  const handleSaveCombination = () => {
    const name = comboNameInput.trim() || `Combination ${savedCombinations.length + 1}`;
    const newCombo = {
      id: `combo_${Date.now()}`,
      name,
      slots: [...slots]
    };
    setSavedCombinations([...savedCombinations, newCombo]);
    setComboNameInput('');
  };

  const handleLoadCombination = (combo: typeof savedCombinations[0]) => {
    setSlots(combo.slots);
  };

  const handleResetCombination = () => {
    setSlots(DEFAULT_OFFICIAL_SLOTS);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#EA1A85]" />
            <span className="text-[11px] font-bold tracking-wider text-[#EA1A85] uppercase">
              Tactical Lineup Architect
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Rajasthan Royals Playing XI & Impact Player Combination Builder
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Construct and stress-test tactical lineups combining the 19 official retained core players with target acquisitions
          </p>
        </div>

        {/* Save & Reset Controls */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Name combination..."
            value={comboNameInput}
            onChange={(e) => setComboNameInput(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#121B2F] border border-[#1E2D4A] text-xs text-white focus:outline-none focus:border-[#EA1A85] w-44"
          />
          <button
            onClick={handleSaveCombination}
            className="px-3 py-1.5 rounded-lg bg-[#EA1A85] hover:bg-[#D81177] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Save size={13} />
            <span>Save XI</span>
          </button>
          <button
            onClick={handleResetCombination}
            className="p-1.5 rounded-lg bg-[#142036] hover:bg-[#1A2A47] text-slate-300 hover:text-white transition-colors"
            title="Reset to Core XI"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Live Compliance & Balance Rules Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Overseas Rule */}
        <div className={`p-4 rounded-xl border ${
          overseasInXI <= 4 ? 'bg-[#0F172A] border-emerald-500/30' : 'bg-red-950/30 border-red-500/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overseas in XI</span>
            <Plane size={14} className={overseasInXI <= 4 ? 'text-emerald-400' : 'text-red-400'} />
          </div>
          <div className="text-2xl font-black font-mono mt-1 text-white">{overseasInXI} / 4</div>
          <span className={`text-[10px] font-semibold ${overseasInXI <= 4 ? 'text-emerald-400' : 'text-red-400'}`}>
            {overseasInXI <= 4 ? 'Within Legal Cap (Max 4)' : 'EXCEEDS 4 OVERSEAS CAP'}
          </span>
        </div>

        {/* Wicketkeeper Rule */}
        <div className={`p-4 rounded-xl border ${
          wkInXI >= 1 ? 'bg-[#0F172A] border-emerald-500/30' : 'bg-red-950/30 border-red-500/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Wicketkeeper</span>
            <ShieldCheck size={14} className={wkInXI >= 1 ? 'text-emerald-400' : 'text-red-400'} />
          </div>
          <div className="text-2xl font-black font-mono mt-1 text-white">{wkInXI}</div>
          <span className={`text-[10px] font-semibold ${wkInXI >= 1 ? 'text-emerald-400' : 'text-red-400'}`}>
            {wkInXI >= 1 ? 'Keeper Secured' : 'NO WICKETKEEPER'}
          </span>
        </div>

        {/* Pace Depth */}
        <div className={`p-4 rounded-xl border ${
          paceOptions >= 3 ? 'bg-[#0F172A] border-blue-500/30' : 'bg-amber-950/30 border-amber-500/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pace Options</span>
            <span className="text-blue-400 font-bold text-xs">⚡</span>
          </div>
          <div className="text-2xl font-black font-mono mt-1 text-white">{paceOptions}</div>
          <span className={`text-[10px] font-semibold ${paceOptions >= 3 ? 'text-blue-400' : 'text-amber-400'}`}>
            {paceOptions >= 3 ? 'Adequate Pace Depth' : 'Pace Depth Thin (<3)'}
          </span>
        </div>

        {/* Spin Depth */}
        <div className={`p-4 rounded-xl border ${
          spinOptions >= 2 ? 'bg-[#0F172A] border-purple-500/30' : 'bg-amber-950/30 border-amber-500/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Spin Options</span>
            <span className="text-purple-400 font-bold text-xs">🌀</span>
          </div>
          <div className="text-2xl font-black font-mono mt-1 text-white">{spinOptions}</div>
          <span className={`text-[10px] font-semibold ${spinOptions >= 2 ? 'text-purple-400' : 'text-amber-400'}`}>
            {spinOptions >= 2 ? 'Adequate Spin Control' : 'Spin Depth Thin (<2)'}
          </span>
        </div>

        {/* Finishing Options */}
        <div className={`p-4 rounded-xl border ${
          finisherOptions >= 2 ? 'bg-[#0F172A] border-[#EA1A85]/30' : 'bg-amber-950/30 border-amber-500/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Power Finishers</span>
            <Sparkles size={14} className="text-[#EA1A85]" />
          </div>
          <div className="text-2xl font-black font-mono mt-1 text-white">{finisherOptions}</div>
          <span className={`text-[10px] font-semibold ${finisherOptions >= 2 ? 'text-[#EA1A85]' : 'text-amber-400'}`}>
            {finisherOptions >= 2 ? 'Crunch Finishing Depth' : 'Needs Power Finishers'}
          </span>
        </div>
      </div>

      {/* Warning Banners if violations exist */}
      {warnings.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <AlertTriangle size={15} />
            <span>Tactical Balance & Rule Warnings</span>
          </div>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
            {warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Playing XI Order Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Playing XI Order & Tactical Assignments</h3>
          <span className="text-xs text-slate-400">Click any slot to swap or assign a player</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {slots.map((slot) => {
            const isImpact = slot.order === 12;
            const isAssigned = slot.assignedPlayerName !== null;

            return (
              <div
                key={slot.order}
                onClick={() => setActiveSlotOrder(activeSlotOrder === slot.order ? null : slot.order)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isImpact 
                    ? 'bg-purple-950/15 border-purple-500/40 hover:border-purple-400' 
                    : isAssigned 
                    ? 'bg-[#0E1626] border-[#1E2D4A] hover:border-[#EA1A85]/50' 
                    : 'bg-[#0E1626]/50 border-dashed border-[#1E2D4A] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A2740]">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                      isImpact ? 'bg-purple-500 text-white' : 'bg-[#18253E] text-slate-300'
                    }`}>
                      {isImpact ? 'IP' : `#${slot.order}`}
                    </span>
                    <span className="font-bold text-white text-xs">{slot.positionName}</span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {slot.recommendedRole}
                  </span>
                </div>

                {isAssigned ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">{slot.assignedPlayerName}</span>
                        {slot.isOverseas && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                            ✈ OS
                          </span>
                        )}
                      </div>
                      {slot.balancedScore && (
                        <span className="text-xs font-bold font-mono text-[#EA1A85]">
                          {slot.balancedScore.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{slot.assignedRole}</span>
                      <span className="text-[10px] text-slate-500">{slot.source}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 text-center text-slate-500 text-xs font-medium">
                    + Click to assign candidate
                  </div>
                )}

                {/* Dropdown selector when active */}
                {activeSlotOrder === slot.order && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-0 right-0 top-full mt-2 z-30 p-3 bg-[#0A101D] border border-[#233558] rounded-xl shadow-2xl max-h-64 overflow-y-auto space-y-1 animate-in fade-in"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1C2A44] text-[10px] font-bold text-slate-400 uppercase">
                      <span>Select Replacement for #{slot.order}</span>
                      {isAssigned && (
                        <button
                          onClick={() => handleClearSlot(slot.order)}
                          className="text-red-400 hover:underline"
                        >
                          Clear Slot
                        </button>
                      )}
                    </div>
                    {selectablePlayers.map((p, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleAssignPlayer(slot.order, p)}
                        className="p-2 rounded-lg hover:bg-[#142036] cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{p.name}</span>
                            {p.isOverseas && <span className="text-[9px] text-amber-300">✈</span>}
                          </div>
                          <span className="text-[10px] text-slate-400">{p.role} • {p.source}</span>
                        </div>
                        {p.score && (
                          <span className="text-xs font-bold font-mono text-[#EA1A85]">
                            {p.score.toFixed(1)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Combinations Shelf */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-4">
        <h3 className="font-bold text-white text-base">Session Saved Hypothetical Combinations</h3>
        <div className="flex flex-wrap gap-3">
          {savedCombinations.map((combo) => (
            <div
              key={combo.id}
              className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A] flex items-center gap-4 hover:border-slate-500 transition-colors"
            >
              <div>
                <span className="font-bold text-white text-xs block">{combo.name}</span>
                <span className="text-[10px] text-slate-400">11 Starters + 1 Impact Player</span>
              </div>
              <button
                onClick={() => handleLoadCombination(combo)}
                className="px-3 py-1 rounded-lg bg-[#18243D] hover:bg-[#EA1A85] text-white text-xs font-semibold transition-colors"
              >
                Load XI
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

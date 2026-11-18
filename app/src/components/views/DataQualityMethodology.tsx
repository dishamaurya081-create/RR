import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Sparkles,
  Coins
} from 'lucide-react';
import { DATA_QUALITY_SUMMARY } from '../../data/intelligenceData';

export const DataQualityMethodology: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'methodology' | 'inventory'>('audit');

  const datasetInventory = [
    { file: 'candidate_database.csv', rows: 50, role: 'Consolidated candidate table with 50 player-role entries, balanced scores & metrics' },
    { file: 'priority_candidates.csv', rows: 50, role: 'Candidate priority rankings, squad fit assumptions, sample validation tags' },
    { file: 'final_shortlist.csv', rows: 10, role: 'Top 10 original recommendations (5 batters, 5 bowlers) with balanced scores' },
    { file: 'final_recommendations.csv', rows: 10, role: 'Original model recommendations and scenario rankings' },
    { file: 'final_master.csv', rows: 10, role: 'Original qualitative strengths, stability counts, and risk validations' },
    { file: 'final_validation.csv', rows: 10, role: 'Retention checks, potential squad contributions, and auction categories' },
    { file: 'final_evidence.csv', rows: 10, role: 'Role mapping and evidence for RR squad contribution' },
    { file: 'original_candidates.csv', rows: 10, role: 'Base original top 10 candidates' },
    { file: 'alternative_batters.csv', rows: 21, role: '21 high-pressure alternative batters with detailed pressure & ordinary metrics' },
    { file: 'alternative_bowlers.csv', rows: 19, role: '19 high-pressure alternative bowlers with death-overs bowling metrics' },
    { file: 'batter_shortlist.csv', rows: 37, role: 'Pre-filtered historical batter shortlist containing pressure stats for original 5 batters' },
    { file: 'bowler_shortlist.csv', rows: 28, role: 'Pre-filtered historical bowler shortlist containing pressure stats for original 5 bowlers' },
    { file: 'comparison.csv', rows: 50, role: 'Cross-pool metric comparison data' },
    { file: 'original_vs_alternative.csv', rows: 4, role: 'Aggregate score and reliability averages across original and alternative pools' },
    { file: 'rr_existing_players.csv', rows: 1, role: 'CRITICAL LIMITATION: Supplied only 1 player (Dhruv Jurel). Incomplete squad file.' },
    { file: 'rr_squad_2027.csv', rows: 19, role: 'Reported 19-player RR roster cross-verified against official IPL 2027 announcement' },
    { file: 'rr_squad_2027_reported.csv', rows: 19, role: 'Corroborating reported roster verification' },
    { file: 'squad_requirements.csv', rows: 6, role: 'Provisional planning targets for 6 role groups with initial gap flags' },
    { file: 'squad_fit.csv', rows: 10, role: 'Provisional squad fit notes for the top 10 candidates' },
    { file: 'candidate_table_with_rr_status.csv', rows: 50, role: '50 candidates mapped with RR existing status flags' },
    { file: 'status_df.csv', rows: 10, role: 'Franchise 2027 retention and auction status records for original 10' },
    { file: 'ipl2027_shortlist.csv', rows: 10, role: 'Franchise acquisition decision mapping' },
    { file: 'ipl2027_acquisition_candidates.csv', rows: 1, role: 'Unconfirmed auction candidate flag (Maheesh Theekshana)' },
    { file: 'unavailable_players.csv', rows: 8, role: 'Catalog of 8 original candidates confirmed retained by rival franchises' },
    { file: 'availability_df.csv', rows: 10, role: 'Comprehensive availability mapping for original 10 targets' },
    { file: 'project_summary.json', rows: 5842, role: 'System metadata, column profiles, and analytical audit trail' }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
              Transparency, Governance & Data Quality
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Data Integrity, Classification Audits & Analytical Methodology
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full audit logs of all 50 candidate records, official 2027 squad parameters, schema validations and mathematical formulations
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121B2F] border border-[#1E2D4A] text-xs">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'audit' ? 'bg-[#EA1A85] text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Quality Audit
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'methodology' ? 'bg-[#EA1A85] text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Methodology & Rules
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'inventory' ? 'bg-[#EA1A85] text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dataset Inventory (26)
          </button>
        </div>
      </div>

      {/* Tab 1: Data Quality Audit */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Key Audit Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Candidate Entries</span>
              <div className="text-2xl font-black text-white font-mono mt-1">50</div>
              <span className="text-[10px] text-slate-400">Player-role records</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Unique Individuals</span>
              <div className="text-2xl font-black text-white font-mono mt-1">47</div>
              <span className="text-[10px] text-slate-400">3 dual-pool players</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#EA1A85]/30">
              <span className="text-[10px] font-bold text-[#EA1A85] uppercase block">Original Top 10</span>
              <div className="text-2xl font-black text-white font-mono mt-1">10</div>
              <span className="text-[10px] text-slate-400">100% Preserved</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-blue-500/30">
              <span className="text-[10px] font-bold text-blue-400 uppercase block">Alternative Pool</span>
              <div className="text-2xl font-black text-white font-mono mt-1">40</div>
              <span className="text-[10px] text-slate-400">21 Bat + 19 Bowl</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-amber-500/30">
              <span className="text-[10px] font-bold text-amber-400 uppercase block">Missing Reliability</span>
              <div className="text-2xl font-black text-amber-300 font-mono mt-1">5</div>
              <span className="text-[10px] text-slate-400">Original batters (null)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-emerald-500/30">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Official RR Squad</span>
              <div className="text-2xl font-black text-emerald-300 font-mono mt-1">19 Players</div>
              <span className="text-[10px] text-slate-400">₹27.05 Cr Purse</span>
            </div>
          </div>

          {/* Official 2027 Squad Verification Card */}
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <Coins size={18} className="text-emerald-400" />
              <h3 className="font-bold text-white text-base">
                Official Rajasthan Royals 2027 Roster & Purse Verification
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Verified against official IPL 2027 player retentions announcement (<a href="https://www.iplt20.com/news/article/tata-ipl-2027-player-retentions-announced" target="_blank" rel="noreferrer" className="text-blue-400 underline">iplt20.com</a>):
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A]">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Retained Players</span>
                <span className="text-lg font-black text-white font-mono">17 Players</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A]">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Traded In Players</span>
                <span className="text-lg font-black text-blue-400 font-mono">2 Players (Shami, Siddharth)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A]">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Available Squad Positions</span>
                <span className="text-lg font-black text-amber-300 font-mono">6 Open Slots (Max 25)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121B2F] border border-[#1E2D4A]">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Remaining Purse</span>
                <span className="text-lg font-black text-emerald-400 font-mono">₹27.05 Crore</span>
              </div>
            </div>
          </div>

          {/* Detailed Dual-Pool and Role Inconsistency Callout */}
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" />
              <h3 className="font-bold text-white text-base">
                Role Classification Audits & Dual-Pool Resolutions
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with project governance, players appearing across multiple role pools have been identified, validated, and retained with explanatory metadata to prevent misclassification in squad assembly.
            </p>

            <div className="space-y-3">
              {DATA_QUALITY_SUMMARY.dual_pool_players.map((dp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#121B2F] border border-[#1E2D4A] space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{dp.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                        True Role: {dp.trueRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {dp.roles.map((r, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong className="text-amber-300">Audit Finding:</strong> {dp.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Methodology & Formulations */}
      {activeTab === 'methodology' && (
        <div className="space-y-6 animate-in fade-in text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pressure Performance */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-[#EA1A85]" />
                1. What Pressure Performance Means
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Pressure performance in this analytics model isolates match-defining overs (overs 16-20 in batting run chases or target defenses, high required run-rate scenarios &gt; 10 RPO, and crunch phases). It strips away non-critical "ordinary" deliveries to evaluate true composure and execution under duress.
              </p>
            </div>

            {/* Balanced Scores */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                2. How Balanced Scores Are Derived
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Balanced score combines scoring speed (Pressure SR for batters; Pressure Economy for bowlers), scoring volume / strike capability (Pressure Average for batters; Wickets per 100 balls for bowlers), and ordinary-to-pressure improvement delta into a unified 0-100 index.
              </p>
            </div>

            {/* Performance vs Reliability */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-purple-400" />
                3. Performance vs Reliability Separation
              </h3>
              <p className="text-slate-300 leading-relaxed">
                <strong>Balanced Score</strong> measures peak execution in crunch situations. <strong>Reliability Score</strong> evaluates how frequently a player delivers acceptable outcomes across distinct scenarios. A player may achieve a 220+ SR in 3 games but have an unstable consistency profile across a full tournament.
              </p>
            </div>

            {/* Performance Percentile vs Balanced Score */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-400" />
                4. Performance Percentile vs Balanced Score
              </h3>
              <p className="text-slate-300 leading-relaxed">
                <strong>Performance Percentile</strong> reflects a candidate's relative statistical ranking within their peer group pool (e.g. 95th percentile among alternative death-overs hitters). <strong>Balanced Score</strong> is an absolute indexed value combining weighted sub-scores. The two metrics are maintained as separate conceptual layers.
              </p>
            </div>

            {/* Sample Size Governance */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                5. Sample Adequacy Thresholds
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Statistical validity requires sufficient sample depth: Adequate Sample requires &ge;10 consistency matches; Limited Sample covers 4-9 matches; Needs Validation applies to &lt;4 matches. Three appearances never establish statistical reliability.
              </p>
            </div>

            {/* Auction Verification */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-[#1E2D4A] space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-blue-300" />
                6. 2027 Auction Feasibility Verification
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Past franchise membership does not establish 2027 auction availability. Retentions by KKR (Rinku, Varun), DC (Stubbs, Miller), SRH (Klaasen), MI (Shardul), RCB (Hazlewood) and PBKS (Chahal) mean RR must deploy its ₹27.05 Cr purse toward released targets like Ashutosh Sharma, Arshdeep Singh, or Shimron Hetmyer.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Dataset Inventory */}
      {activeTab === 'inventory' && (
        <div className="rounded-2xl bg-[#0E1626] border border-[#1E2D4A] overflow-hidden shadow-xl animate-in fade-in">
          <div className="p-4 bg-[#090E1A] border-b border-[#1E2D4A] flex items-center justify-between text-xs">
            <h3 className="font-bold text-white text-sm">Processed Dataset Inventory</h3>
            <span className="font-mono text-slate-400">{datasetInventory.length} Files Cataloged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0D1424] border-b border-[#1E2D4A] text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-4">Filename</th>
                  <th className="py-3 px-3 text-center">Row Count</th>
                  <th className="py-3 px-4">Analytical Purpose & Role in Dashboard</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#17233B]">
                {datasetInventory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#131D31] transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-white">
                      {item.file}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-400">
                      {item.rows}
                    </td>
                    <td className="py-2.5 px-4 text-slate-300 text-[11px]">
                      {item.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

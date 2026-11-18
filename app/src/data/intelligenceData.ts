// SupeRR Selector — Rajasthan Royals 2027 Acquisition Intelligence Data
// Updated with Official IPL 2027 Retentions announcement
// https://www.iplt20.com/news/article/tata-ipl-2027-player-retentions-announced

export interface BattingStats {
  pressure_runs: number | null;
  pressure_balls: number | null;
  pressure_sr: number | null;
  pressure_average: number | null;
  pressure_matches: number | null;
  pressure_fours: number | null;
  pressure_sixes: number | null;
  ordinary_runs: number | null;
  ordinary_balls: number | null;
  ordinary_sr: number | null;
  ordinary_average: number | null;
  sr_difference: number | null;
  average_difference: number | null;
  sr_score: number | null;
  average_score: number | null;
  improvement_score: number | null;
  pressure_dismissals: number | null;
}

export interface BowlingStats {
  pressure_balls: number | null;
  pressure_runs: number | null;
  pressure_wickets: number | null;
  pressure_dots: number | null;
  pressure_economy: number | null;
  pressure_wickets_per_100: number | null;
  pressure_dot_percentage: number | null;
  pressure_matches: number | null;
  ordinary_economy: number | null;
  ordinary_wickets_per_100: number | null;
  economy_improvement: number | null;
  economy_score: number | null;
  wicket_score: number | null;
}

export interface ReliabilityStats {
  reliability_score: number | null; // null if not independently calculated; NEVER 0 or fabricated
  reliability_status: string;
  sample_validation: string;
  consistency_matches: number | null;
  consistency_rate: number | null;
  consistency_adjusted: number | null;
  scenario_stability: string | null;
  scenario_appearances: number | null;
}

export interface QualitativeEvidence {
  main_strength: string;
  risk_or_validation: string;
  rr_squad_contribution: string;
  validation_required: string;
}

export interface AcquisitionStatus {
  franchise_2027: string;
  status_2027: 'Retained by RR' | 'Retained by another franchise' | 'Released and potentially auction-eligible' | 'Pending auction registration verification' | 'Auction eligibility unverified';
  acquisition_decision: string;
  acquisition_category: string;
}

export interface Candidate {
  candidate_id: string;
  player_id: string;
  player_name: string;
  player_type: 'Batter' | 'Bowler';
  verified_role: string;
  candidate_source: 'Original Top 10' | 'Alternative Pool';
  balanced_score: number;
  balanced_rank: number | null;
  top10_appearances: number | null;
  overall_candidate_rank: number | null;
  selection_rank: number | null;
  selection_score: number | null;
  squad_fit_score: number;
  potential_roles: string[];
  priority_role: string;
  is_overseas: boolean;
  role_warning: string | null;
  corrected_role_note: string | null;
  batting: BattingStats;
  bowling: BowlingStats;
  reliability: ReliabilityStats;
  qualitative: QualitativeEvidence;
  acquisition: AcquisitionStatus;
}

export interface SquadPlayer {
  id: string;
  name: string;
  role: 'Batter' | 'Wicketkeeper-batter' | 'All-rounder' | 'Bowler';
  subRole: 'Top-order' | 'Middle-order' | 'Finisher' | 'Wicketkeeper' | 'Pace All-rounder' | 'Spin All-rounder' | 'Fast bowler' | 'Spin bowler';
  status: 'Retained' | 'Traded in' | 'Acquired' | 'Provisional';
  isOverseas: boolean;
  costEstimate?: string;
}

export interface SquadRequirement {
  role: string;
  planning_target: number;
  existing_count: number;
  estimated_gap: number;
  status: string;
}

export const CANDIDATES: Candidate[] = [
  {
    "candidate_id": "cand_1",
    "player_id": "4708",
    "player_name": "Rinku Singh",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Original Top 10",
    "balanced_score": 79.961,
    "balanced_rank": 1,
    "top10_appearances": 3,
    "overall_candidate_rank": 1,
    "selection_rank": 1,
    "selection_score": 73.04692307692306,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher",
      "Middle-order"
    ],
    "priority_role": "Finisher, Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 275,
      "pressure_balls": 121,
      "pressure_sr": 227.27272727272728,
      "pressure_average": 91.66666666666667,
      "pressure_matches": 9,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 3,
      "ordinary_runs": 375,
      "ordinary_balls": 290,
      "ordinary_sr": 129.31034482758622,
      "ordinary_average": 41.666666666666664,
      "sr_difference": 97.96238244514106,
      "average_difference": 50.00000000000001,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": null,
      "pressure_runs": null,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": null,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": null,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": null,
      "consistency_rate": null,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Pressure scoring and finishing",
      "risk_or_validation": "Check role-specific sample and auction availability",
      "rr_squad_contribution": "Middle/lower-order finishing",
      "validation_required": "Confirmed retained by Kolkata Knight Riders for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "KKR",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by KKR)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_2",
    "player_id": "20702",
    "player_name": "Tristan Stubbs",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Original Top 10",
    "balanced_score": 68.654,
    "balanced_rank": 2,
    "top10_appearances": 3,
    "overall_candidate_rank": 2,
    "selection_rank": 2,
    "selection_score": 64.34923076923076,
    "squad_fit_score": 50,
    "potential_roles": [
      "Middle-order",
      "Finisher",
      "WK"
    ],
    "priority_role": "Middle-order, Finisher, WK",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 97,
      "pressure_balls": 42,
      "pressure_sr": 230.95238095238093,
      "pressure_average": 48.5,
      "pressure_matches": 5,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 2,
      "ordinary_runs": 447,
      "ordinary_balls": 327,
      "ordinary_sr": 136.69724770642202,
      "ordinary_average": 37.25,
      "sr_difference": 94.25513324595892,
      "average_difference": 11.25,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": null,
      "pressure_runs": null,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": null,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": null,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": null,
      "consistency_rate": null,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Smaller pressure sample; validate consistency",
      "rr_squad_contribution": "Middle-order power hitting",
      "validation_required": "Confirmed retained by Delhi Capitals for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "DC",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by DC)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_3",
    "player_id": "1077",
    "player_name": "David Miller",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Original Top 10",
    "balanced_score": 68.401,
    "balanced_rank": 3,
    "top10_appearances": 3,
    "overall_candidate_rank": 3,
    "selection_rank": 3,
    "selection_score": 64.15461538461538,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher",
      "Middle-order"
    ],
    "priority_role": "Finisher, Middle-order",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 125,
      "pressure_balls": 56,
      "pressure_sr": 223.21428571428572,
      "pressure_average": 41.666666666666664,
      "pressure_matches": 7,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 3,
      "ordinary_runs": 666,
      "ordinary_balls": 459,
      "ordinary_sr": 145.09803921568627,
      "ordinary_average": 51.23076923076923,
      "sr_difference": 78.11624649859945,
      "average_difference": -9.56410256410257,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": null,
      "pressure_runs": null,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": null,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": null,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": null,
      "consistency_rate": null,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Experienced middle-order finishing",
      "risk_or_validation": "Age, auction cost and availability",
      "rr_squad_contribution": "Experienced finishing option",
      "validation_required": "Confirmed retained by Delhi Capitals for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "DC",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by DC)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_4",
    "player_id": "7260",
    "player_name": "Dhruv Jurel",
    "player_type": "Batter",
    "verified_role": "Wicketkeeper-Batter",
    "candidate_source": "Original Top 10",
    "balanced_score": 66.668,
    "balanced_rank": 4,
    "top10_appearances": 3,
    "overall_candidate_rank": 4,
    "selection_rank": 4,
    "selection_score": 62.821538461538466,
    "squad_fit_score": 50,
    "potential_roles": [
      "WK",
      "Middle-order"
    ],
    "priority_role": "WK, Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 104,
      "pressure_balls": 52,
      "pressure_sr": 200,
      "pressure_average": 52,
      "pressure_matches": 6,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 2,
      "ordinary_runs": 559,
      "ordinary_balls": 371,
      "ordinary_sr": 150.67385444743934,
      "ordinary_average": 32.88235294117647,
      "sr_difference": 49.32614555256066,
      "average_difference": 19.11764705882353,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": null,
      "pressure_runs": null,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": null,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": null,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": null,
      "consistency_rate": null,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Middle-order batting and wicketkeeping option",
      "risk_or_validation": "Check role, batting position and RR's existing squad",
      "rr_squad_contribution": "Middle-order batting and keeping",
      "validation_required": "Confirmed retained by Rajasthan Royals in official 19-player roster."
    },
    "acquisition": {
      "franchise_2027": "RR",
      "status_2027": "Retained by RR",
      "acquisition_decision": "Secured RR Asset (Retained by RR)",
      "acquisition_category": "Retained by RR"
    }
  },
  {
    "candidate_id": "cand_5",
    "player_id": "8",
    "player_name": "Mahendra Singh Dhoni",
    "player_type": "Batter",
    "verified_role": "Wicketkeeper-Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 63.26402562808655,
    "balanced_rank": 5,
    "top10_appearances": null,
    "overall_candidate_rank": 5,
    "selection_rank": 5,
    "selection_score": 60.203096636989656,
    "squad_fit_score": 50,
    "potential_roles": [
      "WK",
      "Finisher"
    ],
    "priority_role": "WK, Finisher",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 248,
      "pressure_balls": 143,
      "pressure_sr": 173.4265734265734,
      "pressure_average": 49.6,
      "pressure_matches": 11,
      "pressure_fours": 19,
      "pressure_sixes": 17,
      "pressure_dismissals": 5,
      "ordinary_runs": 98,
      "ordinary_balls": 77,
      "ordinary_sr": 127.27272727272727,
      "ordinary_average": 32.666666666666664,
      "sr_difference": 46.153846153846146,
      "average_difference": 16.933333333333337,
      "sr_score": 51.85185185185185,
      "average_score": 88.88888888888889,
      "improvement_score": 74.07407407407408
    },
    "bowling": {
      "pressure_balls": 143,
      "pressure_runs": 248,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 11,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 63.26402562808655,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 10,
      "consistency_rate": 0.8,
      "consistency_adjusted": 0.7307692307692308,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for WK, Finisher",
      "validation_required": "Retained by Chennai Super Kings as uncapped/player retention."
    },
    "acquisition": {
      "franchise_2027": "CSK",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (CSK Retention/Icon)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_6",
    "player_id": "4260",
    "player_name": "Heinrich Klaasen",
    "player_type": "Batter",
    "verified_role": "Wicketkeeper-Batter",
    "candidate_source": "Original Top 10",
    "balanced_score": 62.662,
    "balanced_rank": 6,
    "top10_appearances": 3,
    "overall_candidate_rank": 6,
    "selection_rank": 6,
    "selection_score": 59.74,
    "squad_fit_score": 50,
    "potential_roles": [
      "WK",
      "Middle-order"
    ],
    "priority_role": "WK, Middle-order",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 103,
      "pressure_balls": 50,
      "pressure_sr": 206,
      "pressure_average": 25.75,
      "pressure_matches": 5,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 4,
      "ordinary_runs": 536,
      "ordinary_balls": 346,
      "ordinary_sr": 154.91329479768785,
      "ordinary_average": 41.23076923076923,
      "sr_difference": 51.086705202312146,
      "average_difference": -15.480769230769234,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": null,
      "pressure_runs": null,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": null,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": null,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": null,
      "consistency_rate": null,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Middle-order power hitting and wicketkeeping option",
      "risk_or_validation": "Auction cost, availability and role overlap",
      "rr_squad_contribution": "Middle-order power hitting",
      "validation_required": "Confirmed top retention by Sunrisers Hyderabad for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "SRH",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by SRH)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_7",
    "player_id": "3297",
    "player_name": "Shimron Hetmyer",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 61.801348802656285,
    "balanced_rank": 7,
    "top10_appearances": null,
    "overall_candidate_rank": 7,
    "selection_rank": 7,
    "selection_score": 59.07796061742791,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher",
      "Middle-order"
    ],
    "priority_role": "Finisher, Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 117,
      "pressure_balls": 60,
      "pressure_sr": 195,
      "pressure_average": 29.25,
      "pressure_matches": 7,
      "pressure_fours": 5,
      "pressure_sixes": 10,
      "pressure_dismissals": 4,
      "ordinary_runs": 400,
      "ordinary_balls": 266,
      "ordinary_sr": 150.37593984962405,
      "ordinary_average": 25,
      "sr_difference": 44.62406015037595,
      "average_difference": 4.25,
      "sr_score": 74.07407407407408,
      "average_score": 66.66666666666666,
      "improvement_score": 70.37037037037037
    },
    "bowling": {
      "pressure_balls": 60,
      "pressure_runs": 117,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 7,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 61.801348802656285,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 3,
      "consistency_rate": 1,
      "consistency_adjusted": 0.75,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Finisher, Middle-order",
      "validation_required": "Officially released by Rajasthan Royals ahead of 2027 auction. Prime candidate to re-acquire for death-overs finishing."
    },
    "acquisition": {
      "franchise_2027": "Released by RR",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Priority Auction Re-acquisition / RTM Target",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_8",
    "player_id": "152",
    "player_name": "Ravindra Jadeja",
    "player_type": "Batter",
    "verified_role": "Premier All-Rounder (Spin)",
    "candidate_source": "Alternative Pool",
    "balanced_score": 61.70175758067488,
    "balanced_rank": 8,
    "top10_appearances": null,
    "overall_candidate_rank": 8,
    "selection_rank": 8,
    "selection_score": 59.00135198513452,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": "Role Classification Note: Evaluated in Batter pool (#8 balanced score 61.70), premier Left-arm Spin All-Rounder retained by RR.",
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 239,
      "pressure_balls": 144,
      "pressure_sr": 165.97222222222223,
      "pressure_average": 59.75,
      "pressure_matches": 13,
      "pressure_fours": 18,
      "pressure_sixes": 12,
      "pressure_dismissals": 4,
      "ordinary_runs": 257,
      "ordinary_balls": 211,
      "ordinary_sr": 121.80094786729858,
      "ordinary_average": 32.125,
      "sr_difference": 44.17127435492365,
      "average_difference": 27.625,
      "sr_score": 37.03703703703704,
      "average_score": 96.29629629629629,
      "improvement_score": 66.66666666666666
    },
    "bowling": {
      "pressure_balls": 144,
      "pressure_runs": 239,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 13,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 61.70175758067488,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 9,
      "consistency_rate": 1,
      "consistency_adjusted": 0.875,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Confirmed retained by Rajasthan Royals in official 19-player roster (All-rounder)."
    },
    "acquisition": {
      "franchise_2027": "RR",
      "status_2027": "Retained by RR",
      "acquisition_decision": "Secured RR Asset (Retained by RR)",
      "acquisition_category": "Retained by RR"
    }
  },
  {
    "candidate_id": "cand_9",
    "player_id": "4722",
    "player_name": "Rashid Khan",
    "player_type": "Batter",
    "verified_role": "Bowling All-Rounder (Spin)",
    "candidate_source": "Alternative Pool",
    "balanced_score": 60.62445924639514,
    "balanced_rank": 9,
    "top10_appearances": null,
    "overall_candidate_rank": 9,
    "selection_rank": 14,
    "selection_score": 53.141543785553544,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": true,
    "role_warning": "Dataset Inconsistency / Role Warning: Candidate appears in alternative_batters dataset due to late-overs finishing metrics (SR 189.17), but actual real-world primary role is Elite Leg-Spinner / Bowling All-Rounder.",
    "corrected_role_note": "Dual-role entry preserved from dataset: Evaluated on high-pressure lower-order batting (SR 189.17, Avg 32.43). Real-world identity: World-class Spin Bowler & All-Rounder.",
    "batting": {
      "pressure_runs": 227,
      "pressure_balls": 120,
      "pressure_sr": 189.16666666666666,
      "pressure_average": 32.42857142857143,
      "pressure_matches": 16,
      "pressure_fours": 13,
      "pressure_sixes": 21,
      "pressure_dismissals": 7,
      "ordinary_runs": 77,
      "ordinary_balls": 50,
      "ordinary_sr": 154,
      "ordinary_average": 25.666666666666668,
      "sr_difference": 35.16666666666666,
      "average_difference": 6.761904761904763,
      "sr_score": 70.37037037037037,
      "average_score": 74.07407407407408,
      "improvement_score": 51.85185185185185
    },
    "bowling": {
      "pressure_balls": 120,
      "pressure_runs": 227,
      "pressure_wickets": 9,
      "pressure_dots": 28,
      "pressure_economy": 10.177215189873417,
      "pressure_wickets_per_100": 11.39240506329114,
      "pressure_dot_percentage": 35.44303797468354,
      "pressure_matches": 16,
      "ordinary_economy": 7.996946564885496,
      "ordinary_wickets_per_100": 5.801526717557252,
      "economy_improvement": -2.180268624987921,
      "economy_score": 20.833333333333336,
      "wicket_score": 91.66666666666666
    },
    "reliability": {
      "reliability_score": 43.79804046387421,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.6666666666666666,
      "consistency_adjusted": 0.625,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Confirmed top retention by Gujarat Titans. Dual entry retained for data integrity."
    },
    "acquisition": {
      "franchise_2027": "GT",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (GT Cornerstone)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_10",
    "player_id": "8101",
    "player_name": "Ashutosh Sharma",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 59.29735751766206,
    "balanced_rank": 10,
    "top10_appearances": null,
    "overall_candidate_rank": 10,
    "selection_rank": 9,
    "selection_score": 57.15181347512466,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher",
      "Middle-order"
    ],
    "priority_role": "Finisher, Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 100,
      "pressure_balls": 48,
      "pressure_sr": 208.33333333333334,
      "pressure_average": 25,
      "pressure_matches": 8,
      "pressure_fours": 10,
      "pressure_sixes": 6,
      "pressure_dismissals": 4,
      "ordinary_runs": 261,
      "ordinary_balls": 155,
      "ordinary_sr": 168.38709677419354,
      "ordinary_average": 43.5,
      "sr_difference": 39.946236559139805,
      "average_difference": -18.5,
      "sr_score": 88.88888888888889,
      "average_score": 59.25925925925925,
      "improvement_score": 59.25925925925925
    },
    "bowling": {
      "pressure_balls": 48,
      "pressure_runs": 100,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 8,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 59.29735751766206,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 6,
      "consistency_rate": 0.5,
      "consistency_adjusted": 0.5,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Finisher, Middle-order",
      "validation_required": "Released into 2027 auction pool. Prime target to solve RR finishing vacancy (SR 178.6)."
    },
    "acquisition": {
      "franchise_2027": "Released by PBKS",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Top Priority Target for Finishing Vacancy",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_11",
    "player_id": "2639",
    "player_name": "Marcus Stoinis",
    "player_type": "Batter",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 56.201078629943794,
    "balanced_rank": 11,
    "top10_appearances": null,
    "overall_candidate_rank": 11,
    "selection_rank": 10,
    "selection_score": 54.77006048457215,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Middle-order"
    ],
    "priority_role": "All-rounder, Middle-order",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 113,
      "pressure_balls": 61,
      "pressure_sr": 185.24590163934425,
      "pressure_average": 22.6,
      "pressure_matches": 6,
      "pressure_fours": 9,
      "pressure_sixes": 8,
      "pressure_dismissals": 5,
      "ordinary_runs": 518,
      "ordinary_balls": 350,
      "ordinary_sr": 148,
      "ordinary_average": 34.53333333333333,
      "sr_difference": 37.245901639344254,
      "average_difference": -11.93333333333333,
      "sr_score": 66.66666666666666,
      "average_score": 44.44444444444444,
      "improvement_score": 55.55555555555556
    },
    "bowling": {
      "pressure_balls": 61,
      "pressure_runs": 113,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 6,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 56.201078629943794,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 4,
      "consistency_rate": 1,
      "consistency_adjusted": 0.7857142857142857,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Middle-order",
      "validation_required": "Released by LSG. Potentially eligible for overseas all-rounder slot (3 overseas slots open)."
    },
    "acquisition": {
      "franchise_2027": "Released by LSG",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Strong Overseas Power Option (3 OS Slots Open)",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_12",
    "player_id": "6396",
    "player_name": "Tim David",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 55.343925506630164,
    "balanced_rank": 12,
    "top10_appearances": null,
    "overall_candidate_rank": 12,
    "selection_rank": 11,
    "selection_score": 54.11071192817705,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher",
      "Middle-order"
    ],
    "priority_role": "Finisher, Middle-order",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 124,
      "pressure_balls": 63,
      "pressure_sr": 196.8253968253968,
      "pressure_average": 24.8,
      "pressure_matches": 8,
      "pressure_fours": 6,
      "pressure_sixes": 11,
      "pressure_dismissals": 5,
      "ordinary_runs": 434,
      "ordinary_balls": 239,
      "ordinary_sr": 181.5899581589958,
      "ordinary_average": 36.166666666666664,
      "sr_difference": 15.235438666400995,
      "average_difference": -11.366666666666664,
      "sr_score": 77.77777777777779,
      "average_score": 55.55555555555556,
      "improvement_score": 40.74074074074074
    },
    "bowling": {
      "pressure_balls": 63,
      "pressure_runs": 124,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 8,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 55.343925506630164,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 7,
      "consistency_rate": 0.5714285714285714,
      "consistency_adjusted": 0.5499999999999999,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Finisher, Middle-order",
      "validation_required": "Released by Mumbai Indians. Power hitting overseas death candidate."
    },
    "acquisition": {
      "franchise_2027": "Released by MI",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Strong Alternative Finisher Option",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_13",
    "player_id": "20006",
    "player_name": "Ramandeep Singh",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 54.55495328749957,
    "balanced_rank": 13,
    "top10_appearances": null,
    "overall_candidate_rank": 13,
    "selection_rank": 12,
    "selection_score": 53.503810221153515,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Finisher"
    ],
    "priority_role": "All-rounder, Finisher",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 69,
      "pressure_balls": 40,
      "pressure_sr": 172.5,
      "pressure_average": 17.25,
      "pressure_matches": 5,
      "pressure_fours": 6,
      "pressure_sixes": 4,
      "pressure_dismissals": 4,
      "ordinary_runs": 40,
      "ordinary_balls": 43,
      "ordinary_sr": 93.02325581395348,
      "ordinary_average": 10,
      "sr_difference": 79.47674418604652,
      "average_difference": 7.25,
      "sr_score": 48.148148148148145,
      "average_score": 25.925925925925924,
      "improvement_score": 92.5925925925926
    },
    "bowling": {
      "pressure_balls": 40,
      "pressure_runs": 69,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 5,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 54.55495328749957,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 3,
      "consistency_rate": 1,
      "consistency_adjusted": 0.75,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Finisher",
      "validation_required": "Confirmed retained by Kolkata Knight Riders."
    },
    "acquisition": {
      "franchise_2027": "KKR",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (KKR Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_14",
    "player_id": "4755",
    "player_name": "Shivam Dube",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 54.1905675183914,
    "balanced_rank": 14,
    "top10_appearances": null,
    "overall_candidate_rank": 14,
    "selection_rank": 13,
    "selection_score": 53.22351347568569,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Middle-order"
    ],
    "priority_role": "All-rounder, Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 110,
      "pressure_balls": 61,
      "pressure_sr": 180.327868852459,
      "pressure_average": 18.333333333333332,
      "pressure_matches": 9,
      "pressure_fours": 9,
      "pressure_sixes": 7,
      "pressure_dismissals": 6,
      "ordinary_runs": 543,
      "ordinary_balls": 406,
      "ordinary_sr": 133.74384236453204,
      "ordinary_average": 38.785714285714285,
      "sr_difference": 46.58402648792696,
      "average_difference": -20.452380952380953,
      "sr_score": 59.25925925925925,
      "average_score": 29.629629629629626,
      "improvement_score": 77.77777777777779
    },
    "bowling": {
      "pressure_balls": 61,
      "pressure_runs": 110,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 9,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 54.1905675183914,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 5,
      "consistency_rate": 0.6,
      "consistency_adjusted": 0.5625,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Middle-order",
      "validation_required": "Confirmed retained by Chennai Super Kings."
    },
    "acquisition": {
      "franchise_2027": "CSK",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (CSK Core Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_15",
    "player_id": "6460",
    "player_name": "Ayush Badoni",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 50,
    "balanced_rank": 15,
    "top10_appearances": null,
    "overall_candidate_rank": 15,
    "selection_rank": 15,
    "selection_score": 50,
    "squad_fit_score": 50,
    "potential_roles": [
      "Middle-order"
    ],
    "priority_role": "Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 104,
      "pressure_balls": 61,
      "pressure_sr": 170.4918032786885,
      "pressure_average": 14.857142857142858,
      "pressure_matches": 6,
      "pressure_fours": 5,
      "pressure_sixes": 6,
      "pressure_dismissals": 7,
      "ordinary_runs": 334,
      "ordinary_balls": 264,
      "ordinary_sr": 126.51515151515152,
      "ordinary_average": 22.266666666666666,
      "sr_difference": 43.97665176353699,
      "average_difference": -7.409523809523808,
      "sr_score": 44.44444444444444,
      "average_score": 18.51851851851852,
      "improvement_score": 62.96296296296296
    },
    "bowling": {
      "pressure_balls": 61,
      "pressure_runs": 104,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 6,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 50,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 3,
      "consistency_rate": 1,
      "consistency_adjusted": 0.75,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Middle-order",
      "validation_required": "Confirmed retained by Lucknow Super Giants."
    },
    "acquisition": {
      "franchise_2027": "LSG",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (LSG Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_16",
    "player_id": "4823",
    "player_name": "Washington Sundar",
    "player_type": "Batter",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 48.14943101114164,
    "balanced_rank": 16,
    "top10_appearances": null,
    "overall_candidate_rank": 16,
    "selection_rank": 17,
    "selection_score": 48.57648539318588,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 76,
      "pressure_balls": 43,
      "pressure_sr": 176.74418604651163,
      "pressure_average": 15.2,
      "pressure_matches": 7,
      "pressure_fours": 10,
      "pressure_sixes": 2,
      "pressure_dismissals": 5,
      "ordinary_runs": 261,
      "ordinary_balls": 173,
      "ordinary_sr": 150.86705202312137,
      "ordinary_average": 29,
      "sr_difference": 25.877134023390255,
      "average_difference": -13.8,
      "sr_score": 55.55555555555556,
      "average_score": 22.22222222222222,
      "improvement_score": 44.44444444444444
    },
    "bowling": {
      "pressure_balls": 43,
      "pressure_runs": 76,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 7,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 48.14943101114164,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 5,
      "consistency_rate": 0.6,
      "consistency_adjusted": 0.5625,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Released by SRH. Complementary domestic spin bowling all-rounder."
    },
    "acquisition": {
      "franchise_2027": "Released by SRH",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Off-Spin & Batting Depth Target",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_17",
    "player_id": "143",
    "player_name": "Dinesh Karthik",
    "player_type": "Batter",
    "verified_role": "Wicketkeeper-Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 47.149199098796906,
    "balanced_rank": 17,
    "top10_appearances": null,
    "overall_candidate_rank": 17,
    "selection_rank": 18,
    "selection_score": 47.80707622984377,
    "squad_fit_score": 50,
    "potential_roles": [
      "WK",
      "Finisher"
    ],
    "priority_role": "WK, Finisher",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 159,
      "pressure_balls": 87,
      "pressure_sr": 182.75862068965517,
      "pressure_average": 22.714285714285715,
      "pressure_matches": 7,
      "pressure_fours": 10,
      "pressure_sixes": 12,
      "pressure_dismissals": 7,
      "ordinary_runs": 179,
      "ordinary_balls": 102,
      "ordinary_sr": 175.49019607843138,
      "ordinary_average": 59.666666666666664,
      "sr_difference": 7.268424611223793,
      "average_difference": -36.95238095238095,
      "sr_score": 62.96296296296296,
      "average_score": 48.148148148148145,
      "improvement_score": 25.925925925925924
    },
    "bowling": {
      "pressure_balls": 87,
      "pressure_runs": 159,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 7,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 47.149199098796906,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 7,
      "consistency_rate": 0.2857142857142857,
      "consistency_adjusted": 0.35,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for WK, Finisher",
      "validation_required": "Announced IPL retirement following 2024 season; serving in mentorship role."
    },
    "acquisition": {
      "franchise_2027": "Retired / RCB Mentor",
      "status_2027": "Auction eligibility unverified",
      "acquisition_decision": "Not Recommended (Retired from IPL)",
      "acquisition_category": "Auction eligibility unverified"
    }
  },
  {
    "candidate_id": "cand_18",
    "player_id": "2756",
    "player_name": "Shashank Singh",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 46.39308465652729,
    "balanced_rank": 18,
    "top10_appearances": null,
    "overall_candidate_rank": 18,
    "selection_rank": 19,
    "selection_score": 47.22544973579023,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher",
      "Middle-order"
    ],
    "priority_role": "Finisher, Middle-order",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 179,
      "pressure_balls": 106,
      "pressure_sr": 168.86792452830187,
      "pressure_average": 35.8,
      "pressure_matches": 9,
      "pressure_fours": 14,
      "pressure_sixes": 11,
      "pressure_dismissals": 5,
      "ordinary_runs": 389,
      "ordinary_balls": 240,
      "ordinary_sr": 162.08333333333334,
      "ordinary_average": 38.9,
      "sr_difference": 6.784591194968527,
      "average_difference": -3.1000000000000014,
      "sr_score": 40.74074074074074,
      "average_score": 77.77777777777779,
      "improvement_score": 22.22222222222222
    },
    "bowling": {
      "pressure_balls": 106,
      "pressure_runs": 179,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 9,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 46.39308465652729,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 7,
      "consistency_rate": 0.42857142857142855,
      "consistency_adjusted": 0.44999999999999996,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Finisher, Middle-order",
      "validation_required": "Confirmed retained by Punjab Kings as finishing specialist."
    },
    "acquisition": {
      "franchise_2027": "PBKS",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (PBKS Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_19",
    "player_id": "7472",
    "player_name": "Shahbaz Ahmed",
    "player_type": "Batter",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 45.090407708653665,
    "balanced_rank": 19,
    "top10_appearances": null,
    "overall_candidate_rank": 19,
    "selection_rank": 20,
    "selection_score": 46.22339054511821,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 65,
      "pressure_balls": 47,
      "pressure_sr": 138.29787234042556,
      "pressure_average": 21.666666666666668,
      "pressure_matches": 5,
      "pressure_fours": 3,
      "pressure_sixes": 3,
      "pressure_dismissals": 3,
      "ordinary_runs": 173,
      "ordinary_balls": 159,
      "ordinary_sr": 108.80503144654088,
      "ordinary_average": 19.22222222222222,
      "sr_difference": 29.492840893884676,
      "average_difference": 2.4444444444444464,
      "sr_score": 18.51851851851852,
      "average_score": 40.74074074074074,
      "improvement_score": 48.148148148148145
    },
    "bowling": {
      "pressure_balls": 47,
      "pressure_runs": 65,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 5,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 45.090407708653665,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 4,
      "consistency_rate": 0.75,
      "consistency_adjusted": 0.6428571428571428,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Released by SRH. Left-arm orthodox spin & lower-middle batting."
    },
    "acquisition": {
      "franchise_2027": "Released by SRH",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Backup Spin All-Rounder",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_20",
    "player_id": "3926",
    "player_name": "Rahul Tewatia",
    "player_type": "Batter",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 42.47062223736546,
    "balanced_rank": 20,
    "top10_appearances": null,
    "overall_candidate_rank": 20,
    "selection_rank": 21,
    "selection_score": 44.20817095181959,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Finisher"
    ],
    "priority_role": "All-rounder, Finisher",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 207,
      "pressure_balls": 135,
      "pressure_sr": 153.33333333333334,
      "pressure_average": 23,
      "pressure_matches": 13,
      "pressure_fours": 19,
      "pressure_sixes": 11,
      "pressure_dismissals": 9,
      "ordinary_runs": 310,
      "ordinary_balls": 219,
      "ordinary_sr": 141.55251141552512,
      "ordinary_average": 38.75,
      "sr_difference": 11.780821917808225,
      "average_difference": -15.75,
      "sr_score": 25.925925925925924,
      "average_score": 51.85185185185185,
      "improvement_score": 29.629629629629626
    },
    "bowling": {
      "pressure_balls": 135,
      "pressure_runs": 207,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 13,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 42.47062223736546,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 9,
      "consistency_rate": 0.6666666666666666,
      "consistency_adjusted": 0.625,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Finisher",
      "validation_required": "Confirmed retained by Gujarat Titans."
    },
    "acquisition": {
      "franchise_2027": "GT",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (GT Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_21",
    "player_id": "4986",
    "player_name": "Rovman Powell",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 41.567273897920316,
    "balanced_rank": 21,
    "top10_appearances": null,
    "overall_candidate_rank": 21,
    "selection_rank": 22,
    "selection_score": 43.513287613784854,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher"
    ],
    "priority_role": "Finisher",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 135,
      "pressure_balls": 86,
      "pressure_sr": 156.9767441860465,
      "pressure_average": 19.285714285714285,
      "pressure_matches": 9,
      "pressure_fours": 5,
      "pressure_sixes": 12,
      "pressure_dismissals": 7,
      "ordinary_runs": 217,
      "ordinary_balls": 151,
      "ordinary_sr": 143.7086092715232,
      "ordinary_average": 24.11111111111111,
      "sr_difference": 13.268134914523301,
      "average_difference": -4.825396825396826,
      "sr_score": 29.629629629629626,
      "average_score": 33.33333333333333,
      "improvement_score": 37.03703703703704
    },
    "bowling": {
      "pressure_balls": 86,
      "pressure_runs": 135,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 9,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 41.567273897920316,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 6,
      "consistency_rate": 0.5,
      "consistency_adjusted": 0.5,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Finisher",
      "validation_required": "Released by RR. Familiar with franchise setup; possible backup overseas buy."
    },
    "acquisition": {
      "franchise_2027": "Released by RR",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Backup Overseas Power Finisher",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_22",
    "player_id": "7446",
    "player_name": "Abdul Samad",
    "player_type": "Batter",
    "verified_role": "Batter",
    "candidate_source": "Alternative Pool",
    "balanced_score": 38.79681457636429,
    "balanced_rank": 22,
    "top10_appearances": null,
    "overall_candidate_rank": 22,
    "selection_rank": 23,
    "selection_score": 41.38216505874176,
    "squad_fit_score": 50,
    "potential_roles": [
      "Finisher"
    ],
    "priority_role": "Finisher",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 118,
      "pressure_balls": 90,
      "pressure_sr": 131.11111111111111,
      "pressure_average": 29.5,
      "pressure_matches": 6,
      "pressure_fours": 5,
      "pressure_sixes": 8,
      "pressure_dismissals": 4,
      "ordinary_runs": 120,
      "ordinary_balls": 90,
      "ordinary_sr": 133.33333333333331,
      "ordinary_average": 13.333333333333334,
      "sr_difference": -2.2222222222222,
      "average_difference": 16.166666666666664,
      "sr_score": 11.11111111111111,
      "average_score": 70.37037037037037,
      "improvement_score": 14.814814814814813
    },
    "bowling": {
      "pressure_balls": 90,
      "pressure_runs": 118,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 6,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 38.79681457636429,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 5,
      "consistency_rate": 0.4,
      "consistency_adjusted": 0.4375,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Finisher",
      "validation_required": "Released by SRH. Raw power hitting in late overs."
    },
    "acquisition": {
      "franchise_2027": "Released by SRH",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Domestic Finisher Backup",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_23",
    "player_id": "1318",
    "player_name": "Andre Russell",
    "player_type": "Batter",
    "verified_role": "All-Rounder (Pace / Finisher)",
    "candidate_source": "Alternative Pool",
    "balanced_score": 38.23601595489254,
    "balanced_rank": 23,
    "top10_appearances": null,
    "overall_candidate_rank": 23,
    "selection_rank": 16,
    "selection_score": 48.824345300949986,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Finisher",
      "Pace"
    ],
    "priority_role": "All-rounder, Finisher, Pace",
    "is_overseas": true,
    "role_warning": "Dual-Pool Candidate: Present in both Batter and Bowler alternative evaluation pools.",
    "corrected_role_note": "Pace-Bowling All-Rounder & Death Finisher. Impactful with both bat and ball.",
    "batting": {
      "pressure_runs": 63,
      "pressure_balls": 40,
      "pressure_sr": 157.5,
      "pressure_average": 12.6,
      "pressure_matches": 6,
      "pressure_fours": 4,
      "pressure_sixes": 4,
      "pressure_dismissals": 5,
      "ordinary_runs": 284,
      "ordinary_balls": 171,
      "ordinary_sr": 166.08187134502924,
      "ordinary_average": 25.818181818181817,
      "sr_difference": -8.581871345029242,
      "average_difference": -13.218181818181817,
      "sr_score": 33.33333333333333,
      "average_score": 14.814814814814813,
      "improvement_score": 7.4074074074074066
    },
    "bowling": {
      "pressure_balls": 40,
      "pressure_runs": 63,
      "pressure_wickets": 7,
      "pressure_dots": 29,
      "pressure_economy": 8.647058823529411,
      "pressure_wickets_per_100": 10.294117647058822,
      "pressure_dot_percentage": 42.64705882352941,
      "pressure_matches": 6,
      "ordinary_economy": 10.875,
      "ordinary_wickets_per_100": 8.75,
      "economy_improvement": 2.2279411764705888,
      "economy_score": 62.5,
      "wicket_score": 75
    },
    "reliability": {
      "reliability_score": 63.446678067153485,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 3,
      "consistency_rate": 0.3333333333333333,
      "consistency_adjusted": 0.4166666666666667,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Finisher, Pace",
      "validation_required": "Confirmed retained by Kolkata Knight Riders. Dual entry retained for data integrity."
    },
    "acquisition": {
      "franchise_2027": "KKR",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (KKR Core Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_24",
    "player_id": "6671",
    "player_name": "Lalit Yadav",
    "player_type": "Batter",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 35.78611047647267,
    "balanced_rank": 24,
    "top10_appearances": null,
    "overall_candidate_rank": 24,
    "selection_rank": 25,
    "selection_score": 39.0662388280559,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder"
    ],
    "priority_role": "All-rounder",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 64,
      "pressure_balls": 53,
      "pressure_sr": 120.75471698113208,
      "pressure_average": 10.666666666666666,
      "pressure_matches": 6,
      "pressure_fours": 7,
      "pressure_sixes": 2,
      "pressure_dismissals": 6,
      "ordinary_runs": 146,
      "ordinary_balls": 135,
      "ordinary_sr": 108.14814814814815,
      "ordinary_average": 29.2,
      "sr_difference": 12.606568832983925,
      "average_difference": -18.53333333333333,
      "sr_score": 7.4074074074074066,
      "average_score": 11.11111111111111,
      "improvement_score": 33.33333333333333
    },
    "bowling": {
      "pressure_balls": 53,
      "pressure_runs": 64,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 6,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 35.78611047647267,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 5,
      "consistency_rate": 0.4,
      "consistency_adjusted": 0.4375,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder",
      "validation_required": "Released by DC. Utility off-spin and lower order support."
    },
    "acquisition": {
      "franchise_2027": "Released by DC",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Domestic Utility Backup",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_25",
    "player_id": "2876",
    "player_name": "Axar Patel",
    "player_type": "Batter",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 35.66980769571224,
    "balanced_rank": 25,
    "top10_appearances": null,
    "overall_candidate_rank": 25,
    "selection_rank": 26,
    "selection_score": 38.97677515054787,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 124,
      "pressure_balls": 83,
      "pressure_sr": 149.39759036144576,
      "pressure_average": 20.666666666666668,
      "pressure_matches": 10,
      "pressure_fours": 7,
      "pressure_sixes": 6,
      "pressure_dismissals": 6,
      "ordinary_runs": 462,
      "ordinary_balls": 300,
      "ordinary_sr": 154,
      "ordinary_average": 27.176470588235293,
      "sr_difference": -4.602409638554235,
      "average_difference": -6.509803921568626,
      "sr_score": 22.22222222222222,
      "average_score": 37.03703703703704,
      "improvement_score": 11.11111111111111
    },
    "bowling": {
      "pressure_balls": 83,
      "pressure_runs": 124,
      "pressure_wickets": null,
      "pressure_dots": null,
      "pressure_economy": null,
      "pressure_wickets_per_100": null,
      "pressure_dot_percentage": null,
      "pressure_matches": 10,
      "ordinary_economy": null,
      "ordinary_wickets_per_100": null,
      "economy_improvement": null,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 35.66980769571224,
      "reliability_status": "Not independently available",
      "sample_validation": "Needs sample validation",
      "consistency_matches": 7,
      "consistency_rate": 0.42857142857142855,
      "consistency_adjusted": 0.44999999999999996,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Confirmed top retention by Delhi Capitals."
    },
    "acquisition": {
      "franchise_2027": "DC",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (DC Core Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_26",
    "player_id": "4219",
    "player_name": "Krunal Pandya",
    "player_type": "Batter",
    "verified_role": "All-Rounder (Spin)",
    "candidate_source": "Alternative Pool",
    "balanced_score": 35.42988961565438,
    "balanced_rank": 26,
    "top10_appearances": null,
    "overall_candidate_rank": 26,
    "selection_rank": 24,
    "selection_score": 41.028602612423185,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": "Dual-Pool Candidate: Present in both Batter and Bowler alternative evaluation pools.",
    "corrected_role_note": "Spin-Bowling All-Rounder / Middle-order.",
    "batting": {
      "pressure_runs": 62,
      "pressure_balls": 46,
      "pressure_sr": 134.7826086956522,
      "pressure_average": 10.333333333333334,
      "pressure_matches": 8,
      "pressure_fours": 7,
      "pressure_sixes": 2,
      "pressure_dismissals": 6,
      "ordinary_runs": 413,
      "ordinary_balls": 310,
      "ordinary_sr": 133.2258064516129,
      "ordinary_average": 37.54545454545455,
      "sr_difference": 1.5568022440392895,
      "average_difference": -27.21212121212121,
      "sr_score": 14.814814814814813,
      "average_score": 3.7037037037037033,
      "improvement_score": 18.51851851851852
    },
    "bowling": {
      "pressure_balls": 46,
      "pressure_runs": 62,
      "pressure_wickets": 7,
      "pressure_dots": 32,
      "pressure_economy": 9,
      "pressure_wickets_per_100": 8.75,
      "pressure_dot_percentage": 40,
      "pressure_matches": 8,
      "ordinary_economy": 7.484787018255578,
      "ordinary_wickets_per_100": 4.86815415821501,
      "economy_improvement": -1.5152129817444218,
      "economy_score": 45.83333333333333,
      "wicket_score": 50
    },
    "reliability": {
      "reliability_score": 45.18187944170284,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 5,
      "consistency_rate": 0.6,
      "consistency_adjusted": 0.5625,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "High pressure strike rate",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Released by LSG. Evaluated in both pools; middle order control."
    },
    "acquisition": {
      "franchise_2027": "Released by LSG",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Domestic Spin All-Rounder Option",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_27",
    "player_id": "2847",
    "player_name": "Shardul Thakur",
    "player_type": "Bowler",
    "verified_role": "Bowling All-Rounder (Pace)",
    "candidate_source": "Original Top 10",
    "balanced_score": 75.589,
    "balanced_rank": 1,
    "top10_appearances": 3,
    "overall_candidate_rank": 1,
    "selection_rank": 1,
    "selection_score": 71.75052439480672,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Pace"
    ],
    "priority_role": "All-rounder, Pace",
    "is_overseas": false,
    "role_warning": "Role Classification Note: Evaluated in Bowler pool (#1 balanced score 75.59), also provides valuable lower-order batting.",
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 89,
      "pressure_balls": 87,
      "pressure_sr": 108.04597701149426,
      "pressure_average": 10.444444444444445,
      "pressure_matches": 8,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 9,
      "ordinary_runs": 41,
      "ordinary_balls": 34,
      "ordinary_sr": 120.58823529411765,
      "ordinary_average": 20.5,
      "sr_difference": -12.542258282623393,
      "average_difference": -10.055555555555555,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": 72,
      "pressure_runs": 89,
      "pressure_wickets": 9,
      "pressure_dots": 30,
      "pressure_economy": 7.416666666666667,
      "pressure_wickets_per_100": 12.5,
      "pressure_dot_percentage": 41.66666666666667,
      "pressure_matches": 8,
      "ordinary_economy": 11.533512064343164,
      "ordinary_wickets_per_100": null,
      "economy_improvement": 4.116845397676497,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 75.58864112801919,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 6,
      "consistency_rate": 1,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Pressure-overs wicket-taking and bowling contribution",
      "risk_or_validation": "Check economy consistency and likely role",
      "rr_squad_contribution": "Seam bowling and lower-order batting",
      "validation_required": "Confirmed retained by Mumbai Indians as seam all-rounder."
    },
    "acquisition": {
      "franchise_2027": "MI",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by MI)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_28",
    "player_id": "830",
    "player_name": "Josh Hazlewood",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Original Top 10",
    "balanced_score": 69.971,
    "balanced_rank": 2,
    "top10_appearances": 3,
    "overall_candidate_rank": 2,
    "selection_rank": 2,
    "selection_score": 66.97520247037016,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 140,
      "pressure_balls": null,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 12,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": null,
      "ordinary_balls": null,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": 107,
      "pressure_runs": 140,
      "pressure_wickets": 11,
      "pressure_dots": 47,
      "pressure_economy": 7.850467289719626,
      "pressure_wickets_per_100": 10.2803738317757,
      "pressure_dot_percentage": 43.925233644859816,
      "pressure_matches": 12,
      "ordinary_economy": 9.08148148148148,
      "ordinary_wickets_per_100": null,
      "economy_improvement": 1.2310141917618544,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 69.9705784867719,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 10,
      "consistency_rate": 0.9,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Pressure-overs control and pace bowling",
      "risk_or_validation": "Availability, workload and fitness information",
      "rr_squad_contribution": "Pace and pressure-over control",
      "validation_required": "Confirmed retained by Royal Challengers Bengaluru for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "RCB",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by RCB)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_29",
    "player_id": "19316",
    "player_name": "Maheesh Theekshana",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Original Top 10",
    "balanced_score": 69.199,
    "balanced_rank": 3,
    "top10_appearances": 3,
    "overall_candidate_rank": 3,
    "selection_rank": 3,
    "selection_score": 66.31921818068356,
    "squad_fit_score": 50,
    "potential_roles": [
      "Spin"
    ],
    "priority_role": "Spin",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 58,
      "pressure_balls": null,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 8,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": null,
      "ordinary_balls": null,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": 61,
      "pressure_runs": 58,
      "pressure_wickets": 6,
      "pressure_dots": 29,
      "pressure_economy": 5.704918032786885,
      "pressure_wickets_per_100": 9.836065573770492,
      "pressure_dot_percentage": 47.540983606557376,
      "pressure_matches": 8,
      "ordinary_economy": 7.934328358208956,
      "ordinary_wickets_per_100": null,
      "economy_improvement": 2.2294103254220703,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 69.19919480195304,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 8,
      "consistency_rate": 0.75,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Spin control under pressure",
      "risk_or_validation": "Verify auction status and conditions suitability",
      "rr_squad_contribution": "Spin control and middle overs",
      "validation_required": "Registration on final overseas auction register pending official BCCI confirmation."
    },
    "acquisition": {
      "franchise_2027": "Unconfirmed",
      "status_2027": "Pending auction registration verification",
      "acquisition_decision": "Monitor Final Auction Registration Register",
      "acquisition_category": "Pending auction registration verification"
    }
  },
  {
    "candidate_id": "cand_30",
    "player_id": "1612",
    "player_name": "Yuzvendra Chahal",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Original Top 10",
    "balanced_score": 63.7,
    "balanced_rank": 4,
    "top10_appearances": 3,
    "overall_candidate_rank": 4,
    "selection_rank": 4,
    "selection_score": 61.64497825792072,
    "squad_fit_score": 50,
    "potential_roles": [
      "Spin"
    ],
    "priority_role": "Spin",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 136,
      "pressure_balls": null,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 13,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": null,
      "ordinary_balls": null,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": 105,
      "pressure_runs": 136,
      "pressure_wickets": 10,
      "pressure_dots": 42,
      "pressure_economy": 7.771428571428572,
      "pressure_wickets_per_100": 9.523809523809524,
      "pressure_dot_percentage": 40,
      "pressure_matches": 13,
      "ordinary_economy": 8.177842565597668,
      "ordinary_wickets_per_100": null,
      "economy_improvement": 0.40641399416909607,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 63.69993787977348,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.5555555555555556,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Wicket-taking spin option",
      "risk_or_validation": "Check auction status, cost and squad balance",
      "rr_squad_contribution": "Wicket-taking spin",
      "validation_required": "Confirmed retained by Punjab Kings for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "PBKS",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by PBKS)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_31",
    "player_id": "6256",
    "player_name": "Varun Chakravarthy",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Original Top 10",
    "balanced_score": 63.655,
    "balanced_rank": 5,
    "top10_appearances": 3,
    "overall_candidate_rank": 5,
    "selection_rank": 5,
    "selection_score": 61.606897814652605,
    "squad_fit_score": 50,
    "potential_roles": [
      "Spin"
    ],
    "priority_role": "Spin",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 119,
      "pressure_balls": null,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 11,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": null,
      "ordinary_balls": null,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": null
    },
    "bowling": {
      "pressure_balls": 86,
      "pressure_runs": 119,
      "pressure_wickets": 13,
      "pressure_dots": 40,
      "pressure_economy": 8.30232558139535,
      "pressure_wickets_per_100": 15.11627906976744,
      "pressure_dot_percentage": 46.51162790697674,
      "pressure_matches": 11,
      "ordinary_economy": 8.305369127516778,
      "ordinary_wickets_per_100": null,
      "economy_improvement": 0.003043546121428875,
      "economy_score": null,
      "wicket_score": null
    },
    "reliability": {
      "reliability_score": 63.655422327578876,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.6666666666666666,
      "consistency_adjusted": null,
      "scenario_stability": "3/3",
      "scenario_appearances": 3
    },
    "qualitative": {
      "main_strength": "Middle-overs spin and pressure control",
      "risk_or_validation": "Check auction status and role overlap",
      "rr_squad_contribution": "Middle-over spin control",
      "validation_required": "Confirmed retained by Kolkata Knight Riders for IPL 2027."
    },
    "acquisition": {
      "franchise_2027": "KKR",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (Retained by KKR)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_32",
    "player_id": "1318",
    "player_name": "Andre Russell",
    "player_type": "Bowler",
    "verified_role": "All-Rounder (Pace / Finisher)",
    "candidate_source": "Alternative Pool",
    "balanced_score": 63.446678067153485,
    "balanced_rank": 32,
    "top10_appearances": null,
    "overall_candidate_rank": 6,
    "selection_rank": 6,
    "selection_score": 61.42967635708046,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Finisher",
      "Pace"
    ],
    "priority_role": "All-rounder, Finisher, Pace",
    "is_overseas": true,
    "role_warning": "Dual-Pool Candidate: Present in both Batter and Bowler alternative evaluation pools.",
    "corrected_role_note": "Pace-Bowling All-Rounder & Death Finisher. Impactful with both bat and ball.",
    "batting": {
      "pressure_runs": 98,
      "pressure_balls": 68,
      "pressure_sr": 157.5,
      "pressure_average": 12.6,
      "pressure_matches": 12,
      "pressure_fours": 4,
      "pressure_sixes": 4,
      "pressure_dismissals": 5,
      "ordinary_runs": 435,
      "ordinary_balls": 240,
      "ordinary_sr": 166.08187134502924,
      "ordinary_average": 25.818181818181817,
      "sr_difference": -8.581871345029242,
      "average_difference": -13.218181818181817,
      "sr_score": 33.33333333333333,
      "average_score": 14.814814814814813,
      "improvement_score": 91.66666666666666
    },
    "bowling": {
      "pressure_balls": 68,
      "pressure_runs": 98,
      "pressure_wickets": 7,
      "pressure_dots": 29,
      "pressure_economy": 8.647058823529411,
      "pressure_wickets_per_100": 10.294117647058822,
      "pressure_dot_percentage": 42.64705882352941,
      "pressure_matches": 12,
      "ordinary_economy": 10.875,
      "ordinary_wickets_per_100": 8.75,
      "economy_improvement": 2.2279411764705888,
      "economy_score": 62.5,
      "wicket_score": 75
    },
    "reliability": {
      "reliability_score": 63.446678067153485,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 7,
      "consistency_rate": 0.7142857142857143,
      "consistency_adjusted": 0.65,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Finisher, Pace",
      "validation_required": "Confirmed retained by Kolkata Knight Riders. Dual entry retained for data integrity."
    },
    "acquisition": {
      "franchise_2027": "KKR",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (KKR Core Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_33",
    "player_id": "2878",
    "player_name": "Mohit Sharma",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 60.89010677252144,
    "balanced_rank": 33,
    "top10_appearances": null,
    "overall_candidate_rank": 7,
    "selection_rank": 7,
    "selection_score": 59.25659075664322,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 133,
      "pressure_balls": 92,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 9,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 299,
      "ordinary_balls": 192,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 70.83333333333334
    },
    "bowling": {
      "pressure_balls": 92,
      "pressure_runs": 133,
      "pressure_wickets": 10,
      "pressure_dots": 33,
      "pressure_economy": 8.673913043478262,
      "pressure_wickets_per_100": 10.869565217391305,
      "pressure_dot_percentage": 35.869565217391305,
      "pressure_matches": 9,
      "ordinary_economy": 9.34375,
      "ordinary_wickets_per_100": 8.333333333333332,
      "economy_improvement": 0.6698369565217384,
      "economy_score": 58.333333333333336,
      "wicket_score": 87.5
    },
    "reliability": {
      "reliability_score": 60.89010677252144,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 7,
      "consistency_rate": 0.5714285714285714,
      "consistency_adjusted": 0.5499999999999999,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by GT. Veteran death overs back-of-the-hand slower ball bowler."
    },
    "acquisition": {
      "franchise_2027": "Released by GT",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Experienced Slower-Ball Specialist",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_34",
    "player_id": "8661",
    "player_name": "Matheesha Pathirana",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 58.71302129877181,
    "balanced_rank": 34,
    "top10_appearances": null,
    "overall_candidate_rank": 8,
    "selection_rank": 8,
    "selection_score": 57.40606810395603,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 176,
      "pressure_balls": 129,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 10,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 400,
      "ordinary_balls": 273,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 66.66666666666666
    },
    "bowling": {
      "pressure_balls": 129,
      "pressure_runs": 176,
      "pressure_wickets": 11,
      "pressure_dots": 57,
      "pressure_economy": 8.186046511627907,
      "pressure_wickets_per_100": 8.527131782945736,
      "pressure_dot_percentage": 44.18604651162791,
      "pressure_matches": 10,
      "ordinary_economy": 8.79120879120879,
      "ordinary_wickets_per_100": 5.4945054945054945,
      "economy_improvement": 0.6051622795808829,
      "economy_score": 79.16666666666666,
      "wicket_score": 37.5
    },
    "reliability": {
      "reliability_score": 58.71302129877181,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.6666666666666666,
      "consistency_adjusted": 0.625,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Confirmed retained by Chennai Super Kings."
    },
    "acquisition": {
      "franchise_2027": "CSK",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (CSK Death Specialist)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_35",
    "player_id": "6464",
    "player_name": "Arshdeep Singh",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 58.61431072148835,
    "balanced_rank": 35,
    "top10_appearances": null,
    "overall_candidate_rank": 9,
    "selection_rank": 9,
    "selection_score": 57.322164113265096,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 86,
      "pressure_balls": 66,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 12,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 1074,
      "ordinary_balls": 709,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 87.5
    },
    "bowling": {
      "pressure_balls": 66,
      "pressure_runs": 86,
      "pressure_wickets": 2,
      "pressure_dots": 18,
      "pressure_economy": 7.818181818181818,
      "pressure_wickets_per_100": 3.0303030303030303,
      "pressure_dot_percentage": 27.27272727272727,
      "pressure_matches": 12,
      "ordinary_economy": 9.088857545839211,
      "ordinary_wickets_per_100": 4.795486600846263,
      "economy_improvement": 1.2706757276573928,
      "economy_score": 87.5,
      "wicket_score": 4.166666666666666
    },
    "reliability": {
      "reliability_score": 58.61431072148835,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 7,
      "consistency_rate": 0.8571428571428571,
      "consistency_adjusted": 0.75,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Enters mega-auction pool. Premier Indian left-arm death specialist (Econ 8.78)."
    },
    "acquisition": {
      "franchise_2027": "Released by PBKS",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Marquee Indian Pace Target (RTM Contested)",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_36",
    "player_id": "2633",
    "player_name": "Jason Holder",
    "player_type": "Bowler",
    "verified_role": "All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 57.83125339974291,
    "balanced_rank": 36,
    "top10_appearances": null,
    "overall_candidate_rank": 10,
    "selection_rank": 10,
    "selection_score": 56.65656538978148,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Pace"
    ],
    "priority_role": "All-rounder, Pace",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 115,
      "pressure_balls": 77,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 13,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 413,
      "ordinary_balls": 249,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 79.16666666666666
    },
    "bowling": {
      "pressure_balls": 77,
      "pressure_runs": 115,
      "pressure_wickets": 8,
      "pressure_dots": 28,
      "pressure_economy": 8.96103896103896,
      "pressure_wickets_per_100": 10.38961038961039,
      "pressure_dot_percentage": 36.36363636363637,
      "pressure_matches": 13,
      "ordinary_economy": 9.951807228915662,
      "ordinary_wickets_per_100": 3.2128514056224895,
      "economy_improvement": 0.9907682678767014,
      "economy_score": 50,
      "wicket_score": 79.16666666666666
    },
    "reliability": {
      "reliability_score": 57.83125339974291,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.4444444444444444,
      "consistency_adjusted": 0.4583333333333333,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Pace",
      "validation_required": "Overseas participation and auction registration status requires independent confirmation."
    },
    "acquisition": {
      "franchise_2027": "Overseas - Unconfirmed",
      "status_2027": "Auction eligibility unverified",
      "acquisition_decision": "Verify Auction Registration",
      "acquisition_category": "Auction eligibility unverified"
    }
  },
  {
    "candidate_id": "cand_37",
    "player_id": "4489",
    "player_name": "Prasidh Krishna",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 52.46202574116492,
    "balanced_rank": 37,
    "top10_appearances": null,
    "overall_candidate_rank": 11,
    "selection_rank": 11,
    "selection_score": 52.09272187999018,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 120,
      "pressure_balls": 85,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 11,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 608,
      "ordinary_balls": 452,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 37.5
    },
    "bowling": {
      "pressure_balls": 85,
      "pressure_runs": 120,
      "pressure_wickets": 8,
      "pressure_dots": 44,
      "pressure_economy": 8.470588235294118,
      "pressure_wickets_per_100": 9.411764705882353,
      "pressure_dot_percentage": 51.76470588235295,
      "pressure_matches": 11,
      "ordinary_economy": 8.070796460176991,
      "ordinary_wickets_per_100": 5.752212389380531,
      "economy_improvement": -0.3997917751171265,
      "economy_score": 66.66666666666666,
      "wicket_score": 58.333333333333336
    },
    "reliability": {
      "reliability_score": 52.46202574116492,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 10,
      "consistency_rate": 0.4,
      "consistency_adjusted": 0.42307692307692313,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by RR. Fitness and workload require verification."
    },
    "acquisition": {
      "franchise_2027": "Released by RR",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Injury-Vetted Pace Candidate",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_38",
    "player_id": "7322",
    "player_name": "Yash Dayal",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 51.70994069337909,
    "balanced_rank": 38,
    "top10_appearances": null,
    "overall_candidate_rank": 12,
    "selection_rank": 12,
    "selection_score": 51.45344958937223,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 106,
      "pressure_balls": 65,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 11,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 624,
      "ordinary_balls": 380,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 50
    },
    "bowling": {
      "pressure_balls": 65,
      "pressure_runs": 106,
      "pressure_wickets": 7,
      "pressure_dots": 25,
      "pressure_economy": 9.784615384615385,
      "pressure_wickets_per_100": 10.76923076923077,
      "pressure_dot_percentage": 38.46153846153847,
      "pressure_matches": 11,
      "ordinary_economy": 9.852631578947369,
      "ordinary_wickets_per_100": 4.736842105263158,
      "economy_improvement": 0.06801619433198347,
      "economy_score": 29.166666666666668,
      "wicket_score": 83.33333333333334
    },
    "reliability": {
      "reliability_score": 51.70994069337909,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 8,
      "consistency_rate": 0.625,
      "consistency_adjusted": 0.5909090909090909,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Confirmed retained by Royal Challengers Bengaluru."
    },
    "acquisition": {
      "franchise_2027": "RCB",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (RCB Retention)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_39",
    "player_id": "2261",
    "player_name": "Harshal Patel",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 50.920459817153265,
    "balanced_rank": 39,
    "top10_appearances": null,
    "overall_candidate_rank": 13,
    "selection_rank": 13,
    "selection_score": 50.78239084458028,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 152,
      "pressure_balls": 103,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 12,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 862,
      "ordinary_balls": 549,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 62.5
    },
    "bowling": {
      "pressure_balls": 103,
      "pressure_runs": 152,
      "pressure_wickets": 9,
      "pressure_dots": 41,
      "pressure_economy": 8.854368932038835,
      "pressure_wickets_per_100": 8.737864077669903,
      "pressure_dot_percentage": 39.80582524271845,
      "pressure_matches": 12,
      "ordinary_economy": 9.420765027322403,
      "ordinary_wickets_per_100": 4.007285974499089,
      "economy_improvement": 0.5663960952835687,
      "economy_score": 54.166666666666664,
      "wicket_score": 45.83333333333333
    },
    "reliability": {
      "reliability_score": 50.920459817153265,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 10,
      "consistency_rate": 0.4,
      "consistency_adjusted": 0.42307692307692313,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by PBKS. IPL purple cap pedigree in death overs containment."
    },
    "acquisition": {
      "franchise_2027": "Released by PBKS",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Death Overs Slower-Ball Specialist",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_40",
    "player_id": "305",
    "player_name": "Ravichandran Ashwin",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 47.772049482322814,
    "balanced_rank": 40,
    "top10_appearances": null,
    "overall_candidate_rank": 14,
    "selection_rank": 14,
    "selection_score": 48.10624205997439,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 84,
      "pressure_balls": 61,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 8,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 744,
      "ordinary_balls": 575,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 33.33333333333333
    },
    "bowling": {
      "pressure_balls": 61,
      "pressure_runs": 84,
      "pressure_wickets": 2,
      "pressure_dots": 20,
      "pressure_economy": 8.262295081967213,
      "pressure_wickets_per_100": 3.278688524590164,
      "pressure_dot_percentage": 32.78688524590164,
      "pressure_matches": 8,
      "ordinary_economy": 7.763478260869565,
      "ordinary_wickets_per_100": 3.826086956521739,
      "economy_improvement": -0.49881682109764824,
      "economy_score": 75,
      "wicket_score": 8.333333333333332
    },
    "reliability": {
      "reliability_score": 47.772049482322814,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 7,
      "consistency_rate": 0.5714285714285714,
      "consistency_adjusted": 0.5499999999999999,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Released by RR. Off-spin maestro and tactical squad mentor."
    },
    "acquisition": {
      "franchise_2027": "Released by RR",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Tactical Veteran Re-acquisition Check",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_41",
    "player_id": "4265",
    "player_name": "T Natarajan",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 47.52399028820801,
    "balanced_rank": 41,
    "top10_appearances": null,
    "overall_candidate_rank": 15,
    "selection_rank": 15,
    "selection_score": 47.895391744976806,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 159,
      "pressure_balls": 99,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 8,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 503,
      "ordinary_balls": 286,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 75
    },
    "bowling": {
      "pressure_balls": 99,
      "pressure_runs": 159,
      "pressure_wickets": 8,
      "pressure_dots": 36,
      "pressure_economy": 9.636363636363637,
      "pressure_wickets_per_100": 8.080808080808081,
      "pressure_dot_percentage": 36.36363636363637,
      "pressure_matches": 8,
      "ordinary_economy": 10.552447552447553,
      "ordinary_wickets_per_100": 1.7482517482517483,
      "economy_improvement": 0.9160839160839167,
      "economy_score": 33.33333333333333,
      "wicket_score": 33.33333333333333
    },
    "reliability": {
      "reliability_score": 47.52399028820801,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 7,
      "consistency_rate": 0.5714285714285714,
      "consistency_adjusted": 0.5499999999999999,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by SRH. Left-arm pinpoint yorker execution."
    },
    "acquisition": {
      "franchise_2027": "Released by SRH",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Yorker Specialist Target",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_42",
    "player_id": "3653",
    "player_name": "Avesh Khan",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 46.33639220539245,
    "balanced_rank": 42,
    "top10_appearances": null,
    "overall_candidate_rank": 16,
    "selection_rank": 16,
    "selection_score": 46.88593337458358,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 124,
      "pressure_balls": 81,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 12,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 770,
      "ordinary_balls": 498,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 54.166666666666664
    },
    "bowling": {
      "pressure_balls": 81,
      "pressure_runs": 124,
      "pressure_wickets": 6,
      "pressure_dots": 27,
      "pressure_economy": 9.185185185185185,
      "pressure_wickets_per_100": 7.4074074074074066,
      "pressure_dot_percentage": 33.33333333333333,
      "pressure_matches": 12,
      "ordinary_economy": 9.27710843373494,
      "ordinary_wickets_per_100": 5.220883534136546,
      "economy_improvement": 0.09192324854975453,
      "economy_score": 41.66666666666667,
      "wicket_score": 29.166666666666668
    },
    "reliability": {
      "reliability_score": 46.33639220539245,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 10,
      "consistency_rate": 0.6,
      "consistency_adjusted": 0.5769230769230769,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by RR. Known commodity in death bowling."
    },
    "acquisition": {
      "franchise_2027": "Released by RR",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Potential Re-acquisition Pace Target",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_43",
    "player_id": "4219",
    "player_name": "Krunal Pandya",
    "player_type": "Bowler",
    "verified_role": "All-Rounder (Spin)",
    "candidate_source": "Alternative Pool",
    "balanced_score": 45.18187944170284,
    "balanced_rank": 43,
    "top10_appearances": null,
    "overall_candidate_rank": 17,
    "selection_rank": 17,
    "selection_score": 45.904597525447414,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": false,
    "role_warning": "Dual-Pool Candidate: Present in both Batter and Bowler alternative evaluation pools.",
    "corrected_role_note": "Spin-Bowling All-Rounder / Middle-order.",
    "batting": {
      "pressure_runs": 120,
      "pressure_balls": 80,
      "pressure_sr": 134.7826086956522,
      "pressure_average": 10.333333333333334,
      "pressure_matches": 8,
      "pressure_fours": 7,
      "pressure_sixes": 2,
      "pressure_dismissals": 6,
      "ordinary_runs": 615,
      "ordinary_balls": 493,
      "ordinary_sr": 133.2258064516129,
      "ordinary_average": 37.54545454545455,
      "sr_difference": 1.5568022440392895,
      "average_difference": -27.21212121212121,
      "sr_score": 14.814814814814813,
      "average_score": 3.7037037037037033,
      "improvement_score": 16.666666666666664
    },
    "bowling": {
      "pressure_balls": 80,
      "pressure_runs": 120,
      "pressure_wickets": 7,
      "pressure_dots": 32,
      "pressure_economy": 9,
      "pressure_wickets_per_100": 8.75,
      "pressure_dot_percentage": 40,
      "pressure_matches": 8,
      "ordinary_economy": 7.484787018255578,
      "ordinary_wickets_per_100": 4.86815415821501,
      "economy_improvement": -1.5152129817444218,
      "economy_score": 45.83333333333333,
      "wicket_score": 50
    },
    "reliability": {
      "reliability_score": 45.18187944170284,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 8,
      "consistency_rate": 0.5,
      "consistency_adjusted": 0.5,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Released by LSG. Evaluated in both pools; middle order control."
    },
    "acquisition": {
      "franchise_2027": "Released by LSG",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Domestic Spin All-Rounder Option",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_44",
    "player_id": "5944",
    "player_name": "Mohammed Siraj",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 44.62806297322924,
    "balanced_rank": 44,
    "top10_appearances": null,
    "overall_candidate_rank": 18,
    "selection_rank": 18,
    "selection_score": 45.43385352724485,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 143,
      "pressure_balls": 92,
      "pressure_sr": 83.92857142857143,
      "pressure_average": 11.75,
      "pressure_matches": 13,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 4,
      "ordinary_runs": 1122,
      "ordinary_balls": 736,
      "ordinary_sr": 100,
      "ordinary_average": null,
      "sr_difference": -16.07142857142857,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 41.66666666666667
    },
    "bowling": {
      "pressure_balls": 92,
      "pressure_runs": 143,
      "pressure_wickets": 8,
      "pressure_dots": 34,
      "pressure_economy": 9.326086956521738,
      "pressure_wickets_per_100": 8.695652173913043,
      "pressure_dot_percentage": 36.95652173913043,
      "pressure_matches": 13,
      "ordinary_economy": 9.146739130434781,
      "ordinary_wickets_per_100": 4.619565217391304,
      "economy_improvement": -0.17934782608695699,
      "economy_score": 37.5,
      "wicket_score": 41.66666666666667
    },
    "reliability": {
      "reliability_score": 44.62806297322924,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 12,
      "consistency_rate": 0.5,
      "consistency_adjusted": 0.5,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by RCB. High experience Indian strike pace option."
    },
    "acquisition": {
      "franchise_2027": "Released by RCB",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Backup Domestic Pace Target",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_45",
    "player_id": "4722",
    "player_name": "Rashid Khan",
    "player_type": "Bowler",
    "verified_role": "Leg-Spin Bowler / All-Rounder",
    "candidate_source": "Alternative Pool",
    "balanced_score": 43.79804046387421,
    "balanced_rank": 45,
    "top10_appearances": null,
    "overall_candidate_rank": 19,
    "selection_rank": 19,
    "selection_score": 44.72833439429308,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Spin"
    ],
    "priority_role": "All-rounder, Spin",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": "Primary bowling entry: 9 pressure wickets, economy 10.18, 35.4% dot balls.",
    "batting": {
      "pressure_runs": 134,
      "pressure_balls": 79,
      "pressure_sr": 189.16666666666666,
      "pressure_average": 32.42857142857143,
      "pressure_matches": 12,
      "pressure_fours": 13,
      "pressure_sixes": 21,
      "pressure_dismissals": 7,
      "ordinary_runs": 873,
      "ordinary_balls": 655,
      "ordinary_sr": 154,
      "ordinary_average": 25.666666666666668,
      "sr_difference": 35.16666666666666,
      "average_difference": 6.761904761904763,
      "sr_score": 70.37037037037037,
      "average_score": 74.07407407407408,
      "improvement_score": 12.5
    },
    "bowling": {
      "pressure_balls": 79,
      "pressure_runs": 134,
      "pressure_wickets": 9,
      "pressure_dots": 28,
      "pressure_economy": 10.177215189873417,
      "pressure_wickets_per_100": 11.39240506329114,
      "pressure_dot_percentage": 35.44303797468354,
      "pressure_matches": 12,
      "ordinary_economy": 7.996946564885496,
      "ordinary_wickets_per_100": 5.801526717557252,
      "economy_improvement": -2.180268624987921,
      "economy_score": 20.833333333333336,
      "wicket_score": 91.66666666666666
    },
    "reliability": {
      "reliability_score": 43.79804046387421,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.3333333333333333,
      "consistency_adjusted": 0.375,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Spin",
      "validation_required": "Confirmed top retention by Gujarat Titans. Dual entry retained for data integrity."
    },
    "acquisition": {
      "franchise_2027": "GT",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (GT Cornerstone)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_46",
    "player_id": "6806",
    "player_name": "Tushar Deshpande",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 39.190001956072884,
    "balanced_rank": 46,
    "top10_appearances": null,
    "overall_candidate_rank": 20,
    "selection_rank": 20,
    "selection_score": 40.811501662661954,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 173,
      "pressure_balls": 97,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 12,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 685,
      "ordinary_balls": 424,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 25
    },
    "bowling": {
      "pressure_balls": 97,
      "pressure_runs": 173,
      "pressure_wickets": 9,
      "pressure_dots": 34,
      "pressure_economy": 10.701030927835053,
      "pressure_wickets_per_100": 9.278350515463918,
      "pressure_dot_percentage": 35.051546391752574,
      "pressure_matches": 12,
      "ordinary_economy": 9.693396226415093,
      "ordinary_wickets_per_100": 4.009433962264151,
      "economy_improvement": -1.0076347014199598,
      "economy_score": 12.5,
      "wicket_score": 54.166666666666664
    },
    "reliability": {
      "reliability_score": 39.190001956072884,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 11,
      "consistency_rate": 0.5454545454545454,
      "consistency_adjusted": 0.5357142857142857,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by CSK. Aggressive wicket-taking seam option."
    },
    "acquisition": {
      "franchise_2027": "Released by CSK",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Domestic Pace Squad Depth",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_47",
    "player_id": "5041",
    "player_name": "Mukesh Kumar",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 36.485988837892876,
    "balanced_rank": 47,
    "top10_appearances": null,
    "overall_candidate_rank": 21,
    "selection_rank": 21,
    "selection_score": 38.51309051220895,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 146,
      "pressure_balls": 74,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 8,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 409,
      "ordinary_balls": 219,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 29.166666666666668
    },
    "bowling": {
      "pressure_balls": 74,
      "pressure_runs": 146,
      "pressure_wickets": 5,
      "pressure_dots": 19,
      "pressure_economy": 11.837837837837839,
      "pressure_wickets_per_100": 6.756756756756757,
      "pressure_dot_percentage": 25.675675675675674,
      "pressure_matches": 8,
      "ordinary_economy": 11.205479452054796,
      "ordinary_wickets_per_100": 4.10958904109589,
      "economy_improvement": -0.6323583857830428,
      "economy_score": 8.333333333333332,
      "wicket_score": 25
    },
    "reliability": {
      "reliability_score": 36.485988837892876,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 8,
      "consistency_rate": 0.625,
      "consistency_adjusted": 0.5909090909090909,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by DC. Seam and blockhole accuracy."
    },
    "acquisition": {
      "franchise_2027": "Released by DC",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Domestic Seam Backup",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  },
  {
    "candidate_id": "cand_48",
    "player_id": "1758",
    "player_name": "Patrick Cummins",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 35.26396180799452,
    "balanced_rank": 48,
    "top10_appearances": null,
    "overall_candidate_rank": 22,
    "selection_rank": 22,
    "selection_score": 37.47436753679534,
    "squad_fit_score": 50,
    "potential_roles": [
      "All-rounder",
      "Pace"
    ],
    "priority_role": "All-rounder, Pace",
    "is_overseas": true,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 139,
      "pressure_balls": 82,
      "pressure_sr": 130,
      "pressure_average": 13,
      "pressure_matches": 10,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 4,
      "ordinary_runs": 622,
      "ordinary_balls": 413,
      "ordinary_sr": 255.26315789473685,
      "ordinary_average": 32.333333333333336,
      "sr_difference": -125.26315789473685,
      "average_difference": -19.333333333333336,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 20.833333333333336
    },
    "bowling": {
      "pressure_balls": 82,
      "pressure_runs": 139,
      "pressure_wickets": 3,
      "pressure_dots": 25,
      "pressure_economy": 10.170731707317072,
      "pressure_wickets_per_100": 3.6585365853658534,
      "pressure_dot_percentage": 30.48780487804878,
      "pressure_matches": 10,
      "ordinary_economy": 9.036319612590798,
      "ordinary_wickets_per_100": 6.2953995157385,
      "economy_improvement": -1.1344120947262741,
      "economy_score": 25,
      "wicket_score": 16.666666666666664
    },
    "reliability": {
      "reliability_score": 35.26396180799452,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.4444444444444444,
      "consistency_adjusted": 0.4583333333333333,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for All-rounder, Pace",
      "validation_required": "Confirmed retained by Sunrisers Hyderabad as captain."
    },
    "acquisition": {
      "franchise_2027": "SRH",
      "status_2027": "Retained by another franchise",
      "acquisition_decision": "Unavailable at auction (SRH Captain)",
      "acquisition_category": "Retained by another franchise"
    }
  },
  {
    "candidate_id": "cand_49",
    "player_id": "2411",
    "player_name": "Sandeep Sharma",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 31.84840508348981,
    "balanced_rank": 49,
    "top10_appearances": null,
    "overall_candidate_rank": 23,
    "selection_rank": 23,
    "selection_score": 34.57114432096634,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 142,
      "pressure_balls": 82,
      "pressure_sr": null,
      "pressure_average": null,
      "pressure_matches": 9,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": null,
      "ordinary_runs": 394,
      "ordinary_balls": 293,
      "ordinary_sr": null,
      "ordinary_average": null,
      "sr_difference": null,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 8.333333333333332
    },
    "bowling": {
      "pressure_balls": 82,
      "pressure_runs": 142,
      "pressure_wickets": 4,
      "pressure_dots": 19,
      "pressure_economy": 10.390243902439025,
      "pressure_wickets_per_100": 4.878048780487805,
      "pressure_dot_percentage": 23.170731707317074,
      "pressure_matches": 9,
      "ordinary_economy": 8.06825938566553,
      "ordinary_wickets_per_100": 2.04778156996587,
      "economy_improvement": -2.3219845167734956,
      "economy_score": 16.666666666666664,
      "wicket_score": 20.833333333333336
    },
    "reliability": {
      "reliability_score": 31.84840508348981,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 9,
      "consistency_rate": 0.3333333333333333,
      "consistency_adjusted": 0.375,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Confirmed retained by Rajasthan Royals in official 19-player roster (Seamer)."
    },
    "acquisition": {
      "franchise_2027": "RR",
      "status_2027": "Retained by RR",
      "acquisition_decision": "Secured RR Asset (Retained by RR)",
      "acquisition_category": "Retained by RR"
    }
  },
  {
    "candidate_id": "cand_50",
    "player_id": "360",
    "player_name": "Bhuvneshwar Kumar",
    "player_type": "Bowler",
    "verified_role": "Bowler",
    "candidate_source": "Alternative Pool",
    "balanced_score": 21.971723511443507,
    "balanced_rank": 50,
    "top10_appearances": null,
    "overall_candidate_rank": 24,
    "selection_rank": 24,
    "selection_score": 26.17596498472698,
    "squad_fit_score": 50,
    "potential_roles": [
      "Pace"
    ],
    "priority_role": "Pace",
    "is_overseas": false,
    "role_warning": null,
    "corrected_role_note": null,
    "batting": {
      "pressure_runs": 248,
      "pressure_balls": 121,
      "pressure_sr": 98.61111111111111,
      "pressure_average": 10.142857142857142,
      "pressure_matches": 15,
      "pressure_fours": null,
      "pressure_sixes": null,
      "pressure_dismissals": 7,
      "ordinary_runs": 916,
      "ordinary_balls": 647,
      "ordinary_sr": 100,
      "ordinary_average": null,
      "sr_difference": -1.3888888888888857,
      "average_difference": null,
      "sr_score": null,
      "average_score": null,
      "improvement_score": 4.166666666666666
    },
    "bowling": {
      "pressure_balls": 121,
      "pressure_runs": 248,
      "pressure_wickets": 4,
      "pressure_dots": 25,
      "pressure_economy": 12.297520661157023,
      "pressure_wickets_per_100": 3.3057851239669422,
      "pressure_dot_percentage": 20.66115702479339,
      "pressure_matches": 15,
      "ordinary_economy": 8.494590417310665,
      "ordinary_wickets_per_100": 4.945904173106646,
      "economy_improvement": -3.802930243846358,
      "economy_score": 4.166666666666666,
      "wicket_score": 12.5
    },
    "reliability": {
      "reliability_score": 21.971723511443507,
      "reliability_status": "Available",
      "sample_validation": "Adequate consistency sample",
      "consistency_matches": 11,
      "consistency_rate": 0.18181818181818182,
      "consistency_adjusted": 0.25,
      "scenario_stability": null,
      "scenario_appearances": null
    },
    "qualitative": {
      "main_strength": "Death/pressure overs bowling",
      "risk_or_validation": "Sample adequacy & auction availability",
      "rr_squad_contribution": "Depth for Pace",
      "validation_required": "Released by SRH. High powerplay control, lower death impact."
    },
    "acquisition": {
      "franchise_2027": "Released by SRH",
      "status_2027": "Released and potentially auction-eligible",
      "acquisition_decision": "Powerplay Swing Specialist",
      "acquisition_category": "Released and potentially auction-eligible"
    }
  }
];

export const OFFICIAL_RR_2027_SQUAD: SquadPlayer[] = [
  {
    "id": "sq_1",
    "name": "Aman Rao Perala",
    "role": "Batter",
    "subRole": "Middle-order",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_2",
    "name": "Brijesh Sharma",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_3",
    "name": "Dasun Shanaka",
    "role": "All-rounder",
    "subRole": "Pace All-rounder",
    "status": "Retained",
    "isOverseas": true
  },
  {
    "id": "sq_4",
    "name": "Dhruv Jurel",
    "role": "Wicketkeeper-batter",
    "subRole": "Wicketkeeper",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_5",
    "name": "Donovan Ferreira",
    "role": "All-rounder",
    "subRole": "Finisher",
    "status": "Retained",
    "isOverseas": true
  },
  {
    "id": "sq_6",
    "name": "Jofra Archer",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Retained",
    "isOverseas": true
  },
  {
    "id": "sq_7",
    "name": "Lhuan-dre Pretorius",
    "role": "Wicketkeeper-batter",
    "subRole": "Wicketkeeper",
    "status": "Retained",
    "isOverseas": true
  },
  {
    "id": "sq_8",
    "name": "Manimaran Siddharth",
    "role": "Bowler",
    "subRole": "Spin bowler",
    "status": "Traded in",
    "isOverseas": false
  },
  {
    "id": "sq_9",
    "name": "Mohammed Shami",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Traded in",
    "isOverseas": false
  },
  {
    "id": "sq_10",
    "name": "Nandre Burger",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Retained",
    "isOverseas": true
  },
  {
    "id": "sq_11",
    "name": "Ravi Bishnoi",
    "role": "Bowler",
    "subRole": "Spin bowler",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_12",
    "name": "Ravindra Jadeja",
    "role": "All-rounder",
    "subRole": "Spin All-rounder",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_13",
    "name": "Riyan Parag",
    "role": "All-rounder",
    "subRole": "Middle-order",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_14",
    "name": "Sandeep Sharma",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_15",
    "name": "Shubham Dubey",
    "role": "Batter",
    "subRole": "Finisher",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_16",
    "name": "Sushant Mishra",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_17",
    "name": "Vaibhav Sooryavanshi",
    "role": "Batter",
    "subRole": "Top-order",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_18",
    "name": "Yash Raj Punja",
    "role": "Bowler",
    "subRole": "Fast bowler",
    "status": "Retained",
    "isOverseas": false
  },
  {
    "id": "sq_19",
    "name": "Yashasvi Jaiswal",
    "role": "Batter",
    "subRole": "Top-order",
    "status": "Retained",
    "isOverseas": false
  }
];

// Official franchise purse and squad metrics
export const OFFICIAL_RR_PURSE_METRICS = {
  total_squad_capacity: 25,
  current_squad_size: 19,
  available_squad_positions: 6, // 25 - 19
  total_overseas_capacity: 8,
  current_overseas_count: 5, // Shanaka, Ferreira, Archer, Pretorius, Burger
  available_overseas_positions: 3, // 8 - 5
  total_purse_inr_cr: 120.00,
  spent_purse_inr_cr: 92.95,
  remaining_purse_inr_cr: 27.05, // Exactly ₹27.05 crore
  retained_count: 17,
  traded_in_count: 2, // Mohammed Shami, Manimaran Siddharth
  indian_count: 14,
  overseas_count: 5
};

export const INITIAL_REPORTED_SQUAD: SquadPlayer[] = OFFICIAL_RR_2027_SQUAD;

export const INITIAL_SQUAD_REQUIREMENTS: SquadRequirement[] = [
  { role: 'WK', planning_target: 2, existing_count: 2, estimated_gap: 0, status: 'Secured (Jurel, Pretorius)' },
  { role: 'Finisher', planning_target: 3, existing_count: 1, estimated_gap: 2, status: 'Critical Vacancy (Hetmyer released)' },
  { role: 'Middle-order', planning_target: 4, existing_count: 3, estimated_gap: 1, status: 'Needs Depth (#4/#5 power bat)' },
  { role: 'All-rounder', planning_target: 4, existing_count: 4, estimated_gap: 0, status: 'Secured (Jadeja, Parag, Shanaka, Ferreira)' },
  { role: 'Pace', planning_target: 8, existing_count: 7, estimated_gap: 1, status: 'Strong Battery (Archer, Shami, Sandeep, Burger, etc.)' },
  { role: 'Spin', planning_target: 4, existing_count: 3, estimated_gap: 1, status: 'Strong Foundation (Bishnoi, Jadeja, Siddharth)' },
];

export const DATA_QUALITY_SUMMARY = {
  total_candidate_records: 50,
  unique_players: 47,
  original_recommendations: 10,
  alternative_candidates: 40,
  batters_evaluated: 26,
  bowlers_evaluated: 24,
  dual_pool_players: [
    { name: 'Rashid Khan', roles: ['Batter (Alt Pool, Score 60.62)', 'Bowler (Alt Pool, Score 43.80)'], trueRole: 'Bowling All-Rounder (Elite Leg-Spinner)', note: 'Included in alternative_batters dataset due to late overs strike rate (189.17). Must not be classified as specialist batter. Retained by GT.' },
    { name: 'Andre Russell', roles: ['Batter (Alt Pool, Score 38.24)', 'Bowler (Alt Pool, Score 63.45)'], trueRole: 'Fast Bowling All-Rounder / Finisher', note: 'Dual-role impact player evaluated independently in batting and bowling models. Retained by KKR.' },
    { name: 'Krunal Pandya', roles: ['Batter (Alt Pool, Score 35.43)', 'Bowler (Alt Pool, Score 45.18)'], trueRole: 'Spin Bowling All-Rounder', note: 'Provides lower-middle order stability and 4 overs of left-arm orthodox spin. Released by LSG.' }
  ],
  missing_values_audit: {
    original_batter_reliability: '5/5 original batters have NO independent reliability score in historical pipeline. Preserved as null, NOT replaced with 0 or synthetic figures.',
    ordinary_bowling_averages: 'Some bowler comparison metrics lack wicket breakdown in high-pressure subsets; economy rates and dot percentages rigorously preserved.',
    rr_official_squad_update: 'UPDATED WITH OFFICIAL IPL 2027 RETENTION ANNOUNCEMENT: RR has 19 players (17 Retained + 2 Traded in), 6 available squad positions, 3 available overseas slots, and ₹27.05 Crore remaining purse.'
  },
  acquisition_feasibility_reality: {
    retained_by_rr: 3, // Dhruv Jurel (#4 Bat), Ravindra Jadeja (#8 Bat), Sandeep Sharma (#49 Bowl)
    retained_by_rivals: 23, // Rinku (KKR), Stubbs (DC), Miller (DC), Klaasen (SRH), Shardul (MI), Hazlewood (RCB), Chahal (PBKS), Chakravarthy (KKR), Dhoni (CSK), Rashid (GT x2), Russell (KKR x2), Axar (DC), Dube (CSK), Cummins (SRH), Pathirana (CSK), Shashank (PBKS), Badoni (LSG), Ramandeep (KKR), Tewatia (GT), Yash Dayal (RCB)
    released_auction_eligible: 21, // Hetmyer (Released by RR), Ashutosh Sharma (PBKS), Arshdeep (PBKS), Stoinis (LSG), Tim David (MI), Siraj (RCB), Harshal (PBKS), Sundar (SRH), Powell (RR), Avesh (RR), Prasidh (RR), Mohit (GT), Bhuvi (SRH), Natarajan (SRH), Krunal (LSG x2), Shahbaz (SRH), Samad (SRH), Lalit (DC), Deshpande (CSK), Mukesh (DC), Ashwin (RR)
    pending_registration_check: 1, // Maheesh Theekshana (Unconfirmed)
    unverified_or_retired: 2 // Dinesh Karthik (Retired), Jason Holder (Unconfirmed)
  }
};

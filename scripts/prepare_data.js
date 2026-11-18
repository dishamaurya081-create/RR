const fs = require('fs');
const path = require('path');

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  const h = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    const obj = {};
    h.forEach((col, idx) => {
      obj[col] = vals[idx] !== undefined ? vals[idx].trim() : '';
    });
    rows.push(obj);
  }
  return { headers: h, rows };
}

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

const candCsv = parseCSV(fs.readFileSync('extracted_data/candidate_database.csv', 'utf-8'));
const prioCsv = parseCSV(fs.readFileSync('extracted_data/priority_candidates.csv', 'utf-8'));
const finalValCsv = parseCSV(fs.readFileSync('extracted_data/final_validation.csv', 'utf-8'));
const finalMasterCsv = parseCSV(fs.readFileSync('extracted_data/final_master.csv', 'utf-8'));
const statusDfCsv = parseCSV(fs.readFileSync('extracted_data/status_df.csv', 'utf-8'));
const batShortCsv = parseCSV(fs.readFileSync('extracted_data/batter_shortlist.csv', 'utf-8'));
const bowlShortCsv = parseCSV(fs.readFileSync('extracted_data/bowler_shortlist.csv', 'utf-8'));
const altBatCsv = parseCSV(fs.readFileSync('extracted_data/alternative_batters.csv', 'utf-8'));
const altBowlCsv = parseCSV(fs.readFileSync('extracted_data/alternative_bowlers.csv', 'utf-8'));
const squadReqCsv = parseCSV(fs.readFileSync('extracted_data/squad_requirements.csv', 'utf-8'));
const rrSquad2027Csv = parseCSV(fs.readFileSync('extracted_data/rr_squad_2027.csv', 'utf-8'));
const origVsAltCsv = parseCSV(fs.readFileSync('extracted_data/original_vs_alternative.csv', 'utf-8'));

console.log('Building consolidated candidates...');

// Map all 50 candidates
const candidates = candCsv.rows.map((cand, index) => {
  const name = cand.player_name;
  const type = cand.player_type;
  const isOriginal = cand.candidate_source === 'Original Top 10';
  
  // Find matching row in priority_candidates (matching name AND player_type)
  const prio = prioCsv.rows.find(p => p.player_name === name && p.player_type === type) || {};
  
  // Find matching row in validation and master if original
  const fv = finalValCsv.rows.find(v => v.player_name === name) || {};
  const fm = finalMasterCsv.rows.find(m => m.Player === name) || {};
  const st = statusDfCsv.rows.find(s => s.player_name === name) || {};
  
  // Find batting shortlist data if original batter
  const bShort = batShortCsv.rows.find(b => b.striker_name === name || b.player_name === name) || {};
  // Find bowling shortlist data if original bowler
  const boShort = bowlShortCsv.rows.find(b => b.bowler_name === name || b.player_name === name) || {};
  // Find alternative batter / bowler
  const aBat = altBatCsv.rows.find(b => b.player_name === name) || {};
  const aBowl = altBowlCsv.rows.find(b => b.player_name === name) || {};

  // Numeric parse helper
  const numOrNull = (val) => {
    if (val === undefined || val === null || val === '') return null;
    const n = parseFloat(val);
    return isNaN(n) ? null : n;
  };

  // Determine potential roles
  let potentialRoles = [];
  if (prio.potential_roles) {
    try {
      potentialRoles = JSON.parse(prio.potential_roles.replace(/'/g, '"'));
    } catch {
      potentialRoles = [prio.priority_role || fv.potential_role || (type === 'Batter' ? 'Batter' : 'Bowler')];
    }
  } else if (fv.potential_role) {
    potentialRoles = [fv.potential_role];
  } else {
    potentialRoles = [type === 'Batter' ? 'Middle-order' : 'Pace'];
  }

  // Overseas player list
  const overseasPlayers = [
    'Tristan Stubbs', 'David Miller', 'Heinrich Klaasen', 'Josh Hazlewood', 'Maheesh Theekshana',
    'Andre Russell', 'Marcus Stoinis', 'Tim David', 'Rovman Powell', 'Jason Holder',
    'Matheesha Pathirana', 'Patrick Cummins', 'Rashid Khan', 'Dasun Shanaka', 'Donovan Ferreira',
    'Lhuan-dre Pretorius', 'Nandre Burger', 'Jofra Archer'
  ];
  const isOverseas = overseasPlayers.includes(name);

  // Classification notes and role warning flags
  let roleWarning = null;
  let correctedRoleNote = null;
  let verifiedRole = type;

  if (name === 'Rashid Khan') {
    if (type === 'Batter') {
      roleWarning = 'Dataset Inconsistency / Role Warning: Classified as Batter due to inclusion in alternative_batters dataset (death overs SR 189.2), but primary world-class role is Elite Leg-Spinner / Bowling All-Rounder.';
      correctedRoleNote = 'Dual-pool entry: Batting stats reflect high-pressure finishing (SR 189.2, Avg 32.4). True role: Spin Bowler / Bowling All-Rounder.';
      verifiedRole = 'Bowling All-Rounder (Spin)';
    } else {
      verifiedRole = 'Leg-Spin Bowler / All-Rounder';
      correctedRoleNote = 'Primary bowling entry: Pressure economy 10.18, 9 pressure wickets, 35.4% dots.';
    }
  } else if (name === 'Andre Russell') {
    roleWarning = 'Dual Pool Entry: Evaluated independently in both Batter and Bowler candidate pools.';
    correctedRoleNote = 'Pace-Bowling All-Rounder / Power Finisher.';
    verifiedRole = 'All-Rounder (Pace / Finisher)';
  } else if (name === 'Krunal Pandya') {
    roleWarning = 'Dual Pool Entry: Evaluated independently in both Batter and Bowler candidate pools.';
    correctedRoleNote = 'Spin-Bowling All-Rounder / Middle-order.';
    verifiedRole = 'All-Rounder (Spin)';
  } else if (name === 'Shardul Thakur') {
    roleWarning = 'Role Classification Note: Evaluated in Bowler pool (#1 balanced score 75.59), also provides valuable lower-order batting.';
    verifiedRole = 'Bowling All-Rounder (Pace)';
  } else if (name === 'Ravindra Jadeja') {
    roleWarning = 'Role Classification Note: Evaluated in Batter pool (#8 balanced score 61.70), but world-renowned as Premier All-Rounder (Left-arm spin).';
    verifiedRole = 'Premier All-Rounder (Spin)';
  } else if (name === 'Axar Patel' || name === 'Washington Sundar' || name === 'Marcus Stoinis' || name === 'Shahbaz Ahmed' || name === 'Lalit Yadav' || name === 'Rahul Tewatia') {
    verifiedRole = 'All-Rounder';
  } else if (name === 'Heinrich Klaasen' || name === 'Dhruv Jurel' || name === 'Dinesh Karthik' || name === 'Mahendra Singh Dhoni') {
    verifiedRole = 'Wicketkeeper-Batter';
  }

  // Pressure & Ordinary Batting Stats
  const pressureRunsBat = numOrNull(cand.pressure_runs || prio.pressure_runs || bShort.runs_pressure || aBat.pressure_runs);
  const pressureBallsBat = numOrNull(cand.pressure_balls || prio.pressure_balls || bShort.balls_pressure || aBat.pressure_balls);
  const pressureSrBat = numOrNull(cand.pressure_sr || prio.pressure_sr || bShort.strike_rate_pressure || aBat.pressure_sr);
  const pressureAvgBat = numOrNull(cand.pressure_average || prio.pressure_average || bShort.average_pressure || aBat.pressure_average);
  const pressureMatchesBat = numOrNull(cand.pressure_matches || prio.pressure_matches || bShort.matches_pressure || aBat.pressure_matches);
  const pressureFoursBat = numOrNull(cand.pressure_fours || prio.pressure_fours || aBat.pressure_fours);
  const pressureSixesBat = numOrNull(cand.pressure_sixes || prio.pressure_sixes || aBat.pressure_sixes);
  const pressureDismissalsBat = numOrNull(cand.pressure_dismissals || prio.pressure_dismissals || bShort.dismissals_pressure || aBat.pressure_dismissals);

  const ordinaryRunsBat = numOrNull(cand.ordinary_runs || prio.ordinary_runs || bShort.runs_ordinary || aBat.ordinary_runs);
  const ordinaryBallsBat = numOrNull(cand.ordinary_balls || prio.ordinary_balls || bShort.balls_ordinary || aBat.ordinary_balls);
  const ordinarySrBat = numOrNull(cand.ordinary_sr || prio.ordinary_sr || bShort.strike_rate_ordinary || aBat.ordinary_sr);
  const ordinaryAvgBat = numOrNull(cand.ordinary_average || prio.ordinary_average || bShort.average_ordinary || aBat.ordinary_average);

  // Pressure & Ordinary Bowling Stats
  const pressureBallsBowl = numOrNull(cand.pressure_balls || prio.pressure_balls || boShort.legal_balls_pressure || aBowl.pressure_balls);
  const pressureRunsBowl = numOrNull(cand.pressure_runs || prio.pressure_runs || boShort.runs_conceded_pressure || aBowl.pressure_runs);
  const pressureWicketsBowl = numOrNull(cand.pressure_wickets || prio.pressure_wickets || boShort.wickets_pressure || aBowl.pressure_wickets);
  const pressureDotsBowl = numOrNull(cand.pressure_dots || prio.pressure_dots || boShort.dot_balls_pressure || aBowl.pressure_dots);
  const pressureEconBowl = numOrNull(cand.pressure_economy || prio.pressure_economy || (boShort.runs_conceded_pressure && boShort.legal_balls_pressure ? (parseFloat(boShort.runs_conceded_pressure) / (parseFloat(boShort.legal_balls_pressure)/6)) : null) || aBowl.pressure_economy);
  const pressureWktsPer100Bowl = numOrNull(cand.pressure_wickets_per_100 || prio.pressure_wickets_per_100 || (boShort.wickets_pressure && boShort.legal_balls_pressure ? (parseFloat(boShort.wickets_pressure) / parseFloat(boShort.legal_balls_pressure) * 100) : null) || aBowl.pressure_wickets_per_100);
  const pressureDotPctBowl = numOrNull(cand.pressure_dot_percentage || prio.pressure_dot_percentage || (boShort.dot_balls_pressure && boShort.legal_balls_pressure ? (parseFloat(boShort.dot_balls_pressure) / parseFloat(boShort.legal_balls_pressure) * 100) : null) || aBowl.pressure_dot_percentage);
  const pressureMatchesBowl = numOrNull(cand.pressure_matches || prio.pressure_matches || boShort.matches_pressure || aBowl.pressure_matches);

  const ordinaryEconBowl = numOrNull(cand.ordinary_economy || prio.ordinary_economy || boShort.economy_ordinary || aBowl.ordinary_economy);
  const ordinaryWktsPer100Bowl = numOrNull(cand.ordinary_wickets_per_100 || prio.ordinary_wickets_per_100 || aBowl.ordinary_wickets_per_100);

  // Reliability & Consistency
  const rawRelScore = numOrNull(prio.reliability_score || cand.reliability_score || (isOriginal ? null : aBat.reliability_score || aBowl.reliability_score));
  const relStatus = prio.reliability_status || (rawRelScore !== null ? 'Available' : 'Not independently available');
  const sampleValidation = prio.sample_validation || (isOriginal ? 'Needs sample validation' : 'Adequate consistency sample');
  const consistencyMatches = numOrNull(cand.consistency_matches || prio.consistency_matches || aBat.consistency_matches || aBowl.consistency_matches);
  const consistencyRate = numOrNull(cand.consistency_rate || prio.consistency_rate || aBat.consistency_rate || aBowl.consistency_rate);
  const consistencyAdjusted = numOrNull(cand.consistency_adjusted || prio.consistency_adjusted || aBat.consistency_adjusted || aBowl.consistency_adjusted);

  // Franchise & 2027 Acquisition Status
  let franchise2027 = st['2027_franchise'] || 'Unconfirmed — verification required';
  let status2027 = st['2027_status'] || 'Auction Candidate (Tentative)';
  let acqDecision = st.acquisition_decision || (isOriginal ? 'Not available at auction' : 'Strong alternative candidate');
  let acqCategory = fv.acquisition_category || (status2027 === 'Retained' ? 'Unavailable - retained elsewhere' : 'Target for auction');

  // For alternative candidates, assign grounded real-world IPL status:
  if (!isOriginal) {
    if (name === 'Mahendra Singh Dhoni') {
      franchise2027 = 'CSK';
      status2027 = 'Retained / Player Decision';
      acqDecision = 'Unavailable — Franchise icon';
      acqCategory = 'Unavailable - retained elsewhere';
    } else if (name === 'Shimron Hetmyer') {
      franchise2027 = 'RR';
      status2027 = 'Retained (Existing RR squad)';
      acqDecision = 'Existing RR squad asset';
      acqCategory = 'Internal RR asset';
    } else if (name === 'Ravindra Jadeja') {
      franchise2027 = 'CSK / RR';
      status2027 = 'Reported in squad pool / Trade candidate';
      acqDecision = 'High priority if available';
      acqCategory = 'Priority target';
    } else if (name === 'Rashid Khan') {
      franchise2027 = 'GT';
      status2027 = 'Retained - Gujarat Titans';
      acqDecision = 'Unavailable at auction (GT Cornerstone)';
      acqCategory = 'Unavailable - retained elsewhere';
    } else if (name === 'Ashutosh Sharma') {
      franchise2027 = 'PBKS / Auction';
      status2027 = 'Auction candidate';
      acqDecision = 'Strong alternative target';
      acqCategory = 'Target for auction';
    } else if (name === 'Andre Russell') {
      franchise2027 = 'KKR';
      status2027 = 'Retained - KKR';
      acqDecision = 'Unavailable at auction';
      acqCategory = 'Unavailable - retained elsewhere';
    } else if (name === 'Patrick Cummins') {
      franchise2027 = 'SRH';
      status2027 = 'Retained - SRH Captain';
      acqDecision = 'Unavailable at auction';
      acqCategory = 'Unavailable - retained elsewhere';
    } else if (name === 'Arshdeep Singh') {
      franchise2027 = 'PBKS / Auction';
      status2027 = 'High-value auction / RTM candidate';
      acqDecision = 'Priority target if entering auction';
      acqCategory = 'Priority target';
    } else if (name === 'Sandeep Sharma') {
      franchise2027 = 'RR';
      status2027 = 'Retained (RR Uncapped/Core Seamer)';
      acqDecision = 'Existing RR squad asset';
      acqCategory = 'Internal RR asset';
    } else {
      franchise2027 = 'Unconfirmed — verification required';
      status2027 = 'Auction candidate';
      acqDecision = numOrNull(cand.balanced_score) > 55 ? 'Strong alternative' : 'Backup option';
      acqCategory = 'Target for auction';
    }
  }

  return {
    candidate_id: `cand_${index + 1}`,
    player_id: cand.player_id,
    player_name: name,
    player_type: type,
    verified_role: verifiedRole,
    candidate_source: cand.candidate_source,
    balanced_score: numOrNull(cand.balanced_score),
    balanced_rank: numOrNull(cand.balanced_rank || (index + 1)),
    top10_appearances: numOrNull(cand.top10_appearances),
    overall_candidate_rank: numOrNull(cand.overall_candidate_rank || prio.overall_candidate_rank || (index + 1)),
    selection_rank: numOrNull(prio.selection_rank),
    selection_score: numOrNull(prio.selection_score),
    squad_fit_score: numOrNull(prio.squad_fit_score) || 50.0,
    potential_roles: potentialRoles,
    priority_role: prio.priority_role || potentialRoles[0] || type,
    is_overseas: isOverseas,
    role_warning: roleWarning,
    corrected_role_note: correctedRoleNote,
    
    // Batting stats
    batting: {
      pressure_runs: pressureRunsBat,
      pressure_balls: pressureBallsBat,
      pressure_sr: pressureSrBat,
      pressure_average: pressureAvgBat,
      pressure_matches: pressureMatchesBat,
      pressure_fours: pressureFoursBat,
      pressure_sixes: pressureSixesBat,
      pressure_dismissals: pressureDismissalsBat,
      ordinary_runs: ordinaryRunsBat,
      ordinary_balls: ordinaryBallsBat,
      ordinary_sr: ordinarySrBat,
      ordinary_average: ordinaryAvgBat,
      sr_difference: numOrNull(cand.sr_difference || (pressureSrBat && ordinarySrBat ? pressureSrBat - ordinarySrBat : null)),
      average_difference: numOrNull(bShort.pressure_average_difference || (pressureAvgBat && ordinaryAvgBat ? pressureAvgBat - ordinaryAvgBat : null)),
      sr_score: numOrNull(cand.sr_score || aBat.sr_score),
      average_score: numOrNull(cand.average_score || aBat.average_score),
      improvement_score: numOrNull(cand.improvement_score || aBat.improvement_score)
    },

    // Bowling stats
    bowling: {
      pressure_balls: pressureBallsBowl,
      pressure_runs: pressureRunsBowl,
      pressure_wickets: pressureWicketsBowl,
      pressure_dots: pressureDotsBowl,
      pressure_economy: pressureEconBowl,
      pressure_wickets_per_100: pressureWktsPer100Bowl,
      pressure_dot_percentage: pressureDotPctBowl,
      pressure_matches: pressureMatchesBowl,
      ordinary_economy: ordinaryEconBowl,
      ordinary_wickets_per_100: ordinaryWktsPer100Bowl,
      economy_improvement: numOrNull(cand.economy_improvement || aBowl.economy_improvement || (ordinaryEconBowl && pressureEconBowl ? ordinaryEconBowl - pressureEconBowl : null)),
      economy_score: numOrNull(cand.economy_score || aBowl.economy_score),
      wicket_score: numOrNull(cand.wicket_score || aBowl.wicket_score)
    },

    // Reliability & Consistency
    reliability: {
      reliability_score: rawRelScore,
      reliability_status: relStatus,
      sample_validation: sampleValidation,
      consistency_matches: consistencyMatches,
      consistency_rate: consistencyRate,
      consistency_adjusted: consistencyAdjusted,
      scenario_stability: fm.Scenario_Stability || (isOriginal ? '3/3' : null),
      scenario_appearances: numOrNull(fm.Scenario_Appearances || cand.top10_appearances)
    },

    // Qualitative & Acquisition
    qualitative: {
      main_strength: fm.Main_Strength || (type === 'Batter' ? 'High pressure strike rate' : 'Death/pressure overs bowling'),
      risk_or_validation: fm.Risk_or_Validation || fv.validation_required || 'Sample adequacy & auction availability',
      rr_squad_contribution: fv.RR_squad_contribution || `Depth for ${prio.priority_role || type}`,
      validation_required: fv.validation_required || prio.sample_validation || 'Check auction list'
    },

    acquisition: {
      franchise_2027: franchise2027,
      status_2027: status2027,
      acquisition_decision: acqDecision,
      acquisition_category: acqCategory
    }
  };
});

console.log(`Generated ${candidates.length} processed candidate records.`);

// Save test output
fs.writeFileSync('scripts/processed_candidates.json', JSON.stringify(candidates, null, 2));
console.log('Saved to scripts/processed_candidates.json');


const fs = require('fs');

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

const numOrNull = (val) => {
  if (val === undefined || val === null || val === '') return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
};

const overseasPlayers = [
  'Tristan Stubbs', 'David Miller', 'Heinrich Klaasen', 'Josh Hazlewood', 'Maheesh Theekshana',
  'Andre Russell', 'Marcus Stoinis', 'Tim David', 'Rovman Powell', 'Jason Holder',
  'Matheesha Pathirana', 'Patrick Cummins', 'Rashid Khan', 'Dasun Shanaka', 'Donovan Ferreira',
  'Lhuan-dre Pretorius', 'Nandre Burger', 'Jofra Archer'
];

function getOfficialAcquisitionStatus(name, type, isOriginal) {
  if (name === 'Rinku Singh') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'KKR',
      decision: 'Unavailable at auction (Retained by KKR)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Kolkata Knight Riders for IPL 2027.'
    };
  }
  if (name === 'Varun Chakravarthy') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'KKR',
      decision: 'Unavailable at auction (Retained by KKR)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Kolkata Knight Riders for IPL 2027.'
    };
  }
  if (name === 'Tristan Stubbs') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'DC',
      decision: 'Unavailable at auction (Retained by DC)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Delhi Capitals for IPL 2027.'
    };
  }
  if (name === 'David Miller') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'DC',
      decision: 'Unavailable at auction (Retained by DC)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Delhi Capitals for IPL 2027.'
    };
  }
  if (name === 'Heinrich Klaasen') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'SRH',
      decision: 'Unavailable at auction (Retained by SRH)',
      category: 'Retained by another franchise',
      notes: 'Confirmed top retention by Sunrisers Hyderabad for IPL 2027.'
    };
  }
  if (name === 'Dhruv Jurel') {
    return {
      status_2027: 'Retained by RR',
      franchise_2027: 'RR',
      decision: 'Secured RR Asset (Retained by RR)',
      category: 'Retained by RR',
      notes: 'Confirmed retained by Rajasthan Royals in official 19-player roster.'
    };
  }
  if (name === 'Ravindra Jadeja') {
    return {
      status_2027: 'Retained by RR',
      franchise_2027: 'RR',
      decision: 'Secured RR Asset (Retained by RR)',
      category: 'Retained by RR',
      notes: 'Confirmed retained by Rajasthan Royals in official 19-player roster (All-rounder).'
    };
  }
  if (name === 'Sandeep Sharma') {
    return {
      status_2027: 'Retained by RR',
      franchise_2027: 'RR',
      decision: 'Secured RR Asset (Retained by RR)',
      category: 'Retained by RR',
      notes: 'Confirmed retained by Rajasthan Royals in official 19-player roster (Seamer).'
    };
  }
  if (name === 'Shimron Hetmyer') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by RR',
      decision: 'Priority Auction Re-acquisition / RTM Target',
      category: 'Released and potentially auction-eligible',
      notes: 'Officially released by Rajasthan Royals ahead of 2027 auction. Prime candidate to re-acquire for death-overs finishing.'
    };
  }
  if (name === 'Josh Hazlewood') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'RCB',
      decision: 'Unavailable at auction (Retained by RCB)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Royal Challengers Bengaluru for IPL 2027.'
    };
  }
  if (name === 'Yuzvendra Chahal') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'PBKS',
      decision: 'Unavailable at auction (Retained by PBKS)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Punjab Kings for IPL 2027.'
    };
  }
  if (name === 'Shardul Thakur') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'MI',
      decision: 'Unavailable at auction (Retained by MI)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Mumbai Indians as seam all-rounder.'
    };
  }
  if (name === 'Maheesh Theekshana') {
    return {
      status_2027: 'Pending auction registration verification',
      franchise_2027: 'Unconfirmed',
      decision: 'Monitor Final Auction Registration Register',
      category: 'Pending auction registration verification',
      notes: 'Registration on final overseas auction register pending official BCCI confirmation.'
    };
  }

  // Alternatives - Retained elsewhere
  if (name === 'Mahendra Singh Dhoni') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'CSK',
      decision: 'Unavailable at auction (CSK Retention/Icon)',
      category: 'Retained by another franchise',
      notes: 'Retained by Chennai Super Kings as uncapped/player retention.'
    };
  }
  if (name === 'Rashid Khan') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'GT',
      decision: 'Unavailable at auction (GT Cornerstone)',
      category: 'Retained by another franchise',
      notes: 'Confirmed top retention by Gujarat Titans. Dual entry retained for data integrity.'
    };
  }
  if (name === 'Andre Russell') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'KKR',
      decision: 'Unavailable at auction (KKR Core Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Kolkata Knight Riders. Dual entry retained for data integrity.'
    };
  }
  if (name === 'Axar Patel') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'DC',
      decision: 'Unavailable at auction (DC Core Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed top retention by Delhi Capitals.'
    };
  }
  if (name === 'Shivam Dube') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'CSK',
      decision: 'Unavailable at auction (CSK Core Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Chennai Super Kings.'
    };
  }
  if (name === 'Patrick Cummins') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'SRH',
      decision: 'Unavailable at auction (SRH Captain)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Sunrisers Hyderabad as captain.'
    };
  }
  if (name === 'Matheesha Pathirana') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'CSK',
      decision: 'Unavailable at auction (CSK Death Specialist)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Chennai Super Kings.'
    };
  }
  if (name === 'Shashank Singh') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'PBKS',
      decision: 'Unavailable at auction (PBKS Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Punjab Kings as finishing specialist.'
    };
  }
  if (name === 'Ayush Badoni') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'LSG',
      decision: 'Unavailable at auction (LSG Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Lucknow Super Giants.'
    };
  }
  if (name === 'Ramandeep Singh') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'KKR',
      decision: 'Unavailable at auction (KKR Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Kolkata Knight Riders.'
    };
  }
  if (name === 'Rahul Tewatia') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'GT',
      decision: 'Unavailable at auction (GT Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Gujarat Titans.'
    };
  }
  if (name === 'Yash Dayal') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'RCB',
      decision: 'Unavailable at auction (RCB Retention)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Royal Challengers Bengaluru.'
    };
  }

  // Released / Potentially auction-eligible alternatives
  if (name === 'Ashutosh Sharma') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by PBKS',
      decision: 'Top Priority Target for Finishing Vacancy',
      category: 'Released and potentially auction-eligible',
      notes: 'Released into 2027 auction pool. Prime target to solve RR finishing vacancy (SR 178.6).'
    };
  }
  if (name === 'Arshdeep Singh') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by PBKS',
      decision: 'Marquee Indian Pace Target (RTM Contested)',
      category: 'Released and potentially auction-eligible',
      notes: 'Enters mega-auction pool. Premier Indian left-arm death specialist (Econ 8.78).'
    };
  }
  if (name === 'Marcus Stoinis') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by LSG',
      decision: 'Strong Overseas Power Option (3 OS Slots Open)',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by LSG. Potentially eligible for overseas all-rounder slot (3 overseas slots open).'
    };
  }
  if (name === 'Tim David') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by MI',
      decision: 'Strong Alternative Finisher Option',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by Mumbai Indians. Power hitting overseas death candidate.'
    };
  }
  if (name === 'Mohammed Siraj') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by RCB',
      decision: 'Backup Domestic Pace Target',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by RCB. High experience Indian strike pace option.'
    };
  }
  if (name === 'Harshal Patel') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by PBKS',
      decision: 'Death Overs Slower-Ball Specialist',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by PBKS. IPL purple cap pedigree in death overs containment.'
    };
  }
  if (name === 'Washington Sundar') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by SRH',
      decision: 'Off-Spin & Batting Depth Target',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by SRH. Complementary domestic spin bowling all-rounder.'
    };
  }
  if (name === 'Rovman Powell') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by RR',
      decision: 'Backup Overseas Power Finisher',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by RR. Familiar with franchise setup; possible backup overseas buy.'
    };
  }
  if (name === 'Avesh Khan') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by RR',
      decision: 'Potential Re-acquisition Pace Target',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by RR. Known commodity in death bowling.'
    };
  }
  if (name === 'Prasidh Krishna') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by RR',
      decision: 'Injury-Vetted Pace Candidate',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by RR. Fitness and workload require verification.'
    };
  }
  if (name === 'Mohit Sharma') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by GT',
      decision: 'Experienced Slower-Ball Specialist',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by GT. Veteran death overs back-of-the-hand slower ball bowler.'
    };
  }
  if (name === 'Bhuvneshwar Kumar') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by SRH',
      decision: 'Powerplay Swing Specialist',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by SRH. High powerplay control, lower death impact.'
    };
  }
  if (name === 'T Natarajan') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by SRH',
      decision: 'Yorker Specialist Target',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by SRH. Left-arm pinpoint yorker execution.'
    };
  }
  if (name === 'Krunal Pandya') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by LSG',
      decision: 'Domestic Spin All-Rounder Option',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by LSG. Evaluated in both pools; middle order control.'
    };
  }
  if (name === 'Shahbaz Ahmed') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by SRH',
      decision: 'Backup Spin All-Rounder',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by SRH. Left-arm orthodox spin & lower-middle batting.'
    };
  }
  if (name === 'Abdul Samad') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by SRH',
      decision: 'Domestic Finisher Backup',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by SRH. Raw power hitting in late overs.'
    };
  }
  if (name === 'Lalit Yadav') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by DC',
      decision: 'Domestic Utility Backup',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by DC. Utility off-spin and lower order support.'
    };
  }
  if (name === 'Tushar Deshpande') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by CSK',
      decision: 'Domestic Pace Squad Depth',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by CSK. Aggressive wicket-taking seam option.'
    };
  }
  if (name === 'Mukesh Kumar') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by DC',
      decision: 'Domestic Seam Backup',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by DC. Seam and blockhole accuracy.'
    };
  }
  if (name === 'Ravichandran Ashwin') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by RR',
      decision: 'Tactical Veteran Re-acquisition Check',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by RR. Off-spin maestro and tactical squad mentor.'
    };
  }

  if (name === 'Dinesh Karthik') {
    return {
      status_2027: 'Auction eligibility unverified',
      franchise_2027: 'Retired / RCB Mentor',
      decision: 'Not Recommended (Retired from IPL)',
      category: 'Auction eligibility unverified',
      notes: 'Announced IPL retirement following 2024 season; serving in mentorship role.'
    };
  }
  if (name === 'Jason Holder') {
    return {
      status_2027: 'Auction eligibility unverified',
      franchise_2027: 'Overseas - Unconfirmed',
      decision: 'Verify Auction Registration',
      category: 'Auction eligibility unverified',
      notes: 'Overseas participation and auction registration status requires independent confirmation.'
    };
  }

  return {
    status_2027: 'Auction eligibility unverified',
    franchise_2027: 'Unconfirmed',
    decision: 'Further Evaluation',
    category: 'Auction eligibility unverified',
    notes: 'Verify registration on final BCCI auction list.'
  };
}

const candidates = candCsv.rows.map((cand, index) => {
  const name = cand.player_name;
  const type = cand.player_type;
  const isOriginal = cand.candidate_source === 'Original Top 10';
  
  const prio = prioCsv.rows.find(p => p.player_name === name && p.player_type === type) || {};
  const fv = finalValCsv.rows.find(v => v.player_name === name) || {};
  const fm = finalMasterCsv.rows.find(m => m.Player === name) || {};
  
  const bShort = batShortCsv.rows.find(b => b.striker_name === name || b.player_name === name) || {};
  const boShort = bowlShortCsv.rows.find(b => b.bowler_name === name || b.player_name === name) || {};
  const aBat = altBatCsv.rows.find(b => b.player_name === name) || {};
  const aBowl = altBowlCsv.rows.find(b => b.player_name === name) || {};

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

  const isOverseas = overseasPlayers.includes(name);

  let roleWarning = null;
  let correctedRoleNote = null;
  let verifiedRole = type;

  if (name === 'Rashid Khan') {
    if (type === 'Batter') {
      roleWarning = 'Dataset Inconsistency / Role Warning: Candidate appears in alternative_batters dataset due to late-overs finishing metrics (SR 189.17), but actual real-world primary role is Elite Leg-Spinner / Bowling All-Rounder.';
      correctedRoleNote = 'Dual-role entry preserved from dataset: Evaluated on high-pressure lower-order batting (SR 189.17, Avg 32.43). Real-world identity: World-class Spin Bowler & All-Rounder.';
      verifiedRole = 'Bowling All-Rounder (Spin)';
    } else {
      verifiedRole = 'Leg-Spin Bowler / All-Rounder';
      correctedRoleNote = 'Primary bowling entry: 9 pressure wickets, economy 10.18, 35.4% dot balls.';
    }
  } else if (name === 'Andre Russell') {
    roleWarning = 'Dual-Pool Candidate: Present in both Batter and Bowler alternative evaluation pools.';
    correctedRoleNote = 'Pace-Bowling All-Rounder & Death Finisher. Impactful with both bat and ball.';
    verifiedRole = 'All-Rounder (Pace / Finisher)';
  } else if (name === 'Krunal Pandya') {
    roleWarning = 'Dual-Pool Candidate: Present in both Batter and Bowler alternative evaluation pools.';
    correctedRoleNote = 'Spin-Bowling All-Rounder / Middle-order.';
    verifiedRole = 'All-Rounder (Spin)';
  } else if (name === 'Shardul Thakur') {
    roleWarning = 'Role Classification Note: Evaluated in Bowler pool (#1 balanced score 75.59), also provides valuable lower-order batting.';
    verifiedRole = 'Bowling All-Rounder (Pace)';
  } else if (name === 'Ravindra Jadeja') {
    roleWarning = 'Role Classification Note: Evaluated in Batter pool (#8 balanced score 61.70), premier Left-arm Spin All-Rounder retained by RR.';
    verifiedRole = 'Premier All-Rounder (Spin)';
  } else if (['Axar Patel', 'Washington Sundar', 'Marcus Stoinis', 'Shahbaz Ahmed', 'Lalit Yadav', 'Rahul Tewatia', 'Jason Holder'].includes(name)) {
    verifiedRole = 'All-Rounder';
  } else if (['Heinrich Klaasen', 'Dhruv Jurel', 'Dinesh Karthik', 'Mahendra Singh Dhoni'].includes(name)) {
    verifiedRole = 'Wicketkeeper-Batter';
  }

  // Batting stats
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

  // Bowling stats
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
  // Rule: Do not treat missing reliability scores as zero. Do not calculate fake reliability scores.
  const rawRelScore = numOrNull(prio.reliability_score || cand.reliability_score || (isOriginal ? null : aBat.reliability_score || aBowl.reliability_score));
  const relStatus = prio.reliability_status || (rawRelScore !== null ? 'Available' : 'Not independently available');
  const sampleValidation = prio.sample_validation || (isOriginal ? 'Needs sample validation' : 'Adequate consistency sample');
  const consistencyMatches = numOrNull(cand.consistency_matches || prio.consistency_matches || aBat.consistency_matches || aBowl.consistency_matches);
  const consistencyRate = numOrNull(cand.consistency_rate || prio.consistency_rate || aBat.consistency_rate || aBowl.consistency_rate);
  const consistencyAdjusted = numOrNull(cand.consistency_adjusted || prio.consistency_adjusted || aBat.consistency_adjusted || aBowl.consistency_adjusted);

  // Official Acquisition Status
  const officialStatus = getOfficialAcquisitionStatus(name, type, isOriginal);

  return {
    candidate_id: `cand_${index + 1}`,
    player_id: cand.player_id,
    player_name: name,
    player_type: type,
    verified_role: verifiedRole,
    candidate_source: cand.candidate_source,
    balanced_score: numOrNull(cand.balanced_score) || 0,
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

    qualitative: {
      main_strength: fm.Main_Strength || (type === 'Batter' ? 'High pressure strike rate' : 'Death/pressure overs bowling'),
      risk_or_validation: fm.Risk_or_Validation || fv.validation_required || 'Sample adequacy & auction availability',
      rr_squad_contribution: fv.RR_squad_contribution || `Depth for ${prio.priority_role || type}`,
      validation_required: officialStatus.notes
    },

    acquisition: {
      franchise_2027: officialStatus.franchise_2027,
      status_2027: officialStatus.status_2027,
      acquisition_decision: officialStatus.decision,
      acquisition_category: officialStatus.category
    }
  };
});

// Official 19-player squad based on official IPL 2027 retention announcement:
// https://www.iplt20.com/news/article/tata-ipl-2027-player-retentions-announced
const officialRRSquad = [
  { id: 'sq_1', name: 'Aman Rao Perala', role: 'Batter', subRole: 'Middle-order', status: 'Retained', isOverseas: false },
  { id: 'sq_2', name: 'Brijesh Sharma', role: 'Bowler', subRole: 'Fast bowler', status: 'Retained', isOverseas: false },
  { id: 'sq_3', name: 'Dasun Shanaka', role: 'All-rounder', subRole: 'Pace All-rounder', status: 'Retained', isOverseas: true },
  { id: 'sq_4', name: 'Dhruv Jurel', role: 'Wicketkeeper-batter', subRole: 'Wicketkeeper', status: 'Retained', isOverseas: false },
  { id: 'sq_5', name: 'Donovan Ferreira', role: 'All-rounder', subRole: 'Finisher', status: 'Retained', isOverseas: true },
  { id: 'sq_6', name: 'Jofra Archer', role: 'Bowler', subRole: 'Fast bowler', status: 'Retained', isOverseas: true },
  { id: 'sq_7', name: 'Lhuan-dre Pretorius', role: 'Wicketkeeper-batter', subRole: 'Wicketkeeper', status: 'Retained', isOverseas: true },
  { id: 'sq_8', name: 'Manimaran Siddharth', role: 'Bowler', subRole: 'Spin bowler', status: 'Traded in', isOverseas: false },
  { id: 'sq_9', name: 'Mohammed Shami', role: 'Bowler', subRole: 'Fast bowler', status: 'Traded in', isOverseas: false },
  { id: 'sq_10', name: 'Nandre Burger', role: 'Bowler', subRole: 'Fast bowler', status: 'Retained', isOverseas: true },
  { id: 'sq_11', name: 'Ravi Bishnoi', role: 'Bowler', subRole: 'Spin bowler', status: 'Retained', isOverseas: false },
  { id: 'sq_12', name: 'Ravindra Jadeja', role: 'All-rounder', subRole: 'Spin All-rounder', status: 'Retained', isOverseas: false },
  { id: 'sq_13', name: 'Riyan Parag', role: 'All-rounder', subRole: 'Middle-order', status: 'Retained', isOverseas: false },
  { id: 'sq_14', name: 'Sandeep Sharma', role: 'Bowler', subRole: 'Fast bowler', status: 'Retained', isOverseas: false },
  { id: 'sq_15', name: 'Shubham Dubey', role: 'Batter', subRole: 'Finisher', status: 'Retained', isOverseas: false },
  { id: 'sq_16', name: 'Sushant Mishra', role: 'Bowler', subRole: 'Fast bowler', status: 'Retained', isOverseas: false },
  { id: 'sq_17', name: 'Vaibhav Sooryavanshi', role: 'Batter', subRole: 'Top-order', status: 'Retained', isOverseas: false },
  { id: 'sq_18', name: 'Yash Raj Punja', role: 'Bowler', subRole: 'Fast bowler', status: 'Retained', isOverseas: false },
  { id: 'sq_19', name: 'Yashasvi Jaiswal', role: 'Batter', subRole: 'Top-order', status: 'Retained', isOverseas: false },
];

const tsContent = `// SupeRR Selector — Rajasthan Royals 2027 Acquisition Intelligence Data
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

export const CANDIDATES: Candidate[] = ${JSON.stringify(candidates, null, 2)};

export const OFFICIAL_RR_2027_SQUAD: SquadPlayer[] = ${JSON.stringify(officialRRSquad, null, 2)};

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
`;

fs.writeFileSync('app/src/data/intelligenceData.ts', tsContent);
console.log('Successfully updated app/src/data/intelligenceData.ts with official IPL 2027 retentions');

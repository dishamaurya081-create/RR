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

// Official 2027 Status mapping based on official IPL 2027 retentions
function getOfficialAcquisitionStatus(name, type, isOriginal) {
  // Pay particular attention to requested players:
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
      decision: 'Auction Target / Potential RTM candidate',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by Rajasthan Royals ahead of 2027 mega-auction. High priority finishing re-acquisition target.'
    };
  }
  if (name === 'Josh Hazlewood') {
    return {
      status_2027: 'Retained by another franchise',
      franchise_2027: 'RCB',
      decision: 'Unavailable at auction (Retained by RCB)',
      category: 'Retained by another franchise',
      notes: 'Confirmed retained by Royal Challengers Bengaluru.'
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
      decision: 'Monitor Auction Registration Register',
      category: 'Pending auction registration verification',
      notes: 'Auction eligibility unconfirmed; monitor final overseas player auction registration list.'
    };
  }

  // Other Candidates (Alternatives)
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

  // Released / Potentially auction eligible
  if (name === 'Ashutosh Sharma') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by PBKS',
      decision: 'Priority Target for Finishing Gap',
      category: 'Released and potentially auction-eligible',
      notes: 'Released into 2027 auction pool. Prime target to solve RR finishing vacancy (SR 178.6).'
    };
  }
  if (name === 'Arshdeep Singh') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by PBKS',
      decision: 'Marquee Pace Target (RTM Contested)',
      category: 'Released and potentially auction-eligible',
      notes: 'Enters mega-auction pool. Premier Indian left-arm death specialist (Econ 8.78).'
    };
  }
  if (name === 'Marcus Stoinis') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by LSG',
      decision: 'Strong Overseas Power Option',
      category: 'Released and potentially auction-eligible',
      notes: 'Released by LSG. Potentially eligible for overseas all-rounder slot (3 overseas slots open).'
    };
  }
  if (name === 'Tim David') {
    return {
      status_2027: 'Released and potentially auction-eligible',
      franchise_2027: 'Released by MI',
      decision: 'Strong Alternative Finisher',
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
      decision: 'Death Overs Specialist Candidate',
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

  // Unverified or retired
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

  // Default fallback
  return {
    status_2027: 'Auction eligibility unverified',
    franchise_2027: 'Unconfirmed',
    decision: 'Further Evaluation',
    category: 'Auction eligibility unverified',
    notes: 'Verify registration on final BCCI auction list.'
  };
}

console.log('Testing status mapping...');
candCsv.rows.forEach(c => {
  const stat = getOfficialAcquisitionStatus(c.player_name, c.player_type, c.candidate_source === 'Original Top 10');
  console.log(`${c.player_name} (${c.player_type}) -> [${stat.status_2027}] (${stat.franchise_2027})`);
});


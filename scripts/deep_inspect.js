const fs = require('fs');
const path = require('path');

// Read project_summary.json
const summary = JSON.parse(fs.readFileSync('extracted_data/project_summary.json', 'utf-8'));
console.log('Project summary keys:', Object.keys(summary));
if (summary.executive_summary) {
  console.log('Executive summary:', JSON.stringify(summary.executive_summary, null, 2));
}

// Inspect candidate_database.csv
const candCsv = fs.readFileSync('extracted_data/candidate_database.csv', 'utf-8');
const candLines = candCsv.split(/\r?\n/).filter(l => l.trim().length > 0);
const headers = candLines[0].split(',');
console.log(`Candidate database columns (${headers.length}):`, headers);

// Parse CSV simple parser
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

const cands = parseCSV(candCsv);
console.log(`Total candidate rows: ${cands.rows.length}`);
const sources = {};
const types = {};
cands.rows.forEach(r => {
  sources[r.candidate_source] = (sources[r.candidate_source] || 0) + 1;
  types[r.player_type] = (types[r.player_type] || 0) + 1;
});
console.log('Sources:', sources);
console.log('Types:', types);

// Check Rashid Khan
const rashid = cands.rows.find(r => r.player_name && r.player_name.includes('Rashid'));
console.log('Rashid Khan in candidate_database:', rashid ? {
  name: rashid.player_name,
  type: rashid.player_type,
  source: rashid.candidate_source,
  score: rashid.balanced_score,
  role: rashid.potential_role
} : 'Not found');

// Check alternative_batters.csv and alternative_bowlers.csv
const altBat = parseCSV(fs.readFileSync('extracted_data/alternative_batters.csv', 'utf-8'));
console.log('Alt Batters count:', altBat.rows.length);
const rashidInAltBat = altBat.rows.find(r => r.player_name && r.player_name.includes('Rashid'));
console.log('Rashid in Alt Batters:', rashidInAltBat ? {
  name: rashidInAltBat.player_name,
  runs: rashidInAltBat.pressure_runs,
  sr: rashidInAltBat.pressure_sr,
  balls: rashidInAltBat.pressure_balls,
  matches: rashidInAltBat.pressure_matches
} : 'Not found');

const altBowl = parseCSV(fs.readFileSync('extracted_data/alternative_bowlers.csv', 'utf-8'));
console.log('Alt Bowlers count:', altBowl.rows.length);
const rashidInAltBowl = altBowl.rows.find(r => r.player_name && r.player_name.includes('Rashid'));
console.log('Rashid in Alt Bowlers:', rashidInAltBowl ? 'Found' : 'Not found');

// Check rr_squad_2027.csv and rr_existing_players.csv
const squad2027 = parseCSV(fs.readFileSync('extracted_data/rr_squad_2027.csv', 'utf-8'));
console.log('RR Squad 2027 (reported):', squad2027.rows.length, 'players:');
console.log(squad2027.rows.map(r => `${r.player_name} (${r.role}, ${r.squad_status})`).join('; '));

const squadReq = parseCSV(fs.readFileSync('extracted_data/squad_requirements.csv', 'utf-8'));
console.log('Squad requirements:');
console.log(squadReq.rows);

const origVsAlt = parseCSV(fs.readFileSync('extracted_data/original_vs_alternative.csv', 'utf-8'));
console.log('Original vs Alternative:');
console.log(origVsAlt.rows);


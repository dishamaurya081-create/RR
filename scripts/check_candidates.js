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

const cands = parseCSV(fs.readFileSync('extracted_data/candidate_database.csv', 'utf-8')).rows;
const finalShortlist = parseCSV(fs.readFileSync('extracted_data/final_shortlist.csv', 'utf-8')).rows;
const finalValidation = parseCSV(fs.readFileSync('extracted_data/final_validation.csv', 'utf-8')).rows;
const finalMaster = parseCSV(fs.readFileSync('extracted_data/final_master.csv', 'utf-8')).rows;
const statusDf = parseCSV(fs.readFileSync('extracted_data/status_df.csv', 'utf-8')).rows;
const priorityCands = parseCSV(fs.readFileSync('extracted_data/priority_candidates.csv', 'utf-8')).rows;
const altBatters = parseCSV(fs.readFileSync('extracted_data/alternative_batters.csv', 'utf-8')).rows;
const altBowlers = parseCSV(fs.readFileSync('extracted_data/alternative_bowlers.csv', 'utf-8')).rows;

console.log('--- 10 ORIGINAL CANDIDATES ---');
finalShortlist.forEach(r => {
  const fv = finalValidation.find(v => v.player_name === r.player_name);
  const fm = finalMaster.find(m => m.Player === r.player_name);
  const st = statusDf.find(s => s.player_name === r.player_name);
  console.log(`${r.player_name} (${r.player_type}) | Score: ${r.balanced_score} | Role: ${fv ? fv.potential_role : fm?.Role} | Status: ${st ? st['2027_status'] : 'N/A'} | Franchise: ${st ? st['2027_franchise'] : 'N/A'}`);
});

console.log('\n--- RASHID KHAN DETAILS ---');
console.log('In altBatters:', altBatters.find(r => r.player_name.includes('Rashid')));
console.log('In altBowlers:', altBowlers.find(r => r.player_name.includes('Rashid')));
console.log('In candidate_database:', cands.find(r => r.player_name.includes('Rashid')));
console.log('In priority_candidates:', priorityCands.find(r => r.player_name.includes('Rashid')));

// Check all 50 players in candidate_database
console.log('\n--- ALL 50 CANDIDATES IN CANDIDATE_DATABASE ---');
cands.forEach((c, idx) => {
  console.log(`${idx+1}. ${c.player_name} | Type: ${c.player_type} | Source: ${c.candidate_source} | Score: ${c.balanced_score} | Rank: ${c.balanced_rank || c.overall_candidate_rank}`);
});


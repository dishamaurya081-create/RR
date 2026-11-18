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

const prio = parseCSV(fs.readFileSync('extracted_data/priority_candidates.csv', 'utf-8')).rows;
const batShort = parseCSV(fs.readFileSync('extracted_data/batter_shortlist.csv', 'utf-8')).rows;
const bowlShort = parseCSV(fs.readFileSync('extracted_data/bowler_shortlist.csv', 'utf-8')).rows;

console.log('--- ORIGINAL 10 in priority_candidates.csv ---');
const orig10 = prio.filter(p => p.candidate_source === 'Original Top 10');
orig10.forEach(p => {
  console.log(`${p.player_name} (${p.player_type}):`, {
    score: p.balanced_score,
    p_runs: p.pressure_runs,
    p_balls: p.pressure_balls,
    p_sr: p.pressure_sr,
    p_avg: p.pressure_average,
    p_wkts: p.pressure_wickets,
    p_econ: p.pressure_economy,
    p_dots: p.pressure_dots,
    rel_score: p.reliability_score,
    rel_status: p.reliability_status,
    sample_val: p.sample_validation
  });
});


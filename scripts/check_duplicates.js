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
const nameCounts = {};
cands.forEach(c => {
  nameCounts[c.player_name] = (nameCounts[c.player_name] || 0) + 1;
});
console.log('Player occurrences in candidate_database (50 rows total):');
for (const [name, count] of Object.entries(nameCounts)) {
  if (count > 1) {
    const entries = cands.filter(c => c.player_name === name);
    console.log(`- ${name}: appears ${count} times:`, entries.map(e => `${e.player_type} (${e.candidate_source}, score: ${e.balanced_score})`).join(' vs '));
  }
}
console.log('Unique player names count:', Object.keys(nameCounts).length);
console.log('Total player-role entries:', cands.length);

// Also check priority_candidates.csv, comparison.csv, candidate_table_with_rr_status.csv
const prio = parseCSV(fs.readFileSync('extracted_data/priority_candidates.csv', 'utf-8')).rows;
console.log('\npriority_candidates.csv rows:', prio.length);
console.log('priority_candidates columns:', Object.keys(prio[0]));
console.log('priority_candidates sample row 1:', prio[0]);
console.log('priority_candidates sample row 27 (Shardul):', prio[26]);


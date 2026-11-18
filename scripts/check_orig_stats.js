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

const batShort = parseCSV(fs.readFileSync('extracted_data/batter_shortlist.csv', 'utf-8')).rows;
const bowlShort = parseCSV(fs.readFileSync('extracted_data/bowler_shortlist.csv', 'utf-8')).rows;

console.log('Batter shortlist headers:', Object.keys(batShort[0]));
console.log('Bowler shortlist headers:', Object.keys(bowlShort[0]));

const origBatters = ['Rinku Singh', 'Tristan Stubbs', 'David Miller', 'Dhruv Jurel', 'Heinrich Klaasen'];
origBatters.forEach(name => {
  const b = batShort.find(r => r.striker_name === name || r.player_name === name);
  console.log(`Orig Batter ${name}:`, b ? {
    runs_pressure: b.runs_pressure,
    balls_pressure: b.balls_pressure,
    sr_pressure: b.strike_rate_pressure || b.sr_pressure,
    avg_pressure: b.average_pressure || b.avg_pressure,
    matches_pressure: b.matches_pressure,
    ordinary_sr: b.strike_rate_ordinary || b.sr_ordinary,
    ordinary_avg: b.average_ordinary || b.avg_ordinary
  } : 'NOT in batter_shortlist');
});

const origBowlers = ['Shardul Thakur', 'Josh Hazlewood', 'Maheesh Theekshana', 'Yuzvendra Chahal', 'Varun Chakravarthy'];
origBowlers.forEach(name => {
  const b = bowlShort.find(r => r.bowler_name === name || r.player_name === name);
  console.log(`Orig Bowler ${name}:`, b ? {
    legal_balls_pressure: b.legal_balls_pressure,
    runs_conceded_pressure: b.runs_conceded_pressure,
    wickets_pressure: b.wickets_pressure,
    econ_pressure: b.economy_rate_pressure || b.econ_pressure,
    dots_pressure: b.dot_balls_pressure || b.dots_pressure,
    dot_pct_pressure: b.dot_percentage_pressure,
    ordinary_econ: b.economy_rate_ordinary
  } : 'NOT in bowler_shortlist');
});


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

const fv = parseCSV(fs.readFileSync('extracted_data/final_validation.csv', 'utf-8'));
console.log('--- final_validation.csv ---');
console.log('Headers:', fv.headers);
console.log('Sample row:', fv.rows[0]);

const st = parseCSV(fs.readFileSync('extracted_data/status_df.csv', 'utf-8'));
console.log('--- status_df.csv ---');
console.log(st.rows);

const candWithRR = parseCSV(fs.readFileSync('extracted_data/candidate_table_with_rr_status.csv', 'utf-8'));
console.log('--- candidate_table_with_rr_status.csv ---');
console.log('Headers:', candWithRR.headers);
console.log('Rows count:', candWithRR.rows.length);

const unavail = parseCSV(fs.readFileSync('extracted_data/unavailable_players.csv', 'utf-8'));
console.log('--- unavailable_players.csv ---');
console.log(unavail.rows);

const avail = parseCSV(fs.readFileSync('extracted_data/availability_df.csv', 'utf-8'));
console.log('--- availability_df.csv ---');
console.log(avail.rows);


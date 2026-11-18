const fs = require('fs');

if (fs.existsSync('extracted_data/dataframe_inventory.csv')) {
  console.log('--- dataframe_inventory.csv ---');
  console.log(fs.readFileSync('extracted_data/dataframe_inventory.csv', 'utf-8').slice(0, 1000));
}

// Let us inspect the columns of candidate_database.csv vs priority_candidates.csv vs batter_shortlist.csv vs bowler_shortlist.csv
function inspectCols(filename) {
  const p = `extracted_data/${filename}`;
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf-8');
  const firstLine = content.split(/\r?\n/)[0];
  console.log(`${filename} (${firstLine.split(',').length} cols):`, firstLine);
}

inspectCols('candidate_database.csv');
inspectCols('priority_candidates.csv');
inspectCols('comparison.csv');
inspectCols('squad_requirements.csv');


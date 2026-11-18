const fs = require('fs');

const squadLines = fs.readFileSync('extracted_data/rr_squad_2027.csv', 'utf-8').split(/\r?\n/).filter(l => l.trim().length > 0);
console.log('--- ALL PLAYERS IN rr_squad_2027.csv ---');
squadLines.slice(1).forEach((line, idx) => {
  const parts = line.split(',');
  console.log(`${idx + 1}. ${parts[0]} | Role: ${parts[1]} | Status: ${parts[2]}`);
});


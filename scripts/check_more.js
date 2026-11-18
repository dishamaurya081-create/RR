const fs = require('fs');

function inspectHead(f, n = 5) {
  if (!fs.existsSync(`extracted_data/${f}`)) {
    console.log(`${f} NOT FOUND`);
    return;
  }
  const lines = fs.readFileSync(`extracted_data/${f}`, 'utf-8').split(/\r?\n/).slice(0, n);
  console.log(`--- ${f} ---`);
  lines.forEach(l => console.log(l));
}

inspectHead('batter_consistency.csv', 4);
inspectHead('bowler_consistency.csv', 4);
inspectHead('rr_squad_2027.csv', 10);
inspectHead('squad_fit.csv', 12);


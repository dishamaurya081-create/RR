const fs = require('fs');

const candidates = JSON.parse(fs.readFileSync('scripts/processed_candidates.json', 'utf-8'));

console.log('--- VERIFICATION CHECKS ---');
console.log('Total candidates:', candidates.length);
const orig = candidates.filter(c => c.candidate_source === 'Original Top 10');
const alt = candidates.filter(c => c.candidate_source === 'Alternative Pool');
console.log(`Original: ${orig.length}, Alternative: ${alt.length}`);

// Check Rashid Khan
const rashids = candidates.filter(c => c.player_name === 'Rashid Khan');
console.log('\nRashid Khan entries count:', rashids.length);
rashids.forEach(r => {
  console.log(`- Type: ${r.player_type} | Verified: ${r.verified_role} | Score: ${r.balanced_score}`);
  console.log(`  Role warning: ${r.role_warning}`);
  console.log(`  Corrected note: ${r.corrected_role_note}`);
  console.log(`  Batting SR: ${r.batting.pressure_sr}, Bowling Econ: ${r.bowling.pressure_economy}`);
});

// Check missing reliability scores in original
console.log('\nOriginal candidates reliability:');
orig.forEach(c => {
  console.log(`${c.player_name} (${c.player_type}): score=${c.balanced_score}, rel_score=${c.reliability.reliability_score}, rel_status=${c.reliability.reliability_status}`);
});

// Check original batting & bowling pressure stats
console.log('\nOriginal Batters pressure stats:');
orig.filter(c => c.player_type === 'Batter').forEach(c => {
  console.log(`${c.player_name}: Runs=${c.batting.pressure_runs}, Balls=${c.batting.pressure_balls}, SR=${c.batting.pressure_sr?.toFixed(1)}, Avg=${c.batting.pressure_average?.toFixed(1)}`);
});

console.log('\nOriginal Bowlers pressure stats:');
orig.filter(c => c.player_type === 'Bowler').forEach(c => {
  console.log(`${c.player_name}: Wkts=${c.bowling.pressure_wickets}, Balls=${c.bowling.pressure_balls}, Econ=${c.bowling.pressure_economy?.toFixed(2)}, Dots=${c.bowling.pressure_dots}`);
});


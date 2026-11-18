const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/processed_candidates.json', 'utf-8'));

console.log('Total candidates:', data.length);
data.forEach((c, i) => {
  console.log(`${i+1}. ${c.player_name} [${c.player_type}] (${c.candidate_source}) -> Score: ${c.balanced_score.toFixed(2)} | Current: ${c.acquisition.status_2027} | Franchise: ${c.acquisition.franchise_2027}`);
});


const fs = require('fs');
const path = require('path');

const files = [
  'candidate_database.csv',
  'final_shortlist.csv',
  'final_recommendations.csv',
  'final_master.csv',
  'final_evidence.csv',
  'final_validation.csv',
  'original_candidates.csv',
  'alternative_batters.csv',
  'alternative_bowlers.csv',
  'batter_shortlist.csv',
  'bowler_shortlist.csv',
  'batter_comparison.csv',
  'bowler_comparison.csv',
  'comparison.csv',
  'original_vs_alternative.csv',
  'rr_existing_players.csv',
  'rr_squad_2027.csv',
  'rr_squad_2027_reported.csv',
  'squad_requirements.csv',
  'squad_fit.csv',
  'candidate_table_with_rr_status.csv',
  'status_df.csv',
  'ipl2027_shortlist.csv',
  'ipl2027_acquisition_candidates.csv',
  'priority_candidates.csv',
  'project_summary.json'
];

console.log('--- FILE INSPECTION ---');
for (const f of files) {
  const p = path.join('extracted_data', f);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    const content = fs.readFileSync(p, 'utf-8');
    const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
    console.log(`${f}: ${lines.length - (f.endsWith('.csv') ? 1 : 0)} records (size: ${stat.size} bytes)`);
    if (f.endsWith('.csv') && lines.length > 0) {
      console.log(`   Header: ${lines[0].substring(0, 140)}`);
      if (lines.length > 1) {
        console.log(`   Sample: ${lines[1].substring(0, 140)}`);
      }
    }
  } else {
    console.log(`${f}: NOT FOUND`);
  }
}


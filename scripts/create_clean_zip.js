const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

console.log('Building clean final submission zip...');

// We will use node's archiver or powershell Compress-Archive
// Let's create a staging directory 'submission_pack'
const stageDir = path.resolve('submission_pack');
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

// Copy app/ (excluding node_modules)
function copyDir(src, dest, skipList = ['node_modules', '.git']) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (skipList.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, skipList);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying app directory...');
copyDir(path.resolve('app'), path.join(stageDir, 'app'), ['node_modules', '.tmp', '.vite']);

console.log('Copying scripts directory...');
copyDir(path.resolve('scripts'), path.join(stageDir, 'scripts'), ['node_modules']);

console.log('Copying analytical datasets...');
const keyDataDir = path.join(stageDir, 'extracted_data');
fs.mkdirSync(keyDataDir, { recursive: true });

const keyFiles = [
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
  'project_summary.json',
  'unavailable_players.csv',
  'availability_df.csv'
];

keyFiles.forEach(f => {
  const p = path.join('extracted_data', f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(keyDataDir, f));
  }
});

console.log('Copying documentation...');
if (fs.existsSync('README.md')) {
  fs.copyFileSync('README.md', path.join(stageDir, 'README.md'));
}

console.log('Compressing submission_pack to supe_rr_selector_final_submission.zip...');
spawnSync('tar.exe', [
  '-a',
  '-c',
  '-f',
  'supe_rr_selector_final_submission.zip',
  '-C',
  'submission_pack',
  '.'
], { stdio: 'inherit' });

if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}

if (fs.existsSync('supe_rr_selector_final_submission.zip')) {
  const stat = fs.statSync('supe_rr_selector_final_submission.zip');
  console.log(`SUCCESS! Created supe_rr_selector_final_submission.zip (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
} else {
  console.error('Failed to create zip file.');
}


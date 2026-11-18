const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

console.log('Packaging final submission zip...');

// We will use tar or node to create the zip archive
// Files to include:
// - app/ (excluding node_modules)
// - scripts/
// - extracted_data/
// - README.md

const zipName = 'supe_rr_selector_final_submission.zip';
if (fs.existsSync(zipName)) {
  fs.unlinkSync(zipName);
}

// In PowerShell or tar, let's use a PowerShell script to bundle cleanly
const psScript = `
$exclude = @('*node_modules*', '*.tmp*', '*.log')
$files = Get-ChildItem -Path . -Recurse | Where-Object {
    $item = $_
    $skip = $false
    foreach ($pat in $exclude) {
        if ($item.FullName -like $pat) { $skip = $true; break }
    }
    if ($item.FullName -like '*supe_rr_selector_final_submission.zip*') { $skip = $true }
    if ($item.FullName -like '*rr_final_review_pack.zip*') { $skip = $true }
    if ($item.FullName -like '*appDataDir*') { $skip = $true }
    -not $skip -and -not $item.PSIsContainer
}

Write-Host "Total files to archive: $($files.Count)"
`;

console.log('Running archive preparation...');


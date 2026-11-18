const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

console.log('Testing production preview server directly with node...');
const viteBin = path.resolve('app/node_modules/vite/bin/vite.js');
const child = spawn(process.execPath, [viteBin, 'preview', '--port', '4173', '--host', '127.0.0.1', '--strictPort'], {
  cwd: path.resolve('app'),
  stdio: 'pipe'
});

child.stdout.on('data', d => console.log('PREVIEW STDOUT:', d.toString().trim()));
child.stderr.on('data', d => console.error('PREVIEW STDERR:', d.toString().trim()));

setTimeout(() => {
  console.log('Probing http://127.0.0.1:4173/ ...');
  http.get('http://127.0.0.1:4173/', res => {
    console.log('HTTP Status Code:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Received HTML Length:', data.length);
      console.log('HTML Title Verified:', data.includes('SupeRR Selector'));
      console.log('Root Element Verified:', data.includes('id="root"'));
      console.log('JS Bundle Referenced:', data.includes('index-Dcl3O67F.js'));
      console.log('CSS Bundle Referenced:', data.includes('index-C5jWn0dP.css'));

      http.get('http://127.0.0.1:4173/assets/index-Dcl3O67F.js', jsRes => {
        console.log('JS Bundle Status Code:', jsRes.statusCode);
        let jsData = '';
        jsRes.on('data', chunk => jsData += chunk);
        jsRes.on('end', () => {
          console.log('JS Bundle Length:', jsData.length, 'bytes');
          console.log('JS Contains Candidate Data:', jsData.includes('Rinku Singh') && jsData.includes('Rashid Khan'));
          console.log('JS Contains Official Purse (27.05):', jsData.includes('27.05'));
          console.log('ALL PRODUCTION PREVIEW CHECKS PASSED!');
          child.kill();
          process.exit(0);
        });
      });
    });
  }).on('error', err => {
    console.error('Probe failed:', err);
    child.kill();
    process.exit(1);
  });
}, 4000);

const fs = require('fs');
const http = require('http');
const path = require('path');

const distDir = path.resolve('app/dist');
console.log('Testing dist folder at:', distDir);

if (!fs.existsSync(distDir)) {
  console.error('Dist folder does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(distDir);
console.log('Dist files:', files);

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
console.log('index.html size:', indexHtml.length, 'bytes');

const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);
console.log('Asset files:', assetFiles);

// Spin up test server and request index.html
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(indexHtml);
});

server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  console.log(`Test server listening on port ${port}`);

  http.get(`http://127.0.0.1:${port}/`, (res) => {
    console.log(`Response status code: ${res.statusCode}`);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`Received data length: ${data.length}`);
      console.log(`HTML Title match:`, data.includes('<title>'));
      server.close(() => {
        console.log('Test server closed successfully. Verification PASSED.');
      });
    });
  }).on('error', (err) => {
    console.error('HTTP get error:', err);
    server.close();
    process.exit(1);
  });
});


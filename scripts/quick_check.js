const fs = require('fs');

const file = fs.readFileSync('app/src/data/intelligenceData.ts', 'utf-8');

console.log('Contains OFFICIAL_RR_PURSE_METRICS:', file.includes('OFFICIAL_RR_PURSE_METRICS'));
console.log('Contains 27.05:', file.includes('27.05'));
console.log('Contains available_squad_positions: 6:', file.includes('available_squad_positions: 6'));
console.log('Contains available_overseas_positions: 3:', file.includes('available_overseas_positions: 3'));
console.log('Contains Shimron Hetmyer released:', file.includes('Released by RR'));
console.log('Contains Ravindra Jadeja Retained by RR:', file.includes('Secured RR Asset (Retained by RR)'));
console.log('Contains Dhruv Jurel Retained by RR:', file.includes('Secured RR Asset (Retained by RR)'));
console.log('Contains Yash Raj Punja:', file.includes('Yash Raj Punja'));


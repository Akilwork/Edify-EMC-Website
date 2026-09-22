const fs = require('fs');

const cap = 'c:/Users/akilj/Desktop/Website/Edify EMC Website/src/components/sections/services/detail/DetailCapabilities.tsx';
let cContent = fs.readFileSync(cap, 'utf8');
cContent = cContent.replace(/\s*"ecommerce-digital-services":\s*".*?",/g, '');
fs.writeFileSync(cap, cContent);

const why = 'c:/Users/akilj/Desktop/Website/Edify EMC Website/src/components/sections/services/detail/DetailWhyItMatters.tsx';
let wContent = fs.readFileSync(why, 'utf8');
wContent = wContent.replace(/\s*"ecommerce-digital-services":\s*".*?",/g, '');
wContent = wContent.replace(/\s*"ecommerce-digital-services":\s*\[[\s\S]*?\],/g, '');
fs.writeFileSync(why, wContent);

console.log('Removed from components');

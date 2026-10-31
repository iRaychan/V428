require('./v50017-kv-regression.cjs');

const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

if(read('VERSION.txt').trim()!=='5.00.18')throw new Error('V5.00.18 version file mismatch');
if(!/v50018-version-lock\.js\?v=50018/.test(read('index.html')))throw new Error('V5.00.18 version lock not loaded');
if(!/keysuite-v50018-20261031/.test(read('sw.js')))throw new Error('V5.00.18 cache key missing');
if(JSON.parse(read('RELEASE.json')).baseline!=='5.00.17')throw new Error('Upgrade baseline must be V5.00.17');
console.log('PASS: V5.00.18 release packaging and V5.00.17 upgrade baseline');

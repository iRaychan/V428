const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const index=read('index.html'),app=read('app.js'),sw=read('sw.js'),bootstrap=read('v41200-bootstrap.js'),manifest=read('UPGRADE_FILE_MANIFEST_V42871.txt'),release=JSON.parse(read('RELEASE.json'));
assert.strictEqual(read('VERSION.txt').trim(),'4.28.71');
assert.strictEqual(JSON.parse(read('manifest.json')).name,'KeySuite V4.28.71');
assert.strictEqual(release.version,'4.28.71');assert.strictEqual(release.baseline,'4.28.70');assert.strictEqual(release.upgrade_supported_from,'4.28.70');
assert.strictEqual(release.new_database_migration_required,false);assert.strictEqual(release.edge_function_deploy_required,false);
assert(index.includes("window.KEYSUITE_VERSION='4.28.71'"));assert(index.includes('v42871-selector-first-open.js?v=42871'));assert(index.includes('v42871-version-lock.js?v=42871'));
assert(bootstrap.includes("window.KEYSUITE_VERSION='4.28.71'")&&bootstrap.includes("const VERSION='42871'"));
assert(app.includes("serviceWorker.register('sw.js?v=42871')"));assert(sw.includes("const CACHE='keysuite-v42871'"));
for(const file of ['v42871-selector-first-open.js','v42871-version-lock.js','README_UPGRADE_V42871.md','VERIFICATION_V42871.md'])assert(fs.existsSync(path.join(root,file)),file);
const assets=fs.readdirSync(path.join(root,'assets/cr-dimensions')).filter(x=>x.endsWith('.png'));
assert.strictEqual(assets.length,20);
for(const asset of assets){const rel=`assets/cr-dimensions/${asset}`;assert(manifest.includes(rel),rel);assert(sw.includes(`'./${rel}'`),rel)}
console.log('V4.28.71 release regression: PASS');

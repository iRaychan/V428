const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const index=read('index.html'),app=read('app.js'),sw=read('sw.js'),bootstrap=read('v41200-bootstrap.js'),manifest=read('UPGRADE_FILE_MANIFEST_V42868.txt'),release=JSON.parse(read('RELEASE.json'));
assert.strictEqual(read('VERSION.txt').trim(),'4.28.68');
assert.strictEqual(JSON.parse(read('manifest.json')).name,'KeySuite V4.28.68');
assert.strictEqual(release.version,'4.28.68');assert.strictEqual(release.baseline,'4.28.67');assert.strictEqual(release.upgrade_supported_from,'4.28.67');
assert.strictEqual(release.new_database_migration_required,false);assert.strictEqual(release.edge_function_deploy_required,false);
assert(index.includes("window.KEYSUITE_VERSION='4.28.68'"));assert(index.includes('v42868-selector-first-open.js?v=42868'));assert(index.includes('v42868-version-lock.js?v=42868'));
assert(bootstrap.includes("window.KEYSUITE_VERSION='4.28.68'")&&bootstrap.includes("const VERSION='42868'"));
assert(app.includes("serviceWorker.register('sw.js?v=42868')"));assert(sw.includes("const CACHE='keysuite-v42868'"));
for(const file of ['v42868-selector-first-open.js','v42868-version-lock.js','README_UPGRADE_V42868.md','VERIFICATION_V42868.md'])assert(fs.existsSync(path.join(root,file)),file);
const assets=fs.readdirSync(path.join(root,'assets/cr-dimensions')).filter(x=>x.endsWith('.png'));
assert.strictEqual(assets.length,20);
for(const asset of assets){const rel=`assets/cr-dimensions/${asset}`;assert(manifest.includes(rel),rel);assert(sw.includes(`'./${rel}'`),rel)}
console.log('V4.28.68 release regression: PASS');

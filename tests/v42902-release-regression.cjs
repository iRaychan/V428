const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));

assert.strictEqual(read('VERSION.txt').trim(), '4.29.02');
assert.match(read('index.html'), /KEYSUITE_VERSION='4\.29\.02'/);
assert.match(read('index.html'), /v42902-version-lock\.js\?v=42902/);
assert.match(read('v41200-bootstrap.js'), /const VERSION='42902'/);
assert.match(read('sw.js'), /keysuite-v42902/);
assert.match(read('sw.js'), /SHELL\[SHELL\.indexOf\('\.\/v42875-version-lock\.js'\)\]='\.\/v42902-version-lock\.js'/);
assert.match(read('v42902-version-lock.js'), /const V='4\.29\.02'/);

const productCurve = read('v394411-product-curve.js');
const functionSource = productCurve.match(/function productFrameChrome\(fr,f\)\{[\s\S]*?\}\n(?=function prepareFrame)/);
assert(functionSource, 'Product curve chrome function must be present');

function cssFor(family) {
  const style = { textContent: '' };
  const document = {
    body: { classList: { add() {} } },
    head: { appendChild() {} },
    getElementById() { return style; },
    createElement() { return style; },
  };
  const context = { result: '', fr: { contentDocument: document }, family };
  vm.runInNewContext(`${functionSource[0]}\nresult=productFrameChrome(fr,family)?fr.contentDocument.getElementById().textContent:'';`, context);
  return context.result;
}

for (const family of ['ES', 'BFI']) {
  const css = cssFor(family);
  assert(css.includes('.details{display:none!important}'), `${family} keeps Product detail suppression`);
  assert(!css.includes('#alternativesCard'), `${family} alternative card is visible`);
  assert(!css.includes('.alts'), `${family} alternative list is visible`);
}

for (const family of ['CHC', 'CR']) {
  const css = cssFor(family);
  assert(css.includes('#alternativesCard'), `${family} alternative card remains hidden`);
  assert(css.includes('.alts'), `${family} alternative list remains hidden`);
}

for (const file of [
  'selector-es/index.html',
  'selector-es/es-core.js',
  'selector-es/es-data.js',
  'selector-bfi/index.html',
  'selector-bfi/product.html',
  'supabase/functions/shared-bfi/bfi-selector-core.js',
  'pricing.js',
  'app.js',
  'pdf-optimization.js',
]) assert.strictEqual(exists(file), false, `${file} must not be included in the upgrade`);

console.log('V4.29.02 ES/BFI alternative-model restoration regression: PASS');

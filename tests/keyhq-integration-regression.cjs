const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const launcher = fs.readFileSync(path.join(root, 'keyhq-launcher.js'), 'utf8');
const keyhq = fs.readFileSync(path.join(root, 'keyhq', 'index.html'), 'utf8');

const keyBotIndex = html.indexOf('id="keyAiNavButton"');
const keyHQIndex = html.indexOf('id="keyhqNavButton"');
if (keyBotIndex < 0 || keyHQIndex < 0 || keyHQIndex <= keyBotIndex) {
  throw new Error('KeyHQ must appear immediately after KeyBot in the sidebar source.');
}
if (!html.includes('src="keyhq-launcher.js?v=42913"')) {
  throw new Error('KeyHQ launcher is not loaded by KeySuite.');
}
if (!launcher.includes("frame.src='keyhq/index.html?embedded=1'")) {
  throw new Error('KeyHQ launcher does not target the embedded HQ page.');
}
if (!launcher.includes("event.data?.type==='KEYHQ_CLOSE'")) {
  throw new Error('KeyHQ return-to-KeySuite message handler is missing.');
}
if (!keyhq.includes('Interactive multi-storey 3D view')) {
  throw new Error('The multi-storey KeyHQ application is missing.');
}

console.log('KeyHQ integration regression: PASS');

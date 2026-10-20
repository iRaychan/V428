const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

assert.strictEqual(read('VERSION.txt').trim(), '4.29.11');
assert.match(read('index.html'), /KEYSUITE_VERSION='4\.29\.11'/);
assert.match(read('index.html'), /v42911-version-lock\.js\?v=42911/);
assert.match(read('v41200-bootstrap.js'), /const VERSION='42911'/);
assert.match(read('sw.js'), /keysuite-v42911/);
assert.match(read('sw.js'), /v42911-version-lock\.js/);
assert.match(read('v42911-version-lock.js'), /const V='4\.29\.11'/);

const telegramWebhook = read('supabase/functions/telegram-webhook/index.ts');
const gate = telegramWebhook.indexOf("if(responseMode==='nothing')");
const menu = telegramWebhook.indexOf("if(menuText||callbackData==='menu:home')");
assert.ok(gate >= 0, 'unassigned sender mode is blocked');
assert.ok(menu >= 0 && gate < menu, 'the unassigned gate runs before the main menu');
assert.match(telegramWebhook, /Your Telegram account is not assigned yet\./);
assert.match(telegramWebhook, /Please contact your administrator to request access\./);
assert.match(telegramWebhook.slice(gate, menu), /telegramRemoveKeyboard\(\)/, 'the unassigned response removes the keyboard');
assert.match(telegramWebhook.slice(gate, menu), /automated_reply:true/, 'the access notice is reported as an automated reply');

console.log('V4.29.11 unassigned Telegram access regression: PASS');

// Загальний прогрес по всіх блоках: node run-all.js
const { execFileSync } = require('node:child_process');
const { readdirSync } = require('node:fs');
const path = require('node:path');

const files = readdirSync(__dirname).filter((f) => /^\d{2}-.*\.js$/.test(f)).sort();

console.log('\n🏋️  Основи мови — прогрес\n');
for (const file of files) {
  try {
    const out = execFileSync(process.execPath, [path.join(__dirname, file)], {
      env: { ...process.env, SUMMARY_ONLY: '1' },
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    process.stdout.write(out);
  } catch {
    console.log(`💥 ${file} — падає, запусти окремо: node ${file}`);
  }
}
console.log();

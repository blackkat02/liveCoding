// ═══════════════════════════════════════════════════════════
// 📦 06 — "use strict"
// ❓ Для чого в JavaScript використовують "use strict"?
// Запуск: node 06-strict.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │ 'use strict' вмикає СТРОГИЙ РЕЖИМ — тихі помилки стають явними (кидають виняток).
// │ Пишеться ПЕРШИМ рядком файлу або функції.
// │
// │   ситуація                              звичайний режим          strict
// │   x = 5 без let/const/var               створює ГЛОБАЛЬНУ змінну  ReferenceError
// │   запис у заморожений об'єкт (freeze)   тихо ігнорується          TypeError
// │   this у функції, викликаній просто f() globalThis (глобальний)   undefined
// │   однакові параметри f(a, a)            можна                     SyntaxError
// │
// │   function f() { 'use strict'; return this; }
// │   f()  → undefined
// │
// │ ВАЖЛИВО: ES-модулі (import/export) і тіло class — ЗАВЖДИ strict автоматично.
// │ У сучасному коді з модулями директиву не пишуть.
// │ У CommonJS (require, як у цих файлах) — strict треба вмикати самому.
// │
// │ 🗣 На співбесіді: «Строгий режим перетворює тихі помилки на винятки:
// │    присвоєння неоголошеній змінній, запис у read-only властивість.
// │    А this у функції без контексту стає undefined замість глобального об'єкта.
// │    Модулі й класи strict за замовчуванням».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — що поверне кожна функція нижче?
//   Якщо функція повертає назву помилки — відповідь рядком: 'TypeError' тощо.
//   [0] sloppyThis()   [1] strictThis()   [2] sloppyFrozen()
//   [3] strictFrozen() [4] strictUndeclared()
function sloppyThis() { return this === undefined; }
function strictThis() { 'use strict'; return this === undefined; }
function sloppyFrozen() { const o = Object.freeze({ a: 1 }); o.a = 2; return o.a; }
function strictFrozen() {
  'use strict';
  const o = Object.freeze({ a: 1 });
  try { o.a = 2; return o.a; } catch (e) { return e.name; }
}
function strictUndeclared() {
  'use strict';
  try { undeclaredVar = 1; return 'ok'; } catch (e) { return e.name; }
}
function predictStrict() {
  return todo();
}

// 2. trySet(obj, key, value) — спробувати записати obj[key] = value у СТРОГОМУ режимі.
// Повернути true, якщо запис вдався, і false, якщо JS кинув помилку.
//   trySet({ a: 1 }, 'a', 2)                  → true
//   trySet(Object.freeze({ a: 1 }), 'a', 2)   → false
// 💡 'use strict' першим рядком функції + try/catch. (А що буде без 'use strict'?)
function trySet(obj, key, value) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictStrict', predictStrict, [
  () => sloppyThis(), () => strictThis(), () => sloppyFrozen(),
  () => strictFrozen(), () => strictUndeclared(),
]);
test('trySet', [
  [() => trySet({ a: 1 }, 'a', 2), true],
  [() => { const o = { a: 1 }; trySet(o, 'a', 2); return o.a; }, 2, 'значення справді записане'],
  [() => trySet(Object.freeze({ a: 1 }), 'a', 2), false],
  [() => trySet(Object.freeze({}), 'newKey', 1), false],
]);

run('06 — use strict');

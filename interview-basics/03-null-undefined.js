// ═══════════════════════════════════════════════════════════
// 📦 03 — null і undefined
// ❓ Чим null відрізняється від undefined?
// Запуск: node 03-null-undefined.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │                  undefined                      null
// │   сенс           «значення ще НЕ присвоєно»     «значення НАВМИСНО порожнє»
// │   хто ставить    зазвичай сам JS                зазвичай програміст
// │   typeof         'undefined'                    'object' (баг мови)
// │   Number(...)    NaN                            0
// │   у JSON         ключ ЗНИКАЄ                    лишається null
// │
// │ Коли JS сам дає undefined:
// │   let a;                         — оголосили, але не присвоїли
// │   ({}).missing                   — немає такої властивості
// │   function f(x) { return x; } f()  — не передали аргумент
// │   function g() {} g()            — функція без return
// │
// │ Порівняння:
// │   null == undefined   → true   (особливе правило ==)
// │   null === undefined  → false  (різні типи)
// │   null == 0           → false  (у == null дорівнює ТІЛЬКИ null і undefined)
// │   null >= 0           → true   😱 а оператори > < >= <= перетворюють null на 0
// │
// │ Корисний прийом: x == null ловить і null, і undefined одним порівнянням.
// │ Це єдиний «легальний» випадок == у багатьох стайлгайдах.
// │
// │ 🗣 На співбесіді: «undefined — значення ще немає, його зазвичай ставить рушій.
// │    null — явне "порожньо" від програміста. Вони рівні за ==, але не за ===».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — поверни масив з 9 відповідей
//   [0] null == undefined      [1] null === undefined   [2] typeof undefined
//   [3] Number(null)           [4] Number(undefined)    [5] null == 0
//   [6] null >= 0              [7] JSON.stringify({ a: undefined, b: null })
//   [8] (function (x) { return x; })()
function predictNullUndefined() {
  return todo();
}

// 2. isNil(x) — true для null і undefined, false для всього іншого (0, '', false, NaN...)
// Умова: рівно ОДНЕ порівняння.
// 💡 дивись «Корисний прийом» у теорії
function isNil(x) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictNullUndefined', predictNullUndefined, [
  () => null == undefined, () => null === undefined, () => typeof undefined,
  () => Number(null), () => Number(undefined), () => null == 0,
  () => null >= 0, () => JSON.stringify({ a: undefined, b: null }),
  () => (function (x) { return x; })(),
]);
test('isNil', [
  [() => isNil(null), true],
  [() => isNil(undefined), true],
  [() => isNil(0), false],
  [() => isNil(''), false],
  [() => isNil(false), false],
  [() => isNil(NaN), false],
  [() => isNil([]), false],
  [() => isNil('null'), false],
]);

run('03 — null і undefined');

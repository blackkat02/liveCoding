// ═══════════════════════════════════════════════════════════
// 📦 01 — ТИПИ ДАНИХ І typeof
// ❓ Які основні типи даних є в JavaScript?
// ❓ ➕ Які пастки має typeof?
// Запуск: node 01-types.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │ У JS 8 типів: 7 ПРИМІТИВІВ + об'єкт.
// │
// │   тип        приклад                 typeof
// │   number     42, 3.14, NaN, Infinity 'number'
// │   bigint     10n                     'bigint'
// │   string     'hi'                    'string'
// │   boolean    true                    'boolean'
// │   undefined  undefined               'undefined'
// │   null       null                    'object'   ⚠️ історичний баг мови
// │   symbol     Symbol('id')            'symbol'
// │   object     {}, [], new Date()      'object'
// │              функції                 'function' (теж об'єкт, але «викликаний»)
// │
// │ ПРИМІТИВИ незмінні: 'abc'.toUpperCase() не змінює рядок, а повертає новий.
// │ Порівнюються за ЗНАЧЕННЯМ.
// │ ОБ'ЄКТИ (масиви, функції, Date, Map...) зберігаються за ПОСИЛАННЯМ.
// │
// │ Пастки typeof:
// │   typeof null       → 'object'   (а не 'null')
// │   typeof []         → 'object'   (масив — це об'єкт)
// │   typeof NaN        → 'number'   («не число» має тип число 🙃)
// │   typeof undeclared → 'undefined' (навіть якщо змінної взагалі немає — без помилки)
// │
// │ Як визначити точно:
// │   value === null      Array.isArray(value)      value instanceof Date
// │   Number.isNaN(value) Object.prototype.toString.call(value) → '[object Array]'
// │
// │ 🗣 На співбесіді: «Сім примітивів — number, bigint, string, boolean, undefined,
// │    null, symbol — і object. Примітиви незмінні й копіюються за значенням,
// │    об'єкти — за посиланням. typeof null дає 'object' — це баг мови».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — що поверне typeof? Поверни масив з 11 рядків.
//   [0] typeof 42          [1] typeof 'hi'        [2] typeof true
//   [3] typeof undefined   [4] typeof null        [5] typeof {}
//   [6] typeof []          [7] typeof function () {}
//   [8] typeof Symbol()    [9] typeof 10n         [10] typeof NaN
function predictTypeof() {
  return todo();
}

// 2. getType(value) — «чесний» typeof
//   getType(null) → 'null'       getType([]) → 'array'     getType(new Date()) → 'date'
//   getType(NaN) → 'nan'         getType(1) → 'number'     getType({}) → 'object'
//   getType(() => {}) → 'function'   getType(undefined) → 'undefined'   getType(1n) → 'bigint'
// 💡 спершу перевір особливі випадки (null, масив, дата, NaN), а для решти вистачить typeof
// 🎯 Бонус: через Object.prototype.toString.call(value)
function getType(value) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictTypeof', predictTypeof, [
  () => typeof 42, () => typeof 'hi', () => typeof true,
  () => typeof undefined, () => typeof null, () => typeof {},
  () => typeof [], () => typeof function () {},
  () => typeof Symbol(), () => typeof 10n, () => typeof NaN,
]);
test('getType', [
  [() => getType(null), 'null'],
  [() => getType(undefined), 'undefined'],
  [() => getType([]), 'array'],
  [() => getType({}), 'object'],
  [() => getType(new Date(0)), 'date'],
  [() => getType(NaN), 'nan'],
  [() => getType(1), 'number'],
  [() => getType('a'), 'string'],
  [() => getType(true), 'boolean'],
  [() => getType(() => {}), 'function'],
  [() => getType(1n), 'bigint'],
  [() => getType(Symbol('s')), 'symbol'],
]);

run('01 — Типи і typeof');

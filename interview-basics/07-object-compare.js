// ═══════════════════════════════════════════════════════════
// 📦 07 — ПОРІВНЯННЯ ОБ'ЄКТІВ
// ❓ Чому порівняння двох схожих об'єктів може повернути false?
// ❓ Як перевірити, чи дві змінні посилаються на один і той самий об'єкт?
// Запуск: node 07-object-compare.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │ Змінна з об'єктом зберігає не сам об'єкт, а його АДРЕСУ в пам'яті (посилання).
// │ Кожен {} або [] створює НОВИЙ об'єкт за НОВОЮ адресою.
// │ === для об'єктів порівнює АДРЕСИ, а не вміст.
// │
// │   {} === {}           → false  — два різні об'єкти
// │   [1, 2] === [1, 2]   → false
// │
// │   const a = { x: 1 };
// │   const b = a;        — копіюється АДРЕСА, а не об'єкт
// │   a === b             → true   — це ОДИН об'єкт
// │   b.x = 2;  a.x       → 2      — бо змінюємо той самий об'єкт
// │
// │ ✅ «Чи це один і той самий об'єкт?» → просто a === b (або Object.is(a, b)).
// │
// │ ✅ «Чи однаковий вміст?» → треба порівнювати поля:
// │   • поверхнево (shallow): ті самі ключі + Object.is(a[k], b[k]) для кожного ключа
// │   • глибоко (deep): рекурсія (deepEqual з блоку 04 у practice/)
// │   • JSON.stringify(a) === JSON.stringify(b) — ⚠️ ненадійно: залежить від
// │     порядку ключів, губить undefined і функції
// │
// │ Де це важливо: React порівнює стан і пропси за посиланням.
// │ Новий {} у кожному рендері означає «змінилося».
// │
// │ 🗣 На співбесіді: «Об'єкти порівнюються за посиланням: === перевіряє, чи це
// │    той самий об'єкт у пам'яті, а не чи однаковий вміст. Для вмісту потрібне
// │    shallow- чи deep-порівняння».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — масив з 6 відповідей
//   [0] {} === {}           [1] [] === []          [2] [1, 2] == '1,2'
//   [3] objectsA()          [4] objectsB()         [5] objectsC()
function objectsA() { const a = { x: 1 }; const b = a; b.x = 2; return a.x; }
function objectsB() { const a = { x: 1 }; return JSON.stringify(a) === JSON.stringify({ x: 1 }); }
function objectsC() { return JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ b: 2, a: 1 }); }
function predictObjects() {
  return todo();
}

// 2. isSameObject(a, b) — чи посилаються змінні на ОДИН і той самий об'єкт
// 💡 одна операція. Чому тут НЕ треба порівнювати поля?
function isSameObject(a, b) {
  return todo();
}

// 3. shallowEqual(a, b) — порівняти об'єкти на ОДИН рівень углиб (як React.memo)
//   shallowEqual({ a: 1, b: 'x' }, { b: 'x', a: 1 }) → true
//   shallowEqual({ a: {} }, { a: {} })              → false (різні посилання!)
//   shallowEqual({ a: 1 }, { a: 1, b: 2 })          → false
// 💡 Object.keys, length, every, Object.hasOwn, Object.is
function shallowEqual(a, b) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictObjects', predictObjects, [
  () => ({}) === {}, () => [] === [], () => [1, 2] == '1,2',
  () => objectsA(), () => objectsB(), () => objectsC(),
]);
test('isSameObject', [
  [() => { const a = { x: 1 }; const b = a; return isSameObject(a, b); }, true],
  [() => isSameObject({ x: 1 }, { x: 1 }), false],
  [() => { const a = [1]; return isSameObject(a, [...a]); }, false],
]);
test('shallowEqual', [
  [() => shallowEqual({ a: 1, b: 'x' }, { b: 'x', a: 1 }), true],
  [() => shallowEqual({ a: {} }, { a: {} }), false],
  [() => { const n = {}; return shallowEqual({ a: n }, { a: n }); }, true],
  [() => shallowEqual({ a: 1 }, { a: 1, b: 2 }), false],
  [() => shallowEqual({ a: undefined }, { b: undefined }), false],
  [() => shallowEqual({ a: NaN }, { a: NaN }), true],
  [() => shallowEqual({}, {}), true],
]);

run("07 — Порівняння об'єктів");

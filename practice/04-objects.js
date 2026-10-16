// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 04 — ОБ'ЄКТИ
// Object.keys/values/entries/fromEntries, spread, деструктуризація, ?. і ??
// Запуск: node 04-objects.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. countKeys(obj)
//   countKeys({ a: 1, b: 2 }) → 2
// 💡 Object.keys
function countKeys(obj) {
  return Object.keys(obj).length;
}

// 2. sumValues(obj)
//   sumValues({ a: 1, b: 2, c: 3 }) → 6
// 💡 Object.values + reduce
function sumValues(obj) {
  return Object.values(obj).reduce((acc, num) => acc + num, 0);
}

// 3. formatUser(user) — використай ДЕСТРУКТУРИЗАЦІЮ з дефолтами прямо в параметрах
//   formatUser({ name: 'Anna', address: { city: 'Kyiv' } }) → 'Anna (Kyiv)'
//   formatUser({ name: 'Anna' })                           → 'Anna (unknown)'
// 💡 function f({ name, address: { city = 'unknown' } = {} }) { ... }
function formatUser({ name, address: { city = 'unknown' } = {} }) {
  // const { name, address = {} } = user
  // const { city = 'unknown' } = address

  return `${name} (${city})`;

  // const default1 = "(unknown)";
  // return user.address?.city ? `${user.name} (${user.address.city})` : `${user.name} ${default1}`;
}

// 4. invert(obj) — ключі ↔ значення
//   invert({ a: 'x', b: 'y' }) → { x: 'a', y: 'b' }
// 💡 Object.entries, map, Object.fromEntries
function invert(obj) {
  const res = Object.entries(obj).map(([key, value]) => [value, key]);
  return Object.fromEntries(res);
}

// 5. pick(obj, keys)
//   pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) → { a: 1, c: 3 }
// 💡 Object.fromEntries + filter  або  reduce;  перевірка: key in obj
function pick(obj, keys) {
  // return keys.reduce((acc, key) => Object.hasOwn(obj, key) ? { ...acc, [key]: obj[key] } : acc, {});

  return keys.reduce((acc, key) => {
    if (Object.hasOwn(obj, key)) acc[key] = obj[key];
    return acc;
  }, {});
}

// 6. omit(obj, keys)
//   omit({ a: 1, b: 2, c: 3 }, ['b']) → { a: 1, c: 3 }
// 💡 Object.entries + filter + includes  (або rest: const { b, ...rest } = obj — для одного ключа)
function omit(obj, keys) {
  return todo();
}

// 7. mapValues(obj, fn)
//   mapValues({ a: 1, b: 2 }, (v) => v * 10) → { a: 10, b: 20 }
function mapValues(obj, fn) {
  return todo();
}

// 8. updateUser(user, changes) — повернути НОВИЙ об'єкт, оригінал не мутувати
//   updateUser({ name: 'A', age: 1 }, { age: 2 }) → { name: 'A', age: 2 }
// 💡 spread { ...a, ...b }   або Object.assign({}, a, b)
function updateUser(user, changes) {
  return todo();
}

// 9. getIn(obj, path, defaultValue)
//   getIn({ a: { b: { c: 42 } } }, 'a.b.c')        → 42
//   getIn({ a: {} }, 'a.b.c', 'нема')              → 'нема'
// 💡 split('.'), reduce, ?. , ??
function getIn(obj, path, defaultValue) {
  return todo();
}

// 10. hasOwn(obj, key) — тільки ВЛАСНІ ключі (не з прототипу)
//   hasOwn({ a: 1 }, 'a') → true;   hasOwn({ a: 1 }, 'toString') → false
// 💡 Object.hasOwn  (а чим відрізняється оператор `in`?)
function hasOwnKey(obj, key) {
  return todo();
}

// 11. deepClone(value) — ВЛАСНА рекурсивна копія об'єктів і масивів (без structuredClone/JSON)
// 💡 typeof, Array.isArray, null — теж typeof 'object'!, рекурсія
function deepClone(value) {
  return todo();
}

// 12. deepEqual(a, b) — рекурсивне порівняння (об'єкти, масиви, примітиви)
//   deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }) → true
// 💡 ===, Object.keys довжини, every, рекурсія
function deepEqual(a, b) {
  return todo();
}

// 13. deepMerge(target, source) — повернути НОВИЙ об'єкт; вкладені об'єкти зливаються, а не замінюються
//   deepMerge({ a: 1, n: { x: 1 } }, { b: 2, n: { y: 2 } }) → { a: 1, b: 2, n: { x: 1, y: 2 } }
function deepMerge(target, source) {
  return todo();
}

// 14. freezeConfig(config) — заморозити об'єкт і повернути його.
// Після цього спроба змінити поле не повинна нічого змінити.
// 💡 Object.freeze  (а вкладені об'єкти теж заморожуються?)
function freezeConfig(config) {
  return todo();
}

// 15. entriesToTable(obj) — рядок "ключ: значення" через перенос рядка, ключі відсортовані
//   entriesToTable({ b: 2, a: 1 }) → 'a: 1\nb: 2'
// 💡 Object.entries, sort, map, template literal, join('\n')
function entriesToTable(obj) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('countKeys', [
  [() => countKeys({ a: 1, b: 2 }), 2],
  [() => countKeys({}), 0],
]);
test('sumValues', [[() => sumValues({ a: 1, b: 2, c: 3 }), 6]]);
test('formatUser', [
  [() => formatUser({ name: 'Anna', address: { city: 'Kyiv' } }), 'Anna (Kyiv)'],
  [() => formatUser({ name: 'Anna' }), 'Anna (unknown)'],
]);
test('invert', [[() => invert({ a: 'x', b: 'y' }), { x: 'a', y: 'b' }]]);
test('pick', [
  [() => pick({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 }],
  [() => pick({ a: 1 }, ['a', 'zzz']), { a: 1 }],
]);
test('omit', [[() => omit({ a: 1, b: 2, c: 3 }, ['b']), { a: 1, c: 3 }]]);
test('mapValues', [[() => mapValues({ a: 1, b: 2 }, (v) => v * 10), { a: 10, b: 20 }]]);
test('updateUser', [
  [() => updateUser({ name: 'A', age: 1 }, { age: 2 }), { name: 'A', age: 2 }],
  [() => { const u = { age: 1 }; updateUser(u, { age: 5 }); return u; }, { age: 1 }, 'оригінал не змінюється'],
]);
test('getIn', [
  [() => getIn({ a: { b: { c: 42 } } }, 'a.b.c'), 42],
  [() => getIn({ a: {} }, 'a.b.c', 'нема'), 'нема'],
  [() => getIn({ a: { b: 0 } }, 'a.b', 'нема'), 0],
]);
test('hasOwnKey', [
  [() => hasOwnKey({ a: 1 }, 'a'), true],
  [() => hasOwnKey({ a: 1 }, 'toString'), false],
]);
test('deepClone', [
  [() => deepClone({ a: 1, b: { c: [1, 2, { d: 3 }] }, e: null }), { a: 1, b: { c: [1, 2, { d: 3 }] }, e: null }],
  [() => { const o = { b: { c: [1] } }; const c = deepClone(o); return c !== o && c.b !== o.b && c.b.c !== o.b.c; }, true, 'всі рівні — нові посилання'],
]);
test('deepEqual', [
  [() => deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), true],
  [() => deepEqual({ a: 1 }, { a: 1, b: 2 }), false],
  [() => deepEqual([1, 2], [2, 1]), false],
  [() => deepEqual(null, {}), false],
  [() => deepEqual('x', 'x'), true],
]);
test('deepMerge', [
  [() => deepMerge({ a: 1, n: { x: 1 } }, { b: 2, n: { y: 2 } }), { a: 1, b: 2, n: { x: 1, y: 2 } }],
  [() => { const t = { n: { x: 1 } }; deepMerge(t, { n: { y: 2 } }); return t; }, { n: { x: 1 } }, 'target не змінюється'],
]);
test('freezeConfig', [
  [() => { const c = freezeConfig({ port: 80 }); try { c.port = 1; } catch {} return [c.port, Object.isFrozen(c)]; }, [80, true]],
]);
test('entriesToTable', [[() => entriesToTable({ b: 2, a: 1 }), 'a: 1\nb: 2']]);

run("Блок 04 — Об'єкти");

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

  // return keys.reduce((acc, key) => {
  //   if (Object.hasOwn(obj, key)) acc[key] = obj[key];
  //   return acc;
  // }, {});


  const keptEntries = Object.entries(obj).filter(([key]) => keys.includes(key))
  return Object.fromEntries(keptEntries)
}

// 6. omit(obj, keys)
//   omit({ a: 1, b: 2, c: 3 }, ['b']) → { a: 1, c: 3 }
// 💡 Object.entries + filter + includes  (або rest: const { b, ...rest } = obj — для одного ключа)
function omit(obj, keys) {
  const keptEntries = Object.entries(obj).filter(([key]) => !keys.includes(key))
  return Object.fromEntries(keptEntries);

  // const key = keys[0]
  // const { [key]: /_, ...rest } = obj;
  // return rest;

  // return keys.reduce((acc, key) => {
  //   const { [key]: _, ...rest } = acc;
  //   return rest
  // }, obj)
}

// 7. mapValues(obj, fn)
//   mapValues({ a: 1, b: 2 }, (v) => v * 10) → { a: 10, b: 20 }
function mapValues(obj, fn) {
  const keptEntries = Object.entries(obj).map(([key, value]) => [key, fn(value)])
  return Object.fromEntries(keptEntries);
}

// 8. updateUser(user, changes) — повернути НОВИЙ об'єкт, оригінал не мутувати
//   updateUser({ name: 'A', age: 1 }, { age: 2 }) → { name: 'A', age: 2 }
// 💡 spread { ...a, ...b }   або Object.assign({}, a, b)
function updateUser(user, changes) {
  // return Object.assign({}, user, changes);
  return { ...user, ...changes };
}

// 9. getIn(obj, path, defaultValue)
//   getIn({ a: { b: { c: 42 } } }, 'a.b.c')        → 42
//   getIn({ a: {} }, 'a.b.c', 'нема')              → 'нема'
// 💡 split('.'), reduce, ?. , ??
function getIn(obj, path, defaultValue) {
  const splitPath = path.split('.')

  // return splitPath.reduce((acc, sPath) => {
  //   acc = acc[sPath] ?? defaultValue
  //   return acc
  // }, obj)

  // let acc = { ...obj }

  for (let i = 0; i < splitPath.length; i++) {
    obj = obj[splitPath[i]] ?? defaultValue
    if (obj === defaultValue) { return obj }
  }
  return obj
}

// 10. hasOwn(obj, key) — тільки ВЛАСНІ ключі (не з прототипу)
//   hasOwn({ a: 1 }, 'a') → true;   hasOwn({ a: 1 }, 'toString') → false
// 💡 Object.hasOwn  (а чим відрізняється оператор `in`?)
function hasOwnKey(obj, key) {
  return Object.hasOwn(obj, key);
}

// 11. deepClone(value) — ВЛАСНА рекурсивна копія об'єктів і масивів (без structuredClone/JSON)
// 💡 typeof, Array.isArray, null — теж typeof 'object'!, рекурсія
function deepClone(value) {
  let copy = {};

  if (typeof value !== 'object' || value === null) {
    copy = value
    return copy;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  if ( Object.getPrototypeOf(value) === Object.prototype) {
    for (const key of Object.keys(value)) {
      copy[key] = deepClone(value[key]);
    }
    return copy;
  }

  return copy;
}

// 12. deepEqual(a, b) — рекурсивне порівняння (об'єкти, масиви, примітиви)
//   deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }) → true
// 💡 ===, Object.keys довжини, every, рекурсія
function deepEqual(a, b) {
  if (typeof a !== typeof b) { return false };

  if (a === null || b === null) return a === b;
 
  if (typeof a !== 'object') {
    return a === b
  }

  if (Object.keys(a).length !== Object.keys(b).length) { return false };

  if (Array.isArray(a) !== Array.isArray(b)) { return false };

  for (let key of Object.keys(a)) {
    if (!Object.hasOwn(b, key)) {
      return false
    }

    if (deepEqual(a[key], b[key]) === false) { return false }
  }

  return true;
}

// 13. deepMerge(target, source) — повернути НОВИЙ об'єкт; вкладені об'єкти зливаються, а не замінюються
//   deepMerge({ a: 1, n: { x: 1 } }, { b: 2, n: { y: 2 } }) → { a: 1, b: 2, n: { x: 1, y: 2 } }
function deepMerge(target, source) {
  const obj = { ...target }

  for (let key in source) {
    if (Object.hasOwn(source, key)) {
      if (!Object.hasOwn(obj, key)) {
        obj[key] = source[key]
      } else {
        if (source[key] === null) {
          obj[key] = null
        } else if ( obj[key] === null
          || (Object.getPrototypeOf(obj[key]) !== Object.prototype) 
          || (Object.getPrototypeOf(source[key]) !== Object.prototype) ) {
          obj[key] = source[key]
        } else {    
          obj[key] =  deepMerge(obj[key], source[key])      
        }
      }
    }
  };

  return obj;
}

// 14. freezeConfig(config) — заморозити об'єкт і повернути його.
// Після цього спроба змінити поле не повинна нічого змінити.
// 💡 Object.freeze  (а вкладені об'єкти теж заморожуються?)
function freezeConfig(config) {
  return Object.freeze(config);
}

// 15. entriesToTable(obj) — рядок "ключ: значення" через перенос рядка, ключі відсортовані
//   entriesToTable({ b: 2, a: 1 }) → 'a: 1\nb: 2'
// 💡 Object.entries, sort, map, template literal, join('\n')
function entriesToTable(obj) {
  const arr = Object.entries(obj).sort(([key1], [key2]) => key1.localeCompare(key2));
  return arr.map(([key, value]) => `${key}: ${value}`).join("\n")
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
  [() => deepEqual({ a: 1 }, { a: 2 }), false, 'однакові ключі, різні значення'],
  [() => deepEqual({ a: 1 }, { b: 1 }), false, 'різні ключі, однакові значення'],
  [() => deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true, 'порядок ключів не важливий'],
  [() => deepEqual({ a: undefined }, { b: undefined }), false, 'ключ з undefined ≠ відсутній ключ'],
  [() => deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] }), false, 'різниця глибоко всередині'],
  [() => deepEqual([], {}), false, 'масив ≠ об\'єкт'],
  [() => deepEqual({ 0: 1 }, [1]), false, 'об\'єкт ≠ масив (інший порядок аргументів)'],
  [() => deepEqual(null, null), true],
  [() => deepEqual(1, '1'), false, 'різні типи'],
]);
test('deepMerge', [
  [() => deepMerge({ a: 1, n: { x: 1 } }, { b: 2, n: { y: 2 } }), { a: 1, b: 2, n: { x: 1, y: 2 } }],
  [() => { const t = { n: { x: 1 } }; deepMerge(t, { n: { y: 2 } }); return t; }, { n: { x: 1 } }, 'target не змінюється'],
  [() => deepMerge({ a: 1 }, { a: 2 }), { a: 2 }, 'примітив перезаписує примітив'],
  [() => deepMerge({ a: { x: 1 } }, { a: 5 }), { a: 5 }, 'примітив перезаписує об\'єкт'],
  [() => deepMerge({ a: 1 }, { a: { x: 1 } }), { a: { x: 1 } }, 'об\'єкт перезаписує примітив'],
  [() => deepMerge({ a: null }, { a: { x: 1 } }), { a: { x: 1 } }, 'null у target'],
  [() => deepMerge({ a: { x: 1 } }, { a: null }), { a: null }, 'null у source перезаписує'],
  [() => deepMerge({ a: [1] }, { a: [2] }), { a: [2] }, 'масиви не зливаються, а замінюються'],
  [() => deepMerge({ a: { b: { c: 1, d: 1 } } }, { a: { b: { c: 2 } } }), { a: { b: { c: 2, d: 1 } } }, '3 рівні вкладеності'],
]);
test('freezeConfig', [
  [() => { const c = freezeConfig({ port: 80 }); try { c.port = 1; } catch {} return [c.port, Object.isFrozen(c)]; }, [80, true]],
]);
test('entriesToTable', [[() => entriesToTable({ b: 2, a: 1 }), 'a: 1\nb: 2']]);

run("Блок 04 — Об'єкти");

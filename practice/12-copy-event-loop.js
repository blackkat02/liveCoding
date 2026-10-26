// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 12 — КОПІЮВАННЯ І EVENT LOOP (live-coding)
// посилання vs значення, shallow/deep copy, JSON/structuredClone, імутабельні оновлення,
// синхронний код → мікротаски → макротаски, async/await, process.nextTick
// Запуск: node 12-copy-event-loop.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// ─────────────── ЧАСТИНА 1: КОПІЮВАННЯ ───────────────
// Задачі «передбач результат»: НЕ запускай код — спершу подумай і поверни масив відповідей.
// Потім можеш перевірити, вставивши фрагмент у консоль.

// 1. referenceVsSpread() — що буде в кінці?
//   const a = { n: 1, inner: { m: 1 } };
//   const b = a;
//   const c = { ...a };
//   b.n = 2;
//   c.n = 3;
//   c.inner.m = 4;
//   → [a.n, a.inner.m, b.n, c.n, a === b, a.inner === c.inner]
// 💡 присвоєння копіює посилання; spread — лише перший рівень
function referenceVsSpread() {
  return todo(); // поверни масив з 6 значень
}

// 2. arraySpreadCopy() — що буде з оригінальним масивом?
//   const arr = [{ x: 1 }, { x: 2 }];
//   const copy = [...arr];
//   copy.push({ x: 3 });
//   copy[0].x = 99;
//   copy[1] = { x: 50 };
//   → [arr.length, arr[0].x, arr[1].x]
// 💡 змінити об'єкт за посиланням ≠ замінити елемент масиву
function arraySpreadCopy() {
  return todo();
}

// 3. passBySharing() — що змінить функція?
//   function change(obj, num) {
//     num = 100;
//     obj.a = 2;
//     obj = { a: 3 };
//     obj.b = 4;
//   }
//   const o = { a: 1 };
//   let n = 1;
//   change(o, n);
//   → [o.a, o.b, n]
// 💡 параметр — локальна змінна з копією посилання. Мутація vs перепризначення
function passBySharing() {
  return todo();
}

// 4. jsonCloneLoss() — що лишиться після JSON-копії?
//   const src = { d: new Date(0), u: undefined, f() {}, n: NaN, arr: [undefined, () => 1], nested: { i: Infinity } };
//   JSON.parse(JSON.stringify(src))  → ?
// Поверни ОБ'ЄКТ, який вийде.
// 💡 що JSON вміє зберігати? що буде з undefined/функцією у властивості і в масиві? Date.prototype.toJSON
function jsonCloneLoss() {
  return todo();
}

// 5. structuredCloneFacts() — три питання про structuredClone:
//   [ structuredClone({ d: new Date(0) }).d instanceof Date,
//     назва помилки (e.name) при structuredClone({ f() {} }),
//     const o = {}; o.self = o; const c = structuredClone(o); c.self === c ]
// 💡 MDN: «The structured clone algorithm» — що підтримує, а що ні
function structuredCloneFacts() {
  return todo();
}

// 6. updateIn(obj, path, value) — ІМУТАБЕЛЬНО встановити значення за шляхом-масивом ключів.
//   updateIn({ a: { b: 1 }, z: { k: 1 } }, ['a', 'b'], 2) → { a: { b: 2 }, z: { k: 1 } }
// Вимоги: оригінал не змінюється; гілки, яких не торкались, — ТІ САМІ посилання
// (structural sharing, як у Redux/React state); відсутні проміжні об'єкти створюються.
// Сусідні ключі на шляху зберігаються: updateIn({ a: { b: 1, c: 2 } }, ['a', 'b'], 9) → { a: { b: 9, c: 2 } }
// 💡 копіюй тільки вузли на шляху: spread + рекурсія (або цикл з кінця)
function updateIn(obj, path, value) {
  return todo();
}

// 7. deepCloneFull(value) — deepClone з блоку 04, але дорослий:
//   - Date → нова Date з тим самим часом
//   - Map / Set → нові Map / Set з глибоко скопійованим вмістом
//   - циклічні посилання (o.self = o) не ламають функцію
//   - спільні посилання зберігаються: { p: x, q: x } → у копії c.p === c.q
//   - примітиви і null повертаються як є: deepCloneFull(5) → 5
// 💡 instanceof; WeakMap «оригінал → копія»: запиши копію в map ДО рекурсії в дітей
function deepCloneFull(value) {
  return todo();
}

// ─────────────── ЧАСТИНА 2: EVENT LOOP ───────────────
// Порядок: увесь синхронний код → ВСІ мікротаски (then, await, queueMicrotask) → ОДНА макротаска (setTimeout) → знову всі мікротаски → ...
// Поверни масив міток у порядку виводу. Не запускай — спершу намалюй черги на папері!

// 8. asyncAwaitOrder()
//   log('1');
//   setTimeout(() => log('2'), 0);
//   async function f() { log('3'); await g(); log('4'); }
//   async function g() { log('5'); }
//   f();
//   Promise.resolve().then(() => log('6'));
//   log('7');
// 💡 тіло async-функції до першого await — синхронне; все після await — мікротаска
function asyncAwaitOrder() {
  return todo();
}

// 9. nestedQueuesOrder()
//   setTimeout(() => { log('A'); Promise.resolve().then(() => log('B')); }, 0);
//   setTimeout(() => log('C'), 0);
//   Promise.resolve().then(() => { log('D'); setTimeout(() => log('E'), 0); });
//   queueMicrotask(() => log('F'));
//   new Promise((res) => { log('G'); res(); }).then(() => log('H'));
//   log('I');
// 💡 executor у new Promise — синхронний; мікротаски з макротаски виконуються ДО наступної макротаски
function nestedQueuesOrder() {
  return todo();
}

// 10. thenChainsOrder()
//   Promise.resolve().then(() => log('a1')).then(() => log('a2')).then(() => log('a3'));
//   Promise.resolve().then(() => log('b1')).then(() => log('b2'));
// 💡 наступний .then ставиться в чергу лише коли попередній виконався
function thenChainsOrder() {
  return todo();
}

// 11. nodeTickOrder() — Node.js, звичайний скрипт (top-level)
//   log('S');
//   setTimeout(() => log('T'), 0);
//   Promise.resolve().then(() => log('P'));
//   process.nextTick(() => log('N'));
//   log('E');
// 💡 у Node є ще черга process.nextTick — коли вона виконується відносно Promise?
function nodeTickOrder() {
  return todo();
}

// 12. varLetTimers() — що буде в r1 і r2 після всіх таймерів?
//   const r1 = []; for (var i = 0; i < 3; i++) setTimeout(() => r1.push(i), 0);
//   const r2 = []; for (let j = 0; j < 3; j++) setTimeout(() => r2.push(j), 0);
//   → [r1, r2]
// 💡 коли виконуються колбеки — і яке значення i на той момент? скільки змінних i, а скільки j?
// 🎯 Бонус: як виправити варіант з var БЕЗ let? (IIFE, третій аргумент setTimeout)
function varLetTimers() {
  return todo();
}

// 13. promiseAll(items) — СВІЙ Promise.all (без Promise.all/allSettled)
//   - результати в порядку items, а не в порядку завершення
//   - елементи можуть бути не промісами (2 → як Promise.resolve(2))
//   - перша помилка → reject з нею
//   - порожній масив → []
// 💡 new Promise, лічильник виконаних, results[i] = ...; Promise.resolve(item).then(...)
function promiseAll(items) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
const wait = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));

test('referenceVsSpread', [[() => referenceVsSpread(), [2, 4, 2, 3, true, true]]]);
test('arraySpreadCopy', [[() => arraySpreadCopy(), [2, 99, 2]]]);
test('passBySharing', [[() => passBySharing(), [2, undefined, 1]]]);
test('jsonCloneLoss', [[() => jsonCloneLoss(), { d: '1970-01-01T00:00:00.000Z', n: null, arr: [null, null], nested: { i: null } }]]);
test('structuredCloneFacts', [[() => structuredCloneFacts(), [true, 'DataCloneError', true]]]);
test('updateIn', [
  [() => updateIn({ a: { b: 1 }, z: { k: 1 } }, ['a', 'b'], 2), { a: { b: 2 }, z: { k: 1 } }],
  [() => { const o = { a: { b: 1 } }; updateIn(o, ['a', 'b'], 2); return o; }, { a: { b: 1 } }, 'оригінал не змінюється'],
  [() => { const o = { a: { b: 1 }, z: { k: 1 } }; const r = updateIn(o, ['a', 'b'], 2); return [r !== o, r.a !== o.a, r.z === o.z]; }, [true, true, true], 'шлях — нові посилання, решта — ті самі'],
  [() => updateIn({}, ['x', 'y'], 1), { x: { y: 1 } }, 'створює відсутні об\'єкти'],
  [() => updateIn({ a: { b: 1, c: 2 } }, ['a', 'b'], 9), { a: { b: 9, c: 2 } }, 'сусідні ключі на шляху лишаються'],
  [() => updateIn({ a: 1 }, ['a'], 5), { a: 5 }, 'шлях з одного ключа'],
]);
test('deepCloneFull', [
  [() => { const o = { d: new Date(0) }; const c = deepCloneFull(o); return [c.d instanceof Date, c.d.getTime(), c.d !== o.d]; }, [true, 0, true], 'Date'],
  [() => {
    const o = { m: new Map([['k', { v: 1 }]]), s: new Set([1, 2]) };
    const c = deepCloneFull(o);
    return [c.m instanceof Map, c.m.get('k'), c.m.get('k') !== o.m.get('k'), c.s instanceof Set, [...c.s], c.s !== o.s];
  }, [true, { v: 1 }, true, true, [1, 2], true], 'Map і Set'],
  [() => { const o = { n: 1 }; o.self = o; const c = deepCloneFull(o); return [c !== o, c.self === c, c.n]; }, [true, true, 1], 'циклічне посилання'],
  [() => { const x = { v: 1 }; const c = deepCloneFull({ p: x, q: x }); return [c.p === c.q, c.p !== x]; }, [true, true], 'спільні посилання'],
  [() => deepCloneFull({ a: [1, { b: 2 }], e: null }), { a: [1, { b: 2 }], e: null }, 'звичайні об\'єкти й масиви'],
  [() => [deepCloneFull(5), deepCloneFull('s'), deepCloneFull(null)], [5, 's', null], 'примітиви'],
  [() => { const inner = { v: 1 }; const c = deepCloneFull({ s: new Set([inner]) }); return [...c.s][0] !== inner; }, true, 'вміст Set теж копіюється'],
  [() => { const a = [1, { b: 2 }]; const c = deepCloneFull(a); return [Array.isArray(c), c[1] !== a[1]]; }, [true, true], 'масив лишається масивом'],
]);
test('asyncAwaitOrder', [[() => asyncAwaitOrder(), ['1', '3', '5', '7', '4', '6', '2']]]);
test('nestedQueuesOrder', [[() => nestedQueuesOrder(), ['G', 'I', 'D', 'F', 'H', 'A', 'B', 'C', 'E']]]);
test('thenChainsOrder', [[() => thenChainsOrder(), ['a1', 'b1', 'a2', 'b2', 'a3']]]);
test('nodeTickOrder', [[() => nodeTickOrder(), ['S', 'E', 'N', 'P', 'T']]]);
test('varLetTimers', [[() => varLetTimers(), [[3, 3, 3], [0, 1, 2]]]]);
test('promiseAll', [
  [() => promiseAll([Promise.resolve(1), 2, wait(5, 3)]), [1, 2, 3]],
  [() => promiseAll([wait(20, 'slow'), wait(1, 'fast')]), ['slow', 'fast'], 'порядок items, а не завершення'],
  [() => promiseAll([wait(5, 1), Promise.reject(new Error('boom'))]).catch((e) => e.message), 'boom'],
  [() => promiseAll([]), []],
  [() => promiseAll([1, 'a']), [1, 'a'], 'тільки не-проміси'],
]);

run('Блок 12 — Копії і Event Loop');

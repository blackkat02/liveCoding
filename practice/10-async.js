// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 10 — АСИНХРОННІСТЬ
// Promise, async/await, try/catch, Promise.all / allSettled / race / any, setTimeout
// Запуск: node 10-async.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// Фейкове API — повертає Promise. Не чіпай.
const db = { 1: 'Anna', 2: 'Bohdan', 3: 'Vira' };
function fakeApi(id, delay = 10) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (db[id] ? resolve({ id, name: db[id] }) : reject(new Error(`User ${id} not found`))), delay);
  });
}

// 1. sleep(ms) — Promise, що резолвиться через ms
// 💡 new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
  return todo();
}

// 2. getUserName(id) — async/await: повернути ім'я, а при помилці — 'Unknown'
// 💡 async function, await, try/catch
async function getUserName(id) {
  return todo();
}

// 3. getUserNameThen(id) — те саме, але БЕЗ async/await: тільки .then / .catch
function getUserNameThen(id) {
  return todo();
}

// 4. loadAll(ids) — паралельно завантажити всіх, повернути масив імен
//   loadAll([1, 2]) → ['Anna', 'Bohdan'];  loadAll([]) → []
// Якщо хоч один запит упав — loadAll відхиляється з ЦІЄЮ помилкою ('User 99 not found').
// 💡 Promise.all + map
async function loadAll(ids) {
  return todo();
}

// 5. loadAllSafe(ids) — паралельно, але ігнорувати помилки: повернути тільки успішні імена
//   loadAllSafe([1, 99, 3]) → ['Anna', 'Vira'];  всі впали → []
// 💡 Promise.allSettled, status === 'fulfilled'
async function loadAllSafe(ids) {
  return todo();
}

// 6. loadSequential(ids) — СТРОГО по черзі (один за одним), повернути імена
// 💡 for...of + await всередині (НЕ forEach — чому?)
async function loadSequential(ids) {
  return todo();
}

// 7. withTimeout(promise, ms) — якщо promise не встиг за ms → reject(new Error('Timeout'))
// Встиг → його результат. Встиг, але сам упав → його ВЛАСНА помилка (а не 'Timeout').
// 💡 Promise.race
function withTimeout(promise, ms) {
  return todo();
}

// 8. retry(fn, attempts) — викликати async fn; при помилці повторити, всього до attempts разів.
// Якщо всі спроби впали — кинути останню помилку.
// fn викликається РІВНО стільки разів, скільки треба: успіх з першої спроби → 1 виклик; все падає → attempts викликів.
async function retry(fn, attempts) {
  return todo();
}

// 9. firstSuccessful(promises) — перший УСПІШНИЙ результат (помилки ігноруються)
// «Перший» — за часом завершення, а не за позицією в масиві. Якщо впали ВСІ — відхилити (AggregateError).
// 💡 Promise.any
function firstSuccessful(promises) {
  return todo();
}

// 10. promisify(fn) — перетворити callback-функцію fn(arg, (err, result) => ...) на Promise
function promisify(fn) {
  return todo();
}

// 11. eventOrder() — у якому порядку виведеться? Поверни масив з логом.
// Не запускай — спершу подумай! Потім заповни масив і перевір.
//   console.log('A'); setTimeout(() => log('B')); Promise.resolve().then(() => log('C')); log('D');
// 💡 синхронний код → мікротаски (Promise) → макротаски (setTimeout)
function eventOrder() {
  return todo(); // поверни масив на кшталт ['?', '?', '?', '?']
}

// 12. runWithLimit(tasks, limit) — tasks: масив функцій, що повертають Promise.
// Виконувати не більше limit одночасно. Повернути результати в ПОРЯДКУ tasks.
// Не чекати «пачками»: щойно одна задача завершилась — одразу стартує наступна. [] → []; limit > tasks.length — теж ок.
// 💡 воркери: Promise.all(Array.from({ length: limit }, worker)), спільний індекс
async function runWithLimit(tasks, limit) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('sleep', [
  [async () => { const t = Date.now(); await sleep(30); return Date.now() - t >= 25; }, true, 'await sleep(30) чекає ~30мс'],
]);
test('getUserName', [
  [() => getUserName(1), 'Anna'],
  [() => getUserName(99), 'Unknown'],
]);
test('getUserNameThen', [
  [() => getUserNameThen(2), 'Bohdan'],
  [() => getUserNameThen(99), 'Unknown'],
]);
test('loadAll', [
  [() => loadAll([1, 2]), ['Anna', 'Bohdan']],
  [async () => { const t = Date.now(); await loadAll([1, 2, 3]); return Date.now() - t < 28; }, true, 'паралельно (3 запити по 10мс < 28мс)'],
  [() => loadAll([]), []],
  [() => loadAll([1, 99]).catch((e) => e.message), 'User 99 not found', 'помилка пробрасується'],
]);
test('loadAllSafe', [
  [() => loadAllSafe([1, 99, 3]), ['Anna', 'Vira']],
  [() => loadAllSafe([98, 99]), [], 'всі впали'],
  [async () => { const t = Date.now(); await loadAllSafe([1, 2, 3]); return Date.now() - t < 28; }, true, 'паралельно'],
]);
test('loadSequential', [
  [() => loadSequential([3, 1]), ['Vira', 'Anna']],
  [async () => { const t = Date.now(); await loadSequential([1, 2, 3]); return Date.now() - t >= 28; }, true, 'послідовно (3 × 10мс ≥ 28мс)'],
  [() => loadSequential([]), []],
]);
test('withTimeout', [
  [() => withTimeout(sleep(5).then(() => 'ok'), 50), 'ok'],
  [() => withTimeout(new Promise((r) => setTimeout(() => r('late'), 80)), 20).catch((e) => e.message), 'Timeout'],
  [() => withTimeout(fakeApi(99, 5), 50).catch((e) => e.message), 'User 99 not found', 'власна помилка, не Timeout'],
]);
test('retry', [
  [async () => {
    let n = 0;
    return retry(async () => { n++; if (n < 3) throw new Error('fail'); return `ok after ${n}`; }, 5);
  }, 'ok after 3'],
  [async () => {
    let n = 0;
    return retry(async () => { n++; throw new Error(`fail ${n}`); }, 2).catch((e) => e.message);
  }, 'fail 2', 'всі спроби впали → остання помилка'],
  [async () => {
    let n = 0;
    await retry(async () => { n++; throw new Error('x'); }, 3).catch(() => {});
    return n;
  }, 3, 'рівно attempts викликів'],
  [async () => {
    let n = 0;
    const r = await retry(async () => { n++; return 'ok'; }, 5);
    return [r, n];
  }, ['ok', 1], 'успіх одразу → 1 виклик'],
]);
test('firstSuccessful', [
  [() => firstSuccessful([fakeApi(99, 1), fakeApi(2, 20), fakeApi(3, 5)]).then((u) => u.name), 'Vira'],
  [() => firstSuccessful([fakeApi(98, 1), fakeApi(99, 2)]).catch((e) => e.name), 'AggregateError', 'всі впали'],
]);
test('promisify', [
  [() => {
    const cbDouble = (x, cb) => setTimeout(() => (x < 0 ? cb(new Error('neg')) : cb(null, x * 2)), 5);
    const p = promisify(cbDouble);
    return Promise.all([p(21), p(-1).catch((e) => e.message)]);
  }, [42, 'neg']],
]);
test('eventOrder', [[() => eventOrder(), ['A', 'D', 'C', 'B']]]);
test('runWithLimit', [
  [async () => {
    let active = 0;
    let maxActive = 0;
    const mk = (v, ms) => async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise((r) => setTimeout(r, ms));
      active--;
      return v;
    };
    const res = await runWithLimit([mk('a', 30), mk('b', 10), mk('c', 10), mk('d', 5)], 2);
    return [res, maxActive];
  }, [['a', 'b', 'c', 'd'], 2], '[результати по порядку, макс. одночасних]'],
  [() => runWithLimit([], 3), []],
  [() => runWithLimit([async () => 1, async () => 2], 5), [1, 2], 'limit більший за кількість задач'],
  [async () => {
    const t = Date.now();
    const mk = (ms) => () => new Promise((r) => setTimeout(r, ms));
    await runWithLimit([mk(60), mk(10), mk(10), mk(10)], 2);
    return Date.now() - t < 90;
  }, true, 'не пачками: поки йде довга задача, короткі йдуть одна за одною'],
]);

run('Блок 10 — Async');

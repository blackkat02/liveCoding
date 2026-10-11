// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 09 — ФУНКЦІЇ, ЗАМИКАННЯ, this
// rest/spread, дефолтні параметри, замикання, функції що повертають функції
// Запуск: node 09-functions-closures.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. sumAll(...nums) — будь-яка кількість аргументів
//   sumAll(1, 2, 3) → 6;  sumAll() → 0
// 💡 rest-параметр ...nums
function sumAll(...nums) {
  return todo();
}

// 2. greet(name, greeting) — дефолти: name = 'Guest', greeting = 'Hello'
//   greet() → 'Hello, Guest!';  greet('Anna', 'Hi') → 'Hi, Anna!'
// 💡 дефолтні значення параметрів у сигнатурі
function greet(name, greeting) {
  return todo();
}

// 3. createCounter(start = 0) → { inc(), dec(), value() }
// Стан приватний — доступ тільки через методи.
// 💡 замикання: let count всередині функції
function createCounter(start = 0) {
  return todo();
}

// 4. once(fn) — fn виконується лише перший раз, далі повертається перший результат
function once(fn) {
  return todo();
}

// 5. memoize(fn) — кешувати результат за аргументом (один аргумент)
// 💡 Map у замиканні
function memoize(fn) {
  return todo();
}

// 6. pipe(...fns) — зліва направо;  compose(...fns) — справа наліво
//   pipe(add1, double)(3) → 8;   compose(add1, double)(3) → 7
// 💡 reduce / reduceRight
function pipe(...fns) {
  return todo();
}
function compose(...fns) {
  return todo();
}

// 7. curry(fn) — каррінг будь-якої арності
//   curry((a, b, c) => a + b + c)(1)(2)(3) → 6, а також (1, 2)(3) → 6
// 💡 fn.length, рекурсивно збирай аргументи
function curry(fn) {
  return todo();
}

// 8. makeMultiplier(factor) — функція, що множить на factor
//   makeMultiplier(3)(5) → 15
function makeMultiplier(factor) {
  return todo();
}

// 9. callWithThis(obj) — є функція describe, що використовує this.
// Виклич її так, щоб this = obj, з аргументом '!', і поверни результат.
//   callWithThis({ name: 'Anna' }) → 'Anna!'
// 💡 call / apply / bind
function describe(suffix) {
  return this.name + suffix;
}
function callWithThis(obj) {
  return todo();
}

// 10. debounce(fn, ms) — fn викличеться через ms після ОСТАННЬОГО виклику
// 💡 clearTimeout + setTimeout у замиканні; передай аргументи (...args)
function debounce(fn, ms) {
  return todo();
}

// 11. throttle(fn, ms) — fn викликається не частіше ніж раз на ms (перший виклик — одразу)
// 💡 прапорець / час останнього виклику (Date.now())
function throttle(fn, ms) {
  return todo();
}

// 12. createIdGenerator(prefix) — кожен виклик дає новий id
//   const next = createIdGenerator('user'); next() → 'user-1'; next() → 'user-2'
function createIdGenerator(prefix) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

test('sumAll', [
  [() => sumAll(1, 2, 3), 6],
  [() => sumAll(), 0],
]);
test('greet', [
  [() => greet(), 'Hello, Guest!'],
  [() => greet('Anna', 'Hi'), 'Hi, Anna!'],
  [() => greet('Anna'), 'Hello, Anna!'],
]);
test('createCounter', [
  [() => { const c = createCounter(); c.inc(); c.inc(); c.dec(); return c.value(); }, 1, 'inc, inc, dec → 1'],
  [() => { const a = createCounter(10); const b = createCounter(); a.inc(); return [a.value(), b.value()]; }, [11, 0], 'лічильники незалежні'],
]);
test('once', [
  [() => { let n = 0; const f = once((x) => { n++; return x * 2; }); return [f(2), f(5), n]; }, [4, 4, 1]],
]);
test('memoize', [
  [() => { let calls = 0; const f = memoize((x) => { calls++; return x * x; }); return [f(3), f(3), f(4), calls]; }, [9, 9, 16, 2]],
]);
test('pipe / compose', [
  [() => pipe((x) => x + 1, (x) => x * 2)(3), 8],
  [() => compose((x) => x + 1, (x) => x * 2)(3), 7],
]);
test('curry', [
  [() => curry((a, b, c) => a + b + c)(1)(2)(3), 6],
  [() => curry((a, b, c) => a + b + c)(1, 2)(3), 6],
  [() => curry((a, b) => a * b)(4, 5), 20],
]);
test('makeMultiplier', [[() => makeMultiplier(3)(5), 15]]);
test('callWithThis', [[() => callWithThis({ name: 'Anna' }), 'Anna!']]);
test('debounce', [
  [async () => {
    const calls = [];
    const d = debounce((x) => calls.push(x), 30);
    d(1); d(2); d(3);
    await wait(60);
    return calls;
  }, [3], '3 швидкі виклики → 1 виклик з останнім аргументом'],
]);
test('throttle', [
  [async () => {
    const calls = [];
    const t = throttle((x) => calls.push(x), 50);
    t(1); t(2); t(3);
    await wait(70);
    t(4);
    return calls;
  }, [1, 4], 'перший одразу, решта в межах 50мс ігнорується'],
]);
test('createIdGenerator', [
  [() => { const a = createIdGenerator('user'); const b = createIdGenerator('post'); return [a(), a(), b()]; }, ['user-1', 'user-2', 'post-1']],
]);

run('Блок 09 — Функції і замикання');

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
//   greet(undefined, 'Hi') → 'Hi, Guest!'   (дефолт спрацьовує на undefined)
// 💡 дефолтні значення параметрів у сигнатурі
function greet(name, greeting) {
  return todo();
}

// 3. createCounter(start = 0) → { inc(), dec(), value() }
// Стан приватний — доступ тільки через методи: в об'єкті лише inc, dec, value, жодного поля з числом.
//   createCounter(5).value() → 5;  лічильники незалежні;  dec може йти нижче 0
// 💡 замикання: let count всередині функції
function createCounter(start = 0) {
  return todo();
}

// 4. once(fn) — fn виконується лише перший раз, далі повертається перший результат
// Аргументи передаються у fn. «Вже викликали» ≠ «результат truthy»: якщо fn повернула 0 чи undefined — це теж результат.
function once(fn) {
  return todo();
}

// 5. memoize(fn) — кешувати результат за аргументом (один аргумент)
// Кешуються й falsy-результати (0, undefined). Аргументи 1 і '1' — РІЗНІ ключі.
// 💡 Map у замиканні
function memoize(fn) {
  return todo();
}

// 6. pipe(...fns) — зліва направо;  compose(...fns) — справа наліво
//   pipe(add1, double)(3) → 8;   compose(add1, double)(3) → 7
//   без функцій — повертає аргумент як є: pipe()(5) → 5
// 💡 reduce / reduceRight
function pipe(...fns) {
  return todo();
}
function compose(...fns) {
  return todo();
}

// 7. curry(fn) — каррінг будь-якої арності
//   curry((a, b, c) => a + b + c)(1)(2)(3) → 6, а також (1, 2)(3) → 6, (1)(2, 3) → 6
// Часткові виклики можна перевикористати: const add1 = sum(1); add1(2)(3) і add1(10)(20) — не заважають одне одному.
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
// obj не змінювати (не дописувати в нього describe).
// 💡 call / apply / bind
function describe(suffix) {
  return this.name + suffix;
}
function callWithThis(obj) {
  return todo();
}

// 10. debounce(fn, ms) — fn викличеться через ms після ОСТАННЬОГО виклику
// Якщо між викликами пауза довша за ms — кожен з них спрацює окремо. Всі аргументи передаються у fn.
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
// Кожен генератор рахує окремо, з 1.
function createIdGenerator(prefix) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

test('sumAll', [
  [() => sumAll(1, 2, 3), 6],
  [() => sumAll(), 0],
  [() => sumAll(5), 5],
  [() => sumAll(-1, 1, 10), 10],
]);
test('greet', [
  [() => greet(), 'Hello, Guest!'],
  [() => greet('Anna', 'Hi'), 'Hi, Anna!'],
  [() => greet('Anna'), 'Hello, Anna!'],
  [() => greet(undefined, 'Hi'), 'Hi, Guest!', 'undefined → дефолт'],
]);
test('createCounter', [
  [() => { const c = createCounter(); c.inc(); c.inc(); c.dec(); return c.value(); }, 1, 'inc, inc, dec → 1'],
  [() => { const a = createCounter(10); const b = createCounter(); a.inc(); return [a.value(), b.value()]; }, [11, 0], 'лічильники незалежні'],
  [() => { const c = createCounter(); c.dec(); c.dec(); return c.value(); }, -2, 'нижче нуля'],
  [() => Object.keys(createCounter()).sort(), ['dec', 'inc', 'value'], 'тільки методи, стан схований'],
]);
test('once', [
  [() => { let n = 0; const f = once((x) => { n++; return x * 2; }); return [f(2), f(5), n]; }, [4, 4, 1]],
  [() => { let n = 0; const f = once(() => { n++; return 0; }); return [f(), f(), n]; }, [0, 0, 1], 'результат 0'],
  [() => { let n = 0; const f = once(() => { n++; }); f(); f(); f(); return n; }, 1, 'результат undefined'],
  [() => once((a, b) => a + b)(2, 3), 5, 'кілька аргументів'],
]);
test('memoize', [
  [() => { let calls = 0; const f = memoize((x) => { calls++; return x * x; }); return [f(3), f(3), f(4), calls]; }, [9, 9, 16, 2]],
  [() => { let calls = 0; const f = memoize((x) => { calls++; return x * 0; }); return [f(5), f(5), calls]; }, [0, 0, 1], 'falsy-результат теж у кеші'],
  [() => { let calls = 0; const f = memoize((x) => { calls++; return typeof x; }); return [f(1), f('1'), calls]; }, ['number', 'string', 2], "1 і '1' — різні ключі"],
]);
test('pipe / compose', [
  [() => pipe((x) => x + 1, (x) => x * 2)(3), 8],
  [() => compose((x) => x + 1, (x) => x * 2)(3), 7],
  [() => pipe((x) => x + 'a', (x) => x + 'b', (x) => x + 'c')(''), 'abc', 'три функції'],
  [() => compose((x) => x + 'a', (x) => x + 'b', (x) => x + 'c')(''), 'cba'],
  [() => [pipe()(5), compose()(5)], [5, 5], 'без функцій'],
]);
test('curry', [
  [() => curry((a, b, c) => a + b + c)(1)(2)(3), 6],
  [() => curry((a, b, c) => a + b + c)(1, 2)(3), 6],
  [() => curry((a, b) => a * b)(4, 5), 20],
  [() => curry((a, b, c) => a + b + c)(1)(2, 3), 6],
  [() => { const add = curry((a, b, c) => a + b + c); const add1 = add(1); return [add1(2)(3), add1(10)(20)]; }, [6, 31], 'часткові виклики незалежні'],
]);
test('makeMultiplier', [
  [() => makeMultiplier(3)(5), 15],
  [() => { const x2 = makeMultiplier(2); const x10 = makeMultiplier(10); return [x2(4), x10(4), x2(0)]; }, [8, 40, 0], 'незалежні'],
]);
test('callWithThis', [
  [() => callWithThis({ name: 'Anna' }), 'Anna!'],
  [() => callWithThis({ name: 'Bob' }), 'Bob!'],
  [() => { const o = { name: 'X' }; callWithThis(o); return Object.keys(o); }, ['name'], 'obj не змінюється'],
]);
test('debounce', [
  [async () => {
    const calls = [];
    const d = debounce((x) => calls.push(x), 30);
    d(1); d(2); d(3);
    await wait(60);
    return calls;
  }, [3], '3 швидкі виклики → 1 виклик з останнім аргументом'],
  [async () => {
    const calls = [];
    const d = debounce((x) => calls.push(x), 20);
    d(1);
    await wait(50);
    d(2);
    await wait(50);
    return calls;
  }, [1, 2], 'виклики з паузою > ms → обидва спрацюють'],
  [async () => {
    let got;
    const d = debounce((a, b) => { got = a + b; }, 10);
    d(2, 3);
    await wait(30);
    return got;
  }, 5, 'кілька аргументів'],
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
  [() => { const a = createIdGenerator('x'); createIdGenerator('x')(); return a(); }, 'x-1', 'однаковий префікс — все одно окремий лічильник'],
]);

run('Блок 09 — Функції і замикання');

// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 06 — ЧИСЛА І Math
// Запуск: node 06-numbers-math.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. minMax(nums) → { min, max }
//   minMax([3, 1, 4, 1, 5]) → { min: 1, max: 5 }
// 💡 Math.min(...arr), Math.max(...arr)
function minMax(nums) {
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

// 2. roundTo(num, digits)
//   roundTo(2.71828, 3) → 2.718;  roundTo(10, 2) → 10
// Повертає ЧИСЛО, не рядок.
// 💡 toFixed повертає РЯДОК → Number(...)  /  або Math.round(num * 10 ** d) / 10 ** d
function roundTo(num, digits) {
  return Number(num.toFixed(digits))

}

// 3. clamp(n, min, max) — обмежити число межами
//   clamp(15, 0, 10) → 10;  clamp(-5, 0, 10) → 0
// 💡 Math.min / Math.max
function clamp(n, min, max) {
  // console.log(min)
  // return (n, min, max).Math.min()
  return todo();
}

// 4. randomInt(min, max) — ціле випадкове від min до max ВКЛЮЧНО
// 💡 Math.random, Math.floor
function randomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// 5. sumDigits(n)
//   sumDigits(1234) → 10;  sumDigits(-56) → 11
// 💡 Math.abs, String, split, Number   🎯 Бонус: через % 10 і Math.trunc
function sumDigits(n) {
  return todo();
}

// 6. reverseNumber(n)
//   reverseNumber(123) → 321;  reverseNumber(-120) → -21;  reverseNumber(1000) → 1
// Знак зберігається, нулі, що опинились попереду, зникають. Повертає ЧИСЛО.
// 💡 Math.sign, Math.abs, parseInt
function reverseNumber(n) {
  return todo();
}

// 7. isPrime(n)
//   isPrime(7) → true;  isPrime(1) → false;  isPrime(9) → false
// Числа < 2 (0, 1, від'ємні) — не прості.
// 💡 цикл до Math.sqrt(n), %
function isPrime(n) {
  return todo();
}

// 8. factorial(n) — рекурсивно
//   factorial(5) → 120;  factorial(0) → 1
function factorial(n) {
  return todo();
}

// 9. fibonacci(n) — n-те число, ЦИКЛОМ (fib(0)=0, fib(1)=1)
//   fibonacci(10) → 55
// 💡 деструктуризація для обміну: [a, b] = [b, a + b]
function fibonacci(n) {
  return todo();
}

// 10. gcd(a, b) — найбільший спільний дільник (алгоритм Евкліда)
//   gcd(48, 18) → 6;  gcd(18, 48) → 6;  gcd(5, 0) → 5
function gcd(a, b) {
  return todo();
}

// 11. parseNumbers(strings) — перетворити в числа, відкинути все, що не число
//   parseNumbers(['1', '2.5', 'abc', '10px']) → [1, 2.5, 10]
// Рядок лишається, якщо ПОЧИНАЄТЬСЯ з числа (як '10px'); 'px10' і '' — відкинути. '0' — це число, його лишити.
// 💡 parseFloat vs Number (яка різниця на '10px'?), Number.isNaN, filter
function parseNumbers(strings) {
  return todo();
}

// 12. toBinary(n) / fromBinary(str)
//   toBinary(10) → '1010';  fromBinary('1010') → 10;  toBinary(0) → '0'
// 💡 toString(2), parseInt(str, 2)
function toBinary(n) {
  return todo();
}
function fromBinary(str) {
  return todo();
}

// 13. formatMoney(amount)
//   formatMoney(1234567.891) → '$1,234,567.89';  formatMoney(5) → '$5.00'  (завжди 2 знаки після крапки)
// 💡 Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })  або  toLocaleString
function formatMoney(amount) {
  return todo();
}

// 14. isInteger(value) — тільки справжні цілі числа
//   isInteger(5) → true;  isInteger(5.5) → false;  isInteger('5') → false
// 💡 Number.isInteger
function isInteger(value) {
  return todo();
}

// 15. sumFloats(a, b) — 0.1 + 0.2 === 0.3 ?  Поверни результат, округлений до 10 знаків
//   sumFloats(0.1, 0.2) → 0.3;  sumFloats(0.7, 0.1) → 0.8  (результат — ЧИСЛО)
// 💡 чому 0.1 + 0.2 !== 0.3? Number(x.toFixed(10)) або Number.EPSILON
function sumFloats(a, b) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('minMax', [
  [() => minMax([3, 1, 4, 1, 5]), { min: 1, max: 5 }],
  [() => minMax([-7, -2, -9]), { min: -9, max: -2 }, "від'ємні"],
  [() => minMax([4]), { min: 4, max: 4 }, 'один елемент'],
]);
test('roundTo', [
  [() => roundTo(2.71828, 3), 2.718],
  [() => roundTo(3.14159, 0), 3],
  [() => roundTo(10, 2), 10, "число, а не рядок '10.00'"],
  [() => roundTo(-1.236, 2), -1.24],
]);
test('clamp', [
  [() => clamp(15, 0, 10), 10],
  [() => clamp(-5, 0, 10), 0],
  [() => clamp(5, 0, 10), 5],
]);
test('randomInt', [
  [() => {
    const seen = new Set();
    for (let i = 0; i < 2000; i++) {
      const r = randomInt(1, 3);
      if (!Number.isInteger(r) || r < 1 || r > 3) return `погане значення: ${r}`;
      seen.add(r);
    }
    return seen.size;
  }, 3, '2000 викликів randomInt(1, 3) — всі цілі в [1..3] і випали всі 3 значення'],
]);
test('sumDigits', [
  [() => sumDigits(1234), 10],
  [() => sumDigits(-56), 11],
  [() => sumDigits(0), 0],
  [() => sumDigits(7), 7],
]);
test('reverseNumber', [
  [() => reverseNumber(123), 321],
  [() => reverseNumber(-120), -21],
  [() => reverseNumber(1000), 1],
  [() => reverseNumber(5), 5],
]);
test('isPrime', [
  [() => [1, 2, 3, 4, 7, 9, 13, 25, 97].filter(isPrime), [2, 3, 7, 13, 97]],
  [() => [0, -7, 1].map(isPrime), [false, false, false], 'числа < 2'],
  [() => [49, 121, 7919].map(isPrime), [false, false, true], 'квадрати простих і велике просте'],
]);
test('factorial', [
  [() => factorial(5), 120],
  [() => factorial(0), 1],
  [() => factorial(1), 1],
  [() => factorial(10), 3628800],
]);
test('fibonacci', [
  [() => fibonacci(10), 55],
  [() => fibonacci(0), 0],
  [() => fibonacci(1), 1],
  [() => fibonacci(2), 1],
  [() => fibonacci(20), 6765],
]);
test('gcd', [
  [() => gcd(48, 18), 6],
  [() => gcd(7, 13), 1],
  [() => gcd(18, 48), 6, 'порядок аргументів не важливий'],
  [() => gcd(5, 0), 5],
  [() => gcd(12, 12), 12],
]);
test('parseNumbers', [
  [() => parseNumbers(['1', '2.5', 'abc', '10px']), [1, 2.5, 10]],
  [() => parseNumbers(['0', '-3', 'px10', '']), [0, -3], '0 лишається; px10 і порожній — ні'],
  [() => parseNumbers([]), []],
]);
test('toBinary / fromBinary', [
  [() => toBinary(10), '1010'],
  [() => fromBinary('1010'), 10],
  [() => toBinary(0), '0'],
  [() => [toBinary(255), fromBinary('11111111')], ['11111111', 255]],
]);
test('formatMoney', [
  [() => formatMoney(1234567.891), '$1,234,567.89'],
  [() => formatMoney(5), '$5.00', 'завжди 2 знаки'],
  [() => formatMoney(0), '$0.00'],
  [() => formatMoney(999.999), '$1,000.00', 'округлення переносить розряд'],
]);
test('isInteger', [
  [() => [5, 5.5, '5', NaN, -3].map(isInteger), [true, false, false, false, true]],
  [() => [0, Infinity, null, 5.0].map(isInteger), [true, false, false, true]],
]);
test('sumFloats', [
  [() => sumFloats(0.1, 0.2), 0.3],
  [() => sumFloats(0.7, 0.1), 0.8],
  [() => sumFloats(1, 2), 3],
]);

run('Блок 06 — Числа і Math');

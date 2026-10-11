// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 06 — ЧИСЛА І Math
// Запуск: node 06-numbers-math.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. minMax(nums) → { min, max }
//   minMax([3, 1, 4, 1, 5]) → { min: 1, max: 5 }
// 💡 Math.min(...arr), Math.max(...arr)
function minMax(nums) {
  return todo();
}

// 2. roundTo(num, digits)
//   roundTo(2.71828, 3) → 2.718
// 💡 toFixed повертає РЯДОК → Number(...)  /  або Math.round(num * 10 ** d) / 10 ** d
function roundTo(num, digits) {
  return todo();
}

// 3. clamp(n, min, max) — обмежити число межами
//   clamp(15, 0, 10) → 10;  clamp(-5, 0, 10) → 0
// 💡 Math.min / Math.max
function clamp(n, min, max) {
  return todo();
}

// 4. randomInt(min, max) — ціле випадкове від min до max ВКЛЮЧНО
// 💡 Math.random, Math.floor
function randomInt(min, max) {
  return todo();
}

// 5. sumDigits(n)
//   sumDigits(1234) → 10;  sumDigits(-56) → 11
// 💡 Math.abs, String, split, Number   🎯 Бонус: через % 10 і Math.trunc
function sumDigits(n) {
  return todo();
}

// 6. reverseNumber(n)
//   reverseNumber(123) → 321;  reverseNumber(-120) → -21
// 💡 Math.sign, Math.abs, parseInt
function reverseNumber(n) {
  return todo();
}

// 7. isPrime(n)
//   isPrime(7) → true;  isPrime(1) → false;  isPrime(9) → false
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
//   gcd(48, 18) → 6
function gcd(a, b) {
  return todo();
}

// 11. parseNumbers(strings) — перетворити в числа, відкинути все, що не число
//   parseNumbers(['1', '2.5', 'abc', '10px']) → [1, 2.5, 10]
// 💡 parseFloat vs Number (яка різниця на '10px'?), Number.isNaN, filter
function parseNumbers(strings) {
  return todo();
}

// 12. toBinary(n) / fromBinary(str)
//   toBinary(10) → '1010';  fromBinary('1010') → 10
// 💡 toString(2), parseInt(str, 2)
function toBinary(n) {
  return todo();
}
function fromBinary(str) {
  return todo();
}

// 13. formatMoney(amount)
//   formatMoney(1234567.891) → '$1,234,567.89'
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
//   sumFloats(0.1, 0.2) → 0.3
// 💡 чому 0.1 + 0.2 !== 0.3? Number(x.toFixed(10)) або Number.EPSILON
function sumFloats(a, b) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('minMax', [[() => minMax([3, 1, 4, 1, 5]), { min: 1, max: 5 }]]);
test('roundTo', [
  [() => roundTo(2.71828, 3), 2.718],
  [() => roundTo(3.14159, 0), 3],
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
]);
test('reverseNumber', [
  [() => reverseNumber(123), 321],
  [() => reverseNumber(-120), -21],
]);
test('isPrime', [
  [() => [1, 2, 3, 4, 7, 9, 13, 25, 97].filter(isPrime), [2, 3, 7, 13, 97]],
]);
test('factorial', [
  [() => factorial(5), 120],
  [() => factorial(0), 1],
]);
test('fibonacci', [
  [() => fibonacci(10), 55],
  [() => fibonacci(0), 0],
  [() => fibonacci(1), 1],
]);
test('gcd', [
  [() => gcd(48, 18), 6],
  [() => gcd(7, 13), 1],
]);
test('parseNumbers', [[() => parseNumbers(['1', '2.5', 'abc', '10px']), [1, 2.5, 10]]]);
test('toBinary / fromBinary', [
  [() => toBinary(10), '1010'],
  [() => fromBinary('1010'), 10],
]);
test('formatMoney', [[() => formatMoney(1234567.891), '$1,234,567.89']]);
test('isInteger', [
  [() => [5, 5.5, '5', NaN, -3].map(isInteger), [true, false, false, false, true]],
]);
test('sumFloats', [[() => sumFloats(0.1, 0.2), 0.3]]);

run('Блок 06 — Числа і Math');

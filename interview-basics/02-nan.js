// ═══════════════════════════════════════════════════════════
// 📦 02 — NaN
// ❓ Що таке NaN і в яких випадках він може з'явитися?
// Запуск: node 02-nan.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │ NaN (Not-a-Number) — це ЗНАЧЕННЯ ТИПУ number, яке означає:
// │ «числова операція не змогла дати число». typeof NaN === 'number'.
// │
// │ Звідки береться:
// │   Number('12px')   → NaN   (рядок не перетворюється на число цілком)
// │   parseInt('abc')  → NaN   (а parseInt('12px') → 12: він читає, поки бачить цифри)
// │   0 / 0            → NaN   (а 1 / 0 → Infinity!)
// │   Math.sqrt(-1)    → NaN
// │   undefined + 1    → NaN   (undefined як число — це NaN)
// │   'abc' * 2        → NaN
// │
// │ ГОЛОВНЕ: NaN не дорівнює нічому, навіть собі.
// │   NaN === NaN          → false
// │   [NaN].indexOf(NaN)   → -1     (indexOf порівнює через ===)
// │   [NaN].includes(NaN)  → true   (includes вміє знаходити NaN)
// │
// │ Як перевіряти:
// │   Number.isNaN(x)  ✅ true тільки для справжнього NaN
// │   isNaN(x)         ⚠️ спершу перетворює x на число: isNaN('abc') → true
// │   x !== x          ✅ трюк: тільки NaN не дорівнює собі
// │
// │ NaN «заразний»: будь-яка арифметика з ним дає NaN.
// │ Через це одне undefined у reduce перетворює всю суму на NaN.
// │
// │ 🗣 На співбесіді: «NaN — числове значення, що означає невдалу числову операцію:
// │    Number('abc'), 0/0, undefined + 1. Воно не дорівнює навіть собі, тому
// │    перевіряти треба через Number.isNaN, а не === чи глобальний isNaN».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — поверни масив з 11 відповідей
//   [0] NaN === NaN            [1] Number('12px')       [2] parseInt('12px')
//   [3] 0 / 0                  [4] isNaN('abc')         [5] Number.isNaN('abc')
//   [6] [NaN].includes(NaN)    [7] [NaN].indexOf(NaN)   [8] Math.sqrt(-1)
//   [9] undefined + 1         [10] null + 1
function predictNaN() {
  return todo();
}

// 2. isReallyNaN(x) — true тільки для справжнього NaN. БЕЗ isNaN і Number.isNaN!
//   isReallyNaN(NaN) → true    isReallyNaN('abc') → false    isReallyNaN(undefined) → false
// 💡 перечитай рядок «ГОЛОВНЕ» в теорії
function isReallyNaN(x) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictNaN', predictNaN, [
  () => NaN === NaN, () => Number('12px'), () => parseInt('12px'),
  () => 0 / 0, () => isNaN('abc'), () => Number.isNaN('abc'),
  () => [NaN].includes(NaN), () => [NaN].indexOf(NaN), () => Math.sqrt(-1),
  () => undefined + 1, () => null + 1,
]);
test('isReallyNaN', [
  [() => isReallyNaN(NaN), true],
  [() => isReallyNaN(0 / 0), true],
  [() => isReallyNaN(Number('x')), true],
  [() => isReallyNaN('abc'), false],
  [() => isReallyNaN(undefined), false],
  [() => isReallyNaN({}), false],
  [() => isReallyNaN(0), false],
]);

run('02 — NaN');

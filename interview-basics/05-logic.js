// ═══════════════════════════════════════════════════════════
// 📦 05 — ЛОГІЧНІ ОПЕРАТОРИ
// ❓ Як працюють логічні оператори !, && та ||?
// ❓ ➕ Які значення truthy, а які falsy?
// ❓ ➕ Чим ?? відрізняється від ||? Що таке ?.
// Запуск: node 05-logic.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │ ── Falsy: рівно 8 значень, вивчи напам'ять ──
// │   false   0   -0   0n   ''   null   undefined   NaN
// │ Усе інше — truthy, навіть: '0'  'false'  ' '  []  {}  -1
// │ Пастка: if ([]) → спрацює! Порожній масив перевіряй як if (arr.length).
// │
// │ ── ! ──
// │ Перетворює на boolean і перевертає. Результат ЗАВЖДИ true/false.
// │ !!x — ідіома «перетвори на boolean» (те саме, що Boolean(x)).
// │
// │ ── && і || повертають НЕ true/false, а ОДНЕ З ЗНАЧЕНЬ ──
// │   a || b  → перше TRUTHY значення; якщо таких немає — ОСТАННЄ
// │   a && b  → перше FALSY значення;  якщо таких немає — ОСТАННЄ
// │
// │   0 || 'a'                → 'a'
// │   null || undefined || 0  → 0     (truthy немає → останнє)
// │   '' && 'b'               → ''    (зупинились на falsy)
// │   1 && 2 && 3             → 3     (усі truthy → останнє)
// │
// │ «Коротке замикання»: права частина НЕ виконується, якщо відповідь уже відома.
// │   user && user.greet()        — greet не викличеться, якщо user порожній
// │   const name = input || 'Anon'
// │ Пріоритет: ! вище за &&, а && вище за ||.
// │
// │ ── ?? (nullish coalescing) ──
// │   a || b  → b, якщо a будь-яке FALSY (0, '' і false теж!)
// │   a ?? b  → b, ТІЛЬКИ якщо a — null або undefined
// │     const count = 0;
// │     count || 10  → 10  😱 нуль «загубився»
// │     count ?? 10  → 0   ✅
// │
// │ ── ?. (optional chaining) ──
// │ Якщо ліворуч null/undefined → весь вираз дає undefined, а не помилку.
// │   user?.address?.city ?? 'unknown'
// │   user.getName?.()   — викликати, якщо метод існує
// │
// │ 🗣 На співбесіді: «! завжди дає boolean. && і || повертають один з операндів:
// │    || — перший truthy, && — перший falsy, інакше останній. Обидва ліниві.
// │    ?? підставляє дефолт тільки для null/undefined, тому не губить 0 і ''».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — саме ЗНАЧЕННЯ, не обов'язково boolean. Масив з 11 відповідей.
//   [0] !!''              [1] !!'0'             [2] !![]           [3] !!{}
//   [4] 0 || 'a'          [5] '' && 'b'         [6] 1 && 2 && 3    [7] null || undefined || 0
//   [8] 0 ?? 'x'          [9] null ?? 'x'      [10] !'' && 'yes'
function predictLogic() {
  return todo();
}

// 2. countFalsy(arr) — скільки falsy-значень у масиві
//   countFalsy([0, 1, '', 'a', null, undefined, NaN, false, [], {}, '0']) → 6
// 💡 filter + !    А [] і '0' — falsy чи ні?
function countFalsy(arr) {
  return todo();
}

// 3. firstTruthy(...values) — повтори логіку a || b || c руками, циклом, БЕЗ оператора ||
//   firstTruthy(0, '', 'a', 'b') → 'a'     firstTruthy(0, null, '') → ''     firstTruthy() → undefined
// 💡 for...of + if (value). Що повертати, коли truthy не знайшлось? (перечитай правило ||)
function firstTruthy(...values) {
  return todo();
}

// 4. orDefault(value, def) — поведінка як у value ?? def, але БЕЗ оператора ??
//   orDefault(0, 5) → 0    orDefault('', 'x') → ''    orDefault(null, 5) → 5
// 💡 чому || тут не підходить? Яке порівняння ловить і null, і undefined? (тема 03)
function orDefault(value, def) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictLogic', predictLogic, [
  () => !!'', () => !!'0', () => !![], () => !!{},
  () => 0 || 'a', () => '' && 'b', () => 1 && 2 && 3, () => null || undefined || 0,
  () => 0 ?? 'x', () => null ?? 'x', () => !'' && 'yes',
]);
test('countFalsy', [
  [() => countFalsy([0, 1, '', 'a', null, undefined, NaN, false, [], {}, '0']), 6],
  [() => countFalsy([]), 0],
  [() => countFalsy([-0, 0n, ' ']), 2],
]);
test('firstTruthy', [
  [() => firstTruthy(0, '', 'a', 'b'), 'a'],
  [() => firstTruthy(0, null, ''), ''],
  [() => firstTruthy(null, 0, undefined), undefined],
  [() => firstTruthy(), undefined],
  [() => { const o = {}; return firstTruthy(0, o) === o; }, true, 'повертає саме значення, а не true'],
]);
test('orDefault', [
  [() => orDefault(0, 5), 0],
  [() => orDefault('', 'x'), ''],
  [() => orDefault(false, true), false],
  [() => orDefault(null, 5), 5],
  [() => orDefault(undefined, 5), 5],
]);

run('05 — Логічні оператори');

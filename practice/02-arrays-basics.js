// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 02 — МАСИВИ: БАЗА (без map/filter/reduce — їх у блоці 03)
// Запуск: node 02-arrays-basics.js
// Важливо: де сказано "не мутуй" — оригінальний масив має лишитись незмінним!
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. firstAndLast(arr)
//   firstAndLast([1, 2, 3]) → [1, 3]
//   firstAndLast([])        → [null, null]
// 💡 arr[0], at(-1), ??
function firstAndLast(arr) {
  return [arr[0] ?? null, arr.at(-1) ?? null];
}

// 2. stackOps()
// Створи порожній масив. Зроби push(1), push(2), push(3), потім pop(),
// потім unshift(0), потім shift(). Поверни фінальний масив.
//   stackOps() → [1, 2]
// 💡 push, pop, unshift, shift — і що кожен з них ПОВЕРТАЄ?
function stackOps() {
  let res = [];
  res.push(1);
  res.push(2);
  res.push(3);
  res.pop();
  res.unshift(0);
  res.shift();
  return res;
}

// 3. insertAt(arr, index, value)   — не мутуй
//   insertAt([1, 2, 4], 2, 3) → [1, 2, 3, 4]
// 💡 slice + spread [...a, x, ...b]  або  toSpliced
function insertAt(arr, index, value) {
  let res = []
  res.push(...arr.slice(0, index))
  res.push(value)
  res.push(...arr.slice(index))
  return res;
}

// 4. removeAt(arr, index)   — не мутуй
//   removeAt(['a', 'b', 'c'], 1) → ['a', 'c']
// 💡 slice, concat / spread  або  toSpliced
function removeAt(arr, index) {
  let res = arr.toSpliced(index, 1)
  return res;
}

// 5. removeAtMutate(arr, index)   — А ТУТ МУТУЙ: зміни сам масив і поверни видалений елемент
//   const a = [1, 2, 3]; removeAtMutate(a, 0) → 1, a стає [2, 3]
// 💡 splice (що він повертає?)
function removeAtMutate(arr, index) {  
  const [ res1 ] = [ ...arr.splice(index, 1) ];
  
  return res1;
}

// 6. range(start, end)
// Масив чисел від start до end включно.
//   range(1, 5) → [1, 2, 3, 4, 5]
// 💡 цикл for + push, або Array.from({ length }, (_, i) => ...)
function range(start, end) {

  return Array.from(
    { length: ((end + 1) - start) },
    (_, i) => start + i,
  );
  // let res = []
  // for (let i = start; i <= end; i++) {
  //   res.push(i)

  // }
  // return res;
}

// 7. chunk(arr, size)
//   chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
// 💡 for з кроком size, slice
function chunk(arr, size) {
  if (size === 0) { return }
  const res = [];
  
  for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size))
  }

  return res;
}

// 8. rotateRight(arr, k)   — не мутуй
//   rotateRight([1, 2, 3, 4, 5], 2) → [4, 5, 1, 2, 3]
//   rotateRight([1, 2, 3], 4)       → [3, 1, 2]   (k може бути > length)
// 💡 % length, slice(-k), spread
function rotateRight(arr, k) {
  k = (((k % arr.length) + arr.length) % arr.length)
  // const [...out] = arr.splice(arr.length - k);
  // arr.splice(0, 0, ...out)

  const out = [...arr.slice(-k), ...arr.slice(0, -k)]

  return out;
}

// 9. reverseCopy(arr)   — не мутуй
//   reverseCopy([1, 2, 3]) → [3, 2, 1], оригінал лишається [1, 2, 3]
// 💡 reverse МУТУЄ! → [...arr].reverse()  або  toReversed
function reverseCopy(arr) {
  return [...arr].reverse();
}

// 10. zip(a, b)
//   zip([1, 2, 3], ['a', 'b', 'c']) → [[1, 'a'], [2, 'b'], [3, 'c']]
//   Довжина результату = довжина коротшого масиву.
// 💡 Math.min, for
function zip(a, b) {
  const res = [];
  const min = Math.min(a.length, b.length);
  for (let i = 0; i < min; i++) {
    res.push([a[i], b[i]]);
  }
  return res;
}

// 11. flattenOnce / flattenAll
//   flattenAll([1, [2, [3, [4]]]]) → [1, 2, 3, 4]
// 💡 flat(Infinity)    (свою рекурсивну версію напишеш у блоці 07)
function flattenAll(arr) {
  return arr.flat(Infinity);
}

// 12. fillMatrix(rows, cols, value)
//   fillMatrix(2, 3, 0) → [[0, 0, 0], [0, 0, 0]]
// ⚠️ Пастка: Array(rows).fill([]) кладе ОДИН і той самий масив у всі рядки!
// 💡 Array.from({ length: rows }, () => Array(cols).fill(value))
function fillMatrix(rows, cols, value) {
  // return Array.from({ length: rows }, () => Array(cols).fill(value));

  const res = [];

  for (let i = 0; i < rows; i++) {
    res.push(Array(cols).fill(value));
  }
  return res;
}

// 13. contains(arr, value)
// Повернути { includes, index } — чи є елемент і його індекс.
//   contains(['x', 'y'], 'y') → { includes: true, index: 1 }
// 💡 includes, indexOf
function contains(arr, value) {
  return { includes: arr.includes(value), index: arr.indexOf(value)};
}

// 14. joinWithAnd(arr)
//   joinWithAnd(['a', 'b', 'c']) → 'a, b and c'
//   joinWithAnd(['a'])           → 'a'
// 💡 slice(0, -1), join, at(-1)
function joinWithAnd(arr) {
  if (arr.length <= 1) { return `${arr[0]}` };
  return arr.slice(0, -1).join(", ") + " and " + arr.at(-1);
}

// 15. isArrayOfNumbers(value)
//   isArrayOfNumbers([1, 2]) → true;  isArrayOfNumbers('12') → false;  isArrayOfNumbers([1, '2']) → false
// 💡 Array.isArray, typeof, цикл for...of
function isArrayOfNumbers(value) {
  if (!Array.isArray(value)) { return false };
  for (let x of value) {
    if (!Number.isFinite(x)) { return false };
  }
  return true;
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('firstAndLast', [
  [() => firstAndLast([1, 2, 3]), [1, 3]],
  [() => firstAndLast([7]), [7, 7]],
  [() => firstAndLast([]), [null, null]],
]);
test('stackOps', [[() => stackOps(), [1, 2]]]);
test('insertAt', [
  [() => insertAt([1, 2, 4], 2, 3), [1, 2, 3, 4]],
  [() => { const a = [1, 2]; insertAt(a, 0, 0); return a; }, [1, 2], 'оригінал не змінюється'],
]);
test('removeAt', [
  [() => removeAt(['a', 'b', 'c'], 1), ['a', 'c']],
  [() => { const a = ['a', 'b']; removeAt(a, 0); return a; }, ['a', 'b'], 'оригінал не змінюється'],
]);
test('removeAtMutate', [
  [() => { const a = [1, 2, 3]; const r = removeAtMutate(a, 0); return [r, a]; }, [1, [2, 3]], '[повернене, масив після]'],
]);
test('range', [
  [() => range(1, 5), [1, 2, 3, 4, 5]],
  [() => range(3, 3), [3]],
]);
test('chunk', [
  [() => chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]],
  [() => chunk([1, 2, 3], 5), [[1, 2, 3]]],
  [() => chunk([], 2), []],
]);
test('rotateRight', [
  [() => rotateRight([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]],
  [() => rotateRight([1, 2, 3], 4), [3, 1, 2]],
  [() => rotateRight([1, 2, 3], 0), [1, 2, 3]],
]);
test('reverseCopy', [
  [() => reverseCopy([1, 2, 3]), [3, 2, 1]],
  [() => { const a = [1, 2, 3]; reverseCopy(a); return a; }, [1, 2, 3], 'оригінал не змінюється'],
]);
test('zip', [
  [() => zip([1, 2, 3], ['a', 'b', 'c']), [[1, 'a'], [2, 'b'], [3, 'c']]],
  [() => zip([1, 2, 3], ['a']), [[1, 'a']]],
]);
test('flattenAll', [[() => flattenAll([1, [2, [3, [4]]]]), [1, 2, 3, 4]]]);
test('fillMatrix', [
  [() => fillMatrix(2, 3, 0), [[0, 0, 0], [0, 0, 0]]],
  [() => { const m = fillMatrix(2, 2, 0); m[0][0] = 9; return m; }, [[9, 0], [0, 0]], 'рядки — різні масиви'],
]);
test('contains', [
  [() => contains(['x', 'y'], 'y'), { includes: true, index: 1 }],
  [() => contains(['x', 'y'], 'z'), { includes: false, index: -1 }],
]);
test('joinWithAnd', [
  [() => joinWithAnd(['a', 'b', 'c']), 'a, b and c'],
  [() => joinWithAnd(['a', 'b']), 'a and b'],
  [() => joinWithAnd(['a']), 'a'],
]);
test('isArrayOfNumbers', [
  [() => isArrayOfNumbers([1, 2]), true],
  [() => isArrayOfNumbers('12'), false],
  [() => isArrayOfNumbers([1, '2']), false],
  [() => isArrayOfNumbers([]), true],
]);

run('Блок 02 — Масиви: база');

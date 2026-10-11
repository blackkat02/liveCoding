// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 07 — ЦИКЛИ І ПАТЕРНИ (класика live coding)
// два вказівники, ковзне вікно, стек, рекурсія, бінарний пошук
// Запуск: node 07-patterns.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. fizzBuzz(n) — масив від 1 до n: 'Fizz' (÷3), 'Buzz' (÷5), 'FizzBuzz' (÷15), інакше число
//   fizzBuzz(5) → [1, 2, 'Fizz', 4, 'Buzz']
function fizzBuzz(n) {
  return todo();
}

// 2. countVowels(str) — голосні a e i o u (будь-який регістр)
//   countVowels('Hello World') → 3
// 💡 for...of + includes   або   match(/[aeiou]/gi)
function countVowels(str) {
  return todo();
}

// 3. isPalindromeTwoPointers(str) — БЕЗ reverse, двома вказівниками
//   isPalindromeTwoPointers('racecar') → true
// 💡 let left = 0, right = str.length - 1; while (left < right)
function isPalindromeTwoPointers(str) {
  return todo();
}

// 4. pairWithSum(sorted, target) — у ВІДСОРТОВАНОМУ масиві знайти пару [a, b], a + b = target
//   pairWithSum([-3, -2, -1, 0, 1, 4], 0) → [-1, 1]   ; нема → null
// 💡 два вказівники з країв
function pairWithSum(sorted, target) {
  return todo();
}

// 5. maxSubarraySum(arr, k) — максимальна сума k сусідніх елементів. O(n)!
//   maxSubarraySum([2, 1, 5, 1, 3, 2], 3) → 9   (5 + 1 + 3)
// 💡 ковзне вікно: додай новий, відніми старий
function maxSubarraySum(arr, k) {
  return todo();
}

// 6. longestUniqueSubstring(str) — довжина найдовшого підрядка без повторів
//   'abcabcbb' → 3;  'bbbbb' → 1;  'pwwkew' → 3
// 💡 ковзне вікно + Set (або Map символ → останній індекс)
function longestUniqueSubstring(str) {
  return todo();
}

// 7. binarySearch(sorted, target) — індекс або -1. O(log n)
//   binarySearch([1, 3, 5, 7, 9, 11], 7) → 3
// 💡 low, high, mid = Math.floor((low + high) / 2)
function binarySearch(sorted, target) {
  return todo();
}

// 8. bubbleSort(arr) — своє сортування (не мутуй вхідний масив)
//   bubbleSort([5, 3, 8, 1]) → [1, 3, 5, 8]
// 💡 два вкладених for, обмін [a[i], a[j]] = [a[j], a[i]]
function bubbleSort(arr) {
  return todo();
}

// 9. isValidBrackets(str) — дужки ()[]{} збалансовані?
//   '({[]})' → true;  '(]' → false;  '((' → false
// 💡 стек (push/pop) + об'єкт-пари { ')': '(' ... }
function isValidBrackets(str) {
  return todo();
}

// 10. flattenDeep(arr) — РЕКУРСИВНО, без flat
//   flattenDeep([1, [2, [3, [4]], 5]]) → [1, 2, 3, 4, 5]
function flattenDeep(arr) {
  return todo();
}

// 11. compress(str) — стиснення повторів
//   compress('aaabccdddd') → 'a3b1c2d4'
// 💡 лічильник + порівняння з наступним символом
function compress(str) {
  return todo();
}

// 12. maxProfit(prices) — купи раз, продай раз пізніше. Максимальний прибуток (або 0)
//   maxProfit([7, 1, 5, 3, 6, 4]) → 5
// 💡 один прохід: тримай мінімальну ціну до цього дня
function maxProfit(prices) {
  return todo();
}

// 13. missingNumber(nums) — числа 0..n, одне пропущене
//   missingNumber([3, 0, 1]) → 2
// 💡 сума 0..n = n * (n + 1) / 2
function missingNumber(nums) {
  return todo();
}

// 14. moveZeros(arr) — нулі в кінець, порядок решти зберегти
//   moveZeros([0, 1, 0, 3, 12]) → [1, 3, 12, 0, 0]
function moveZeros(arr) {
  return todo();
}

// 15. maxConsecutiveOnes(bits)
//   maxConsecutiveOnes([1, 1, 0, 1, 1, 1]) → 3
function maxConsecutiveOnes(bits) {
  return todo();
}

// 16. spiralMatrix(matrix) — обхід по спіралі
//   [[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5]
// 💡 межі top/bottom/left/right, звужуй після кожної сторони
function spiralMatrix(matrix) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('fizzBuzz', [
  [() => fizzBuzz(5), [1, 2, 'Fizz', 4, 'Buzz']],
  [() => fizzBuzz(15).at(-1), 'FizzBuzz'],
]);
test('countVowels', [
  [() => countVowels('Hello World'), 3],
  [() => countVowels('xyz'), 0],
]);
test('isPalindromeTwoPointers', [
  [() => isPalindromeTwoPointers('racecar'), true],
  [() => isPalindromeTwoPointers('abca'), false],
  [() => isPalindromeTwoPointers(''), true],
]);
test('pairWithSum', [
  [() => pairWithSum([-3, -2, -1, 0, 1, 4], 0), [-1, 1]],
  [() => pairWithSum([1, 2, 3], 10), null],
]);
test('maxSubarraySum', [
  [() => maxSubarraySum([2, 1, 5, 1, 3, 2], 3), 9],
  [() => maxSubarraySum([-1, -2, -3], 2), -3],
]);
test('longestUniqueSubstring', [
  [() => longestUniqueSubstring('abcabcbb'), 3],
  [() => longestUniqueSubstring('bbbbb'), 1],
  [() => longestUniqueSubstring('pwwkew'), 3],
  [() => longestUniqueSubstring(''), 0],
]);
test('binarySearch', [
  [() => binarySearch([1, 3, 5, 7, 9, 11], 7), 3],
  [() => binarySearch([1, 3, 5, 7, 9, 11], 1), 0],
  [() => binarySearch([1, 3, 5], 4), -1],
]);
test('bubbleSort', [
  [() => bubbleSort([5, 3, 8, 1]), [1, 3, 5, 8]],
  [() => { const a = [2, 1]; bubbleSort(a); return a; }, [2, 1], 'оригінал не змінюється'],
]);
test('isValidBrackets', [
  [() => isValidBrackets('({[]})'), true],
  [() => isValidBrackets('(]'), false],
  [() => isValidBrackets('(('), false],
  [() => isValidBrackets(')('), false],
]);
test('flattenDeep', [[() => flattenDeep([1, [2, [3, [4]], 5]]), [1, 2, 3, 4, 5]]]);
test('compress', [
  [() => compress('aaabccdddd'), 'a3b1c2d4'],
  [() => compress(''), ''],
]);
test('maxProfit', [
  [() => maxProfit([7, 1, 5, 3, 6, 4]), 5],
  [() => maxProfit([7, 6, 4, 3, 1]), 0],
]);
test('missingNumber', [
  [() => missingNumber([3, 0, 1]), 2],
  [() => missingNumber([0, 1]), 2],
]);
test('moveZeros', [[() => moveZeros([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]]]);
test('maxConsecutiveOnes', [[() => maxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3]]);
test('spiralMatrix', [
  [() => spiralMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]],
  [() => spiralMatrix([[1, 2, 3, 4], [5, 6, 7, 8]]), [1, 2, 3, 4, 8, 7, 6, 5]],
]);

run('Блок 07 — Патерни');

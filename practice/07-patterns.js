// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 07 — ЦИКЛИ І ПАТЕРНИ (класика live coding)
// два вказівники, ковзне вікно, стек, рекурсія, бінарний пошук
// Запуск: node 07-patterns.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. fizzBuzz(n) — масив від 1 до n: 'Fizz' (÷3), 'Buzz' (÷5), 'FizzBuzz' (÷15), інакше число
//   fizzBuzz(5) → [1, 2, 'Fizz', 4, 'Buzz']   (числа — саме числа, не рядки);  fizzBuzz(0) → []
function fizzBuzz(n) {
  return todo();
}

// 2. countVowels(str) — голосні a e i o u (будь-який регістр)
//   countVowels('Hello World') → 3   ('y' — не голосна)
// 💡 for...of + includes   або   match(/[aeiou]/gi)
function countVowels(str) {
  return todo();
}

// 3. isPalindromeTwoPointers(str) — БЕЗ reverse, двома вказівниками
//   isPalindromeTwoPointers('racecar') → true;  'abba' → true;  'ab' → false
// Регістр ВРАХОВУЄТЬСЯ: 'Aa' → false. Порожній рядок і один символ — паліндроми.
// 💡 let left = 0, right = str.length - 1; while (left < right)
function isPalindromeTwoPointers(str) {
  return todo();
}

// 4. pairWithSum(sorted, target) — у ВІДСОРТОВАНОМУ масиві знайти пару [a, b], a + b = target
//   pairWithSum([-3, -2, -1, 0, 1, 4], 0) → [-1, 1]   ; нема → null
// Один елемент не можна брати двічі. Якщо пар кілька — повернути ту, що вказівники з країв знайдуть першою:
//   pairWithSum([1, 2, 3, 4, 5], 6) → [1, 5]   (а не [2, 4])
// 💡 два вказівники з країв
function pairWithSum(sorted, target) {
  return todo();
}

// 5. maxSubarraySum(arr, k) — максимальна сума k сусідніх елементів. O(n)!
//   maxSubarraySum([2, 1, 5, 1, 3, 2], 3) → 9   (5 + 1 + 3)
// Якщо k > arr.length — вікно не вміщається → null.
// 💡 ковзне вікно: додай новий, відніми старий
function maxSubarraySum(arr, k) {
  return todo();
}

// 6. longestUniqueSubstring(str) — довжина найдовшого підрядка без повторів
//   'abcabcbb' → 3;  'bbbbb' → 1;  'pwwkew' → 3;  '' → 0
// Підрядок — НЕПЕРЕРВНИЙ шматок (у 'pwwkew' відповідь 'wke'; 'pwke' — не підрядок).
// 💡 ковзне вікно + Set (або Map символ → останній індекс)
function longestUniqueSubstring(str) {
  return todo();
}

// 7. binarySearch(sorted, target) — індекс або -1. O(log n)
//   binarySearch([1, 3, 5, 7, 9, 11], 7) → 3;  binarySearch([], 1) → -1
// 💡 low, high, mid = Math.floor((low + high) / 2)
function binarySearch(sorted, target) {
  return todo();
}

// 8. bubbleSort(arr) — своє сортування (не мутуй вхідний масив)
//   bubbleSort([5, 3, 8, 1]) → [1, 3, 5, 8]   (без .sort; числа порівнюються як числа: [10, 9, 1] → [1, 9, 10])
// 💡 два вкладених for, обмін [a[i], a[j]] = [a[j], a[i]]
function bubbleSort(arr) {
  return todo();
}

// 9. isValidBrackets(str) — дужки ()[]{} збалансовані?
//   '({[]})' → true;  '(]' → false;  '((' → false;  '([)]' → false (перехрещені);  '' → true
// Рядок містить ЛИШЕ символи дужок.
// 💡 стек (push/pop) + об'єкт-пари { ')': '(' ... }
function isValidBrackets(str) {
  return todo();
}

// 10. flattenDeep(arr) — РЕКУРСИВНО, без flat
//   flattenDeep([1, [2, [3, [4]], 5]]) → [1, 2, 3, 4, 5];  порожні вкладені масиви зникають: [[], [[]], 1] → [1]
function flattenDeep(arr) {
  return todo();
}

// 11. compress(str) — стиснення повторів
//   compress('aaabccdddd') → 'a3b1c2d4'
// Рахуються серії ПІДРЯД, а не всі однакові символи: compress('aabbaa') → 'a2b2a2';  '' → ''
// 💡 лічильник + порівняння з наступним символом
function compress(str) {
  return todo();
}

// 12. maxProfit(prices) — купи раз, продай раз пізніше. Максимальний прибуток (або 0)
//   maxProfit([7, 1, 5, 3, 6, 4]) → 5   (купити по 1, продати по 6)
// Продати можна лише ПІСЛЯ покупки: maxProfit([2, 4, 1]) → 2 (а не 4 - 1). Ціни лише падають або днів < 2 → 0
// 💡 один прохід: тримай мінімальну ціну до цього дня
function maxProfit(prices) {
  return todo();
}

// 13. missingNumber(nums) — числа 0..n, одне пропущене
//   missingNumber([3, 0, 1]) → 2   (n = nums.length = 3 → мають бути 0, 1, 2, 3)
//   missingNumber([0, 1]) → 2;  missingNumber([1]) → 0
// 💡 сума 0..n = n * (n + 1) / 2
function missingNumber(nums) {
  return todo();
}

// 14. moveZeros(arr) — нулі в кінець, порядок решти зберегти
//   moveZeros([0, 1, 0, 3, 12]) → [1, 3, 12, 0, 0]   (повернути масив-результат)
function moveZeros(arr) {
  return todo();
}

// 15. maxConsecutiveOnes(bits)
//   maxConsecutiveOnes([1, 1, 0, 1, 1, 1]) → 3 — довжина найдовшої серії одиниць ПІДРЯД
//   maxConsecutiveOnes([1, 1, 1, 0, 1]) → 3;  без одиниць або [] → 0
function maxConsecutiveOnes(bits) {
  return todo();
}

// 16. spiralMatrix(matrix) — обхід по спіралі
//   [[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5]
// Матриця може бути не квадратною (2×4, 3×1 …); кожен елемент — рівно один раз. [] → []
// 💡 межі top/bottom/left/right, звужуй після кожної сторони
function spiralMatrix(matrix) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('fizzBuzz', [
  [() => fizzBuzz(5), [1, 2, 'Fizz', 4, 'Buzz']],
  [() => fizzBuzz(15).at(-1), 'FizzBuzz'],
  [() => fizzBuzz(15), [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']],
  [() => fizzBuzz(0), []],
]);
test('countVowels', [
  [() => countVowels('Hello World'), 3],
  [() => countVowels('xyz'), 0],
  [() => countVowels('AEIOU aeiou'), 10, 'обидва регістри'],
  [() => countVowels(''), 0],
]);
test('isPalindromeTwoPointers', [
  [() => isPalindromeTwoPointers('racecar'), true],
  [() => isPalindromeTwoPointers('abca'), false],
  [() => isPalindromeTwoPointers(''), true],
  [() => ['abba', 'a', 'ab', 'Aa', 'abcba'].map(isPalindromeTwoPointers), [true, true, false, false, true], 'парна/непарна довжина, регістр'],
]);
test('pairWithSum', [
  [() => pairWithSum([-3, -2, -1, 0, 1, 4], 0), [-1, 1]],
  [() => pairWithSum([1, 2, 3], 10), null],
  [() => pairWithSum([1, 2, 3, 4, 5], 6), [1, 5], 'кілька пар → перша з країв'],
  [() => pairWithSum([1, 3, 5], 2), null, 'не брати 1 + 1 (той самий елемент)'],
  [() => pairWithSum([], 0), null],
]);
test('maxSubarraySum', [
  [() => maxSubarraySum([2, 1, 5, 1, 3, 2], 3), 9],
  [() => maxSubarraySum([-1, -2, -3], 2), -3],
  [() => maxSubarraySum([4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3), 16],
  [() => maxSubarraySum([1, 2, 3], 3), 6, 'k === довжина'],
  [() => maxSubarraySum([1, 2], 3), null, 'k > довжина'],
]);
test('longestUniqueSubstring', [
  [() => longestUniqueSubstring('abcabcbb'), 3],
  [() => longestUniqueSubstring('bbbbb'), 1],
  [() => longestUniqueSubstring('pwwkew'), 3],
  [() => longestUniqueSubstring(''), 0],
  [() => longestUniqueSubstring('dvdf'), 3, 'вікно зсувається, а не обнуляється'],
  [() => longestUniqueSubstring('abba'), 2, 'лівий край не йде назад'],
  [() => longestUniqueSubstring('abcdef'), 6],
]);
test('binarySearch', [
  [() => binarySearch([1, 3, 5, 7, 9, 11], 7), 3],
  [() => binarySearch([1, 3, 5, 7, 9, 11], 1), 0],
  [() => binarySearch([1, 3, 5], 4), -1],
  [() => binarySearch([1, 3, 5, 7, 9, 11], 11), 5, 'останній'],
  [() => binarySearch([], 1), -1],
  [() => binarySearch([5], 5), 0],
  [() => binarySearch([1, 3, 5], 0), -1, 'менше за всі'],
]);
test('bubbleSort', [
  [() => bubbleSort([5, 3, 8, 1]), [1, 3, 5, 8]],
  [() => { const a = [2, 1]; bubbleSort(a); return a; }, [2, 1], 'оригінал не змінюється'],
  [() => bubbleSort([3, -1, 2, -1, 0]), [-1, -1, 0, 2, 3], "дублі й від'ємні"],
  [() => bubbleSort([10, 9, 1]), [1, 9, 10], 'як числа, не як рядки'],
  [() => bubbleSort([]), []],
]);
test('isValidBrackets', [
  [() => isValidBrackets('({[]})'), true],
  [() => isValidBrackets('(]'), false],
  [() => isValidBrackets('(('), false],
  [() => isValidBrackets(')('), false],
  [() => isValidBrackets('([)]'), false, 'перехрещені'],
  [() => isValidBrackets(''), true],
  [() => isValidBrackets(']'), false, 'закриваюча без пари'],
  [() => isValidBrackets('()[]{}'), true],
]);
test('flattenDeep', [
  [() => flattenDeep([1, [2, [3, [4]], 5]]), [1, 2, 3, 4, 5]],
  [() => flattenDeep([[], [[]], 1]), [1], 'порожні вкладені'],
  [() => flattenDeep(['ab', ['c']]), ['ab', 'c'], 'рядки не розбиваються'],
  [() => flattenDeep([]), []],
]);
test('compress', [
  [() => compress('aaabccdddd'), 'a3b1c2d4'],
  [() => compress(''), ''],
  [() => compress('aabbaa'), 'a2b2a2', 'рахуються серії підряд'],
  [() => compress('abc'), 'a1b1c1'],
  [() => compress('z'), 'z1'],
]);
test('maxProfit', [
  [() => maxProfit([7, 1, 5, 3, 6, 4]), 5],
  [() => maxProfit([7, 6, 4, 3, 1]), 0],
  [() => maxProfit([2, 4, 1]), 2, 'продаж лише після покупки'],
  [() => maxProfit([5]), 0],
  [() => maxProfit([]), 0],
]);
test('missingNumber', [
  [() => missingNumber([3, 0, 1]), 2],
  [() => missingNumber([0, 1]), 2],
  [() => missingNumber([1]), 0],
  [() => missingNumber([0]), 1],
  [() => missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8],
]);
test('moveZeros', [
  [() => moveZeros([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]],
  [() => moveZeros([0, 0, 1]), [1, 0, 0]],
  [() => moveZeros([1, 2]), [1, 2], 'без нулів'],
  [() => moveZeros([]), []],
]);
test('maxConsecutiveOnes', [
  [() => maxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3],
  [() => maxConsecutiveOnes([1, 1, 1, 0, 1]), 3, 'найдовша серія на початку'],
  [() => maxConsecutiveOnes([1, 0, 1, 1, 0, 1]), 2, 'посередині'],
  [() => maxConsecutiveOnes([0, 0]), 0],
  [() => maxConsecutiveOnes([]), 0],
]);
test('spiralMatrix', [
  [() => spiralMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]],
  [() => spiralMatrix([[1, 2, 3, 4], [5, 6, 7, 8]]), [1, 2, 3, 4, 8, 7, 6, 5]],
  [() => spiralMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]), [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], '3×4'],
  [() => spiralMatrix([[1], [2], [3]]), [1, 2, 3], 'один стовпець — без повторів'],
  [() => spiralMatrix([[1, 2, 3]]), [1, 2, 3], 'один рядок'],
  [() => spiralMatrix([]), []],
]);

run('Блок 07 — Патерни');

// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 05 — Map і Set (лічильники, унікальність, швидкий пошук O(1))
// Запуск: node 05-map-set.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. unique(arr)
//   unique([1, 2, 2, 3, 1]) → [1, 2, 3]
// 💡 new Set, spread / Array.from
function unique(arr) {
  return todo();
}

// 2. hasDuplicates(arr)
//   hasDuplicates([1, 2, 3, 1]) → true
// 💡 Set.size vs length
function hasDuplicates(arr) {
  return todo();
}

// 3. frequencyMap(arr) — повернути саме Map
//   frequencyMap(['a', 'b', 'a']) → Map { 'a' => 2, 'b' => 1 }
// 💡 new Map, get, set, (map.get(x) ?? 0) + 1
function frequencyMap(arr) {
  return todo();
}

// 4. mostFrequent(arr) — найчастіший елемент (при рівності — той, що зустрівся раніше)
//   mostFrequent([3, 1, 3, 2, 1, 3]) → 3
// 💡 Map + for...of по map.entries() (або [...map].sort / reduce)
function mostFrequent(arr) {
  return todo();
}

// 5. firstNonRepeatingChar(str) — перший символ, що зустрічається 1 раз, або null
//   firstNonRepeatingChar('aabbcdd') → 'c'
// 💡 два проходи: порахувати → знайти
function firstNonRepeatingChar(str) {
  return todo();
}

// 6. twoSum(nums, target) — індекси двох чисел, сума яких = target. O(n)!
//   twoSum([2, 7, 11, 15], 9) → [0, 1]
//   Нема пари → null
// 💡 Map: значення → індекс; шукай target - x
function twoSum(nums, target) {
  return todo();
}

// 7. isAnagram(a, b)
//   isAnagram('listen', 'silent') → true
// 💡 варіант 1: split + sort + join;  варіант 2: лічильник у Map
function isAnagram(a, b) {
  return todo();
}

// 8. groupAnagrams(words) — групи в порядку першої появи
//   ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] → [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
// 💡 Map: відсортоване слово → масив; [...map.values()]
function groupAnagrams(words) {
  return todo();
}

// 9. setOps(a, b) → { union, intersection, difference } (масиви, без дублів)
//   setOps([1, 2, 3], [2, 3, 4]) → { union: [1, 2, 3, 4], intersection: [2, 3], difference: [1] }
// 💡 new Set, has, filter
function setOps(a, b) {
  return todo();
}

// 10. mapToObject(map) і objectToMap(obj)
//   mapToObject(new Map([['a', 1]])) → { a: 1 }
// 💡 Object.fromEntries(map), new Map(Object.entries(obj))
function mapToObject(map) {
  return todo();
}
function objectToMap(obj) {
  return todo();
}

// 11. uniqueBy(arr, key) — залишити перший об'єкт для кожного значення key
//   uniqueBy([{ id: 1, n: 'a' }, { id: 1, n: 'b' }, { id: 2, n: 'c' }], 'id') → [{ id: 1, n: 'a' }, { id: 2, n: 'c' }]
// 💡 Set "вже бачив" + filter
function uniqueBy(arr, key) {
  return todo();
}

// 12. createCache() — простий кеш на Map
// Повернути об'єкт з методами: set(k, v), get(k) (або null), has(k), delete(k), size()
function createCache() {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('unique', [
  [() => unique([1, 2, 2, 3, 1]), [1, 2, 3]],
  [() => unique(['a', 'A', 'a']), ['a', 'A']],
]);
test('hasDuplicates', [
  [() => hasDuplicates([1, 2, 3, 1]), true],
  [() => hasDuplicates([1, 2, 3]), false],
]);
test('frequencyMap', [[() => frequencyMap(['a', 'b', 'a']), new Map([['a', 2], ['b', 1]])]]);
test('mostFrequent', [
  [() => mostFrequent([3, 1, 3, 2, 1, 3]), 3],
  [() => mostFrequent(['x', 'y', 'y', 'x']), 'x'],
]);
test('firstNonRepeatingChar', [
  [() => firstNonRepeatingChar('aabbcdd'), 'c'],
  [() => firstNonRepeatingChar('aabb'), null],
]);
test('twoSum', [
  [() => twoSum([2, 7, 11, 15], 9), [0, 1]],
  [() => twoSum([3, 2, 4], 6), [1, 2]],
  [() => twoSum([1, 2], 10), null],
]);
test('isAnagram', [
  [() => isAnagram('listen', 'silent'), true],
  [() => isAnagram('rat', 'car'), false],
  [() => isAnagram('aab', 'abb'), false],
]);
test('groupAnagrams', [
  [() => groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']), [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]],
]);
test('setOps', [
  [() => setOps([1, 2, 3], [2, 3, 4]), { union: [1, 2, 3, 4], intersection: [2, 3], difference: [1] }],
]);
test('mapToObject / objectToMap', [
  [() => mapToObject(new Map([['a', 1], ['b', 2]])), { a: 1, b: 2 }],
  [() => objectToMap({ a: 1 }), new Map([['a', 1]])],
]);
test('uniqueBy', [
  [() => uniqueBy([{ id: 1, n: 'a' }, { id: 1, n: 'b' }, { id: 2, n: 'c' }], 'id'), [{ id: 1, n: 'a' }, { id: 2, n: 'c' }]],
]);
test('createCache', [
  [() => {
    const c = createCache();
    c.set('a', 1);
    c.set('b', 2);
    c.delete('b');
    return [c.get('a'), c.get('b'), c.has('a'), c.size()];
  }, [1, null, true, 1], 'set/get/delete/has/size'],
]);

run('Блок 05 — Map і Set');

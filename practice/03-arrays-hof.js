// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 03 — МАСИВИ: ФУНКЦІЇ ВИЩОГО ПОРЯДКУ
// map, filter, reduce, find, some, every, sort, flatMap ...
// Запуск: node 03-arrays-hof.js
// Ціль: КОЖНУ задачу — без циклів for (крім 14–16), ланцюжками методів.
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

const users = [
  { name: 'Anna', age: 25, city: 'Kyiv', active: true },
  { name: 'Bohdan', age: 17, city: 'Lviv', active: true },
  { name: 'Vira', age: 32, city: 'Kyiv', active: false },
  { name: 'Dmytro', age: 41, city: 'Odesa', active: true },
  { name: 'Olena', age: 15, city: 'Lviv', active: true },
];

// 1. getNames(users) → ['Anna', 'Bohdan', ...]
// 💡 map
function getNames(users) {
  return todo();
}

// 2. getAdultNames(users) — імена тих, кому >= 18
//   → ['Anna', 'Vira', 'Dmytro']
// 💡 filter + map
function getAdultNames(users) {
  return todo();
}

// 3. sumAges(users) → 130
// 💡 reduce (не забудь початкове значення!)
function sumAges(users) {
  return todo();
}

// 4. averageAge(users) → 26
// 💡 reduce / length
function averageAge(users) {
  return todo();
}

// 5. findByName(users, name) — повернути об'єкт або null
// 💡 find, ??
function findByName(users, name) {
  return todo();
}

// 6. checkUsers(users) → { hasMinors: true, allActive: false }
// 💡 some, every
function checkUsers(users) {
  return todo();
}

// 7. sortByAge(users) — за зростанням віку, НЕ мутуючи оригінал
// 💡 sort((a, b) => a.age - b.age) МУТУЄ → [...users].sort(...) або toSorted
function sortByAge(users) {
  return todo();
}

// 8. sortedNames(users) — імена за алфавітом
//   → ['Anna', 'Bohdan', 'Dmytro', 'Olena', 'Vira']
// 💡 map, sort, localeCompare
function sortedNames(users) {
  return todo();
}

// 9. groupByCity(users) → { Kyiv: ['Anna', 'Vira'], Lviv: ['Bohdan', 'Olena'], Odesa: ['Dmytro'] }
// 💡 reduce з об'єктом-акумулятором (acc[key] ??= [])   🎯 Бонус: Object.groupBy
function groupByCity(users) {
  return todo();
}

// 10. countBy(words) — скільки разів зустрічається кожне слово
//   countBy(['apple', 'banana', 'apple']) → { apple: 2, banana: 1 }
// 💡 reduce, (acc[w] || 0) + 1
function countBy(words) {
  return todo();
}

// 11. oldestName(users) → 'Dmytro'
// 💡 reduce (порівнюй два елементи, повертай "кращого")
function oldestName(users) {
  return todo();
}

// 12. cartTotal(cart) — сума price * qty тільки для товарів inStock
// 💡 filter + reduce   (або тільки reduce)
function cartTotal(cart) {
  return todo();
}

// 13. uniqueTags(posts) — усі унікальні теги, відсортовані
//   posts = [{ tags: ['js', 'web'] }, { tags: ['css', 'web'] }] → ['css', 'js', 'web']
// 💡 flatMap, new Set, spread, sort
function uniqueTags(posts) {
  return todo();
}

// 14. myMap(arr, fn) — свій map ЦИКЛОМ. fn отримує (елемент, індекс, масив)
function myMap(arr, fn) {
  return todo();
}

// 15. myFilter(arr, fn) — свій filter ЦИКЛОМ
function myFilter(arr, fn) {
  return todo();
}

// 16. myReduce(arr, fn, initial) — свій reduce ЦИКЛОМ.
// Якщо initial не передали — стартуй з arr[0] і йди з індексу 1.
// 💡 arguments.length або (...args) щоб відрізнити "не передали" від undefined
function myReduce(arr, fn, initial) {
  return todo();
}

// 17. evenIndexes(nums) → { first, last } — індекси першого і останнього парного (або -1)
//   evenIndexes([1, 2, 3, 4, 5]) → { first: 1, last: 3 }
// 💡 findIndex, findLastIndex
function evenIndexes(nums) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
const cart = [
  { name: 'Book', price: 200, qty: 2, inStock: true },
  { name: 'Pen', price: 15, qty: 10, inStock: true },
  { name: 'Lamp', price: 900, qty: 1, inStock: false },
];
const posts = [{ tags: ['js', 'web'] }, { tags: ['css', 'web'] }, { tags: ['js', 'node'] }];

test('getNames', [[() => getNames(users), ['Anna', 'Bohdan', 'Vira', 'Dmytro', 'Olena']]]);
test('getAdultNames', [[() => getAdultNames(users), ['Anna', 'Vira', 'Dmytro']]]);
test('sumAges', [
  [() => sumAges(users), 130],
  [() => sumAges([]), 0],
]);
test('averageAge', [[() => averageAge(users), 26]]);
test('findByName', [
  [() => findByName(users, 'Vira'), { name: 'Vira', age: 32, city: 'Kyiv', active: false }],
  [() => findByName(users, 'Ivan'), null],
]);
test('checkUsers', [
  [() => checkUsers(users), { hasMinors: true, allActive: false }],
  [() => checkUsers(users.slice(0, 1)), { hasMinors: false, allActive: true }],
]);
test('sortByAge', [
  [() => sortByAge(users).map((u) => u.name), ['Olena', 'Bohdan', 'Anna', 'Vira', 'Dmytro']],
  [() => { sortByAge(users); return users[0].name; }, 'Anna', 'оригінал не змінюється'],
]);
test('sortedNames', [[() => sortedNames(users), ['Anna', 'Bohdan', 'Dmytro', 'Olena', 'Vira']]]);
test('groupByCity', [
  [() => groupByCity(users), { Kyiv: ['Anna', 'Vira'], Lviv: ['Bohdan', 'Olena'], Odesa: ['Dmytro'] }],
]);
test('countBy', [
  [() => countBy(['apple', 'banana', 'apple']), { apple: 2, banana: 1 }],
  [() => countBy([]), {}],
]);
test('oldestName', [[() => oldestName(users), 'Dmytro']]);
test('cartTotal', [[() => cartTotal(cart), 550]]);
test('uniqueTags', [[() => uniqueTags(posts), ['css', 'js', 'node', 'web']]]);
test('myMap', [
  [() => myMap([1, 2, 3], (x) => x * 2), [2, 4, 6]],
  [() => myMap(['a', 'b'], (x, i) => x + i), ['a0', 'b1']],
]);
test('myFilter', [[() => myFilter([1, 2, 3, 4], (x) => x % 2 === 0), [2, 4]]]);
test('myReduce', [
  [() => myReduce([1, 2, 3], (a, b) => a + b, 10), 16],
  [() => myReduce([1, 2, 3], (a, b) => a + b), 6],
  [() => myReduce(['a', 'b'], (acc, x) => acc.concat(x.toUpperCase()), []), ['A', 'B']],
]);
test('evenIndexes', [
  [() => evenIndexes([1, 2, 3, 4, 5]), { first: 1, last: 3 }],
  [() => evenIndexes([1, 3]), { first: -1, last: -1 }],
]);

run('Блок 03 — map/filter/reduce');

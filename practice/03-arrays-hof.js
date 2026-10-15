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
  return users.map(user => user.name);
}

// 2. getAdultNames(users) — імена тих, кому >= 18
//   → ['Anna', 'Vira', 'Dmytro']
// 💡 filter + map
function getAdultNames(users) {
  return users.filter(user => user.age >= 18).map(user => user.name);
}

// 3. sumAges(users) → 130
// 💡 reduce (не забудь початкове значення!)
function sumAges(users) {
  return users.reduce((acc, user) => acc + user.age, 0);
}

// 4. averageAge(users) → 26;  averageAge([]) → 0
// 💡 reduce / length
function averageAge(users) {
  if (!users.length) { return 0 }
  return sumAges(users) / users.length;
}

// 5. findByName(users, name) — повернути об'єкт або null
// 💡 find, ??
function findByName(users, name) {
  return users.find((user) => user.name === name) || null;
}

// 6. checkUsers(users) → { hasMinors: true, allActive: false }
// 💡 some, every
function checkUsers(users) {
  return {
    hasMinors: users.some(user => user.age < 18),
    allActive: users.every(user => user.active),
  }
}

// 7. sortByAge(users) — за зростанням віку, НЕ мутуючи оригінал
// 💡 sort((a, b) => a.age - b.age) МУТУЄ → [...users].sort(...) або toSorted
function sortByAge(users) {
  return users.toSorted((a, b) => a.age - b.age);
}

// 8. sortedNames(users) — імена за алфавітом
//   → ['Anna', 'Bohdan', 'Dmytro', 'Olena', 'Vira']
// 💡 map, sort, localeCompare
function sortedNames(users) {
  return users.map((u) => u.name).toSorted();
}

// 9. groupByCity(users) → { Kyiv: ['Anna', 'Vira'], Lviv: ['Bohdan', 'Olena'], Odesa: ['Dmytro'] }
// 💡 reduce з об'єктом-акумулятором (acc[key] ??= [])   🎯 Бонус: Object.groupBy
function groupByCity(users) {
  // const acc = new Object();
  // const group = Object.groupBy(users, ({ city }) => city)
  // console.log(group)
  return users.reduce((acc, user) => {
    acc[user.city] ??= [];
    acc[user.city].push(user.name);
    return acc;
  }, {});
}

  // for (user in users) {
  //   console.log(acc[users[user].city] ??= [])
  //   console.log(users[user].city)
  //   console.log(acc)
  //   console.log(acc[users[user].city].push(users[user].name))
  //   console.log(acc)
  // }
  // return acc
// }

// 10. countBy(words) — скільки разів зустрічається кожне слово
//   countBy(['apple', 'banana', 'apple']) → { apple: 2, banana: 1 }
// 💡 reduce, (acc[w] || 0) + 1
function countBy(words) {
  return words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
}

// 11. oldestName(users) → 'Dmytro'
// 💡 reduce (порівнюй два елементи, повертай "кращого")
function oldestName(users) {
  return users.reduce((acc, user) => acc.age >= user.age ? acc : user).name;
}

// 12. cartTotal(cart) — сума price * qty тільки для товарів inStock
// 💡 filter + reduce   (або тільки reduce)
function cartTotal(cart) {
  return cart.reduce((acc, item) => (item.inStock ? acc + item.price * item.qty : acc), 0);
  // return cart
  //   .filter(item => item.inStock)
  //   .reduce((acc, item) => (acc + item.price * item.qty), 0);
}

// 13. uniqueTags(posts) — усі унікальні теги, відсортовані
//   posts = [{ tags: ['js', 'web'] }, { tags: ['css', 'web'] }] → ['css', 'js', 'web']
// 💡 flatMap, new Set, spread, sort
function uniqueTags(posts) {
  const arr = posts.flatMap((post) => post.tags);
  const arr1 = new Set(arr);
  return [...arr1].sort();
}

// 14. myMap(arr, fn) — напиши СВІЙ map, без вбудованого .map(), звичайним циклом (for).
//   Що має робити:
//   - пройти по кожному елементу arr
//   - для кожного викликати fn(елемент, індекс, масив) — саме в такому порядку аргументів
//   - те, що повернула fn, покласти в НОВИЙ масив
//   - повернути новий масив (той самий розмір, що й arr); arr не змінювати
//   myMap([1, 2, 3], x => x * 2)          → [2, 4, 6]
//   myMap(['a', 'b'], (x, i) => x + i)    → ['a0', 'b1']   (fn використовує індекс)
//   myMap([], x => x)                     → []
// 💡 порожній масив-результат, for, push
function myMap(arr, fn) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(fn(arr[i], i, arr))
  }
  return res;
}

// 15. myFilter(arr, fn) — свій filter ЦИКЛОМ
function myFilter(arr, fn) {
  const res = [];
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] % 2 === 0) {
  //     res.push(arr[i])
  //   }
  // }
  // return res;

  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr) ? res.push(arr[i]) : res;
  }
  return res;
}

// 16. myReduce(arr, fn, initial) — свій reduce ЦИКЛОМ.
// Якщо initial не передали — стартуй з arr[0] і йди з індексу 1.
// 💡 arguments.length або (...args) щоб відрізнити "не передали" від undefined
function myReduce(arr, fn, initial) {
  let res = {};
  if (arguments.length === 3) { 
    res = { acc: initial, i: 0 }
  } else { res = { acc: arr[0], i: 1 } };

  for (let i = res.i; i < arr.length; i++) {
    res.acc = fn(res.acc, arr[i], i, arr)
  }
  return res.acc;
}

// 17. evenIndexes(nums) → { first, last } — індекси першого і останнього парного (або -1)
//   evenIndexes([1, 2, 3, 4, 5]) → { first: 1, last: 3 }
// 💡 findIndex, findLastIndex
function evenIndexes(nums) {
  const isEven = (element) => element % 2 === 0;
  return { first: nums.findIndex(isEven), last: nums.findLastIndex(isEven) };
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
test('averageAge', [
  [() => averageAge(users), 26],
  [() => averageAge([]), 0, 'порожній масив → 0, а не NaN'],
]);
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

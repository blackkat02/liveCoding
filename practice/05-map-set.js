// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 05 — Map і Set (лічильники, унікальність, швидкий пошук O(1))
// Запуск: node 05-map-set.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. unique(arr)
//   unique([1, 2, 2, 3, 1]) → [1, 2, 3]
// 💡 new Set, spread / Array.from
function unique(arr) {
  return Array.from(new Set(arr));
}

// 2. hasDuplicates(arr)
//   hasDuplicates([1, 2, 3, 1]) → true
// 💡 Set.size vs length
function hasDuplicates(arr) {
  return arr.length !== new Set(arr).size;
}

// 3. frequencyMap(arr) — повернути саме Map
//   frequencyMap(['a', 'b', 'a']) → Map { 'a' => 2, 'b' => 1 }
// 💡 new Map, get, set, (map.get(x) ?? 0) + 1
function frequencyMap(arr) {
  return arr.reduce((acc, char) => acc.set(char, (acc.get(char) ?? 0) + 1), new Map())
  // let map = new Map();
  // arr.forEach(char => (map.set(char, (map.get(char) ?? 0) + 1)))
  
  // for (const char of arr) {
  //   map.set(char, (map.get(char) ?? 0) + 1)
  // }
  // return map;
}

// 4. mostFrequent(arr) — найчастіший елемент (при рівності — той, що зустрівся раніше)
//   mostFrequent([3, 1, 3, 2, 1, 3]) → 3
// 💡 Map + for...of по map.entries() (або [...map].sort / reduce)
function mostFrequent(arr) {
  const map = arr.reduce((acc, char) => acc.set(char, (acc.get(char) ?? 0) + 1), new Map());
  let bestKey = null, bestCount = 0;

  for (const [key, value] of map) {
    if (value > bestCount) {
      bestKey = key;
      bestCount = value;
    }
  }

  return bestKey;

  // const iterator = map.entries();

  // return iterator.reduce((acc, [key, value]) => iterator.next().value)

  // return [...map].sort(([key1, value1], [key2, value2]) => value2 - value1)[0][0];
}

// 5. firstNonRepeatingChar(str) — перший символ, що зустрічається 1 раз, або null
//   firstNonRepeatingChar('aabbcdd') → 'c'
// 💡 два проходи: порахувати → знайти
function firstNonRepeatingChar(str) {
  const mapCount = new Map();

  for (const char of str) {
    mapCount.set(char, (mapCount.get(char) ?? 0) +1)
  };

  for (const [char, value] of mapCount) {
    if (value === 1) {
      return char;
    } 
  };

  return null;
};

// 6. twoSum(nums, target) — індекси двох чисел, сума яких = target. O(n)!
//   twoSum([2, 7, 11, 15], 9) → [0, 1]
//   Нема пари → null
// 💡 Map: значення → індекс; шукай target - x
function twoSum(nums, target) {
  const map = new Map()
  let count = 0

  for (const num of nums) {
    const newTarget = target - num;

    if (map.has(newTarget)) {
      return [map.get(newTarget), count]
    }
    map.set(num, count)
    count += 1
  };

  return null;
}

// 7. isAnagram(a, b)
//   isAnagram('listen', 'silent') → true
// 💡 варіант 1: split + sort + join;  варіант 2: лічильник у Map
function isAnagram(a, b) {
  if (a.length !== b.length) return false;

  let map = new Map();

  for (let i = 0; i < a.length; i++) {
    map.set(a[i], (map.get(a[i]) ?? 0) +1);
    map.set(b[i], (map.get(b[i]) ?? 0) -1);
  }

  return [...map.values()].every(num => num === 0);
}

// 8. groupAnagrams(words) — групи в порядку першої появи
//   ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] → [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
// 💡 Map: відсортоване слово → масив; [...map.values()]
function groupAnagrams(words) { 
  const map = new Map();

  for (const word of words) {
    const key = word.split("").sort().join("")
    !map.has(key) ? map.set(key, [word]) : map.get(key).push(word)
  };

  return [...map.values()]
}

// 9. setOps(a, b) → { union, intersection, difference } (масиви, без дублів)
//   setOps([1, 2, 3], [2, 3, 4]) → { union: [1, 2, 3, 4], intersection: [2, 3], difference: [1] }
// 💡 new Set, has, filter
function setOps(a, b) {
  const aS = new Set(a)
  const bS = new Set(b)
  // return { union: [...aS.union(bS)], intersection: [...aS.intersection(bS).values()], difference: [...aS.difference(bS).values()] };

  const difference = [...aS].filter(x => !bS.has(x))
  const union = [...difference, ...bS] 
  const intersection = [...aS].filter(x => bS.has(x))

  return { union: union, intersection: intersection, difference: difference };
}

// 10. mapToObject(map) і objectToMap(obj)
//   mapToObject(new Map([['a', 1]])) → { a: 1 }
// 💡 Object.fromEntries(map), new Map(Object.entries(obj))
function mapToObject(map) {
  return Object.fromEntries(map);
}
function objectToMap(obj) {
  return new Map(Object.entries(obj));
}

// 11. uniqueBy(arr, key) — прибрати дублі за полем key
// Два об'єкти — «дублі», якщо в них однакове значення поля key (інші поля не важливі).
// Для КОЖНОГО значення key лишається перший об'єкт, де воно трапилось; решта з тим самим значенням — викидаються.
// Порядок тих, що лишились, — як у вхідному масиві. Порожній масив → [].
//   uniqueBy([{ id: 1, n: 'a' }, { id: 1, n: 'b' }, { id: 2, n: 'c' }], 'id') → [{ id: 1, n: 'a' }, { id: 2, n: 'c' }]
//   uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 2 }], 'id') → [{ id: 1 }, { id: 2 }, { id: 3 }]
// 💡 Set "вже бачив" + filter
function uniqueBy(arr, key) {
  const example = new Set()
  // const example = set.values();
  const res = []

  for (let i = 0; i < arr.length; i++) {
    const v = arr[i][key]

    if (!example.has(v)) {
      res.push(arr[i])
      example.add(v)
    } 
  }

  // const objFilter = arr.filter(obj => example.include(obj[key]))

  return res;
}

// 12. createCache() — простий кеш на Map
// Повернути об'єкт з методами: set(k, v), get(k) (або null), has(k), delete(k), size()
//   - get(k) для ключа, якого нема, → null (не undefined)
//   - set для наявного ключа перезаписує значення (size не росте)
//   - збережене 0 / '' / false — це справжнє значення: get його повертає, а не null
//   - кожен createCache() — окремий кеш, вони не ділять дані
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
  [() => uniqueBy([{ id: 1, n: 'a' }, { id: 2, n: 'b' }, { id: 1, n: 'c' }, { id: 3, n: 'd' }, { id: 2, n: 'e' }], 'id'),
    [{ id: 1, n: 'a' }, { id: 2, n: 'b' }, { id: 3, n: 'd' }], 'дублі різних id упереміш'],
  [() => uniqueBy([{ t: 'x', v: 1 }, { t: 'y', v: 2 }, { t: 'x', v: 3 }], 't'), [{ t: 'x', v: 1 }, { t: 'y', v: 2 }], 'інше ім\'я ключа'],
  [() => uniqueBy([], 'id'), []],
]);
test('createCache', [
  [() => {
    const c = createCache();
    c.set('a', 1);
    c.set('b', 2);
    c.delete('b');
    return [c.get('a'), c.get('b'), c.has('a'), c.size()];
  }, [1, null, true, 1], 'set/get/delete/has/size'],
  [() => { const c = createCache(); c.set('a', 1); c.set('a', 2); return [c.get('a'), c.size()]; }, [2, 1], 'перезапис ключа'],
  [() => { const c = createCache(); return [c.get('nope'), c.has('nope'), c.size()]; }, [null, false, 0], 'порожній кеш'],
  [() => { const c = createCache(); c.set('z', 0); c.set('e', ''); return [c.get('z'), c.get('e'), c.has('z')]; }, [0, '', true], 'falsy-значення зберігаються'],
  [() => { const a = createCache(); const b = createCache(); a.set('k', 1); return [b.has('k'), b.size()]; }, [false, 0], 'кеші незалежні'],
]);

run('Блок 05 — Map і Set');

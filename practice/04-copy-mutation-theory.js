// ═══════════════════════════════════════════════════════════
// 📖 ТЕОРІЯ + ПРАКТИКА — КОПІЮВАННЯ І МУТАЦІЯ (до блоку 04)
// посилання vs значення, мутація vs присвоєння, shallow/deep copy,
// які методи мутують, імутабельні оновлення, перевірка «це об'єкт?»
// Запуск теорії: node 04-copy-mutation-theory.js theory
// Запуск задач:  node 04-copy-mutation-theory.js   (або ... 3 — одна задача)
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// ─────────────── ТЕОРІЯ ───────────────
// Кожен розділ — маленька функція з console.log. Спершу прочитай і
// ВГАДАЙ вивід, потім запусти з аргументом theory і звір.

// 1. Примітиви копіюються значенням, об'єкти — посиланням
//    Примітиви: number, string, boolean, null, undefined, bigint, symbol.
//    Все інше (об'єкти, масиви, функції, Date, Map...) — це посилання.
//    Python: так само, тільки там примітиви — це незмінні об'єкти.
function theory1() {
  let a = 5;
  let b = a;
  b = 10;
  console.log('a =', a); // 5 — b отримав КОПІЮ числа

  const o1 = { x: 1 };
  const o2 = o1; // НЕ копія, а ще одна «стрілка» на той самий об'єкт
  o2.x = 99;
  console.log('o1.x =', o1.x); // 99

  // === на об'єктах порівнює посилання (Python: is), а не вміст (Python: ==)
  console.log({ x: 1 } === { x: 1 }); // false — два різні об'єкти
  console.log(o1 === o2); // true — один і той самий
}

// 2. ГОЛОВНЕ: мутація vs присвоєння
//    Мутація     — змінюємо вміст об'єкта:   ref.city = '...', ref.push(...), Object.assign(ref, ...)
//                  → видно всім, хто тримає посилання на цей об'єкт.
//    Присвоєння  — перенаправляємо змінну:   ref = { ... }
//                  → змінюється тільки ця змінна, об'єкт не чіпаємо.
function theory2() {
  const user = { name: 'Anna', address: { city: 'Kyiv' } };

  let ref = user.address; // ref і user.address → один об'єкт
  ref.city = 'Lviv'; // МУТАЦІЯ
  console.log(user.address.city); // 'Lviv' — user теж «побачив»

  ref = { city: 'Odesa' }; // ПРИСВОЄННЯ — ref тепер дивиться на новий об'єкт
  console.log(user.address.city); // 'Lviv' — user не зачеплено

  // const забороняє ПРИСВОЄННЯ, але не МУТАЦІЮ:
  const arr = [1];
  arr.push(2); // ок
  // arr = [];  // TypeError: Assignment to constant variable
  console.log(arr); // [1, 2]
}

// 3. Поверхнева (shallow) копія — новий лише ПЕРШИЙ рівень
//    Об'єкти:  { ...o }          Object.assign({}, o)        Python: {**d}, d.copy()
//    Масиви:   [...a]   a.slice()   Array.from(a)            Python: a[:], list(a)
//    Вкладені об'єкти/масиви НЕ копіюються — копіюються посилання на них.
function theory3() {
  const target = { a: 1, n: { x: 1 }, list: [1] };
  const copy = { ...target };

  console.log(copy === target); // false — верхній рівень новий
  console.log(copy.n === target.n); // true  — вкладений спільний!
  console.log(copy.list === target.list); // true

  copy.a = 99; // присвоєння в копії → target.a не змінився
  copy.n.x = 99; // мутація спільного вкладеного → target.n.x теж 99
  copy.list = [7]; // присвоєння → target.list лишився [1]
  console.log(target); // { a: 1, n: { x: 99 }, list: [ 1 ] }
}

// 4. Що МУТУЄ, а що повертає нове
//    Мутують (змінюють оригінал):
//      obj.k = v, obj[k] = v, delete obj.k
//      Object.assign(target, ...)      ← змінює ПЕРШИЙ аргумент!
//      arr.push / pop / shift / unshift / splice / sort / reverse / fill
//    Повертають нове (оригінал цілий):
//      { ...o }, Object.assign({}, ...)    ← перший аргумент — новий порожній об'єкт
//      arr.map / filter / slice / concat / [...arr]
//      arr.toSorted / toReversed / toSpliced / with(i, v)   (Node 20+)
//    Python: list.sort() мутує, sorted(list) — нове. JS: sort() vs toSorted().
function theory4() {
  const a = { x: 1 };
  const b = { y: 2 };

  const merged = Object.assign({}, a, b); // безпечно: пишемо в новий {}
  console.log(merged, a); // { x: 1, y: 2 } { x: 1 }

  Object.assign(a, b); // НЕбезпечно: пишемо в a
  console.log(a); // { x: 1, y: 2 } — a змінився

  const nums = [3, 1, 2];
  const sorted = nums.toSorted();
  console.log(nums, sorted); // [3, 1, 2] [1, 2, 3]
  nums.sort();
  console.log(nums); // [1, 2, 3] — оригінал змінено
}

// 5. Імутабельне оновлення вкладеного поля
//    Правило: копіюй (spread) КОЖЕН рівень на шляху до зміни,
//    а те, що не змінюєш, — просто лишай спільним (це нормально і дешево).
function theory5() {
  const user = { name: 'Anna', address: { city: 'Kyiv', zip: '01001' }, tags: ['js'] };

  const next = {
    ...user, // новий верхній рівень
    address: { ...user.address, city: 'Lviv' }, // новий address, бо міняємо в ньому
  };

  console.log(user.address.city, next.address.city); // 'Kyiv' 'Lviv'
  console.log(next === user); // false
  console.log(next.address === user.address); // false — address новий
  console.log(next.tags === user.tags); // true  — tags не чіпали, ділимо

  // Те саме для масиву всередині:
  const withTag = { ...user, tags: [...user.tags, 'ts'] };
  console.log(user.tags, withTag.tags); // ['js'] ['js', 'ts']
}

// 6. Глибока (deep) копія — копія на всіх рівнях
//    structuredClone(x)               Python: copy.deepcopy(x). Вміє Date, Map, Set, цикли.
//                                     НЕ вміє функції (кидає помилку).
//    JSON.parse(JSON.stringify(x))    старий спосіб, губить: undefined, функції,
//                                     Date → рядок, NaN/Infinity → null, Map/Set → {}
//    Своя рекурсія                    ти вже писав: задача 11 deepClone у 04-objects.js
function theory6() {
  const src = { n: { x: 1 }, d: new Date(0), u: undefined };

  const deep = structuredClone(src);
  deep.n.x = 99;
  console.log(src.n.x); // 1 — вкладений теж скопійовано
  console.log(deep.d instanceof Date); // true

  const viaJson = JSON.parse(JSON.stringify(src));
  console.log(viaJson); // { n: { x: 1 }, d: '1970-01-01T00:00:00.000Z' } — u зник, d став рядком
}

// 7. Параметри функцій: передається КОПІЯ ПОСИЛАННЯ (pass by sharing)
//    Як у Python: мутація параметра видна зовні, присвоєння параметру — ні.
function theory7() {
  function mutate(obj) {
    obj.v = 2; // мутація — зовні видно
  }
  function reassign(obj) {
    obj = { v: 3 }; // присвоєння локальній змінній — зовні не видно
  }

  const o = { v: 1 };
  mutate(o);
  console.log(o.v); // 2
  reassign(o);
  console.log(o.v); // 2 — не 3
}

// 8. Як перевірити «це простий об'єкт?»
//    typeof має дві пастки: typeof null === 'object' і typeof [] === 'object'.
function theory8() {
  console.log(typeof {}, typeof [], typeof null, typeof new Date()); // object object object object
  console.log(Array.isArray([]), Array.isArray({})); // true false

  // Прототип простого об'єкта — Object.prototype (у масиву Array.prototype, у дати Date.prototype)
  console.log(Object.getPrototypeOf({}) === Object.prototype); // true
  console.log(Object.getPrototypeOf([]) === Object.prototype); // false
  // Object.getPrototypeOf(null)  → TypeError! Спершу відсій null/undefined.

  // Порядок перевірок важливий: && зупиняється на першому false (як and у Python)
  const x = null;
  console.log(x !== null && typeof x === 'object'); // false, і далі не обчислює
}

// Шпаргалка Python ↔ JS
//   b = a (dict/list)        const b = a                    одне посилання
//   a is b                   a === b  (для об'єктів)
//   a == b (вміст)           немає вбудованого → твій deepEqual (задача 12)
//   d.copy(), {**d}          { ...d }, Object.assign({}, d)  поверхнева
//   l[:], list(l)            [...l], l.slice()               поверхнева
//   copy.deepcopy(x)         structuredClone(x)              глибока
//   d.update(other)          Object.assign(d, other)         МУТАЦІЯ
//   {**a, **b}               { ...a, ...b }                  нове, поверхнево
//   l.sort() / sorted(l)     l.sort() / l.toSorted()

// ─────────────── ПРАКТИКА ───────────────

// 1. predictCopies() — НЕ запускай, спершу подумай. Що буде в кінці?
//   const a = { list: [1, 2], meta: { v: 1 } };
//   const b = { ...a };
//   const c = structuredClone(a);
//   b.list.push(3);
//   b.meta = { v: 2 };
//   c.list.push(4);
//   → [a.list.length, a.meta.v, b.list === a.list, c.list.length, b.meta === a.meta]
// 💡 push — мутація спільного масиву; b.meta = ... — присвоєння
function predictCopies() {
  return todo(); // поверни масив з 5 значень
}

// 2. predictMutating() — які з цих викликів ЗМІНЯТЬ arr? (кожен — на свіжому [3, 1, 2])
//   arr.push(4), arr.map(x => x), arr.sort(), arr.toSorted(),
//   arr.slice(1), arr.splice(1), arr.concat([4]), arr.reverse()
//   → масив з 8 true/false у тому ж порядку
function predictMutating() {
  return todo();
}

// 3. withCity(user, city) — НОВИЙ user з іншим містом, оригінал не мутувати
//   withCity({ name: 'Anna', address: { city: 'Kyiv', zip: '01001' } }, 'Lviv')
//     → { name: 'Anna', address: { city: 'Lviv', zip: '01001' } }
//   Якщо address немає — створити: withCity({ name: 'Bob' }, 'Lviv') → { name: 'Bob', address: { city: 'Lviv' } }
// 💡 spread на кожному рівні шляху; spread від undefined — це просто нічого
function withCity(user, city) {
  return todo();
}

// 4. addTag(post, tag) — НОВИЙ post з доданим тегом у кінець, оригінал не мутувати
//   addTag({ title: 'Hi', tags: ['js'] }, 'ts') → { title: 'Hi', tags: ['js', 'ts'] }
// 💡 push мутує — а що повертає новий масив?
function addTag(post, tag) {
  return todo();
}

// 5. applyTheme(config, theme) — ⚠️ ЦЯ ФУНКЦІЯ ВЖЕ НАПИСАНА, АЛЕ З БАГОМ. Знайди і виправ.
//   applyTheme({ port: 80, ui: { lang: 'uk' } }, 'dark') → { port: 80, ui: { lang: 'uk', theme: 'dark' } }
//   Оригінальний config змінюватись не повинен.
function applyTheme(config, theme) {
  Object.assign(config.ui, { theme });
  return config;
}

// 6. isPlainObject(x) — true тільки для простого об'єкта {...}
//   isPlainObject({ a: 1 }) → true
//   isPlainObject(null) / [] / new Date() / 'str' / 5 / undefined → false
// 💡 теорія розділ 8; не забудь, у якому порядку перевіряти
function isPlainObject(x) {
  return todo();
}

// 7. countShared(a, b) — скільки ключів мають у a і b ОДИН І ТОЙ САМИЙ об'єкт (===)?
//   Примітиви не рахуємо — тільки значення-об'єкти (не null).
//   const o = { x: 1, n: {}, list: [] };
//   countShared(o, { ...o })            → 2   (n і list спільні)
//   countShared(o, structuredClone(o))  → 0
// 💡 Object.keys + filter; === на об'єктах — це Python is
function countShared(a, b) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('predictCopies', [[() => predictCopies(), [3, 1, true, 3, false]]]);
test('predictMutating', [
  [() => predictMutating(), [true, false, true, false, false, true, false, true]],
]);
test('withCity', [
  [() => withCity({ name: 'Anna', address: { city: 'Kyiv', zip: '01001' } }, 'Lviv'), { name: 'Anna', address: { city: 'Lviv', zip: '01001' } }],
  [() => withCity({ name: 'Bob' }, 'Lviv'), { name: 'Bob', address: { city: 'Lviv' } }],
  [() => { const u = { name: 'Anna', address: { city: 'Kyiv' } }; withCity(u, 'Lviv'); return u; }, { name: 'Anna', address: { city: 'Kyiv' } }, 'оригінал не змінюється'],
  [() => { const u = { address: { city: 'Kyiv' }, tags: ['a'] }; const r = withCity(u, 'Lviv'); return [r === u, r.address === u.address, r.tags === u.tags]; }, [false, false, true], 'новий верх і address, tags спільний'],
]);
test('addTag', [
  [() => addTag({ title: 'Hi', tags: ['js'] }, 'ts'), { title: 'Hi', tags: ['js', 'ts'] }],
  [() => { const p = { title: 'Hi', tags: ['js'] }; addTag(p, 'ts'); return p; }, { title: 'Hi', tags: ['js'] }, 'оригінал не змінюється'],
]);
test('applyTheme', [
  [() => applyTheme({ port: 80, ui: { lang: 'uk' } }, 'dark'), { port: 80, ui: { lang: 'uk', theme: 'dark' } }],
  [() => { const c = { port: 80, ui: { lang: 'uk' } }; applyTheme(c, 'dark'); return c; }, { port: 80, ui: { lang: 'uk' } }, 'оригінал не змінюється'],
]);
test('isPlainObject', [
  [() => [{}, { a: 1 }].map(isPlainObject), [true, true]],
  [() => [null, [], new Date(), 'str', 5, undefined].map(isPlainObject), [false, false, false, false, false, false]],
]);
test('countShared', [
  [() => { const o = { x: 1, n: {}, list: [] }; return countShared(o, { ...o }); }, 2],
  [() => { const o = { x: 1, n: {}, list: [] }; return countShared(o, structuredClone(o)); }, 0],
  [() => { const o = { n: null, s: 'a' }; return countShared(o, { ...o }); }, 0],
]);

if (process.argv[2] === 'theory') {
  [theory1, theory2, theory3, theory4, theory5, theory6, theory7, theory8].forEach((fn, i) => {
    console.log(`\n── теорія ${i + 1} ──`);
    fn();
  });
} else {
  run('Теорія: копіювання і мутація');
}

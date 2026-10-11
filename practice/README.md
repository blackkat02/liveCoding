# 🏋️ JS-тренажер: повертаємо руки

154 задачі в 11 блоках — від `slice` до `Promise.all`. Кожна задача — заготовка функції + автотести.

## Як працювати

```bash
cd D:\LiveCoding\practice
node 01-strings.js       # весь блок
node 01-strings.js 5     # тільки задача №5
node run-all.js          # загальний прогрес
```

1. Відкрий файл блоку, прочитай умову задачі.
2. **Видали `return todo();`** і напиши рішення.
3. Запусти файл → ✅ пройшло / ❌ що очікувалось і що вийшло / ⏳ ще не почато.

## Правила ментора

- **Без ШІ та автодоповнення.** Вимкни Copilot / Claude у редакторі на час тренування.
- **MDN — можна**, але спершу 5 хвилин спробуй згадати сам.
- `💡` під задачею — підказка-методи. Спробуй **не читати її**, поки не застрягнеш.
- `🎯 Бонус` — розв'яжи ще раз іншим способом.
- Розв'язав → через день видали рішення і напиши знову. Пам'ять тримається на повторенні.
- Застряг на 20+ хвилин → запиши, на чому саме, і спитай мене. Я дам підказку, а не готове рішення.

## Карта блоків

| # | Блок | Що тренуємо |
|---|------|-------------|
| 01 | Рядки | `slice` `split` `join` `toUpperCase` `padStart` `startsWith` `indexOf` `replaceAll` `charCodeAt` |
| 02 | Масиви: база | `push/pop/shift/unshift` `splice` vs `slice` `at` `flat` `Array.from` `fill` `includes` + мутація чи ні |
| 03 | map/filter/reduce | `map` `filter` `reduce` `find` `some` `every` `sort` `localeCompare` `flatMap` `findLastIndex` + свої `map/filter/reduce` |
| 04 | Об'єкти | `Object.keys/values/entries/fromEntries` spread, деструктуризація, `?.` `??` `Object.hasOwn` `freeze`, рекурсивні clone/equal/merge |
| 05 | Map і Set | `new Map/Set` `get/set/has/delete/size` — лічильники, унікальність, twoSum, анаграми |
| 06 | Числа і Math | `Math.*` `toFixed` `parseInt/parseFloat` `Number.isInteger` `toString(2)` `Intl.NumberFormat` |
| 07 | Патерни | два вказівники, ковзне вікно, стек, бінарний пошук, рекурсія, матриці |
| 08 | Regex і URL | `test` `match` `matchAll` `replace` з групами, `URL` `URLSearchParams` `encodeURIComponent` + твоя `addOrChangeUrlParameter` |
| 09 | Функції | rest/default, замикання, `once` `memoize` `curry` `pipe` `debounce` `throttle`, `call/apply/bind` |
| 10 | Async | `Promise` `async/await` `try/catch` `all/allSettled/race/any`, retry, ліміт паралельності, event loop |
| 11 | JSON/Date/класи | `JSON.parse/stringify` (replacer, space), `Date` UTC, `class` `#private` `get` `static` `extends` `super`, свої помилки |

## Самоперевірка: чи пам'ятаю я, що повертає метод?

Без запуску відповідай собі вголос — це найчастіші пастки на співбесідах:

- `push` / `unshift` → ? `pop` / `shift` → ? `splice` → ?
- Які методи масиву **мутують** оригінал? (`sort`, `reverse`, `splice`, `fill`, ...) А які їхні безпечні версії? (`toSorted`, ...)
- `slice(-2)` vs `substring(-2)` — різниця?
- `'abc'.match(/x/g)` → ? (не порожній масив!)
- `[10, 1, 2].sort()` → ? Чому?
- `parseInt('10px')` vs `Number('10px')`?
- `typeof null`, `typeof []`, `Array.isArray([])`?
- `reduce` без початкового значення на порожньому масиві → ?
- `forEach` + `await` — чому не чекає?
- `'key' in obj` vs `Object.hasOwn(obj, 'key')`?

## Прогрес

- [ ] 01 Рядки
- [ ] 02 Масиви: база
- [ ] 03 map/filter/reduce
- [ ] 04 Об'єкти
- [ ] 05 Map і Set
- [ ] 06 Числа і Math
- [ ] 07 Патерни
- [ ] 08 Regex і URL
- [ ] 09 Функції і замикання
- [ ] 10 Async
- [ ] 11 JSON, Date, класи

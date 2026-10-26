// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 08 — РЕГУЛЯРКИ, URL, QUERY-ПАРАМЕТРИ
// test, match, matchAll, replace з групами, URL, URLSearchParams, encodeURIComponent
// Запуск: node 08-regex-url.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. isValidEmail(str) — спрощено: щось@щось.щось, без пробілів
//   isValidEmail('a.b@mail.com') → true;  isValidEmail('a@b') → false
// Має бути: непорожня частина до @, після @ — щось, крапка, і ЩЕ щось після крапки ('a@mail.' → false).
// Пробіли заборонені будь-де, включно з краями ('a@b.com ' → false).
// 💡 /^...$/.test(str), \S, +
function isValidEmail(str) {
  return todo();
}

// 2. extractNumbers(str)
//   extractNumbers('a1b22c333') → [1, 22, 333];  без чисел → []
// «Число» — неперервна послідовність цифр (без знаку і дробів): '3.14' → [3, 14], '007' → [7]
// 💡 match(/\d+/g) (що він повертає, якщо збігів нема?), map(Number)
function extractNumbers(str) {
  return todo();
}

// 3. isCleanPalindrome(str) — ігнорувати все, крім латинських літер і цифр
//   'A man, a plan, a canal: Panama' → true   (регістр НЕ важливий);  '' → true
// 💡 replace(/[^a-z0-9]/gi, '')
function isCleanPalindrome(str) {
  return todo();
}

// 4. normalizeSpaces(str) — кілька пробілів → один, обрізати краї
//   normalizeSpaces('  a   b    c ') → 'a b c'
// «Пробіл» — будь-який пробільний символ: таби і переноси рядків теж ('\ta\n\nb' → 'a b')
// 💡 replace(/\s+/g, ' '), trim
function normalizeSpaces(str) {
  return todo();
}

// 5. camelToSnake(str) — тепер регуляркою
//   camelToSnake('userFirstName') → 'user_first_name';  'name' → 'name'
// Якщо рядок починається з великої — без '_' на початку: 'UserName' → 'user_name'
// 💡 replace(/[A-Z]/g, (m) => ...)
function camelToSnake(str) {
  return todo();
}

// 6. formatPhone(digits) — рядок з рівно 10 цифр → '(050) 123-45-67'
//   formatPhone('0671112233') → '(067) 111-22-33'
// 💡 групи (\d{3})(\d{3})(\d{2})(\d{2}) і '$1' у рядку заміни
function formatPhone(digits) {
  return todo();
}

// 7. extractHashtags(str)
//   extractHashtags('I love #js and #node_js!') → ['js', 'node_js']   (без '#'; тег — літери, цифри, _)
//   extractHashtags('#js#ts') → ['js', 'ts'];  '#' без слова — не тег
// 💡 matchAll(/#(\w+)/g) + map(m => m[1])
function extractHashtags(str) {
  return todo();
}

// 8. slugify(str)
//   slugify('  Hello, World! JS 2026 ') → 'hello-world-js-2026'
// Лишаються тільки латинські літери і цифри; будь-яка група інших символів → один '-'; '-' на краях — прибрати.
//   slugify('C++ & Java') → 'c-java';  slugify('---a---') → 'a'
// 💡 toLowerCase, trim, replace(/[^a-z0-9]+/g, '-'), прибрати '-' з країв
function slugify(str) {
  return todo();
}

// 9. getQueryParam(url, name) — значення параметра або null
//   getQueryParam('https://site.com/p?id=42&q=js', 'id') → '42'   (завжди РЯДОК, декодований)
// Параметр повторюється → перше значення.
// 💡 new URL(url).searchParams.get(name)
function getQueryParam(url, name) {
  return todo();
}

// 10. parseQuery(query) — рядок → об'єкт (декодуючи значення)
//   parseQuery('?a=1&b=hello%20world') → { a: '1', b: 'hello world' }
// '?' на початку може бути, а може й не бути: parseQuery('a=1') → { a: '1' };  '' → {}
// 💡 new URLSearchParams(query) + Object.fromEntries   🎯 Бонус: вручну через split + decodeURIComponent
function parseQuery(query) {
  return todo();
}

// 11. buildQuery(obj) — об'єкт → рядок (закодувати значення)
//   buildQuery({ q: 'js tips', page: 2 }) → 'q=js%20tips&page=2'
// Кодуй і ключі, і значення: { 'a b': 'x&y=z' } → 'a%20b=x%26y%3Dz';  {} → ''
// 💡 Object.entries, encodeURIComponent, join('&')
//   (зверни увагу: URLSearchParams кодує пробіл як '+', а тут треба %20)
function buildQuery(obj) {
  return todo();
}

// 12. addOrChangeUrlParameter(url, param) — ТВОЯ задача з ManipulateURLParameters.js 🙂
//   ('www.example.com', 'key=value')                → 'www.example.com?key=value'
//   ('www.example.com?key=value', 'key2=value2')    → 'www.example.com?key=value&key2=value2'
//   ('www.example.com?key=oldValue', 'key=newValue') → 'www.example.com?key=newValue'
// Ключ порівнюється ЦІЛКОМ: 'key' ≠ 'key2'. Порядок інших параметрів не змінюється.
// ⚠️ new URL('www.example.com') впаде — нема протоколу. Тому розбирай вручну.
// 💡 split('?'), split('&'), split('='), findIndex / Map, join
function addOrChangeUrlParameter(url, param) {
  return todo();
}

// 13. getDomain(url)
//   getDomain('https://www.example.com:8080/path?x=1') → 'www.example.com'   (без порту і протоколу)
// 💡 new URL(url).hostname  (а що повертають host, origin, pathname?)
function getDomain(url) {
  return todo();
}

// 14. maskEmail(email)
//   maskEmail('boris@gmail.com') → 'b***s@gmail.com'
// Перша і остання літера імені лишаються, середина — завжди РІВНО три '*' (незалежно від довжини).
//   maskEmail('alexander@ukr.net') → 'a***r@ukr.net'   (ім'я — щонайменше 2 символи)
// 💡 split('@') + slice  або  replace з групами
function maskEmail(email) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('isValidEmail', [
  [() => ['a.b@mail.com', 'a@b', 'a b@c.com', '@mail.com', 'x@y.ua'].map(isValidEmail), [true, false, false, false, true]],
  [() => ['a@mail.', 'a@b.com ', ' a@b.com', 'a@b.c', ''].map(isValidEmail), [false, false, false, true, false], 'краї рядка і порожня частина після крапки'],
]);
test('extractNumbers', [
  [() => extractNumbers('a1b22c333'), [1, 22, 333]],
  [() => extractNumbers('abc'), []],
  [() => extractNumbers(''), []],
  [() => extractNumbers('007 and 3.14'), [7, 3, 14], 'тільки послідовності цифр'],
]);
test('isCleanPalindrome', [
  [() => isCleanPalindrome('A man, a plan, a canal: Panama'), true],
  [() => isCleanPalindrome('race a car'), false],
  [() => isCleanPalindrome('No lemon, no melon'), true],
  [() => isCleanPalindrome('12a21'), true, 'цифри теж рахуються'],
  [() => isCleanPalindrome('0P'), false],
  [() => isCleanPalindrome(''), true],
]);
test('normalizeSpaces', [
  [() => normalizeSpaces('  a   b    c '), 'a b c'],
  [() => normalizeSpaces('\ta\n\nb'), 'a b', 'таби і переноси'],
  [() => normalizeSpaces('   '), ''],
  [() => normalizeSpaces('a b'), 'a b'],
]);
test('camelToSnake', [
  [() => camelToSnake('userFirstName'), 'user_first_name'],
  [() => camelToSnake('name'), 'name'],
  [() => camelToSnake('UserName'), 'user_name', "без '_' на початку"],
]);
test('formatPhone', [
  [() => formatPhone('0501234567'), '(050) 123-45-67'],
  [() => formatPhone('0671112233'), '(067) 111-22-33'],
]);
test('extractHashtags', [
  [() => extractHashtags('I love #js and #node_js!'), ['js', 'node_js']],
  [() => extractHashtags('no tags'), []],
  [() => extractHashtags('#js#ts'), ['js', 'ts'], 'впритул'],
  [() => extractHashtags('# alone'), [], "'#' без слова"],
]);
test('slugify', [
  [() => slugify('  Hello, World! JS 2026 '), 'hello-world-js-2026'],
  [() => slugify('C++ & Java'), 'c-java', 'група символів → один -'],
  [() => slugify('---a---'), 'a', '- на краях'],
  [() => slugify('   '), ''],
]);
test('getQueryParam', [
  [() => getQueryParam('https://site.com/p?id=42&q=js', 'id'), '42'],
  [() => getQueryParam('https://site.com/p?id=42', 'x'), null],
  [() => getQueryParam('https://site.com/?q=js%20tips', 'q'), 'js tips', 'декодується'],
  [() => getQueryParam('https://site.com/?a=1&a=2', 'a'), '1', 'повтор → перше'],
]);
test('parseQuery', [
  [() => parseQuery('?a=1&b=hello%20world'), { a: '1', b: 'hello world' }],
  [() => parseQuery('a=1'), { a: '1' }, "без '?'"],
  [() => parseQuery(''), {}],
]);
test('buildQuery', [
  [() => buildQuery({ q: 'js tips', page: 2 }), 'q=js%20tips&page=2'],
  [() => buildQuery({ 'a b': 'x&y=z' }), 'a%20b=x%26y%3Dz', 'кодуються ключі й значення'],
  [() => buildQuery({}), ''],
]);
test('addOrChangeUrlParameter', [
  [() => addOrChangeUrlParameter('www.example.com', 'key=value'), 'www.example.com?key=value'],
  [() => addOrChangeUrlParameter('www.example.com?key=value', 'key2=value2'), 'www.example.com?key=value&key2=value2'],
  [() => addOrChangeUrlParameter('www.example.com?key=oldValue', 'key=newValue'), 'www.example.com?key=newValue'],
  [() => addOrChangeUrlParameter('site.ua?a=1&b=2&c=3', 'b=9'), 'site.ua?a=1&b=9&c=3'],
  [() => addOrChangeUrlParameter('site.ua?key2=1', 'key=2'), 'site.ua?key2=1&key=2', "'key' ≠ 'key2'"],
  [() => addOrChangeUrlParameter('site.ua?a=1&b=2', 'b=3'), 'site.ua?a=1&b=3', 'останній параметр'],
]);
test('getDomain', [
  [() => getDomain('https://www.example.com:8080/path?x=1'), 'www.example.com'],
  [() => getDomain('http://localhost:3000'), 'localhost'],
  [() => getDomain('https://sub.site.ua/'), 'sub.site.ua'],
]);
test('maskEmail', [
  [() => maskEmail('boris@gmail.com'), 'b***s@gmail.com'],
  [() => maskEmail('alexander@ukr.net'), 'a***r@ukr.net', 'завжди три *'],
  [() => maskEmail('ab@x.com'), 'a***b@x.com', 'коротке ім\'я'],
]);

run('Блок 08 — Regex і URL');

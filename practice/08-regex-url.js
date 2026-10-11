// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 08 — РЕГУЛЯРКИ, URL, QUERY-ПАРАМЕТРИ
// test, match, matchAll, replace з групами, URL, URLSearchParams, encodeURIComponent
// Запуск: node 08-regex-url.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. isValidEmail(str) — спрощено: щось@щось.щось, без пробілів
//   isValidEmail('a.b@mail.com') → true;  isValidEmail('a@b') → false
// 💡 /^...$/.test(str), \S, +
function isValidEmail(str) {
  return todo();
}

// 2. extractNumbers(str)
//   extractNumbers('a1b22c333') → [1, 22, 333];  без чисел → []
// 💡 match(/\d+/g) (що він повертає, якщо збігів нема?), map(Number)
function extractNumbers(str) {
  return todo();
}

// 3. isCleanPalindrome(str) — ігнорувати все, крім латинських літер і цифр
//   'A man, a plan, a canal: Panama' → true
// 💡 replace(/[^a-z0-9]/gi, '')
function isCleanPalindrome(str) {
  return todo();
}

// 4. normalizeSpaces(str) — кілька пробілів → один, обрізати краї
//   normalizeSpaces('  a   b    c ') → 'a b c'
// 💡 replace(/\s+/g, ' '), trim
function normalizeSpaces(str) {
  return todo();
}

// 5. camelToSnake(str) — тепер регуляркою
//   camelToSnake('userFirstName') → 'user_first_name'
// 💡 replace(/[A-Z]/g, (m) => ...)
function camelToSnake(str) {
  return todo();
}

// 6. formatPhone(digits) — 10 цифр → '(050) 123-45-67'
// 💡 групи (\d{3})(\d{3})(\d{2})(\d{2}) і '$1' у рядку заміни
function formatPhone(digits) {
  return todo();
}

// 7. extractHashtags(str)
//   extractHashtags('I love #js and #node_js!') → ['js', 'node_js']
// 💡 matchAll(/#(\w+)/g) + map(m => m[1])
function extractHashtags(str) {
  return todo();
}

// 8. slugify(str)
//   slugify('  Hello, World! JS 2026 ') → 'hello-world-js-2026'
// 💡 toLowerCase, trim, replace(/[^a-z0-9]+/g, '-'), прибрати '-' з країв
function slugify(str) {
  return todo();
}

// 9. getQueryParam(url, name) — значення параметра або null
//   getQueryParam('https://site.com/p?id=42&q=js', 'id') → '42'
// 💡 new URL(url).searchParams.get(name)
function getQueryParam(url, name) {
  return todo();
}

// 10. parseQuery(query) — рядок → об'єкт (декодуючи значення)
//   parseQuery('?a=1&b=hello%20world') → { a: '1', b: 'hello world' }
// 💡 new URLSearchParams(query) + Object.fromEntries   🎯 Бонус: вручну через split + decodeURIComponent
function parseQuery(query) {
  return todo();
}

// 11. buildQuery(obj) — об'єкт → рядок (закодувати значення)
//   buildQuery({ q: 'js tips', page: 2 }) → 'q=js%20tips&page=2'
// 💡 Object.entries, encodeURIComponent, join('&')
//   (зверни увагу: URLSearchParams кодує пробіл як '+', а тут треба %20)
function buildQuery(obj) {
  return todo();
}

// 12. addOrChangeUrlParameter(url, param) — ТВОЯ задача з ManipulateURLParameters.js 🙂
//   ('www.example.com', 'key=value')                → 'www.example.com?key=value'
//   ('www.example.com?key=value', 'key2=value2')    → 'www.example.com?key=value&key2=value2'
//   ('www.example.com?key=oldValue', 'key=newValue') → 'www.example.com?key=newValue'
// ⚠️ new URL('www.example.com') впаде — нема протоколу. Тому розбирай вручну.
// 💡 split('?'), split('&'), split('='), findIndex / Map, join
function addOrChangeUrlParameter(url, param) {
  return todo();
}

// 13. getDomain(url)
//   getDomain('https://www.example.com:8080/path?x=1') → 'www.example.com'
// 💡 new URL(url).hostname  (а що повертають host, origin, pathname?)
function getDomain(url) {
  return todo();
}

// 14. maskEmail(email)
//   maskEmail('boris@gmail.com') → 'b***s@gmail.com'
// 💡 split('@') + slice  або  replace з групами
function maskEmail(email) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('isValidEmail', [
  [() => ['a.b@mail.com', 'a@b', 'a b@c.com', '@mail.com', 'x@y.ua'].map(isValidEmail), [true, false, false, false, true]],
]);
test('extractNumbers', [
  [() => extractNumbers('a1b22c333'), [1, 22, 333]],
  [() => extractNumbers('abc'), []],
]);
test('isCleanPalindrome', [
  [() => isCleanPalindrome('A man, a plan, a canal: Panama'), true],
  [() => isCleanPalindrome('race a car'), false],
]);
test('normalizeSpaces', [[() => normalizeSpaces('  a   b    c '), 'a b c']]);
test('camelToSnake', [[() => camelToSnake('userFirstName'), 'user_first_name']]);
test('formatPhone', [[() => formatPhone('0501234567'), '(050) 123-45-67']]);
test('extractHashtags', [
  [() => extractHashtags('I love #js and #node_js!'), ['js', 'node_js']],
  [() => extractHashtags('no tags'), []],
]);
test('slugify', [[() => slugify('  Hello, World! JS 2026 '), 'hello-world-js-2026']]);
test('getQueryParam', [
  [() => getQueryParam('https://site.com/p?id=42&q=js', 'id'), '42'],
  [() => getQueryParam('https://site.com/p?id=42', 'x'), null],
]);
test('parseQuery', [[() => parseQuery('?a=1&b=hello%20world'), { a: '1', b: 'hello world' }]]);
test('buildQuery', [[() => buildQuery({ q: 'js tips', page: 2 }), 'q=js%20tips&page=2']]);
test('addOrChangeUrlParameter', [
  [() => addOrChangeUrlParameter('www.example.com', 'key=value'), 'www.example.com?key=value'],
  [() => addOrChangeUrlParameter('www.example.com?key=value', 'key2=value2'), 'www.example.com?key=value&key2=value2'],
  [() => addOrChangeUrlParameter('www.example.com?key=oldValue', 'key=newValue'), 'www.example.com?key=newValue'],
  [() => addOrChangeUrlParameter('site.ua?a=1&b=2&c=3', 'b=9'), 'site.ua?a=1&b=9&c=3'],
]);
test('getDomain', [[() => getDomain('https://www.example.com:8080/path?x=1'), 'www.example.com']]);
test('maskEmail', [[() => maskEmail('boris@gmail.com'), 'b***s@gmail.com']]);

run('Блок 08 — Regex і URL');

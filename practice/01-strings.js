// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 01 — РЯДКИ (String)
// Запуск: node 01-strings.js      (або node 01-strings.js 5 — тільки задача 5)
// Правило: видаляй `return todo();` і пиши рішення сам. Без ШІ. MDN — можна.
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. capitalize(str)
// Перша літера — велика, решта без змін.
//   capitalize('hello') → 'Hello'
//   capitalize('')      → ''
// 💡 str[0] / charAt / at, toUpperCase, slice
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);

  return todo();
}

// 2. reverseString(str)
//   reverseString('abc') → 'cba'
// 💡 split, reverse, join   🎯 Бонус: зроби ще й циклом for
function reverseString(str) {
  arr = str.split("")
  arr.reverse()
  stringa = arr.join("")
  return stringa;
}

// 3. isPalindrome(str)
// Ігноруй регістр і пробіли.
//   isPalindrome('Never odd or even') → true
//   isPalindrome('hello')             → false
// 💡 toLowerCase, replaceAll / split+join
function isPalindrome(str) {
  const strT0Low = str.toLowerCase().replaceAll(' ', '');
  let strT0Low1 = strT0Low.split('').reverse().join('');

  return strT0Low === strT0Low1;
}

// 4. countChar(str, char)
// Скільки разів символ зустрічається в рядку.
//   countChar('banana', 'a') → 3
// 💡 for...of, або split(char).length - 1
function countChar(str, char) {
  let counter = 0;
  for (const chart of str) {
    if (chart === char) { counter += 1}
  }
  return counter;
}

// 5. titleCase(str)
// Кожне слово з великої літери, решта — маленькі.
//   titleCase('hello WORLD from js') → 'Hello World From Js'
// 💡 toLowerCase, split(' '), map, join
function titleCase(str) {
  res = str.toLowerCase().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  return res;
}

// 6. truncate(str, maxLength)
// Якщо рядок довший за maxLength — обрізати і додати '...'.
//   truncate('Hello world', 5) → 'Hello...'
//   truncate('Hi', 5)          → 'Hi'
// 💡 length, slice
function truncate(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

// 7. maskCard(cardNumber)
// Залишити останні 4 цифри, решту замінити на '*'.
//   maskCard('1234567812345678') → '************5678'
// 💡 slice(-4), padStart
function maskCard(cardNumber) {
  res = cardNumber.slice(-4)
  return res.padStart(cardNumber.length, "*");
}

// 8. padNumber(num, width)
// Число → рядок з нулями зліва.
//   padNumber(5, 3)    → '005'
//   padNumber(1234, 3) → '1234'
// 💡 String(), padStart
function padNumber(num, width) {
  let res = String(num);

  if (res.length >= width) return res;
  return res.padStart(width, "0");
}

// 9. countWords(str)
// Кількість слів (пробілів між словами може бути кілька).
//   countWords('  hello   world  ') → 2
//   countWords('   ')               → 0
// 💡 trim, split(/\s+/), filter
function countWords(str) {
  let res = str.trim(" ").split(" ")

  return res.filter(word => word.length > 0).length;
}

// 10. getInitials(fullName)
//   getInitials('Taras Hryhorovych Shevchenko') → 'T.H.S.'
// 💡 split, map, join, toUpperCase
function getInitials(fullName) {
  const list = fullName.split(" ").map(word => word.charAt(0).toUpperCase()).join(".") + ".";
  return list;
}

// 11. kebabToCamel(str)
//   kebabToCamel('background-color')     → 'backgroundColor'
//   kebabToCamel('border-top-left-radius') → 'borderTopLeftRadius'
// 💡 split('-'), map з індексом, join('')
function kebabToCamel(str) {
  // return str.split("-").map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");

  return str.split("-").reduce((acc, word) =>
    acc + (word.charAt(0).toUpperCase() + word.slice(1)));
    
  // let res = "";
  // for (let i = 0; i < str.length; i++) {
  //   if (str[-1] === "-") {return res}
  //   if (str[i] !== "-") {
  //     res = `${res}${str[i]}`;
  //   } else {
  //     i += 1;
  //     res = `${res}${str[i].toUpperCase()}`;
  //   }
  // }
  // return res;
}

// 12. camelToKebab(str)  (без регулярок — циклом)
//   camelToKebab('backgroundColor') → 'background-color'
// 💡 for...of, порівняння ch !== ch.toLowerCase()
function camelToKebab(str) {
  let res1 = [];
  // console.log(res1)
  for (ch of str) {
    if (ch !== ch.toLowerCase()) {
        res1.push("-" + ch.toLowerCase())
      } else {
        res1.push(ch.toLowerCase())
      } 
    }
  return res1.join("");
}

// 13. startsAndEnds(str, start, end)
// true, якщо рядок починається з start І закінчується на end.
//   startsAndEnds('index.test.js', 'index', '.js') → true
// 💡 startsWith, endsWith
function startsAndEnds(str, start, end) {
  return str.startsWith(start) && str.endsWith(end);
}

// 14. findPosition(str, word)
// Повернути { first, last } — індекси першого і останнього входження слова (або -1).
//   findPosition('a-b-a-b', 'b') → { first: 2, last: 6 }
// 💡 indexOf, lastIndexOf
function findPosition(str, word) {
  return { first: str.indexOf(word), last: str.lastIndexOf(word) };
}

// 15. caesarCipher(str, shift)
// Зсунути кожну латинську малу літеру на shift позицій по колу. Інші символи — без змін.
//   caesarCipher('abc xyz', 3) → 'def abc'
// 💡 charCodeAt, String.fromCharCode, % 26
function caesarCipher(str, shift) {
  // shift %= 26
  // console.log(shift)

  let res = [];
  for (let i = 0; i < str.length; i++) {
    let m = str[i].charCodeAt(0)
    if (m > 96 && m < 123) {
      let n = m + (((shift % 26) + 26) % 26)

      if (n > 122) {
        n = n - 26
      } 
      // if (n < 97) {
      //   n = 123 - (97 - n)
      // }
      res.push(String.fromCharCode(n))
    } else {
      res.push((str[i]))
    }
  }
  return res.join("");
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('capitalize', [
  [() => capitalize('hello'), 'Hello'],
  [() => capitalize('javaScript'), 'JavaScript'],
  [() => capitalize(''), ''],
]);
test('reverseString', [
  [() => reverseString('abc'), 'cba'],
  [() => reverseString(''), ''],
]);
test('isPalindrome', [
  [() => isPalindrome('Never odd or even'), true],
  [() => isPalindrome('Racecar'), true],
  [() => isPalindrome('hello'), false],
]);
test('countChar', [
  [() => countChar('banana', 'a'), 3],
  [() => countChar('banana', 'z'), 0],
]);
test('titleCase', [
  [() => titleCase('hello WORLD from js'), 'Hello World From Js'],
]);
test('truncate', [
  [() => truncate('Hello world', 5), 'Hello...'],
  [() => truncate('Hi', 5), 'Hi'],
  [() => truncate('Hello', 5), 'Hello'],
]);
test('maskCard', [
  [() => maskCard('1234567812345678'), '************5678'],
  [() => maskCard('1234'), '1234'],
]);
test('padNumber', [
  [() => padNumber(5, 3), '005'],
  [() => padNumber(1234, 3), '1234'],
]);
test('countWords', [
  [() => countWords('  hello   world  '), 2],
  [() => countWords('one'), 1],
  [() => countWords('   '), 0],
]);
test('getInitials', [
  [() => getInitials('Taras Hryhorovych Shevchenko'), 'T.H.S.'],
  [() => getInitials('lesya ukrainka'), 'L.U.'],
]);
test('kebabToCamel', [
  [() => kebabToCamel('background-color'), 'backgroundColor'],
  [() => kebabToCamel('border-top-left-radius'), 'borderTopLeftRadius'],
  [() => kebabToCamel('color'), 'color'],
]);
test('camelToKebab', [
  [() => camelToKebab('backgroundColor'), 'background-color'],
  [() => camelToKebab('borderTopLeftRadius'), 'border-top-left-radius'],
]);
test('startsAndEnds', [
  [() => startsAndEnds('index.test.js', 'index', '.js'), true],
  [() => startsAndEnds('index.test.ts', 'index', '.js'), false],
]);
test('findPosition', [
  [() => findPosition('a-b-a-b', 'b'), { first: 2, last: 6 }],
  [() => findPosition('abc', 'z'), { first: -1, last: -1 }],
]);
test('caesarCipher', [
  [() => caesarCipher('abc xyz', 3), 'def abc'],
  [() => caesarCipher('hello, world!', 13), 'uryyb, jbeyq!'],
  [() => caesarCipher('abc', -1), 'zab'],
  [() => caesarCipher('abc', -27), 'zab'],
  [() => caesarCipher('xyz', 29), 'abc'],
]);

run('Блок 01 — Рядки');

// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 11 — JSON, DATE, КЛАСИ, ПОМИЛКИ
// Запуск: node 11-json-date-classes.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. safeJsonParse(str, fallback) — розпарсити, а якщо JSON битий — повернути fallback
//   safeJsonParse('{"a":1}', null) → { a: 1 };  safeJsonParse('{bad', null) → null
// fallback — ЛИШЕ для битого JSON. Валідний '0', 'false', 'null' повертають 0, false, null, а не fallback.
// 💡 JSON.parse + try/catch
function safeJsonParse(str, fallback) {
  return todo();
}

// 2. prettyJson(obj) — з відступом 2 пробіли
//   prettyJson({ a: 1 }) → '{\n  "a": 1\n}'
// 💡 JSON.stringify(value, replacer, space)
function prettyJson(obj) {
  return todo();
}

// 3. stripPasswords(obj) — JSON-рядок без полів password (на будь-якому рівні)
//   stripPasswords({ u: 'a', password: 'x', n: { password: 'y', k: 1 } }) → '{"u":"a","n":{"k":1}}'
// «На будь-якому рівні» — включно з об'єктами всередині масивів. Оригінал не змінювати.
// 💡 replacer-функція в JSON.stringify: (key, value) => ...
function stripPasswords(obj) {
  return todo();
}

// 4. formatDate(date) — 'YYYY-MM-DD' (у UTC)
//   formatDate(new Date(Date.UTC(2026, 0, 5))) → '2026-01-05'
// 💡 getUTCFullYear, getUTCMonth (з 0!), getUTCDate, padStart   (або toISOString + slice)
function formatDate(date) {
  return todo();
}

// 5. daysBetween(a, b) — кількість повних днів між датами-рядками 'YYYY-MM-DD'
//   daysBetween('2026-01-01', '2026-03-01') → 59   (порядок аргументів не важливий; та сама дата → 0)
// 💡 new Date(str), різниця в мс / (1000 * 60 * 60 * 24), Math.abs, Math.round
function daysBetween(a, b) {
  return todo();
}

// 6. isWeekend(dateStr) — 'YYYY-MM-DD' → true для суботи/неділі
// 💡 getUTCDay(): 0 — неділя, 6 — субота
function isWeekend(dateStr) {
  return todo();
}

// 7. addDays(dateStr, n) → новий рядок 'YYYY-MM-DD'
//   addDays('2026-01-30', 3) → '2026-02-02';  n може бути від'ємним або 0;  переходи через місяць/рік/29 лютого
// 💡 setUTCDate(getUTCDate() + n), toISOString().slice(0, 10)
function addDays(dateStr, n) {
  return todo();
}

// 8. Клас BankAccount — заповни тіло класу:
//   constructor(owner, balance = 0)  — owner доступний як a.owner
//   deposit(amount)  — додає; якщо amount <= 0 → throw new Error('Invalid amount')
//   withdraw(amount) — знімає; якщо коштів не вистачає → throw new Error('Insufficient funds')
//                      (зняти рівно весь баланс — можна; після помилки баланс не змінюється)
//   get balance()    — геттер (сам баланс зберігай у приватному полі #balance)
//   static compare(a, b) — повертає власника з більшим балансом
// 💡 class, #private, get, static, throw
class BankAccount {
  constructor(owner, balance = 0) {
    todo();
  }
}

// 9. Клас SavingsAccount extends BankAccount
//   constructor(owner, balance, rate) — rate у відсотках
//   addInterest() — додає balance * rate / 100 (через deposit)
// 💡 extends, super(...), виклик методу батька
class SavingsAccount extends BankAccount {
  constructor(owner, balance, rate) {
    super(owner, balance);
    todo();
  }
}

// 10. ValidationError — свій клас помилки
//   new ValidationError('email', 'is required') → err.message === 'email is required', err.field === 'email', err.name === 'ValidationError'
//   і err instanceof Error === true
class ValidationError extends Error {
  constructor(field, text) {
    super();
    todo();
  }
}

// 11. validateUser(user) — повернути масив повідомлень про помилки (порожній, якщо все ок)
// Правила: name — не порожній рядок; age — ціле число 0..150 (включно, 0 і 150 — ок).
// Рядок '30' — не число → 'age is invalid'. Відсутнє поле — теж помилка. Порядок: спершу name, потім age.
// Для кожної помилки кидай/лови ValidationError і збирай err.message
//   validateUser({ name: '', age: 200 }) → ['name is required', 'age is invalid']
function validateUser(user) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
test('safeJsonParse', [
  [() => safeJsonParse('{"a":1}', null), { a: 1 }],
  [() => safeJsonParse('{bad', null), null],
  [() => safeJsonParse('', []), []],
  [() => [safeJsonParse('0', 5), safeJsonParse('false', true), safeJsonParse('null', 1)], [0, false, null], 'валідні falsy — не fallback'],
]);
test('prettyJson', [
  [() => prettyJson({ a: 1 }), '{\n  "a": 1\n}'],
  [() => prettyJson({ a: [1] }), '{\n  "a": [\n    1\n  ]\n}', 'вкладений масив'],
]);
test('stripPasswords', [
  [() => stripPasswords({ u: 'a', password: 'x', n: { password: 'y', k: 1 } }), '{"u":"a","n":{"k":1}}'],
  [() => stripPasswords({ list: [{ id: 1, password: 'p' }] }), '{"list":[{"id":1}]}', "об'єкти в масиві"],
  [() => { const o = { password: 'x', a: 1 }; stripPasswords(o); return o; }, { password: 'x', a: 1 }, 'оригінал не змінюється'],
]);
test('formatDate', [
  [() => formatDate(new Date(Date.UTC(2026, 0, 5))), '2026-01-05'],
  [() => formatDate(new Date(Date.UTC(2026, 11, 31))), '2026-12-31'],
]);
test('daysBetween', [
  [() => daysBetween('2026-01-01', '2026-03-01'), 59],
  [() => daysBetween('2026-03-01', '2026-01-01'), 59],
  [() => daysBetween('2026-05-05', '2026-05-05'), 0],
  [() => daysBetween('2024-02-28', '2024-03-01'), 2, 'високосний рік'],
]);
test('isWeekend', [
  [() => ['2026-10-03', '2026-10-04', '2026-10-05'].map(isWeekend), [true, true, false]],
]);
test('addDays', [
  [() => addDays('2026-01-30', 3), '2026-02-02'],
  [() => addDays('2026-03-01', -1), '2026-02-28'],
  [() => addDays('2024-02-28', 1), '2024-02-29', 'високосний'],
  [() => addDays('2026-12-31', 1), '2027-01-01', 'через рік'],
  [() => addDays('2026-06-15', 0), '2026-06-15'],
]);
test('BankAccount', [
  [() => { const a = new BankAccount('Anna', 100); a.deposit(50); a.withdraw(30); return a.balance; }, 120],
  [() => { const a = new BankAccount('A'); try { a.withdraw(1); } catch (e) { return e.message; } return 'не кинуло'; }, 'Insufficient funds'],
  [() => { const a = new BankAccount('A'); try { a.deposit(-5); } catch (e) { return e.message; } return 'не кинуло'; }, 'Invalid amount'],
  [() => { const a = new BankAccount('A', 10); a.balance = 999; return a.balance; }, 10, 'баланс не можна змінити ззовні'],
  [() => BankAccount.compare(new BankAccount('A', 5), new BankAccount('B', 9)), 'B'],
  [() => BankAccount.compare(new BankAccount('A', 9), new BankAccount('B', 5)), 'A'],
  [() => { const a = new BankAccount('A', 10); a.withdraw(10); return a.balance; }, 0, 'зняти весь баланс'],
  [() => { const a = new BankAccount('A', 10); try { a.withdraw(11); } catch {} return a.balance; }, 10, 'після помилки баланс той самий'],
  [() => { const a = new BankAccount('A'); try { a.deposit(0); } catch (e) { return e.message; } return 'не кинуло'; }, 'Invalid amount', 'deposit(0)'],
  [() => [new BankAccount('Anna').owner, new BankAccount('Anna').balance], ['Anna', 0], 'owner і дефолтний баланс'],
]);
test('SavingsAccount', [
  [() => { const s = new SavingsAccount('S', 1000, 5); s.addInterest(); return [s.balance, s instanceof BankAccount]; }, [1050, true]],
  [() => { const s = new SavingsAccount('S', 100, 10); s.addInterest(); s.addInterest(); return s.balance; }, 121, 'відсоток від поточного балансу'],
  [() => { const s = new SavingsAccount('S', 100, 1); s.withdraw(50); return [s.balance, s.owner]; }, [50, 'S'], 'методи батька працюють'],
]);
test('ValidationError', [
  [() => { const e = new ValidationError('email', 'is required'); return [e.message, e.field, e.name, e instanceof Error]; }, ['email is required', 'email', 'ValidationError', true]],
  [() => { try { throw new ValidationError('age', 'is invalid'); } catch (e) { return [e instanceof ValidationError, e.message]; } }, [true, 'age is invalid'], 'кидається і ловиться'],
]);
test('validateUser', [
  [() => validateUser({ name: '', age: 200 }), ['name is required', 'age is invalid']],
  [() => validateUser({ name: 'Anna', age: 30 }), []],
  [() => validateUser({ name: 'Anna', age: 2.5 }), ['age is invalid']],
  [() => validateUser({ name: 'Anna', age: '30' }), ['age is invalid'], 'рядок — не число'],
  [() => [validateUser({ name: 'A', age: 0 }), validateUser({ name: 'A', age: 150 })], [[], []], 'межі 0 і 150 — ок'],
  [() => validateUser({ name: 'A', age: -1 }), ['age is invalid']],
  [() => validateUser({}), ['name is required', 'age is invalid'], 'полів нема'],
]);

run('Блок 11 — JSON, Date, класи');

// ═══════════════════════════════════════════════════════════
// 📦 БЛОК 11 — JSON, DATE, КЛАСИ, ПОМИЛКИ
// Запуск: node 11-json-date-classes.js
// ═══════════════════════════════════════════════════════════
const { test, run, todo } = require('./_lib/tester');

// 1. safeJsonParse(str, fallback) — розпарсити, а якщо JSON битий — повернути fallback
//   safeJsonParse('{"a":1}', null) → { a: 1 };  safeJsonParse('{bad', null) → null
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
//   daysBetween('2026-01-01', '2026-03-01') → 59
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
//   addDays('2026-01-30', 3) → '2026-02-02'
// 💡 setUTCDate(getUTCDate() + n), toISOString().slice(0, 10)
function addDays(dateStr, n) {
  return todo();
}

// 8. Клас BankAccount — заповни тіло класу:
//   constructor(owner, balance = 0)
//   deposit(amount)  — додає; якщо amount <= 0 → throw new Error('Invalid amount')
//   withdraw(amount) — знімає; якщо коштів не вистачає → throw new Error('Insufficient funds')
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
// Правила: name — не порожній рядок; age — ціле число 0..150.
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
]);
test('prettyJson', [[() => prettyJson({ a: 1 }), '{\n  "a": 1\n}']]);
test('stripPasswords', [
  [() => stripPasswords({ u: 'a', password: 'x', n: { password: 'y', k: 1 } }), '{"u":"a","n":{"k":1}}'],
]);
test('formatDate', [
  [() => formatDate(new Date(Date.UTC(2026, 0, 5))), '2026-01-05'],
  [() => formatDate(new Date(Date.UTC(2026, 11, 31))), '2026-12-31'],
]);
test('daysBetween', [
  [() => daysBetween('2026-01-01', '2026-03-01'), 59],
  [() => daysBetween('2026-03-01', '2026-01-01'), 59],
]);
test('isWeekend', [
  [() => ['2026-10-03', '2026-10-04', '2026-10-05'].map(isWeekend), [true, true, false]],
]);
test('addDays', [
  [() => addDays('2026-01-30', 3), '2026-02-02'],
  [() => addDays('2026-03-01', -1), '2026-02-28'],
]);
test('BankAccount', [
  [() => { const a = new BankAccount('Anna', 100); a.deposit(50); a.withdraw(30); return a.balance; }, 120],
  [() => { const a = new BankAccount('A'); try { a.withdraw(1); } catch (e) { return e.message; } return 'не кинуло'; }, 'Insufficient funds'],
  [() => { const a = new BankAccount('A'); try { a.deposit(-5); } catch (e) { return e.message; } return 'не кинуло'; }, 'Invalid amount'],
  [() => { const a = new BankAccount('A', 10); a.balance = 999; return a.balance; }, 10, 'баланс не можна змінити ззовні'],
  [() => BankAccount.compare(new BankAccount('A', 5), new BankAccount('B', 9)), 'B'],
]);
test('SavingsAccount', [
  [() => { const s = new SavingsAccount('S', 1000, 5); s.addInterest(); return [s.balance, s instanceof BankAccount]; }, [1050, true]],
]);
test('ValidationError', [
  [() => { const e = new ValidationError('email', 'is required'); return [e.message, e.field, e.name, e instanceof Error]; }, ['email is required', 'email', 'ValidationError', true]],
]);
test('validateUser', [
  [() => validateUser({ name: '', age: 200 }), ['name is required', 'age is invalid']],
  [() => validateUser({ name: 'Anna', age: 30 }), []],
  [() => validateUser({ name: 'Anna', age: 2.5 }), ['age is invalid']],
]);

run('Блок 11 — JSON, Date, класи');

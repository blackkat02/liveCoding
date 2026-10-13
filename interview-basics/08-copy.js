// ═══════════════════════════════════════════════════════════
// 📦 08 — КОПІЮВАННЯ ОБ'ЄКТІВ
// ❓ Якими способами можна створити копію об'єкта?
// ❓ ➕ Що таке передача за значенням і за посиланням?
// Запуск: node 08-copy.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │ ── ПОВЕРХНЕВА копія (shallow) ──
// │ Копіює тільки ПЕРШИЙ рівень. Вкладені об'єкти лишаються СПІЛЬНИМИ.
// │   { ...obj }                 — spread, найпопулярніший
// │   Object.assign({}, obj)     — старий спосіб
// │   [...arr], arr.slice()      — для масивів
// │
// │   const o = { n: { x: 1 } };
// │   const c = { ...o };
// │   c.n.x = 2;
// │   o.n.x  → 2 😱   бо c.n і o.n — той самий об'єкт
// │
// │ ── ГЛИБОКА копія (deep) ──
// │ Копіює всі рівні.
// │   structuredClone(obj)              ✅ Date, Map, Set, цикли
// │                                     ⚠️ кидає помилку на функціях
// │   JSON.parse(JSON.stringify(obj))   ⚠️ губить undefined і функції,
// │                                        Date стає рядком, NaN стає null
// │   власна рекурсивна функція         (deepClone з блоку 04 у practice/)
// │
// │ ── Передача в функцію ──
// │ У JS усе передається за значенням, але для об'єкта «значенням» є ПОСИЛАННЯ.
// │   function f(a) {
// │     a.push(3);  — змінюємо САМ об'єкт → видно ззовні
// │     a = [9];    — перепризначаємо ЛОКАЛЬНУ змінну → ззовні нічого не змінилось
// │   }
// │
// │ 🗣 На співбесіді: «Поверхнево — spread або Object.assign: вкладені об'єкти
// │    лишаються спільними. Глибоко — structuredClone, JSON-трюк з обмеженнями
// │    або рекурсія».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — масив з 5 відповідей
//   [0] copyA()  [1] copyB()  [2] copyC()  [3] copyD()  [4] copyE()
function copyA() { const o = { n: { x: 1 } }; const c = { ...o }; c.n.x = 2; return o.n.x; }
function copyB() { const o = { n: { x: 1 } }; const c = structuredClone(o); c.n.x = 2; return o.n.x; }
function copyC() { const o = { d: new Date(0) }; const c = JSON.parse(JSON.stringify(o)); return typeof c.d; }
function copyD() { const o = { f() {}, u: undefined, z: 0 }; return Object.keys(JSON.parse(JSON.stringify(o))).length; }
function copyE() { const arr = [1, 2]; (function (a) { a.push(3); a = [9]; })(arr); return arr.length; }
function predictCopy() {
  return todo();
}

// 2. makeCopies(obj) — поверни об'єкт з ТРЬОМА копіями, зробленими різними способами:
//   { spread: ..., assign: ..., deep: ... }
//   spread — через { ...obj },  assign — через Object.assign,  deep — повна глибока копія
function makeCopies(obj) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictCopy', predictCopy, [
  () => copyA(), () => copyB(), () => copyC(), () => copyD(), () => copyE(),
]);
test('makeCopies', [
  [() => makeCopies({ a: 1, n: { x: 1 } }).spread, { a: 1, n: { x: 1 } }, 'spread: вміст той самий'],
  [() => makeCopies({ a: 1, n: { x: 1 } }).assign, { a: 1, n: { x: 1 } }, 'assign: вміст той самий'],
  [() => makeCopies({ a: 1, n: { x: 1 } }).deep, { a: 1, n: { x: 1 } }, 'deep: вміст той самий'],
  [() => { const o = { n: {} }; const c = makeCopies(o).spread; return [c !== o, c.n === o.n]; }, [true, true], 'spread: новий об\'єкт, але n СПІЛЬНИЙ'],
  [() => { const o = { n: {} }; const c = makeCopies(o).assign; return [c !== o, c.n === o.n]; }, [true, true], 'assign: новий об\'єкт, але n СПІЛЬНИЙ'],
  [() => { const o = { n: {} }; const c = makeCopies(o).deep; return [c !== o, c.n === o.n]; }, [true, false], 'deep: новий об\'єкт і НОВИЙ n'],
]);

run("08 — Копіювання об'єктів");

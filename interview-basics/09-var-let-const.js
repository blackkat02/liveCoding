// ═══════════════════════════════════════════════════════════
// 📦 09 — var, let, const
// ❓ Чим відрізняються змінні, оголошені через var, let і const?
// ❓ ➕ Що таке hoisting і Temporal Dead Zone?
// Запуск: node 09-var-let-const.js
// ═══════════════════════════════════════════════════════════
const { test, predict, run, todo } = require('./_lib/tester');

// ┌───────────────────────────── 📖 ТЕОРІЯ ─────────────────────────────
// │                         var                 let             const
// │   видимість             ФУНКЦІЯ             БЛОК { }        БЛОК { }
// │   до оголошення         undefined           ReferenceError  ReferenceError
// │   оголосити ще раз      можна               SyntaxError     SyntaxError
// │   перепризначити        можна               можна           TypeError
// │
// │ ── Область видимості ──
// │   if (true) { var v = 1; let l = 2; }
// │   v  → 1               — var «протікає» з блоку назовні
// │   l  → ReferenceError  — let живе тільки всередині { }
// │
// │ ── Hoisting (підняття) ──
// │ До виконання коду JS «реєструє» всі оголошення своєї області видимості.
// │   console.log(a);  var a = 1;   → undefined  (var піднятий і одразу = undefined)
// │   console.log(b);  let b = 1;   → ReferenceError
// │   hello();  function hello() {} → працює (function declaration піднімається з тілом)
// │
// │ TDZ (Temporal Dead Zone) — ділянка від початку блоку до рядка з let/const.
// │ Змінна вже «існує», але звернення до неї кидає ReferenceError.
// │
// │ ── const ≠ незмінність! ──
// │ const забороняє ПЕРЕПРИЗНАЧИТИ змінну, але не змінювати об'єкт:
// │   const o = { a: 1 };
// │   o.a = 2;   ✅ можна — змінюємо вміст
// │   o = {};    ❌ TypeError — перепризначення
// │ Заборонити зміну вмісту: Object.freeze(o) (і то лише перший рівень).
// │
// │ ── Класика співбесід: цикл + функції ──
// │   for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));  → 3 3 3
// │   for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));  → 0 1 2
// │ var — ОДНА змінна на весь цикл; всі функції бачать її фінальне значення.
// │ let — НОВА змінна на кожну ітерацію.
// │
// │ Правило: const за замовчуванням, let — якщо треба перепризначати, var — ніколи.
// │
// │ 🗣 На співбесіді: «var видимий у всій функції, піднімається з undefined і
// │    дозволяє повторне оголошення. let і const — блокові, мають TDZ. const
// │    забороняє перепризначення, але не мутацію. У циклі з setTimeout var дає
// │    3 3 3, а let дає 0 1 2».
// └──────────────────────────────────────────────────────────────────────

// 1. ПЕРЕДБАЧ (не запускай!) — що поверне кожна функція? Масив з 7 відповідей.
//   Якщо функція повертає назву помилки — відповідь рядком: 'TypeError' тощо.
//   [0] scopeA() [1] scopeB() [2] scopeC() [3] scopeD() [4] scopeE() [5] scopeF() [6] scopeG()
function scopeA() { return x; var x = 1; }
function scopeB() { try { return y; let y = 1; } catch (e) { return e.name; } }
function scopeC() { const fns = []; for (var i = 0; i < 3; i++) fns.push(() => i); return fns.map((f) => f()); }
function scopeD() { const fns = []; for (let i = 0; i < 3; i++) fns.push(() => i); return fns.map((f) => f()); }
function scopeE() { const o = { a: 1 }; o.a = 2; return o.a; }
function scopeF() { try { const n = 1; n = 2; return n; } catch (e) { return e.name; } }
function scopeG() { if (true) { var v = 'var'; let l = 'let'; } return [typeof v, typeof l]; }
function predictScope() {
  return todo();
}

// 2. makeGetters(n) — масив з n функцій, i-та функція повертає i
//   makeGetters(3).map((f) => f()) → [0, 1, 2]
// Умова: ЗВИЧАЙНИЙ цикл for + push (без map/Array.from). Подумай, var чи let — і чому.
function makeGetters(n) {
  return todo();
}

// ─────────────── ТЕСТИ (не чіпай) ───────────────
predict('predictScope', predictScope, [
  () => scopeA(), () => scopeB(), () => scopeC(), () => scopeD(),
  () => scopeE(), () => scopeF(), () => scopeG(),
]);
test('makeGetters', [
  [() => makeGetters(3).map((f) => f()), [0, 1, 2]],
  [() => makeGetters(0), []],
]);

run('09 — var, let, const');

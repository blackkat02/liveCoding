// Міні-тестер. Чіпати не треба — просто запускай файли блоків: node 01-types.js
// Запуск однієї задачі: node 01-types.js 3

const { isDeepStrictEqual, inspect } = require('node:util');

class TodoError extends Error {}

/** Заглушка: видали `return todo();` і напиши своє рішення */
function todo() {
  throw new TodoError('TODO');
}

const tasks = [];

// Проміси, створені в тестах до виклику незробленої задачі, можуть впасти без обробника — ігноруємо їх.
process.on('unhandledRejection', () => {});

/**
 * @param {string} name - назва задачі
 * @param {Array<[Function, any, string?]>} cases - [() => виклик, очікуваний результат, підпис?]
 */
function test(name, cases) {
  tasks.push({ name, cases });
}

const show = (v) => inspect(v, { depth: 6, breakLength: Infinity });

function labelOf(thunk, label) {
  if (label) return label;
  return thunk.toString().replace(/^\(\)\s*=>\s*/, '').replace(/\s+/g, ' ');
}

async function runCase([thunk, expected, label]) {
  try {
    let actual = thunk();
    if (actual && typeof actual.then === 'function') actual = await actual;
    if (isDeepStrictEqual(actual, expected)) return { status: 'pass' };
    return { status: 'fail', label: labelOf(thunk, label), expected, actual };
  } catch (err) {
    if (err instanceof TodoError) return { status: 'todo' };
    return { status: 'error', label: labelOf(thunk, label), err };
  }
}

async function run(title) {
  const only = Number(process.argv[2]) || null;
  const summaryOnly = process.env.SUMMARY_ONLY === '1';
  let passed = 0;
  let todos = 0;
  const lines = [];

  for (let i = 0; i < tasks.length; i++) {
    const num = i + 1;
    if (only && only !== num) continue;
    const { name, cases } = tasks[i];
    const results = [];
    for (const c of cases) results.push(await runCase(c));

    const head = `${String(num).padStart(2, ' ')}. ${name}`;
    if (results.some((r) => r.status === 'todo')) {
      todos++;
      lines.push(`⏳ ${head}  — ще не зроблено`);
    } else if (results.every((r) => r.status === 'pass')) {
      passed++;
      lines.push(`✅ ${head}`);
    } else {
      lines.push(`❌ ${head}`);
      for (const r of results) {
        if (r.status === 'fail') {
          lines.push(`     ▸ ${r.label}`);
          lines.push(`         очікувалось: ${show(r.expected)}`);
          lines.push(`         отримано:    ${show(r.actual)}`);
        } else if (r.status === 'error') {
          lines.push(`     ▸ ${r.label}`);
          lines.push(`         💥 ${r.err && r.err.stack ? r.err.stack.split('\n').slice(0, 2).join(' | ') : r.err}`);
        }
      }
    }
  }

  const total = only ? 1 : tasks.length;
  const bar = '█'.repeat(passed) + '░'.repeat(Math.max(total - passed, 0));
  const summary = `${title.padEnd(31)} ${bar} ${passed}/${total}`;

  if (summaryOnly) {
    console.log(summary);
    return;
  }
  console.log(`\n📦 ${title}\n`);
  console.log(lines.join('\n'));
  console.log(`\n${summary}${todos ? `   (⏳ не почато: ${todos})` : ''}\n`);
}

/**
 * Задача «передбач»: кожен вираз перевіряється ОКРЕМО, тож видно, де саме помилка.
 * @param {string} name - назва задачі
 * @param {Function} fn - функція учня, що повертає масив відповідей
 * @param {Function[]} exprs - справжні вирази; їх обчислює тест
 */
function predict(name, fn, exprs) {
  test(
    name,
    exprs.map((expr, i) => [() => fn()[i], expr(), `[${i}] ${labelOf(expr)}`]),
  );
}

module.exports = { test, predict, run, todo };

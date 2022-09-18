const Element = (tag) => document.createElement(tag),
  pr = console.log;

const span = (txt) => {
  const el = Element('span');
  el.append(txt);
  return el;
};

// obj -> DOM Element
export function toHtml(obj) {
  if (typeof obj === 'number' || typeof obj === 'string') return span(obj);
  if (Array.isArray(obj)) return fromArray(obj);
  return fromObject(obj);
}

function fromArray(obj) {
  const el = Element('div');
  el.classList.add('array');
  const els = obj.map((x) => {
    const div = Element('div'),
      el = toHtml(x);
    div.append(el, ', ');
    return div;
  });
  el.append(...els);
  return el;
}

function fromObject(obj) {
  const el = Element('div'),
    ul = Element('ul');
  el.append(ul);
  el.classList.add('obj');

  const lis = Object.entries(obj).map(([k, v]) => {
    const li = Element('li'),
      kdiv = Element('div'),
      vdiv = Element('div'),
      colon = span(':');
    colon.classList.add('colon');

    kdiv.append(toHtml(k), colon);
    vdiv.append(toHtml(v));
    li.append(kdiv, vdiv);
    ul.append(li);
    return li;
  });
  ul.append(...lis);
  return el;
}

// str -> obj
export const count = (input) => {
  const res = {};
  for (const k of input.split('')) {
    if (res[k]) {
      res[k]++;
    } else {
      res[k] = 1;
    }
  }
  return res;
};

// main ====================
export function main() {
  const root = document.querySelector('#result'),
    input = document.querySelector('#input');
  input.addEventListener('keyup', (e) => {
    const el = toHtml(count(input.value));
    pr(el);
    root.replaceChildren(el);
  });
}
// main end ====================

// tests ====================
export function runInTest() {
  const d1 = document.querySelector('#_1'),
    o1 = 100,
    el1 = toHtml(o1);
  d1.replaceChildren(el1);

  const d2 = document.querySelector('#_2'),
    o3 = { c: [10, 20, 30, 40], d: 'some text ...' },
    o2 = { a: 1, b: 'foo', ar: [1, 2, 3], o3: o3 },
    el2 = toHtml(o2);
  d2.replaceChildren(el2);
}

// runInTest();
// tests end ====================

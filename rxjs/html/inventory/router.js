// Utilitis
const pr = console.table;
const Element = (tag) => document.createElement(tag);

// [Link] -> Element('div header')
export function Header(...links) {
  const h = Element('div');
  h.append(...links);
  return h;
}
// str -> Element('a')
export function Link(path) {
  const l = Element('a');
  l.href = path;
  l.onclick = (e) => {
    e.preventDefault();
    pr('in link', path);
  };
  return l;
}

// {tools, ...[onChangeFn]} -> Element('ul')
export function Suggestions({ tools, dragstart }) {
  pr('Suggestions tools:', tools);
  // TODO: change for iterator
  const lst = [...tools].map(({ num }) => {
    const li = Element('li'),
      a = Element('a');
    // c = Element('span'),
    // s = Element('span'),
    // del = Element('button'),
    // ed = Element('button'),
    // sbtn = Element('span');
    a.append(`tool-${num}`);
    a.href = `tool-${num}`;
    a.draggable = true;
    a.id = num;
    a.addEventListener('dragstart', dragstart);
    li.append(a);
    // c.append(city);
    // s.append(st);
    // del.append('Del');
    // del.addEventListener('click', () => {
    //   onDel(city, st);
    // });
    // ed.append('Edit');
    // ed.addEventListener('click', () => {
    //   onEdit(city, st);
    // });
    // sbtn.append(ed, del);
    // li.append(c, s, sbtn);
    return li;
  });
  const ul = Element('ul');
  ul.append(...lst);
  return ul;
}
// ==========

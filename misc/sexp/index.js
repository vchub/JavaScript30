// utility
const Element = (tag) => document.createElement(tag),
  pr = console.log;
// ====================

// types

// Atom = {Symb, Num, Str}
// Sexp = Atom || List[Sexp]

class Sexp {
  constructor(type, val) {
    // type = Symb, Num, Str, List
    this.type = type;
    this.val = val;
  }
}

// Sexp types
const Symb = 'Symb',
  Num = 'Num',
  Str = 'Str',
  List = 'List';

// ====================

// generator[str] -> [token]
export function* tokenizer(s) {
  let i = 0,
    token = '';

  while (i < s.length) {
    for (; i < s.length && s[i].match(/\s/); i++) {}
    if (i >= s.length) return;

    const j = i;
    if (s[i] === '(' || s[i] === ')') {
      i++;
      yield s.slice(j, i);
    } else if (s[i] === '"') {
      i = nextStrToken(s, i);
      yield s.slice(j, i);
    } else {
      i = nextLiteralToken(s, i);
      yield s.slice(j, i);
    }
  }
}

// nextToken: str, int -> int
function nextStrToken(s, i) {
  const j = i;
  i++;
  for (; i < s.length; i++) {
    if (s[i] === '"') return i + 1;
  }
  return i;
}

// nextToken: str, int -> int
function nextLiteralToken(s, i) {
  const j = i;
  i++;
  for (; i < s.length && /\S/.test(s[i]) && /[^()"]/.test(s[i]); i++) {}
  return i;
}

// str -> [token]
export function tokenize(s) {
  const res = [];
  for (const token of tokenizer(s)) {
    res.push(token);
  }
  return res;
}

// nextToken: str, int -> [str, int]
// function nextToken(s, i) {
//   if (i >= s.length) return ['', i];
//   // skip 'spaces'
//   for (; i < s.length && s[i].match(/\s/); i++) {}

//   const j = i;

//   if (s[i] === '(' || s[i] === ')') return [s.slice(i, i + 1), i + 1];

//   if (s[i] === '"') return nextStrToken(s, i);

//   // reach literal terminator
//   for (; i < s.length && /\S/.test(s[i]) && /[^()"]/.test(s[i]); i++) {}

//   return [s.slice(j, i), i];
// }

// parse: str -> Sexp
function parse(s) {
  const g = tokenizer(s);
  // generator -> Sexp
  function loop(acc) {
    let { value, done } = g.next();
    for (; !done; { value, done } = g.next()) {
      pr('value', value, 'done', done);

      if (value === '(') acc.push(new Sexp(List, loop([])));
      else if (value === ')') return acc;
      else if (str(value)) acc.push(new Sexp(Str, value));
      else if (num(value)) acc.push(new Sexp(Num, Number(value)));
      else acc.push(new Sexp(Symb, value));
    }

    return acc;
  }
  const str = (value) => value.startsWith('"');
  const num = (value) => Number(value);

  return loop([]);
}

// ====================

export { Sexp, Symb, Num, Str, List, parse };

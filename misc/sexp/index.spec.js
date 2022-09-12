const assert = chai.assert;
import {
  Sexp,
  Symb,
  Num,
  Str,
  List,
  tokenizer,
  tokenize,
  parse,
} from './index.js';

const pr = console.log;

describe('tokenizing', () => {
  it('Symbol eq', () => {
    assert.equal(Symb, Symb);
    assert.notEqual(Symb, Str);
  });
  it('Sexp eq', () => {
    assert.deepEqual(new Sexp(Symb, 'x'), new Sexp(Symb, 'x'));
    assert.notDeepEqual(new Sexp(Str, 'x'), new Sexp(Symb, 'x'));
  });

  it('Regex', () => {
    assert.ok(/["()]/.test('('));
    assert.ok(/["()]/.test(')'));
    assert.ok(/["()]/.test('"'));
    assert.ok(/[^"()]/.test('x'));
  });

  it('tokenize', () => {
    assert.deepEqual([], tokenize(''));
    assert.deepEqual(['(', 'x', ')'], tokenize('(x)'));
    assert.deepEqual(['(', ')'], tokenize('()'));
    assert.deepEqual(['x'], tokenize('x'));
    assert.deepEqual(['xyz'], tokenize(' 			xyz  '));
    assert.deepEqual(['xyz', 'z'], tokenize(' 			xyz  z'));
    assert.deepEqual(['xyz', '(', 'xx', ')', '('], tokenize('xyz (xx)('));

    assert.deepEqual(['"xyz"'], tokenize(' "xyz"  '));
    assert.deepEqual(['"x yz"'], tokenize(' "x yz"  '));
    assert.deepEqual(['"x (yz)"'], tokenize(' "x (yz)"  '));
    assert.deepEqual(['a', '"x (yz)"'], tokenize(' a "x (yz)"  '));
  });

  it('parse', () => {
    assert.deepEqual([new Sexp(Symb, 'x')], parse(' x'));

    let s = 'x 3.14 "foo 10" z',
      exp = [
        new Sexp(Symb, 'x'),
        new Sexp(Num, 3.14),
        new Sexp(Str, '"foo 10"'),
        new Sexp(Symb, 'z'),
      ],
      res = parse(s);
    // pr(exp);
    // pr(res);
    assert.deepEqual(exp, res);

    s = '(x 3.14) "foo 10" z';
    (exp = [
      new Sexp(List, [new Sexp(Symb, 'x'), new Sexp(Num, 3.14)]),
      new Sexp(Str, '"foo 10"'),
      new Sexp(Symb, 'z'),
    ]),
      (res = parse(s));
    pr(exp);
    pr(res);
  });
});

const c = `ab
 cd
 			fg
			`;

// const t = tokenizer('x "yz"');
// pr(t.next());
// pr(t.next());
// pr(t.next());

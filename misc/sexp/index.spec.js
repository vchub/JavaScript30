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

  xit('nextToken basics', () => {
    assert.deepEqual([new Sexp(Symb, 'x'), ''], nextToken(' x'));
    assert.deepEqual([new Sexp(Str, 'x'), ' yz'], nextToken(' "x" yz'));
    assert.deepEqual([new Sexp(Str, 'x yz'), ' 24'], nextToken(' "x yz" 24'));
  });
});

const c = `ab
 cd
 			fg
			`;

pr(c.split(' '));
pr(c.split(/\s/));
pr(c.indexOf(/\S/));
pr(c.indexOf(/c/));
pr(c.indexOf('c'));
pr(c);
pr('\t x '.match(/\S/));

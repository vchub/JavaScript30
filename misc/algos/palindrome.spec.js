// Given a string, find the palindrome that can be made by inserting the fewest
// number of characters as possible anywhere in the word. If there is more than
// one palindrome of minimum length that can be made, return the lexicographically
// earliest one (the first one alphabetically).

// 	For example, given the string "race", you should return "ecarace", since we
// can add three letters to it (which is the smallest amount to make a
// 	palindrome). There are seven other palindromes that can be made from "race"
// by adding three letters, but "ecarace" comes first alphabetically.

// As another example, given the string "google", you should return "elgoogle".

const assert = chai.assert,
  pr = console.log;

describe('palindrome', () => {
  it('isPal', () => {
    assert.ok(isPal('a'));
    assert.notOk(isPal('ab'));
    assert.notOk(isPal('abc'));

    assert.ok(isPal('aa'));
    assert.ok(isPal('aba'));
    assert.ok(isPal('abba'));
    assert.ok(isPal('abcba'));
  });

  it('children', () => {
    const set = (xs) => new Set(xs);
    assert.deepEqual(set(['aba', 'bab']), set(['aba', 'bab']));
    assert.deepEqual(set(['aba', 'bab']), set(children('ab')));
    assert.deepEqual(set(['cabc', 'abca']), set(children('abc')));
    assert.deepEqual(
      set(['acbcd', 'dabcd', 'abcda', 'abcbd']),
      set(children('abcd')),
    );
    // pr('abca', children('abca'));
  });

  it('isBetter', () => {
    assert.ok('abc' > 'aabc');
    assert.ok(isBetter(null, 'a'));
    assert.ok(isBetter('aa', 'a'));
    assert.ok(isBetter('ab', 'aa'));
    assert.notOk(isBetter('ab', 'aab'));
    assert.notOk(isBetter('ab', 'ad'));
  });

  it('makePalindrome', () => {
    assert.equal('a', makePalindrome('a'));
    assert.equal('aa', makePalindrome('aa'));
    assert.equal('aba', makePalindrome('ab'));
    assert.notEqual('bab', makePalindrome('ab'));
    assert.equal('abcba', makePalindrome('abc'));
    assert.equal('ecarace', makePalindrome('race'));
    assert.equal('elgoogle', makePalindrome('google'));
  });
});

// str -> str
// bfs
function makePalindrome(s) {
  const q = [s],
    visited = new Set([s]);
  let res = null;

  while (q.length > 0) {
    const node = q.shift();
    if (isPal(node) && isBetter(res, node)) {
      res = node;
      // pr('res', res);
      continue;
    }
    for (const ch of children(node)) {
      if (!visited.has(ch) && isBetter(res, ch)) {
        q.push(ch);
        visited.add(ch);
      }
    }
  }
  return res;
}

// str, str -> bool
function isBetter(a, b) {
  if (a == null) return true;
  return a && a.length >= b.length && a > b;
}

// str -> bool
function isPal(s) {
  const m = Math.floor(s.length / 2);
  if (m == 0) return true;
  for (let i = 0; i < m; i++) {
    if (s[i] !== s[s.length - i - 1]) return false;
  }
  return true;
}

// str -> [str]
function children(s) {
  const n = s.length,
    m = Math.floor(n / 2),
    res = [];
  assert(m > 0);
  // pr('s', s, 'n', n, 'm', m);
  for (let i = 0; i < m; i++) {
    const s1 = s.slice(0, n - i) + s[i] + s.slice(n - i),
      s2 = s.slice(0, i) + s[n - i - 1] + s.slice(i);
    // pr(s1, s2);
    res.push(s1, s2);
  }
  return res;
}

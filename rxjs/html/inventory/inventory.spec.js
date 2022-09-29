const pr = console.log;
let { from, of, range, filter, map, Observable, Subscribe } = rxjs;
const assert = chai.assert;

describe('misc', () => {
  it('hi', () => {
    pr('hi');
  });
});

let pic = document.querySelector('#pic');
pr(pic);
pr(window);
// window.dropH = (e) => pr('dropH', e);
// window.dragoverH = (e) => {};
// pic.ondrop = (e) => pr(e);
// pic.ondragover = (e) => {};
// pic.setAttribute('ondrop', dropH);
// pic.setAttribute('ondragover', dragoverH);

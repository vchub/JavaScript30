const pr = console.log;

const onRightA = (data) =>
  new Promise((resolve, reject) => {
    if (data.a == 1) setTimeout(() => resolve(data), 100);
    else reject(`expect data.a == 1 but data.a == ${data.a}`);
  });

onRightA({ a: 1 }).then((dat) => pr('ok', dat)), (s) => pr('NOT OK', s);

class Observable {
  constructor(obj) {
    this.obj = obj;
    this.cbs = [];
  }

  update(fn) {
    const res = fn(this.obj);
    for (const cb of this.cbs) {
      cb(this.obj);
    }
    return res;
  }

  observe(cb) {
    this.cbs.push(cb);
  }

  unobserve(cb) {
    this.cbs = this.cbs.filter((x) => x != cb);
  }
}

function Cnt(cnt) {
  function f(x) {
    cnt++;
    return x + cnt;
  }
  f.cnt = () => cnt;
  return f;
}

class EventRegistry {
  constructor() {
    this.map = new Map();
  }

  fireEvent(event) {
    for (const cb of this.map.get(event.name) || []) {
      cb(event);
    }
  }

  listen(eventName, cb) {
    const cbs = this.map.get(eventName) || [];
    cbs.push(cb);
    this.map.set(eventName, cbs);
  }
  unListen(eventName, cb) {
    const cbs = this.map.get(eventName) || [];
    this.map.set(
      eventName,
      cbs.filter((x) => x != cb),
    );
  }
}

// let r = fetch('../data/cities.json');
// pr(r);

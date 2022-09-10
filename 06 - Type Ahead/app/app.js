// Utilities Start ====================
const pr = console.log;

const Element = (tag) => document.createElement(tag);
// Utilities End ====================

// App Start ====================
//
export class EventRegistry {
  constructor() {
    this.map = new Map();
  }

  fire(event) {
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

export class Place {
  constructor(city, st) {
    this.city = city;
    this.st = st;
  }
}

export class App extends EventRegistry {
  constructor(db) {
    super();
    this.db = db;
    // this._places = [];
    this.setupDispatch();
  }

  setupDispatch() {
    this.db.onmessage = (e) => {
      const { op } = e.data;
      // pr('App.onmessage', e);
      pr(op, 'data:', e.data);
      switch (op) {
        case 'addDone':
          this.fire({ name: 'PlacesChange', data: e.data });
          break;
        case 'getDone':
          this.fire({ name: 'PlacesChange', data: e.data });
          break;
        default:
          pr('App.onmessage.default');
      }
    };
  }

  // str ->
  filterChange(pattern) {
    this.db.postMessage({ op: 'get', path: 'place', pattern: pattern });
    this.fire({ name: 'filterChange', filter: pattern });
    // const r = new RegExp(pattern, 'gi'),
    //   res = [];
    // this._places.forEach((v, k) => {
    //   if (k.match(r)) res.push(v);
    // });
    // return res;
  }

  // str ->
  addCity(str) {
    const [city, st] = str
      .toLowerCase()
      .split(',')
      .map((x) => x.trim());
    this.db.postMessage({ op: 'add', path: 'place', obj: new Place(city, st) });

    // const key = this.key(city, st),
    //   place = { city: city, st: st };
    // if (this._places.has(key)) return { place: null, err: 'key exists' };
    // this._places.set(key, place);
    // this.eReg.fireEvent({ name: 'PlacesChange', city: city, st: st });
    // return { place: place, err: '' };
  }

  // str, str -> err: str
  delCity(city, st) {
    pr(city, st);
    this._places.delete(this.key(city, st));
    this.eReg.fireEvent({
      name: 'PlacesChange',
      city: city,
      st: st,
      details: 'delete',
    });
  }

  // str, str -> err: str
  editCity(city, st) {
    pr(city, st);
  }
}

export const app = new App(new Worker('store-worker.js'));
// App End ====================

// store-worker Start ====================
// const store = new Worker('store-worker.js');

// window.onload = (e) => {
//   pr('onload', e);
//   store.postMessage({ op: 'get', path: 'place', pattern: '' });
// };

// store-worker End ====================

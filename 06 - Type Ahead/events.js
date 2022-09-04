// Utilitis
const pr = console.table;
const Element = (tag) => document.createElement(tag);

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

const App = {
  eReg: new EventRegistry(),
  _places: new Map(),

  init() {
    // init places
    const _cs = ['Madera,ca', 'Fresno, CA', 'boulder, co', 'austin,tx'];
    for (const s of _cs) {
      this.addCity(s);
    }
  },

  // str -> [place]
  places(pattern) {
    const r = new RegExp(pattern, 'gi'),
      res = [];
    this._places.forEach((v, k) => {
      if (k.match(r)) res.push(v);
    });
    return res;
  },

  // str, str -> str
  key(city, st) {
    return `${city},${st}`;
  },

  // str -> {place: obj, err: str}
  addCity(str) {
    const [city, st] = str
      .toLowerCase()
      .split(',')
      .map((x) => x.trim());
    const key = this.key(city, st),
      place = { city: city, st: st };
    if (this._places.has(key)) return { place: null, err: 'key exists' };
    this._places.set(key, place);
    this.eReg.fireEvent({ name: 'PlacesChange', city: city, st: st });
    return { place: place, err: '' };
  },

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
  },

  // str, str -> err: str
  editCity(city, st) {
    pr(city, st);
  },
};

App.init();
// ==========

// Componets
//
// [places], rootElment -> [Element('li')]
function placesList({ places, onDel, onEdit }) {
  const lst = places.map(({ city, st }) => {
    const li = Element('li'),
      c = Element('span'),
      s = Element('span'),
      del = Element('button'),
      ed = Element('button'),
      sbtn = Element('span');
    c.append(city);
    s.append(st);
    del.append('Del');
    del.addEventListener('click', () => {
      onDel(city, st);
    });
    ed.append('Edit');
    ed.addEventListener('click', () => {
      onEdit(city, st);
    });
    sbtn.append(ed, del);
    li.append(c, s, sbtn);
    return li;
  });
  return lst;
}
// ==========

const suggestions = document.querySelector('.suggestions');
// str, Element ->
function showSuggestions(pattern, rootEl) {
  const ps = App.places(pattern),
    lis = placesList({
      places: ps,
      onDel: (city, st) => App.delCity(city, st),
      onEdit: (city, st) => App.editCity(city, st),
    });
  rootEl.replaceChildren(...lis);
}

App.eReg.listen('SearchChange', ({ pattern }) =>
  showSuggestions(pattern, suggestions),
);

App.eReg.listen('PlacesChange', () => {
  const pattern = search.value;
  showSuggestions(pattern, suggestions);
});

showSuggestions('', suggestions);
// ==========

const search = document.querySelector('.search');
search.addEventListener('keyup', (e) => {
  const event = { name: 'SearchChange', pattern: e.target.value };
  App.eReg.fireEvent(event);
});
// ==========

const add = document.querySelector('.add');
add.addEventListener('change', (e) => {
  const { place, err } = App.addCity(e.target.value);
  if (err) {
    pr('Error', err);
    return;
  }
  const event = { name: 'PlacesChange', place: place };
  App.eReg.fireEvent(event);
  e.target.value = '';
});

// END Componets ===============

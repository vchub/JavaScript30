import { Suggestions } from './components.js';
// Utilities Start ====================
const pr = console.log;
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

export const App = new EventRegistry();
App.filter = '';

App.setupDispatch = () => {
  pr('App.setupDispatch App:', App);
  App.db.onmessage = (e) => {
    const { op, error } = e.data;
    pr(op, 'data:', e.data);
    switch (op) {
      case 'addDone':
        if (!error) {
          App.getPlaces(App.filter);
          App.fire({ name: 'addCity success', data: e.data });
        } else {
          App.fire({ name: 'addCity error', error: e.data.error.message });
        }
        break;
      case 'delDone':
        if (!error) {
          App.getPlaces(App.filter);
        } else {
          App.fire({ name: 'delCity error', error: e.data.error.message });
        }
        break;
      case 'getDone':
        App.fire({ name: 'placesChange', data: e.data });
        break;
      default:
        pr('App.onmessage.default');
    }
  };
};

App.getPlaces = (pattern) => {
  const msg = { op: 'get', path: 'place', pattern: pattern };
  pr('App.getPlaces msg:', msg);
  App.db.postMessage(msg);
};

App.filterChange = (pattern) => {
  App.filter = pattern;
  App.getPlaces(pattern);
  pr('App.filterChange pattern:', pattern);
  App.fire({ name: 'filterChange', filter: pattern });
};

App.addCity = (str) => {
  const [city, st] = str
    .toLowerCase()
    .split(',')
    .map((x) => x.trim());
  if (city && st) {
    App.db.postMessage({ op: 'add', path: 'place', obj: new Place(city, st) });
  }
};

App.delCity = (city, st) => {
  App.db.postMessage({ op: 'del', path: 'place', obj: new Place(city, st) });
};

App.init = () => {
  App.db = new Worker('store-worker.js');
  App.setupDispatch();

  const suggestionsDiv = document.querySelector('.suggestions');
  App.listen('placesChange', ({ data }) => {
    const places = data.data;
    pr('suggestionsDiv, placesChange, data:', data, places);
    const component = Suggestions({
      places: places,
      onDel: (city, st) => App.delCity(city, st),
      onEdit: (city, st) => App.editCity(city, st),
    });
    render(suggestionsDiv, component);
  });

  // filters
  // TODO: throttle keyup events for 200ms //
  document.querySelectorAll('.filter').forEach((el) => {
    el.addEventListener('keyup', (e) => App.filterChange(e.target.value));
    App.listen('filterChange', ({ filter }) => {
      if (el.value !== filter) el.value = filter;
    });
  });

  // add city
  const addInp = document.querySelector('.add');
  addInp.addEventListener('change', (e) => App.addCity(e.target.value));
  App.listen('addCity success', () => {
    addInp.value = '';
  });
  App.listen('addCity error', (e) => {
    addInp.value = e.error;
  });

  //   const { place, err } = App.addCity(e.target.value);
  //   if (err) {
  //     pr('Error', err);
  //     return;
  //   }
  //   const event = { name: 'PlacesChange', place: place };
  //   App.eReg.fireEvent(event);
  //   e.target.value = '';
  // });
};

// Element, Element -> DOM Effect
function render(root, component) {
  root.replaceChildren(component);
}

// App End ====================

// App Run ====================
App.init();

// e//   // str, str -> err: str
//   delCity(city, st) {
//     pr(city, st);
//     this._places.delete(this.key(city, st));
//     this.eReg.fireEvent({
//       name: 'placesChange',
//       city: city,
//       st: st,
//       details: 'delete',
//     });
//   }

//   // str, str -> err: str
//   editCity(city, st) {
//     pr(city, st);
//   }
// }

// export const app = new App(new Worker('store-worker.js'));
// App End ====================

// store-worker Start ====================
// const store = new Worker('store-worker.js');

// window.onload = (e) => {
//   pr('onload', e);
//   store.postMessage({ op: 'get', path: 'place', pattern: '' });
// };

// store-worker End ====================

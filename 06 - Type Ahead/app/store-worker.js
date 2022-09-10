// import { Place } from './app.js';
const pr = console.log;
let db;

const connection = indexedDB.open('cities', 1);

connection.onerror = (e) => pr('why not allow to use indexedDB?');

connection.onupgradeneeded = (e) => {
  pr('in connection.onupgradeneeded');
  db = e.target.result;
  db.onerror = (e) => console.error('Error loading db');

  // create objectStore
  const objectStore = db.createObjectStore('place', { keyPath: 'key' });
  // define data items
  // objectStore.createIndex('zip', 'zip', {unique: false})

  //populate with initial data
  objectStore.transaction.oncomplete = (e) => {
    pr('onupgradeneeded oncomplete, e', e);
    add(db, {
      op: 'add',
      path: 'place',
      obj: { city: 'example city', st: 'ny' },
    });
  };
};

connection.onsuccess = (e) => {
  pr('in connection.onsuccess');
  db = e.target.result;
  // setupDispatch(db);
  // get all places
  get(db, {
    op: 'get',
    path: 'place',
    pattern: '',
  });
};

// setupDispatch
onmessage = (event) => {
  const { op } = event.data;
  switch (op) {
    case 'get':
      get(db, event.data);
      break;

    case 'add':
      add(db, event.data);
      break;
    default:
      pr('worker.setupDispatch.default', event.data);
  }
};

function key({ city, st }) {
  return `${city},${st}`;
}

function add(db, data) {
  const { path, obj } = data;
  if (path === 'place') {
    obj.key = key(obj);
  }

  const transaction = db.transaction([path], 'readwrite');
  const objectStore = transaction.objectStore(path);
  const req = objectStore.add(obj);

  req.onsuccess = (e) => {
    const res = { data: e.target.result, op: 'addDone', error: '' };
    pr('addDone', res);
    postMessage(res);
  };
}

function get(db, data) {
  const { path, pattern } = data;
  const r = new RegExp(pattern, 'gi'),
    trans = db.transaction([path]),
    items = [];

  objectStore = trans.objectStore(path);

  objectStore.openCursor().onsuccess = (e) => {
    const cursor = e.target.result;
    if (!cursor) {
      pr('lookup is done');
      const res = { op: 'getDone', data: items, pattern: pattern, error: '' };
      postMessage(res);
      return;
    }
    const item = cursor.value;
    if (item.key.match(r)) items.push(item);
    cursor.continue();
  };
}

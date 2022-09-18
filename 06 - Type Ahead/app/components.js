// Utilitis
const pr = console.table;
const Element = (tag) => document.createElement(tag);

// {places, ...[onChangeFn]} -> Element('ul')
export function Suggestions({ places, onDel, onEdit }) {
  pr('Suggestions places:', places);
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
  const ul = Element('ul');
  ul.append(...lst);
  return ul;
}
// ==========

// const suggestions = document.querySelector('.suggestions');
// // str, Element ->
// function showSuggestions(pattern, rootEl) {
//   const ps = App.places(pattern),
//     lis = placesList({
//       places: ps,
//       onDel: (city, st) => App.delCity(city, st),
//       onEdit: (city, st) => App.editCity(city, st),
//     });
//   rootEl.replaceChildren(...lis);
// }

// App.eReg.listen('SearchChange', ({ pattern }) =>
//   showSuggestions(pattern, suggestions),
// );

// App.eReg.listen('PlacesChange', () => {
//   const pattern = search.value;
//   showSuggestions(pattern, suggestions);
// });

// showSuggestions('', suggestions);
// ==========

// const search = document.querySelector('.search');
// search.addEventListener('keyup', (e) => {
//   const event = { name: 'SearchChange', pattern: e.target.value };
//   App.eReg.fireEvent(event);
// });
// // ==========

// const add = document.querySelector('.add');
// add.addEventListener('change', (e) => {
//   const { place, err } = App.addCity(e.target.value);
//   if (err) {
//     pr('Error', err);
//     return;
//   }
//   const event = { name: 'PlacesChange', place: place };
//   App.eReg.fireEvent(event);
//   e.target.value = '';
// });

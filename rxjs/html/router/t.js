// Utilitis
const pr = console.log;
prRet = (text, val) => {
  pr(text, val);
  return val;
};
const Element = (tag, props) => {
  const e = document.createElement(tag);
  Object.assign(e, props);
  return e;
};

// app state
//====================
const get_State = () => {
  if (!globalThis._GState) globalThis._GState = {};
  return globalThis._GState;
};
const get_Router = () => get_State().router;
const set_Router = (router) => (get_State().router = router);

// components
//====================

// str, str -> DOM <a>
function Link(path, text) {
  const a = Element('a', {
    href: path,
    textContent: text,
    onclick: (e) => {
      e.preventDefault();
      // pr('in a, e', e);
      // pr('path', path);
      get_Router().go(path);
    },
  });
  // a.textContent = text;
  return a;
}

class Router {
  // routes: [{path, params, el()}], Router, DOM node
  constructor({ routes, parent = get_Router(), root }) {
    this.routes = Router.makeRoutes(routes);
    this.parent = parent;
    this.root = root;
  }

  // routes: [{path, params, el()}] -> Map[path-> {params: params, el: Element()}]
  static makeRoutes(routes) {
    return routes.reduce(
      (acc, { path, params, el }) => acc.set(path, { params, el }),
      new Map(),
    );
  }

  static getPathParams(path0) {
    let [path, params] = path0.split('?');
    if (!params) return { path: path };
    params = params
      .split('&')
      .map((x) => x.split('='))
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});
    pr('param after', params);
    return { path: path, params: params };
  }

  // str -> * DOM change
  go(path) {
    // set as globalThis router
    set_Router(this);
    // TODO: check path for / and .. //
    if (path.startsWith('/')) return this.parent.go(path);
    if (path.startsWith('../')) return this.parent.go(path.slice(3));
    this.go_local(path);
  }

  // str -> * DOM change
  go_local(path0) {
    const { path, params } = Router.getPathParams(path0),
      { root, params0, el } = this.routes.get(path);
    const params1 = Object.assign(params0 || {}, params),
      child = el(params1);
    this.root.replaceChildren(child);
  }
}

// run app
//====================
function run(root) {
  const as = [
      Link('home', 'home'),
      Link('some', 'go there'),
      Link('', 'home too'),
      Link('accnt?name=chb&lastname=foo', 'chb accnt'),
      Link('friends?name=andron&lastname=gorb', 'friends'),
    ],
    header = document.querySelector('#header');
  header.append(...as);

  const home = () => {
    const d = Element('div');
    d.append(Element('h2', { textContent: 'Home' }));
    d.append(Element('p', { textContent: 'my home page rocks' }));
    return d;
  };

  const accnt = ({ name, lastname }) => {
    const d = Element('div');
    d.append(Element('h2', { textContent: `Hello ${name}` }));
    d.append(
      Element('p', { textContent: `your full name: ${name} ${lastname}` }),
    );
    return d;
  };

  const router = new Router({
    root: document.querySelector('#content'),
    routes: [
      { path: 'home', el: home },
      { path: 'some', el: () => Element('h3', { textContent: 'some page' }) },
      { path: '', el: home },
      { path: 'accnt', el: accnt },
      { path: 'friends', el: Friends },
    ],
  });

  // router.go('home');
  router.go('accnt?name=vlad&lastname=chb');

  function Friends({ name }) {
    const d = Element('div');
    d.append(Element('h2', { textContent: `Hello ${name}` }));
    d.append(Element('p', { textContent: `your full name: ${name}` }));
    const as = [
      Link('../', 'back'),
      Link('some', 'some'),
      Link('friends?name=vlad', 'vlad'),
    ];
    d.append(...as);

    const router = new Router({
      root: document.querySelector('#content'),
      routes: [
        { path: '', el: home },
        { path: 'some', params: { name: 'some' }, el: Friends },
        { path: 'friends', el: Friends },
      ],
    });
    router.go('');

    return d;
  }
}

run();

/* VERSION: 0.0.3 */
const cacheBust = '?' + Date.now(); // dirty hack for the install phase... saves me versioning at buildtime... if SW dies then this doesn't work as well...don't judge me
importScripts(`/scripts/router.js`);
importScripts(`/scripts/dot.js`);
importScripts(`/scripts/DOMParser.js${cacheBust}`);
importScripts(`/scripts/platform/web.js${cacheBust}`);
importScripts(`/scripts/platform/common.js${cacheBust}`);
importScripts(`/scripts/routes/index.js${cacheBust}`);
importScripts(`/scripts/routes/root.js${cacheBust}`);
importScripts(`/scripts/routes/proxy.js${cacheBust}`);
importScripts('/scripts/workbox-sw.js'); // not the actual filename

const assetPath = '/assets/';
const dataPath = '/data/'

const workbox = new WorkboxSW({clientsClaim: true, skipWaiting: true});

// your custom service worker logic here
workbox.precache([
  {
    "url": "/assets/templates/body.html",
    "revision": "713db3c2269375e3f35be10721665fcc"
  },
  {
    "url": "/assets/templates/foot.html",
    "revision": "54e700831266e8ab7741024adfb42940"
  },
  {
    "url": "/assets/templates/head.html",
    "revision": "97551ca208ceca2727f9c832e44561c4"
  },
  {
    "url": "/assets/templates/item.html",
    "revision": "d8be335f33f782caed1dccf42c4df564"
  }
]);

getCompiledTemplate(`${assetPath}templates/body.html`);

/*
  Router logic.
*/

// The proxy server '/proxy'
router.get(`${self.location.origin}/proxy`, (e) => {
  e.respondWith(routes['proxy'](dataPath, assetPath, e.request));
}, {urlMatchProperty: 'href'});

// The root '/'
router.get(`${self.location.origin}/$`, (e) => {
  e.respondWith(routes['root'](dataPath, assetPath));
}, {urlMatchProperty: 'href'});


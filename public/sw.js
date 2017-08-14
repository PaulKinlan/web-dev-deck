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
    "revision": "17268fe409e3de44c3308684f640230c"
  },
  {
    "url": "/assets/templates/foot.html",
    "revision": "54e700831266e8ab7741024adfb42940"
  },
  {
    "url": "/assets/templates/head.html",
    "revision": "6a7171dd6fad581fae9586b9198b726a"
  },
  {
    "url": "/assets/templates/item.html",
    "revision": "816e64568e095e05d5fc6955e8b76caf"
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


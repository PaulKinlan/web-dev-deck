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
    "revision": "553425f08ed806ecf0301e484581debf"
  },
  {
    "url": "/assets/templates/head.html",
    "revision": "d5397f0419f01d75c386948cd453b3d7"
  },
  {
    "url": "/assets/templates/item.html",
    "revision": "ac1801a84a4aabfa97868823e1110df5"
  }
]);

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

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


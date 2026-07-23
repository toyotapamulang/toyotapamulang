w =========================================
// TOYOTA PAMULANG SERVICE WORKER
// Version 1.0
// =========================================

const CACHE_NAME = "toyota-pamulang-v1";

const urlsToCache = [

    "/",

    "/index.html",

    "/produk.html",

    "/promo.html",

    "/simulasi.html",

    "/pricelist.html",

    "/tentang.html",

    "/kontak.html",

    "/404.html",

    "/manifest.json",

    "/css/style.css",

    "/css/responsive.css",

    "/css/animation.css",

    "/js/script.js",

    "/js/simulasi.js",

    "/images/logo.png",

    "/images/hero.webp"

];

// =========================================
// INSTALL
// =========================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(urlsToCache);

            })

    );

});

// =========================================
// FETCH
// =========================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});

// =========================================
// ACTIVATE
// =========================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cache => {

                        if (cache !== CACHE_NAME) {

                            return caches.delete(cache);

                        }

                    })

                );

            })

    );

});




// =========================================
// SERVICE WORKER
// =========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("/service-worker.js")

            .then(() => {

                console.log("Service Worker Registered");

            })

            .catch(error => {

                console.log(error);

            });

    });

}

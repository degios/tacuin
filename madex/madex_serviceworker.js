const sw = (function(){
    let CACHE_NAME = 'version_01';
    //let URLS = config.swCacheFileList();
    let URLS = [];
    let registered = false;

    function setCacheName(pName) { CACHE_NAME = (pName ?? CACHE_NAME).trim(); }
    function evtInstall(event){ // Evento install
        // Codice da eseguire su installazione
        console.log("SW - Service Worker Installato");
        // Cache resources
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function (cache) {
                    return cache.addAll(URLS)
                })
                .then(function(){
                    return self.skipWaiting();
                })
        );
    }
    var evtActivate = function(event){
        // Codice da eseguire su attivazione 
        console.log("SW - Service Worker Attivo");
        // Delete outdated caches
        event.waitUntil(
            caches.keys().then(keyList => {
                return Promise.all(keyList.map(key => { 
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    }));
                }));
        return self.clients.claim();
    }
    function evtFetch(event){
        // Codice da eseguire su fetch di risorse
        //console.log("Richiesta URL: "+event.request.url);
/*
        // Respond with cached resources
        event.respondWith(
            caches.match(event.request)
                    .then(function (response) {
                        return response || fetch(event.request)
                    })
        );	
*/
        event.respondWith(caches.open(CACHE_NAME).then((cache) => {
            // Network first time, then cache and refresh cache version
            return cache.match(event.request).then((cachedResponse) => {
                const fetchedResponse = fetch(event.request.url)
                    .then((networkResponse) => {
                        cache.put(event.request.url, networkResponse.clone());
                        return networkResponse;
                    })
                    .catch(function(err) {
                        // Network version not reachable
                    });

                //if (!cachedResponse) console.log('Network',event.request.url);
                return cachedResponse || fetchedResponse;
            });
/*
            // Go to the network first
            return fetch(event.request.url).then((fetchedResponse) => {
                cache.put(event.request.url, fetchedResponse.clone());
                return fetchedResponse;
            }).catch(() => {
                // If the network is unavailable, get
                return cache.match(event.request.url);
            });
*/
        }));
    }
    function evtNotificationClick(event){
        if (!event.action) {
            // Was a normal notification click
            console.log('SW - Notification Click');
        }
        else console.log(`SW - Unknown action clicked: '${event.action}'`);
/*
        const clickedNotification = event.notification;
        clickedNotification.close();
        
        event.waitUntil(
            self.clients.matchAll().then(function(clientList) {
                //console.log(clientList)
                if (clientList.length > 0) {
                    for (let idClientList = 0; idClientList < clientList.length; idClientList++) {
                        if (clientList[idClientList].url.toLowerCase().includes('rv_')){ 
                            //console.log(clientList[0]);
                            clientList[idClientList].focus();
                            //console.log('postMessage');
                            //console.log(clientList[0].client);
                            clientList[idClientList].postMessage({
                                action: 'windowOpenForeground',
                                url: 'rv_sys_notifiche_portlet.jsp?m_cWindowName=main'
                            });
                            return;
                        }
                    }
                }
                //return self.clients.openWindow('/');
            })
        );	
*/
    }
    function evtSync(event){
        //console.log('sync on serviceWorker');
        if (event.tag.split('|||')[0] === 'checknotifications') {
            console.log('call rv_bchecknotifications');
            /*
            event.waitUntil(fetch('./servlet/rv_bchecknotifications?pAppserver='+event.tag.split('|||')[1]).then(function(response){
                //return response.json();
                return response;
            }).then(function(data){
                console.log(data);
            }));
            */
        }
    }

    function register(){
        if (!registered){
            try{ 
                self.addEventListener('install', evtInstall);
            } catch (err){
                console.log("*** SW - addEventListener[install] Service Worket error: " + err);
            }

            try{
                self.addEventListener('activate', this.evtActivate);
            } catch (err){
                console.log("*** SW - addEventListener[activate] Service Worket error: " + err);
            }

            try{
                self.addEventListener('fetch', this.evtFetch);
            } catch (err){
                console.log("*** SW - addEventListener[fetch] Service Worket error: " + err);
            }

            try{
                self.addEventListener('notificationclick', this.evtNotificationClick);
            } catch (err){
                console.log("*** SW - addEventListener[notificationclick] Service Worket error: " + err);
            }

            try{
                self.addEventListener('sync', this.evtSync);
            } catch (err){
                console.log("*** SW - addEventListener[sync] Service Worket error: " + err);
            }
            registered = true;
        }
    }

    return {
        setCacheName,
        evtInstall,
        evtActivate,
        evtFetch,
        evtNotificationClick,
        evtSync,
        register
    }
})();
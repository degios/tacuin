/*
 * CHALLANGE:  
 * Cache `index.html` file using service worker.
 *
 * This bit of code is included in <script> tag of index.html
 * if (navigator.serviceWorker) {
 *   navigator.serviceWorker.register('serviceworker.js', {scope: '/'})
 * }
 *
 */


self.importScripts('scripts/config.js');

var CACHE_NAME = 'version_01';
var URLS = config.swCacheFileList();

try{
	// Evento install
	self.addEventListener('install', event => {
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
	});
} catch (err){
	console.log("*** SW - addEventListener[install] Service Worket error: " + err);
}

try{
	// Evento activate 
	self.addEventListener('activate', event => {
		// Codice da eseguire su attivazione 
		console.log("SW - Service Worker Attivo");
		// Delete outdated caches
		event.waitUntil(
			caches.keys().then(keyList => {
				return Promise.all(keyList.map(key => { 
					if (key !== CACHE_NAME) {
						return cache.delete(key);
						}
					}));
				}));
		return self.clients.claim();
	});
} catch (err){
	console.log("*** SW - addEventListener[activate] Service Worket error: " + err);
}

try{
	// Evento fetch
	self.addEventListener('fetch', event => {
		// Codice da eseguire su fetch di risorse
		//console.log("Richiesta URL: "+event.request.url);
/*
		if( navigator.onLine ) {
			// Qui strategia per navigazione online
		}
		else {
			// Qui strategia per navigazione offline
		}
*/
		// Respond with cached resources
		event.respondWith(
			caches.match(event.request)
				  .then(function (response) {
						return response || fetch(event.request)
					})
		);	
	});
} catch (err){
	console.log("*** SW - addEventListener[fetch] Service Worket error: " + err);
}

try{
	self.addEventListener('notificationclick', (event) => {
		if (!event.action) {
			// Was a normal notification click
			console.log('SW - Notification Click.');
		}
		else {
			console.log(`SW - Unknown action clicked: '${event.action}'`);
		}
		
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
	});
} catch (err){
	console.log("*** SW - addEventListener[notificationclick] Service Worket error: " + err);
}

try{
	self.addEventListener('sync', (event) => {
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
	});
} catch (err){
	console.log("*** SW - addEventListener[sync] Service Worket error: " + err);
}

self.importScripts('scripts/config.js');
self.importScripts('madex/madex_serviceworker.js');

//sw.evtActivate = function(event){console.log('**** ACTIVATE disabled ****')};
sw.register();
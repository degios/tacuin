console.log('Main: load');

import { madex } from '../madex/madex.js';
import { children } from './children.js';

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _initCallback(){
        _init();
    }
    function _init(){
        if (madex.params.config && madex.params.config.trim() != ''){
            madex.params.title = "Personal expense monitor";
            madex.params.loadCallback = _loadCallback;
            madex.params.networkCallback = _networkCallback;
            madex.params.service_worker.src = "sw.js";
            madex.params.service_worker.version = "20260909T000000"; // 20260909T000000
            madex.params.manifest.id = "tacuin/v1";
            madex.params.manifest.name = "Tacuin";
            madex.params.manifest.name_localized = {};
            madex.params.manifest.short_name = "Tacuin";
            madex.params.manifest.short_name_localized = {};
            madex.params.manifest.description = "A personal expense monitoring";
            madex.params.manifest.description_localized = {};
            madex.params.manifest.theme_color = "#13A29A";

            madex.params.manifest.shortcuts = [
                {
                    "name": "Apri l'accordatore",
                    "name_localized": {},
                    "short_name": "Accordatore",
                    "short_name_localized": {},
                    "description": "Vai all'accordatore",
                    "description_localized": {},
                    "url": config.startURL + "?page=tuner",
                    "icons": [],
                },
                {
                    "name": "Apri il metronomo",
                    "name_localized": {},
                    "short_name": "Metronomo",
                    "short_name_localized": {},
                    "description": "Vai al metronomo",
                    "description_localized": {},
                    "url": config.startURL + "?page=metronome",
                    "icons": [],
                }
            ];
        }

        madex.create();
     }
     function _loadCallback(){
        const parsedUrl = new URL(window.location);
        // searchParams.get() will properly handle decoding the values.
        let sharedTarget = {};
        sharedTarget.title  = (parsedUrl.searchParams.get('title') ?? '');
        sharedTarget.text = (parsedUrl.searchParams.get('text') ?? '');
        sharedTarget.url = (parsedUrl.searchParams.get('url') ?? '');
        sharedTarget.url = (sharedTarget.text.trim() != '' && sharedTarget.url.trim() == '' ? sharedTarget.text : sharedTarget.url);
        if ((sharedTarget.title ?? '').trim() != '' && (sharedTarget.url ?? '').trim() != ''){
            let ctrl = madex.createElement('p',madex.getContentDiv(),"tplSharedTarget");
            //ctrl.style.position = "absolute";
            ctrl.innerHTML = '<a href="' + sharedTarget.url + '" target="_blank">' + sharedTarget.title + '</a>';
        }

        let ctrl = madex.createElement('p',madex.getContentDiv(),"tplNetwork");
        //ctrl.style.position = "absolute";
        ctrl.innerHTML = 'Application on-line';

        madex.pushChild(new children());
     }
     function _networkCallback(pState){
        let networkState = 'Application';
        switch(pState){
            case 'on':
                networkState += ' on-line';
                break;
            case 'off':
                networkState += ' off-line';
                break;
            case 'no':
                networkState += ' without-line';
                break;
            case 'err':
                networkState += ' - unable to check the network status';
                break;
        }
        window.document.getElementById("tplNetwork").innerHTML = networkState;
     }

    madex.init("scripts/config.js",_initCallback);
    return {
        madex
    }
})();
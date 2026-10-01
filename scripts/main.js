console.log('Main: load');

import { madex } from '../madex/madex.js';
import { children } from './children.js';

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _init(){
        madex.loadFile("scripts/config.js",true,() => _loadManifest());
        madex.create(_loadCallback, _networkCallback);
     }
     function _loadManifest(){
        console.log('Load manifest...');
        let objManifest = {
            "name": "Tacuin",
            "short_name": "Tacuin",
            "id": "tacuin/v1",
            "start_url": config.startURL,
            "display_override": ["window-controls-overlay", "minimal-ui"],
            "display": "standalone",
            "background_color": "#FFFFFF",
            "theme_color": "#13A29A",
            "description": "Personal expense monitoring",
            "orientation": "portrait-primary",
            "prefer_related_applications": false,
            "scope": config.scopeURL,
            "share_target": {
                "action": config.startURL,
                "method": "GET",
                "enctype": "application/x-www-form-urlencoded",
                "params": {
                    "title": "title",
                    "text": "text",
                    "url": "url"
                }
            },
            "icons": config.getIconList(),
            "screenshots": config.getScreenshotList(),
        }
        const stringManifest = JSON.stringify(objManifest);
        const blobManifest = new Blob([stringManifest], {type: 'application/json'});
        const urlManifest = URL.createObjectURL(blobManifest);
        window.document.getElementById("manifestPlaceHolder").setAttribute("href", urlManifest);
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

    _init();
    return {
        madex
    }
})();
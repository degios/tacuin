console.log('Main: load');

import { madex } from '../madex/madex.js';
//import { config } from './config.js';
import { children } from './children.js';

// Dynamic manifest.json
let pathOrigin = window.location.origin;
let pathName = window.location.pathname;
pathName = pathName.split('/');
pathName.pop();
pathName = pathName.join('/');
let startURL = pathOrigin + pathName + "/";
let objManifest = {
    "name": "Tacuin",
    "short_name": "Tacuin",
    "id": "tacuin/v1",
    "start_url": startURL,
    "display_override": ["window-controls-overlay", "minimal-ui"],
    "display": "standalone",
    "background_color": "#FFFFFF",
    "theme_color": "#13A29A",
    "description": "Personal expense monitoring",
    "orientation": "portrait-primary",
    "prefer_related_applications": false,
	"scope": startURL,
    "icons": [
        {
            "src": startURL + "icons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-120x120.png",
            "sizes": "120x120",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-167x167.png",
            "sizes": "167x167",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-180x180.png",
            "sizes": "180x180",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-1024x1024.png",
            "sizes": "1024x1024",
            "type": "image/png"
        },
        {
            "src": startURL + "icons/icon-48x48-maskable.png",
            "sizes": "48x48",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-64x64-maskable.png",
            "sizes": "64x64",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-72x72-maskable.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-96x96-maskable.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-120x120-maskable.png",
            "sizes": "120x120",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-128x128-maskable.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-144x144-maskable.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-152x152-maskable.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-167x167-maskable.png",
            "sizes": "167x167",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-180x180-maskable.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-192x192-maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-256x256-maskable.png",
            "sizes": "256x256",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-512x512-maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": startURL + "icons/icon-1024x1024-maskable.png",
            "sizes": "1024x1024",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "screenshots": [
        {
            "src": startURL + "screenshot/screenshot-1920x1080.png",
            "sizes": "1920x1080",
            "form_factor": "wide",
            "label": "Desktop view"
        },
        {
            "src": startURL + "screenshot/screenshot-750x1334.png",
            "sizes": "750x1334",
            "form_factor": "narrow",
            "label": "Mobile view"
        }
    ]
}
const stringManifest = JSON.stringify(objManifest);
const blobManifest = new Blob([stringManifest], {type: 'application/json'});
const urlManifest = URL.createObjectURL(blobManifest);
window.document.getElementById("manifestPlaceHolder").setAttribute("href", urlManifest);

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _init(){
        madex.create(_loadCallback, _networkCallback);
     }
     function _loadCallback(){
        let ctrl = madex.createElement('p',window.document.body,"tplNetwork");
        ctrl.style.position = "absolute";
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
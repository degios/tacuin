console.log('Main: load');

import { madex } from '../madex/madex.js';
import { children } from './children.js';

let origin = window.location.origin;
let pathName = window.location.pathname;
pathName = pathName.split('/');
pathName.pop();
pathName = pathName.join('/');
console.log(origin + pathName)

let objManifest = {
    "name": "Tacuin",
    "short_name": "Tacuin",
    "start_url": "../",
    "display": "standalone",
    "background_color": "#FFFFFF",
    "theme_color": "#13A29A",
    "description": "Personal expense monitoring",
    "orientation": "portrait-primary",
    "prefer_related_applications": false,
	"scope": ".",
    "icons": [
        {
            "src": "../icons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
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
        madex.create(() => {_initCallback()});
     }
     function _initCallback(){
        madex.pushChild(new children());
     }

    _init();
    return {
        madex
    }
})();
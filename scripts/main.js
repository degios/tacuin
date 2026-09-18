console.log('Main: load');

import { madex } from '../madex/madex.js';
import { child } from './child.js';

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _init(){
        mainDiv = madex.CE("div",window.document.body,"tplMain");
        let addElement = madex.CE("A",mainDiv);
        addElement.href = 'javascript:window.main.addChild();';
        madex.CT("Accoda child", addElement);

        let delElement = madex.CE("A",mainDiv);
        delElement.href = 'javascript:window.main.delChild();';
        madex.CT("Rimuovi ultimo child", delElement);
    }

    function addChild(){
        if (childs.length > 0) childs[childs.length-1].getChildDiv().style.display="none";
        childs.push((new child()).create());
    }
    function delChild(){
        if (childs.length > 0) (childs.pop()).destroy();
        if (childs.length > 0) childs[childs.length-1].getChildDiv().style.display="block";
    }
    function cntChild(){ return childs.length; }
    function getCurrentGeoPosition(pCallback){
        madex.getCurrentGeoPosition(pCallback);
        return this;
    }

    _init();
    return {
        mainDiv,
        childs,
        addChild,
        delChild,
        cntChild,
        getCurrentGeoPosition,
        madexUID : madex.getUID,
        madexCE : madex.CE,
        madexCT : madex.CT
    }
})();
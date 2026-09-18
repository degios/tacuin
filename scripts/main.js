console.log('Main: load');

import { madex as mx } from '../madex/madex.js';
import { child } from './child.js';

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _init(){
        mainDiv = mx.createElement("div",window.document.body,"tplMain");
        let addElement = mx.createElement("A",mainDiv);
        addElement.href = 'javascript:window.main.addChild();';
        mx.createTextNode("Accoda child", addElement);

        let delElement = mx.createElement("A",mainDiv);
        delElement.href = 'javascript:window.main.delChild();';
        mx.createTextNode("Rimuovi ultimo child", delElement);
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
        mxUID : mx.getUID,
        mxCreateElement : mx.createElement,
        mxCreateTextNode : mx.createTextNode
    }
})();
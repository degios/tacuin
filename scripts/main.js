console.log('Main: load');

import { madex } from '../madex/madex.js';
import { children } from './children.js';

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _init(){
        madex.create(() => {_initCallback()});
     }
     function _initCallback(){
        window.madex = madex;
        madex.pushChild(new children());
     }

    _init();
    return {
        madex
    }
})();
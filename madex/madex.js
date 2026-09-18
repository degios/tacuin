import * as utils from './madex_utils.js';
import { browser } from './madex_browser.js';

const madex = (function(){
    //console.log(browser)
    return {
        createElement : utils.createElement,
        createTextNode : utils.createTextNode,
        getUID : utils.getUID,
        capitalize: utils.capitalize,
        getCurrentGeoPosition: utils.getCurrentGeoPosition
    };
})();

export { madex };
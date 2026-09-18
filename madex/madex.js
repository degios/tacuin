import * as utils from './madex_utils.js';
Object.assign(globalThis, utils);

const madex = (function(){
    return {
        CE : CE,
        CT : CT,
        getUID : getUID,
        capitalize: capitalize,
        getCurrentGeoPosition: getCurrentGeoPosition
    };
})();

export { madex };
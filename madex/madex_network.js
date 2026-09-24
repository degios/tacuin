const network = (function(){
    let callback;

    function _handleConnection() {
        if (navigator.onLine) {
            _isReachable(window.location.origin)
                .then(function(online) {
                    if (online) {
                        // handle online status
                        console.log('online');
                        if (callback !== null && callback != undefined && typeof callback == 'function')
                            callback.call('on');
                    } else {
                        if (callback !== null && callback != undefined && typeof callback == 'function')
                            callback.call('no');
                    }
                });
        } else {
            // handle offline status
            console.log('offline');
            if (callback !== null && callback != undefined && typeof callback == 'function')
                callback.call('off');
        }
    }
    function _isReachable(url) {
        /**
         * Note: fetch() still "succeeds" for 404s on subdirectories,
         * which is ok when only testing for domain reachability.
         *
         * Example:
         *   https://google.com/noexist does not throw
         *   https://noexist.com/noexist does throw
         */
        return fetch(url, { method: 'HEAD', mode: 'no-cors' })
            .then(function(resp) {
                return resp && (resp.ok || resp.type === 'opaque');
            })
            .catch(function(err) {
                console.warn('[conn test failure]:', err);
                if (callback !== null && callback != undefined && typeof callback == 'function')
                    callback.call('err');
            });
    }
    function create(pCallback){
        callback = pCallback;
        window.addEventListener("online", _handleConnection);
        window.addEventListener("offline", _handleConnection);
    }
    return {
        create
    }
})();

export { network };
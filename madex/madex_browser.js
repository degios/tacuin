const browser = (function(){
    let isChrome = false;
    let isFirefox = false;
    let isSafari = false;
    let isEdge = false;
    let isMobile = false;
    let isWideScreen = false;

    function _init(){
        _browserProperties();
        _screenProperties();
    }
    function _browserProperties(){
        let userAgentString =  navigator.userAgent;
        if (userAgentString){
            // Detect Chrome
            let chromeAgent = userAgentString.indexOf("Chrome") > -1;
            // Detect Firefox 
            let firefoxAgent = userAgentString.indexOf("Firefox") > -1; 
            // Detect Safari
            let safariAgent = userAgentString.indexOf("Safari") > -1;
            // Detect Edge
            let edgeAgent = userAgentString.indexOf("Edg") > -1;
            
            // Discard Safari since it also matches Chrome
            if ((chromeAgent) && (safariAgent)) safariAgent = false; 
            // Discard Chrome since it also matches Edge
            if ((chromeAgent) && (edgeAgent)) chromeAgent = false; 
            
            isChrome = chromeAgent;
            isFirefox = firefoxAgent;
            isSafari = safariAgent;
            isEdge = edgeAgent;

            isMobile = /Android|Mobi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgentString)
        }
    }
    function _screenProperties(){
        isWideScreen = !isMobile || screen.width > 640;
    }

    _init();
    return {
        isChrome,isFirefox,isSafari,isEdge,isMobile,isWideScreen
    }
})();

export { browser };
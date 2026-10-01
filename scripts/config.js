const config = (function(){
    const scopeURL = _getScopeURL();
    const startURL = _getStartURL();

    const iconMap = new Map()
        .set(scopeURL + "icons/icon-48x48.png",new Map()
                                        .set("sizes","48x48")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-64x64.png",new Map()
                                        .set("sizes","64x64")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-72x72.png",new Map()
                                        .set("sizes","72x72")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-96x96.png",new Map()
                                        .set("sizes","96x96")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-120x120.png",new Map()
                                        .set("sizes","120x120")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-128x128.png",new Map()
                                        .set("sizes","128x128")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-144x144.png",new Map()
                                        .set("sizes","144x144")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-152x152.png",new Map()
                                        .set("sizes","152x152")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-167x167.png",new Map()
                                        .set("sizes","167x167")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-180x180.png",new Map()
                                        .set("sizes","180x180")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-192x192.png",new Map()
                                        .set("sizes","192x192")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-256x256.png",new Map()
                                        .set("sizes","256x256")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-512x512.png",new Map()
                                        .set("sizes","512x512")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-1024x1024.png",new Map()
                                        .set("sizes","1024x1024")
                                        .set("type","image/png"))
        .set(scopeURL + "icons/icon-48x48-maskable.png",new Map()
                                        .set("sizes","48x48")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-64x64-maskable.png",new Map()
                                        .set("sizes","64x64")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-72x72-maskable.png",new Map()
                                        .set("sizes","72x72")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-96x96-maskable.png",new Map()
                                        .set("sizes","96x96")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-120x120-maskable.png",new Map()
                                        .set("sizes","120x120")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-128x128-maskable.png",new Map()
                                        .set("sizes","128x128")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-144x144-maskable.png",new Map()
                                        .set("sizes","144x144")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-152x152-maskable.png",new Map()
                                        .set("sizes","152x152")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-167x167-maskable.png",new Map()
                                        .set("sizes","167x167")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-180x180-maskable.png",new Map()
                                        .set("sizes","180x180")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-192x192-maskable.png",new Map()
                                        .set("sizes","192x192")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-256x256-maskable.png",new Map()
                                        .set("sizes","256x256")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-512x512-maskable.png",new Map()
                                        .set("sizes","512x512")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(scopeURL + "icons/icon-1024x1024-maskable.png",new Map()
                                        .set("sizes","1024x1024")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
    const screenshotMap = new Map()
        .set(scopeURL + "screenshot/screenshot-1920x1080.png",new Map()
                                        .set("sizes","1920x1080")
                                        .set("form_factor","wide")
                                        .set("label","Desktop view"))
        .set(scopeURL + "screenshot/screenshot-750x1334.png",new Map()
                                        .set("sizes","750x1334")
                                        .set("form_factor","narrow")
                                        .set("label","Desktop view"))
    const baseFiles = [
        scopeURL,
        scopeURL + 'index.html',
        scopeURL + 'icons/icon-16x16-transparent.png',
        scopeURL + 'icons/icon-32x32-transparent.png',
        scopeURL + 'icons/icon-180x180-transparent.png',
        scopeURL + 'icons/icon-192x192-transparent.png',
        scopeURL + 'icons/icon-512x512-transparent.png'
    ]
    const jsFiles = [
        scopeURL + 'sw.js',
        scopeURL + 'sw.js?v=20260909T000000',
        scopeURL + 'madex/madex.js',
        scopeURL + 'madex/madex_browser.js',
        scopeURL + 'madex/madex_material.min.js',
        scopeURL + 'madex/madex_network.js',
        scopeURL + 'madex/madex_snackbar.js',
        scopeURL + 'madex/madex_utils.js',
        scopeURL + 'scripts/main.js',
        scopeURL + 'scripts/config.js',
        scopeURL + 'scripts/children.js',
        scopeURL + 'scripts/child.js',
    ]
    const cssFiles = [
        scopeURL + 'styles/madex.css',
        scopeURL + 'styles/madex_material.css',
        scopeURL + 'styles/madex_snackbar.css'
    ]
    let iconFiles = []; iconMap.forEach((pVal, pKey) => { iconFiles.push(pKey); });
    let screenshotFiles = []; screenshotMap.forEach((pVal, pKey) => { screenshotFiles.push(pKey); });

    function _getScopeURL(){
        let pathOrigin = (self ?? window).location.origin;
        let pathName = (self ?? window).location.pathname;
        pathName = pathName.split('/');
        pathName.pop();
        pathName = pathName.join('/');
        return (pathOrigin + pathName + "/");
    }
    function _getStartURL(){
        return (scopeURL + "index.html");
    }

    function getCacheFileList(){
        return Array.from(
            new Set(baseFiles)
                .union(new Set(jsFiles))
                .union(new Set(cssFiles))
                .union(new Set(iconFiles))
                .union(new Set(screenshotFiles)));
    }
    function getIconList(){
        let itemList = [];
        let item;
        iconMap.forEach((pVal, pKey) => {
            item = {};
            item.src = pKey;
            item.sizes = pVal.get("sizes") ?? '';
            item.type = pVal.get("type") ?? '';
            if (pVal.has("purpose"))
                item.purpose = pVal.get("purpose");
            itemList.push(item);
        });
        return itemList;
    }
    function getIconListLocalized(){ return {}; }
    function getScreenshotList(){
        let itemList = [];
        let item;
        screenshotMap.forEach((pVal, pKey) => {
            item = {};
            item.src = pKey;
            item.sizes = pVal.get("sizes") ?? '';
            item.form_factor = pVal.get("form_factor") ?? '';
            item.label = pVal.get("label") ?? '';
            itemList.push(item);
        });
        return itemList;
    }
    function getScreenshotListLocalized(){ return {}; }
    return { 
        scopeURL,
        startURL,
        iconMap,
        screenshotMap,
        getCacheFileList,
        getIconList,
        getIconListLocalized,
        getScreenshotList,
        getScreenshotListLocalized,
    };
})();
const config = (function(){
    const startURL = _getServerURL();

    const iconMap = new Map()
        .set(startURL + "icons/icon-48x48.png",new Map()
                                        .set("sizes","48x48")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-64x64.png",new Map()
                                        .set("sizes","64x64")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-72x72.png",new Map()
                                        .set("sizes","72x72")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-96x96.png",new Map()
                                        .set("sizes","96x96")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-120x120.png",new Map()
                                        .set("sizes","120x120")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-128x128.png",new Map()
                                        .set("sizes","128x128")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-144x144.png",new Map()
                                        .set("sizes","144x144")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-152x152.png",new Map()
                                        .set("sizes","152x152")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-167x167.png",new Map()
                                        .set("sizes","167x167")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-180x180.png",new Map()
                                        .set("sizes","180x180")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-192x192.png",new Map()
                                        .set("sizes","192x192")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-256x256.png",new Map()
                                        .set("sizes","256x256")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-512x512.png",new Map()
                                        .set("sizes","512x512")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-1024x1024.png",new Map()
                                        .set("sizes","1024x1024")
                                        .set("type","image/png"))
        .set(startURL + "icons/icon-48x48-maskable.png",new Map()
                                        .set("sizes","48x48")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-64x64-maskable.png",new Map()
                                        .set("sizes","64x64")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-72x72-maskable.png",new Map()
                                        .set("sizes","72x72")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-96x96-maskable.png",new Map()
                                        .set("sizes","96x96")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-120x120-maskable.png",new Map()
                                        .set("sizes","120x120")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-128x128-maskable.png",new Map()
                                        .set("sizes","128x128")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-144x144-maskable.png",new Map()
                                        .set("sizes","144x144")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-152x152-maskable.png",new Map()
                                        .set("sizes","152x152")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-167x167-maskable.png",new Map()
                                        .set("sizes","167x167")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-180x180-maskable.png",new Map()
                                        .set("sizes","180x180")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-192x192-maskable.png",new Map()
                                        .set("sizes","192x192")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-256x256-maskable.png",new Map()
                                        .set("sizes","256x256")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-512x512-maskable.png",new Map()
                                        .set("sizes","512x512")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set(startURL + "icons/icon-1024x1024-maskable.png",new Map()
                                        .set("sizes","1024x1024")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
    const screenshotMap = new Map()
        .set(startURL + "screenshot/screenshot-1920x1080.png",new Map()
                                        .set("sizes","1920x1080")
                                        .set("form_factor","wide")
                                        .set("label","Desktop view"))
        .set(startURL + "screenshot/screenshot-750x1334.png",new Map()
                                        .set("sizes","750x1334")
                                        .set("form_factor","narrow")
                                        .set("label","Desktop view"))
    const baseFiles = [
        startURL,
        startURL + 'index.html',
        startURL + 'icons/icon-16x16-transparent.png',
        startURL + 'icons/icon-32x32-transparent.png',
        startURL + 'icons/icon-180x180-transparent.png',
        startURL + 'icons/icon-192x192-transparent.png',
        startURL + 'icons/icon-512x512-transparent.png'
    ]
    const jsFiles = [
        startURL + 'sw.js',
        startURL + 'sw.js?v=20260909T000000',
        startURL + 'madex/madex.js',
        startURL + 'madex/madex_browser.js',
        startURL + 'madex/madex_material.min.js',
        startURL + 'madex/madex_network.js',
        startURL + 'madex/madex_snackbar.js',
        startURL + 'madex/madex_utils.js',
        startURL + 'scripts/main.js',
        startURL + 'scripts/config.js',
        startURL + 'scripts/children.js',
        startURL + 'scripts/child.js',
    ]
    const cssFiles = [
        startURL + 'styles/madex.css',
        startURL + 'styles/madex_material.css',
        startURL + 'styles/madex_snackbar.css'
    ]
    let iconFiles = []; iconMap.forEach((pVal, pKey) => { iconFiles.push(pKey); });
    let screenshotFiles = []; screenshotMap.forEach((pVal, pKey) => { screenshotFiles.push(pKey); });

    function _getServerURL(){
        let pathOrigin = self.location.origin;
        let pathName = self.location.pathname;
        pathName = pathName.split('/');
        pathName.pop();
        pathName = pathName.join('/');
        let startURL = pathOrigin + pathName + "/";
        return startURL;
    }

    function swCacheFileList(){
        //console.log(_getServerURL());
        return Array.from(
            new Set(baseFiles)
                .union(new Set(jsFiles))
                .union(new Set(cssFiles))
                .union(new Set(iconFiles))
                .union(new Set(screenshotFiles)));
    }
    return { swCacheFileList };
})();
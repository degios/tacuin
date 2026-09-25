const config = (function(){
    const iconMap = new Map()
        .set("/icons/icon-48x48.png",new Map()
                                        .set("sizes","48x48")
                                        .set("type","image/png"))
        .set("/icons/icon-64x64.png",new Map()
                                        .set("sizes","64x64")
                                        .set("type","image/png"))
        .set("/icons/icon-72x72.png",new Map()
                                        .set("sizes","72x72")
                                        .set("type","image/png"))
        .set("/icons/icon-96x96.png",new Map()
                                        .set("sizes","96x96")
                                        .set("type","image/png"))
        .set("/icons/icon-120x120.png",new Map()
                                        .set("sizes","120x120")
                                        .set("type","image/png"))
        .set("/icons/icon-128x128.png",new Map()
                                        .set("sizes","128x128")
                                        .set("type","image/png"))
        .set("/icons/icon-144x144.png",new Map()
                                        .set("sizes","144x144")
                                        .set("type","image/png"))
        .set("/icons/icon-152x152.png",new Map()
                                        .set("sizes","152x152")
                                        .set("type","image/png"))
        .set("/icons/icon-167x167.png",new Map()
                                        .set("sizes","167x167")
                                        .set("type","image/png"))
        .set("/icons/icon-180x180.png",new Map()
                                        .set("sizes","180x180")
                                        .set("type","image/png"))
        .set("/icons/icon-192x192.png",new Map()
                                        .set("sizes","192x192")
                                        .set("type","image/png"))
        .set("/icons/icon-256x256.png",new Map()
                                        .set("sizes","256x256")
                                        .set("type","image/png"))
        .set("/icons/icon-512x512.png",new Map()
                                        .set("sizes","512x512")
                                        .set("type","image/png"))
        .set("/icons/icon-1024x1024.png",new Map()
                                        .set("sizes","1024x1024")
                                        .set("type","image/png"))
        .set("/icons/icon-48x48-maskable.png",new Map()
                                        .set("sizes","48x48")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-64x64-maskable.png",new Map()
                                        .set("sizes","64x64")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-72x72-maskable.png",new Map()
                                        .set("sizes","72x72")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-96x96-maskable.png",new Map()
                                        .set("sizes","96x96")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-120x120-maskable.png",new Map()
                                        .set("sizes","120x120")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-128x128-maskable.png",new Map()
                                        .set("sizes","128x128")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-144x144-maskable.png",new Map()
                                        .set("sizes","144x144")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-152x152-maskable.png",new Map()
                                        .set("sizes","152x152")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-167x167-maskable.png",new Map()
                                        .set("sizes","167x167")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-180x180-maskable.png",new Map()
                                        .set("sizes","180x180")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-192x192-maskable.png",new Map()
                                        .set("sizes","192x192")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-256x256-maskable.png",new Map()
                                        .set("sizes","256x256")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-512x512-maskable.png",new Map()
                                        .set("sizes","512x512")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
        .set("/icons/icon-1024x1024-maskable.png",new Map()
                                        .set("sizes","1024x1024")
                                        .set("type","image/png")
                                        .set("purpose","maskable"))
    const screenshotMap = new Map()
        .set("/screenshot/screenshot-1920x1080.png",new Map()
                                        .set("sizes","1920x1080")
                                        .set("form_factor","wide")
                                        .set("label","Desktop view"))
        .set("/screenshot/screenshot-750x1334.png",new Map()
                                        .set("sizes","750x1334")
                                        .set("form_factor","narrow")
                                        .set("label","Desktop view"))
    const baseFiles = [
        '/',
        '/index.html',
        '/icons/icon-16x16-transparent.png',
        '/icons/icon-32x32-transparent.png',
        '/icons/icon-180x180-transparent.png',
        '/icons/icon-192x192-transparent.png',
        '/icons/icon-512x512-transparent.png'
    ]
    const jsFiles = [
        '/sw.js',
        '/sw.js?v=20260909T000000',
        '/madex/madex.js',
        '/madex/madex_browser.js',
        '/madex/madex_material.min.js',
        '/madex/madex_network.js',
        '/madex/madex_snackbar.js',
        '/madex/madex_utils.js',
        '/scripts/main.js',
        '/scripts/config.js',
        '/scripts/children.js',
        '/scripts/child.js',
    ]
    const cssFiles = [
        '/styles/madex.css',
        '/styles/madex_material.css',
        '/styles/madex_snackbar.css'
    ]
    let iconFiles = []; iconMap.forEach((pVal, pKey) => { iconFiles.push(pKey); });
    let screenshotFiles = []; screenshotMap.forEach((pVal, pKey) => { screenshotFiles.push(pKey); });

    function swCacheFileList(){
        return Array.from(
            new Set(baseFiles)
                .union(new Set(jsFiles))
                .union(new Set(cssFiles))
                .union(new Set(iconFiles))
                .union(new Set(screenshotFiles)));
    }
    return { swCacheFileList };
})();
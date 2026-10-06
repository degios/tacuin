import * as utils from './madex_utils.js';
import { network } from './madex_network.js';
import { browser } from './madex_browser.js';

const madex = (function(){
    let created = false;
    let swLoaded = false;

    let isConfigured = false;
    let mainDiv,loadDiv,topBarDiv,tabBarDiv,contentDiv,fltBtnDiv,hmbDrwDiv,botBarDiv;
    let childs = [];
    let childMap = new Map();
    
    let timeoutId;

    let params = {
        "meta": {
            "description": "A demonstration application",
            "mobile-web-app-capable": "yes",
            "viewport": "width=device-width",
        },
        "title": "Demonstration",

        "loadCallback": null,
        "networkCallback": null,
        "loaderCallback": null,

        "config": "",
        "service_worker": {
            "src": "",
            "version": "",
        },
        "root": undefined,
        "loader_timeout": 60000,

        "manifest": {
            "id": "demo/v1",

            "name": "Demo",
            "name_localized": {},
            "short_name": "Demo",
            "short_name_localized": {},
            "description": "Demonstration",
            "description_localized": {},

            "display_override": ["standalone"],
            "display": "standalone",
            "background_color": "#FFFFFF",
            "theme_color": "#5F7D8A",
            "orientation": "portrait-primary",
            "prefer_related_applications": false,

            "shortcuts": [],
        }
    };

    function _init(){
        if (!swLoaded) {
            swLoaded = true;
            _header();
            _manifest();
            _theme();
            //utils.loadFile('styles/madex_material.css',true, () => 
            utils.loadFile('madex/madex_material.min.js',true,
                () => utils.loadFile('styles/madex_snackbar.css',true, 
                    () => utils.loadFile('madex/madex_snackbar.js',true, 
                    () => utils.loadFile('styles/madex.css', true,
                        () => _load()))))
            //);
                                /*
                        () => this._browserType()
                                ._screenOrientationListener()
                                ._loadSpeech()
                                ._loadSound()
                                ._shortcutListener()
                                ._messageListener()
                                ._load())))));
                                */
        }
    }
    function _header(){
        let element
        if (params.meta.description)
            Object.keys(params.meta).forEach(function(pKey){
                utils.createMeta(window.document.head,pKey,params.meta[pKey].trim())
            })
        if (params.title && typeof params.title == "string" && params.title.trim() != ""){
            utils.createMeta(window.document.head,"apple-mobile-web-app-title",params.title.trim())
            utils.createElement("title",window.document.head,"titlePlaceHolder").innerHTML = params.title.trim()
        }
        if (params.manifest && typeof params.manifest.theme_color == "string" && params.manifest.theme_color.trim() != ""){
            utils.createMeta(window.document.head,"apple-mobile-web-app-status-bar-style",params.manifest.theme_color.trim())
            utils.createMeta(window.document.head,"theme-color",params.manifest.theme_color.trim())
        }
        if (config && config.faviconMap)
            config.faviconMap.forEach((pVal,pKey) => {
                element = utils.createElement("link",window.document.head);
                element.href = pKey
                element.sizes = pVal.get("sizes")
                element.rel = pVal.get("rel")
            })
    }
    function _manifest(){
        if (config && params.config && params.config.trim() != '' && params.manifest){
            let elementManifest = utils.createElement("link",window.document.head,"manifestPlaceHolder");
            elementManifest.rel = "manifest";

            let objManifest = {
                "id": madex.params.manifest.id,

                "name": madex.params.manifest.name,
                "name_localized": madex.params.manifest.name_localized,
                "short_name": madex.params.manifest.short_name,
                "short_name_localized": madex.params.manifest.short_name_localized,
                "description": madex.params.manifest.description,
                "description_localized": madex.params.manifest.description_localized,
                
                "start_url": (config ? (config.startURL ?? '') : ''),
                "scope": (config ? (config.scopeURL ?? '') : ''),
                "share_target": {
                    "action": (config ? (config.startURL ?? '') : ''),
                    "method": "GET",
                    "enctype": "application/x-www-form-urlencoded",
                    "params": {
                        "title": "title",
                        "text": "text",
                        "url": "url"
                    }
                },
                
                "display_override": params.manifest.display_override,
                "display": params.manifest.display,
                "background_color": params.manifest.background_color,
                "theme_color": params.manifest.theme_color,
                "orientation": params.manifest.orie,
                "prefer_related_applications": params.manifest.prefer_related_applications,

                "icons": (config && typeof config.getIconList == 'function' ? config.getIconList() : []),
                "icons_localized": (config && typeof config.getIconListLocalized == 'function' ? config.getIconListLocalized() : {}),
                "screenshots": (config && typeof config.getScreenshotList == 'function' ? config.getScreenshotList() : []),
                "screenshots_localized": (config && typeof config.getScreenshotListLocalized == 'function' ? config.getScreenshotListLocalized() : {}),
                "shortcuts": params.manifest.shortcuts,
            }

            const stringManifest = JSON.stringify(objManifest);
            const blobManifest = new Blob([stringManifest], {type: 'application/json'});
            const urlManifest = URL.createObjectURL(blobManifest);
            window.document.getElementById("manifestPlaceHolder").setAttribute("href", urlManifest);
        }
    }
    function _theme(){
        if (params.root){
            params.root.style.setProperty("--mdc-theme-primary", madex.params.manifest.theme_color);
            params.root.style.setProperty("--mdc-theme-secondary", madex.params.manifest.theme_color);
            params.root.style.setProperty("--mdc-theme-error", madex.params.manifest.theme_color);
        }
    }
    function _load(){
        topBarDiv = utils.createElement("div",mainDiv,"mdxTopBar","mdxTopBar");
        let topBarHTML = '';
        topBarHTML += '<header class="mdc-top-app-bar" id="tbar">';
        topBarHTML += '  <div class="mdc-top-app-bar__row" id="tbarRow">';
        topBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="tbarLeft">';
        //topBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="tbtHamb" aria-label="Open navigation menu" style="display: block;">menu</button>';
        topBarHTML += '    </section>';
        topBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="tbarRight">';
            //topBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="tsrOpen" aria-label="Open navigation menu" style="display: block;">search</button> ';
        topBarHTML += '    </section>';
        topBarHTML += '  </div>';
        topBarHTML += '</header>';
        topBarDiv.innerHTML = topBarHTML;

        tabBarDiv = utils.createElement("div",mainDiv,"mdxTabBar","mdxTabBar");
        let tabBarHTML = '';
        tabBarHTML += '<div class="mdc-tab-bar" role="tablist">';
        tabBarHTML += '  <div class="mdc-tab-scroller">';
        tabBarHTML += '    <div class="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">';
        tabBarHTML += '      <div class="mdc-tab-scroller__scroll-content">';
        for (let i=1; i < 10; i++){
        tabBarHTML += '        <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="false" tabindex="0" id="tab' + i + '">';
        tabBarHTML += '          <span class="mdc-tab__content">';
        tabBarHTML += '            <span class="mdc-tab__icon material-symbols-outlined" aria-hidden="true" id="tab' + i + 'Ico">code</span>';
        tabBarHTML += '            <span class="mdc-tab__text-label" id="tab' + i + 'Label">Prova</span>';
        tabBarHTML += '          </span>';
        //tabBarHTML += '          <span class="mdc-tab-indicator' + (i==1 ? ' mdc-tab-indicator--active' : '') + '" id="tab' + i + 'Ind">';
        tabBarHTML += '          <span class="mdc-tab-" id="tab' + i + 'Ind">';
        tabBarHTML += '            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>';
        tabBarHTML += '          </span>';
        tabBarHTML += '          <span class="mdc-tab__ripple"></span>';
        tabBarHTML += '        </button>';
        }
        tabBarHTML += '      </div>';
        tabBarHTML += '    </div>';
        tabBarHTML += '  </div>';
        tabBarHTML += '</div>';
        tabBarDiv.innerHTML = tabBarHTML;

        contentDiv = utils.createElement('div',mainDiv,"mdxContent","mdxContent");
        let contentHTML = '';
        //contentHTML += '<h2>Titolo</h2>';
        //contentHTML += '<h3>Sottotitolo</h3>';
        contentDiv.innerHTML = contentHTML;

        botBarDiv = utils.createElement('div',mainDiv,"mdxBottomBar","mdxBottomBar");
        let botBarHTML = '';
        botBarHTML += '';
        botBarHTML += '<header class="mdc-bottom-app-bar" id="bbar">';
        botBarHTML += '  <div class="mdc-top-app-bar__row" id="bbarRow">';
        botBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="bbarLeft">';
        //botBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="bbtHamb" aria-label="Open navigation menu" style="display: block;">menu</button>';
        botBarHTML += '    </section>';
        botBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="bbarRight">';
        //botBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="bbtStampa" aria-label="Open navigation menu" style="display: block;">print</button>';
        botBarHTML += '    </section>';
        botBarHTML += '    </div>';
        botBarHTML += '</header>';
        botBarDiv.innerHTML = botBarHTML;

        fltBtnDiv = utils.createElement('div',mainDiv,"mdxFltBtn","mdxFltBtn");
        let fltBtnHTML = '';
        /*
        fltBtnHTML += '<!-- CENTER -->';
        fltBtnHTML += '<button class="mdc-fab mdc-fab-bottom-center mdc-fbb" id="fbbCSpunta" aria-label="Favorite" style="display: block;">';
        fltBtnHTML += '  <div class="mdc-fab__ripple"></div>';
        fltBtnHTML += '  <span class="mdc-fab__icon material-symbols-outlined">qr_code_scanner</span>';
        fltBtnHTML += '</button>';
        */
        fltBtnDiv.innerHTML = fltBtnHTML;

        hmbDrwDiv = utils.createElement('div',mainDiv,"mdxHmbDrw","mdxHmbDrw");
        let hmbDrwHTML = '';
        hmbDrwHTML += '<aside id="hmdDrawer" class="mdc-drawer mdc-drawer--modal">';
        hmbDrwHTML += '  <div class="mdc-drawer__header">';
        hmbDrwHTML += '    <h3 id="hmdTitle" class="mdc-drawer__title">Revolver</h3>';
        hmbDrwHTML += '    <h6 id="hmdSubtitle" class="mdc-drawer__subtitle">"Nothing Like Before"</h6>';
        hmbDrwHTML += '  </div>';
        hmbDrwHTML += '  <div class="mdc-drawer__content">';
        hmbDrwHTML += '    <nav class="mdc-list">';
        /*
        hmbDrwHTML += '      <hr class="mdc-list-divider">';
        hmbDrwHTML += '      <div id="hmdInfo">';
        hmbDrwHTML += '        <a class="mdc-list-item">';
        hmbDrwHTML += '          <span class="mdc-list-item__ripple"></span>';
        hmbDrwHTML += '          <i class="material-symbols-outlined mdc-list-item__graphic" aria-hidden="true">info</i>';
        hmbDrwHTML += '          <span class="mdc-list-item__text">Informazioni</span>';
        hmbDrwHTML += '        </a>';
        hmbDrwHTML += '      </div>';
        hmbDrwHTML += '    </nav>';
        */
        hmbDrwHTML += '  </div>';
        hmbDrwHTML += '<div class="mdc-drawer__footer">';
        hmbDrwHTML += '<hr class="mdc-list-divider">';
        hmbDrwHTML += '<h6 id="hmdCopyright" class="mdc-drawer__copyright">&copy;</h6>';
        hmbDrwHTML += '</div>';
        hmbDrwHTML += '</aside>';
        hmbDrwHTML += '<div class="mdc-drawer-scrim"></div>';
        hmbDrwDiv.innerHTML = hmbDrwHTML;

        /*
        homeDraw = new mdc.drawer.MDCDrawer.attachTo(document.getElementById("hmdDrawer"));
        document.getElementById("hmdTitle").innerText = 'Utente';
        document.getElementById("hmdSubtitle").innerText = 'Azienda';
        document.getElementById("hmdCopyright").innerHTML = '&copy; 2025 All rights reserved';
        //homeDraw.open = true;
        */

        //this.snackBar("Notification - Permission was not granted.",'error','!','');

        window.madex = madex;
        if (params && params && params.loadCallback && typeof params.loadCallback == 'function')
            params.loadCallback.call();

        if (params && params && params.networkCallback && typeof params.networkCallback == 'function')
            network.create(params.networkCallback);
    }

    // Manage childs
    function pushChild(pChild){
        if (childs.length > 0) childs[childs.length-1].getCtrl().style.display="none";
        pChild.create(contentDiv);
        childMap.set(pChild.getCtrlId(),pChild);
        childs.push(pChild);
        if (childs.length > 0) contentDiv.style.display = "block";
    }
    function popChild(){
        if (childs.length > 0) {
            let child = childs.pop();
            childMap.delete(child.getCtrlId());
            child.destroy();
        }
        if (childs.length > 0) childs[childs.length-1].getCtrl().style.display="block";
        if (childs.length <= 0) contentDiv.style.display = "none";
    }
    function cntChild(){ return childs.length; }
    function getChild(pId){ return childMap.get(pId); }

    function init(pConfig, pCallback){
        if (pConfig && typeof pConfig == 'string' && pConfig.trim() != '')
            utils.loadFile(pConfig.trim(),true,() => _initCallback(pConfig, pCallback));
        else if (pCallback && typeof pCallback == 'function')
            pCallback.call();
    }
    function  _initCallback(pConfig, pCallback){
        params.config = pConfig;

        for (const paramName in config.params)
            switch(paramName){
                case "manifest":
                    for (const manifestName in config.params.manifest)
                        params.manifest[manifestName] = config.params.manifest[manifestName]
                    break
                case "meta":
                    for (const metaName in config.params.meta)
                        params.meta[metaName] = config.params.meta[metaName]
                    break
                case "service_worker":
                    for (const serviceName in config.params.service_worker)
                        params.service_worker[serviceName] = config.params.service_worker[serviceName]
                    break
                default:
                    params[paramName] = config.params[paramName]
                    break
            }

        pCallback.call();
    }
    function create(){
        //---Instanciate MaDeX engine
        console.log('MaDeX: starting engine...');
        if (created) console.log("MaDeX: engine is already created!")
        else {
            created = true;
            if (swLoaded)
                console.log('MaDeX: engine is already running!');
            else if (window.location.protocol != 'file:' && 'serviceWorker' in navigator && 
                     params.service_worker && params.service_worker.src && params.service_worker.src.trim() != '') {
                console.log('MaDeX: load service worker...');
                // Service workers are supported. Use them.
                window.addEventListener('load', function () {
                    console.log('MaDeX: window loaded');
                    // Wait for registration to finish before dropping the <script> tag.
                    // Otherwise, the browser will load the script multiple times,
                    // potentially different versions.
                    var serviceWorkerUrl = params.service_worker.src.trim();
                    if (params.service_worker.version && params.service_worker.version.trim() != '')
                        serviceWorkerUrl += '?v=' + params.service_worker.version.trim();
                    navigator.serviceWorker.register(serviceWorkerUrl)
                        .then((reg) => {
                            console.log('MaDeX: SW registered!', reg);
                            //---DISATTIVATO: non funziona l'update e scatta sempre il timeout
                            /*            
                            function waitForActivation(serviceWorker) {
                            serviceWorker.addEventListener('statechange', () => {
                            if (serviceWorker.state == 'activated') {
                            console.log('MaDeX: installed new service worker');
                            MXLib._init();
                            }
                            });
                            }
                            console.log('MaDeX: version ' + reg.active.scriptURL)
                            console.log('MaDeX: version requested ' + MXLib.swVersion)
                            if (!reg.active && (reg.installing || reg.waiting)) {
                            // No active web worker and we have installed or are installing
                            // one for the first time. Simply wait for it to activate.
                            waitForActivation(reg.installing || reg.waiting);
                            } else if (!reg.active.scriptURL.endsWith(MXLib.swVersion)) {
                            // When the app updates the serviceWorkerVersion changes, so we
                            // need to ask the service worker to update.
                            console.log('MaDeX: new service worker available');
                            console.log(reg)
                            reg.update();
                            //waitForActivation(reg.installing);
                            waitForActivation(reg.installing || reg.waiting);
                            } else {
                            // Existing service worker is still good.
                            console.log('MaDeX: loading app from service worker');
                            MXLib._init();
                            }
                            */
                        })
                        .catch((err) => {
                            console.log('MaDeX: SW error!', err);
                        });

                    //---DISATTIVATO: non funziona l'update e scatta sempre il timeout
                    if (true) _init();
                    else setTimeout(() => {
                        if (!swLoaded) {
                            console.log('MaDeX: failed to load app from service worker. Falling back to plain <script> tag');
                            _init();
                        }
                    }, 4000);
                });
            } 
            else {
                console.log('MaDeX: service workers not supported');
                // Service workers not supported. Just drop the <script> tag.
                _init();
            }
        }
    }

    function getContentDiv(){ return contentDiv; }

    function loader(pDisplay) {
        if (timeoutId){
            console.log('MaDeX: clear timeout %s', timeoutId)
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (loadDiv){
            loadDiv.style.display = (pDisplay ? "block" : "none")
            if (pDisplay)
                timeoutId = setTimeout(() => {
                    console.log('MaDeX: close loader cause timeout of %s ms',params.loader_timeout)
                    loader(false)
                    if (params && params && params.waitCallback && typeof params.waitCallback == 'function')
                        params.waitCallback.call()
                },params.loader_timeout)
        }
    }

    // Need to include the CSS as soon as possible
    utils.loadFile('styles/madex_material.css',true,() => { 
        params.root = window.document.querySelector(":root") 
        mainDiv = utils.createElement("div",window.document.body,"mdxMain","mdxMain");
        loadDiv = utils.createElement("div",mainDiv,"mdxLoader","mdxLoader");
        utils.createElement("span",loadDiv,"mdxLoading","mdxLoading");
    });

    return {
        init,
        params,
        create,
        getContentDiv,
        pushChild,
        popChild,
        cntChild,
        getChild,
        createElement : utils.createElement,
        createTextNode : utils.createTextNode,
        getUID : utils.getUID,
        loadFile : utils.loadFile,
        loader
    };
})();

export { madex };
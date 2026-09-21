import * as utils from './madex_utils.js';
import { browser } from './madex_browser.js';

const madex = (function(){
    let swVersion = '20260909T000000';
    let swLoaded = false;

    let isConfigured = false;
    let mainDiv,topBarDiv,tabBarDiv,contentDiv,fltBtnDiv,hmbDrwDiv,botBarDiv;
    let childs = [];
    let childMap = new Map();

    function _init(pCallback){
        if (!swLoaded) {
            swLoaded = true;
            utils.loadFile('styles/madex_material.css',true, 
                () => utils.loadFile('madex/madex_material.min.js',true,
                () => utils.loadFile('styles/madex_snackbar.css',true, 
                    () => utils.loadFile('madex/madex_snackbar.js',true, 
                    () => utils.loadFile('styles/madex.css', true,
                        () => _load(pCallback))))));
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
    function _load(pCallback){
        mainDiv = utils.createElement("div",window.document.body,"tplMain");
        //utils.createTextNode("Tacuin, a personal expense monitor project", utils.createElement("h2",mainDiv));

        topBarDiv = utils.createElement("div",mainDiv,"tplTopBar","tplTopBar_ctrl");
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

        tabBarDiv = utils.createElement("div",mainDiv,"tplTabBar","tplTabBar_ctrl");
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

        contentDiv = utils.createElement('div',mainDiv,"tplContent","tplContent_ctrl");
        let contentHTML = '';
        //contentHTML += '<h2>Titolo</h2>';
        //contentHTML += '<h3>Sottotitolo</h3>';
        contentDiv.innerHTML = contentHTML;

        botBarDiv = utils.createElement('div',mainDiv,"tplBottomBar","tplBottomBar_ctrl");
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

        fltBtnDiv = utils.createElement('div',mainDiv,"fltBtn","fltBtn_ctrl");
        let fltBtnHTML = '';
        /*
        fltBtnHTML += '<!-- CENTER -->';
        fltBtnHTML += '<button class="mdc-fab mdc-fab-bottom-center mdc-fbb" id="fbbCSpunta" aria-label="Favorite" style="display: block;">';
        fltBtnHTML += '  <div class="mdc-fab__ripple"></div>';
        fltBtnHTML += '  <span class="mdc-fab__icon material-symbols-outlined">qr_code_scanner</span>';
        fltBtnHTML += '</button>';
        */
        fltBtnDiv.innerHTML = fltBtnHTML;

        hmbDrwDiv = utils.createElement('div',mainDiv,"hmbDrw","hmbDrw_ctrl");
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
        if (pCallback !== null && pCallback != undefined && typeof pCallback == 'function')
        pCallback.call();
    }
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

    function create(pCallback){
        //---Instanciate MaDeX engine
        console.log('MaDeX: starting engine...');
        //if (!swLoaded) MXLib = this;
        if (swLoaded)
            console.log('MaDeX: engine is already running!');
        else if (window.location.protocol != 'file:' && 'serviceWorker' in navigator) {
            console.log('MaDeX: load service worker...');
            // Service workers are supported. Use them.
            window.addEventListener('load', function () {
                console.log('MaDeX: window loaded');
                // Wait for registration to finish before dropping the <script> tag.
                // Otherwise, the browser will load the script multiple times,
                // potentially different versions.
                var serviceWorkerUrl = 'sw.js?v=' + swVersion;
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
                if (true) _init(pCallback);
                else setTimeout(() => {
                    if (!swLoaded) {
                        console.log('MaDeX: failed to load app from service worker. Falling back to plain <script> tag');
                        _init(pCallback);
                    }
                }, 4000);
            });
        } 
        else {
            console.log('MaDeX: service workers not supported');
            // Service workers not supported. Just drop the <script> tag.
            _init(pCallback);
        }
    }

    function setContentDiv(pContentDiv){ contentDiv = pContentDiv; }
    return {
        create,
        pushChild,
        popChild,
        cntChild,
        getChild,
        createElement : utils.createElement,
        createTextNode : utils.createTextNode,
        getUID : utils.getUID,
        capitalize: utils.capitalize,
        getCurrentGeoPosition: utils.getCurrentGeoPosition
    };
})();

export { madex };
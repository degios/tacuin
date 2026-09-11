// Create icon set 192-512 ecc.
// https://freewebtoapk.com/app-icon-resizer
// Create maskable icon (bad, incorrect size)
// https://progressier.com/maskable-icons-editor
// Create maskable icon (not all but correct size)
// https://favicon.now/maskable-icon-generator
// Create transparent icon for favicon
// https://www.photoroom.com/it/tools/transparent-background

window.MXLib=function(pServiceWorkerVersion){

  this.swVersion = (pServiceWorkerVersion ?? '20260909T000000').trim();
  this.swLoaded = false;

  this.isChrome = false;
  this.isFirefox = false;
  this.isSafari = false;
  this.isEdge = false;
  this.isMobile = false;
  this.isWideScreen = false;
  this.voiceSpeech = false;
  this.voiceValues = "";
  this.voiceLabels = "";

//---Start initialize
  this._init=function(){
    if (!this.swLoaded) {
      this.swLoaded = true;
      this.loadFile('styles/material.css',true, 
        () => this.loadFile('scripts/material.min.js',true,
          () => this.loadFile('styles/madex.css', true,
            () => this._browserType()
                      ._screenOrientationListener()
                      ._loadSpeech()
                      ._shortcutListener()
                      ._load())));
    /*
      this.sqlGlobalVar.Query();
      this.sqlUtente.Query();
      this.getBrowserType();
      this.loadUserSettings();
      this.loadSpeech();
      this.loadInfo(); // Caricamento asincrono
      this.loadlastUpdate(); // Caricamento asincrono
      this._shortcutListener(this);
      this._screenOrientationListener();
    */
    }
    return this;
  };
  this._load=function(){
    let mainDiv = this.CE("div",window.document.body);
    //this.CT("Tacuin, a personal expense monitor project", this.CE("h2",mainDiv));

    let topBarDiv = this.CE("div",mainDiv,'tplTopbar_ctrl');
    let topBarHTML = '';
    topBarHTML += '<header class="mdc-top-app-bar" id="tbar">';
    topBarHTML += '  <div class="mdc-top-app-bar__row" id="tbarRow">';
    topBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="tbarLeft">';
    topBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="tbtHamb" aria-label="Open navigation menu" style="display: block;">menu</button>';
    topBarHTML += '    </section>';
    topBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="tbarRight">';
		topBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="tsrOpen" aria-label="Open navigation menu" style="display: block;">search</button> ';
    topBarHTML += '    </section>';
    topBarHTML += '  </div>';
    topBarHTML += '</header>';
    topBarDiv.innerHTML = topBarHTML;

    let botBarDiv = this.CE('div',mainDiv,'tplBottomBar_ctrl');
    let botBarHTML = '';
    botBarHTML += '';
    botBarHTML += '<header class="mdc-bottom-app-bar" id="bbar">';
    botBarHTML += '  <div class="mdc-top-app-bar__row" id="bbarRow">';
    botBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="bbarLeft">';
    botBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="bbtHamb" aria-label="Open navigation menu" style="display: block;">menu</button>';
    botBarHTML += '    </section>';
    botBarHTML += '    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="bbarRight">';
    botBarHTML += '      <button class="material-symbols-outlined mdc-top-app-bar__navigation-icon mdc-icon-button" id="bbtStampa" aria-label="Open navigation menu" style="display: block;">print</button>';
    botBarHTML += '    </section>';
    botBarHTML += '    </div>';
    botBarHTML += '</header>';
    botBarDiv.innerHTML = botBarHTML;

    let fltBtnDiv = this.CE('div',mainDiv,'fltBtn_ctrl');
    let fltBtnHTML = '';
    fltBtnHTML += '<!-- CENTER -->';
    fltBtnHTML += '<button class="mdc-fab mdc-fab-bottom-center mdc-fbb" id="fbbCSpunta" aria-label="Favorite" style="display: block;">';
    fltBtnHTML += '  <div class="mdc-fab__ripple"></div>';
    fltBtnHTML += '  <span class="mdc-fab__icon material-symbols-outlined">qr_code_scanner</span>';
    fltBtnHTML += '</button>';
    fltBtnDiv.innerHTML = fltBtnHTML;

    this._loadMaterial();
  };
  this._loadMaterial=function(){
    let oDocument = window.document;
    // animazioni material design
    let mdcTextFields = [].map.call(oDocument.querySelectorAll(".mdc-text-field"), function(el){
      return new mdc.textField.MDCTextField(el);
    });
    let mdcIconButtons = [].map.call(oDocument.querySelectorAll(".mdc-icon-button"), function(el){
      return new mdc.ripple.MDCRipple(el);
    });
    let mdcSwitches = [].map.call(oDocument.querySelectorAll(".mdc-switch"), function(el){
      return new mdc.switchControl.MDCSwitch(el);
    });
    let mdcSliders = [].map.call(oDocument.querySelectorAll(".mdc-slider"), function(el){
      return new mdc.slider.MDCSlider(el);
    });
    return this;
  };
  this._browserType=function(){
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
      
      this.isChrome = chromeAgent;
      this.isFirefox = firefoxAgent;
      this.isSafari = safariAgent;
      this.isEdge = edgeAgent;

      this.isMobile = /Android|Mobi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgentString)
    }
    return this;
  };
  this._screenProperties=function(){
    this.isWideScreen = !this.isMobile || screen.width > 640;
    return this;
  };
  this._screenOrientationListener=function(){
    this._screenProperties();
    screen.orientation.addEventListener("change", (event) => {
      this._screenProperties();
      //if (Object.hasOwn(this,"_getPortletReceiver") && Object.hasOwn(this._getPortletReceiver(),"_getPortletReceiver")){
        console.log('MXLib: orientation changed ' + screen.width);
      //  if (this._getPortletReceiver()._getPortletReceiver() != null &&
      //      this._getPortletReceiver()._getPortletReceiver() != undefined &&
      //      this._getPortletReceiver()._getPortletReceiver().portletname != undefined && 
      //      !this._getPortletReceiver()._getPortletReceiver().rvLoading()){
      //    let portletReceiver = this._getPortletReceiver()._getPortletReceiver();
      //    if (Object.hasOwn(portletReceiver,"this_rvOrientationChanged"))
      //      portletReceiver.this_rvOrientationChanged();
      //  }
      //}
    });
    return this;
  };
  this._loadSpeech=function(){
    this.voiceSpeech = false;
    this.voiceValues = "";
    this.voiceLabels = "";
    if (window.speechSynthesis != undefined)
      window.speechSynthesis.onvoiceschanged = () => {
        this.voiceSpeech = false;
        this.voiceValues = "";
        this.voiceLabels = "";

        let voices = speechSynthesis.getVoices().filter(function(voice) { return voice.name.toLowerCase().includes('italian'); });
        if (voices && voices.length > 0){
          voices.forEach(function(voice) {
            MXLib.voiceValues += (MXLib.voiceValues.trim() == '' ? '' : ',') + voice.name;
            MXLib.voiceLabels += (MXLib.voiceLabels.trim() == '' ? '' : ',') + voice.name;
          });
          this.voiceSpeech = true;
        }
      };
    return this;
  };
  this._shortcutListener=function(){
    if (!this.isMobile){
      window.document.addEventListener("keydown", function (evt) {
        let keyMap = new Map().set("9","keyTab")				//  Tab
                              .set("33","keyPageUp")		//  Page up
                              .set("34","keyPageDown")	//  Page down
                              .set("112","keyHelp")			//  F1	help
                              .set("113","keyPrint")		//	F2	stampa
                              .set("114","keyModify")		//	F3	modifica
                              .set("115","keyNew")			//	F4	nuovo
                              .set("116","keyDelete")		//	F5	cancella
                              .set("117","keyClear")		//	F6	cancella testo ricercato / filtri
                              .set("118","keyPrev")			//	F7	indietro
                              .set("119","keyNext")			//	F8	avanti
                              .set("120","keyList")			//  F9  lista
                              .set("121","keySave")			//	F10	salva
                              .set("122","keyRefresh")	//	F11	aggiorna
                              .set("123","keyFilter");	//	F12	filtro
        let ctrlMap = new Map().set("8","keyCBack")		  // 	Backspace
                              .set("112","keyCInfo");	// 	Informazioni
                              //.set("27","keyCEsc");	//  Esc - NON FUNZIONA
        
        let keyStr = keyMap.get(evt.keyCode.toString());
        let ctrlStr = ctrlMap.get(evt.keyCode.toString());
        //console.log(evt.keyCode);
        let fired = false;
        if ((evt.ctrlKey && !evt.shiftKey && ctrlStr != undefined) || (!evt.ctrlKey && !evt.shiftKey && keyStr != undefined)){
          keyStr = (evt.ctrlKey ? ctrlStr : keyStr);
          console.log('MXLib: shortcut: ' + keyStr);
/*
          //console.log(pContext.portletname);
          if ((pContext.rv ?? pContext)._loader(pContext.rv ?? pContext)) // Blocco shortcut se loader aperto
            fired = true;
          else if (Object.hasOwn((pContext.rv ?? pContext),"_getPortletReceiver") && Object.hasOwn((pContext.rv ?? pContext)._getPortletReceiver(),"_getPortletReceiver")){
            if ((pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver() != null &&
                (pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver() != undefined &&
                (pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver().portletname != undefined && 
                !(pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver().rvLoading()){
              //console.log((pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver().portletname + ' -> dispatch ' + keyStr);
              //console.log((pContext.rv ?? pContext).mdcAction("bsrOpen"));
              fired = (pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver().rv._childAction((pContext.rv ?? pContext)._getPortletReceiver()._getPortletReceiver(),keyStr);
              if (!fired && keyStr == 'keyFilter' && (pContext.rv ?? pContext).mdcAction("bsrOpen"))
                (pContext.rv ?? pContext).Ctrl.ownerDocument.getElementById("bsrOpen").click();
              else if (!fired && keyStr == 'keyClear' && (pContext.rv ?? pContext).mdcAction("bsrOpen"))
                (pContext.rv ?? pContext).Ctrl.ownerDocument.getElementById("tsrClear").click();
            }
          }
*/
          if (fired || !["keyTab"].includes(keyStr))
            evt.preventDefault(); // Blocco evento standard
        }
      });
    }
    return this;
  };
//---End initialize


//---Start function
  this.CE = function(el, target, className){
    let ne = document.createElement(el);
    if (className)
      ne.className = className;
    if(target)
        target.appendChild(ne);
    return ne;
  };
  this.CT=function(content, target){
    let ne = document.createTextNode(content);
    target.appendChild(ne);
    return ne;
  };

  this.getUID=function(nLen){
    var res = '';
    for (var i=0; i<nLen; i++) {
      var nAscii = parseInt(Math.random()*26+97);
      res = res + String.fromCharCode(nAscii);
    }
    return (res);
  };

  this.loadFile=function(pFile, pAsync = true, pCallback, pType){
    let oDocument = window.document;
    let fileEle = null;
    
    switch ((pType ?? pFile.split('.').pop()).trim().toLowerCase()){
      case 'js':
        fileEle = oDocument.createElement("script");
        fileEle.setAttribute("src", pFile);
        fileEle.setAttribute("type", "text/javascript");
        fileEle.setAttribute("async", pAsync);
        oDocument.head.appendChild(fileEle);
        break;
      case 'css':
        fileEle = oDocument.createElement("link");
        fileEle.href = pFile;
        fileEle.type = 'text/css';
        fileEle.rel = 'stylesheet';
        //oDocument.getElementsByTagName('head')[0].append(fileEle);
        oDocument.head.appendChild(fileEle)
        break;
      case 'wav':
      case 'mp3':
        new Audio(pFile);
        break;
      case 'module':
        fileEle = oDocument.createElement("script");
        fileEle.setAttribute("src", pFile);
        fileEle.setAttribute("type", "module");
        fileEle.setAttribute("async", pAsync);
        oDocument.head.appendChild(fileEle);
        break;
    }

    if (fileEle !== null && fileEle != undefined){
      // success event 
      if (pCallback !== null && pCallback != undefined && typeof pCallback == 'function')
        fileEle.addEventListener("load", () => { pCallback.call(); });

      // error event
      fileEle.addEventListener("error", (ev) => {
        console.log("Error on loading file " + pFile.split('\\').pop().split('/').pop(), ev);
      });
    }
    return this;
  };
//---End function

//---Instanciate MaDeX engine
  console.log('MXLib: starting engine...');
  if (!this.swLoaded) MXLib = this;
  if (this.swLoaded)
    console.log('MXLib: engine is already running!');
  else if (window.location.protocol != 'file:' && 'serviceWorker' in navigator) {
    console.log('MXLib: load service worker...');
    // Service workers are supported. Use them.
    window.addEventListener('load', function () {
      console.log('MXLib: window loaded');
      // Wait for registration to finish before dropping the <script> tag.
      // Otherwise, the browser will load the script multiple times,
      // potentially different versions.
      var serviceWorkerUrl = 'sw.js?v=' + MXLib.swVersion;
      navigator.serviceWorker.register(serviceWorkerUrl)
        .then((reg) => {
          console.log('MXLib: SW registered!', reg);
//---DISATTIVATO: non funziona l'update e scatta sempre il timeout
/*            
          function waitForActivation(serviceWorker) {
            serviceWorker.addEventListener('statechange', () => {
              if (serviceWorker.state == 'activated') {
                console.log('MXLib: installed new service worker');
                MXLib._init();
              }
            });
          }
          console.log('MXLib: version ' + reg.active.scriptURL)
          console.log('MXLIb: version requested ' + MXLib.swVersion)
          if (!reg.active && (reg.installing || reg.waiting)) {
            // No active web worker and we have installed or are installing
            // one for the first time. Simply wait for it to activate.
            waitForActivation(reg.installing || reg.waiting);
          } else if (!reg.active.scriptURL.endsWith(MXLib.swVersion)) {
            // When the app updates the serviceWorkerVersion changes, so we
            // need to ask the service worker to update.
            console.log('MXLib: new service worker available');
            console.log(reg)
            reg.update();
            //waitForActivation(reg.installing);
            waitForActivation(reg.installing || reg.waiting);
          } else {
            // Existing service worker is still good.
            console.log('MXLib: loading app from service worker');
            MXLib._init();
          }
*/
        })
      .catch((err) => {
          console.log('MXLib: SW error!', reg);
        });

//---DISATTIVATO: non funziona l'update e scatta sempre il timeout
      if (true) MXLib._init();
      else setTimeout(() => {
        if (!MXLib.swLoaded) {
          console.log('MXLib: failed to load app from service worker. Falling back to plain <script> tag');
          MXLib._init();
        }
      }, 4000);
    });
  } 
  else {
    console.log('MXLib: service workers not supported');
    // Service workers not supported. Just drop the <script> tag.
    MXLib._init();
  }
};
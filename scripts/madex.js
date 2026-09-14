// Create icon set 192-512 ecc.
// https://freewebtoapk.com/app-icon-resizer
// Create maskable icon (bad, incorrect size)
// https://progressier.com/maskable-icons-editor
// Create maskable icon (not all but correct size)
// https://favicon.now/maskable-icon-generator
// Create transparent icon for favicon
// https://www.photoroom.com/it/tools/transparent-background

// Dimensione font in rem
// 0.125rem = 2px
// --------------- inizio - range utilizzabile su titolo
// 0.750rem = 12px
// 0.875rem = 14px
// 1.000rem = 16px
// 1.125rem = 18px
// 1.250rem = 20px
// 1.375rem = 22px
// 1.500rem = 24px
// 1.625rem = 26px
// 1.750rem = 28px
// --------------- fine - range utilizzabile su titolo
// 1.875rem = 30px
// 2.000rem = 32px
// 2.125rem = 34px

// Immagini PNG: elemento disegnato bianco ed eliminazione dello sfondo (trasparenza) bacchetta magica con soglia 150

// Ricerca acronimi (3 lettere)
// https://www.acronymfinder.com/
// https://www.w3schools.com/charsets/ref_utf_symbols.asp
// https://www.w3schools.com/charsets/ref_utf_dingbats.asp

// Colori CSS HTML (dodgerblue, forestgreen...)
// https://www.w3schools.com/cssref/css_colors.php

// Material Symbols Outlined
// https://fonts.google.com/icons

// Material Design 3.0
// https://cdnjs.com/libraries/material-components-web/3.0.0
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.js
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.js.map
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.css
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.css.map
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.min.js
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.min.js.map
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.min.css
// https://cdnjs.cloudflare.com/ajax/libs/material-components-web/3.0.0/material-components-web.min.css.map

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

  this.userSounds = true;
  this.soundMap = new Map().set("confirm",["sounds/popup.wav",[200, 100, 200]])
                           .set("notify",["sounds/popup.wav",[200, 100, 200]])
                           .set("error",["sounds/off.wav",[500]])
                           .set("info",["",[500]])
                           .set("success",["sounds/on.wav",[200]])
                           .set("autosel",["sounds/on.wav",[200]])
                           .set("warning",["sounds/drop.wav",[200, 100, 200]]);
  this.userVibrate = true;
  this.mute = false;

  this.userDeboto = 1000;

  this.userVocal = true;
  this.speechRecognition = null;

//---Start initialize
  this._init=function(){
    if (!this.swLoaded) {
      this.swLoaded = true;
      this.loadFile('styles/madex_material.css',true, 
        () => this.loadFile('scripts/madex_material.min.js',true,
          () => this.loadFile('styles/madex_snackbar.css',true, 
            () => this.loadFile('scripts/madex_snackbar.js',true, 
              () => this.loadFile('styles/madex.css', true,
                () => this._browserType()
                          ._screenOrientationListener()
                          ._loadSpeech()
                          ._loadSound()
                          ._shortcutListener()
                          ._messageListener()
                          ._load())))));
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
    let mainDiv = this.CE("div",window.document.body,"tplMain");
    //this.CT("Tacuin, a personal expense monitor project", this.CE("h2",mainDiv));

    let topBarDiv = this.CE("div",mainDiv,"tplTopBar","tplTopBar_ctrl");
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

    let tabBarDiv = this.CE("div",mainDiv,"tplTabBar","tplTabBar_ctrl");
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

    let contentDiv = this.CE('div',mainDiv,"tplContent","tplContent_ctrl");
    let contentHTML = '';
    contentHTML += '<h2>Titolo</h2>';
    contentHTML += '<h3>Sottotitolo</h3>';
    contentDiv.innerHTML = contentHTML;

    let botBarDiv = this.CE('div',mainDiv,"tplBottomBar","tplBottomBar_ctrl");
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

    let fltBtnDiv = this.CE('div',mainDiv,"fltBtn","fltBtn_ctrl");
    let fltBtnHTML = '';
    /*
    fltBtnHTML += '<!-- CENTER -->';
    fltBtnHTML += '<button class="mdc-fab mdc-fab-bottom-center mdc-fbb" id="fbbCSpunta" aria-label="Favorite" style="display: block;">';
    fltBtnHTML += '  <div class="mdc-fab__ripple"></div>';
    fltBtnHTML += '  <span class="mdc-fab__icon material-symbols-outlined">qr_code_scanner</span>';
    fltBtnHTML += '</button>';
    */
    fltBtnDiv.innerHTML = fltBtnHTML;

    let hmbDrwDiv = this.CE('div',mainDiv,"hmbDrw","hmbDrw_ctrl");
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
        console.log('MaDeX: orientation changed ' + screen.width);
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
  this._loadSound=function(){
    this.soundMap.forEach((pVal, pKey) => {
	    this.loadFile(pVal[0]);
    });
    return this;
  };
  this._shortcutListener=function(){
    if (!this.isMobile || true){ // Attive anche per mobile (es. tablet con tastiera)
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
          console.log('MaDeX: shortcut: ' + keyStr);
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
  this._messageListener=function(){
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('MaDeX: message from service worker');
        console.log('MaDeX: action ' + event.data.action);
        if (event.data.action == 'windowOpenForeground'){
          //windowOpenForeground(event.data.url.replace("rv_sys_notifiche","rvzsys_notifiche") + "?callby=" + this.formid, "_top", "");
          alert('Apertura notifiche da Service Worker non ancora implementata!');
        }
      });
    }
    return this;
  };
  this_loadVocal=function(){
    this.stopVocal();
    this.speechRecognition = null;
    if (this.userVocal && this.isChrome){
      
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
      var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
      
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.lang = 'it-IT';
      this.speechRecognition.interimResults = false;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = function(event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        var testovocale = '';
        for (let i = 0; i < event.results.length; i++) {
          var stringa = event.results[i][0].transcript;
          testovocale = testovocale + stringa;
        }
        setTimeout(() => {
          console.log('MaDeX: comando vocale ' + testovocale);
          MXLib.fireVocal(testovocale);
        }, MXLib.userDeboto.Value());
      }

      this.speechRecognition.onspeechstart = function() {
        console.log("MaDeX: Riconoscimento vocale iniziato.");
      }

      this.speechRecognition.onspeechend = function() {
        console.log("MaDeX: riconoscimento vocale terminato.");
        MXLib.speechRecognition.stop();
      }

      this.speechRecognition.onnomatch = function(event) {
        console.log("MaXeX: non trovo nessuna corrispondenza in riconoscimento vocale.");
        //this_context.clear_vocal();
        MXLib.speechRecognition.stop();
      }

      this.speechRecognition.onerror = function(event) {
        console.log('MaDeX: errore di riconoscimento vocale: ' + event.error);
        //this_context.clear_vocal();
        MXLib.speechRecognition.stop();
      }
    }
    return this;
  };
  this._fireVocal=function(pText){
    console.log('MaDeX: fire vocal: ' + pText);
    //this.iframeMain.action_dispatch("srcSpeecRecognition",pText);
  };
//---End initialize

//---Start function
  this.CE = function(pElement, pTarget, pId, pClass){
    let ne = document.createElement(pElement);
    if (pId) ne.id = pId;
    if (pClass) ne.className = pClass;
    if(pTarget) pTarget.appendChild(ne);
    return ne;
  };
  this.CT=function(pContent, pTarget){
    let ne = document.createTextNode(pContent);
    pTarget.appendChild(ne);
    return ne;
  };

  this.getUID=function(pLen){
    let res = '';
    for (var i=0; i<pLen; i++) {
      let nAscii = parseInt(Math.random()*26+97);
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

  this.playSound=function (pSound){
    let oReturn = this;
    if (pSound == undefined)
      oReturn = (!this.mute && this.userSounds && typeof pSound == 'string' && pSound.trim() != '');
    else if (typeof pSound == 'boolean')
      this.mute = pSound;
    else if(!this.mute && this.userSounds && typeof pSound == 'string' && pSound.trim() != ''){
      let soundEle = (this.soundMap.get(pSound.trim().toLowerCase()) ?? ["",[]]);
      let vibrate = soundEle[1];
      pSound = soundEle[0];
      if (pSound.trim() != ''){
        if (this.userVibrate)
          window.navigator.vibrate(vibrate);
        else new Audio(pSound.startsWith('../') || pSound.startsWith('./') || pSound.startsWith('/') ? pSound : '../sounds/' + pSound).play();
      }
    }
    return oReturn;
  };

  //Snackbar
  //https://www.michaelmickelson.com/js-snackbar/
  //status: success,error,warning,info
  //icon  : exclamation,question,add or any charater
  //position
  //Value	Position
  //"tl"	Top-Left
  //"tc" or "tm"	Top-Center
  //"tr"	Top-Right
  //"bl"	Bottom-Left
  //"bc" or "bm"	Bottom-Center
  //"br"	Bottom-Right
  this.snackBar=function(pMessage, pStatus, pIcon, pPosition, pTimeout){
    if (pMessage !== null && pMessage != undefined && pMessage.trim() != '')
      this.playSound(pStatus);
      SnackBar({
          message: pMessage.trim(),
          status: ((pStatus ?? '').trim() == '' ? 'info' : pStatus),
          icon: (pIcon ?? '').trim(),
          position: ((pPosition ?? '').trim() == '' ? 'tr' : pPosition),
          timeout: (pTimeout ?? 4000), // ms
          //dismissible: false,
          container: window.document.body
      });
    return this;
  };

  this.startVocal=function(){
    if (this.speechRecognition !== null && this.speechRecognition != undefined)
      this.speechRecognition.start();
    return this;
  };
  this.abortVocal=function(){
    if (this.speechRecognition !== null && this.speechRecognition != undefined)
      this.speechRecognition.abort();
    return this;
  };
  this.stopVocal=function(){
    if (this.speechRecognition !== null && this.speechRecognition != undefined)
      this.speechRecognition.stop();
    return this;
  };
  this.hasVocal=function(){
    return (this.userVocal && this.isChrome && this.speechRecognition !== null && this.speechRecognition != undefined);
  };

  this.notifyMessage=function(pTitle,pBody){
    try{
      if('serviceWorker' in navigator) {
        Notification.requestPermission(permission => {
          if (permission === 'granted'){
            //console.log("Notification - Permission GRANTED!");
            //tag: servono tag diversi altrimenti sostituisce il contenuto della notifica precedente senza segnalarla
            var title = (typeof pTitle == 'string' && pTitle.trim() != '' ? pTitle.trim() : "MaDeX notifier");
            let notificationData = {
                  body: (typeof pBody == 'string' && pBody.trim() != '' ? pBody.trim() : "Ci sono nuove notifiche"),
                  tag: "madexNotifier_" + this._getDateTimeString("M"), // es. MISSIONI, QUALITA... stessa delle categorie delle notifiche
                  icon: (this._darkMode() ? "../images/rv_notify_dark.ico" : "../images/rv_notify_light.ico"),
                  badge: "../images/rv_notify_badge.png",
                  //,data: { url: "url_to_call" }
                  //,actions: [{action: "open_url", title: "Visualizzza"}]
            };
            //https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
            navigator.serviceWorker.ready.then( function( registration ){
              registration.showNotification( title, notificationData );
            } );
          }
          else{
            console.log("MaDeX: Notification - Permission was not granted.");
            this.snackBar("Notification - Permission was not granted.",'error','!','');
          }
        });
      }
    } catch (err){
      console.log("MaDeX: Errore in invio notifica: " + err);
      this.snackBar("Errore in invio notifica",'error','!','');
    }
    return this;
  };
//---End function

//---Instanciate MaDeX engine
  console.log('MXLMaDeXib: starting engine...');
  if (!this.swLoaded) MXLib = this;
  if (this.swLoaded)
    console.log('MaDeX: engine is already running!');
  else if (window.location.protocol != 'file:' && 'serviceWorker' in navigator) {
    console.log('MaDeX: load service worker...');
    // Service workers are supported. Use them.
    window.addEventListener('load', function () {
      console.log('MaDeX: window loaded');
      // Wait for registration to finish before dropping the <script> tag.
      // Otherwise, the browser will load the script multiple times,
      // potentially different versions.
      var serviceWorkerUrl = 'sw.js?v=' + MXLib.swVersion;
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
          console.log('MaDeX: SW error!', reg);
        });

//---DISATTIVATO: non funziona l'update e scatta sempre il timeout
      if (true) MXLib._init();
      else setTimeout(() => {
        if (!MXLib.swLoaded) {
          console.log('MaDeX: failed to load app from service worker. Falling back to plain <script> tag');
          MXLib._init();
        }
      }, 4000);
    });
  } 
  else {
    console.log('MaDeX: service workers not supported');
    // Service workers not supported. Just drop the <script> tag.
    MXLib._init();
  }
};
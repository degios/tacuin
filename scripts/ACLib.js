window.ACLib=new(function(){

//---Start initialize
  this.init=function(){
    this.loadFile('styles/material.css',true, 
      () => this.loadFile('scripts/material.min.js',true,
        () => this.loadFile('styles/ACLib.css', true,
          () => this.load())));
  }
  this.load=function(){
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
    fltBtnHTML += '  <span class="mdc-fab__icon material-symbols-outlined">list_alt</span>';
    fltBtnHTML += '</button>';
    fltBtnDiv.innerHTML = fltBtnHTML;

    this.loadMaterial();
  }
  this.loadMaterial=function(){
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
  }
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
        oDocument.body.appendChild(fileEle);
        break;
      case 'css':
        fileEle = oDocument.createElement("link");
        fileEle.href = pFile;
        fileEle.type = 'text/css';
        fileEle.rel = 'stylesheet';
        oDocument.getElementsByTagName('head')[0].append(fileEle);
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
        oDocument.body.appendChild(fileEle);
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
  }
//---End function
});
let geoCallback = null;

export function createElement(pElement, pTarget, pId, pClass){
    let ne = document.createElement(pElement);
    if (pId) ne.id = pId;
    if (pClass) ne.className = pClass;
    if(pTarget) pTarget.appendChild(ne);
    return ne;
}
export function createTextNode(pContent, pTarget){
    let ne = document.createTextNode(pContent);
    pTarget.appendChild(ne);
    return ne;
};
export function getUID(pLen = 5){
    let res = '';
    for (var i=0; i<pLen; i++) {
        let nAscii = parseInt(Math.random()*26+97);
        res = res + String.fromCharCode(nAscii);
    }
    return (res);
}
export function loadFile(pFile, pAsync = true, pCallback, pType){
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
}
export function addDaysToDate(pDate,pDays){
    if(typeof pDate == 'number'){
    pDays = pDate;
    pDate = new Date();
    }
    return new Date(pDate.setDate(pDate.getDate() + (parseInt(pDays) || 0)));
}
export function padLNumber(pNumber,pLength) {
    let norm = Math.floor(Math.abs(pNumber));
    let filler = "0";
    pLength = (pLength === null || pLength == undefined || typeof pLength != 'number' || pLength < 1 ? 2 : Math.floor(Math.abs(pLength)));
    norm = filler.repeat(pLength) + norm;
    return norm.substr(pLength * -1);
}
export function getDateString(pDate){
    var strDate = '';
    if (typeof pDate == 'boolean')
        pDate = new Date();
    if (pDate !== null && pDate != undefined){
        strDate += pDate.getFullYear().toString();
        strDate += '-' + padLNumber(pDate.getMonth()+1);
        strDate += '-' + padLNumber(pDate.getDate());
    }
    return strDate;
}
export function getTimeString(pDate,pSeconds){
    var strTime = '';
    if (typeof pDate == 'boolean' || typeof pDate == 'string'){
      pSeconds = pDate;
      pDate = new Date();
    }
    if (pDate !== null && pDate != undefined){
      if (typeof pDate == 'number')
        pDate = new Date(pDate);
      strTime  = padLNumber(pDate.getHours());
      strTime += ":" + padLNumber(pDate.getMinutes());
      if (pSeconds) strTime += ":" + ((typeof pSeconds == 'string' && pSeconds.trim().toLowerCase() == 'm') ? padLNumber(pDate.getMilliseconds(),3): padLNumber(pDate.getSeconds()) );
    }
    return strTime;
}
export function getDateTimeString(pDate,pSeconds){
    var strDate = '';
    if (typeof pDate == 'boolean' || typeof pDate == 'string'){
      pSeconds = pDate;
      pDate = new Date();
    }
    if (pDate !== null && pDate != undefined){
      if (typeof pDate == 'number')
        pDate = new Date(pDate);
      strDate  = getDateString(pDate);
      strDate += " ";
      strDate += getTimeString(pDate,pSeconds);
    }
    return strDate;
}
export function removeHTMLTags(pHTMLString){
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(pHTMLString, 'text/html');
    // Extract text content
    const textContent = doc.body.textContent || "";
    // Trim whitespace
    return textContent.trim();
}
export function capitalize(pString){
    return (pString !== null && pString != undefined ? pString.trim().charAt(0).toUpperCase() + pString.trim().toLowerCase().slice(1) : '');
}
export function formatSizeUnits(pBytes){
    if      (pBytes >= 1073741824) { pBytes = (pBytes / 1073741824).toFixed(2) + " GB"; }
    else if (pBytes >= 1048576)    { pBytes = (pBytes / 1048576).toFixed(2) + " MB"; }
    else if (pBytes >= 1024)       { pBytes = (pBytes / 1024).toFixed(2) + " KB"; }
    else if (pBytes > 1)           { pBytes = pBytes + " bytes"; }
    else if (pBytes == 1)          { pBytes = pBytes + " byte"; }
    else                           { pBytes = "0 bytes"; }
    return pBytes;
}
export function getBlankBase64Image(){
    return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
}
export function getCurrentGeoPosition(pCallback){
    if (navigator.geolocation){
      geoCallback = pCallback;
      navigator.geolocation.getCurrentPosition(getCurrentPosition);
      //console.log('Geolocation supported');
    }
    else console.log('Geolocation is not supported by this browser');
    return this;
}
async function getCurrentPosition(pPosition){
    //console.log('getCurrentPosition: ',pPosition);
    let urlGeo = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + pPosition.coords.latitude + "&lon=" + pPosition.coords.longitude + "&zoom=18&addressdetails=1";
    fetch(urlGeo,{
        method: "GET"
        })
        .then(response => response.json())
        .then(jsonGeo => {
            //console.log('getCurrentPosition',jsonGeo);

            // Aggiungo un nuovo elemento al json
            jsonGeo.location = '';
            if (jsonGeo.address.village != null)
            jsonGeo.location = jsonGeo.address.village;
            if (jsonGeo.address.town != null)
            jsonGeo.location = jsonGeo.address.town;
            if (jsonGeo.address.city != null)
            jsonGeo.location = jsonGeo.address.city;
            
            if (geoCallback !== null && geoCallback != undefined && typeof geoCallback == 'function')
                geoCallback(jsonGeo);
        });
}

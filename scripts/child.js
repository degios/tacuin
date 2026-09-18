const child = function(){
    let uid;
    let childDiv;
    function create(){
        uid = main.mxUID(5);
        childDiv = main.mxCreateElement("div",window.main.mainDiv,uid + "_tplChild");
        main.mxCreateTextNode("[" + window.main.cntChild() + "] New child with uid " + uid, main.mxCreateElement("H2",childDiv));
        return this;
    }
    function destroy(){
        childDiv.remove();
    }
    function getChildDiv() { return childDiv; }
    function getUID(){ return uid; }
    return {
        create,
        destroy,
        getChildDiv,
        getUID
    }
}

export { child };
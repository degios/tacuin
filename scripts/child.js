const child = function(){
    let uid;
    let childDiv;
    function create(){
        uid = main.madexUID(5);
        childDiv = main.madexCE("div",window.main.mainDiv,uid + "_tplChild");
        main.madexCT("[" + window.main.cntChild() + "] New child with uid " + uid, main.madexCE("H2",childDiv));
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
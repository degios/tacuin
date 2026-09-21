const child = function(pParentId){
    let ctrl;
    let ctrlid;
    let parentId = pParentId;

    function create(pContentCtrl){
        ctrlid = madex.getUID(5);
        ctrl = madex.createElement("div",pContentCtrl,ctrlid + "_tplChild");
        ctrl.style.position = "absolute";
        madex.createTextNode("[" + madex.cntChild() + "] New child with id " + ctrlid, madex.createElement("H2",ctrl));

        let ctrlHTML = '<hr>';
        ctrlHTML += '<a href="javascript:madex.getChild(' + "'" + parentId + "'" + ').addChild();">Accoda child</a>'
        ctrlHTML += '<a href="javascript:madex.getChild(' + "'" + parentId + "'" + ').delChild();">Rimuovi ultimo child</a>'
        ctrl.innerHTML +=  ctrlHTML;
    }
    function destroy(){
        ctrl.remove();
    }
    function getCtrl() { return ctrl; }
    function getCtrlId(){ return ctrlid; }

    return {
        create,
        destroy,
        getCtrl,
        getCtrlId
    }
}

export { child };
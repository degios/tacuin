import { child } from './child.js';

const children = function(){
    let ctrl;
    let ctrlid;

    function create(pContentCtrl){
        window.mxChildren = this;

        ctrlid = madex.getUID();
        ctrl = madex.createElement('div',pContentCtrl,ctrlid + "_tplChildren");
        let ctrlHTML = '';
        ctrlHTML += '<a href="javascript:madex.getChild(' + "'" + ctrlid + "'" + ').addChild();">Accoda child</a>'
        ctrl.innerHTML = ctrlHTML;
    }
    function destroy(){
        ctrl.remove();
        window.mxChildren = null;
    }
    function getCtrl() { return ctrl; }
    function getCtrlId(){ return ctrlid; }

    function addChild(){
        madex.pushChild(new child(ctrlid));
    }
    function delChild(){
        madex.popChild();
    }

    return {
        create,
        destroy,
        getCtrl,
        getCtrlId,

        addChild,
        delChild
    }
}

export { children };
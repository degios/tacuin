console.log('Main: load')

import { madex } from '../madex/madex.js'
import { children } from './children.js'


// Image generator
// https://www.pwabuilder.com/imageGenerator
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Define_app_icons

const main = (function(){
    let mainDiv
    let childs = []

    function _initCallback(){
        madex.loader(true)
        _init()
    }
    function _init(){
        if (madex.params.config && madex.params.config.trim() != ''){
            madex.params.loadCallback = _loadCallback;
            madex.params.networkCallback = _networkCallback;
            madex.params.loaderCallback = _loaderCallback;

            //madex.params.dark_mode = true

            madex.create()
        }
     }
     function lockPortrait(){
        document.documentElement.requestFullscreen()
            .then(() => {
                screen.orientation.lock("portrait");
                //screen.orientation.unlock();
            })
            .catch((err) => {
                console.log('Attivazione full-screen non riustita!')
            })
     }
     function _loadCallback(){
        let ctrl,input,video,audio,objectUrl,rateSlider,rateValue,player

        // Per bloccare in portrait
/*
        ctrl = madex.createElement('button',madex.getContentDiv(),"btnFullScreen")
        ctrl.innerText = "Lock portrait"
        ctrl.onclick = () => { lockPortrait() }
*/
/*
        var param = {
            type: "touchstart",
            canBubble: true,
            cancelable: true,
            view: window,
            detail: 0,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            scale: 0,
            rotation: 0,
            touchItem: 0
        }
        var event = document.createEvent("TouchEvent");
        console.log(event)
        event.initTouchEvent(
        param.touchItem,
        param.touchItem,
        param.touchItem,
        param.type,
        param.view,
        param.screenX,
        param.screenY,
        param.clientX,
        param.clientY,
        param.ctrlKey,
        param.altKey,
        param.shiftKey,
        param.metaKey
        )
        ctrl.dispatchEvent(event)
*/
//ctrl = document.getElementById("btnFullScreen")
/*
const mioTouch = new Touch({
  identifier: Date.now(),
  target: ctrl,
  clientX: ctrl.offsetLeft + (ctrl.offsetWidth / 2),
  clientY: ctrl.offsetTop + (ctrl.offsetHeight / 2),
  radiusX: 2.5,
  radiusY: 2.5,
  rotationAngle: 10,
  force: 0.5,
});
console.log(mioTouch,ctrl.offsetLeft + (ctrl.offsetWidth / 2))
const eventoTocco = new TouchEvent('touchstart', {
  cancelable: true,
  bubbles: true,
  touches: [mioTouch],
  targetTouches: [mioTouch],
  changedTouches: [mioTouch],
  shiftKey: false // puoi mappare anche tasti modificatori se necessario
});
ctrl.dispatchEvent(eventoTocco)
*/

        /*
        //Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
        //Serve creare un elemento fittizio su cui cliccare
        document.documentElement.requestFullscreen()
            .then(() => {
                screen.orientation.lock("portrait");
                //screen.orientation.unlock();
            })
            .catch((err) => {
                console.log('Attivazione full-screen non riustita!')
            })
        */

        const parsedUrl = new URL(window.location)

        ctrl = madex.createElement('p',madex.getContentDiv(),"tplNetwork")
        //ctrl.style.position = "absolute"
        ctrl.innerHTML = 'Application on-line'
        
        if (!parsedUrl.searchParams.get('scope'))
            madex.pushChild(new children())
        else switch((parsedUrl.searchParams.get('scope') ?? '').trim()){
            case 'videoplayer':
                ctrl = madex.createElement('p',madex.getContentDiv())
                ctrl.innerHTML = '<hr><p>Video player</p>'
                //ctrl.innerHTML += '<iframe id="my-youtube" width="560" height="315" src="https://www.youtube.com/embed/hst2N9sxY0Q?si=67DMEf-dDfAR6BGi&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
                ctrl.innerHTML += '<input type="file" id="videoInput" accept="video/*"><br><br>'
                ctrl.innerHTML += '<video id="videoPlayer" width="560" height="315" style="width: 99%;" controls></video><br>'
                ctrl.innerHTML += '<label for="rate">Playback rate <span id="rate-value">1.0</span></label><br>'
                ctrl.innerHTML += '<input type="range" id="rate" name="rate" min="0" max="4" value="1" step=".2" style="width: 99%;"/><br>'

                // Load local file
                input = document.getElementById('videoInput')
                video = document.getElementById('videoPlayer')
                objectUrl = null
                input.addEventListener('change', function(event) {
                    const file = event.target.files[0]
                    if (!file) return

                    // Revoke the old object URL to free up memory
                    if (objectUrl)
                        URL.revokeObjectURL(objectUrl)

                    // Create a new local blob URL for the selected file
                    objectUrl = URL.createObjectURL(file)
                    video.src = objectUrl
                })

                // Change playbackRate
                rateSlider = document.getElementById("rate")
                rateValue = document.getElementById("rate-value")
                player = document.getElementById("videoPlayer")

                rateSlider.addEventListener("input", () => {
                    player.playbackRate = rateSlider.value
                    rateValue.textContent = parseFloat(rateSlider.value)
                })

                madex.getContentDiv().style.display="block"
                break
            case 'audioplayer':
                ctrl = madex.createElement('p',madex.getContentDiv())
                ctrl.innerHTML = '<hr><p>Audio player</p>'
                //ctrl.innerHTML += '<iframe id="my-youtube" width="560" height="315" src="https://www.youtube.com/embed/hst2N9sxY0Q?si=67DMEf-dDfAR6BGi&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
                ctrl.innerHTML += '<input type="file" id="audioInput" accept="video/*"><br><br>'
                ctrl.innerHTML += '<audio id="audioPlayer" width="560" height="315" style="width: 99%;" controls></audio><br>'
                ctrl.innerHTML += '<label for="rate">Playback rate <span id="rate-value">1.0</span></label><br>'
                ctrl.innerHTML += '<input type="range" id="rate" name="rate" min="0" max="4" value="1" step=".1" style="width: 99%;"/><br>'

                // Load local file
                input = document.getElementById('audioInput')
                audio = document.getElementById('audioPlayer')
                objectUrl = null
                input.addEventListener('change', function(event) {
                    const file = event.target.files[0]
                    if (!file) return

                    // Revoke the old object URL to free up memory
                    if (objectUrl)
                        URL.revokeObjectURL(objectUrl)

                    // Create a new local blob URL for the selected file
                    objectUrl = URL.createObjectURL(file)
                    audio.src = objectUrl
                })

                // Change playbackRate
                rateSlider = document.getElementById("rate")
                rateValue = document.getElementById("rate-value")
                player = document.getElementById("audioPlayer")

                rateSlider.addEventListener("input", () => {
                    player.playbackRate = rateSlider.value
                    rateValue.textContent = parseFloat(rateSlider.value)
                })

                madex.getContentDiv().style.display="block"
                break
            case 'tuner':
                madex.loadFile("madex/madex_tuner.js",true,() => _tunerCallback())
                break
            default:
                // searchParams.get() will properly handle decoding the values.
                let sharedTarget = {}
                sharedTarget.title  = (parsedUrl.searchParams.get('title') ?? '')
                sharedTarget.text = (parsedUrl.searchParams.get('text') ?? '')
                sharedTarget.url = (parsedUrl.searchParams.get('url') ?? '')
                sharedTarget.url = (sharedTarget.text.trim() != '' && sharedTarget.url.trim() == '' ? sharedTarget.text : sharedTarget.url)

                if ((sharedTarget.title ?? '').trim() != '' && (sharedTarget.url ?? '').trim() != ''){
                    let ctrl = madex.createElement('div',madex.getContentDiv(),"tplSharedTarget")
                    //ctrl.style.position = "absolute"
                    ctrl.innerHTML = '<a href="' + sharedTarget.url + '" target="_blank">' + sharedTarget.title + '</a>'
                }

                madex.getContentDiv().style.display="block"
                break
        }
        madex.loader(false)
     }
     function _networkCallback(pState){
        let networkState = 'Application'
        switch(pState){
            case 'on':
                networkState += ' on-line'
                break
            case 'off':
                networkState += ' off-line'
                break
            case 'no':
                networkState += ' without-line'
                break
            case 'err':
                networkState += ' - unable to check the network status'
                break
        }
        window.document.getElementById("tplNetwork").innerHTML = networkState
     }
     function _loaderCallback(){ 
        console.log('Main: loaderCallback') 
     }
     function _tunerCallback(pDetectNote){ 
        console.log('Main: tunerCallback') 
        if (pDetectNote){
            document.getElementById("tunerNote").innerText = (pDetectNote.cents >= 0 ? '' : '>>> ') +  pDetectNote.note + pDetectNote.octave + (pDetectNote.cents >= 0 ? ' <<<' : '')
            document.getElementById("tunerCents").innerText = pDetectNote.cents
        }
        else{
            tuner.create(_tunerCallback)

            let ctrl = madex.createElement('div',madex.getContentDiv())
            ctrl.innerHTML = '<hr><p>Tuner</p>'
            ctrl.innerHTML += '<button onClick="javascript:tuner.start();" style="width: 150px;">Start</button>'
            ctrl.innerHTML += '<button onClick="javascript:tuner.stop();" style="width: 150px;">Stop</button>'
            ctrl.innerHTML += '<h2 id="tunerNote"></h2>'
            ctrl.innerHTML += '<h3 id="tunerCents"></h3>'
            madex.getContentDiv().style.display="block"
            //tuner.start()
        }
    }

    madex.init("scripts/config.js",_initCallback)
})()
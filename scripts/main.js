console.log('Main: load')

import { madex } from '../madex/madex.js'
import { children } from './children.js'

window.main = (function(){
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
     function _loadCallback(){
        const parsedUrl = new URL(window.location)
        let ctrl,input,video,audio,objectUrl,rateSlider,rateValue,player

        ctrl = madex.createElement('p',madex.getContentDiv(),"tplNetwork")
        //ctrl.style.position = "absolute"
        ctrl.innerHTML = 'Application on-line'
        
        if (!parsedUrl.searchParams.get('scope'))
            madex.pushChild(new children())
        else switch((parsedUrl.searchParams.get('scope') ?? '').trim()){
            case 'videoplayer':
                ctrl = madex.createElement('p',madex.getContentDiv())
                ctrl.innerHTML = '<p>Video player</p>'
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
                ctrl.innerHTML = '<p>Video player</p>'
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
     function _loaderCallback(){ console.log('Main: loaderCallback') }
     function _tunerCallback(pDetectNote){ 
        console.log('Main: tunerCallback') 
        if (pDetectNote){
            document.getElementById("tunerNote").innerText = (pDetectNote.cents >= 0 ? '' : '>>> ') +  pDetectNote.note + pDetectNote.octave + (pDetectNote.cents >= 0 ? ' <<<' : '')
            document.getElementById("tunerCents").innerText = pDetectNote.cents
        }
        else{
            tuner.create(_tunerCallback)

            let ctrl = madex.createElement('div',madex.getContentDiv())
            ctrl.innerHTML = '<button onClick="javascript:tuner.start();" style="width: 150px;">Start</button>'
            ctrl.innerHTML += '<button onClick="javascript:tuner.stop();" style="width: 150px;">Stop</button>'
            ctrl.innerHTML += '<h2 id="tunerNote"></h2>'
            ctrl.innerHTML += '<h3 id="tunerCents"></h3>'
            madex.getContentDiv().style.display="block"
            //tuner.start()
        }
    }

    madex.init("scripts/config.js",_initCallback)
})()
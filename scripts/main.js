console.log('Main: load');

import { madex } from '../madex/madex.js';
import { children } from './children.js';

window.main = (function(){
    let mainDiv;
    let childs = [];

    function _initCallback(){
        _init();
    }
    function _init(){
        if (madex.params.config && madex.params.config.trim() != ''){
            madex.params.title = "Personal expense monitor";
            madex.params.loadCallback = _loadCallback;
            madex.params.networkCallback = _networkCallback;
            madex.params.service_worker.src = "sw.js";
            madex.params.service_worker.version = "20260909T000000"; // 20260909T000000
            madex.params.manifest.id = "tacuin/v1";
            madex.params.manifest.name = "Tacuin";
            madex.params.manifest.name_localized = {};
            madex.params.manifest.short_name = "Tacuin";
            madex.params.manifest.short_name_localized = {};
            madex.params.manifest.description = "A personal expense monitoring";
            madex.params.manifest.description_localized = {};
            madex.params.manifest.theme_color = "#13A29A";

            madex.params.manifest.shortcuts = [
                {
                    "name": "Apri l'accordatore",
                    "name_localized": {},
                    "short_name": "Accordatore",
                    "short_name_localized": {},
                    "description": "Vai all'accordatore",
                    "description_localized": {},
                    "url": config.startURL + "?scope=tuner",
                    "icons": [],
                },
                {
                    "name": "Apri il metronomo",
                    "name_localized": {},
                    "short_name": "Metronomo",
                    "short_name_localized": {},
                    "description": "Vai al metronomo",
                    "description_localized": {},
                    "url": config.startURL + "?scope=metronome",
                    "icons": [],
                },
                {
                    "name": "Apri il video player",
                    "name_localized": {},
                    "short_name": "Video player",
                    "short_name_localized": {},
                    "description": "Vai al video player",
                    "description_localized": {},
                    "url": config.startURL + "?scope=videoplayer",
                    "icons": [],
                },
                {
                    "name": "Apri l'audio player",
                    "name_localized": {},
                    "short_name": "Audio player",
                    "short_name_localized": {},
                    "description": "Vai all'audio player",
                    "description_localized": {},
                    "url": config.startURL + "?scope=audioplayer",
                    "icons": [],
                },
            ];
        }

        madex.create();
     }
     function _loadCallback(){
        const parsedUrl = new URL(window.location);
        let ctrl;

        switch((parsedUrl.searchParams.get('scope') ?? '').trim()){
            case 'videoplayer':
                ctrl = madex.createElement('p',madex.getContentDiv());
                ctrl.innerHTML = '<p>Video player</p>';
                //ctrl.innerHTML += '<iframe id="my-youtube" width="560" height="315" src="https://www.youtube.com/embed/hst2N9sxY0Q?si=67DMEf-dDfAR6BGi&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
                ctrl.innerHTML += '<input type="file" id="videoInput" accept="video/*"><br><br>'
                ctrl.innerHTML += '<video id="videoPlayer" width="560" height="315" controls></video><br>'
                ctrl.innerHTML += '<label for="rate">Playback rate <span id="rate-value">1.0</span></label><br>'
                ctrl.innerHTML += '<input type="range" id="rate" name="rate" min="0" max="4" value="1" step=".2" /><br>'

                // Load local file
                const input = document.getElementById('videoInput');
                const video = document.getElementById('videoPlayer');
                let objectUrl = null;
                input.addEventListener('change', function(event) {
                    const file = event.target.files[0];
                    if (!file) return;

                    // Revoke the old object URL to free up memory
                    if (objectUrl) {
                        URL.revokeObjectURL(objectUrl);
                    }

                    // Create a new local blob URL for the selected file
                    objectUrl = URL.createObjectURL(file);
                    video.src = objectUrl;
                });

                // Change playbackRate
                const rateSlider = document.getElementById("rate");
                const rateValue = document.getElementById("rate-value");
                const videoPlayer = document.getElementById("videoPlayer");

                rateSlider.addEventListener("input", () => {
                    videoPlayer.playbackRate = rateSlider.value;
                    rateValue.textContent = parseFloat(rateSlider.value);
                });
                break;
            default:
                // searchParams.get() will properly handle decoding the values.
                let sharedTarget = {};
                sharedTarget.title  = (parsedUrl.searchParams.get('title') ?? '');
                sharedTarget.text = (parsedUrl.searchParams.get('text') ?? '');
                sharedTarget.url = (parsedUrl.searchParams.get('url') ?? '');
                sharedTarget.url = (sharedTarget.text.trim() != '' && sharedTarget.url.trim() == '' ? sharedTarget.text : sharedTarget.url);

                if ((sharedTarget.title ?? '').trim() != '' && (sharedTarget.url ?? '').trim() != ''){
                    let ctrl = madex.createElement('div',madex.getContentDiv(),"tplSharedTarget");
                    //ctrl.style.position = "absolute";
                    ctrl.innerHTML = '<a href="' + sharedTarget.url + '" target="_blank">' + sharedTarget.title + '</a>';
                }
                break;
        }

        ctrl = madex.createElement('p',madex.getContentDiv(),"tplNetwork");
        //ctrl.style.position = "absolute";
        ctrl.innerHTML = 'Application on-line';

        madex.pushChild(new children());
     }
     function _networkCallback(pState){
        let networkState = 'Application';
        switch(pState){
            case 'on':
                networkState += ' on-line';
                break;
            case 'off':
                networkState += ' off-line';
                break;
            case 'no':
                networkState += ' without-line';
                break;
            case 'err':
                networkState += ' - unable to check the network status';
                break;
        }
        window.document.getElementById("tplNetwork").innerHTML = networkState;
     }

    madex.init("scripts/config.js",_initCallback);
    return {
        madex
    }
})();
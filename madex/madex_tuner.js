const tuner = (function(){
    const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    let NOTE_FREQUENCIES = {}

    let isListening = false;
    let volume = 0;
    let detectNote = {};
    let audioContextRef = {};
    let analyserRef = {};
    let streamRef = {};
    let animFrameRef = {};

    function _autoCorrelate(buf, sampleRate){
        let size = buf.length;
        let rms = 0;
        for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
        rms = Math.sqrt(rms / size);
        if (rms < 0.01) return -1;

        let r1 = 0, r2 = size - 1;
        const thresh = 0.2;
        for (let i = 0; i < size / 2; i++) {
        if (Math.abs(buf[i]) < thresh) { r1 = i; break; }
        }
        for (let i = 1; i < size / 2; i++) {
        if (Math.abs(buf[size - i]) < thresh) { r2 = size - i; break; }
        }

        buf = buf.slice(r1, r2);
        size = buf.length;

        const c = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - i; j++) {
            c[i] += buf[j] * buf[j + i];
        }
        }

        let d = 0;
        while (c[d] > c[d + 1]) d++;

        let maxVal = -1, maxPos = -1;
        for (let i = d; i < size; i++) {
        if (c[i] > maxVal) { maxVal = c[i]; maxPos = i; }
        }

        let t0 = maxPos;
        const x1 = c[t0 - 1], x2 = c[t0], x3 = c[t0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2;
        if (a) t0 = t0 - b / (2 * a);

        return sampleRate / t0;
    }
    function _getClosestNote(freq) {
        if (!freq || freq < 20 || freq > 5000) return null;
        const noteNum = 12 * (Math.log2(freq / 440)) + 49;
        const rounded = Math.round(noteNum);
        const cents = Math.round((noteNum - rounded) * 100);
        const octave = Math.floor((rounded + 8) / 12);
        const noteIndex = ((rounded + 8) % 12 + 12) % 12;
        return {
            note: NOTES[noteIndex],
            octave,
            cents,
            frequency: freq,
            fullNote: `${NOTES[noteIndex]}${octave}`,
        };
    }

    function create(){
        for (let octave = 0; octave <= 8; octave++) {
            NOTES.forEach((note, i) => {
                const noteNum = octave * 12 + i - 9;
                NOTE_FREQUENCIES[`${note}${octave}`] = 440 * Math.pow(2, (noteNum - 49) / 12);
            });
        }
    }
    async function start(){
        try {
            console.log('MaDeX-tuner: start')
            /*
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            */
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    streamRef.current = stream;

                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    audioContextRef.current = audioContext;
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 4096;
                    analyserRef.current = analyser;

                    const source = audioContext.createMediaStreamSource(stream);
                    source.connect(analyser);
                    //analyser.connect(audioContext.destination) // Connetti microfono con cuffie per sentire l'audio catturato

                    isListening = true;

                    const detect = () => {
                        console.log('detect')
                        const buf = new Float32Array(analyser.fftSize);
                        analyser.getFloatTimeDomainData(buf);

                        let rms = 0;
                        for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
                        rms = Math.sqrt(rms / buf.length);
                        volume = (Math.min(rms * 5, 1));

                        const freq = _autoCorrelate(buf, audioContext.sampleRate);
                        if (freq > 0) {
                            const noteInfo = _getClosestNote(freq);
                            if (noteInfo) {
                                detectNote = noteInfo;
                                console.log(detectNote)
                            }
                        }

                        animFrameRef.current = requestAnimationFrame(detect);
                    };
                    detect();
                })
        } catch (err) {
            console.error("MaDeX-tuner: microphone access denied:", err);
        }
    }
    function stop(){
        //if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (streamRef?.current) streamRef.current.getTracks().forEach((t) => t.stop());
        if (audioContextRef?.current) audioContextRef.current.close();
        isListening = false;
        //setIsListening(false);
        //setDetectedNote(null);
        //setVolume(0);
    }

    return {
        create,
        start,
        stop
    }
})();
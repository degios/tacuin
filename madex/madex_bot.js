const detectBot = (function(){
    const detectors = {
        webDriver: navigator.webdriver, // Checks if the browser is controlled by automation
        headlessBrowser: navigator.userAgent.includes('Headless'), // Detects headless browsers
        noLanguages: (navigator.languages?.length || 0) === 0, // Checks if no languages are set, uncommon for regular users
        inconsistentEval: _detectInconsistentEval(), // Check for inconsistent eval lengths
        domManipulation: document.documentElement
            .getAttributeNames()
            .some((attr) => ['selenium', 'webdriver', 'driver'].includes(attr)), // Looks for attributes commonly added by automation tools
    }

    function _detectInconsistentEval() {
        let length = eval.toString().length
        let userAgent = navigator.userAgent.toLowerCase()
        let browser

        if (userAgent.indexOf('edg/') !== -1) {
            browser = 'edge'
        } else if (userAgent.indexOf('trident') !== -1 || userAgent.indexOf('msie') !== -1) {
            browser = 'internet_explorer'
        } else if (userAgent.indexOf('firefox') !== -1) {
            browser = 'firefox'
        } else if (userAgent.indexOf('opera') !== -1 || userAgent.indexOf('opr') !== -1) {
            browser = 'opera'
        } else if (userAgent.indexOf('chrome') !== -1) {
            browser = 'chrome'
        } else if (userAgent.indexOf('safari') !== -1) {
            browser = 'safari'
        } else {
            browser = 'unknown'
        }

        if (browser === 'unknown') return false

        return (
            (length === 33 && !['chrome', 'opera', 'edge'].includes(browser)) ||
            (length === 37 && !['firefox', 'safari'].includes(browser)) ||
            (length === 39 && !['internet_explorer'].includes(browser))
        )
    }    

    // 1. Stores the detection results and the final verdict
    const detections = {};
    let verdict = { bot: false };

    // 2. Iterates over the detectors and sets the verdict to true if any of them detects bot-like activity
    for (const detectorName in detectors) {
        const detectorResult = detectors[detectorName];
        detections[detectorName] = { bot: detectorResult };
        if (detectorResult) {
            verdict = { bot: true }; // Sets the verdict to true at the first detection of bot-like activity
        }
    }

    // 3. Returns the detection results and the final verdict
    return { detections, verdict };
})();

export { detectBot };
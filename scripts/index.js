import { detect } from '../madex/madex_bot.js';
import { loadFile } from '../madex/madex_utils.js';

if (detect.verdict.bot)
    window.document.body.innerText = "Bot detected!";
else loadFile("scripts/main.js",true,null,"module");


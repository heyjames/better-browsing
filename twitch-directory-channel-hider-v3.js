// ==UserScript==
// @name         Twitch Channel Hider
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Hides channels on Twitch including from "Recommended Channels"
// @author       You
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// ==/UserScript==

// Blocked channels (case-insensitive)
const CHANNELS = [
  "$$$$$$$$$$$$"
];

const Stylesheet = function() {
    // Create query selectors for each channel
    // Takes and array argument and returns an object with properties containing CSS selectors
    function _createSelectors(CHANNELS) {
        let overlay = "";
        let thumbnail = "";
        //let info = "";
        let recommended = "";

        for (let i=0; i<CHANNELS.length; i++) {
            // Ignore template entries to add users to array easier
            if (CHANNELS[i] === "$$$$$$$$$$$$") continue;

            // Create channel-specific selectors
            overlay += `article[data-a-id="card-${CHANNELS[i].toLowerCase()}"]::before,`;
            thumbnail += `article[data-a-id="card-${CHANNELS[i].toLowerCase()}"] > *,`;
            //thumbnail += `article[data-a-id="card-${CHANNELS[i].toLowerCase()}"]>:nth-child(2),`;
            //info += `article[data-a-id="card-${CHANNELS[i].toLowerCase()}"]>:nth-child(1),`;
            recommended += `a[href="/${CHANNELS[i]}"],`;

            // Remove last comma
            if (i === (CHANNELS.length-1)) {
                overlay = overlay.slice(0, -1);
                thumbnail = thumbnail.slice(0, -1);
                //info = info.slice(0, -1);
                recommended = recommended.slice(0, -1);
            }
        }

        return { overlay, thumbnail, recommended };
    }

    // Get complete CSS from applying query selectors
    // Takes an object containing CSS query selector strings and returns complete CSS
    function _createCSS({ overlay, thumbnail, info="", recommended }) {
        return `
:root {
    --time-transition-in: 10s;
    --time-transition-out: 0.1s;
}

${overlay} {
    content: "X";
    color: #d97d50;
    font-weight: bold;
    font-size: 3em;
    position: relative;
    top: 70px;
    left: 140px;
    height: 0px;
}

${thumbnail} {
    visibility: hidden;
    /*opacity: 0;*/
}

/*${info} {
    visibility: hidden;
    /*opacity: 0 !important;*/

    -o-transition: var(--time-transition-out);
    -ms-transition: var(--time-transition-out);
    -moz-transition: var(--time-transition-out);
    -webkit-transition:var(--time-transition-out);
}*/

${recommended} {
    display: none !important;
    /*filter: blur(0.5em) invert(50%);
    opacity: 0.5;*/
}

/*
// Allow selectable, but blurred channel info
article[data-a-id^="card-"]>:nth-child(1):hover {
    opacity: 1 !important;
    -o-transition: var(--time-transition-in);
    -ms-transition: var(--time-transition-in);
    -moz-transition: var(--time-transition-in);
    -webkit-transition: var(--time-transition-in);
}*/
`;
    }

    // Generate the complete CSS string
    function generate() {
        const selectors = _createSelectors(CHANNELS);
        return _createCSS(selectors);
    }

    return { generate };
}();

(function() {
    'use strict';

    // Append HTML style element node to head
    const head = document.querySelector("head");
    const styleNode = document.createElement("style");
    styleNode.innerHTML = Stylesheet.generate();
    head.prepend(styleNode);
})();

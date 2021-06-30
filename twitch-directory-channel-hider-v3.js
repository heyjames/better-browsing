// ==UserScript==
// @name         Twitch Channel Hider
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Hides channels on Twitch including from "Recommended Channels"
// @author       You
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// ==/UserScript==

// Blocked channels (case-insensitive)
let CHANNELS = [
    "$$$$$$$$$$$$"
];

// Remove possible duplicates due to user error
CHANNELS = Array.from(new Set(CHANNELS));

const Stylesheet = function() {
    // Create query selectors for each channel
    // Takes and array argument and returns an object with properties containing CSS selectors
    function _createSelectors(CHANNELS) {
        let thumbnail = "";
        let recommended = "";
        let liveAndViewcount = "";
        let checkMark = "";

        for (let i=0; i<CHANNELS.length; i++) {
            // Ignore template entries to add users to array easier
            if (CHANNELS[i] === "$$$$$$$$$$$$") continue;

            // Create channel-specific selectors
            thumbnail += `article[class="InjectLayout-sc-588ddc-0 prioritized-signals-media-card sNBDP"] a[href^="/${CHANNELS[i]}"],`;
            recommended += `a[data-test-selector="recommended-channel"][href="/${CHANNELS[i]}"],`;
            liveAndViewcount += `a[data-a-target="preview-card-image-link"][href^="/${CHANNELS[i]}"]+div,`
            checkMark += `article[class="InjectLayout-sc-588ddc-0 prioritized-signals-media-card sNBDP"] a[href^="/${CHANNELS[i]}"]~div,`;

            // Remove last comma
            if (i === (CHANNELS.length-1)) {
                thumbnail = thumbnail.slice(0, -1);
                recommended = recommended.slice(0, -1);
                liveAndViewcount = liveAndViewcount.slice(0, -1);
                checkMark = checkMark.slice(0, -1);
            }
        }

        let strSelectorObj = { thumbnail, recommended, liveAndViewcount, checkMark };
        strSelectorObj = _addSpecificChannel("hasan", "^", strSelectorObj);

        return strSelectorObj;
    }

    function _addSpecificChannel(channel, selectorModifier="", { thumbnail, recommended, liveAndViewcount, checkMark }) {
        thumbnail += `,article[class="InjectLayout-sc-588ddc-0 prioritized-signals-media-card sNBDP"] a[href^="/${channel.toLowerCase()}"]`;
        recommended += `,a[data-test-selector="recommended-channel"][href${selectorModifier}="/${channel.toLowerCase()}"]`;
        liveAndViewcount += `,a[data-a-target="preview-card-image-link"][href${selectorModifier}="/${channel.toLowerCase()}"]+div`;
        checkMark += `,article[class="InjectLayout-sc-588ddc-0 prioritized-signals-media-card sNBDP"] a[href^="/${channel.toLowerCase()}"]~div`;

        return { thumbnail, recommended, liveAndViewcount, checkMark };
    }

    // Get complete CSS from applying query selectors
    // Takes an object containing CSS query selector strings and returns complete CSS
    function _createCSS({ thumbnail, recommended, liveAndViewcount, checkMark }) {
        return `
${thumbnail} {
    visibility: hidden;
}

${recommended}, ${liveAndViewcount}, ${checkMark} {
    display: none !important;
}
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

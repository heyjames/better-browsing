// ==UserScript==
// @name         Twitch Channel Hider
// @namespace    http://tampermonkey.net/
// @version      3.1
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
        let overlay = "";
        let thumbnail = "";
        let recommended = "";

        for (let i=0; i<CHANNELS.length; i++) {
            // Ignore template entries to add users to array easier
            if (CHANNELS[i] === "$$$$$$$$$$$$") continue;

            // Create channel-specific selectors
            overlay += `article[data-a-id="card-${CHANNELS[i].toLowerCase()}"]::before,`;
            thumbnail += `article[data-a-id="card-${CHANNELS[i].toLowerCase()}"]>*,`;
            recommended += `div[class="tw-relative tw-transition-group"] a[href="/${CHANNELS[i]}"],`;

            // Remove last comma
            if (i === (CHANNELS.length-1)) {
                overlay = overlay.slice(0, -1);
                thumbnail = thumbnail.slice(0, -1);
                recommended = recommended.slice(0, -1);
            }
        }

        let strSelectorObj = { overlay, thumbnail, recommended };
        strSelectorObj = _addSpecificChannel("elon", "^", strSelectorObj);

        return strSelectorObj;
    }

    function _addSpecificChannel(channel, selectorModifier="", { overlay, thumbnail, recommended }) {
        overlay += `,article[data-a-id${selectorModifier}="card-${channel.toLowerCase()}"]::before`;
        thumbnail += `,article[data-a-id${selectorModifier}="card-${channel.toLowerCase()}"]>*`;
        recommended += `,div[class="tw-relative tw-transition-group"] a[href${selectorModifier}="/${channel.toLowerCase()}"]`;

        return { overlay, thumbnail, recommended };
    }

    // Get complete CSS from applying query selectors
    // Takes an object containing CSS query selector strings and returns complete CSS
    function _createCSS({ overlay, thumbnail, recommended }) {
        return `
${overlay} {
    content: "X";
    color: #d97d50;
    font-weight: bold;
    font-size: 3em;
    position: relative;
    top: 70px;
    left: 146px;
    height: 0px;
}

${thumbnail} {
    visibility: hidden;
    height: 110px !important;
}

${recommended} {
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

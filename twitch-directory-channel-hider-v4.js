// ==UserScript==
// @name         Twitch Channel Hider
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Hides channels on Twitch including from "Recommended Channels"
// @author       You
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// ==/UserScript==

// Blocked channels (case-insensitive)
let CHANNELS = [
    "example_username_01"
];

let CHANNELS_MATCHING = [
    {"userna": "*"},
    {"examp": "^"}
];

// Remove possible duplicates due to user error
CHANNELS = Array.from(new Set(CHANNELS));

const Stylesheet = function() {
    // Create query selectors for each channel
    // Takes and array argument and returns an object with properties containing CSS selectors
    function _createSelectors(CHANNELS) {
        let thumbnail = "";
        let recommended = "";
        //let followed = "";
        //let host = "";

        for (let i=0; i<CHANNELS.length; i++) {
            // Ignore template entries to add users to array easier
            if (CHANNELS[i] === "$$$$$$$$$$$$") continue;

            // Create channel-specific selectors
            thumbnail += `a[class="ScCoreLink-sc-16kq0mq-0 eFqEFL tw-link"][href="/${CHANNELS[i].toLowerCase()}"],`;
            recommended += `a[data-test-selector="recommended-channel"][href="/${CHANNELS[i]}"],`;
            //followed += `a[data-test-selector="followed-channel"][href="/${CHANNELS[i]}"],`;
            //host += `a[data-a-target="preview-card-image-link"][href="/${CHANNELS[i]}"],`;

            // Remove last comma
            if (i === (CHANNELS.length-1)) {
                thumbnail = thumbnail.slice(0, -1);
                recommended = recommended.slice(0, -1);
                //followed = followed.slice(0, -1);
                //host = host.slice(0, -1);
            }
        }

        let strSelectorObj = { thumbnail, recommended };
        CHANNELS_MATCHING.forEach(c => {
            let channelString = Object.keys(c)[0];
            let channelModifier = Object.values(c)[0];
            console.log("c:", c);

            strSelectorObj = _addSpecificChannel(channelString, channelModifier, strSelectorObj);

            return strSelectorObj;
        });

        return strSelectorObj;
    }

    /*  */
    function _addSpecificChannel(channel, selectorModifier="", { thumbnail, recommended }) {
        let startsWith = false;
        if (selectorModifier === "^") {
            startsWith = true;
        }

        thumbnail += `,a[class="ScCoreLink-sc-16kq0mq-0 eFqEFL tw-link"][href${selectorModifier}="${startsWith && "/"}${channel.toLowerCase()}"]`;
        recommended += `,a[data-test-selector="recommended-channel"][href${selectorModifier}="${startsWith && "/"}${channel.toLowerCase()}"]`;
        //followed += `,a[data-test-selector="followed-channel"][href${selectorModifier}="${channel.toLowerCase()}"]`;
        //host += `,a[data-a-target="preview-card-image-link"][href${selectorModifier}="${channel.toLowerCase()}"]`;

        return { thumbnail, recommended };
    }

    // Get complete CSS from applying query selectors
    // Takes an object containing CSS query selector strings and returns complete CSS
    function _createCSS({ thumbnail, recommended }) {
        return `${thumbnail}{visibility:hidden;height:110px!important;}${recommended}{display:none!important;}`;
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

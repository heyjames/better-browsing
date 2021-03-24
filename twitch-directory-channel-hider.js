// ==UserScript==
// @name         Twitch Directory Channel Hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides channels from Just Chatting directory. Channels links still work.
//               Can be customized to blur or unclickable.
// @author       You
// @match        https://www.twitch.tv/directory/game/Just%20Chatting
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// ==/UserScript==

// Add channel names here (case-sensitive)
const EXCLUDED_CHANNELS = [];
const DEVELOPER_MODE = false;

const CSS = `
.hidden {
opacity: 0;
/*filter: blur(1em);*/
}
`;

(async function() {
    'use strict';

    await pause(2000); // Waits for elements to load. TODO: Find alternative way.
    if (DEVELOPER_MODE) console.log("....Start");
    const selector = "ScTower-sc-1dei8tr-0 hRbnOC tw-tower";
    const parentNode = document.getElementsByClassName(selector)[0];

    handleChannel(parentNode);

    observeInternalPageNavigation();
})();

// Internal use. Don't modify.
const ALL_CHANNELS = []; // All channels on page
let removed = []; // Removed channels on page matching EXCLUDED_CHANNELS

// Append my CSS style node to head
const head = document.querySelector("head");
const styleNode = document.createElement("style");
head.prepend(styleNode);
styleNode.innerHTML = CSS;

// Observe when user navigates away after loading page, and initialize script.
function observeInternalPageNavigation() {
    const selector = "ScTower-sc-1dei8tr-0 hRbnOC tw-tower";
    const target = document.getElementsByClassName(selector)[0];
    const observer = new MutationObserver(mutations => {
        if (DEVELOPER_MODE) console.log("Mutation Observer triggered");
        handleChannel(target);
    });

    const config = { subtree: false, characterData: false, childList: true };
    observer.observe(target, config);
}

function pause(ms) {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, ms);
    });
}

function handleChannel(node) {
    const tmpRemoved = [];

    for (let i=1; i<node.childNodes.length; i++) {
        // Add a channel name to the global array "ALL_CHANNELS".
        recur(node.childNodes[i].childNodes[0]);

        // Get last element in array
        const channel = ALL_CHANNELS[ALL_CHANNELS.length-1];

        // Add a channel to the removed array for logging
        // Set HTML properties to hide channel or append a sibling node
        // to cover channel image.
        if (EXCLUDED_CHANNELS.includes(channel)) {
            if (DEVELOPER_MODE) console.log("Found and removed");
            tmpRemoved.push(channel);
            removed = [...new Set([...removed, ...tmpRemoved])];
            node.childNodes[i].childNodes[0].title = channel;
            //node.childNodes[i].childNodes[0].id = `${channel}-id`;
            node.childNodes[i].childNodes[0].className += " hidden";
            //node.childNodes[i].appendChild(createOverlay(channel));
        }
    }

    if (DEVELOPER_MODE) {
        console.log("Excluded", EXCLUDED_CHANNELS);
        console.log("All channels on page", ALL_CHANNELS);
        console.log("Removed", removed);
    }
}

// So I don't have to use this to get to the channel name:
// node[i].addedNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
// Walk through each child node until channel name is found.
function recur(childNode) {
    if (childNode === undefined) return;
    // Check if node has a class attribute that fits condition and get the child's sister node
    // Specific class name specifying node to check second sibling
    if (childNode && childNode.attributes && childNode.attributes.length > 0) {
        const result = (childNode.attributes.class.nodeValue === "tw-flex-grow-1 tw-flex-shrink-1 tw-full-width tw-item-order-2 tw-media-card-meta__text-container");

        if (result === true) {
            return recur(childNode.childNodes[1]); // My mistake here was not calling return on the recursion function
        }
    }

    // If next node is undefined, get the current node's value (aka the channel name)
    if (childNode.childNodes.length < 1) {
        // Prevent inserting undefined and duplicate values into global array
        if (!ALL_CHANNELS.includes(childNode.nodeValue)) {
            ALL_CHANNELS.push(childNode.nodeValue);
        }
    }

    // Continue walking down the child nodes
    recur(childNode.childNodes[0]);
}

// Create an overlay over the hidden chennel image that says "BLOCKED"
function createOverlay(channel) {
    const div = document.createElement("div");
    div.innerHTML = "BLOCKED";
    div.id = `${channel}-overlay`;
    //div.className = " hidden";
    div.title = channel;
    const css = `position: relative;
                 font-size: 1.3em;
                 font-weight: bold;
                 top: -190px;
                 left: 110px;
                `;
    div.style.cssText = css;

    const channelImage = document.getElementById(`${channel}-id`);

    div.onmouseenter = function() {
        event.target.style.opacity = 0.5;
        channelImage.style.cssText = "opacity: 0.1;";
    };

    div.onmouseleave = function() {
        event.target.style.opacity = 1;
        channelImage.style.cssText = "opacity: 0;";
    };

    return div;
}

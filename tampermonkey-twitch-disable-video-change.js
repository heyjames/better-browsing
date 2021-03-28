// ==UserScript==
// @name         Disable Auto Background Video Quality Change
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Slapsy
// @match        https://player.twitch.tv/*
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Object.defineProperty(document, "hidden", { value : false});
})();

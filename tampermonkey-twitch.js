// ==UserScript==
// @name         Twitch Auto Background Video Quality Change
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prevents Twitch from automatically lowering video quality when tab is out of focus
// @author       Slapsy
// @match        https://player.twitch.tv/*
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Object.defineProperty(document, "hidden", { value : false});
})();

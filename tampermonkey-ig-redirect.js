// ==UserScript==
// @name         Instagram Imginn Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    function pause(seconds) {
        return new Promise(resolve => {
            setTimeout(() => { resolve() }, seconds * 1000);
        });
    }

    // Your code here...
    window.location = `https://imginn.com${window.location.pathname.toLowerCase()}`;
    //await pause(0.1);
    event.preventDefault();
})();

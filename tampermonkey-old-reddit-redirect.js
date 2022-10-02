// ==UserScript==
// @name         Old Reddit Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.location.replace('https://old.reddit.com' + window.location.pathname);
})();

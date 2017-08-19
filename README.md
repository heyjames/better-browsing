The CSS files clean up, simplify, or hide elements within websites using the Stylish Chrome Extension. The "ffz" in the bettertwitchchat-ffz.css file indicates it should be used when the FrankerFaceZ Chrome extension is also installed. Additionally, some ublock origin rules aim to remove many of Twitch's distracting/obtrusive elements.

### List of Twitch's notifications/pop-ups avaiable to hide
* MasterOverwatch pop-up/overlay
* Chat Rules pop-up
* Follow this streamer pop-up
* Log-in pop-up
* Mature audiences overlay
* Buffering stream pop-up
* Bits
* Turn on browser notifications pop-up
* TwitchCon tickets pop-up
* Audio contains copyright
* Follow and get notified when ____ is live
* "Learning a new hero? Searching for Zarya mains? Find streams with the new Hero filter" notification

### bettertwitchchat-ffz.css Changes
* (legibilty) Brightened chat text color
* (legibilty) Chat messages with "@username" is now colored light green and font size overrides FFZ's setting
* (legibilty) Unbolded usernames and color all usernames redred
* (legibilty) Stroked the stream information top overlay in theater mode
* (UX Improvement) Colored and increased size of chat collapse button more visible and selectable
* (UX Improvement) Increased size of video player's buttons
* (UX Improvement) Upcoming Events panel (Overwatch game directory page) is now hidden and game directory takes up the full width
* (UX Improvement) Stream information in top overlay in theater mode is less opaque unless mouse hovers
* (UX Improvement) Remove black gradients from top and bottom in theater mode when overlay is present

Note: bettertwitchchat.css has a 1440p-only feature enabled by default.

### uBlock Origin Custom Filter
* YouTube - Remove Chromecast button
* Youtube - Remove "More Videos" overlay on embedded videos when paused
* Reddit - Remove the sidebar
* CoinMarketCap - Remove the top banner
* Twitch - Remove Chromecast button
* Twitch - Remove Events panel in Overwatch's game directory
* Twitch - Remove TwitchCon tickets pop-up
* Twitch - Remove dim overlay when video is paused
* Twitch - Remove copyrighted audio pop-up in VODs
* Twitch - Remove chat rules pop-up
* Twitch - Remove "Follow and get notified when ____ is live"
* Twitch - Remove MasterOverwatch overlay
* Twitch - Remove "Enjoying the show? Log in to follow this channel..."
* Twitch - Remove "Learning a new hero? Searching for Zarya mains? Find streams with the new Hero filter" notification at the Overwatch game directory page.

### To do
Replace the badges that I currently allow (moderator, staff) with color-coded backgrounds instead of showing a badge, so all Twitch usernames are consistent and aligned to the left side of the chat box properly.

### Before and After
![Alt text](/difference.png?raw=true "Optional Title")

// Click the three dots to open the YouTube video's transcript.
// Open your web browser's inspector view, and enter this into the console.
// This helps you paste the transcript into ChatGPT for a quick summary.
let script = ""; document.querySelectorAll("yt-formatted-string[class='segment-text style-scope ytd-transcript-segment-renderer']").forEach(e => (script = script + ` ${e.textContent}`)); console.log(script);

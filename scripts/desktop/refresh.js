import { shuffle } from "../lib.js";
import { check_max_shorts_scroll } from "./scroll.js";
import { playingVideoData } from "./player.js";

var videoslistITV, shortslistITV;
export function refreshVideoList(data, doShuffle)
{
    if (doShuffle)
        shuffle(data);

    const shortsfeed = document.querySelector("#shorts-feed");
    const shortslist = document.querySelector("#shorts-list");
    const videolist = document.querySelector("#video-feed");
    videolist.innerHTML = "";
    shortslist.innerHTML = "";
    check_max_shorts_scroll();
    videolist.append(shortsfeed);

    if (playingVideoData === undefined)
        shortsfeed.style.display = "block";
    else
        shortsfeed.style.display = "none";

    clearInterval(videoslistITV);
    clearInterval(shortslistITV);

    var videosCt = 0;
    videoslistITV = setInterval(() => {
        while ((videosCt < data.length) && (data[videosCt]["status"] != "done" || data[videosCt]["type"] != "video"))
            videosCt++;

        if (videosCt >= data.length) {
            clearInterval(videoslistITV);
        }
        else {
            videolist.append(data[videosCt]["htmlItem"]);
            videosCt++;
        }
    }, 100);

    var shortsCt = 0;
    shortslistITV = setInterval(() => {
        while ((shortsCt < data.length) && (data[shortsCt]["status"] != "done" || data[shortsCt]["type"] != "short"))
            shortsCt++;

        if (shortsCt >= data.length) {
            clearInterval(shortslistITV);  
        }
        else {
            shortslist.append(data[shortsCt]["htmlItem"]);
            shortsCt++;
        }
        
    }, 100);
}
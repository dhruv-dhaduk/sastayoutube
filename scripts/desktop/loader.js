import { convert_number_format, convert_upload_time_format, shuffle } from "../lib.js";
import { playingVideoData, play_video, clear_video } from "./player.js";
import { check_max_shorts_scroll } from "./scroll.js";

const loading = document.querySelector("#loading");
const loadingItem = document.querySelector("#loading-item-template").content;
const loadingItemCount = 12;
for (var i = 0; i < loadingItemCount; i++)
    loading.append(loadingItem.cloneNode(true));

document.querySelector("#refresh").addEventListener("click", function() {
    window.location.reload();
});

document.querySelector("#backtotop").addEventListener("click", function() {
    window.scrollTo(0, 0);
});

document.querySelector("#closevideo").addEventListener("click", function() {
    clear_video();
});

window.addEventListener("resize", function() {
    if (playingVideoData !== undefined)
        window.scrollTo(0, 0);
});

// const data = [];
// for (r of hardCodedData) {
//     data.push(r);
// }
// load_data();

export function load_data(data) 
{
    const feed = document.querySelector("#video-feed");
    for (const r of data) 
    {   
        r["apiKey"] = "";
        if (r["status"] != "done") {
            continue;
        }

        if (r["type"] == "video") {
            create_html_video_item(r);
        }
        else if (r["type"] == "short") {
            create_html_shorts_item(r);
        }
        else {
            r["htmlItem"] = "";
        }
    }

    loading.style.display = "none";

    refreshVideoList(data, true);
}

function create_html_video_item(v) 
{
    const middle_dot = " <span class=\"dot\">&#183</span> ";
    const videoItem = document.querySelector("#video-item-template").content.firstElementChild.cloneNode(true);

    const thumbnailImg = videoItem.querySelector(".thumbnail-img");
    const duration = videoItem.querySelector(".duration");
    const channelIconContainer = videoItem.querySelector(".channel-icon-container");
    const channelIcon = videoItem.querySelector(".channel-icon");
    const videoTitle = videoItem.querySelector(".video-title");
    const videoChannelName = videoItem.querySelector(".video-channel-name");
    const videoAdditionalData = videoItem.querySelector(".video-additional-data");
    const threeDotsContainer = videoItem.querySelector(".video-three-dots-container");
    const threeDots = videoItem.querySelector(".video-three-dots");

    videoItem.addEventListener("click", function() { play_video(v); });
    videoItem.addEventListener("mouseenter", function() { threeDotsContainer.style.opacity = 1; });
    videoItem.addEventListener("mouseleave", function() { threeDotsContainer.style.opacity = 0; });
    thumbnailImg.src = v.thumbnail;
    thumbnailImg.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    duration.innerHTML = v.duration;
    channelIconContainer.href = v.channelLink;
    channelIconContainer.addEventListener("click", function(e) { e.stopPropagation(); });
    channelIcon.src = v.channelIcon;
    channelIcon.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    videoTitle.innerHTML = v.videoTitle;
    videoChannelName.innerHTML = v.channelTitle;
    videoAdditionalData.innerHTML = convert_number_format(v.viewCount, "views") + middle_dot + convert_upload_time_format(v.uploadTime);
    threeDotsContainer.href = v.link;
    threeDotsContainer.addEventListener("click", function(e) { e.stopPropagation(); });
    threeDots.addEventListener("contextmenu", function(e) { e.preventDefault(); });

    v.htmlItem = videoItem;
}

function create_html_shorts_item(s) 
{
    const item = document.createElement("a");
        const shortsThumbnail = document.createElement("img");
        const shortsText = document.createElement("div");
            const shortsTitle = document.createElement("p");
            const shortsViews = document.createElement("p");

    item.className = "shorts-item";
    item.href = s["link"];
    item.target = "_blank";
        shortsThumbnail.className = "shorts-thumbnail";
        shortsThumbnail.src = s["thumbnail"];
        shortsThumbnail.draggable = false;
        shortsThumbnail.addEventListener("contextmenu", function(e) { e.preventDefault(); });
        shortsText.className = "shorts-text";
            shortsTitle.className = "shorts-title";
            shortsTitle.innerHTML = s["videoTitle"];
            shortsViews.className = "shorts-views";
            shortsViews.innerHTML = convert_number_format(s["viewCount"], "views");
    
    shortsText.append(shortsTitle);
    shortsText.append(shortsViews);
    item.append(shortsThumbnail);
    item.append(shortsText);

    s["htmlItem"] = item;
}

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
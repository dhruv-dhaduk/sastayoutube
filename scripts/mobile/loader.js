import { convert_number_format, convert_upload_time_format, shuffle } from "../lib.js";
import { playingVideoData, play_video, clear_video } from "./player.js";

// document.addEventListener("DOMContentLoaded", load_data());

const loading = document.getElementById("loading");
const loadingItem = document.getElementById("loading-item-template").content;
const loadingItemSize = 4;
for (var i = 0; i < loadingItemSize; i++)
    loading.append(loadingItem.cloneNode(true));

document.getElementById("yt").addEventListener("click",function() {
    clear_video();
});
document.getElementById("form").addEventListener("click", function() {
    // window.open("https://forms.gle/qgnJPobNPGyQgNp99", "_blank");
});
document.getElementById("refresh").addEventListener("click", function() {
    window.location.reload();
});
document.getElementById("clear-video").addEventListener("click", function() {
    clear_video();
});
document.getElementById("backtotop").addEventListener("click", function() {
    window.scrollTo(0, 0);
})

// const imgs = document.getElementsByTagName("img");
// for (ele of imgs)
// {
    // ele.addEventListener("contextmenu", function(e) { e.preventDefault(); });
// }

export function load_data(data)
{
    // for (r of hardCodedData)
    // {
    //     data.push(r);
    // }

    var shortsCount = 0;
    
    for (const r of data) 
    {
        r["apiKey"] = "";
        if (r["status"] != "done"){
            continue;
        }

        if (r["type"] == "video") {
            create_html_video_item(r);
        }
        else if (r["type"] == "short") {
            create_html_shorts_item(r);
            shortsCount++;
        }
        else {
            r["htmlItem"] = "";
        }
    }
    
    document.getElementById("loading").style.display = "none";
    // if (shortsCount > 0)
    //     document.getElementById("shorts-feed").style.display = "block";
    refreshVideoList(data, true);
}

function create_html_video_item(r)
{
    const middle_dot = " <span class=\"dot\">&#183</span> ";
    
    const videoItem = document.querySelector("#video-item-template").content.querySelector(".video-item").cloneNode(true);
    const thumbnailImg = videoItem.querySelector(".thumbnail-img");
    const duration = videoItem.querySelector(".duration");
    const channelIconContainer = videoItem.querySelector(".channel-icon-container");
    const channelIcon = channelIconContainer.querySelector(".channel-icon");
    const videoItemTexts = videoItem.querySelector(".video-item-texts");
    const videoTitle = videoItemTexts.querySelector(".video-title");
    const videoAdditionalData = videoItemTexts.querySelector(".video-additional-data");
    const threeDotsContainer = videoItem.querySelector(".video-three-dots-container");
    const threeDots = threeDotsContainer.querySelector(".video-three-dots");

    videoItem.addEventListener("click", function() { play_video(r); });
    thumbnailImg.src = r.thumbnail;
    thumbnailImg.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    duration.innerHTML = r.duration;
    channelIconContainer.href = r.channelLink;
    channelIcon.src = r.channelIcon;
    channelIcon.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    channelIcon.addEventListener("click", function(e) { window.open(r.channelLink, "_blank"); });
    videoItemTexts.addEventListener("click", function() { play_video(r); });
    videoTitle.innerHTML = r.videoTitle;
    videoAdditionalData.innerHTML = r.channelTitle + middle_dot + convert_number_format(r.viewCount, "views") + middle_dot + convert_upload_time_format(r.uploadTime);
    threeDotsContainer.href = r.link;
    threeDots.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    threeDots.addEventListener("click", function() { window.open(r.link, "_blank"); });

    r.htmlItem = videoItem;
}

function create_html_shorts_item(r)
{
    const item = document.createElement("a");
        const thumb = document.createElement("img");
        const texts = document.createElement("div");
            const title = document.createElement("p");
            const views = document.createElement("p");

    item.className = "shorts-item";
    item.href = r["link"];
    item.target = "_blank";
    // item.addEventListener("click", function() {
    //     window.open(r["link"], "_blank");
    // });
        thumb.className = "shorts-thumbnail";
        thumb.src = r["thumbnail"];
        thumb.addEventListener("contextmenu", function(e) { e.preventDefault(); }); 
        texts.className = "shorts-text";
            title.className = "shorts-title";
            title.innerHTML = r["videoTitle"];
            views.className = "shorts-views";
            views.innerHTML = convert_number_format(r["viewCount"], "views");
        
    texts.append(title);
    texts.append(views);
    item.append(thumb);
    item.append(texts);

    r["htmlItem"] = item;

    // l.append(item);
}

var videoslistITV, shortslistITV;

export function refreshVideoList(data, doShuffle)
{
    if (doShuffle)
        shuffle(data);

    const videoslist = document.getElementById("video-list");
    videoslist.innerHTML = "";

    const shortsfeedList = create_shorts_feed();
    const shortsfeed = shortsfeedList[0];
    const shortslist = shortsfeedList[1];
    
    clearInterval(videoslistITV);
    clearInterval(shortslistITV);
    
    var videosCt = 0;
    videoslistITV = setInterval(() => {
        if (videoslist.childElementCount == 1)
            videoslist.append(shortsfeed);

        while ((videosCt < data.length) && (data[videosCt]["status"] != "done" || data[videosCt]["type"] != "video"))
        videosCt++;
    
        if (videosCt >= data.length) {
            clearInterval(videoslistITV);
            return;
        }
        
        videoslist.append(data[videosCt]["htmlItem"]);
        videosCt++;
    }, 100);

    var shortsCt = 0;
    shortslistITV = setInterval(() => {
        while ((shortsCt < data.length) && (data[shortsCt]["status"] != "done" || data[shortsCt]["type"] != "short"))
            shortsCt++;

        if (shortsCt >= data.length) {
            clearInterval(shortslistITV);
            return;
        }

        shortslist.append(data[shortsCt]["htmlItem"]);
        shortsCt++;
    }, 100);

}

function create_shorts_feed()
{
    const shortsFeed = document.createElement("div");
        const shortsHeader = document.createElement("div");
            const shortsIconText = document.createElement("div");
                const shortsIcon = document.createElement("img");
                const shortsHeading = document.createElement("span");
        const shortsList = document.createElement("div");

    shortsFeed.className = "shorts-feed";
    shortsFeed.id = "shorts-feed";
        shortsHeader.className = "shorts-header";
            shortsIconText.className = "shorts-icon-text";
                shortsIcon.className = "shorts-icon";
                shortsIcon.src = "https://dhruv-dhaduk.github.io/assets/logos/colored/shorts.png";
                shortsIcon.addEventListener("contextmenu", function(e) { e.preventDefault(); });
                shortsHeading.className = "shorts-heading";
                shortsHeading.innerHTML = "Shorts";
        shortsList.className = "shorts-list";
        shortsList.id = "shorts-list";

    shortsIconText.append(shortsIcon);
    shortsIconText.append(shortsHeading);
    shortsHeader.append(shortsIconText);
    shortsFeed.append(shortsHeader);
    shortsFeed.append(shortsList);

    return [shortsFeed, shortsList];
}
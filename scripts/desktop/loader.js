const loading = document.querySelector("#loading");
const loadingItem = document.querySelector(".loading-item");
loading.innerHTML = "";
const loadingItemCount = 12;
for (var i = 0; i < loadingItemCount; i++)
    loading.append(loadingItem.cloneNode(true));

document.querySelector("#refresh").addEventListener("click", function() {
    window.location.reload();
});

document.querySelector("#backtotop").addEventListener("click", function() {
    window.scrollTo(0, 0);
});

document.querySelector("#yt").addEventListener("click", function() {
    refreshVideoList(false);
});

document.querySelector("#shuffle").addEventListener("click", function() {
    refreshVideoList(true);
});

document.querySelector("#closevideo").addEventListener("click", function() {
    clear_video();
});

// const data = [];
// for (r of hardCodedData) {
//     data.push(r);
// }
// load_data();

function load_data() 
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

    refreshVideoList(true);
}

function create_html_video_item(v) 
{
    const middle_dot = " <span class=\"dot\">&#183</span> ";

    const videoItem = document.createElement("div");
        const thumbnailContainer = document.createElement("div");
            const thumbnailImg = document.createElement("img");
            const duration = document.createElement("p");
        const videoItemInfo = document.createElement("div");
            const channelIconContainer = document.createElement("a");
                const channelIcon = document.createElement("img");
            const videoItemTexts = document.createElement("div");
                const videoTitle = document.createElement("p");
                const videoChannelName = document.createElement("p");
                const videoAdditionalData = document.createElement("p");
            const threeDotsContainer = document.createElement("a");
                const threeDots = document.createElement("img");

    videoItem.className = "video-item";
    videoItem.addEventListener("mouseenter", function() { threeDotsContainer.style.opacity = 1; });
    videoItem.addEventListener("mouseleave", function() { threeDotsContainer.style.opacity = 0; });
        thumbnailContainer.className = "thumbnail-container";
            thumbnailImg.className = "thumbnail-img";
            thumbnailImg.src = v["thumbnail"];
            thumbnailImg.addEventListener("contextmenu", function(e) { e.preventDefault(); });
            thumbnailImg.draggable = false;
            duration.className = "duration";
            duration.innerHTML = v["duration"];
        videoItemInfo.className = "video-item-info";
            channelIconContainer.className = "channel-icon-container";
            channelIconContainer.href = v["channelLink"];
            channelIconContainer.target = "_blank";
                channelIcon.className = "channel-icon";
                channelIcon.src = v["channelIcon"];
                channelIcon.addEventListener("contextmenu", function(e) { e.preventDefault(); });
            videoItemTexts.className = "video-item-texts";
                videoTitle.className = "video-title";
                videoTitle.innerHTML = v["videoTitle"];
                videoChannelName.className = "video-channel-name";
                videoChannelName.innerHTML = v["channelTitle"];
                videoAdditionalData.className = "video-additional-data";
                videoAdditionalData.innerHTML = convert_number_format(v["viewCount"], "views") + middle_dot + convert_upload_time_format(v["uploadTime"]);
            threeDotsContainer.className = "video-three-dots-container";
            threeDotsContainer.href = v["link"];
            threeDotsContainer.target = "_blank";
                threeDots.className = "video-three-dots";
                threeDots.src = "https://dhruv-dhaduk.github.io/assets/logos/white/three_dots_white.png";
                threeDots.addEventListener("contextmenu", function(e) { e.preventDefault(); });

    channelIconContainer.append(channelIcon);
    videoItemTexts.append(videoTitle);
    videoItemTexts.append(videoChannelName);
    videoItemTexts.append(videoAdditionalData);
    threeDotsContainer.append(threeDots);
    thumbnailContainer.append(thumbnailImg);
    thumbnailContainer.append(duration);
    videoItemInfo.append(channelIconContainer);
    videoItemInfo.append(videoItemTexts);
    videoItemInfo.append(threeDotsContainer);
    videoItem.append(thumbnailContainer);
    videoItem.append(videoItemInfo);

    channelIconContainer.addEventListener("click", function(e) { e.stopPropagation(); } );
    threeDotsContainer.addEventListener("click", function(e) { e.stopPropagation(); } );
    videoItem.addEventListener("click", function(e) { play_video(v); });

    v["htmlItem"] = videoItem;
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
function refreshVideoList(doShuffle)
{
    if (doShuffle)
        shuffle(data);

    const shortsfeed = document.querySelector("#shorts-feed");
    const shortslist = document.querySelector("#shorts-list");
    const videolist = document.querySelector("#video-feed");
    videolist.innerHTML = "";
    shortslist.innerHTML = "";
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
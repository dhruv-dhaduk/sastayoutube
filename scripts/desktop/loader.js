// const data = [];
// for (r of hardCodedData) {
//     data.push(r);
// }
// load_data();

document.querySelector("#refresh").addEventListener("click", function() {
    window.location.reload();
});

document.querySelector("#backtotop").addEventListener("click", function() {
    window.scrollTo(0, 0);
});

function load_data() 
{
    const feed = document.querySelector("#video-feed");
    for (const r of data) 
    {
        create_html_video_item(r);
        feed.append(r["htmlItem"]);
    }
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
        thumbnailContainer.className = "thumbnail-container";
            thumbnailImg.className = "thumbnail-img";
            thumbnailImg.src = v["thumbnail"];
            thumbnailImg.addEventListener("contextmenu", function(e) { e.preventDefault(); });
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
    videoItem.addEventListener("click", function(e) { window.open(v["link"], "_blank"); });

    v["htmlItem"] = videoItem;
}
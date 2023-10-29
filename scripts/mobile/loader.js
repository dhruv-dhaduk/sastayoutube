import { convert_number_format, convert_upload_time_format, shuffle } from "../lib.js";
import { playingVideoData, play_video, clear_video } from "./player.js";

// document.addEventListener("DOMContentLoaded", load_data());

const loading = document.getElementById("loading");
const loadingItem = document.getElementsByClassName("loading-item")[0];
loading.innerHTML = "";
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

    const container = document.createElement("div");
            const thumb_container = document.createElement("div");
                const thumbnail = document.createElement("img");
                const duration = document.createElement("p");
            const video_item_info = document.createElement("div");
                const channel_icon_container = document.createElement("a");
                    const channel_icon = document.createElement("img");
                const video_item_texts = document.createElement("div");
                    const video_title = document.createElement("p");
                    const additional_data = document.createElement("p");
                const three_dots_container = document.createElement("a");
                    const three_dots = document.createElement("img");

    
    channel_icon_container.href = "https://www.youtube.com";
    three_dots_container.href = 'https://www.youtube.com';

    container.className = "video-item";
    container.addEventListener("click", function() { play_video(r) });
        thumb_container.className = "thumbnail-container";
            thumbnail.className = "thumbnail-img";
            thumbnail.src = r["thumbnail"];
            thumbnail.addEventListener("contextmenu", function(e) { e.preventDefault(); }); 
            // thumbnail.addEventListener("click", function() { play_video(r); });
            duration.className = "duration";
            duration.innerHTML = r["duration"];
        video_item_info.className = "video-item-info";
            channel_icon_container.className = "channel-icon-container";
            channel_icon_container.href = r["channelLink"];
            channel_icon_container.target = "_blank";
                channel_icon.className =  "channel-icon";
                channel_icon.src = r["channelIcon"];
                channel_icon.addEventListener("contextmenu",function(e) { e.preventDefault(); });
                channel_icon.addEventListener("click", function() { window.open(r["channelLink"], "_blank"); });
            video_item_texts.className = "video-item-texts";
            video_item_texts.addEventListener("click", function() { play_video(r); });
                video_title.className = "video-title";
                video_title.innerHTML = r["videoTitle"];
                additional_data.className = "video-additional-data";
                additional_data.innerHTML = r["channelTitle"] + middle_dot + convert_number_format(r["viewCount"], "views") + middle_dot + convert_upload_time_format(r["uploadTime"]);
            three_dots_container.className = "video-three-dots-container";
            three_dots_container.href = r["link"];
            three_dots_container.target = "_blank";
                three_dots.className = "video-three-dots";
                three_dots.src = "https://dhruv-dhaduk.github.io/assets/logos/white/three_dots_white.png";
                three_dots.addEventListener("contextmenu", function(e) { e.preventDefault(); });
                three_dots.addEventListener("click", function() { window.open(r["link"], "_blank"); });

        video_item_texts.append(video_title);
        video_item_texts.append(additional_data);
        thumb_container.append(thumbnail);
        thumb_container.append(duration);
        channel_icon_container.append(channel_icon);
        three_dots_container.append(three_dots);
        video_item_info.append(channel_icon_container);
        video_item_info.append(video_item_texts);
        video_item_info.append(three_dots_container);
        container.append(thumb_container);
        container.append(video_item_info);

        r["htmlItem"] = container;
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
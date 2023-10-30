import { refreshVideoList } from "./refresh.js";
import { playingVideoData, clear_video } from "./player.js";
import { data } from "./data.js";

export function init()
{
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

    document.querySelector("#yt").addEventListener("click", function() {
        refreshVideoList(data, false);
    });
    
    document.querySelector("#shuffle").addEventListener("click", function() {
        refreshVideoList(data, true);
    });
}
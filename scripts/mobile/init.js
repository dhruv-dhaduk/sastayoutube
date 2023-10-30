import { refreshVideoList } from "./refresh.js";
import { clear_video } from "./player.js";
import { data } from "./data.js";

export function init()
{
    const loading = document.getElementById("loading");
    const loadingItem = document.getElementById("loading-item-template").content;
    const loadingItemSize = 4;
    for (var i = 0; i < loadingItemSize; i++)
        loading.append(loadingItem.cloneNode(true));

    document.getElementById("yt").addEventListener("click",function() {
        clear_video();
        refreshVideoList(data, false);
    });
    document.getElementById("refresh").addEventListener("click", function() {
        window.location.reload();
    });
    document.getElementById("clear-video").addEventListener("click", function() {
        clear_video();
        refreshVideoList(data, false);
    });
    document.getElementById("backtotop").addEventListener("click", function() {
        window.scrollTo(0, 0);
    });
    document.getElementById("shuffle").addEventListener("click", function() {
        refreshVideoList(data, true);
    });
}
import { isMobileDevice } from "../device.js";
import { load_data, refreshVideoList } from "./loader.js";
 
if(!isMobileDevice())
{
    window.location.href = "youtube.html";
}

let data;

const fetchWorker = new Worker("./scripts/fetch_worker.js", {type: "module"});
fetchWorker.addEventListener("message", function(msg) {
    if (msg.data.error) {
        const err = `Error while fetching data :${msg.data.error}`;
        console.log(err);
        alert(err);
    }
    else {
        data = msg.data.videos;
        console.log(data);
        load_data(data);
    }
});
fetchWorker.postMessage({command: "fetchAll"});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("shuffle").addEventListener("click", function() {
        refreshVideoList(data, true);
    });
    document.getElementById("clear-video").addEventListener("click", function() {
        refreshVideoList(data, false);
    });
    document.getElementById("yt").addEventListener("click",function() {
        refreshVideoList(data, false);
    });
});
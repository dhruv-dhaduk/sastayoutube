import { isMobileDevice } from "../device.js";
// import { load_data } from "./loader.js";
import { init } from "./init.js";

if (isMobileDevice())
{
    window.location.href = "youtubeM.html";
}

// let data;

// const fetchWorker = new Worker("./scripts/fetch_worker.js", {type: "module"});
// fetchWorker.addEventListener("message", function(msg) {
//     if (msg.data.error) {
//         const err = `Erro while fetching data : ${msg.data.error}`;
//         console.log(err);
//         alert(err);
//     }
//     else {
//         data = msg.data.videos;
//         console.log(data);
//         load_data(data);
//     }
// });
// fetchWorker.postMessage({command: "fetchAll"});

document.addEventListener("DOMContentLoaded", function() {
    // document.querySelector("#yt").addEventListener("click", function() {
    //     refreshVideoList(data, false);
    // });
    
    // document.querySelector("#shuffle").addEventListener("click", function() {
    //     refreshVideoList(data, true);
    // });
    init();
});
import { isMobileDevice } from "../device.js";
import { init } from "./init.js";
import { start_fetching } from "./data.js";

 
if(!isMobileDevice())
{
    window.location.href = "youtube.html";
}

start_fetching();

// let data;

// const fetchWorker = new Worker("./scripts/fetch_worker.js", {type: "module"});
// fetchWorker.addEventListener("message", function(msg) {
//     if (msg.data.error) {
//         const err = `Error while fetching data :${msg.data.error}`;
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
    init();
});
import { isMobileDevice } from "../device.js";
// import { hardCodedData } from "../dummydata.js";
import { load_data, refreshVideoList } from "./loader.js";
import { fetchAll } from "../fetch_worker.js";

if (isMobileDevice())
{
    window.location.href = "youtubeM.html";
}

// const data = hardCodedData;
// document.addEventListener("DOMContentLoaded", function() {
//     load_data(data);
// });

let data;
fetchAll()
.then((videos) => {
    data = videos;
    console.log(data);
    load_data(data);
})
.catch((err) => {
    alert(`Error while fetching data : ${err}`);
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#yt").addEventListener("click", function() {
        refreshVideoList(data, false);
    });
    
    document.querySelector("#shuffle").addEventListener("click", function() {
        refreshVideoList(data, true);
    });
});
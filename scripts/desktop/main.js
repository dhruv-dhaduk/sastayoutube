import { isMobileDevice } from "../device.js";
// import { hardCodedData } from "../dummydata.js";
import { load_data } from "./loader.js";
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
    load_data(data);
})
.catch((err) => {
    alert(`Error while fetching data : ${err}`);
});
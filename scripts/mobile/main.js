if(!isMobileDevice())
{
    window.location.href = "youtube.html";
}

let data;
fetchAll()
.then((videos) => {
    data = videos;
    load_data();
})
.catch((err) => {
    alert(`Error while fetching data : ${err}`);
});
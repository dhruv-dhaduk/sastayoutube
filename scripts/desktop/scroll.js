const shortslist = document.querySelector("#shorts-list");

const shortsleftscroll = document.querySelector("#shorts-leftscroll");
const shortsrightscroll = document.querySelector("#shorts-rightscroll");

shortsleftscroll.addEventListener("click", shortslist_left_scroll);
shortsrightscroll.addEventListener("click", shortslist_right_scroll);

check_max_shorts_scroll();

function shortslist_left_scroll() {
    if (shortslist.scrollLeft - shortslist.offsetWidth / 2 <= 100)
        shortslist.scrollTo(0, 0);
    else
        shortslist.scrollTo(shortslist.scrollLeft - shortslist.offsetWidth / 2, 0);

    setTimeout(check_max_shorts_scroll, 1000);
}

function shortslist_right_scroll() {
    if (shortslist.scrollLeftMax - shortslist.scrollLeft - shortslist.offsetWidth / 2 <= 100)
        shortslist.scrollTo(shortslist.scrollLeftMax, 0);
    else
        shortslist.scrollTo(shortslist.scrollLeft + shortslist.offsetWidth / 2, 0);

    setTimeout(check_max_shorts_scroll, 1000);
}

function check_max_shorts_scroll() {
    if (shortslist.scrollLeft === 0) {
        shortsleftscroll.style.opacity = 0;
        shortsrightscroll.style.opacity = 1;
    }
    else if (shortslist.scrollLeft === shortslist.scrollLeftMax) {
        shortsleftscroll.style.opacity = 1;
        shortsrightscroll.style.opacity = 0;
    }
    else {
        shortsleftscroll.style.opacity = 1;
        shortsrightscroll.style.opacity = 1;
    }
}
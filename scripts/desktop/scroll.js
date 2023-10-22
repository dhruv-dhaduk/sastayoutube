function shortslist_left_scroll() {
    const shortslist = document.querySelector("#shorts-list");
    shortslist.scrollTo(shortslist.scrollLeft - shortslist.offsetWidth / 2, 0);
}

function shortslist_right_scroll() {
    const shortslist = document.querySelector("#shorts-list");
    shortslist.scrollTo(shortslist.scrollLeft + shortslist.offsetWidth / 2, 0);
}
const subNavUlItems = document.querySelectorAll(".sub-nav-ul");

let preMenuTarget = null;

setSubMenuTitleSpanClickEvent();


function setSubMenuTitleSpanClickEvent() {
    const subMenuTitleSpanItems = document.querySelectorAll(".sub-menu-title-span");

    subMenuTitleSpanItems.forEach((title, index) => {
        title.onclick = () => showSubMenuUl(subNavUlItems[index]);
    })
}

function showSubMenuUl(subNavUl) {
    const menuPlace = document.querySelector(".menu-place");

    menuLineClear();

    if(preMenuTarget == subNavUl) {
        menuPlace.classList.add("hide-menu-line");
        menuPlace.classList.remove("show-menu-line");
        preMenuTarget = null;

    }else {
        if(!menuPlace.classList.contains("show-menu-line")) {
            setTimeout(() => removeVisibleClass(subNavUl), 200);
        }else {
            removeVisibleClass(subNavUl);
        }
        
        menuPlace.classList.remove("hide-menu-line");
        menuPlace.classList.add("show-menu-line");
        removeVisibleClass(menuPlace);
        preMenuTarget = subNavUl;

    }

}

function menuLineClear() {
    subNavUlItems.forEach(subNavUl => addVisibleClass(subNavUl));
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}
const subNavUlItems = document.querySelectorAll(".sub-nav-ul");

let preMenuTarget = null;

setSubMenuTitleSpanClickEvent();
setHeaderMenuClickEvent();


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

function setHeaderMenuClickEvent() {
    const solutionManageLiItems = document.querySelectorAll(".solution-manage-list li");
    const requestManageLiItem = document.querySelector(".request-manage-list li");
    const productManageLiItems = document.querySelectorAll(".product-manage-list li");
    const boardManageLiItem = document.querySelector(".board-manage-list li");
    const accountManageLiItem = document.querySelector(".account-manage-list li");

    solutionManageLiItems[0].onclick = () => location.href = "/manager/solution/registration";
    solutionManageLiItems[1].onclick = () => location.href = "/manager/solution/modification";

    requestManageLiItem.onclick = () => location.href = "/manager/service";

    productManageLiItems[0].onclick = () => location.href = "/manager/product/registration";
    productManageLiItems[1].onclick = () => location.href = "/manager/product/modification";
    productManageLiItems[2].onclick = () => location.href = "/manager/trouble-symptom";

    boardManageLiItem.onclick = () => location.href = "/customer/complaint/list";
}
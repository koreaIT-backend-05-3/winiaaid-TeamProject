const memberSigninLi = document.querySelector(".member-signin");
const nonMemberInquiry = document.querySelector(".non-member-inquiry");
const signinView = document.querySelector(".signin-view");
const nonMemberView = document.querySelector(".non-member-view");

addSelectMenuClass(memberSigninLi);

memberSigninLi.onclick = (e) => changeView(e.target);

nonMemberInquiry.onclick = (e) => changeView(e.target);

function changeView(domObject) {
    if(isMemberSigninClick(domObject)) {

        addSelectMenuClass(domObject);
        removeSelectMenuClass(nonMemberInquiry);

        removeVisibleClass(signinView);
        addVisibleClass(nonMemberView);

    }else {
        addSelectMenuClass(domObject);
        removeSelectMenuClass(memberSigninLi);

        removeVisibleClass(nonMemberView);
        addVisibleClass(signinView);

    }
}

function isMemberSigninClick(domObject) {
    return domObject.classList.contains("member-signin");
}

function addSelectMenuClass(domObject) {
    domObject.classList.add("select-menu");
}

function removeSelectMenuClass(domObject) {
    domObject.classList.remove("select-menu");
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}
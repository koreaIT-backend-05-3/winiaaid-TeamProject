const topLogo = document.querySelector(".top-logo");
const faqBoard = document.querySelector(".faq-board");
const signinButton = document.querySelector(".signin");
const selfCheckBoard = document.querySelector(".self-check-board");
const visitRepairService = document.querySelector(".visit-repair-service");
const visitRepairServiceDetail = document.querySelector(".visit-repair-service-detail");
const refrigeratorRecallService = document.querySelector(".refrigerator-recall-service");
const complaintBoard = document.querySelector(".complaint-board");
const praiseBoard = document.querySelector(".praise-board");
const suggestionBoard = document.querySelector(".suggestion-board");
const userRequestHistory = document.querySelector(".user-request-history");
const userBoardHistory = document.querySelector(".user-board-history");
const userInfoModify = document.querySelector(".user-info-modify");

const menuLines = document.querySelectorAll(".menu-line");
const menuLineSubs = document.querySelectorAll(".menu-line-sub");
const subMenubarOut = document.querySelector(".sub-menubar-out");
subMenubarOut.classList.add("menu-line-visible");

let menuToggleFlag = false;

let preTarget = null;

menuLineClear();

if(user != null) {
    const authButtonLi = document.querySelector(".auth-button");

    authButtonLi.innerHTML = `<i class="fa-solid fa-user logout"></i>`;

    const logoutButton = document.querySelector(".logout");

    logoutButton.onclick = setLogoutButtonClickEvent;
}

topLogo.onclick = loadMainPage;

faqBoard.onclick = loadFaqPage;

signinButton.onclick = loadSigninPage;

selfCheckBoard.onclick = loadSelfCheckPage;

visitRepairService.onclick = loadVisitRepairServicePage;

visitRepairServiceDetail.onclick = loadVisitRepairServiceDetailPage;

refrigeratorRecallService.onclick = loadRefrigeratorRecallPage;

complaintBoard.onclick = loadComplaintBoardPage;

praiseBoard.onclick = loadPraiseBoardPage;

suggestionBoard.onclick = loadSuggestionBoardPage;

userRequestHistory.onclick = loadUserRequestHistoryPage;

userBoardHistory.onclick = loadUserBoardHistoryPage;

userInfoModify.onclick = loadUserInfoModifyPage;


for(let i = 0; i < menuLines.length; i++) {
    const menuLine = menuLines[i];
    const menuLineSub = menuLineSubs[i];

    menuLine.onclick = (e) => {
        menuLineClear();
        if(e.target == preTarget) {
            subMenubarOut.classList.add("menu-line-visible");
            preTarget = null;
        }else{
            preTarget = e.target;
            subMenubarOut.classList.remove("menu-line-visible");
            menuLineSub.classList.remove("menu-visible");
        }
        
    }
}

function menuLineClear() {
    for(let i = 0; i < menuLineSubs.length; i++){
        menuLineSubs[i].classList.add("menu-visible");
    }
}

function setLogoutButtonClickEvent() {
    location.href = "/logout";
}

function loadMainPage() {
    location.href = "/main";
}

function loadFaqPage() {
    location.href = "/solution/faq/list";
}

function loadSigninPage() {
    location.href = "/auth/signin";
}

function loadSelfCheckPage() {
    location.href = "/solution/self-check/list";
}

function loadVisitRepairServicePage() {
    location.href = "/service/visit/request";
}

function loadVisitRepairServiceDetailPage() {
    location.href = "/service/visit/inquiry";
}

function loadRefrigeratorRecallPage() {
    location.href = "/service/recall/request";
}

function loadComplaintBoardPage() {
    location.href = "/customer/complaint/list";
}

function loadPraiseBoardPage() {
    location.href = "/customer/praise/list";
}

function loadSuggestionBoardPage() {
    location.href = "/customer/suggestion/list";
}

function loadUserRequestHistoryPage() {
    location.href = "/mypage/service/history/ing";
}

function loadUserBoardHistoryPage() {
    location.href = "/mypage/writing/counsel";
}

function loadUserInfoModifyPage() {
    location.href = "/mypage/modify/info";
}
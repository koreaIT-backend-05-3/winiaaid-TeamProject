const MainMn = document.querySelector(".mn-ul");
const MainMnLi = MainMn.querySelectorAll(".main-mn")
const SubWrap = document.querySelector(".sub-wrap");
const SubUl = document.querySelectorAll("#gnb .sub-ul");

const mainLogo = document.querySelector(".main-logo");

const util = document.querySelector(".util ul li:first-child");
const utilLayer = document.querySelector(".util-layer");
const signinLi = document.querySelector(".signin-li");
const forgetUserIdLi = document.querySelector(".forget-user-id-li");
const forgetUserPasswordLi = document.querySelector(".forget-user-password-li");
const signupLi = document.querySelector(".signup-li");

const withdrawalLi = document.querySelector(".withdrawal");


setLoginUl();

util.onmouseover = () => removeVisibleClass(utilLayer);
util.onmouseout = () => addVisibleClass(utilLayer);

MainMn.addEventListener('mouseover',function(){
        for(let i=0; i < SubUl.length; i++){
            SubUl[i].classList.add('on');
        } 
    SubWrap.classList.add('on')
    })

    MainMn.addEventListener('mouseout',function(){
        for(let i=0; i < SubUl.length; i++){
            SubUl[i].classList.remove('on')
        }
    SubWrap.classList.remove('on')
})

MainMnLi[0].onmouseover = () => {
	MainMnLi[0].childNodes[1].firstChild.src = "https://member.winiadimchae.com/images/gnb01_on.png"
}
MainMnLi[0].onmouseleave = () => {
	MainMnLi[0].childNodes[1].firstChild.src = "https://member.winiadimchae.com/images/gnb01_off.png"
}
MainMnLi[1].onmouseover = () => {
	MainMnLi[1].childNodes[1].firstChild.src = "https://member.winiadimchae.com/images/gnb02_on.png"
}
MainMnLi[1].onmouseleave = () => {
	MainMnLi[1].childNodes[1].firstChild.src = "https://member.winiadimchae.com/images/gnb02_off.png"
}
MainMnLi[2].onmouseover = () => {
	MainMnLi[2].childNodes[1].firstChild.src = "https://member.winiadimchae.com/images/gnb03_on.png"
}
MainMnLi[2].onmouseleave = () => {
	MainMnLi[2].childNodes[1].firstChild.src = "https://member.winiadimchae.com/images/gnb03_off.png"
}

mainLogo.onclick = loadMainPage;
signinLi.onclick = loadSigninPage;
forgetUserIdLi.onclick = loadForgetUserIdPage;
forgetUserPasswordLi.onclick = loadForgetUserPasswordPage;
signupLi.onclick = loadSignupPage;
withdrawalLi.onclick = loadWithdrawalPage;

function setLoginUl() {
    const nonMemberUl = document.querySelector(".non-member-ul");
    const logoutSpan = document.querySelector(".logout-span");

    if(user != null) {
        removeVisibleClass(logoutSpan);
        addVisibleClass(nonMemberUl);
        setLogoutButtonClickEvent(logoutSpan);
    }
}

function setLogoutButtonClickEvent(logoutSpan) {
    logoutSpan.onclick = logout;
}

function logout() {
    location.href = "/logout";
}

function loadMainPage() {
    location.href = "/main";
}

function loadSigninPage() {
    location.href = "/auth/signin";
}

function loadSignupPage() {
    location.href = "/auth/signup/step1";
}

function loadForgetUserIdPage() {
    location.replace("/auth/forget/user-id");
}

function loadForgetUserPasswordPage() {
    location.replace("/auth/forget/user-password");    
}

function loadWithdrawalPage() {
    location.href = "/auth/withdrawal";
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}
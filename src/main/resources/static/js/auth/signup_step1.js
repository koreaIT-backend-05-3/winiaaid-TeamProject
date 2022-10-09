const siteAll = document.querySelector("#family1");
const site01 = document.querySelector("#site04");
const site02 = document.querySelector("#site05");
const site03 = document.querySelector("#site06");

const agree01 = document.querySelector("#agree01");
const agree02 = document.querySelector("#agree02");
const agree03 = document.querySelector("#agree03");
const allAgree = document.querySelector("#agree04");

const buttonNotAgree = document.querySelector(".button-not-agree")
const buttonAgree = document.querySelector(".button-agree");

siteAll.onchange = (e) => familySiteAllCheck(e.target);
allAgree.onchange = (e) => agreeAllCheck(e.target);

buttonNotAgree.onclick = loadMainPage;
buttonAgree.onclick = checkAgreeAndLoadStep2Page;

if(hasSignin()) {
    alert("잘못된 접근입니다.");
    location.replace("/main");
}

function hasSignin() {
    return user != null;
}

function siteCheckFunction() {
    const siteItems = document.querySelectorAll(".site");

    let siteCheckFlag;

    for(let i = 0; i < siteItems.length; i++) { 
        if(siteItems[i].checked) {
            siteCheckFlag = true;
            break;
        }
    }

    return siteCheckFlag;
}

function agreeCheckFunction() {
    const agreeItems = document.querySelectorAll(".agree");

    for(let i = 0; i < agreeItems.length; i++) { 
        if(!agreeItems[i].checked) {
            return false;
        }
    }

    return true;
}

function agreeAllCheck(input) {
    if(input.checked){
        agree01.checked = true;
        agree02.checked = true;
        agree03.checked = true;
    }else{
        agree01.checked = false;
        agree02.checked = false;
        agree03.checked = false;
    }
}
function familySiteAllCheck(input) {
    if(input.checked){
        site01.checked = true;
        site02.checked = true;
        site03.checked = true;
    }else{
        site01.checked = false;
        site02.checked = false;
        site03.checked = false;
    }
}

function loadMainPage() {
    location.href = "/main";
}

function checkAgreeAndLoadStep2Page() {
    if(!siteCheckFunction()) {
        alert("패밀리사이트 가입여부를 체크해주세요.");
        return false;

    }else if(!agreeCheckFunction()) {
        alert("이용약관에 동의해주세요.");
        return false;
    }

    localStorage.stepPass = true;
    location.href = "/auth/signup/step2";
}




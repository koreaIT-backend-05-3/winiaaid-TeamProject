const memberSigninLi = document.querySelector(".member-signin");
const nonMemberInquiry = document.querySelector(".non-member-inquiry");
const signinView = document.querySelector(".signin-view");
const nonMemberView = document.querySelector(".non-member-view");

const inquiryButton = document.querySelector(".inquiry-button-div button");

let changedFlag = false;

addSelectMenuClass(memberSigninLi);

setInputEnterKeyPressEvent();

memberSigninLi.onclick = (e) => changeView(e.target);

nonMemberInquiry.onclick = (e) => changeView(e.target);

inquiryButton.onclick = executeInquiry;



function changeView(domObject) {
    if(isMemberSigninClick(domObject)) {

        addSelectMenuClass(domObject);
        removeSelectMenuClass(nonMemberInquiry);

        removeVisibleClass(signinView);
        addVisibleClass(nonMemberView);

    }else {
        if(checkBoardView() && !changedFlag) {
            setNonMemberBoardview();
            changedFlag = true;
        }

        addSelectMenuClass(domObject);
        removeSelectMenuClass(memberSigninLi);

        removeVisibleClass(nonMemberView);
        addVisibleClass(signinView);

    }
}

function setInputEnterKeyPressEvent() {
    const authenticationInputItems = document.querySelectorAll(".main-inquiry-view input");

    authenticationInputItems.forEach(input =>{
        input.onkeypress = (e) => {
            if(e.keyCode == 13) {
                inquiryButton.click();
            }
        }
    });
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

function checkBoardView() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "board";
}

function setNonMemberBoardview() {
    const noticeP = document.querySelector(".notice-div p");
    const authenticationCodeDiv = document.querySelector(".personal-authentication-div");
    const serviceCodeDiv = document.querySelector(".service-code-div");
    const serviceCodeLabel = serviceCodeDiv.querySelector(".service-code-div label");
    const serviceCodeInput = serviceCodeDiv.querySelector(".service-code-input");
    const exlainationDiv = document.querySelector(".explaination-div");

    noticeP.textContent = "???????????? ????????? ???????????????, ????????????????????? ????????? ????????? ????????????.";

    serviceCodeInput.setAttribute("id", "phone-number");
    serviceCodeInput.setAttribute("class", "phone-number-input");
    serviceCodeInput.setAttribute("placeholder", "??????????????? ?????? (-??????)");

    serviceCodeLabel.textContent = "???????????????"
    serviceCodeLabel.setAttribute("for", "phone-number");

    serviceCodeDiv.setAttribute("class", "phone-number-div");

    exlainationDiv.innerHTML = `<p>??? ???????????? ????????? ?????? ???,?????????, ??????, ???????????? 4~16?????? ?????????. <span class="notice-span">???????????? ????????? ???????????? ????????? ??????????????? ??? ??????????????? ????????????.</span></p>`;


    removeVisibleClass(authenticationCodeDiv);
}

function executeInquiry() {
    const userName = document.querySelector(".user-name-input").value;
    let serviceCode = null;
    let phoneNumber = null;
    let authenticationNumber = null;

    let authenticationInfo = {
        "userCode": userCode,
        "userName": userName,
        "serviceCode": serviceCode,
        "mainPhoneNumber": phoneNumber,
        "authenticationNumber": authenticationNumber,
        "searchType": "all",
        "page": 1
    };

    if(checkBoardView()) {
        authenticationInfo.mainPhoneNumber = document.querySelector(".phone-number-input").value;
        authenticationInfo.authenticationNumber = document.querySelector(".authentication-code-input").value;
    }else {
        authenticationInfo.serviceCode = document.querySelector(".service-code-input").value;
    }

    submit(authenticationInfo);

}

function submit(authenticationInfo) {
    if(checkBoardView()) {
        $.ajax({
            type:"get",
            url:`/api/v1/board/praise/list/non-member`,
            data: authenticationInfo,
            dataType:"json",
            success:(response)=>{
                if(response.data != null){
                    localStorage.nonMemberInquiryList = JSON.stringify(response.data);
                    localStorage.boardAuthenticationInfo = JSON.stringify(authenticationInfo);
                    
                    location.href = "/customer/praise/list/non-member";
                }else {
                    alert("????????? ???????????? ??????????????????.");
                }
            },
            error:(request, status, error) => {
                console.log(request.status);
                console.log(request.responseText);
                console.log(error);
            }
        });

    }else {
        $.ajax({
            async: false,
            type: "get",
            url: `/api/v1/service/non-member/service-code-type`,
            data: authenticationInfo,
            dataType: "json",
            success: (response) => {
                let serivceTypeCode = response.data;
                if(serivceTypeCode != 0) {
                    localStorage.serviceAuthenticationInfo = JSON.stringify(authenticationInfo);

                    if(serivceTypeCode == 2) {
                        location.replace(`/service/visit/inquiry/detail/${authenticationInfo.serviceCode}`);
                        
                    }else if(serivceTypeCode == 3) {
                        location.replace(`/service/recall/inquiry/detail/${authenticationInfo.serviceCode}`);

                    }
                }else {
                    alert("????????? ???????????? ??????????????????.");

                }
            },
            error: (request, status, error) => {
                alert("???????????? ????????? ??????????????????.")
                console.log(request.status);
                console.log(request.responseText);
                console.log(error);
            }
        });
    }
}
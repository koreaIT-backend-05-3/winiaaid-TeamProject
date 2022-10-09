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

    noticeP.textContent = "고객님의 성명과 휴대폰번호, 본인확인번호를 입력해 주시기 바랍니다.";

    serviceCodeInput.setAttribute("id", "phone-number");
    serviceCodeInput.setAttribute("class", "phone-number-input");
    serviceCodeInput.setAttribute("placeholder", "휴대폰번호 입력 (-포함)");

    serviceCodeLabel.textContent = "휴대폰번호"
    serviceCodeLabel.setAttribute("for", "phone-number");

    serviceCodeDiv.setAttribute("class", "phone-number-div");

    exlainationDiv.innerHTML = `<p>• 본인확인 번호는 영문 대,소문자, 숫자, 특수문자 4~16자리 입니다. <span class="notice-span">본인확인 번호는 문의내용 조회시 필요하오니 꼭 기억하시기 바랍니다.</span></p>`;


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
                    alert("정보를 올바르게 입력해주세요.");
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
                    alert("정보를 올바르게 입력해주세요.");

                }
            },
            error: (request, status, error) => {
                alert("요청중에 오류가 발생했습니다.")
                console.log(request.status);
                console.log(request.responseText);
                console.log(error);
            }
        });
    }
}
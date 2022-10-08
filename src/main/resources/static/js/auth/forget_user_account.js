const radioItems = document.querySelectorAll(".find-account-input-div input");

const passwordResetSelect = document.querySelector(".password-reset-select");
const userIdInput = document.querySelector("table input");
const defaultAuthenticationView = document.querySelector(".default-authentication-view");
const authenticationMainContent = document.querySelector(".phone-authentication-div");
const authenticationRequestButton = document.querySelector(".user-authentication-request-div button");
const authenticationCheckButton = document.querySelector(".authentication-number-div button");
const mainPhoneNumberInput = document.querySelector(".main-phone-number");
const authenticationNumberInput = document.querySelector(".authentication-number-input");

const firstEmailInput = document.querySelector(".first-email");
const secondEmailInput = document.querySelector(".second-email");
const emailSelectBox = document.querySelector(".email-select-box");

const userIdSelect = document.querySelector(".user-id-select");
const userPasswordSelect = document.querySelector(".user-password-select");

const mainContentNotice = document.querySelector(".main-content-notice");

const buttonDiv = document.querySelector(".button-div");
const buttonItems = document.querySelectorAll(".button-div button");

let randomAuthenticationNumber = null;

setRadioInputDefaultSelect();
setRadioChangeEvent();
setEmailSelectBoxChangeEvent();

authenticationRequestButton.onclick = authenticationRequest;
authenticationCheckButton.onclick = checkAuthenticationNumber;

function setRadioInputDefaultSelect() {
    if(isIdForget()) {
        radioItems[0].checked = true;
    }else {
        radioItems[1].checked = true;
        removeVisibleClass(passwordResetSelect);

    }
}

function isIdForget() {
    return location.pathname.indexOf("user-id") != -1;
}

function setRadioChangeEvent() {
    radioItems.forEach(radio => {
        radio.onchange = (e) => loadAuthForgetPageByInputType(e.target);
    });
}

function loadAuthForgetPageByInputType(input) {
    let type = input.getAttribute("id");

    if(type == "find-id") {
        location.href = "/auth/forget/user-id";
    }else {
        location.href = "/auth/forget/user-password";
    }
    

    // passwordResetSelect.classList.toggle("visible");

    // removeResultContentClass();
    // removeAllResultContent();
    // removeVisibleClass(defaultAuthenticationView);
    // clearAllInput();
}

function setEmailSelectBoxChangeEvent() {
    emailSelectBox.onchange = setSecondEmail;
}

function setSecondEmail() {
    let selectEmailValue = emailSelectBox.options[emailSelectBox.selectedIndex].value;

    if(selectEmailValue != "") {
        secondEmailInput.value = selectEmailValue;
        setSecondEmailInputReadOnly();
    }else {
        secondEmailInput.value = "";
        disableSecondEmailInputReadOnly();
    }
}

function setSecondEmailInputReadOnly() {
    secondEmailInput.setAttribute("readonly", true);
    secondEmailInput.classList.add("selected-email");
}

function disableSecondEmailInputReadOnly() {
    secondEmailInput.removeAttribute("readonly", true);
    secondEmailInput.classList.remove("selected-email");
}

function authenticationRequest() {
    $.ajax({
        type: "get",
        url: `/api/v1/auth/phone/${mainPhoneNumberInput.value}`,
        dataType: "json",
        success: (response) => {
            randomAuthenticationNumber = response.data;
            alert(randomAuthenticationNumber);
        },
        error: errorMessage
    });

    const authenticationNumberDiv = document.querySelector(".authentication-number-div");

    removeVisibleClass(authenticationNumberDiv);
}

function checkAuthenticationNumber() {
    const authenticationNumber = authenticationNumberInput.value;

    if(authenticationNumber == randomAuthenticationNumber) {
        loadUserInfo();
    }else {
        alert("인증번호가 다릅니다.");
    }
    
}

function loadUserInfo() {
    let userInfo = null;
    let userId = getUserId();
    let requestType = getRequestType();

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/auth/${requestType}`,
        data: {
            "mainPhoneNumber": mainPhoneNumberInput.value,
            "userId": userId
        },
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                addResultContentClass();
                addVisibleClass(defaultAuthenticationView);
                removeVisibleClass(buttonDiv);
                addVisibleClass(mainContentNotice);
                userInfo = response.data;
            }else {
                alert("등록된 정보가 없습니다.");
            }
        },
        error: errorMessage
    });

    if(userInfo != null) {
        if(isIdForget()) {
            setUserIdView(userInfo);
    
        }else {
            resetUserPasswordView(userInfo);
        }

    }
}

// function removeAllResultContent() {
//     addVisibleClass(buttonDiv);
//     addVisibleClass(userPasswordSelect);
//     addVisibleClass(userIdSelect);
// }

// function clearAllInput() {
//     const emailOptions = document.querySelectorAll("select option");
//     firstEmailInput.value = "";

//     mainPhoneNumberInput.value = "";

//     authenticationNumberInput.value = "";

//     userIdInput.value = "";
    
//     emailOptions.forEach(option => {
//         if(option.value == "") {
//             option.selected = true;
//         }
//     });
// }

function addResultContentClass() {
    authenticationMainContent.classList.add("result-content");
}

// function removeResultContentClass() {
//     authenticationMainContent.classList.remove("result-content");
// }

function getUserId() {
    return userIdInput.value == null ? null : userIdInput.value;
}

function getRequestType() {
    let uri = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    return uri == "user-id" ? "user_id" : "user_password";
}

function setUserIdView(userInfo) {
    const userNameSpan = document.querySelector(".user-name-span");
    const userIdSpan = document.querySelector(".user-id-span");


    removeVisibleClass(userIdSelect);
    userNameSpan.textContent = userInfo.userName;
    userIdSpan.textContent = userInfo.userId;

    setUserIdViewButtonClickEvent();
}

function resetUserPasswordView(userInfo) {
    const emailNoticeDiv = document.querySelector(".email-notice-div");
    const userEmailSpan = document.querySelector(".user-email-span");

    addVisibleClass(passwordResetSelect);
    removeVisibleClass(userPasswordSelect);
    removeVisibleClass(emailNoticeDiv);

    buttonItems[0].textContent = "취소";
    buttonItems[1].textContent = "확인";
    userEmailSpan.textContent = userInfo.userEmail;

    setResetUserPasswordViewButtonClickEvent(userInfo);
}

function setUserIdViewButtonClickEvent() {
    buttonItems[0].onclick = loadMainPage;
    buttonItems[1].onclick = loadSigninPage;
}

function loadMainPage() {
    location.replace("/main");
}

function loadSigninPage() {
    location.replace("/auth/signin");
}

function setResetUserPasswordViewButtonClickEvent(userInfo) {
    buttonItems[0].onclick = loadForgetUserPasswordPage;
    buttonItems[1].onclick = () => sendEmail(userInfo);
}

function loadForgetUserPasswordPage() {
    location.replace("/auth/forget/user-password");
}

function sendEmail(userInfo) {
    let tempPassword = null;
    let email = firstEmailInput.value + "@" + secondEmailInput.value;

    if(!isEmpty(email.replaceAll("@", ""))) {
        let regEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;

        if(!regEmail.test(email)) {
            alert("이메일 양식이 올바르지 않습니다.");
            return false;
        }
        
    }else {
        email = userInfo.userEmail;

    }
    

    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/mail`,
        data: {
            "email" : email
        },
        dataType: "json",
        success: (response) => {
            tempPassword = response.data;
        },
        error: errorMessage
    });

    setTempPassword(tempPassword);
}

function setTempPassword(tempPassword) {
    alert(tempPassword);
    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/auth/password`,
        contentType: "application/json",
        data: JSON.stringify({
            "userId": userIdInput.value,
            "userPassword": tempPassword
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("이메일을 보냈습니다.\n보안을 위해 비밀번호를 변경해주세요.");
                location.replace("/main");
            }else {
                alert("이메일 전송 오류");
            }
        },
        error: errorMessage
    });
}

function isEmpty(data) {
    return data == "" || data == null || data == undefined;
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
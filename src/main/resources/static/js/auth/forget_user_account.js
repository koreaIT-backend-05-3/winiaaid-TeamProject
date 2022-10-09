const radioItems = document.querySelectorAll(".find-account-input-div input");

const passwordResetSelect = document.querySelector(".password-reset-select");
const userIdInput = document.querySelector("table input");

const mainContentNotice = document.querySelector(".main-content-notice");

const buttonDiv = document.querySelector(".button-div");
const buttonItems = document.querySelectorAll(".button-div button");


setRadioInputDefaultSelect();
setRadioChangeEvent();


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

function addResultContentClass() {
    authenticationMainContent.classList.add("result-content");
}

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
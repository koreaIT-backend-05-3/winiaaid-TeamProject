const authenticationMainContent = document.querySelector(".phone-authentication-div");
const defaultAuthenticationView = document.querySelector(".default-authentication-view");
const authenticationRequestButton = document.querySelector(".user-authentication-request-div button");
const authenticationCheckButton = document.querySelector(".authentication-number-div button");
const mainPhoneNumberInput = document.querySelector(".main-phone-number");

const authenticationNumberDiv = document.querySelector(".authentication-number-div");
const authenticationNumberInput = document.querySelector(".authentication-number-input");


const firstEmailInput = document.querySelector(".first-email");
const secondEmailInput = document.querySelector(".second-email");
const emailSelectBox = document.querySelector(".email-select-box");

const userIdSelect = document.querySelector(".user-id-select");
const userPasswordSelect = document.querySelector(".user-password-select");


let randomAuthenticationNumber = null;


setEmailSelectBoxChangeEvent();


authenticationRequestButton.onclick = authenticationRequest;
authenticationCheckButton.onclick = checkAuthenticationNumber;


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

    removeVisibleClass(authenticationNumberDiv);
}

function checkAuthenticationNumber() {
    const authenticationNumber = authenticationNumberInput.value;

    if(authenticationNumber == randomAuthenticationNumber) {
        if(isSignupStep2()) {
            checkUser();

        }else {
            loadUserInfo();

        }
    }else {
        alert("인증번호가 다릅니다.");
        clearAuthenticationNumber();
        addVisibleClass(authenticationNumberDiv);
    }
    
}

function isSignupStep2() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "step-test";
}

function checkUser() {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/auth/user`,
        data: {
            "mainPhoneNumber": mainPhoneNumberInput.value
        },
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                alert("이미 등록되어 있는 회원입니다.");
                clearAuthenticationNumber();
                addVisibleClass(authenticationNumberDiv);
                return false;

            }else {
                setMainPhoneNumberInLocalStorage();
                location.replace("/auth/signup/step3");
            }
        },
        error: errorMessage
    });
}

function clearAuthenticationNumber() {
    authenticationNumberInput.value = "";
}

function setMainPhoneNumberInLocalStorage() {
    localStorage.userMainPhoneNumber = JSON.stringify(mainPhoneNumberInput.value);
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
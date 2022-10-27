const userIdInput = document.querySelector(".username-input");
const saveIdCheckBox = document.querySelector(".save-id-input");
const signinButton = document.querySelector(".button-login");
const findUserIdButton = document.querySelector(".find-button-user-id");
const findUserPasswordButton = document.querySelector(".find-button-password");

checkCookieAndLoadUserId();

if(!checkWiniaLoginPage()) {
    const signupButton = document.querySelector(".button-area button");
    
    signupButton.onclick = loadSignupPage;
}

findUserIdButton.onclick = loadForgetUserIdPage;
findUserPasswordButton.onclick = loadForgetUserPassword;
signinButton.onclick = saveIdAndSignin;

function loadForgetUserIdPage() {
    location.href = "/auth/forget/user-id";
}

function loadForgetUserPassword() {
    location.href = "/auth/forget/user-password";
}

function loadSignupPage() {
    location.href = "/auth/signup/step1";
}

function checkWiniaLoginPage() {
    return location.pathname.indexOf("auth/winia/signin") != -1;
}

function saveIdAndSignin() {
    const loginForm = document.querySelector(".login-form");
    const saveIdInputFlag = saveIdCheckBox.checked;

    $.ajax({
        async: false,
        type: "post",
        url: "/api/v1/auth/save/user-id",
        contentType: "application/json",
        data: JSON.stringify({
            "saveIdInputFlag": saveIdInputFlag,
            "userId": userIdInput.value
        }),
        dataType: "json",
        success: (response) => {
            
        },
        error: errorMessage
    });
    
    loginForm.submit();
}

function checkCookieAndLoadUserId() {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/auth/user-id",
        datatType: "json",
        success: (response) => {
            if(response.data != null) {
                setUserId(response.data);
                saveIdCheckBox.setAttribute("checked", true);
            }
        },
        error: errorMessage
    });
}

function setUserId(userId) {
    userIdInput.value = userId;
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
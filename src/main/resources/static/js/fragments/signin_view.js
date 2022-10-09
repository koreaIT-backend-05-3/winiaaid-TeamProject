const findUserIdButton = document.querySelector(".find-button-user-id");
const findUserPasswordButton = document.querySelector(".find-button-password");


if(!checkWiniaLoginPage()) {
    const signupButton = document.querySelector(".button-area button");
    
    signupButton.onclick = loadSignupPage;
}

findUserIdButton.onclick = loadForgetUserIdPage;
findUserPasswordButton.onclick = loadForgetUserPassword;

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

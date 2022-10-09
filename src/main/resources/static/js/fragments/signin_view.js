const findUserIdButton = document.querySelector(".find-button-user-id");
const findUserPasswordButton = document.querySelector(".fint-button-password");
const signupButton = document.querySelector(".button-area button");


findUserIdButton.onclick = loadForgetUserIdPage;
findUserPasswordButton.onclick = loadForgetUserPassword;
signupButton.onclick = loadSignupPage;

function loadForgetUserIdPage() {
    location.href = "/auth/forget/user-id";
}

function loadForgetUserPassword() {
    location.href = "/auth/forget/user-password";
}

function loadSignupPage() {
    location.href = "/auth/signup/step1";
}
const findUserIdButton = document.querySelector(".find-button-user-id");
const findUserPasswordButton = document.querySelector(".fint-button-password");


findUserIdButton.onclick = loadForgetUserIdPage;
findUserPasswordButton.onclick = loadForgetUserPassword;

function loadForgetUserIdPage() {
    location.href = "/auth/forget/user-id";
}

function loadForgetUserPassword() {
    location.href = "/auth/forget/user-password";
}
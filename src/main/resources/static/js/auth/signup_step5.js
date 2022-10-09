const mainButton = document.querySelector(".button-center button");

setUserId();

mainButton.onclick = loadMainPage;

function setUserId() {
    const userIdSpan = document.querySelector(".user-id-span");

    let userInfoObject = JSON.parse(localStorage.userInfoObject);

    userIdSpan.textContent = userInfoObject.userId;
    
    localStorage.removeItem("userInfoObject");
}

function loadMainPage() {
    location.replace("/main");
}
const radioItems = document.querySelectorAll(".find-account-input-div input");
const authenticationButton = document.querySelector(".authentication-button");

setRadioInputDefaultSelect();
setRadioChangeEvent();

authenticationButton.onclick = authenticationRequest;

function setRadioInputDefaultSelect() {
    if(isIdForget()) {
        radioItems[0].checked = true;
    }else {
        radioItems[1].checked = true;
        toggleVisible();
    }
}

function isIdForget() {
    return location.pathname.indexOf("id") != -1;
}

function setRadioChangeEvent() {
    radioItems.forEach(radio => {
        radio.onchange = toggleVisible;
    });
}

function toggleVisible() {
    const passwordResetSelect = document.querySelector(".password-reset-select");

    passwordResetSelect.classList.toggle("visible");
}

function authenticationRequest() {
    if(isIdForget()) {


    }else {

        
    }
}
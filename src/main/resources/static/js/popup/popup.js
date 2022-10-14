function showModelNumberCheckPopup() {
    window.open("https://winiaaid-daegyeong.herokuapp.com/service/popup/model-name-popup", "modelCheckPopup", 
    "width=700, height=800");
}

function loadAddressPopup() {
    window.open("https://winiaaid-daegyeong.herokuapp.com/address/main", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastRequestInfoPopup() {
    window.open("https://winiaaid-daegyeong.herokuapp.com/service/popup/past-request-popup", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastAddressListInfoPopup() {
    window.open("https://winiaaid-daegyeong.herokuapp.com/service/popup/past-address-popup", "setAddressPopup", 
    "width=700, height=800");
}

function cancelPopup() {
    window.close();
}
function showModelNumberCheckPopup() {
    window.open("/service/popup/model-name-popup", "modelCheckPopup", 
    "width=700, height=800");
}

function loadAddressPopup() {
    window.open("/address/main", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastRequestInfoPopup() {
    window.open("/service/popup/past-request-popup", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastAddressListInfoPopup() {
    window.open("/service/popup/past-address-popup", "setAddressPopup", 
    "width=700, height=800");
}

function cancelPopup() {
    window.close();
}
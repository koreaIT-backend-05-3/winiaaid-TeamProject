function showModelNumberCheckPopup() {
    window.open("http://localhost:8000/service/popup/model-name-popup", "modelCheckPopup", 
    "width=700, height=800");
}

function loadAddressPopup() {
    window.open("http://localhost:8000/address/main", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastRequestInfoPopup() {
    window.open("http://localhost:8000/service/popup/past-request-popup", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastAddressListInfoPopup() {
    window.open("http://localhost:8000/service/popup/past-address-popup", "setAddressPopup", 
    "width=700, height=800");
}

function cancelPopup() {
    window.close();
}
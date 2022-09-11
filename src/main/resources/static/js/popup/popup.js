function showModelNumberCheckPopup() {
    window.open("http://localhost:8000/service/popup/modelNamePopup", "modelCheckPopup", 
    "width=700, height=800");
}

function loadAddressPopup() {
    window.open("http://localhost:8000/address/main", "setAddressPopup", 
    "width=700, height=800");
}

function loadPastRequestInfoPopup() {
    window.open("http://localhost:8000/service/popup/pastRequestPopup", "setAddressPopup", 
    "width=700, height=800");
}

function cancelPopup() {
    window.close();
}
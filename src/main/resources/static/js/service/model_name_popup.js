const cancelImage = document.querySelector(".cancel-image");

cancelImage.onclick = cancelPopup;

function loadModelCategory() {
    $.ajax({
        type: "get",
        url: "/api/v1/product/"
    })
}
const cancelImage = document.querySelector(".cancel-image");

let nowPage = 1;

cancelImage.onclick = cancelPopup;

let totalPage = getTotalPage(11, 3);
setPage(totalPage);

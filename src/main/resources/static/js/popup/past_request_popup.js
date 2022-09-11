const cancelImage = document.querySelector(".cancel-image");

let nowPage = 1;

cancelImage.onclick = cancelPopup;


let totalPage = getTotalPage(11);
setPage(totalPage);

function getTotalPage(totalCount) {
    return totalCount % 3 ? totalCount / 3 : Math.floor(totalCount / 3) + 1;
}

function setPage(totalPage) {
    const pageButtonDiv = document.querySelector(".page-button-div");
    let startPage = nowPage % 5 == 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
    
    let endPage = startPage + 4 < totalPage + 1 ? startPage + 4 : totalPage;

    domObjectClear(pageButtonDiv);

    if(startPage != 1) {
        pageButtonDiv.innerHTML += `
            <button class="pre-button" type="button">&lt;</button>
        `;
    }

    for(let i = startPage; i < endPage + 1; i++) {
        pageButtonDiv.innerHTML += `
            <button class="page-button ${nowPage == i ? "select-page-button" : ""}" type="button">${i}</button>
        `;
    }

    if(endPage != totalPage) {
        pageButtonDiv.innerHTML += `
            <button class="next-button" type="button">&gt;</button>
        `;
    }

    if(startPage != 1) {
        setPageButtonClickEvent("pre", startPage);
    }

    if(endPage != totalPage) {
        setPageButtonClickEvent("next", endPage);
    }

    setPageButtonClickEvent("page", null);
}

function setPageButtonClickEvent(type, page) {
    if(type == "pre") {
        const prePageButton = document.querySelector(".pre-button");

        prePageButton.onclick = () => {
            nowPage = page - 1;
            // searchAddress(nowPage);
        }
    }else if(type == "next") {
        const nextPageButton = document.querySelector(".next-button");

        nextPageButton.onclick = () => {
            nowPage = page + 1;
            // searchAddress(nowPage);
        }

    }else {
        const pageButtons = document.querySelectorAll(".page-button");

        pageButtons.forEach(pageButton => {
            pageButton.onclick = () => {
                nowPage = pageButton.textContent;
                // searchAddress(nowPage);
            }
        });
    }
}

function domObjectClear(domObject) {
    domObject.innerHTML = "";
}
function getTotalPage(totalCount, limitedShowCount) {
    return totalCount % limitedShowCount ? totalCount / limitedShowCount : Math.floor(totalCount / limitedShowCount) + 1;
}

function setPage(totalPage) {
    const pageButton = document.querySelector(".page-button-div");
    let startPage = nowPage % 5 == 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
    
    let endPage = startPage + 4 < totalPage + 1 ? startPage + 4 : totalPage;

    domObjectClear(pageButton);

    if(startPage != 1) {
        pageButton.innerHTML += `
            <button class="pre-button" type="button">&lt;</button>
        `;
    }

    for(let i = startPage; i < endPage + 1; i++) {
        pageButton.innerHTML += `
            <button class="page-button ${nowPage == i ? "select-page-button" : ""}" type="button">${i}</button>
        `;
    }

    if(endPage != totalPage) {
        pageButton.innerHTML += `
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

function domObjectClear(domObject) {
    domObject.innerHTML = "";
}

function setPageButtonClickEvent(type, page) {
    if(type == "pre") {
        const prePageButton = document.querySelector(".pre-button");

        prePageButton.onclick = () => {
            nowPage = page - 1;
            loadPage(nowPage);
        }
    }else if(type == "next") {
        const nextPageButton = document.querySelector(".next-button");

        nextPageButton.onclick = () => {
            nowPage = page + 1;
            loadPage(nowPage);
        }

    }else {
        const pageButtons = document.querySelectorAll(".page-button");

        pageButtons.forEach(pageButton => {
            pageButton.onclick = () => {
                nowPage = pageButton.textContent;
                loadPage(nowPage);
            }
        });
    }
}
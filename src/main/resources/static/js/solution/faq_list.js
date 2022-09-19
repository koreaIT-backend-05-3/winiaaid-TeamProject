const solutionTypeSelect = document.querySelector(".solution-type");

let boardType = null;
let solutionType = 0;

let selectProductCategoryCode = 0;
let selectProductCode = 0;

solutionTypeSelect.onchange = () => {
    solutionType = getSolutionTypeCode();
    console.log(solutionType);
    console.log(selectProductCategoryCode);
    console.log(selectProductCode);
}


boardType = checkBoardType();


function checkBoardType() {
    return location.pathname.indexOf("faq") != -1 ? "faq" : "self";
}

function getSolutionTypeCode() {
    const solutionType = document.querySelector(".solution-type");

    return solutionType.options[solutionType.selectedIndex].value;
}

function getWiniaAllProductFaqSolution() {
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/winia?board-type=faq`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
        },
        error: errorMessage
    });
}

function getDaewooAllProductFaqSolution() {
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/daewoo?board-type=faq`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
        },
        error: errorMessage
    });
}

function getSolutionListByProductCode(productCode) {
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/product-code/${productCode}?board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
        },
        error: errorMessage
    });
}

function setSolutionList(solutionList) {
    const solutionSearchResult = document.querySelector(".search-result");
    if(solutionList != null) {
        setSearchTotalCount(solutionList[0].totalCount);
        clearDomObject(solutionSearchResult);

        for(solution of solutionList) {
            solutionSearchResult.innerHTML += `
                <li class="list-unit">
                    <div class="faq-result">
                        <p class="title">${solution.solutionTitle}</p>
                        <dl>
                            <dt>제품</dt>
                            <dd>
                                <ul>
                                    <li>${solution.productCategoryName}${solution.productCategoryName == solution.productDetailName ? "" : " > " + solution.productDetailName}</li>
                                </ul>
                            </dd>
                        </dl>
                        <dl class="faq-type">
                            <dt>유형</dt>
                            <dd>${solution.solutionName}</dd>
                        </dl>
                    </div>
                    <div class="detail-service">
                        <button class="send-message" type="button">문자발송</button>
                        <p class="post-date">${solution.createDate.substring(0, 10).replaceAll("-", ".")}</p>
                    </div>
                </li>
            `;
        }

        
    }else {
        noticeNoResult(solutionSearchResult);
        setSearchTotalCount(0);
    }
}

function setSearchTotalCount(totalCount) {
    const searchTotalCountSpan = document.querySelector(".search-count-span")

    searchTotalCountSpan.textContent = totalCount;
}

function noticeNoResult(solutionSearchResult) {
    solutionSearchResult.innerHTML = `
    <li class="list-unit">
        <div class="data-none"><p>검색된 결과가 없습니다.</p><div>
    </li>`;

}
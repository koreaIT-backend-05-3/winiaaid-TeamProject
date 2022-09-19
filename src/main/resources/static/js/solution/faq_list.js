const solutionTypeSelect = document.querySelector(".solution-type");

let boardType = null;
let solutionType = 1;

let selectProductCategoryCode = 0;
let selectProductCode = 0;


boardType = checkBoardType();

solutionTypeSelect.onchange = () => {
    solutionType = getSolutionTypeCode();
}



function checkBoardType() {
    return location.pathname.indexOf("faq") != -1 ? "faq" : "self";
}

function getSolutionTypeCode() {
    return solutionTypeSelect.options[solutionTypeSelect.selectedIndex].value;
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

function getSolutionListByProductCategoryCode() {
    initializationSolutionTypeOption();
    solutionType = getSolutionTypeCode();
    console.log(solutionType);
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/product-category-code/${selectProductCategoryCode}?board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
        },
        error: errorMessage
    });
}

function getSolutionListByProductCode() {
    solutionType = getSolutionTypeCode();
    console.log(solutionType);
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/product-code/${selectProductCode}?board-type=${boardType}&solution-type=${solutionType}`,
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
        setSolutionTypeOption();
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

function setSolutionTypeOption() {
    solutionTypeSelect.innerHTML = `
        <option value="1">전체</option>
        <option value="2">기능</option>
        <option value="3">관리방법</option>
        <option value="4">내용물</option>
        <option value="5">사용법</option>
        <option value="6">성능</option>
        <option value="7">소음</option>
        <option value="8">외관/구조</option>
        <option value="9">증상</option>
        <option value="10">오류코드</option>
        <option value="11">기타</option>
    `;
}

function initializationSolutionTypeOption() {
    solutionTypeSelect.options[0].setAttribute("selected", true);
}

function removeSolutionTypeOption() {
    solutionTypeSelect.innerHTML = `<option value="1">전체</option>`;
}
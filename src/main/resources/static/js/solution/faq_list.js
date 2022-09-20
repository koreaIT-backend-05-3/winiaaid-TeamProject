const solutionTypeSelect = document.querySelector(".solution-type");
let optionItems = document.querySelectorAll(".solution-type option");

const searchInput = document.querySelector(".search-keyword");
const searchKeywordButton = document.querySelector(".search-keyword-td button");
const solutionSearchResult = document.querySelector(".search-result");
const searchKeywordResultNoticeDiv = document.querySelector(".search-keyword-result-notice");

let boardType = null;
let solutionType = 1;

let selectProductCategoryCode = 0;
let selectProductGroupCode = 0;
let selectProductCode = 0;


boardType = checkBoardType();

solutionTypeSelect.onchange = () => {
    solutionType = getSolutionTypeCode();
    console.log("check solutionType: " + solutionType);
    if(selectProductCode != 0) {
        console.log("제품")
        console.log(selectProductCode)
        getSolutionListByProductCode();
    }else if(selectProductGroupCode != 0) {
        console.log("그룹")
        console.log(selectProductGroupCode)
        getSolutionListByProductGroupCode();
    }else {
        console.log("카테고리")
        console.log(selectProductCategoryCode)
        getSolutionListByProductCategoryCode();
    }
}

searchInput.onkeypress = (event) => {
    if(event.keyCode == 13) {
        searchKeywordButton.click;
    }
}

searchKeywordButton.onclick = () => {
    if(selectProductCode != 0) {
        console.log("확인");
        searchSolutionByKeyWordAndProductCode();
    }else if(selectProductGroupCode != 0) {
        console.log("확인");
        searchSolutionByKeyWordAndProductGroupCode();
    }else if(selectProductCategoryCode != 0) {
        console.log("확인");
        searchSolutionByKeyWordAndProductCategoryCode();
    }else {
        if(company == "winia") {
            console.log("확인");
            searchWiniaAllProductSolutionByKeyWord();
        }else {
            console.log("확인");
            searchDaewooAllProductSolutionByKeyWord();
        }
    }
};



function checkBoardType() {
    return location.pathname.indexOf("faq") != -1 ? "faq" : "self";
}

function getSolutionTypeCode() {
    return solutionTypeSelect.options[solutionTypeSelect.selectedIndex].value;
}

function getWiniaAllProductFaqSolution() {
    removeSolutionTypeOption();

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/winia?board-type=faq`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function getDaewooAllProductFaqSolution() {
    removeSolutionTypeOption();

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/daewoo?board-type=faq`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function getSolutionListByProductCategoryCode() {
    solutionType = getSolutionTypeCode();
    
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-category-code/${selectProductCategoryCode}?board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            setSolutionTypeOption();
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function getSolutionListByProductGroupCode() {
    initializationSolutionTypeOption();
    solutionType = getSolutionTypeCode();
    
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-group-code/${selectProductGroupCode}?board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            setSolutionTypeOption();
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function searchSolutionByKeyWordAndProductGroupCode() {
    let keyword = searchInput.value;

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-group-code/${selectProductGroupCode}/search?keyword=${keyword}&board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            showSearchKeywordResultNotcie();
            setSearchKeywordTotalCount(response.data);
            setSearchKeywordNotice();
        },
        error: errorMessage
    });
}

function getSolutionListByProductCode() {
    solutionType = getSolutionTypeCode();
    console.log("solutionType: " + solutionType);
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-code/${selectProductCode}?board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function setSolutionList(solutionList) {
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
        noticeNoResult();
        setSearchTotalCount(0);
    }
}

function setSearchTotalCount(totalCount) {
    const searchTotalCountSpanItems = document.querySelectorAll(".search-count-span")

    searchTotalCountSpanItems.forEach(span => span.textContent = totalCount);
}

function noticeNoResult() {
    solutionSearchResult.innerHTML = `
    <li class="list-unit">
        <div class="data-none"><p>검색된 결과가 없습니다.</p><div>
    </li>`;

}

function setSolutionTypeOption() {
    optionItems = document.querySelectorAll(".solution-type option");

    if(optionItems.length == 1) {
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
}

function initializationSolutionTypeOption() {
    solutionTypeSelect.options[0].setAttribute("selected", true);
}

function removeSolutionTypeOption() {
    solutionTypeSelect.innerHTML = `<option value="1">전체</option>`;
}

function searchWiniaAllProductSolutionByKeyWord() {
    let keyword = searchInput.value;
    
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/winia/search?keyword=${keyword}&board-type=${boardType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            showSearchKeywordResultNotcie();
            setSearchKeywordTotalCount(response.data);
            setSearchKeywordNotice();
        },
        error: errorMessage
    });
}

function searchDaewooAllProductSolutionByKeyWord() {
    let keyword = searchInput.value;

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/daewoo/search?keyword=${keyword}&board-type=${boardType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            showSearchKeywordResultNotcie();
            setSearchKeywordTotalCount(response.data);
            setSearchKeywordNotice();
        },
        error: errorMessage
    });
}

function searchSolutionByKeyWordAndProductCategoryCode() {
    let keyword = searchInput.value;

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-category-code/${selectProductCategoryCode}/search?keyword=${keyword}&board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            showSearchKeywordResultNotcie();
            setSearchKeywordTotalCount(response.data);
            setSearchKeywordNotice();
        },
        error: errorMessage
    });
}

function searchSolutionByKeyWordAndProductCode() {
    let keyword = searchInput.value;

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-code/${selectProductCode}/search?keyword=${keyword}&board-type=${boardType}&solution-type=${solutionType}`,
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            showSearchKeywordResultNotcie();
            setSearchKeywordTotalCount(response.data);
            setSearchKeywordNotice();
        },
        error: errorMessage
    });
}

function showSearchKeywordResultNotcie() {
    removeVisibleClass(searchKeywordResultNoticeDiv);
}

function visibleSearchKeywordResultNoticeAndClearSearchInput() {
    addVisibleClass(searchKeywordResultNoticeDiv);
    searchInput.value = "";
}

function setSearchKeywordTotalCount(solutionDataList) {
    if(solutionDataList != null) {
        const searchTotalCountSpan = document.querySelectorAll(".search-count-span");
    
        searchTotalCountSpan.textContent = solutionDataList[0].totalCount;
    }
}

function setSearchKeywordNotice() {
    const keyword = document.querySelector(".keyword");

    keyword.textContent = searchInput.value;
}
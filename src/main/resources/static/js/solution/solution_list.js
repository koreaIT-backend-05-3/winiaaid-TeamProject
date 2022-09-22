const solutionTypeSelect = document.querySelector(".solution-type");
let optionItems = document.querySelectorAll(".solution-type option");

const searchInput = document.querySelector(".search-keyword");
const searchKeywordButton = document.querySelector(".search-keyword-td button");
const solutionSearchResult = document.querySelector(".search-result");
const searchKeywordResultNoticeDiv = document.querySelector(".search-keyword-result-notice");
const latestSortButton = document.querySelector(".latest-sort-button");


let boardType = null;
let solutionType = 1;

let selectProductCategoryCode = 0;
let selectProductGroupCode = 0;
let selectProductCode = 0;

let latestSortFlag = false;

boardType = checkBoardType();

checkPreviousInfoInLocalStorage();


solutionTypeSelect.onchange = () => {
    solutionType = getSolutionTypeCode();
    console.log("check solutionType: " + solutionType);
    getSolutionListByKeyCode();
}

searchInput.onkeypress = (e) => {
    if(e.keyCode == 13) {
        searchKeywordButton.click();
    }
}

searchKeywordButton.onclick = () => {
    getSolutionListByKeyCodeAndKeyword();
};

latestSortButton.onclick = sortChange;

function checkBoardType() {
    return location.pathname.indexOf("faq") != -1 ? "faq" : "self";
}

function getSolutionTypeCode() {
    return solutionTypeSelect.options[solutionTypeSelect.selectedIndex].value;
}

function getSolutionListByKeyCode() {

    console.log("제품코드: " + selectProductCode);
    console.log("그룹코드: " + selectProductGroupCode);
    console.log("카테고리: " + selectProductCategoryCode);
    
    if(selectProductCode != 0) {
        console.log("제품");
        console.log(selectProductCode);
        getSolutionListByProductCode();
    }else if(selectProductGroupCode != 0) {
        console.log("그룹");
        console.log(selectProductGroupCode);
        getSolutionListByProductGroupCode();
    }else if(selectProductCategoryCode != 0){
        console.log("카테고리");
        console.log(selectProductCategoryCode);
        getSolutionListByProductCategoryCode();
    }else {
        if(company == "winia") {
            console.log("winia");
            getWiniaAllProductFaqSolution();
        }else {
            console.log("daewoo");
            getDaewooAllProductFaqSolution();
        }
    }
}

function getSolutionListByKeyCodeAndKeyword() {

    console.log("제품코드: " + selectProductCode);
    console.log("그룹코드: " + selectProductGroupCode);
    console.log("카테고리: " + selectProductCategoryCode);
    
    if(selectProductCode != 0) {
        console.log("제품");
        searchSolutionByKeyWordAndProductCode();
    }else if(selectProductGroupCode != 0) {
        console.log("그룹");
        searchSolutionByKeyWordAndProductGroupCode();
    }else if(selectProductCategoryCode != 0) {
        console.log("카테고리");
        searchSolutionByKeyWordAndProductCategoryCode();
    }else {
        if(company == "winia") {
            console.log("winia");
            searchWiniaAllProductSolutionByKeyWord();
        }else {
            console.log("daewoo");
            searchDaewooAllProductSolutionByKeyWord();
        }
    }
}

function getWiniaAllProductFaqSolution() {
    removeSolutionTypeOption();

    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/winia?board-type=faq&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/daewoo?board-type=faq&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/${company}/product-category-code/${selectProductCategoryCode}?board-type=${boardType}&solution-type=${solutionType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/${company}/product-group-code/${selectProductGroupCode}?board-type=${boardType}&solution-type=${solutionType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/${company}/product-group-code/${selectProductGroupCode}/search?keyword=${keyword}&board-type=${boardType}&solution-type=${solutionType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
    console.log(company);
    console.log(selectProductCode);
    console.log(boardType);
    console.log(latestSortFlag);
    $.ajax({
        type: "get",
        url: `/api/v1/solution/list/${company}/product-code/${selectProductCode}?board-type=${boardType}&solution-type=${solutionType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        let solutionDataMap = new Map();

        setSearchTotalCount(solutionList[0].totalCount);
        clearDomObject(solutionSearchResult);

        for(solution of solutionList) {
            solutionSearchResult.innerHTML += `
                <li class="list-unit">
                    <div class="solution-content">
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

        setSolutionTitleClickEvent(solutionList);
        setSendMessageButtonClickEvent(solutionList);
    }else {
        noticeNoResult();
        setSearchTotalCount(0);
    }
}

function setSearchTotalCount(totalCount) {
    const searchTotalCountSpanItems = document.querySelectorAll(".search-count-span")

    searchTotalCountSpanItems.forEach(span => span.textContent = totalCount);
}

function loadSolutionDetailPage(solutionBoardCode) {
    location.href = `/solution/faq/detail/${solutionBoardCode}`;
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
        url: `/api/v1/solution/list/winia/search?keyword=${keyword}&board-type=${boardType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/daewoo/search?keyword=${keyword}&board-type=${boardType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/${company}/product-category-code/${selectProductCategoryCode}/search?keyword=${keyword}&board-type=${boardType}&solution-type=${solutionType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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
        url: `/api/v1/solution/list/${company}/product-code/${selectProductCode}/search?keyword=${keyword}&board-type=${boardType}&solution-type=${solutionType}&sort-type=${latestSortFlag ? "latest" : "viewed"}`,
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

function sortChange() {
    if(latestSortFlag) {
        latestSortFlag = false;
    }else {
        latestSortFlag = true;
    }

    if(isEmpty(searchInput.value)) {
        getSolutionListByKeyCode();
    }else {
        getSolutionListByKeyCodeAndKeyword();
    }
    changeSortButton();
}

function changeSortButton() {
    if(latestSortFlag) {
        latestSortButton.textContent = "조회순";
    }else {
        latestSortButton.textContent = "등록일순";
    }
}

function isEmpty(value) {
    return value == "" || value == undefined || value == null;
}

function checkPreviousInfoInLocalStorage() {
    let pastSolutionListHistoryInfoObject = localStorage.pastSolutionListHistoryInfoObject;
    localStorage.clear();

    if(pastSolutionListHistoryInfoObject != null) {
        pastSolutionListHistoryInfoObject = JSON.parse(pastSolutionListHistoryInfoObject);

        pastSolutionListHistoryInfoObject.companyCode == 1 ? daewoo.click() : winia.click();
        pastRequestServiceCategoryLoad(pastSolutionListHistoryInfoObject);
        pastRequestServiceDetailProductLoad(pastSolutionListHistoryInfoObject);
    }
}

function pastRequestServiceCategoryLoad(pastSolutionListHistoryInfoObject) {
    categoryImages = document.querySelectorAll(".category-image-li img");
    for(categoryImage of categoryImages) {
        console.log(pastSolutionListHistoryInfoObject.productGroupName);
        console.log(pastSolutionListHistoryInfoObject.productCategoryName);
        if(categoryImage.getAttribute("alt") == pastSolutionListHistoryInfoObject.productGroupName) {
            categoryImage.click();
            break;
        }else if(categoryImage.getAttribute("alt") == pastSolutionListHistoryInfoObject.productCategoryName) {
            categoryImage.click();
            break;
        }
    }
}

function pastRequestServiceDetailProductLoad(pastSolutionListHistoryInfoObject) {
    const productDetailNameItems= document.querySelectorAll(".detail-product-name");
    const productDetailImageItems = document.querySelectorAll(".product-detail-image");

    for(productDetailImage of productDetailImageItems) {
        if(productDetailImage.getAttribute("alt") == pastSolutionListHistoryInfoObject.productDetailName) {
            console.log(productDetailImage.getAttribute("alt"));
            productDetailImage.click();
            return;
        }
    }    
    for(productDetailName of productDetailNameItems) {
        if(productDetailName.textContent == pastSolutionListHistoryInfoObject.productDetailName) {
            console.log("체크");
            productDetailName.click();
            return;
        }
    }  
}
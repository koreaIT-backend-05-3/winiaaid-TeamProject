const solutionTypeSelect = document.querySelector(".solution-type");
let optionItems = document.querySelectorAll(".solution-type option");

const searchInput = document.querySelector(".search-keyword");
const searchKeywordButton = document.querySelector(".search-keyword-td button");
const solutionSearchResult = document.querySelector(".search-result");
const searchKeywordResultNoticeDiv = document.querySelector(".search-keyword-result-notice");
const latestSortButton = document.querySelector(".latest-sort-button");

const solutionTypeUnitItems = document.querySelectorAll(".type-unit li");


let boardType = null;
let solutionType = 1;

let selectProductCategoryCode = 0;
let selectProductGroupCode = 0;
let selectProductCode = 0;

let latestSortFlag = false;

boardType = getBoardType();

setSolutionListTypeView();
checkPreviousInfoInLocalStorage();


solutionTypeSelect.onchange = () => {
    solutionType = getSolutionTypeCode();
    console.log("check solutionType: " + solutionType);
    getSolutionList();
}

searchInput.onkeypress = (e) => {
    if(e.keyCode == 13) {
        searchKeywordButton.click();
    }
}

solutionTypeUnitItems[0].onclick = loadFaqPage;
solutionTypeUnitItems[1].onclick = loadSelfCheckPage;

searchKeywordButton.onclick = getSolutionListByKeyword;

latestSortButton.onclick = sortChange;

function getBoardType() {
    return location.pathname.indexOf("faq") != -1 ? "faq" : "selfCheck";
}

function getSolutionTypeCode() {
    return solutionTypeSelect.options[solutionTypeSelect.selectedIndex].value;
}

function getSolutionList() {

    console.log("제품코드: " + selectProductCode);
    console.log("그룹코드: " + selectProductGroupCode);
    console.log("카테고리: " + selectProductCategoryCode);
    
    if(selectProductCode != 0) {
        console.log("제품");
        console.log(selectProductCode);
        getSolutionListByKeyCode("product", selectProductCode);
    }else if(selectProductGroupCode != 0) {
        console.log("그룹");
        console.log(selectProductGroupCode);
        getSolutionListByKeyCode("group", selectProductGroupCode);
    }else if(selectProductCategoryCode != 0){
        console.log("카테고리");
        console.log(selectProductCategoryCode);
        getSolutionListByKeyCode("category", selectProductCategoryCode);
    }else {
        getAllProductSolutionByCompany();

    }
}

function getSolutionListByKeyword() {

    console.log("제품코드: " + selectProductCode);
    console.log("그룹코드: " + selectProductGroupCode);
    console.log("카테고리: " + selectProductCategoryCode);
    
    if(selectProductCode != 0) {
        console.log("제품");
        searchSolutionByKeyWordAndKeyCode("product", selectProductCode);
    }else if(selectProductGroupCode != 0) {
        console.log("그룹");
        searchSolutionByKeyWordAndKeyCode("group", selectProductGroupCode);
    }else if(selectProductCategoryCode != 0) {
        console.log("카테고리");
        searchSolutionByKeyWordAndKeyCode("category", selectProductCategoryCode);
    }else {
        searchAllProductSolutionByCompanyAndKeyWord();

    }
}

function getAllProductSolutionByCompany() {
    removeSolutionTypeOption();

    $.ajax({
        type: "get",
        url: `/api/v1/solution/${company}/${boardType}/list`,
        data: {
            "sortType": latestSortFlag ? "latest" : "viewed"
        },
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function getSolutionListByKeyCode(codeType, keyCode) {
    solutionType = getSolutionTypeCode();

    $.ajax({
        type: "get",
        url: `/api/v1/solution/${boardType}/list`,
        data: {
            "company": company,
            "codeType": codeType,
            "keyCode": keyCode,
            "solutionType": solutionType,
            "sortType": latestSortFlag ? "latest" : "viewed"
        },
        dataType: "json",
        success: (response) => {
            setSolutionList(response.data);
            setSolutionTypeOption();
            visibleSearchKeywordResultNoticeAndClearSearchInput();
        },
        error: errorMessage
    });
}

function searchAllProductSolutionByCompanyAndKeyWord() {
    let keyword = searchInput.value;
    
    $.ajax({
        type: "get",
        url: `/api/v1/solution/${company}/${boardType}/list`,
        dataType: "json",
        data: {
            "sortType": latestSortFlag ? "latest" : "viewed",
            "keyword": keyword
        },
        success: (response) => {
            setSolutionList(response.data);
            showSearchKeywordResultNotcie();
            setSearchKeywordTotalCount(response.data);
            setSearchKeywordNotice();
        },
        error: errorMessage
    });
}

function searchSolutionByKeyWordAndKeyCode(codeType, keyCode) {
    let keyword = searchInput.value;

    $.ajax({
        type: "get",
        url: `/api/v1/solution/${boardType}/list`,
        data: {
            "company": company,
            "codeType": codeType,
            "keyCode": keyCode,
            "solutionType": solutionType,
            "sortType": latestSortFlag ? "latest" : "viewed",
            "keyword": keyword
        },
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

function setSolutionTitleClickEvent(solutionInfoDataList) {
    const solutionTitleItems = document.querySelectorAll(".solution-content .title");

    for(let i = 0; i < solutionTitleItems.length; i++) {
        solutionTitleItems[i].onclick = () =>
            loadSolutionDetailPage(solutionInfoDataList[i].solutionBoardCode);
    }
}

function loadSolutionDetailPage(solutionBoardCode) {
    location.href = `/solution/${boardType == "faq" ? "faq" : "self-check"}/detail/${solutionBoardCode}`;
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
        getSolutionList();
    }else {
        getSolutionListByKeyword();
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

function setSolutionListTypeView() {
    const titleH1 = document.querySelector(".title-div h1");

    if(getBoardType() == "faq") {
        solutionTypeUnitItems[0].classList.add("selected-solution-type")
        titleH1.textContent = "자주하는 질문";
    }else {
        solutionTypeUnitItems[1].classList.add("selected-solution-type")
        titleH1.textContent = "자가진단";
    }
}

function loadFaqPage() {
    location.href = "/solution/faq/list"
}

function loadSelfCheckPage() {
    location.href = "/solution/self-check/list"
}

function isEmpty(value) {
    return value == "" || value == undefined || value == null;
}

function checkPreviousInfoInLocalStorage() {
    let pastSolutionListHistoryInfoObject = localStorage.pastSolutionListHistoryInfoObject;
    localStorage.clear();

    if(pastSolutionListHistoryInfoObject != null) {
        pastSolutionListHistoryInfoObject = JSON.parse(pastSolutionListHistoryInfoObject);

        console.log(pastSolutionListHistoryInfoObject.companyCode);
        pastSolutionListHistoryInfoObject.companyCode == 1 ? daewoo.click() : winia.click();
        pastRequestServiceCategoryLoad(pastSolutionListHistoryInfoObject);
        pastRequestServiceDetailProductLoad(pastSolutionListHistoryInfoObject);
    }
}

function pastRequestServiceCategoryLoad(pastSolutionListHistoryInfoObject) {
    categoryImages = document.querySelectorAll(".category-image-li img");
    console.log(pastSolutionListHistoryInfoObject.productGroupName);
    console.log(pastSolutionListHistoryInfoObject.productCategoryName);
    for(categoryImage of categoryImages) {
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
    console.log(pastSolutionListHistoryInfoObject.productDetailName)
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
const firstMenu = document.querySelector(".first-menu");
const secondMenu = document.querySelector(".second-menu");
const tbody = document.querySelector("tbody");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search button");
const completedResponseBox = document.querySelector(".check-box");

let firstMenuFlag = false;
let serviceHistoryType = null;

let lastUriSource = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

searchButton.onclick = () => loadPage(1);

searchInput.onkeypress = (e) => {
    if(e.keyCode == 13) {
        searchButton.click();
    }
}

serviceHistoryType = getHistoryTypeByUri();

setContentByServiceHistoryFlag();

loadPageHistoryByLocalStorage();

loadPage(nowPage);

firstMenuFlag = getFirstMenuFlag();

setMenuTypeViewByFirstMenuFlag(firstMenuFlag);


firstMenu.onclick = loadHistoryFirstMenuPage;
secondMenu.onclick = loadHistorySecondMenuPage;

function getFirstMenuFlag() {
    return lastUriSource.indexOf("ing") != -1 || lastUriSource.indexOf("counsel") != -1 ? true : false;
}

function getHistoryTypeByUri() {
    return location.pathname.indexOf("service") != -1 ? "service" : "writing";
}

function loadPage(page) {
    getServiceHistory(page);
}

function setContentByServiceHistoryFlag() {
    if(serviceHistoryType == "writing") {
        const mainTitle = document.querySelector(".main-title h1");
        const serviceExplaination = document.querySelector(".service-explaination span");
        const firstMenuSpan = document.querySelector(".first-menu-span");
        const secondMenuSpan = document.querySelector(".second-menu-span");
        const searchButton = document.querySelector(".search button");

        mainTitle.textContent = "나의 글보기";
        serviceExplaination.textContent = "서비스 이용 현황입니다.";
        firstMenuSpan.textContent = "상담문의 내역 ";
        secondMenuSpan.textContent = "고객의 소리 내역 ";
        searchButton.textContent = "선택";

        removeVisibleClassOfWritingViewsItem();
        setTheadContent();
        setSelectOption();

    }
}

function getServiceHistory(page) {
    nowPage = page;
    let serviceType = getServiceType();
    let historyMenuType = getHistoryMenuType();

    if(serviceHistoryType == "service") {
        $.ajax({
            type: "get",
            url: `/api/v1/service/${serviceType}/history/list/user/${userCode}?progressStatus=${historyMenuType}&page=${page}`,
            dataType: "json",
            success: (response) => {
                if(response.data != null) {
                    let totalPage = getTotalPage(response.data[0].totalCount, 10);
                    setPage(totalPage);
                    setFirstAndSecondMenuCount(response.data[0].incompletedTotalCount, response.data[0].completedTotalCount);
                    setTotalCount(response.data[0].totalCount);
                    setServiceHistoryData(response.data);
                }else {
                    setEmptyList(tbody);
                    setTotalCount(0);
                    setFirstAndSecondMenuCount(response.data[0].incompletedTotalCount, response.data[0].completedTotalCount);
                }
            },
            error: errorMessage
            
        });

    }else {

        let completedResponseFlag = completedResponseBox.checked;

        isEmpty(searchInput.value) ? url = `/api/v1/service/writing/${serviceType}/history/list/user/${userCode}?menuType=${historyMenuType}&completedResponse=${completedResponseFlag}&page=${page}` 
        : url = `/api/v1/service/writing/${serviceType}/history/list/user/${userCode}?menuType=${historyMenuType}&completedResponse=${completedResponseFlag}&keyword=${searchInput.value}&page=${page}`;

        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            success: (response) => {
                if(response.data.length > 1) {
                    let totalPage = getTotalPage(response.data[0].totalCount, 10);
                    setPage(totalPage);
                    setFirstAndSecondMenuCount(response.data[0].counselTotalCount, response.data[0].customerTotalCount);
                    setTotalCount(response.data[0].totalCount);
                    setServiceHistoryData(response.data);
                }else {
                    setEmptyList(tbody);
                    setTotalCount(0);
                    setFirstAndSecondMenuCount(response.data[0].counselTotalCount, response.data[0].customerTotalCount);
                }
            },
            error: errorMessage
        });

    }
}

function getServiceType() {
    const selectOption = document.querySelector(".search select");

    return selectOption.options[selectOption.selectedIndex].value;
}

function getHistoryMenuType() {
    return lastUriSource.indexOf("ing") != -1
            && lastUriSource.indexOf("end") == -1 ? "ing" 
            : lastUriSource.indexOf("end") != -1
            && lastUriSource.indexOf("ing") == -1 ? "end"
            : lastUriSource.indexOf("counsel") != -1 ? "counsel" : "customer";
}

function setServiceHistoryData(serviceHistoryDataList) {

    clearDomObject(tbody);

    let fristData = true;

    for(serviceHistoryData of serviceHistoryDataList) {
        if(isFirstData(fristData)) {
            fristData = false;
            continue;
        }

        let progressStatus = serviceHistoryData.progressStatus;
        if(serviceHistoryType == "service") {
            
            tbody.innerHTML += `
            <tr>
                <td><span class="service-code">${serviceHistoryData.serviceCode}</span></td>
                <td class="service-type">${serviceHistoryData.serviceTypeName}</td>
                <td class="product-info">${serviceHistoryData.productName}</td>
                <td>${serviceHistoryData.requestDate}</td>
                <td class="${progressStatus == 0 ? "cancel-td" : progressStatus == 1 ? "register-td" : "complete-td"}">${progressStatus == 0 ? "접수 취소" : progressStatus == 1 ? "접수 완료" : "방문 완료"}</td>
                <td>${progressStatus == 1 ? "<div class='reservation-modify-button-div'><button class='modify-button' type='button'>예약변경</button><button class='cancel-button' type='button'>예약취소</button></div>" : ""}</td>
            </tr>
            `;

        }else {
            tbody.innerHTML += `
            <tr>
                <td>${serviceHistoryData.companyName}</td>
                <td><span class="service-code">${serviceHistoryData.boardCode}</span></td>
                <td class="service-type">${serviceHistoryData.boardTypeName}</td>
                <td class="product-info">${serviceHistoryData.boardTitle}</td>
                <td>${serviceHistoryData.createDate}</td>
                <td class="${progressStatus == 0 ? "cancel-td" : progressStatus == 1 ? "register-td" : "complete-td"}">${progressStatus == 0 ? "취소" : progressStatus == 1 ? "진행중" : "해결"}</td>
                </tr>
            `;
        }


    }


    setServiceCodeItemsClickEvent(serviceHistoryDataList);
    if(firstMenuFlag && serviceHistoryType == "service") {
        setServiceModifyAndCancelButtonClickEvent(serviceHistoryDataList);
    }
}

function setFirstAndSecondMenuCount(firstMenuTotalCount, secondMenuTotalCount) {
    const firstMenuCountSpan = document.querySelector(".first-menu-count");
    const secondMenuCountSpan = document.querySelector(".second-menu-count");

    firstMenuCountSpan.textContent = `(${firstMenuTotalCount})`;
    secondMenuCountSpan.textContent = `(${secondMenuTotalCount})`;
}

function setTotalCount(totalCount) {
    const searchTotalCount = document.querySelector(".search-total-count");

    searchTotalCount.textContent = totalCount;
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function setEmptyList(tbody) {
    tbody.innerHTML = `
    <tr>
        <td colspan="6">서비스 신청 내역이 없습니다.</td>
    </tr>
    `;
}

function isFirstData(fristData) {
    return fristData;
}

function setServiceCodeItemsClickEvent(serviceHistoryDataList) {
    const serviceCodeItems = document.querySelectorAll(".service-code");

    for(let i = 0; i < serviceCodeItems.length; i++) {
        serviceCodeItems[i].onclick = () => {

            localStorage.locationInfo = "history";

            setPageInfoLocalStorage();

            if(serviceHistoryType == "service") {
                if(serviceHistoryDataList[i + 1].serviceTypeCode == 2) {
                    location.href = `/service/visit/inquiry/detail/${serviceHistoryDataList[i + 1].serviceCode}`;

                }else if(serviceHistoryDataList[i + 1].serviceTypeCode == 3) {
                    ///////////////////////// 리콜 신청 조회
                    location.href = `/service/recall/inquiry/detail/${serviceHistoryDataList[i + 1].serviceCode}`;
                    
                }

            }else {
                let boardType = getBoardTypeCode(serviceHistoryDataList[i + 1].boardTypeCode);
                location.href = `/customer/${boardType}/detail/${serviceHistoryDataList[i + 1].boardCode}`;
            }
            
        }
    }
}

function setPageInfoLocalStorage() {
    let serviceType = getServiceType();
    
    let pageInfo = {
        "page": nowPage,
        "serviceType": serviceType,
        "completedResponseFlag": completedResponseBox.checked,
        "keyword": searchInput.value
    };

    localStorage.pageInfo = JSON.stringify(pageInfo);
}

function setServiceModifyAndCancelButtonClickEvent(serviceHistoryDataList) {
    const serviceHistoryList = document.querySelectorAll("tbody tr");


    for(let i = 0; i < serviceHistoryList.length; i++) {
        const modifyButton = serviceHistoryList[i].querySelector(".modify-button");
        const cancelButton = serviceHistoryList[i].querySelector(".cancel-button");

        modifyButton.onclick = () => {

            setPageInfoLocalStorage();

            if(serviceHistoryDataList[i + 1].serviceTypeCode == 2) {
                modifyReservationService(serviceHistoryDataList[i + 1].serviceCode);

            }else if(serviceHistoryDataList[i + 1].serviceTypeCode == 3) {
                /////////////// 리콜 신청 수정, 삭제
                console.log(serviceHistoryDataList[i + 1].serviceCode);
            }
        }
        cancelButton.onclick = () => {

            setPageInfoLocalStorage();

            if(serviceHistoryDataList[i + 1].serviceTypeCode == 2) {
                cancelReservationService(serviceHistoryDataList[i + 1].serviceCode);

            }else if(serviceHistoryDataList[i + 1].serviceTypeCode == 3) {
                /////////////// 리콜 신청 수정, 삭제
                console.log(serviceHistoryDataList[i + 1].serviceCode);
            }
        }
    }
}

function setMenuTypeViewByFirstMenuFlag(firstMenuFlag) {
    firstMenuFlag ? addSelectedClass(firstMenu) : addSelectedClass(secondMenu);
}

function addSelectedClass(domObject) {
    domObject.classList.add("selected-menu-type");
}

function loadHistoryFirstMenuPage() {
    if(serviceHistoryType == "service") {
        location.href = "/mypage/service/history/ing";

    }else {
        location.href = "/mypage/writing/counsel";
    }
}

function loadHistorySecondMenuPage() {
    if(serviceHistoryType == "service") {
        location.href = "/mypage/service/history/end";

    }else {
        location.href = "/mypage/writing/customer";
    }
}

function getBoardTypeCode(boardTypeCode) {
    return boardTypeCode == 1 ? "complaint" : boardTypeCode == 2 ? "praise" : "suggestion";
}

function getLocalStorageData() {
    let pageHistory = localStorage.pageInfo;

    if(pageHistory != null) {
        return pageHistory;
    }else {
        return null;
    }
}

function loadPageHistoryByLocalStorage() {
    let localStorageData = getLocalStorageData();
    if(localStorageData != null) {
        const selectOptionItems = document.querySelectorAll("select option");

        localStorageData = JSON.parse(localStorageData);
    
        selectOptionItems.forEach(option => {
            if(option.value == localStorageData.serviceType) {
                option.setAttribute("selected", true);
            }
        });
        
        localStorageData.completedResponseFlag ? completedResponseBox.setAttribute("checked", true) : "";
        searchInput.value = localStorageData.keyword;
        let page = localStorageData.page;
        localStorage.removeItem("pageInfo");
        loadPage(page);
    }
}

function removeVisibleClassOfWritingViewsItem() {
    const checkBoxDiv = document.querySelector(".check-box-div");
    const searchInput = document.querySelector(".search-input");

    checkBoxDiv.classList.remove("visible");
    searchInput.classList.remove("visible");
}

function setTheadContent() {
    const tHead = document.querySelector("thead");

    tHead.innerHTML = `
    <tr>
        <th>접수대상 브랜드</th>
        <th>접수번호</th>
        <th>구분</th>
        <th>제목</th>
        <th>등록일</th>
        <th>진행상태</th>
    </tr>
    `;
}

function setSelectOption() {
    const select = document.querySelector("select");

    select.innerHTML = `
        <option value="all">전체</option>
        <option value="complaint">불편합니다</option>
        <option value="praise">칭찬합니다</option>
        <option value="suggestion">제안합니다</option>
    `;
}

function isEmpty(data) {
    return data == "" || data == undefined || data == null;
}

function errorMessage(request, status, error){
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
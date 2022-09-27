const ingMenu = document.querySelector(".menu-type .ing");
const endMenu = document.querySelector(".menu-type .end");
const tbody = document.querySelector("tbody");
const searchButton = document.querySelector(".search button");

let userCode = 0;
let completedFlag = false;

loadPage(1);

completedFlag = getCompletedFlag();

setMenuTypeViewByCompletedFlag(completedFlag);

searchButton.onclick = () => loadPage(1);

ingMenu.onclick = loadHistoryIngPage;
endMenu.onclick = loadHistoryEndPage;

function getCompletedFlag() {
    return location.pathname.indexOf("ing") != -1 ? false : true;
}

function loadPage(page) {
    getServiceHistory(page);
}

function getServiceHistory(page) {
    let serviceType = getServiceType();
    let progressStatus = getProgressStatus();

    $.ajax({
        type: "get",
        url: `/api/v1/service/${serviceType}/title/history/list/user/${userCode}?requestType=history&progressStatus=${progressStatus}&page=${page}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                let totalPage = getTotalPage(response.data[0].totalCount, 10);
                setPage(totalPage);
                setCompletedCountAndIncompletedCount(response.data[0].incompletedTotalCount, response.data[0].completedTotalCount);
                setTotalCount(response.data[0].totalCount);
                setServiceHistoryData(response.data);
            }else {
                setEmptyList(tbody);
                setTotalCount(0);
                setCompletedCountAndIncompletedCount(0, 0);
            }
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function getServiceType() {
    const selectOption = document.querySelector(".search select");

    return selectOption.options[selectOption.selectedIndex].value;
}

function getProgressStatus() {
    return location.pathname.indexOf("ing") != -1 ? "ing" : "end";
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

    }
}

function setCompletedCountAndIncompletedCount(incompletedTotalCount, completedTotalCount) {
    ingMenu.textContent = `진행 (${incompletedTotalCount})`;
    endMenu.textContent = `완료 (${completedTotalCount})`;
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

function setMenuTypeViewByCompletedFlag(completedFlag) {
    completedFlag ? addSelectedClass(endMenu) : addSelectedClass(ingMenu);
}

function addSelectedClass(domObject) {
    domObject.classList.add("selected-menu-type");
}

function loadHistoryIngPage() {
    location.href = "/mypage/service/history/ing";
}

function loadHistoryEndPage() {
    location.href = "/mypage/service/history/end";
}
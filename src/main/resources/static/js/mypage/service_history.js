const selectOption = document.querySelector(".search select");

let userCode = 0;
let completedFlag = false;


completedFlag = getCompletedFlag();

selectOption.onchange = () => loadPage(1);

loadPage(1);


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
            let totalPage = getTotalPage(response.data[0].reservationInfo.totalCount, 10);
            setPage(totalPage);
            setServiceHistoryData(response.data);
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function getServiceType() {
    return selectOption.options[selectOption.selectedIndex].value;
}

function getProgressStatus() {
    return location.pathname.indexOf("ing") == -1 ? "ing" : "end";
}

function setServiceHistoryData(serviceHistoryDataList) {
    const tbody = document.querySelector("tbody");

    clearDomObject(tbody);

    if(serviceHistoryDataList != null) {

        for(serviceHistoryData of serviceHistoryDataList) {
            let progressStatus = serviceHistoryData.reservationInfo.progressStatus;
            
            tbody.innerHTML += `
            <tr>
                <td><span class="service-code">${serviceHistoryData.productInfo.serviceCode}</span></td>
                <td class="service-type">${serviceHistoryData.reservationInfo.serviceTypeName}</td>
                <td class="product-info">${serviceHistoryData.productInfo.productDetailName} ${serviceHistoryData.productInfo.productCategoryName == serviceHistoryData.productInfo.productDetailName ? "" : " > " + serviceHistoryData.productInfo.productDetailName}</td>
                <td>${serviceHistoryData.reservationInfo.reservationDate}</td>
                <td class="${progressStatus == 0 ? "cancel-td" : progressStatus == 1 ? "register-td" : "complete-td"}">${progressStatus == 0 ? "접수 취소" : progressStatus == 1 ? "접수 완료" : "방문 완료"}</td>
                <td>${progressStatus == 1 ? "<div class='reservation-modify-button-div'><button class='modify-button' type='button'>예약변경</button><button class='cancel-button' type='button'>예약취소</button></div>" : ""}</td>
            </tr>
            `;
        }
        
    }else {
        setEmptyList(tbody);
    }
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

let userCode = 0;

loadPage(1);

function loadPage(page) {
    getRepairServiceHistory(page)
}

function getRepairServiceHistory(page) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/history/window/user/${userCode}?company=all&page=${page}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                let totalPage = getTotalPage(response.data[0].reservationInfo.totalCount, 10);
                setPage(totalPage);
                setRepairServiceHistoryData(response.data);
            }
        },
        error: errorMessage
    });
}

function setRepairServiceHistoryData(repairDataList) {
    const tbody = document.querySelector("tbody");

    clearDomObject(tbody);

    if(isEmpty(repairDataList)) {
        tbody.innerHTML = `
        <tr>
            <td colspan="7">서비스 신청 내역이 없습니다.</td>
        </tr>`;
    }else {
        for(repairData of repairDataList) {
            let completedFlag = repairData.reservationInfo.completedFlag;
            tbody.innerHTML += `
            <tr>
                <td>${repairData.productInfo.companyName}</td>
                <td>${repairData.productInfo.repairServiceCode}</td>
                <td>${repairData.reservationInfo.serviceType}</td>
                <td>${repairData.productInfo.productCategoryName == repairData.productInfo.productDetailName ? "" : repairData.productInfo.productCategoryName + " > "} ${repairData.productInfo.productDetailName}</td>
                <td>${repairData.reservationInfo.requestDate}</td>
                <td class="${completedFlag == 0 ? "cancel-td" : completedFlag == 1 ? "register-td" : "complete-td"}">${completedFlag == 0 ? "접수 취소" : completedFlag == 1 ? "접수 완료" : "방문 완료"}</td>
                <td>${repairData.reservationInfo.note == null ? "" : repairData.reservationInfo.note}</td>
            </tr>
            `;
        }
    }
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function errorMessage(request, status, error) {
    alert("요청중에 에러가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
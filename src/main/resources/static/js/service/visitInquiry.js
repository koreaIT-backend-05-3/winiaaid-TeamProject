let userCode = 0;

let repairDataList = getRepairServiceHistory(userCode);
setRepairServiceHistoryData(repairDataList);

function getRepairServiceHistory(userCode) {
    let repairDataList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/history/user/${userCode}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                repairDataList = response.data
            }
        },
        error: errorMessage
    });

    return repairDataList;
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
            tbody.innerHTML += `
            <tr>
                <td>${repairData.productInfo.companyName}</td>
                <td>${repairData.productInfo.repairServiceCode}</td>
                <td>${repairData.reservationInfo.serviceType}</td>
                <td>${repairData.productInfo.productCategoryName == repairData.productInfo.productDetailName ? "" : repairData.productInfo.productCategoryName + " > "} ${repairData.productInfo.productDetailName}</td>
                <td>${repairData.reservationInfo.requestDate}</td>
                <td>${repairData.reservationInfo.completedFlag}</td>
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
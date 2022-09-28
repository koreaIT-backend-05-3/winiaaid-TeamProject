let userCode = 0;

loadPage(1);

function loadPage(page) {
    getRepairServiceHistoryList(page)
}

function getRepairServiceHistoryList(page) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/history/list/user/${userCode}?progressStatus=all&page=${page}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                let totalPage = getTotalPage(response.data[0].totalCount, 10);
                setPage(totalPage);
                setRepairServiceHistoryData(response.data);
            }
        },
        error: errorMessage
    });
}

function setRepairServiceHistoryData(repairDataList) {
    const tbody = document.querySelector("tbody");
    const requestCount = document.querySelector(".request-count");

    requestCount.textContent = repairDataList[0].totalCount;

    clearDomObject(tbody);

    if(isEmpty(repairDataList)) {
        tbody.innerHTML = `
        <tr>
            <td colspan="7">서비스 신청 내역이 없습니다.</td>
        </tr>`;
    }else {
        
        let fristData = true;

        for(repairData of repairDataList) {
            if(isFirstData(fristData)) {
                fristData = false;
                continue;
            }
            let progressStatus = repairData.progressStatus;
            tbody.innerHTML += `
            <tr class="history-list">
                <td>${repairData.companyName}</td>
                <td><span class="repair-service-code-span">${repairData.serviceCode}</span></td>
                <td>${repairData.serviceTypeName}</td>
                <td>${repairData.productName}</td>
                <td>${repairData.requestDate}</td>
                <td class="${progressStatus == 0 ? "cancel-td" : progressStatus == 1 ? "register-td" : "complete-td"}">${progressStatus == 0 ? "접수 취소" : progressStatus == 1 ? "접수 완료" : "방문 완료"}</td>
                <td>${progressStatus == 1 ? "<div class='reservation-modify-button-div'><button class='modify-button' type='button'>예약변경</button><button class='cancel-button' type='button'>예약취소</button></div>" : ""}</td>
            </tr>
            `;
        }

        const repairServiceCodeSpanItems = document.querySelectorAll(".repair-service-code-span");
        
        setRepairServiceCodeSpanClickEvent(repairServiceCodeSpanItems);
        setButtonClickEvent();
    }
}

function setRepairServiceCodeSpanClickEvent(repairServiceCodeSpanItems) {

    for(repairServiceCodeSpan of repairServiceCodeSpanItems) {
        repairServiceCodeSpan.onclick = (e) => {
            location.href = `/service/visit/inquiry/detail/${e.target.textContent}`;
        }
    }
}

function setButtonClickEvent(index) {
    const reservationHistoryItems = document.querySelectorAll(".history-list");
    
    for(reservationHistory of reservationHistoryItems) {
        const modifyButton = reservationHistory.querySelector(".modify-button");
        const cancelButton = reservationHistory.querySelector(".cancel-button");

        if(modifyButton != null) {
            const serviceCode = reservationHistory.querySelector(".repair-service-code-span").textContent;
            modifyButton.onclick = () => modifyReservationService(serviceCode);
        
            cancelButton.onclick = () => cancelReservationService(serviceCode);

        }
    }
    
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function isFirstData(fristData) {
    return fristData;
}

function errorMessage(request, status, error) {
    alert("요청중에 에러가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
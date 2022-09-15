let repairServiceCode = null;

repairServiceCode = getRepairServiceCodeByUri();

loadReservationDetailInfo();

function getRepairServiceCodeByUri() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function loadReservationDetailInfo() {
    getReservationDetailInfo();
}

function getReservationDetailInfo() {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/detail/history/${repairServiceCode}`,
        dataType: "json",
        success: (response) => {
            setReservationDetailInfo(response.data);
        },
        error: (request, status, error) => {
            alert("요청중에 오류가 발생했습니다.")
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    })
}

function setReservationDetailInfo(reservationDetailInfo) {
    const reservationInfoTable = document.querySelector(".reservation-info-table");
    const userInfoTable = document.querySelector(".uesr-info-table");

    if(reservationDetailInfo != null) {
        const productInfoObject = reservationDetailInfo.productInfo;
        const userInfoObject = reservationDetailInfo.userInfo;
        const reservationObject = reservationDetailInfo.reservationInfo;

        const completeFlag = reservationObject.completedFlag;

        reservationInfoTable.innerHTML = `
            <tr>
                <th>접수번호</th>
                <td>${productInfoObject.repairServiceCode}</td>
                <th>서비스 구분</th>
                <td class="emphasis-td">${reservationObject.serviceType}</td>
            </tr>
            <tr>
                <th>접수일</th>
                <td>${reservationObject.requestDate}</td>
                <th>서비스예정일</th>
                <td>${reservationObject.reservationDate}</td>
            </tr>
            <tr>
                <th>신청 대상 브랜드</th>
                <td>${productInfoObject.companyName}</td>
                <th>제품명</th>
                <td>${productInfoObject.productCategoryName == productInfoObject.productDetailName ? "" : productInfoObject.productCategoryName + " > "}${productInfoObject.productDetailName}</td>
            </tr>
            <tr>
                <th>모델명</th>
                <td>${productInfoObject.modelNumber}</td>
                <th>엔지니어</th>
                <td>${reservationObject.engineerName}님</td>
            </tr>
            <tr>
                <th>진행상태</th>
                <td ${completeFlag == 0 ? "class='service-cancel'" : completeFlag == 1 ? "class='service-receive'" : "class='service-complete'"}>${completeFlag == 0 ? "접수 취소" : completeFlag == 1 ? "접수 완료" : "해결"}</td>
                <th>고장증상</th>
                <td>${productInfoObject.troubleSymptom}</td>
            </tr>
            <tr>
                <th>상세내용</th>
                <td>${productInfoObject.description}</td>
                <th>예약변경/취소 및 평가하기</th>
                <td>${completeFlag == 1 ? '<div class="reservation-modify-button-div"><button type="button">예약변경</button><button type="button">예약취소</button></div>' : ''}</td>
            </tr>
        `;
    }
}
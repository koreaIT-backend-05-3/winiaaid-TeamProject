const goListButton = document.querySelector(".go-list-button");

let serviceCode = null;
let progressStatus = 0;

serviceCode = getServiceCodeByUri();


loadReservationDetailInfo();

goListButton.onclick = loadListPage;


function getServiceCodeByUri() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function loadReservationDetailInfo() {
    getReservationDetailInfo();
}

function getReservationDetailInfo() {
    let userName = getUserNameByAuthenticationInfo();
    
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/detail/history/${serviceCode}?userCode=${userCode}&userName=${userName}&adminFlag=${isAdmin()}`,
        dataType: "json",
        success: (response) => {
            setReservationDetailInfo(response.data);
        },
        error: (request, status, error) => {
            if(request.status == 400) {
                alert("잘못된 접근입니다.");
                location.replace("/main");
            }
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}




function setReservationDetailInfo(reservationDetailInfo) {
    const reservationInfoTable = document.querySelector(".reservation-info-table");
    const userInfoTable = document.querySelector(".uesr-info-table");

    if(reservationDetailInfo != null) {
        const productInfoObject = reservationDetailInfo.productInfo;
        const userInfoObject = reservationDetailInfo.userInfo;
        const reservationObject = reservationDetailInfo.reservationInfo;

        progressStatus = reservationObject.progressStatus;

        reservationInfoTable.innerHTML = `
            <tr>
                <th>접수번호</th>
                <td>${productInfoObject.serviceCode}</td>
                <th>서비스 구분</th>
                <td class="emphasis-td">${reservationObject.serviceTypeName}</td>
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
                <td ${progressStatus == 0 ? "class='service-cancel'" : progressStatus == 1 ? "class='service-receive'" : "class='service-complete'"}>${progressStatus == 0 ? "접수 취소" : progressStatus == 1 ? "접수 완료" : "방문 완료"}</td>
                <th>고장증상</th>
                <td>${productInfoObject.troubleSymptom}</td>
            </tr>
            <tr>
                <th>상세내용</th>
                <td>${productInfoObject.description}</td>
                <th>예약변경/취소 및 평가하기</th>
                <td>${progressStatus == 1 ? `<div class="reservation-modify-button-div"><button class="modify-button ${isAdmin() ? 'visible' : ''}" type="button">예약변경</button>${isAdmin() ? '<button class="complete-button" type="button">방문완료</button>' : ''}<button class="cancel-button" type="button">예약취소</button></div>` : ''}</td>
            </tr>
        `;

        userInfoTable.innerHTML = `
            <tr>
                <th>성명</th>
                <td>${userInfoObject.userName}</td>
                <th>휴대폰번호</th>
                <td class="emphasis-td">${userInfoObject.mainPhoneNumber}</td>
            </tr>
            <tr>
                <th>연락가능번호</th>
                <td>${userInfoObject.subPhoneNumber == null ? userInfoObject.mainPhoneNumber : userInfoObject.subPhoneNumber}</td>
                <th>이메일</th>
                <td>${userInfoObject.userEmail == null ? "" : userInfoObject.userEmail}</td>
            </tr>
        `;

        if(progressStatus == 1) {
            setButtonClickEvent();
        }
    }
}

function loadListPage() {
    let locationInfo = localStorage.locationInfo;

    let url = null;

    if(locationInfo != null) {
        localStorage.removeItem("locationInfo");
        
        if(locationInfo == "inquiry") {
            url = `/service/visit/inquiry`;

        }else if(locationInfo == "manager") {
            url = "/manager/service";

        }else {
            url = `/mypage/service/history/${progressStatus == 1 ? "ing" : "end"}`;

        }

    }else {
        url = `/service/visit/inquiry`;
    }

    location.href = url;
}

function setButtonClickEvent() {
    const completeButton = document.querySelector(".complete-button");
    const modifyButton = document.querySelector(".modify-button");
    const cancelButton = document.querySelector(".cancel-button");

    const serviceType = "repair";

    completeButton.onclick = () => completeReservationService(serviceType, serviceCode);
    modifyButton.onclick = () => modifyReservationService(serviceCode);
    cancelButton.onclick = () => cancelReservationService(serviceCode);
}
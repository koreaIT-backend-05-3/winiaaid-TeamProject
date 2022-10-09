const serviceCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

lockItems();
getReservationInfo();
changeRequestButtonToModifyButton();

function getReservationInfo() {
    let userName = getUserNameByAuthenticationInfo();

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/detail/history/${serviceCode}?userCode=${userCode}&userName=${userName}`,
        dataType: "json",
        success: (response) => {
            setPastReservationInfo(response.data);
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

function setPastReservationInfo(reservationInfo) {
    let pastHistoryInfoObject = {
        "companyCode": reservationInfo.productInfo.companyCode,
        "productGroupName": reservationInfo.productInfo.productGroupName,
        "productCategoryName": reservationInfo.productInfo.productCategoryName,
        "productDetailName": reservationInfo.productInfo.productDetailName,
        "productModelNumber": reservationInfo.productInfo.modelNumber,
        "troubleCode": reservationInfo.productInfo.troubleCode,
        "description": reservationInfo.productInfo.description,

        "userName": reservationInfo.userInfo.userName,
        "email": reservationInfo.userInfo.email,
        "mainPhoneNumber": reservationInfo.userInfo.mainPhoneNumber,
        "subPhoneNumber": reservationInfo.userInfo.subPhoneNumber,
        "postalCode": reservationInfo.userInfo.postalCode,
        "mainAddress": reservationInfo.userInfo.mainAddress,
        "detailAddress": reservationInfo.userInfo.detailAddress,

        "engineerCode": reservationInfo.reservationInfo.engineerCode,
        "reservationDay": reservationInfo.reservationInfo.reservationDate.substring(0, reservationInfo.reservationInfo.reservationDate.indexOf(" ")),
        "reservationTime": reservationInfo.reservationInfo.reservationDate.substring(reservationInfo.reservationInfo.reservationDate.indexOf(" ") + 1),
    };
    savePreviousInfoToLocalStorage(pastHistoryInfoObject);
}

function savePreviousInfoToLocalStorage(pastHistoryInfoObject) {
    localStorage.pastHistoryInfoObject = JSON.stringify(pastHistoryInfoObject);
    
    changeUpdateView();
}

function changeRequestButtonToModifyButton() {
    requestButton.textContent = "예약 변경";
    cancelButton.textContent = "변경 취소";
}

function lockItems() {
    for(let i = 0; i < 3; i++) {
        removeVisibleClass(stepLocks[i]);
    }
}
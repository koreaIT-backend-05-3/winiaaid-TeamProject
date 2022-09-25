const serviceCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

lockItems();
getReservationInfo();
changeRequestButtonToModifyButton();

function getReservationInfo() {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/detail/history/${serviceCode}`,
        dataType: "json",
        success: (response) => {
            setPastReservationInfo(response.data);
        },
        error: errorMessage
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
    for(let i = 0; i < 2; i++) {
        removeVisibleClass(stepLocks[i]);
    }
}
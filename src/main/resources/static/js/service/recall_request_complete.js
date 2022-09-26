const checkButton = document.querySelector('.check-button')

let serviceCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);;

loadRecallRequestComplete();

function loadRecallRequestComplete(userName, userCode){
    $.ajax({
        type: "get",
        url: `/api/v1/service/recall/${serviceCode}?userName=${userName}&userCode=${userCode}`,
        dataType: "json",
        async: false,
        success: (response) => {
            getRecallRequest(response.data)
        },
        error : errorMessage
    })
}

function getRecallRequest(recallRequest){
    const recallCodes = document.querySelectorAll('.recall-code');
    const serviceType = document.querySelector('.service-type')
    const modelName = document.querySelector('.model-name')
    const requestDate = document.querySelector('.request-date')
    const userName = document.querySelector('.user-name')
    const mainPhoneNumber = document.querySelector('.main-phone-number')
    const subPhoneNumber = document.querySelector('.sub-phone-number')
    const address = document.querySelector('.address')

    serviceCode = recallRequest.productInfo.serviceCode;

    recallCodes[0].innerText = serviceCode;
    recallCodes[1].innerText = `(${serviceCode})`;
    serviceType.innerText = recallRequest.reservationInfo.serviceTypeName;
    modelName.innerText = recallRequest.productInfo.modelNumber;
    requestDate.innerText = recallRequest.reservationInfo.requestDate;
    userName.innerText = recallRequest.userInfo.userName;
    mainPhoneNumber.innerText = recallRequest.userInfo.mainPhoneNumber;

    if(recallRequest.userInfo.subPhoneNumber == null){
        subPhoneNumber.innerText = recallRequest.userInfo.mainPhoneNumber;
    } else{
        subPhoneNumber.innerText = recallRequest.userInfo.subPhoneNumber;
    }

    address.innerText = recallRequest.userInfo.address;
}

checkButton.onclick = () => {
    location.replace('/')
}

function errorMessage(request, status, error) {
    alert("요청 중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
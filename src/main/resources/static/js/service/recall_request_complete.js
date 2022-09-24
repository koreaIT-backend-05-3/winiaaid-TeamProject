const checkButton = document.querySelector('.check-button')

let recallCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);;

loadRecallRequestComplete();

function loadRecallRequestComplete(userName, userCode){
    $.ajax({
        type: "get",
        url: `/api/v1/service/recall/${recallCode}?userName=${userName}&userCode=${userCode}`,
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

    recallCode = recallRequest.recallCode;

    recallCodes[0].innerText = recallRequest.recallCode;
    recallCodes[1].innerText = `(${recallRequest.recallCode})`;
    serviceType.innerText = recallRequest.serviceType;
    modelName.innerText = recallRequest.modelName;
    requestDate.innerText = recallRequest.requestDate;
    userName.innerText = recallRequest.userName;
    mainPhoneNumber.innerText = recallRequest.mainPhoneNumber;

    if(recallRequest.subPhoneNumber == null){
        subPhoneNumber.innerText = recallRequest.mainPhoneNumber;
    } else{
        subPhoneNumber.innerText = recallRequest.subPhoneNumber;
    }

    address.innerText = recallRequest.address;
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
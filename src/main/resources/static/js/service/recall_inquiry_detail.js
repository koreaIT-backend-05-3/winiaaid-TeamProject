const listButton = document.querySelector('.list-button')
let serviceCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
let progressStatus = 0;

loadRecallRequestComplete();

listButton.onclick = () => {
    let locationInfo = localStorage.locationInfo;
    let url = null;

    if(locationInfo != null) {
        if(locationInfo == "inquiry") {
            url = `/service/recall/inquiry`;

        }else {
            url = `/mypage/service/history/${progressStatus == 1 ? "ing" : "end"}`;

        }

    }else {
        url = `/service/recall/inquiry`;
    }

    localStorage.removeItem("locationInfo");
    location.href = url;
}

function loadRecallRequestComplete(){
    let userName = getUserNameByAuthenticationInfo();

    $.ajax({
        type: "get",
        url: `/api/v1/service/recall/${serviceCode}?userCode=${userCode}&userName=${userName}`,
        dataType: "json",
        async: false,
        success: (response) => {
            getRecallRequest(response.data)
            addCancelButton(response.data)
            addcancelClickEvent(response.data.productInfo.serviceCode)
        },
        error : errorMessage
    })
}

function getRecallRequest(recallRequest){
    const recallCode = document.querySelector('.recall-code');
    const serviceType = document.querySelector('.service-type')
    const modelName = document.querySelector('.model-name')
    const requestDate = document.querySelector('.request-date')
    const userName = document.querySelector('.user-name')
    const mainPhoneNumber = document.querySelector('.main-phone-number')
    const subPhoneNumber = document.querySelector('.sub-phone-number')
    const address = document.querySelector('.address')
    const progressStatus = document.querySelector('.progress-status')

    serviceCode = recallRequest.productInfo.serviceCode;

    recallCode.innerText = serviceCode;
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
    progressStatus.innerText = recallRequest.reservationInfo.progressStatus == 0 ? "접수 취소" : recallRequest.reservationInfo.progressStatus == 1 ? "접수 완료" : "방문 완료";
}

function addCancelButton(data){
	const note = document.querySelector('.note')
	progressStatus = data.reservationInfo.progressStatus;
	if(progressStatus == 1){
		note.innerHTML = "<button class='cancel'>신청취소</button>"
	}else{
		note.innerHTML = ""
	}
	
}

function addcancelClickEvent(serviceCode) {
	const requestCancelButton = document.querySelector('.cancel')
	if(requestCancelButton){
		requestCancelButton.onclick = () => {
			if(confirm("신청을 취소하시겠습니까?")){
				updateCancelRecallRequest(serviceCode);		
			}
		}		
	}
}

function updateCancelRecallRequest(serviceCode){
	$.ajax({
		async: false,
		type: "put",
		url: `/api/v1/service/recall/cancel/${serviceCode}`,
		dataType: "json",
		success: (response) => {
			loadRecallRequestComplete();
		},
		error: errorMessage
	})
}

function errorMessage(request, status, error) {
    if(request.status == 400) {
        alert("잘못된 접근입니다.");
        location.replace("/main");
    }
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}

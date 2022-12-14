const listButton = document.querySelector('.list-button')
let serviceCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
let progressStatus = 0;

loadRecallRequestComplete();

listButton.onclick = () => {
    let locationInfo = localStorage.locationInfo;
    let url = null;

    if(locationInfo != null) {
        localStorage.removeItem("locationInfo");
        
        if(locationInfo == "inquiry") {
            url = `/service/recall/inquiry`;

        }else if(locationInfo == "manager") {
            url = "/manager/service";

        }else {
            url = `/mypage/service/history/${progressStatus == 1 ? "ing" : "end"}`;

        }

    }else {
        url = `/service/recall/inquiry`;
    }

    location.href = url;
}

function loadRecallRequestComplete(){
    let userName = getUserNameByAuthenticationInfo();

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/recall/${serviceCode}?userCode=${userCode}&userName=${userName}&adminFlag=${isAdmin()}`,
        dataType: "json",
        async: false,
        success: (response) => {
            getRecallRequest(response.data)
            addCancelButton(response.data)
            addcancelClickEvent(response.data.productInfo.serviceCode)
            addCompleteButtonClickEvent();
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

    address.innerText = `${recallRequest.userInfo.postalCode} ${recallRequest.userInfo.mainAddress} ${recallRequest.userInfo.detailAddress}`;
    progressStatus.innerText = recallRequest.reservationInfo.progressStatus == 0 ? "????????????" : recallRequest.reservationInfo.progressStatus == 1 ? "????????????" : "????????????";
}

function addCancelButton(data){
	const note = document.querySelector('.note')
	progressStatus = data.reservationInfo.progressStatus;
	if(progressStatus == 1) {
		note.innerHTML = `${isAdmin() ? '<button class="complete-button" type="button">????????????</button><button class="cancel">????????????</button>' : '<button class="cancel">????????????</button>'}`;
	}else{
		note.innerHTML = ""
	}
	
}

function addcancelClickEvent(serviceCode) {
	const requestCancelButton = document.querySelector('.cancel')
	if(requestCancelButton){
		requestCancelButton.onclick = () => {
			if(confirm("????????? ?????????????????????????")){
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
			isAdmin() ? location.replace("/manager/service") : loadRecallRequestComplete();
		},
		error: errorMessage
	})
}

function addCompleteButtonClickEvent() {
    const completeButton = document.querySelector(".complete-button");

    const serviceType = "recall";

    completeButton.onclick = () => completeReservationService(serviceType, serviceCode);
}

function errorMessage(request, status, error) {
    if(request.status == 400) {
        alert("????????? ???????????????.");
        location.replace("/main");
    }
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
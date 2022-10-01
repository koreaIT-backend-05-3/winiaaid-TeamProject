let loginTest = true;

const listButton = document.querySelector('.list-button')
let serviceCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

loadRecallRequestComplete();


if(loginTest){
	listButton.onclick = () => {
		location.href = `/service/recall/inquiry`
	}
}else{
	listButton.onclick = () => {
		location.href = `/service/recall/inquiry?serviceCode=${serviceCode}`
	}	
}

function loadRecallRequestComplete(){
    $.ajax({
        type: "get",
        url: `/api/v1/service/recall/${serviceCode}`,
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
    progressStatus.innerText = recallRequest.reservationInfo.progressStatus;
}

function addCancelButton(data){
	const note = document.querySelector('.note')
	const progressStatus = data.reservationInfo.progressStatus
	if(progressStatus == "접수완료"){
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
    alert("요청 중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
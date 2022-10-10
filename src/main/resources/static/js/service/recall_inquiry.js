const table = document.querySelector('.recall-history table tbody')
const remainingNumber = document.querySelector('.remaining-number')
const dataNone = document.querySelector('.data-none')

let nowPage = 1;


load(nowPage);

function load(nowPage) {
	$.ajax({
		async: false,
		type: "get",
		url: `/api/v1/service/recall/list/${nowPage}?userCode=${user.userCode}`,
		dataType: "json",
		success: (response) => {
			if(response.data[0] != null) {
				getRecallRequestList(response.data);
				remainingNumber.innerText = response.data[0].reservationInfo.totalCount
				getPageNumbers(response.data[0].reservationInfo.totalCount)
				addcancelClickEvent()
				addServiceCodeClickEvent()
			}
		},
		error: errorMessage
	})
}

function addcancelClickEvent() {
	const requestCancelButtons = document.querySelectorAll('.cancel')
	if(requestCancelButtons){
		requestCancelButtons.forEach(button => {
			button.onclick = () => {
				if(confirm("신청을 취소하시겠습니까?")){
					let serviceCode = button.parentElement.parentElement.firstElementChild.textContent
					updateCancelRecallRequest(serviceCode);		
				}
			}
		})			
	}
}

function addServiceCodeClickEvent(){
	const recallCodes = document.querySelectorAll('.recall-code a')
	if(recallCodes){
		recallCodes.forEach(code => {
			code.onclick = () => {
				let recallCode = code.innerText;
				
				localStorage.locationInfo = "inquiry";
				
				location.href = `/service/recall/inquiry/detail/${recallCode}`
			}
		})		
	}
}

function getRecallRequestList(list){
	table.innerHTML = ""
	
	list.forEach(recall => {
		let progressStatus = recall.reservationInfo.progressStatus == 0 ? "접수취소" : recall.reservationInfo.progressStatus == 1 ? "접수완료" : "방문완료";
		table.innerHTML += `
			<tr>
	            <td class="recall-code"><a href="#">${recall.productInfo.serviceCode}</a></td>
	            <td class="service-type">${recall.reservationInfo.serviceTypeName}</td>
	            <td class="model-name">${recall.productInfo.modelNumber}</td>
	            <td class="request-date">${recall.reservationInfo.requestDate}</td>
	            <td class="progress-status">${progressStatus}</td>
	            <td class="note">${progressStatus == "접수완료" ? "<button class='cancel'>신청취소</button>" : ""}</td>
	        </tr>
		`
		console.log(recall.reservationInfo.serviceTypeName)
	})
	
}

function getRecallRequest(data){
	const progressStatus = data.reservationInfo.progressStatus
	table.innerHTML = `
			<tr>
	            <td class="recall-code"><a href="#">${data.productInfo.serviceCode}</a></td>
	            <td class="service-type">${data.reservationInfo.serviceTypeName}</td>
	            <td class="model-name">${data.productInfo.modelNumber}</td>
	            <td class="request-date">${data.reservationInfo.requestDate}</td>
	            <td class="progress-status">${data.reservationInfo.progressStatus}</td>
	            <td class="note">${progressStatus == "접수완료" ? "<button class='cancel'>신청취소</button>" : ""}</td>
	        </tr>
		`
	
}

function updateCancelRecallRequest(serviceCode){
	$.ajax({
		async: false,
		type: "put",
		url: `/api/v1/service/recall/cancel/${serviceCode}`,
		dataType: "json",
		success: (response) => {
			if(userCode != 0) {
				location.replace("/service/visit/inquiry");
				
			}else {
				location.replace("/main");
				
			}
		},
		error: errorMessage
	})
}

function getPageNumbers(totalCount){
	const pageButtons = document.querySelector('.paging ul');
	
	const totalPageCount = totalCount % 10 == 0 ? totalCount / 10 : (totalCount / 10) + 1;
	const startIndex = nowPage % 5 == 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
	const endIndex = startIndex + 4 <= totalPageCount ? startIndex + 4 : totalPageCount;
	
	pageButtons.innerHTML = ``;
	
	for(let i = startIndex; i <= endIndex; i++) {
		pageButtons.innerHTML += `
			<li class='page'><button>${i}</button></li>
		`
	}
	
	const pageNumberButtons	= document.querySelectorAll('.page')
	pageNumberButtons.forEach(button => {
		if(button.textContent == nowPage){
			button.classList.add('on');
		}
		button.onclick = () => {
			nowPage = button.textContent;
			load(nowPage);
			for(let i = 0; i < pageNumberButtons.length; i++){
				pageNumberButtons[i].classList.remove('on')
			}
			button.classList.add('on');
		}
	})
}

function errorMessage(request, status, error) {
    alert("요청중에 에러가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
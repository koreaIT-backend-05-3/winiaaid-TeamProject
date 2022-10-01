let loginTest = true;


const searchModelButton = document.querySelector('.search-model')
const checkModelButton = document.querySelector('.check-model')
const searchModelInputs = document.querySelector('.search-model-inputs')
const searchModelResult = document.querySelector('.result')
const searchModelResultUl = searchModelResult.querySelector('ul')
const writeModel = document.querySelector('.write-model')
const searchButton = document.querySelector('.search-button')
const modelResult = document.querySelector('.model-result')
const searchAddressButtonn = document.querySelector('.search-address-button')
const userNameInput = document.querySelector('.user-name-input')
const mainPhoneNumber = document.querySelectorAll('.main-phone-number .phone-number')
const subPhoneNumber = document.querySelectorAll('.sub-phone-number .phone-number')
const postalCodeInput = document.querySelector('.postal-code')
const addressMainInput = document.querySelector('.address-main')
const addressDetailInput = document.querySelector('.address-detail')
const agreementDiv = document.querySelector('.agreement')
const protectionCheck = document.querySelector("#protection")
const privacyHandlingCheck = document.querySelector("#privacy-handling")
const submitButton = document.querySelector('.submit-button')

let modelList = new Array();
let modelCode = 0;


if(loginTest){	//로그인 시
	userNameInput.value = '테스트'
	userNameInput.disabled='true'
	
	mainPhoneNumber[0].value = '010'
	mainPhoneNumber[1].value = '1111'
	mainPhoneNumber[2].value = '2222'
	mainPhoneNumber.forEach(number => {
		number.disabled = 'true'
	})
	
	postalCodeInput.value = '11111'
	addressMainInput.value = '테스트주소'
	addressDetailInput.value = '테스트상세주소'
	
	protectionCheck.checked = 'true'
	privacyHandlingCheck.checked = 'true'
	agreementDiv.remove();
}


searchModelButton.onclick = () => {
	modelResult.innerText = '';
    searchModelInputs.style.visibility = 'visible';
}

checkModelButton.onclick = showModelNumberCheckPopup;

writeModel.oninput = () => {
    setTimeout(function(){
        writeModel.value = writeModel.value.replace(/[^a-zA-Z0-9-()]/ig, '')
    }, 100);
}

mainPhoneNumber[1].oninput = () => {
    onlyNumberOnInput(mainPhoneNumber[1]);
}
mainPhoneNumber[2].oninput = () => {
    onlyNumberOnInput(mainPhoneNumber[2]);
}
subPhoneNumber[1].oninput = () => {
    onlyNumberOnInput(subPhoneNumber[1]);
}
subPhoneNumber[2].oninput = () => {
    onlyNumberOnInput(subPhoneNumber[2]);
}

searchAddressButtonn.onclick = loadAddressPopup;


searchButton.onclick = () => {
    if(writeModel.value == ''){
        alert('검색하실 모델명을 입력해주세요.');
        writeModel.focus()
    }else if(writeModel.value.length < 2){
        alert('최소 2자리 이상 입력해 주세요.')
    }else{
		searchModelResultUl.innerHTML = '';
        let modelDataList = searchModelByModelName();
		checkNullModelList(modelDataList);
        addclickEventModelResult(modelDataList);
    }
}

writeModel.onkeypress = () => {
    if(window.event.keyCode == 13){
        searchButton.onclick();
    }
}

submitButton.onclick = () => {
	if(checkRequiredInput() == true){

        productInfoObject = {
            "modelCode": modelCode,
			"modelNumber": modelResult.innerText
        }

        userInfoObject = {
            "userCode": 0,
			"userName": userNameInput.value,
			"mainPhoneNumber": `${mainPhoneNumber[0].value}-${mainPhoneNumber[1].value}-${mainPhoneNumber[2].value}`,
			"subPhoneNumber": subPhoneNumber[0].value == '선택' ? null : `${subPhoneNumber[0].value}-${subPhoneNumber[1].value}-${subPhoneNumber[2].value}`,
			"postalCode": postalCodeInput.value,
			"mainAddress": addressMainInput.value,
			"detailAddress": addressDetailInput.value
        }

		requestData = {
            "productInfoObject": productInfoObject,
            "userInfoObject": userInfoObject
		}

		submitRequest(requestData);    
    }
}


function onlyNumberOnInput(input) {
    setTimeout(function(){
        input.value = input.value.replace(/[^0-9]/ig, '')
    },100)
}

function addclickEventModelResult(modelDataList) {
    const searchModelResultLi = searchModelResultUl.querySelectorAll('li')
    for(let i = 0; i < searchModelResultLi.length; i++) {
        searchModelResultLi[i].onclick = () => {
            modelResult.innerText = searchModelResultLi[i].innerText
            writeModel.value = '';
            modelList = [];
            searchModelResultUl.innerHTML = '';
            searchModelResult.style.display ='none'
            searchModelInputs.style.visibility = 'collapse';

            modelCode = modelDataList[i].modelCode;
        }
    }
}


function checkNullModelList(modelList){
	if(modelList != null){
		for(model of modelList){
			searchModelResultUl.innerHTML += `<li>${model.modelNumber}</li>`
		}
		searchModelResult.style.display ='block'
	}else{
		alert("제품에 해당되는 모델명이 없습니다.\n확인 후 다시 입력해주세요.");
		searchModelResult.style.display ='none'
	}
}

function searchModelByModelName() {
    let modelList = null;
    $.ajax({
        type: "get",
        url: `/api/v1/product/model/list/${writeModel.value}?request-type=recall&code=1`,
        dataType: "json",
        async: false,
        success: (response) => {
            modelList = response.data;
        },
        error: errorMessage
    });

    return modelList;
}

function setAddressInput(postalCode, mainAddress, detailAddress) {
    postalCodeInput.value = postalCode;
    addressMainInput.value = mainAddress;
    addressDetailInput.value = detailAddress;

    addressDetailInput.focus();
}

function checkRequiredInput() {
    if(isEmpty(modelResult.innerText)){
        alert('모델명을 선택해주세요.')
        searchModelButton.onclick();
        writeModel.focus();
        return false;
    }else if(isEmpty(userNameInput.value)){
        alert('성명을 입력해주세요.');
        userNameInput.focus();
        return false;
    }else if(isEmpty(mainPhoneNumber[1].value && mainPhoneNumber[2].value) || mainPhoneNumber[0].value == "선택"){
        alert('휴대폰번호를 입력해주세요.')
        if(mainPhoneNumber[0].value == "선택"){
            mainPhoneNumber[0].focus();
            mainPhoneNumber[1].value;
        }else if(isEmpty(mainPhoneNumber[1].value)){
            mainPhoneNumber[1].focus();
        }else if(isEmpty(mainPhoneNumber[2].value)){
            mainPhoneNumber[2].focus();
        }
        return false;
    }else if(mainPhoneNumber[1].value.length < 3 || mainPhoneNumber[2].value.length < 4){
        alert('휴대폰번호를 확인해주세요.')
        if(mainPhoneNumber[1].value.length < 3){
            mainPhoneNumber[1].focus();
        }else if(mainPhoneNumber[2].value.length < 4){
            mainPhoneNumber[2].focus();
        }
        return false;
    }else if(isEmpty(addressMainInput.value)){
        alert('주소를 입력해주세요')
        return false;
    }else if(protectionCheck.checked == false){
        alert('개인정보 수집 및 이용에 동의해주세요')
        return false;
    }else if(privacyHandlingCheck.checked == false){
        alert('개인정보 위탁 처리에 동의해주세요')
        return false;
    }else{
        return true;
    }
}

function submitRequest(requestData){
	$.ajax({
		type: "post",
		url: "/api/v1/service/recall/request",
		contentType: "application/json",
		data: JSON.stringify(requestData),
		async: false,
		dataType: "json",
		success: (response) => {
			alert('상담사가 고객님께 전화드려 방문시간을 안내해 드리도록 하겠습니다.\n- 신청이 많아 14일 이내에 안내 전화 드리겠습니다.\n- 신속하게 처리를 해 드리지 못해 죄송합니다.')
            location.href = `/service/recall/request/complete/${response.data.productInfoEntity.service_code}`;
            document.querySelector('.recall-form').reset();
		},
		error: errorMessage
	})
}

function resetValues(){
    userNameInput.value = '';
    mainPhoneNumber[0]
}

function isEmpty(data) {
    return data == null || data == undefined || data == '';
}

function errorMessage(request, status, error) {
    alert("요청 중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
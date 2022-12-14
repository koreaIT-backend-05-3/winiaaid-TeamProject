const inquiryButton = document.querySelector(".inquiry-button");
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

if(user != null){ 
	userNameInput.value = user.userName
	userNameInput.disabled='true'
	
	let phone = user.mainPhoneNumber.split('-')
	mainPhoneNumber[0].value = phone[0]
	mainPhoneNumber[1].value = phone[1]
	mainPhoneNumber[2].value = phone[2]
	mainPhoneNumber.forEach(number => {
		number.disabled = 'true'
	})
	
	postalCodeInput.value = user.postalCode
	addressMainInput.value = user.mainAddress
	addressDetailInput.value = user.detailAddress
	
	protectionCheck.checked = 'true'
	privacyHandlingCheck.checked = 'true'
	agreementDiv.remove();
}

inquiryButton.onclick = loadRecallInquiryPage;


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
        alert('???????????? ???????????? ??????????????????.');
        writeModel.focus()
    }else if(writeModel.value.length < 2){
        alert('?????? 2?????? ?????? ????????? ?????????.')
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
            "userCode": userCode,
			"userName": userNameInput.value,
			"mainPhoneNumber": `${mainPhoneNumber[0].value}-${mainPhoneNumber[1].value}-${mainPhoneNumber[2].value}`,
			"subPhoneNumber": subPhoneNumber[0].value == '??????' ? null : `${subPhoneNumber[0].value}-${subPhoneNumber[1].value}-${subPhoneNumber[2].value}`,
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

function loadRecallInquiryPage() {
    location.href = "/service/recall/inquiry";
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
		alert("????????? ???????????? ???????????? ????????????.\n?????? ??? ?????? ??????????????????.");
		searchModelResult.style.display ='none'
	}
}

function searchModelByModelName() {
    let modelList = null;
    $.ajax({
        type: "get",
        url: `/api/v1/product/model/list/${writeModel.value}?requestType=recall&code=1`,
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
        alert('???????????? ??????????????????.')
        searchModelButton.onclick();
        writeModel.focus();
        return false;
    }else if(isEmpty(userNameInput.value)){
        alert('????????? ??????????????????.');
        userNameInput.focus();
        return false;
    }else if(isEmpty(mainPhoneNumber[1].value && mainPhoneNumber[2].value) || mainPhoneNumber[0].value == "??????"){
        alert('?????????????????? ??????????????????.')
        if(mainPhoneNumber[0].value == "??????"){
            mainPhoneNumber[0].focus();
            mainPhoneNumber[1].value;
        }else if(isEmpty(mainPhoneNumber[1].value)){
            mainPhoneNumber[1].focus();
        }else if(isEmpty(mainPhoneNumber[2].value)){
            mainPhoneNumber[2].focus();
        }
        return false;
    }else if(mainPhoneNumber[1].value.length < 3 || mainPhoneNumber[2].value.length < 4){
        alert('?????????????????? ??????????????????.')
        if(mainPhoneNumber[1].value.length < 3){
            mainPhoneNumber[1].focus();
        }else if(mainPhoneNumber[2].value.length < 4){
            mainPhoneNumber[2].focus();
        }
        return false;
    }else if(isEmpty(addressMainInput.value)){
        alert('????????? ??????????????????')
        return false;
    }else if(protectionCheck.checked == false){
        alert('???????????? ?????? ??? ????????? ??????????????????')
        return false;
    }else if(privacyHandlingCheck.checked == false){
        alert('???????????? ?????? ????????? ??????????????????')
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
			alert('???????????? ???????????? ???????????? ??????????????? ????????? ???????????? ???????????????.\n- ????????? ?????? 14??? ????????? ?????? ?????? ??????????????????.\n- ???????????? ????????? ??? ????????? ?????? ???????????????.')
            if(userCode == 0) {
                localStorage.serviceAuthenticationInfo = JSON.stringify(response.data);

            }
            
            location.href = `/service/recall/request/complete/${response.data.serviceCode}`;
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
    alert("?????? ?????? ????????? ??????????????????.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
const userNameInput = document.querySelector(".name");

const genderRadioBoxItems = document.querySelectorAll(".gender-radio");

const birthYearInput = document.querySelector(".year");
const birthMonthInput = document.querySelector(".month");
const birthDayInput = document.querySelector(".day");
const birthTypeRadioItems = document.querySelectorAll(".birty-type");

const userIdInput = document.querySelector(".user-id")
const userIdCheckButton = document.querySelector(".user-id-check");
const userPasswordInput = document.querySelector(".password");
const userPasswordConfirmInput = document.querySelector(".password_confirm");

const postalCodeInput = document.querySelector(".postal-code");
const mainAddressInput = document.querySelector(".main-address");
const detailAddressInput = document.querySelector(".detail-address");

const subPhoneSelectBox = document.querySelector(".sub-phone-box .phone-select-box");
const subMiddlePhoneNumber = document.querySelector(".sub-phone-box .middle-number");
const subLastPhoneNumber = document.querySelector(".sub-phone-box .last-number");

const mainPhoneSelectBox = document.querySelector(".main-phone-box .phone-select-box");
const mainMiddlePhoneNumber = document.querySelector(".main-phone-box .middle-number");
const mainLastPhoneNumber = document.querySelector(".main-phone-box .last-number");

const emailSelectBox = document.querySelector(".email-select-box");
const firstEmailInput = document.querySelector(".first-email");
const secondEmailInput = document.querySelector(".second-email");

const receiveCheckBoxItems = document.querySelectorAll(".receive-check-box");

const staffCompanySelect = document.querySelector(".staff-company");
const employeeNumberInput = document.querySelector(".employee-number");

const searchAddressButton = document.querySelector(".search-address");


const inputs = document.querySelectorAll("input");
const signupButton = document.querySelector(".signup-button");

let gender = 0;
let mainPhoneNumber = null;
let subPhoneNumber = null;
let email = null;
let birth = null;
let birthType = 0;
let checkUserIdFlag = false;
let tempUserId = null;
let modifyFlag = false;


setEmailSelectBoxChangeEvent();
setMainPhoneNumber();
modifyFlag = setModifyFlag();

if(modifyFlag) {
	setDefaultInfo();
}


searchAddressButton.onclick = loadAddressPopup;

userIdInput.onblur = checkUserIdChange;

signupButton.onclick = loadnextPage;

userIdCheckButton.onclick = checkUserId;

function setDefaultInfo() {
	let userInfoObject = JSON.parse(localStorage.userInfoObject);

	setUserNameInput(userInfoObject);
	setUserGenderRadio(userInfoObject);
	setUserBirtyInputAndBirthTypeRadio(userInfoObject);
	setUserIdInput(userInfoObject);
	setUserAddress(userInfoObject);
	setUserEmail(userInfoObject);
	setUserReceiveCheckBoxes(userInfoObject);
	setUserEmployeeNumberInput(userInfoObject);

	if(!isEmpty(userInfoObject.subPhoneNumber)) {
		setUserSubPhoneNumberInput(userInfoObject);
		
	}

	if(!isEmpty(userInfoObject.staffCompany)) {
		setUserStaffCompany(userInfoObject);
		
	}

	localStorage.removeItem("modifyFlag");
}

function setEmailSelectBoxChangeEvent() {
    emailSelectBox.onchange = setSecondEmail;
}

function setSecondEmail() {
    let selectEmailValue = emailSelectBox.options[emailSelectBox.selectedIndex].value;

    if(selectEmailValue != "") {
        secondEmailInput.value = selectEmailValue;
        setSecondEmailInputReadOnly();
    }else {
        secondEmailInput.value = "";
        disableSecondEmailInputReadOnly();
    }
}

function setSecondEmailInputReadOnly() {
    secondEmailInput.setAttribute("readonly", true);
    secondEmailInput.classList.add("selected-email");
}

function disableSecondEmailInputReadOnly() {
    secondEmailInput.removeAttribute("readonly", true);
    secondEmailInput.classList.remove("selected-email");
}

function checkUserIdChange() {
	if(tempUserId != userIdInput.value) {
		checkUserIdFlag = false;
	}
}

function setMainPhoneNumber() {
	const phoneSelectOption = document.querySelectorAll(".main-phone-box .phone-select-box option")
	let mainPhoneNumber = localStorage.mainPhoneNumber;

	setFirstNumber(phoneSelectOption, mainPhoneNumber);
	setMiddleNumber(mainMiddlePhoneNumber, mainPhoneNumber);
	setLastNumber(mainLastPhoneNumber, mainPhoneNumber);
}

function setFirstNumber(selectOptions, phoneNumber) {
	selectOptions.forEach(option => {
		if(option.value == phoneNumber.substring(0, phoneNumber.indexOf("-"))) {
			option.setAttribute("selected", true);
		}
	});
}

function setMiddleNumber(secondPhoneInput, phoneNumber) {
	secondPhoneInput.value = phoneNumber.substring(phoneNumber.indexOf("-") + 1, phoneNumber.lastIndexOf("-"));
	
}

function setLastNumber(lastPhoneInput, phoneNumber) {
	lastPhoneInput.value = phoneNumber.substring(phoneNumber.lastIndexOf("-") + 1);

}


function checkUserId() {
	$.ajax({
		async:false,
		type:"get",
		url: "/api/v1/auth/signup/validation/user-id",
		data: {
			"userId": userIdInput.value
		},
		dataType:"json",
		success: (response) => {
			checkUserIdFlag = response.data;
			
			if(checkUserIdFlag){
				alert("시용가능한 아이디입니다.");
				tempUserId = userIdInput.value;
			}else{
				alert("이미 사용중인 아이디입니다.");
			}
		},
		error: (error) => {
			if(error.status == 400){
				alert(JSON.stringify(error.responseJSON.data));
			}else{
				console.log(error);
			}
		}
	});
}


function setAddressInput(postalCode, mainAddress, detailAddress) {
	postalCodeInput.value = postalCode;
	mainAddressInput.value = mainAddress;
	detailAddressInput.value = detailAddress;

}

	
function loadnextPage() {
	if(!checkRequireData()) {
		return false;
	}
	let signupData = getSignupInfo();

	localStorage.userInfoObject = JSON.stringify(signupData);
    localStorage.stepPass = true;
	
	location.replace("/auth/signup/step4");

	
}

function checkRequireData(){
	let birthYear = birthYearInput.value;
	let birthMonth = birthMonthInput.value;
	let birthDay = birthDayInput.value;

	genderRadioBoxItems.forEach(option => {
		if(option.checked) {
			gender = option.value;
		}
	});

	birth = birthYear + "-" + (parseInt(birthMonth) < 10 ? "0" + parseInt(birthMonth) : birthMonth)+ "-" + (parseInt(birthDay) < 10 ? "0" + parseInt(birthDay) : birthDay);

	birthTypeRadioItems.forEach(option => {
		if(option.checked) {
			birthType = option.value;
		}
	});

	let regMainPhone = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;
	let mainFirstNumber = mainPhoneSelectBox.options[mainPhoneSelectBox.selectedIndex].value;
    mainPhoneNumber = mainFirstNumber +"-"+ mainMiddlePhoneNumber.value +"-"+ mainLastPhoneNumber.value;

    let regSubPhone = /^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/;
	let subFirstNumber = subPhoneSelectBox.options[subPhoneSelectBox.selectedIndex].value;
    
	email = firstEmailInput.value + "@" + secondEmailInput.value;
    let regEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;

	let regUserId = /^[\w\d]{4,10}$/;
	let regUserPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^+=])[A-Za-z0-9!@#$%^+=]{8,10}$/;

	if(isEmpty(userNameInput.value)) {
		alert("이름을 입력해주세요.");
		userNameInput.focus();
		return false;

	}else if(userNameInput.value.length < 2){
		alert("이름을 2자 이상 입력해주세요.");
		userNameInput.focus();
		return false;

	}else if(gender == 0){
		alert("성별을 입력해주세요.");
		return false;

	}else if(isEmpty(birthYear) || isEmpty(birthMonth) || isEmpty(birthDay)) {
		alert("생년월일을 입력해주세요.");
		birthYearInput.focus();
		return false;

	}else if(birthType == 0) {
		alert("양력, 음력중 선택해주세요.");
		return false;

	}else if(isEmpty(userIdInput.value)){
		alert('로그인 아이디를 입력해주세요.');
		userIdInput.focus();
		return false;

	}else if(!regUserId.test(userIdInput.value)){
		alert('로그인 아이디는 4자에서 10자 사이로 입력해주세요.');
		userIdInput.focus();
		return false;

	}else if(!checkUserIdFlag){
		alert('아이디 중복체크를 진행헤 주세요.');
		return false;

	}else if(isAlphaNumberic(userIdInput.value) == false){
		alert('로그인 아이디는 영문자 소문자와 숫자만 사용할수 있습니다.');
		userIdInput.focus();
		return false;

	}else if(isEmpty(userPasswordInput.value)){
		alert('로그인 비밀번호를 입력해주세요');
		userPasswordInput.focus();
		return false;

	}else if(!regUserPassword.test(userPasswordInput.value)){
		alert("영문+숫자+특수문자의 8~10자 이내로 입력해주세요.");
		userPasswordInput.focus();
		return false;

	}else if(userPasswordInput.value != userPasswordConfirmInput.value){
		alert('로그인 비밀번호 확인이 일치하지 않습니다.');
		userPasswordConfirmInput.focus();
		return false;
	}else if(isEmpty(postalCodeInput.value) || isEmpty(mainAddressInput.value) || isEmpty(detailAddressInput.value)) {
		alert('주소를 입력해주세요.');
		detailAddressInput.focus();
		return false;

	}else if(isEmpty(mainFirstNumber) && isEmpty(mainMiddlePhoneNumber.value) && isEmpty(mainLastPhoneNumber.value)) {
        alert("휴대폰번호를 입력해주세요.");
        mainMiddlePhoneNumber.focus();
        return false;

    }else if(!regMainPhone.test(mainPhoneNumber)) {
        alert("휴대폰번호를 확인해주세요.");
        mainMiddlePhoneNumber.focus();
        return false;

	}else if(!regEmail.test(email)) {
		alert("이메일 주소를 올바르게 입력해주세요.");
		firstEmailInput.focus();
		return false;

	}
	
	if(!isEmpty(subFirstNumber) || !isEmpty(subMiddlePhoneNumber.value) || !isEmpty(subLastPhoneNumber.value)) {
		subPhoneNumber = subFirstNumber +"-"+ subMiddlePhoneNumber.value +"-"+ subLastPhoneNumber.value;
		if(!regSubPhone.test(subPhoneNumber)) {
			alert("휴대폰번호를 확인해주세요.");
			subMiddlePhoneNumber.focus();
			return false;
	
		}
	}
	   
	return true;
}

function getSignupInfo() {
	let signupData = {
		"userName": userNameInput.value,
		"userGender" : gender,
		"userBirth" : birth,
		"birthType" : birthType,
		"userId": userIdInput.value,
		"userPassword": userPasswordInput.value,
		"postalCode" : postalCodeInput.value,
		"mainAddress" : mainAddressInput.value,
		"detailAddress" : detailAddressInput.value,
		"mainPhoneNumber" : mainPhoneNumber,
		"subPhoneNumber" : subPhoneNumber,
		"userEmail" : email,
		"emailReceiveFlag" : receiveCheckBoxItems[0].checked,
		"smsReceiveFlag" : receiveCheckBoxItems[1].checked,
		"mailReceiveFlag" : receiveCheckBoxItems[2].checked,
		"staffCompany" : staffCompanySelect.options[staffCompanySelect.selectedIndex].value,
		"employeeNumber" : employeeNumberInput.value,
		"checkUserIdFlag": checkUserIdFlag
	}

	return signupData;
}

function isEmpty(data) {
	return data == "" || data == undefined || data == null;
}

function setModifyFlag() {
	return localStorage.modifyFlag ? true : false;
}

function setUserNameInput(userInfoObject) {
	userNameInput.value = userInfoObject.userName;
}

function setUserGenderRadio(userInfoObject) {
	genderRadioBoxItems.forEach(radio => {
		if(radio.value == userInfoObject.userGender) {
			radio.setAttribute("checked", true);
		}
	});
}

function setUserBirtyInputAndBirthTypeRadio(userInfoObject) {
	let userBirth = userInfoObject.userBirth;

	birthYearInput.value = userBirth.substring(0, userBirth.indexOf("-"));
	birthMonthInput.value = userBirth.substring(userBirth.indexOf("-") + 1, userBirth.lastIndexOf("-"));
	birthDayInput.value = userBirth.substring(userBirth.lastIndexOf("-") + 1);

	birthTypeRadioItems.forEach(radio => {
		if(radio.value == userInfoObject.birthType) {
			radio.setAttribute("checked", true);
		}
	});
}

function setUserIdInput(userInfoObject) {
	userIdInput.value = userInfoObject.userId;
	tempUserId = userInfoObject.userId;
	checkUserIdFlag = true;
}

function setUserAddress(userInfoObject) {
	postalCodeInput.value = userInfoObject.postalCode;
	mainAddressInput.value = userInfoObject.mainAddress;
	detailAddressInput.value = userInfoObject.detailAddress;
}

function setUserSubPhoneNumberInput(userInfoObject) {
	const phoneSelectOption = document.querySelectorAll(".sub-phone-box .phone-select-box option");
	let subPhoneNumber = userInfoObject.subPhoneNumber;
	
	setFirstNumber(phoneSelectOption, subPhoneNumber);
	setMiddleNumber(subMiddlePhoneNumber, subPhoneNumber);
	setLastNumber(subLastPhoneNumber, subPhoneNumber);
}

function setUserEmail(userInfoObject) {
	let userEmail = userInfoObject.userEmail;

	firstEmailInput.value = userEmail.substring(0, userEmail.indexOf("@"));
	secondEmailInput.value = userEmail.substring(userEmail.indexOf("@") + 1);
}

function setUserReceiveCheckBoxes(userInfoObject) {
	receiveCheckBoxItems[0].checked = userInfoObject.emailReceiveFlag;
	receiveCheckBoxItems[1].checked = userInfoObject.smsReceiveFlag;
	receiveCheckBoxItems[2].checked = userInfoObject.mailReceiveFlag;
}

function setUserStaffCompany(userInfoObject) {
	const staffCompanyOptions = document.querySelectorAll(".staff-company option");

	staffCompanyOptions.forEach(option => {
		if(option.value == userInfoObject.staffCompany) {
			option.setAttribute("selected", true);
		}
	});
}

function setUserEmployeeNumberInput(userInfoObject) {
	employeeNumberInput.value = isEmpty(userInfoObject.employeeNumber) ? "" : userInfoObject.employeeNumber;

}
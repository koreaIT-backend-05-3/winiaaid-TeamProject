const userNameInput = document.querySelector(".name");

const genderRadioBoxItems = document.querySelectorAll(".gender-radio");

const birthYearInput = document.querySelector(".year");
const birthMonthInput = document.querySelector(".month");
const birthDayInput = document.querySelector(".day");
const birthTypeRadioItems = document.querySelectorAll(".birty-type");

const userIdInput = document.querySelector(".user-id")
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
const firstEmail = document.querySelector(".first-email");
const secondEmail = document.querySelector(".second-email");

const receiveCheckBoxItems = document.querySelectorAll(".receive-check-box");

const staffCompanySelect = document.querySelector(".staff-company");
const employeeNumberInput = document.querySelector(".employee-number");

const searchAddressButton = document.querySelector(".search-address");


const inputs = document.querySelectorAll("input");
const signupButton = document.querySelector(".signup-button");

let gender = 0;
let checkUsernameFlag = true;
let mainPhoneNumber = null;
let subPhoneNumber = null;
let email = null;
let birth = null;
let birthType = 0;
let checkUserIdFlag = true;

searchAddressButton.onclick = loadAddressPopup;

signupButton.onclick = signup;


function setAddressInput(postalCode, mainAddress, detailAddress) {
	postalCodeInput.value = postalCode;
	mainAddressInput.value = mainAddress;
	detailAddressInput.value = detailAddress;

}

// inputs[0].onblur = () => {
	
// 	$.ajax({
// 		async:false,
// 		type:"get",
// 		url: "/api/v1/auth/signup/validation/username",
// 		data:{userame: inputs[0].value},
// 		dataType:"json",
// 		success: (response) => {
// 			checkUsernameFlag = response.data;
			
// 			if(checkUsernameFlag){
// 				alert("시용가능한 아이디입니다.");
// 			}else{
// 				alert("이미 사용중인 아이디입니다.");
// 			}
// 		},
// 		error: (error) => {
// 			if(error.status == 400){
// 				alert(JSON.stringify(error.responseJSON.data));
// 			}else{
// 				console.log("요청 실패");
// 				console.log(error);
// 			}
// 		}
// 	})
// }

	
function signup() {
	if(!checkRequireData()) {
		return false;
	}
	let signupData = getSignupInfo();
	console.log(signupData);

	$.ajax({
		type: "post",
		url: "/api/v1/auth/signup",
		contentType: "application/json",
		data: JSON.stringify(signupData),
		dastaType: "json",
		success: (response) => {
			if(response.data){
				alert("회원가입 완료");
				location.replace("/auth/signin")
			}
		},error: (request, status, error) => {
			if(error.status == 400){
				alert(JSON.stringify(error.response.data));
			}else{
				console.log("요청 실패");
				console.log(request.status);
				console.log(request.responseText);
				console.log(error);
			}
		}
	});
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

	birth = birthYear + "-" + birthMonth + "-" + birthDay;

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
    
	email = firstEmail.value + "@" + secondEmail.value;
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
		firstEmail.focus();
		return false;

	}
	
	if(!isEmpty(subFirstNumber) && !isEmpty(subMiddlePhoneNumber.value) && !isEmpty(subLastPhoneNumber.value)) {
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
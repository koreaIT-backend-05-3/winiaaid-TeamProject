const inputs = document.querySelectorAll("input");
const signupButton = document.querySelector("button");

let checkUsernameFlag = false;


   

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

signupButton.onclick = () => {
	let signupData = {
		name: inputs[0].value,
		gender_mail: inputs[1].value,
		getder_femail : inputs[2].value,
		birthday1 : inputs[3].value,
		birthday2 : inputs[4].value,
		birtday3  : inputs[5].value,
		birthdaytype : inputs[6].value,
		username: inputs[8].value,
		password: inputs[9].value,
		email : inputs[16].value,
		"checkUsernameFlag" : checkUsernameFlag
	}

	

	/*$.ajax({
		
		async:false,
		type: "post",
		url: "/api/v1/auth/signup",
		contentType: "applecation/json",
		data: JSON.stringify(signupData),
		dastaType: "json",
		success: (response) => {
			if(response.data){
				alert("회원가입 완료");
				location.replace("/auth/signin")
			}
		},
		
		error: (error) => {
			if(error.status == 400){
				alert(JSON.stringify(error.response.data));
			}else{
				console.log("요청 실패");
				console.log(error);
			}
		}
	})*/
	
	console.log(signupData);
};
function submitJoinForm(form){
	form.userid.value = form.userid.value.trim();
	if(form.userid.value.lennth == 0){
		alert('로그인 아이디를 입력해주세요.');
		return false;
	}
	
	if(form.userid.value.length < 4){
		alert('로그인 아이디를 4자이상 입력해주세요');
		form.userid.focus();
		return false;
	}
	
	if( isAlphaNumberic(form.userid.value) == false){
		alert('로그인 아이디는 영문자 소문자와 숫자만 사용할수 있습니다.');
		form.userid.focus();
		return false;
	}
	
	form.userid.value = form.userid.value.toLowerCase();
	
	form.password.value = form.password.value.trim();
	if(form.password.value.length == 0){
		alert('로그인 비밀번호를 입력해주세요');
		form.password.focus();
		return false;
	}
	
	if(form.password.value != form.password_confirm.value){
		alert('로그인 비밀번호 확인이 일치하지 않습니다.');
		form.password_confirm.focus();
		return false;
	}
	form.name.value = form.userid.value.trim();
	if(form.name.value.lennth == 0){
		alert('이름을 입력해주세요.');
		form.name.focus();
		return false;
	}
	
	if(form.name.value.length < 2){
		alert("이름을 2자 이상 입력해주세요.");
		form.name.focus();
		return false;
	}
	
	form.submit();
	
}


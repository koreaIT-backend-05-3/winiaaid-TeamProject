const MainMn = document.querySelector(".mn-ul")
const SubWrap = document.querySelector(".sub-wrap")
const SubUl = document.querySelectorAll("#gnb .sub-ul")
const inputName = document.querySelector(".name")
const inputEmail = document.querySelector(".email")
const inputUsername = document.querySelector(".username")
const inputPassword = document.querySelector(".password")
const signupButton = document.querySelectorAll("button")


    MainMn.addEventListener('mouseover',function(){
        for(let i=0; i < SubUl.length; i++){
            SubUl[i].classList.add('on');
        } 
    SubWrap.classList.add('on')
    })

    MainMn.addEventListener('mouseout',function(){
        for(let i=0; i < SubUl.length; i++){
            SubUl[i].classList.remove('on')
        }
    SubWrap.classList.remove('on')
})

inputName.onblur = () => {
	
	$.ajax({
		async:false,
		type:"get",
		url: "/api/v1/auth/signup/validation/username",
		data:{userame: inputName.value},
		dataType:"json",
		success: (response) => {
			checkUsernameFlag = response.data;
			
			if(checkUsernameFlag){
				alert("시용가능한 아이디입니다.");
			}else{
				alert("이미 사용중인 아이디입니다.");
			}
		},
		error: (error) => {
			if(error.status == 400){
				alert(JSON.stringify(error.responseJSON.data));
			}else{
				console.log("요청 실패");
				console.log(error);
			}
		}
	})
}

signupButton[2].onclick = () => {
	let signupData = {
		name: inputName.value,
		email : inputEmail.value,
		username: inputUsername.value,
		password: inputPassword.value,
		"checkUsernameFlag" : checkUsernameFlag
	}
	
	$.ajax({
		
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
	})
}



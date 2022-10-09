const withdrawalButton = document.getElementById("withdrawal-button");
const sitebox = document.getElementById("site01");
const uncomfortsite4 = document.getElementById("site4");
const uncomfortsite5 = document.getElementById("site5");
const uncomfortsite6 = document.getElementById("site6");
const reason1 = document.getElementById("reason1");
const reason2 = document.getElementById("reason2");
const reason3 = document.getElementById("reason3");
const reason4 = document.getElementById("reason4");
const reason5 = document.getElementById("reason5");
const reason6 = document.getElementById("reason6");
const reason7 = document.getElementById("reason7");

withdrawalButton.addEventListener("click" ,function(){
        if(sitebox.checked !=true){
            alert("탈퇴하실 사이트를 선택해주세요.")
            return false;
        }
        if((uncomfortsite4.checked || uncomfortsite5.checked || uncomfortsite6.checked) != true){
            alert("이용시 불편했던 사이트를 선택 해주세요.")
            return false;
        }
        else if((reason1.checked || reason2.checked || reason3.checked || reason4.checked || reason5.checked || reason6.checked && reason7.checked) != true){
            alert("불편하셨던점을 체크 해주세요.")
            return false;
        }
    alert("전체 사이트를 탈퇴힙니다.탈퇴시 모든 개인개정은 바로 삭제되며, 계정을 사용하실수 없습니다. 정말로 탈퇴하시겠습니까?");
    console.log(withdrawalButton);
})










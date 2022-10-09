const SiteAll = document.querySelector("#family1");
const Site01 = document.querySelector("#site04");
const Site02 = document.querySelector("#site05");
const Site03 = document.querySelector("#site06");

const Agree01 = document.querySelector("#agree01");
const Agree02 = document.querySelector("#agree02");
const Agree03 = document.querySelector("#agree03");
const AllAgree = document.querySelector("#agree04");



//이용약관 체크여부 함수
let AgreeCheck_func = function(el){
    if(Agree01.checked != true){
        alert("이용약관에 동의해주세요.")
        return false;
    }
    if(Agree02.checked != true){
        alert("이용약관에 동의해주세요.")
        return false;
    }
    if(Agree03.checked != true){
        alert("이용약관에 동의해주세요.")
        return false;
    }
    
}
function AgreeAllCheck(e) {
    if(e.target.checked){
        Agree01.checked = true;
        Agree02.checked = true;
        Agree03.checked = true;
    }else{
        Agree01.checked = false;
        Agree02.checked = false;
        Agree03.checked = false;
    }
}
function FamilySiteAllCheck(e) {
    if(e.target.checked){
        Site01.checked = true;
        Site02.checked = true;
        Site03.checked = true;
    }else{
        Site01.checked = false;
        Site02.checked = false;
        Site03.checked = false;
    }
}
//패밀리사이트 가입여부 체크
function FamilySiteCheck(e) {
    if(SiteAll.checked || Site01.checked || Site02.checked || Site03.checked == true){
        return true;
    }else{
        alert("패밀리사이트 가입여부를 체크해주세요.")
    }
}


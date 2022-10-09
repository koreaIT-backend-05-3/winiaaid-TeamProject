const siteList = document.querySelectorAll(".site");
const reasonList = document.querySelectorAll(".reason");

const withdrawalButton = document.querySelector(".withdrawal-button");

withdrawalButton.onclick = checkRequireBox;

function checkRequireBox() {
    let siteStatus = false;
    let reasonStatus = false;

    siteList.forEach(input => {
        if(input.checked) {
            siteStatus = true;
        }
    });

    reasonList.forEach(input => {
        if(input.checked) {
            reasonStatus = true;
        }
    });

    if(siteStatus && reasonStatus) {
        if(confirm("전체 사이트를 탈퇴힙니다.탈퇴시 모든 개인개정은 바로 삭제되며, 계정을 사용하실수 없습니다. 정말로 탈퇴하시겠습니까?")) {
            withdrawal();

        }

    }else if(!siteStatus) {
        alert("탈퇴하실 사이트를 선택해주세요.");

    }else {
        alert("이용시 불편했던 사이트를 선택 해주세요.");

    }
}

function withdrawal() {
    $.ajax({
        type: "delete",
        url: `/api/v1/auth/user/${user.userCode}`,
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("회원탈퇴 성공");
                location.replace("/logout");
            }else {
                alert("회원탈퇴 실패");
            }
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}
const updateButton = document.querySelector(".update-button");
const deleteButton = document.querySelector(".delete-button");
const listButton = document.querySelector(".list-button");

let authenticationInfo = null;
let boardCode = getBoardCodeByUri();
let boardType = getBoardType();

if(checkIsNonMemberBoard()) {
    loadNonMemberRequestDataByLocalStorage();
}


setBoardContentByBoardType();
getBoardDetailByBoardCode(boardCode);

updateButton.onclick = loadModifyBoardPageByBoardCode;

deleteButton.onclick = deleteBoard;

listButton.onclick = loadListPage;

function getBoardCodeByUri(){
    return location.pathname.substring(location.pathname.lastIndexOf("/") +1);
}

function setBoardContentByBoardType() {
    const h2 = document.querySelector("h2");

    if(boardType == "praise") {
        document.title = "[위니아에이드] 칭찬합니다";
        h2.textContent = "칭찬합니다";

    }else if(boardType == "suggestion") {
        document.title = "[위니아에이드] 제안합니다";
        h2.textContent = "제안합니다";

    }
}

function getBoardDetailByBoardCode(){
    $.ajax({
        type:"get",
        url:`/api/v1/board/${boardType}/view/${boardCode}?userCode=${userCode}`,
        dataType:"json",    
        success:(response)=>{
            setBoardDetail(response.data);
        },
        error:(request, stauts, error)=>{
            if(request.status == 400) {
                alert("잘못된 접근입니다.");
                location.replace("/main");
            }
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function deleteBoard(){
    $.ajax({
        type:"delete",
        url:`/api/v1/board/${boardCode}`,
        dataType:"json",
        success:(response)=>{
            if(response.data){
                location.replace(`/customer/${boardType}/list`);
            }


        },
        error:(error)=>{
            console.log(error);
        }
    });
}

function setBoardDetail(boardDetail){
    const talbe = document.querySelector("table");

    talbe.innerHTML = `
        <tr class="first-table">
            <th class="user">작성자</th>
            <td class="username">${boardDetail.userName}</td>
            <th class="brand">접수대상 브랜드</th>
            <td class="company">${boardDetail.companyName}</td>
            <th class="date">등록일</th>
            <td class="update-date">${boardDetail.createDate}</td>
        </tr>
        <tr>
            <th class="title">제목</th>
            <td class="content-title" colspan="5">${boardDetail.boardTitle}</td>
        </tr>
        <td colspan="6">
            <div class="board-post">
                <textarea class="content" readonly>${boardDetail.boardContent}</textarea>
            </div>
        </td>
    `;

    if(boardDetail.fileList != null) {
        setFile(boardDetail.fileList);
    }

    if(boardDetail.userCode != userCode) {

        if(authenticationInfo != null) {
            if(authenticationInfo.userName == boardDetail.userName) {
                return;
            }
        }
        addVisibleClass(updateButton);
        addVisibleClass(deleteButton);
    }
}

function getBoardType(){
    let uri = location.pathname;
    return uri.indexOf("praise") != -1 ? "praise"
    : uri.indexOf("complaint") != -1 ? "complaint"
    : "suggestion";
}

function setFile(fileList) {
    const fileDiv = document.querySelector(".file-div");

    fileDiv.innerHTML = `
            <i class="fa-solid fa-download"></i>
        `;

        for(let i = 0; i < fileList.length; i++) {
            fileDiv.innerHTML += `
                <a class="file-name" href="/api/v1/board/file/download/${fileList[i].tempFileName}">${fileList[i].originalFileName}</span>
            `;
        }
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function loadModifyBoardPageByBoardCode() {
    location.href = `/customer/${boardType}/update-view/${boardCode}`;
}

function loadListPage() {
    let locationInfo = localStorage.locationInfo;
    let url = null;

    if(locationInfo != null) {
        if(locationInfo == "board") {
            if(authenticationInfo != null) {
                url = `/customer/praise/list/non-member`;

            }else {
                url = `/customer/${boardType}/list`;
                
            }

        }else {
            url = `/mypage/writing/customer`;

        }

    }else {
        url = `/customer/${boardType}/list`;
    }

    localStorage.removeItem("locationInfo");
    location.href = url;
}

function checkIsNonMemberBoard() {
    return location.pathname.indexOf("non-member") != -1 && boardType == "praise";
}

function loadNonMemberRequestDataByLocalStorage() {
    authenticationInfo = localStorage.boardAuthenticationInfo;

    if(authenticationInfo != null) {
        authenticationInfo = JSON.parse(authenticationInfo);
    }else {
        alert("잘못된 접근입니다.");
        location.replace("/main");
    }

}
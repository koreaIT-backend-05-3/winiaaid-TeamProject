const updateButton = document.querySelector(".update-button");
const deleteButton = document.querySelector(".delete-button");
const listButton = document.querySelector(".list-button");

const responseTable = document.querySelector(".response-table");
const responseTextArea = responseTable.querySelector(".resonse-div .content");

const responseWriteButton = document.querySelector(".response-write-button");

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

function isAdmin() {
    return user.userRoles.indexOf("ROLE_MANAGER") != -1 || user.userRoles.indexOf("ROLE_ADMIN") != -1
}

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
        async: false,
        type: "get",
        url: `/api/v1/board/${boardType}/view/${boardCode}?userCode=${userCode}&adminFlag=${isAdmin()}`,
        dataType: "json",    
        success: (response)=>{
            setButtonByUserCode(response.data);
            setBoardDetail(response.data);
            setBoardResponse(response.data);
        },
        error: (request, stauts, error)=>{
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

function deleteBoard() {
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

function setButtonByUserCode(boardDetail) {
    if(isAdmin()) {
        showAdminDetailView();
        setResponseAreaFocusOrBlurEvent();

    }else if((boardDetail.userCode == userCode || authenticationInfo != null) && boardDetail.responseFlag != 1) {

        if(authenticationInfo != null) {
            if(authenticationInfo.userName != boardDetail.userName) {
                return;
            }
        }
        removeVisibleClass(updateButton);
        removeVisibleClass(deleteButton);
    }
}

function showAdminDetailView() {
    if(boardType != "praise") {
        const responseRequestDiv = document.querySelector(".response-request-div");
        removeVisibleClass(responseRequestDiv);

        setResponseWriteButtonClickEvent("write");
    }

    const moveBoardTypeDiv = document.querySelector(".move-board-type-div");

    removeVisibleClass(moveBoardTypeDiv);
    removeVisibleClass(deleteButton);

    setMoveBoardTypeButtonClickEvent();
}

function setMoveBoardTypeButtonClickEvent() {
    const moveBoardTypeButton = document.querySelector(".move-board-type-button");

    moveBoardTypeButton.onclick = moveBoardTypeRequest;
}

function setResponseAreaFocusOrBlurEvent() {
    responseTextArea.onfocus = () => responseTextArea.removeAttribute("readOnly");
    responseTextArea.onblur = () => responseTextArea.setAttribute("readOnly", true);
}

function moveBoardTypeRequest() {
    const boardTypeCode = document.querySelector(".move-board-type-div select").value;

    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/manager/board-type/${boardCode}`,
        contentType: "application/json",
        data: JSON.stringify({
            "boardCode": boardCode,
            "boardTypeCode": boardTypeCode
        }),
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                alert("게시글 이동 완료");
                reload(boardTypeCode, response.data);
            }else {
                alert("게시글 이동 실패")
            }
        },
        error: errorMessage
    });
    
}

function reload(boardTypeCode, boardCode) {
    let boardType = boardTypeCode == 1 ? "complaint" : boardTypeCode == 2 ? "praise" : "suggestion"

    location.replace(`/customer/${boardType}/detail/${boardCode}`);
}

function setResponseWriteButtonClickEvent(type) {
    type == "write" ? responseWriteButton.onclick = responseWriteRequest
    : responseWriteButton.onclick = responseModifyRequest
}

function responseWriteRequest() {
    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/manager/board-response/${boardCode}`,
        contentType: "application/json",
        data: JSON.stringify({
            "boardCode": boardCode,
            "responseContent": responseTextArea.value
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("답변 작성 완료");
                location.reload();
            }else {
                alert("답변 작성 실패")
            }
        },
        error: errorMessage
    });
}

function responseModifyRequest() {
    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/manager/board-response/${boardCode}`,
        contentType: "application/json",
        data: JSON.stringify({
            "boardCode": boardCode,
            "responseContent": responseTextArea.value
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("답변 수정 완료");
                location.reload();
            }else {
                alert("답변 수정 실패")
            }
        },
        error: errorMessage
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

}

function setBoardResponse(boardDetail) {
    if(boardDetail.response != null) {
        responseTextArea.value = boardDetail.response;
        setChangeToModifyButton();
    }else {
        responseTextArea.removeAttribute("readOnly");

    }

    if(boardType != "praise") {
        removeVisibleClass(responseTable);

    }
}

function setChangeToModifyButton() {
    responseWriteButton.textContent = "수정하기";

    responseWriteButton.onclick = () => responseTable.removeAttribute("readOnly");

    setResponseWriteButtonClickEvent("modify");
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

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
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

function errorMessage(request, status, error) {
    alert("에러");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}

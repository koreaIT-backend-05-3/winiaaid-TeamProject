const updateButton = document.querySelector(".update-button");
const deleteButton = document.querySelector(".delete-button");
const listButton = document.querySelector(".list-button");

let boardCode = getBoardCodeByUri();
let boardType = getBoardType();

getBoardDetailByBoardCode(boardCode);

updateButton.onclick = loadModifyBoardPageByBoardCode;

deleteButton.onclick = deleteBoard;

listButton.onclick = historyBack;

function getBoardCodeByUri(){
    return location.pathname.substring(location.pathname.lastIndexOf("/") +1);
}

function getBoardDetailByBoardCode(){
    $.ajax({
        type:"get",
        url:`/api/v1/board/${boardCode}`,
        dataType:"json",    
        success:(response)=>{
            setBoardDetail(response.data);
        },
        error:(error)=>{
            console.log(error);
        }
    })
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

    if(boardDetail.fileList.length != 0) {
        setFile(boardDetail.fileList);
    }
}

function getBoardType(){
    let uri = location.pathname;
    return uri.indexOf("praise")!= -1?"praise"
    :uri.indexOf("complaint")!= -1?"complaint"
    :"suggestion";
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

function loadModifyBoardPageByBoardCode() {
    location.href = `/customer/${boardType}/update-view/${boardCode}`;
}

function historyBack() {
    history.back();
}
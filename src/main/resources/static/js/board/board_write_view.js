const uploadButton = document.querySelector(".upload-button");
const cancelButton = document.querySelector(".cancle-button")
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const phoneNumber = document.querySelector(".phone-number");
const titleInput = document.querySelector(".title-input");
const contentInput = document.querySelector(".content-td textarea")
const brandInputItems = document.querySelectorAll(".brand-td input");
const responseInputItems = document.querySelectorAll(".susin-td input");
const fileDiv = document.querySelector(".file-div");

let userCode = 0;
let modifyFlag = false;
let boardType = null;
let boardCode = 0;

let deleteFileCodeList = null;
let deleteTempFileNameList = null;

modifyFlag = getModifyFlagByUri();
boardType = getBoardTypeByUri();

if(modifyFlag) {
    boardCode = getBoardCodeByUri();
    loadBoardInfo(boardCode);
    setModifyBoardView();
}

uploadButton.onclick = submit;

cancelButton.onclcik = historyBack;

function getModifyFlagByUri() {
    return location.pathname.indexOf("update-view") != -1 ? true : false;
}

function getBoardTypeByUri(){
    let uri = location.pathname;
    return uri.indexOf("praise")!= -1?"praise"
    :uri.indexOf("complaint")!= -1?"complaint"
    :"suggestion";
}

function loadBoardInfo(boardCode) {
    $.ajax({
        type: "get",
        url: `/api/v1/board/${boardCode}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                setBoardData(response.data);
            }else {
                alert("존재하지 않는 게시글 입니다..")
            }
        },
        error: errorMessage
    });
}

function setBoardData(boardData) {
    const nameInput = document.querySelector(".name-input");
    const emailInput = document.querySelector(".email-input");
    const telInput = document.querySelector(".tel-input");
    const winiaRadio = document.querySelector(".winia");
    const daewooRadio = document.querySelector(".daewoo");
    const titleInput = document.querySelector(".title-input");
    const contentTextarea = document.querySelector(".content-textarea");

    nameInput.value = boardData.userName;
    emailInput.value = boardData.email;
    telInput.value = boardData.mainPhoneNumber;

    boardData.companyCode == 1 ? daewooRadio.setAttribute("checked", true) : winiaRadio.setAttribute("checked", true);
    
    titleInput.value = boardData.boardTitle;
    contentTextarea.textContent = boardData.boardContent;


    if(modifyFlag) {
        const responseReceiveRadio = document.querySelector(".receive");
        const responseNotReceiveRadio = document.querySelector(".not-receive");

        boardData.responseFlag ? responseReceiveRadio.setAttribute("checked", true) : responseNotReceiveRadio.setAttribute("checked", true);

        if(boardData.fileList != null) {
            deleteFileCodeList = new Array();
            deleteTempFileNameList = new Array();
            setBoardFile(boardData.fileList);
        }
    }

}

function setBoardFile(fileList) {
    for(let i = 0; fileList.length; i++) {
        fileDiv.innerHTML += `
            <span>${fileList[i].originalFileName} <span class="delete-file-span"> x</span></span>
        `;
    }

    setDeleteFileClickEvent(fileList);
}

function setDeleteFileClickEvent(fileList) {
    const deleteFileSpanItems = document.querySelectorAll(".delete-file-span");

    for(let i = 0; i < fileList.length; i++) {
        deleteFileSpanItems[i].onclick = deleteFile(fileList[i].fileCode, fileList[i].tempFileName);
    }
}

function deleteFile(fileCode, tempFileName) {
    deleteFileCodeList.push(fileCode);
    deleteTempFileNameList.push(tempFileName);
}

function setModifyBoardView() {
    fileDiv.classList.remove("visible");
}

function submit() {
    let form = new FormData(document.querySelector("form"));

    
    form = setFormData(form, boardType);

    if(modifyFlag) {
        modifyBoard(form);
    }else {
        uploadBoard(form);
    }
    
}

function uploadBoard(form) {
    $.ajax({
        type: "post",
        url: "/api/v1/board/write",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
        success: (response) => {
            location.href = `/customer/${boardType}/detail/${response.data}`;
        },
        error: errorMessage
    });
}

function modifyBoard(form) {
    $.ajax({
        type: "put",
        url: `/api/v1/board/${boardCode}`,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
        success: (response) => {
            location.href = `/customer/${boardType}/detail/${response.data}`;
        },
        error: errorMessage
    });
}

function setFormData(form, boardType) {

    form.append("userCode", userCode);
    form.append("userName",name.textContent);
    form.append("email",email.textContent);
    form.append("mainPhoneNumber",phoneNumber.textContent);
    form.append("boardTitle", titleInput.value);
    form.append("boardContent", contentInput.value);  
    form.append("boardTypeCode", boardType == "praise" ? 1 : boardType == "complaint" ? 2 : 3); 

    brandInputItems.forEach(brandInput=>{
        if(brandInput.checked){
            form.append("companyCode",brandInput.value);
        }
    });
    
    if(boardType != "praise") {
        responseInputItems.forEach(responseInput=>{
            if(responseInput.checked){
                form.append("responseFlag",responseInput.value);
                
            }
        });

        if(deleteFileCodeList != null) {
            form.append("deleteFileCode", deleteFileCodeList);
            form.append("deleteTempFileName", deleteTempFileNameList);
        }
    }

    return form;
}

function historyBack() {
    history.back();
}

function setWriteViewByBoardType() {
    if(boardType == "praise") {
        const responseTr = document.querySelector(".response-tr");

        responseTr.classList.add("visible");
    }
}

function getBoardCodeByUri() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
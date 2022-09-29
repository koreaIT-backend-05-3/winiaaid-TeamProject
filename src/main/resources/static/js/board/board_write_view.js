const uploadButton = document.querySelector(".upload-button");
const cancelButton = document.querySelector(".cancle-button")
// const name = document.querySelector(".name");
// const email = document.querySelector(".email");
const nameSpan = document.querySelector(".name-span");
const emailSpan = document.querySelector(".email-span");
const telSpan = document.querySelector(".tel-span");
// const phoneNumber = document.querySelector(".phone-number");
const titleInput = document.querySelector(".title-input");
const contentTextarea = document.querySelector(".content-textarea")
const brandInputItems = document.querySelectorAll(".brand-td input");
const responseInputItems = document.querySelectorAll(".response-td input");
const fileDiv = document.querySelector(".file-div");
const inputFileDivItems = document.querySelectorAll(".input-file-div");

let userCode = 1;
let modifyFlag = false;
let boardType = null;
let boardCode = 0;
let fileSize = 0;

let deleteFileCodeList = null;
let deleteTempFileNameList = null;

modifyFlag = getModifyFlagByUri();
boardType = getBoardTypeByUri();

if(modifyFlag) {
    boardCode = getBoardCodeByUri();
    loadBoardInfo(boardCode);
    setModifyBoardView();
}

checkUnalterableUserInfoByuserCode();

contentTextarea.onkeyup = () => checkByte(contentTextarea, 5000);

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
    const winiaRadio = document.querySelector(".winia");
    const daewooRadio = document.querySelector(".daewoo");

    nameSpan.textContent = boardData.userName;
    emailSpan.textContent = boardData.email;
    telSpan.textContent = boardData.mainPhoneNumber;

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
    fileSize = fileList.length;

    for(let i = 0; i < fileList.length; i++) {
        fileDiv.innerHTML += `
            <span class="file-name">${fileList[i].originalFileName} <span class="delete-file-span"> x</span></span>
        `;
    }

    setDeleteFileClickEvent(fileList);
    inputFileBlock(fileList.length);
}

function inputFileBlock(size) {
    for(let i = 0; i < size; i++) {
        inputFileDivItems[2 - i].querySelector("input").disabled = true;
        inputFileDivItems[2 - i].classList.add("block-file");
    }
}

function setDeleteFileClickEvent(fileList) {
    const fileNameSpan = document.querySelectorAll(".file-name");
    const deleteFileSpanItems = document.querySelectorAll(".delete-file-span");

    for(let i = 0; i < fileList.length; i++) {
        deleteFileSpanItems[i].onclick = () => deleteFile(fileNameSpan[i], fileList[i].fileCode, fileList[i].tempFileName);
    }
}

function deleteFile(fileNameSpan, fileCode, tempFileName) {
    if(fileSize != 0) {
        fileSize--;
        inputFileDivItems[fileSize].classList.remove("block-file");
        inputFileDivItems[fileSize].querySelector("input").disabled = false;

        fileNameSpan.classList.add("delete-file");

        addVisibleClass(fileNameSpan.querySelector("span"));
    }
    
    deleteFileCodeList.push(fileCode);
    deleteTempFileNameList.push(tempFileName);
}

function setModifyBoardView() {
    fileDiv.classList.remove("visible");
}

function checkUnalterableUserInfoByuserCode() {
    if(userCode != 0) {
        const nonMemberRequireItems = document.querySelectorAll(".non-member-require")
        
        const nameSpan = document.querySelector(".name-span");
        const emailSpan = document.querySelector(".email-span");
        const telSpan = document.querySelector(".tel-span");

        addVisibleClass(nameSpan);
        addVisibleClass(emailSpan);
        addVisibleClass(telSpan);
        
        nonMemberRequireItems.forEach(item => item.classList.add("require-menu"));
    }
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

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
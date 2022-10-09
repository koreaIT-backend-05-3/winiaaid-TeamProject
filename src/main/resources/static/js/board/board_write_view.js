const nameSpan = document.querySelector(".name-span");
const emailBoxSelect = document.querySelector(".email-box select");
const emailSpan = document.querySelector(".email-span");
const telSpan = document.querySelector(".tel-span");
const nameInput = document.querySelector(".name-input");
const emailBox = document.querySelector(".email-box");
const phoneBox = document.querySelector(".phone-box");
const titleInput = document.querySelector(".title-input");
const contentTextarea = document.querySelector(".content-textarea")
const brandInputItems = document.querySelectorAll(".brand-td input");
const personalAuthenticationInput = document.querySelector(".personal-authentication-number");
const responseInputItems = document.querySelectorAll(".response-td input");
const fileDiv = document.querySelector(".file-div");
const inputFileDivItems = document.querySelectorAll(".input-file-div");

const uploadButton = document.querySelector(".upload-button");
const cancelButton = document.querySelector(".cancle-button")

let email = null;
let phoneNumber = null;
let companyCode = 0;
let responseCode = 0;
let responseSelectedFlag = false;
let smsAuthenticationFlag = true;

let modifyFlag = false;
let boardType = null;
let boardCode = 0;
let fileSize = 0;


let deleteFileCodeList = new Array();
let deleteTempFileNameList = new Array();


modifyFlag = getModifyFlagByUri();
boardType = getBoardTypeByUri();
setWriteViewByBoardType();

if(modifyFlag) {
    boardCode = getBoardCodeByUri();
    loadBoardInfo(boardCode);
    setModifyBoardView();
}else {
    checkUnalterableUserInfoByuserCode();
}

emailBoxSelect.onchange = setEmail;

contentTextarea.onkeyup = () => checkByte(contentTextarea, 5000);

uploadButton.onclick = submit;

cancelButton.onclcik = historyBack;

inputFileDivItems.forEach(input=>{
    input.onchange = (e) => {
        checkFileType(e.target);
    }
})

function getModifyFlagByUri() {
    return location.pathname.indexOf("update-view") != -1 ? true : false;
}

function getBoardTypeByUri(){
    let uri = location.pathname;
    
    return uri.indexOf("praise") != -1 ? "praise"
    : uri.indexOf("complaint") != -1 ? "complaint"
    : "suggestion";
}

function loadBoardInfo(boardCode) {
    let userName = getUserNameByAuthenticationInfo();
    let authenticationNumber = getAuthenticationNumberByAuthenticationInfo();
    let mainPhoneNumber = getMainPhoneNumberByAuthenticationInfo();

    $.ajax({
        type: "get",
        url: `/api/v1/board/${boardType}/${modifyFlag ? "modification" : "writing"}/${boardCode}`,
        data: {
            "userCode": userCode,
            "userName": userName,
            "authenticationNumber": authenticationNumber,
            "mainPhoneNumber": mainPhoneNumber
        },
        dataType: "json",
        success: (response) => {
            setBoardData(response.data);
        },
        error: (request, status, error) => {
            if(request.status == 400) {
                if(modifyFlag) {
                    alert("잘못된 접근입니다.");
                }else {
                    alert("존재 하지 않는 게시글입니다.");
                }
                location.replace("/main");
            }
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function setBoardData(boardData) {
    const winiaRadio = document.querySelector(".winia");
    const daewooRadio = document.querySelector(".daewoo");

    nameSpan.textContent = boardData.userName;
    emailSpan.textContent = boardData.userEmail;
    telSpan.textContent = boardData.mainPhoneNumber;

    boardData.companyCode == 1 ? daewooRadio.setAttribute("checked", true) : winiaRadio.setAttribute("checked", true);
    
    titleInput.value = boardData.boardTitle;
    contentTextarea.textContent = boardData.boardContent;


    if(modifyFlag) {
        const responseReceiveRadio = document.querySelector(".receive");
        const responseNotReceiveRadio = document.querySelector(".not-receive");

        boardData.responseFlag ? responseReceiveRadio.setAttribute("checked", true) : responseNotReceiveRadio.setAttribute("checked", true);

        if(boardData.fileList != null) {
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

function setEmail() {
    const secondEmail = document.querySelector(".email-2");

    if(emailBoxSelect.options[emailBoxSelect.selectedIndex].value != "custom") {
        secondEmail.value = emailBoxSelect.options[emailBoxSelect.selectedIndex].value;
        secondEmail.setAttribute("readonly", true);
    }else {
        secondEmail.value = "";
        secondEmail.removeAttribute("readonly", false);
    }
}

function inputFileBlock(size) {
    for(let i = 0; i < size; i++) {
        inputFileDivItems[i].querySelector("input").disabled = true;
        inputFileDivItems[i].classList.add("block-file");
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
    uploadButton.textContent = "수정";
}

function checkUnalterableUserInfoByuserCode() {
    if(userCode == 0) {
        const nonMemberRequireItems = document.querySelectorAll(".non-member-require");
        const authenticationTr = document.querySelector(".authentication-tr");
        const noticeP = document.querySelector(".notice-p");

        addVisibleClass(nameSpan);
        addVisibleClass(emailSpan);
        addVisibleClass(telSpan);

        removeVisibleClass(nameInput);
        removeVisibleClass(emailBox);
        removeVisibleClass(phoneBox);
        removeVisibleClass(authenticationTr);
        removeVisibleClass(noticeP);
        
        nonMemberRequireItems.forEach(item => item.classList.add("require-menu"));
    }else {
        nameSpan.textContent = user.userName;
        emailSpan.textContent = user.userEmail;
        telSpan.textContent = user.mainPhoneNumber;
    }
}

function submit() {
    if(!checkRequireMenu() || limitFileSize()) {
        return false;
    }

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
            location.replace(`/customer/${boardType}/detail/${response.data}`);
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

            if(authenticationInfo != null) {
                location.replace(`/customer/praise/non-member/detail/${response.data}`);

            }else {
                location.replace(`/customer/${boardType}/detail/${response.data}`);

            }
        },
        error: errorMessage
    });
}

function setFormData(form, boardType) {
    if(userCode != 0) {
        form.append("userCode", userCode);
        form.append("userName",nameSpan.textContent);
        form.append("email",emailSpan.textContent);
        form.append("mainPhoneNumber",telSpan.textContent);
    }else {
        form.append("userName", nameInput.value);
        form.append("email", email);
        form.append("mainPhoneNumber", phoneNumber);
        form.append("authenticationNumber", personalAuthenticationInput.value);

    }
    
    form.append("boardTitle", titleInput.value);
    form.append("boardContent", contentTextarea.value);
    form.append("boardTypeCode", boardType == "complaint" ? 1 : boardType == "praise" ? 2 : 3); 

    form.append("companyCode", companyCode);
    
    if(boardType != "praise") {
        form.append("responseFlag", responseCode);
    };

    if(deleteFileCodeList != null) {
        form.append("deleteFileCode", deleteFileCodeList);
        form.append("deleteTempFileName", deleteTempFileNameList);
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

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}

function checkRequireMenu() {
    // loadNonMemberRequestDataByLocalStorage();

    if(userCode == 0 && authenticationInfo == null) {
        const firstEmail = document.querySelector(".email-1");
        const lastEmail = document.querySelector(".email-2");
        const phoneSelect = document.querySelector(".phone-box select");
        const middlePhoneNUmber = document.querySelector(".middle-number");
        const lastPhoneNumber = document.querySelector(".last-number");

        let firstPhoneNumer = phoneSelect.options[phoneSelect.selectedIndex].value;
        
        email = firstEmail.value + "@" + lastEmail.value;
        phoneNumber = firstPhoneNumer + "-" + middlePhoneNUmber.value + "-" + lastPhoneNumber.value;
        
        let regPhone = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        let regEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;
        let regPersonalAuthentication = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^+=])[a-zA-Z0-9!@#$%^+=]{4,16}$/;

        if(isEmpty(nameInput)) {
            alert("이름을 입력해주세요.");
            nameInput.focus();
            return false;

        }else if(!regEmail.test(email)) {
            alert("이메일 주소를 올바르게 입력해주세요.")
            firstEmail.focus();
            return false;

        }else if(!regPhone.test(phoneNumber)) {
            alert("휴대폰번호를 확인해주세요.");
            middlePhoneNUmber.focus();
            return false;
        }else if(!smsAuthenticationFlag){
            alert("휴대폰 인증을 진행해 주세요.");
            return false;

        }else if(!regPersonalAuthentication.test(personalAuthenticationInput.value)) {
            alert("본인확인번호를 확인해주세요.\n사용가능 특수문자: !, @, #, $, %, ^, +, =");
            personalAuthenticationInput.focus();
            return false;
        }
    }

    brandInputItems.forEach(brandInput=>{
        if(brandInput.checked){
            companyCode = brandInput.value;
        }
    });

    if(companyCode == 0) {
        alert("제품 브랜드를 선택해주세요.");
        return false;
    }
    
    if(boardType != "praise") {
        responseInputItems.forEach(responseInput=>{
            if(responseInput.checked){
                responseCode = responseInput.value;
                responseSelectedFlag = true;
            }
        });

        if(!responseSelectedFlag) {
            alert("답변 수신 여부를 선택해주세요.");
            return false;
        }
    }

    if(isEmpty(titleInput.value)) {
        alert("제목을 입력해주세요.");
        return false;
    }else if(isEmpty(contentTextarea.value)) {
        alert("내용을 입력해주세요.");
        return false;
    }

    return true;
}

// function loadNonMemberRequestDataByLocalStorage() {
//     authenticationInfo = localStorage.authenticationInfo;

//     if(authenticationInfo != null) {
//         authenticationInfo = JSON.parse(authenticationInfo);
//     }
// }


function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}


function checkFileType(selectFile){
    var fileKind = selectFile.value.lastIndexOf('.');
    var fileName = selectFile.value.substring(fileKind + 1, selectFile.length);
    var flieType = fileName.toLowerCase();
    var checkFileType = ['jpg','gif','png','jpeg', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'hwp', 'zip', 'avi', 'mp4'];


    if(checkFileType.indexOf(flieType)==-1){
        alert("첨부 가능 확장자가 아닙니다.");
        // var parentSelectFile = selectFile.parentNode;
        // var node = parentSelectFile.replaceChild(selectFile.cloneNode(true),selectFile);

        selectFile.value = "";
        // selectFile.select();
        // document.getSelection.clear();
        return false;
    }else{
        console.log(fileName);
    }
}

function limitFileSize() {
    const fileInputItems = document.querySelectorAll(".input-file-div input");

    let maxFileSize = 50 * 1024 * 1024;
    let totalFileSize = 0;

    fileInputItems.forEach(input => {
        if(input.files[0] != undefined) {
            totalFileSize += input.files[0].size;

        }
    });

    if(maxFileSize < totalFileSize) {
        alert("최대 50MB 까지 첨부 가능합니다.");
        return true;
    }

    return false;
}
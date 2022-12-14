const nameSpan = document.querySelector(".name-span");
const emailBoxSelect = document.querySelector(".email-box select");
const emailSpan = document.querySelector(".email-span");
const telSpan = document.querySelector(".tel-span");
const nameInput = document.querySelector(".name-input");
const emailBox = document.querySelector(".email-box");

const phoneBox = document.querySelector(".phone-box");
const phoneSelect = document.querySelector(".phone-box select");
const middlePhoneNumber = document.querySelector(".middle-number");
const lastPhoneNumber = document.querySelector(".last-number");

const authenticationButton = document.querySelector(".authentication-request-button");
const authenticationCheckButton = document.querySelector(".authentication-check-button");

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

let regPhone = /^01([0|1|6|7|9])-+?([0-9]{3,4})-+?([0-9]{4})$/;
let randomAuthenticationNumber = null;
let smsAuthenticationFlag = false;

let modifyFlag = false;
let boardType = null;
let boardCode = 0;
let fileSize = 0;


let deleteFileCodeList = new Array();
let deleteTempFileNameList = new Array();


modifyFlag = getModifyFlagByUri();
boardType = getBoardTypeByUri();
setWriteViewByBoardType();
setBoardContentByBoardType();

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

authenticationButton.onclick = authenticationRequest;

authenticationCheckButton.onclick = checkAuthenticationNumber;

inputFileDivItems.forEach(input=>{
    input.onchange = (e) => {
        checkFileType(e.target);
    }
});


function setBoardContentByBoardType() {
    const h2 = document.querySelector("h2");

    if(boardType == "praise") {
        document.title = "[??????????????????] ???????????????";
        h2.textContent = "???????????????";

    }else if(boardType == "suggestion") {
        document.title = "[??????????????????] ???????????????";
        h2.textContent = "???????????????";

    }
}

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
        async: false,
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
                    alert("????????? ???????????????.");
                }else {
                    alert("?????? ?????? ?????? ??????????????????.");
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

function authenticationRequest() {
    setMainPhoneNumber();

    if(checkPhonNumberReg()) {
        $.ajax({
            type: "get",
            url: `/api/v1/auth/phone/${phoneNumber}`,
            dataType: "json",
            success: (response) => {
                randomAuthenticationNumber = response.data;
                alert(randomAuthenticationNumber);
            },
            error: errorMessage
        });
    }

    
}

function setMainPhoneNumber() {
    let firstPhoneNumer = phoneSelect.options[phoneSelect.selectedIndex].value;
    phoneNumber = firstPhoneNumer + "-" + middlePhoneNumber.value + "-" + lastPhoneNumber.value;

}

function checkPhonNumberReg() {
    console.log(phoneNumber);
    if(!regPhone.test(phoneNumber)) {
        alert("?????????????????? ??????????????????.");
        middlePhoneNumber.focus();
        return false;
    }
    return true;
}

function checkAuthenticationNumber() {
    const authenticationInput = document.querySelector(".authentication-input");
    if(authenticationInput.value == randomAuthenticationNumber) {
        const authenticationDiv = document.querySelector(".authentication-div");

        alert("?????? ??????");
        smsAuthenticationFlag = true;
        setPhoneBoxDisabled();
        addVisibleClass(authenticationDiv);
    }else {
        alert("?????? ??????");
        smsAuthenticationFlag = false;
    }
}

function setPhoneBoxDisabled() {
    phoneSelect.setAttribute("disabled", true);
    middlePhoneNumber.setAttribute("readonly", true);
    lastPhoneNumber.setAttribute("readonly", true);
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
    uploadButton.textContent = "??????";
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
        
        setMainPhoneNumber();
        email = firstEmail.value + "@" + lastEmail.value;
        
        let regEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;
        let regPersonalAuthentication = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^+=])[a-zA-Z0-9!@#$%^+=]{4,16}$/;

        if(isEmpty(nameInput)) {
            alert("????????? ??????????????????.");
            nameInput.focus();
            return false;

        }else if(!regEmail.test(email)) {
            alert("????????? ????????? ???????????? ??????????????????.")
            firstEmail.focus();
            return false;

        }else if(!regPhone.test(phoneNumber)) {
            alert("?????????????????? ??????????????????.");
            middlePhoneNumber.focus();
            return false;
        }else if(!smsAuthenticationFlag){
            alert("????????? ????????? ????????? ?????????.");
            return false;

        }else if(!regPersonalAuthentication.test(personalAuthenticationInput.value)) {
            alert("????????????????????? ??????????????????.\n???????????? ????????????: !, @, #, $, %, ^, +, =");
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
        alert("?????? ???????????? ??????????????????.");
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
            alert("?????? ?????? ????????? ??????????????????.");
            return false;
        }
    }

    if(isEmpty(titleInput.value)) {
        alert("????????? ??????????????????.");
        return false;
    }else if(isEmpty(contentTextarea.value)) {
        alert("????????? ??????????????????.");
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
        alert("?????? ?????? ???????????? ????????????.");
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
        alert("?????? 50MB ?????? ?????? ???????????????.");
        return true;
    }

    return false;
}
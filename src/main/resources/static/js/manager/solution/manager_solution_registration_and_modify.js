const solutionTypeSelect = document.querySelector(".solution-type-select");

const solutionBoardTypeDivItems = document.querySelectorAll(".solution-select-div div");

const summerNoteContent = document.querySelector(".summer-note-content");

const writeRequestButton = document.querySelector(".write-request-button");
const deleteRequestButton = document.querySelector(".delete-request-button");

let solutionBoardTypeCode = 0;

let fileList = new Array();
let originalSolutinFileList = new Array();
let deleteFileCodeList = new Array();
let deleteFileNameList = new Array();
let tempFileNameList = new Array();

setSummerNote();
setSolutionBoardTypeClickEvent();
setSolutionTypeCodeOption();
setWriteButtonClickEvent();

let modifyFlag = checkModifyPage();

if(modifyFlag) {
    let solutionBoardDetailData = getSolutionBoardDetail();
    setSolutionBoardDetailData(solutionBoardDetailData);
}

function checkModifyPage() {
    return location.pathname.indexOf("/modification") != -1 ? true : false;
}

function getSolutionBoardDetail() {
    let solutionBoardDetailData = null;
    let solutionCode = getSolutionCodeByUri();

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/manager/solution/${solutionCode}`,
        dataType: "json",
        success: (response) => {
            solutionBoardDetailData = response.data;
            originalSolutinFileList = solutionBoardDetailData.fileList;
        },
        error: (request, status, error) => {
            alert("요청중에 오류가 발생했습니다.");
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });

    return solutionBoardDetailData;
}

function setSolutionBoardDetailData(solutionBoardDetailData) {
    const title = document.querySelector(".title");
    const content = document.querySelector("#summernote");

    const solutionTypeSelectOptions = solutionTypeSelect.querySelectorAll("option");

    solutionTypeSelectOptions.forEach(option => {
        if(option.value == solutionBoardDetailData.solutionTypeCode) {
            option.setAttribute("selected", true);
            return false;
        }
    })

    solutionBoardTypeDivItems.forEach(div => {
        if(div.textContent == solutionBoardDetailData.solutionBoardType) {
            div.click();
            return false;
        }
    })

    title.value = solutionBoardDetailData.solutionTitle;
    content.value = solutionBoardDetailData.solutionContent;

    writeRequestButton.textContent = "수정";
    removeVisibleClass(deleteRequestButton);

    setDeleteButtonClickEvent();
}

function getSolutionCodeByUri() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function setSummerNote() {
    $(document).ready(function() {
        $('#summernote').summernote({
              width: 800,
              height: 600,                
              minHeight: null,             
              maxHeight: null,             
              focus: true,                  
              lang: "ko-KR",
              callbacks: {
                onImageUpload: (files) => {
                    uploadImage(files[0], this);
                }
              }
        });
    });
}

function setSolutionBoardTypeClickEvent() {
    solutionBoardTypeDivItems.forEach(div => {
        div.onclick = (e) => selectSolutionBoardType(solutionBoardTypeDivItems, e.target);
    });
}

function selectSolutionBoardType(solutionBoardTypeDivItems, div) {
    initializationSelectOption(solutionBoardTypeDivItems);

    div.classList.add("select-div");

    localStorage.solutionBoardType = div.textContent;

    solutionBoardTypeCode = div.textContent == "자주하는 질문" ? 1 : 2
}

function initializationSelectOption(solutionBoardTypeDivItems) {
    solutionBoardTypeDivItems.forEach(div => div.classList.remove("select-div"));
}

function setSolutionTypeCodeOption() {
    let solutionTypeList = getAllSolutionTypeList();

    if(solutionTypeList != null) {
        clearDomObject(solutionTypeSelect);

        solutionTypeList.forEach(solutionType => {
            if(solutionType.solutionTypeCode == 1) {
                return;
            }
            solutionTypeSelect.innerHTML += `
                <option value="${solutionType.solutionTypeCode}">${solutionType.solutionTypeName}</option>
            `;
        });
    }
}

function getAllSolutionTypeList() {
    let solutionTypeList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/solution/type/list`,
        dataType: "json",
        success: (response) => {
            solutionTypeList = response.data;
        },
        error: errorMessage
    });

    return solutionTypeList;
}

function setWriteButtonClickEvent() {
    writeRequestButton.onclick = writeRequest;
}

function uploadImage(file, editor) {
    let formData = setFormData(file);

    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/manager/temp/solution/file`,
        data: formData,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        success: (response) => {
            let fileName = response.data.substring(response.data.lastIndexOf("_") + 1);
            let tempFileName = response.data.substring(response.data.lastIndexOf("/") + 1);
            let fileUrl = response.data;
            console.log(fileUrl);
            console.log(fileName);
            $('#summernote').summernote('insertImage',  fileUrl, fileName);
            let fileMap = new Map().set(fileUrl, file);
            fileList.push(fileMap);
            tempFileNameList.push(tempFileName);

        },
        error: errorMessage
    });
}

function setFormData(file) {
    let formData = new FormData();
    formData.append("file", file);

    return formData;
}

function writeRequest() {
    if(isIncompleteRequest()) {
        return;
    }
    let title = getTitle();
    let content = getContent();
    let fileList = setFileList(content);
    let solutionTypeCode = solutionTypeSelect.value;

    let formData = new FormData();

    formData.append("solutionTypeCode", solutionTypeCode);
    formData.append("solutionBoardTypeCode", solutionBoardTypeCode);
    formData.append("solutionTitle", title);
    formData.append("solutionContent", content);
    formData.append("tempFileNameList", tempFileNameList);
    

    fileList.forEach(file => formData.append("fileList", file));

    modifyFlag ? modifySolution(formData) : insertSolution(formData);
    
}

function insertSolution(formData) {
    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/manager/solution`,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("작성 완료");
                location.replace("/manager/solution/registration");
            }
        },
        error: errorMessage
    });
}

function modifySolution(formData) {
    let solutionCode = getSolutionCodeByUri();
    formData.append("deleteFileCodeList", deleteFileCodeList);
    formData.append("deleteFileNameList", deleteFileNameList);

    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/manager/solution/${solutionCode}`,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("수정 완료");
                localStorage.lastRequest = "solutionBoardManage";
                location.replace("/manager/solution/modification");
            }
        },
        error: errorMessage
    });
}

function setFileList(content) {
    let fileResultList = new Array();


    fileList.forEach(file => {
        if(content.indexOf(file.keys().next().value) != -1) {
            fileResultList.push(file.values().next().value);
        }
    })

    tempFileNameList = tempFileNameList.filter(tempFileName => content.indexOf(tempFileName) != -1);

    if(modifyFlag && originalSolutinFileList.length > 0) {
        deleteFileCodeList = originalSolutinFileList.filter(file => content.indexOf(file.fileName) == -1)
        .map(file => file.fileCode);
                            
        deleteFileNameList = originalSolutinFileList.filter(file => content.indexOf(file.fileName) == -1)
        .map(file => file.fileName);
    }

    return fileResultList;
}

function getTitle() {
    return document.querySelector(".title").value;
}

function getContent() {
    return document.querySelector("#summernote").value;
}

function isIncompleteRequest() {
    let status = false;

    if(solutionBoardTypeCode == 0) {
        alert("게시글 타입을 정해주세요.");
        status = true;
    }else if(isEmpty(getTitle())) {
        alert("제목을 입력해주세요.");
        status = true;
    }else if(isEmpty(getContent())) {
        alert("내용을 입력해주세요.");
        status = true;
    }

    return status;
}

function setDeleteButtonClickEvent() {
    deleteRequestButton.onclick = solutionDeleteRequest;
}

function solutionDeleteRequest() {
    if(confirm("정말 삭제하시겠습니까?")) {
        let solutionCode = getSolutionCodeByUri();

        $.ajax({
            async: false,
            type: "delete",
            url: `/api/v1/manager/solution/${solutionCode}`,
            dataType: "json",
            success: (response) => {
                if(response.data) {
                    alert("삭제 성공");
                
                    localStorage.lastRequest = "solutionBoardManage";
                    location.replace("/manager/solution/modification");
                }else {
                    alert("삭제 실패");
                }
            },
            error: errorMessage
        });
    }
    
}

function setCompany(companyCode) {
    company = companyCode == 1 ? "daewoo" : "winia";
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}

function isEmpty(data) {
    return data == "" || data == null || data == undefined;
}

function errorMessage(request, status, error) {
    alert("요청 에러");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
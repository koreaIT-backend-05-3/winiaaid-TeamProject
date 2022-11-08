const solutionTypeSelect = document.querySelector(".solution-type-select");

const summerNoteContent = document.querySelector(".summer-note-content");

let solutiontypeBoardCode = 0;

let fileList = new Array();

setSummerNote();
setSolutionBoardTypeClickEvent();
setSolutionTypeCodeOption();
setWriteButtonClickEvent();


function setSummerNote() {
    $(document).ready(function() {
        $('#summernote').summernote({
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
    const solutionBoardTypeDivItems = document.querySelectorAll(".solution-select-div div");


    solutionBoardTypeDivItems.forEach(div => {
        div.onclick = (e) => selectSolutionBoardType(solutionBoardTypeDivItems, e.target);
    });
}

function selectSolutionBoardType(solutionBoardTypeDivItems, div) {
    initializationSelectOption(solutionBoardTypeDivItems);

    div.classList.add("select-div");

    solutiontypeBoardCode = div.textContent == "자주하는 질문" ? 1 : 2
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
    const writeRequestButton = document.querySelector(".write-request-button");

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
            let fileUrl = response.data;
            console.log(fileUrl);
            console.log(fileName);
            $('#summernote').summernote('insertImage',  fileUrl, fileName);
            console.log(file);
            let fileMap = new Map().set(fileUrl, file);
            fileList.push(fileMap);


            console.log(fileList);
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
    formData.append("solutionTypeBoardCode", solutiontypeBoardCode);
    formData.append("solutionTitle", title);
    formData.append("solutionContent", content);

    fileList.forEach(file => formData.append("fileList", file));

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

function setFileList(content) {
    let fileResultList = new Array();


    fileList.forEach(file => {
        console.log(file.keys().next());
        console.log(file.values().next());
        if(content.indexOf(file.keys().next().value) != -1) {
            let test = file.values().next().value;
            fileResultList.push(file.values().next().value);
        }
    })

    console.log(fileResultList);

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

    if(solutiontypeBoardCode == 0) {
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
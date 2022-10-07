const goListButton = document.querySelector(".go-list-button");
const imageItems = document.querySelectorAll(".etc-group img");

let solutionBoardCode = getSolutionBoardCode();


increamentViewCount();
getSolutionDetailData();
setImageByUri();
getImageItemsSrc();

goListButton.onclick = loadListPage;

function loadListPage() {
    savePreviousInfoToLocalStorage();

    if(checkFaqUri()) {
        location.href = "/solution/faq/list";
    }else {
        location.href = "/solution/self-check/list";
    }
}

function getBoardType() {
    return location.pathname.indexOf("faq") != -1 ? "faq" : "selfCheck";
}

function getSolutionDetailData() {
    let boardType = getBoardType();
    setSolutionListTypeView(boardType);

    $.ajax({
        type: "get",
        url: `/api/v1/solution/${boardType}/detail/${solutionBoardCode}`,
        dataType: "json",
        success: (response) => {
            setSolutionDetailData(response.data);
            setSolutionDataObject(response.data);
        },
        error: (request, status, error) => {
            alert("요청중에 오류가 발생했습니다.");
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function getSolutionBoardCode() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function setSolutionDetailData(solutionDetailData) {
    const solutionTable = document.querySelector("table");

    if(isEmpty(solutionDetailData)) {
        solutionTable.innerHTML = `
        <thead>
            <tr>
                <th>제목</th>
                <td class="content-title" colspan="5"></td>
            </tr>
            <tr>
                <th>제품</th>
                <td></td>
                <th>유형</th>
                <td></td>
                <th>등록일</th>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="6">
                    <textarea class="content" readonly>데이터가 없습니다.</textarea>
                </td>
            </tr>
        </tbody>
            `;
    }else {
        solutionTable.innerHTML = `
        <thead>
            <tr>
                <th>제목</th>
                <td class="content-title" colspan="4">${solutionDetailData.solutionTitle}</td>
                <td><button class="send-message" type="button">문자발송</button></td>
            </tr>
            <tr>
                <th>제품</th>
                <td>${solutionDetailData.productCategoryName}${solutionDetailData.productCategoryName == solutionDetailData.productDetailName ? "" : " > " + solutionDetailData.productDetailName}</td>
                <th>유형</th>
                <td>${solutionDetailData.solutionName}</td>
                <th>등록일</th>
                <td>${solutionDetailData.createDate.substring(0, 10).replaceAll("-", ".")}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="6">
                    <textarea class="content" readonly>${solutionDetailData.solutionContent}</textarea>
                </td>
            </tr>
        </tbody>
            `;

        const tbodyTd = document.querySelector("tbody td");

        for(imageFile of solutionDetailData.solutionFileList) {
            tbodyTd.innerHTML += `<img src="/image/solution_images/${imageFile.fileName}" alt="${imageFile.fileName}">`;
        }

        setSendMessageButtonClickEvent(solutionDetailData);
    }
}

function setSolutionDataObject(solutionDetailData) {
    solutionInfoObject.companyCode = solutionDetailData.companyCode;
    solutionInfoObject.productGroupName = solutionDetailData.productGroupName;
    solutionInfoObject.productCategoryName = solutionDetailData.productCategoryName;
    solutionInfoObject.productDetailName = solutionDetailData.productDetailName;
}

function savePreviousInfoToLocalStorage() {
    localStorage.pastSolutionListHistoryInfoObject = JSON.stringify(solutionInfoObject);
}

function isEmpty(value) {
    return value == "" || value == null || value == undefined;
}

function setImageByUri() {
    
    if(!checkFaqUri()) {
        imageItems[0].setAttribute("src", "/image/images/frequently_asked_question_service.jpg");
        imageItems[0].setAttribute("alt", "자주하는 질문");
    }
}

function checkFaqUri() {
    return location.pathname.indexOf("faq") != -1;
}

function getImageItemsSrc() {
    for(image of imageItems) {
        let imageSrc = image.getAttribute("src");

        image.onclick = () => checkSrcAndSetClickEvent(imageSrc);
    }
}

function checkSrcAndSetClickEvent(imageSrc) {
    if(imageSrc.indexOf("frequently_asked_question_service") != -1) {
        location.href = "/solution/faq/list";
    }else if(imageSrc.indexOf("self_examination") != -1) {
        location.href = "/solution/self/list";
    }else if(imageSrc.indexOf("consulation_inquiry") != -1) {
        
    }else if(imageSrc.indexOf("visit_repair_service") != -1) {
        location.href = "/service/visit/request";
    }
}

function increamentViewCount() {
    $.ajax({
        type: "put",
        url: `/api/v1/solution/increase/view-count/${solutionBoardCode}`,
        dataType: "json",
        success: (response) => {
            
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function setSolutionListTypeView(boardType) {
    const titleH1 = document.querySelector(".title-div h1");

    if(boardType == "faq") {
        titleH1.textContent = "자주하는 질문";
    }else {
        titleH1.textContent = "자가진단";
    }
}
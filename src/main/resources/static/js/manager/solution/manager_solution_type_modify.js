const modifyTypeButtonItems = document.querySelectorAll(".choice-modify-type-div button");

const solutionSelectDiv = document.querySelectorAll(".solution-select-div div");

const mainGroupDiv = document.querySelector(".main-group-div");
const mainProductDiv = document.querySelector(".main-product-div");

const solutionTypeInputDiv = document.querySelector(".solution-type-input-div");
const solutionTypeInput = document.querySelector(".solution-type-input");
const solutionTypeRequestButton = document.querySelector(".solution-type-request-button");

setModifyTypeButtonClickEvent();
setSolutionTypeInputEnterEvent();
// getCompanyList();
setLastRequestView(loadLastRequestInLocalStorage());

function setModifyTypeButtonClickEvent() {
    
    modifyTypeButtonItems[0].onclick = solutionTypeManage;
    modifyTypeButtonItems[1].onclick = solutionBoardManage;
    modifyTypeButtonItems[2].onclick = registrationSolutionBoardManage;
}



function solutionTypeManage() {
    let solutionTypeList = getAllSolutionTypeList();
    const solutionTypeManageDiv = document.querySelector(".solution-type-manage-div");

    removeVisibleClass(solutionTypeManageDiv);
    setSolutionList(solutionTypeList);
}

function getAllSolutionTypeList() {
    let solutionTypeList = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/solution/type/list",
        dataType: "json",
        success: (repsonse) => {
            if(repsonse.data != null) {
                solutionTypeList = repsonse.data;
            }
        },
        error: errorMessage
    });

    return solutionTypeList;
}

function setSolutionList(solutionTypeList) {
    const solutionTypeDiv = document.querySelector(".solution-type-div");

    solutionTypeDiv.innerHTML = `
        <span class="sortation-span">문제해결 타입</span>
        <ul class="main-solution-ul solution-ul"></ul>
    `;
    
    const mainSolutionUl = document.querySelector(".main-solution-ul");

    if(solutionTypeList != null) {
        solutionTypeList.forEach(solution => {
            if(solution.solutionTypeCode == 1) {
                return;
            }

            mainSolutionUl.innerHTML += `
                <li class="main-solution-li">
                    <div>
                        <span class="fa-solid fa-cube"></span>
                        <span class="solution-detail-span">${solution.solutionTypeName}</span>
                    </div>
                    <span class='fa-regular fa-trash-can solution-detail-delete-span'></span>
                </li>
            `;
        });

    }

    mainSolutionUl.innerHTML += `
        <li class="main-solution-li add-li">
            <div>
                <span class="fa-solid fa-plus"></span>
                <span class="solution-detail-add-span">추가</span>
            </div>
        </li>
        `;

        if(solutionTypeList != null) {
            setSolutionDetailClickEvent(solutionTypeList);
            setSolutionDeleteButtonClickEvent(solutionTypeList);
        }

        setSolutiionDetailAddSpanClickEvent();
}

function setSolutionDetailClickEvent(solutionTypeList) {
    const solutionDetailSpanItems = document.querySelectorAll(".solution-detail-span");

    solutionDetailSpanItems.forEach((solution, index) => {
        solution.onclick = () => setSolutionTypeModifyView(solutionTypeList[index + 1]);
    });
}

function setSolutionTypeModifyView(solutionType) {
    removeVisibleClass(solutionTypeInputDiv);
    solutionTypeInput.value = solutionType.solutionTypeName;

    solutionTypeRequestButton.onclick = () => solutionTypeModifyRequest(solutionType.solutionTypeCode);
}

function setSolutiionDetailAddSpanClickEvent() {
    const solutionDetailAddSpan = document.querySelector(".solution-detail-add-span");


    solutionDetailAddSpan.onclick = setSolutionTypeAddView;
}

function solutionTypeModifyRequest(solutionTypeCode) {
    if(isEmpty(solutionTypeInput.value)) {
        alert("공백은 입력할 수 없습니다.");
        return;
    }

    $.ajax({
        async: false,
        type: "put",
        url: "/api/v1/manager/solution-type",
        contentType: "application/json",
        data: JSON.stringify({
            "solutionTypeCode": solutionTypeCode,
            "solutionTypeName": solutionTypeInput.value
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("업데이트 완료");
                saveLastRequestInLocalStorage("solutionTypeManage");
                location.replace("/manager/solution/modification");
            }else {
                alert("업데이트 실패");
            }
        },
        error: errorMessage
    });
}

function setSolutionTypeAddView() {
    removeVisibleClass(solutionTypeInputDiv);
    clearDomObject(solutionTypeInput);

    solutionTypeRequestButton.onclick = solutionTypeAddRequest;
}

function solutionTypeAddRequest() {
    if(isEmpty(solutionTypeInput.value)) {
        alert("공백은 입력할 수 없습니다.");
        return;
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/v1/manager/solution-type",
        contentType: "application/json",
        data: JSON.stringify({
            "solutionTypeName": solutionTypeInput.value
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("추가 완료");
                saveLastRequestInLocalStorage("solutionTypeManage");
                location.replace("/manager/solution/modification");
            }else {
                alert("추가 실패");
            }
        },
        error: errorMessage
    });
}

function setSolutionDeleteButtonClickEvent(solutionTypeList) {
    const solutionDetailDeleteSpanItems = document.querySelectorAll(".solution-detail-delete-span");

    solutionDetailDeleteSpanItems.forEach((solution, index) => {
        solution.onclick = () => solutionTypeDeleteRequest(solutionTypeList[index + 1].solutionTypeCode);
    })
}

function solutionTypeDeleteRequest(solutionTypeCode) {
    if(!confirm("정말로 삭제하시겠습니까?")) {
        return;
    }

    $.ajax({
        async: false,
        type: "delete",
        url: "/api/v1/manager/solution-type",
        contentType: "application/json",
        data: JSON.stringify({
            "solutionTypeCode": solutionTypeCode
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("삭제 완료");
                saveLastRequestInLocalStorage("solutionTypeManage");
                location.replace("/manager/solution/modification");
            }else {
                alert("삭제 실패");
            }
        },
        error: errorMessage
    });
}

function saveLastRequestInLocalStorage(lastRequest) {
    localStorage.lastRequest = lastRequest;
}

function loadLastRequestInLocalStorage() {
    return localStorage.lastRequest;
}

function setLastRequestView(lastRequest) {
    if(lastRequest != null) {
        if(lastRequest == "solutionTypeManage") {
            modifyTypeButtonItems[0].click();
    
        }else if(lastRequest == "solutionBoardManage") {
            modifyTypeButtonItems[1].click();
            let solutionBoardType = localStorage.solutionBoardType;

            console.log(solutionBoardType);

            solutionSelectDiv.forEach(div => {
                if(div.textContent == solutionBoardType) {
                    div.click();
                    return false;
                }
            });

            localStorage.removeItem("solutionBoardType");
    
        }else if(lastRequest == "registrationSolutionBoardManage") {
            modifyTypeButtonItems[2].click();
    
        }

        localStorage.removeItem("lastRequest");
    }
}

function setSolutionSelectDivClickEvent() {
    solutionSelectDiv.forEach(solution => solution.onclick = (e) => selectSolutionBoardType(solutionSelectDiv, e.target));
}

function selectSolutionBoardType(solutionBoardTypeDivItems, div) {
    const solutionBoardTable = document.querySelector(".solution-board-table");

    initializationSelectOption(solutionBoardTypeDivItems);
    removeVisibleClass(solutionBoardTable);

    div.classList.add("select-div");

    let solutionBoardType = div.textContent == "자주하는 질문" ? "faq" : "self-check";

    let solutionTitleList = getAllSolutionTitleList(solutionBoardType);
    setSolutionTitle(solutionTitleList, solutionBoardType);
}

function initializationSelectOption(solutionBoardTypeDivItems) {
    solutionBoardTypeDivItems.forEach(div => div.classList.remove("select-div"));
}

function solutionBoardManage() {
    const solutionSelectDiv = document.querySelector(".solution-select-div");

    removeVisibleClass(solutionSelectDiv);
    setSolutionSelectDivClickEvent();
}

function getAllSolutionTitleList(solutionBoardType) {
    let solutionTitleList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/solution/${solutionBoardType}/title/list`,
        dataType: "json",
        success: (response) => {
            solutionTitleList = response.data;
        }
    });

    return solutionTitleList;
}

function setSolutionTitle(solutionTitleList, solutionBoardType) {
    const solutionTable = document.querySelector(".solution-board-table table");
    const solutionBoardTypeTitle = document.querySelector(".solution-board-type-title");

    solutionBoardTypeTitle.textContent = solutionBoardType == "faq" ? "자주하는 질문" : "자가진단";

    if(solutionTitleList != null) {

        clearDomObject(solutionTable);

        solutionTitleList.forEach(solutionTitle => {
            solutionTable.innerHTML += `
                <tr>
                    <td class="solution-code-td">${solutionTitle.solutionCode}</td>
                    <td class="solution-title-td">
                        <span>${solutionTitle.solutionTitle}</span>
                    </td>
                </tr>
            `;
        });

        setSolutionTitleClickEvent(solutionTitleList);
    }else {
        solutionTable.innerHTML = `
            <tr>
                <td class="solution-code-td">0</td>
                <td class="solution-title-td">
                    <span>게시글이 존재하지 않습니다.</span>
                </td>
            </tr>
        `;
    }
}

function setSolutionTitleClickEvent(solutionTitleList) {
    const solutionTitleTdItems = document.querySelectorAll(".solution-title-td");

    solutionTitleTdItems.forEach((td, index) => {
        td.onclick = () => loadSolutionBoardModifyView(solutionTitleList[index].solutionCode);
    })
}

function loadSolutionBoardModifyView(solutionCode) {
    location.href = `/manager/solution/modification/${solutionCode}`;
}

function registrationSolutionBoardManage() {
    
}

function getCompanyList() {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/company/list`,
        dataType: "json",
        success: (response) => {
            setCompanyList(response.data);
        },
        error: errorMessage
    });
}

function setCompanyList(companyList) {
    const mainCompanyDiv = document.querySelector(".main-company-div");

    clearDomObject(mainCompanyDiv);

    if(companyList != null) {
        companyList.forEach(company => {
            mainCompanyDiv.innerHTML += `
                <div class="company-div">${company.companyName}</div>
            `;
        });

        setCompanyClickEvent(companyList);
    }
}

function setCompanyClickEvent(companyList) {
    companyDiv = document.querySelectorAll(".company-div");

    companyDiv.forEach((company, index) => {
        company.onclick = () => getProductMainCategoryList(companyList[index]);
    });
}

function getProductMainCategoryList(companyObject) {
    
    clearDomObject(mainGroupDiv);
    clearDomObject(mainProductDiv);
    addVisibleClass(summerNoteContent);

    let companyCode = companyObject.companyCode;

    setCompany(companyCode);

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/${company}`,
        dataType: "json",
        success: (response) => {
            setProductMainCategoryList(response.data);
        },
        error: errorMessage
    });
}

function setProductMainCategoryList(productCategoryList) {
    const mainCategoryDiv = document.querySelector(".main-category-div");


    mainCategoryDiv.innerHTML = `
        <span class="sortation-span">메인 카테고리</span>
        <ul class="main-category-ul product-ul"></ul>
    `;

    const mainCategoryUl = document.querySelector(".main-category-ul");
   
    productCategoryList.forEach(product => {
        mainCategoryUl.innerHTML += `
            <li class="main-category-li">
                <div>
                    <span class="fa-solid fa-cube"></span>
                    <span class="product-detail-span">${product.productCategoryName}</span>
                </div>
            </li>
        `;
    });

    setProductCategoryListClickEvent(productCategoryList);

}

function setProductCategoryListClickEvent(productCategoryList) {
    categorySpanItems = document.querySelectorAll(".main-category-ul .product-detail-span");

    categorySpanItems.forEach((category, index) => {
        category.onclick = () => checkGroupFlag(productCategoryList[index]);
    })
}

function checkGroupFlag(category) {
    addVisibleClass(summerNoteContent);

    if(category.groupFlag) {
        let productGroupList = getProductGroupList(category.productGroupCode);
        setProductGroupList(productGroupList);
        clearDomObject(mainProductDiv);

    }else {
        getProductDetailList(category.productCategoryCode);
        clearDomObject(mainGroupDiv);
        
    }
}

function getProductGroupList(groupCode) {
    let productGroupList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/${company}/group/${groupCode}`,
        dataType: "json",
        success: (response) => {
            productGroupList = response.data;
        },
        error: errorMessage
    });

    return productGroupList;
}

function setProductGroupList(productGroupList) {
    mainGroupDiv.innerHTML = `
        <span class="sortation-span">카테고리</span>
        <ul class="main-group-ul product-ul"></ul>
    `;

    const mainGroupUl = document.querySelector(".main-group-ul");
    
    if(productGroupList != null) {
        productGroupList.forEach((product, index) => {
            mainGroupUl.innerHTML += `
                <li class="main-group-li">
                    <div>
                        <span class="fa-solid fa-cube"></span>
                        <span class="product-detail-span">${product.productCategoryName}</span>
                    </div>
                </li>
            `;
        });

    }else {
        setProductDetailList(null);

    }

    setProductGroupListClickEvent(productGroupList);
}

function setProductGroupListClickEvent(productGroupList) {
    groupSpanItems = document.querySelectorAll(".main-group-ul .product-detail-span");

    groupSpanItems.forEach((group, index) => {
        group.onclick = () => setProductDetailListByGroupCode(productGroupList[index]);
    });
}

function setProductDetailListByGroupCode(productGroup) {
    mainProductDiv.innerHTML = `
        <span class="sortation-span">제품</span>
        <ul class="main-product-ul product-ul"></ul>
    `;

    const mainPorductUl = document.querySelector(".main-product-ul");

    removeVisibleClass(summerNoteContent);

    if(productGroup != null) {

        productGroup.productDetailList.forEach((product, index) => {
            if(productGroup.productCategoryName == product.productDetailName) {
                return;
            }else {
                addVisibleClass(summerNoteContent);
            }
            mainPorductUl.innerHTML += `
                <li class="main-product-li">
                    <div>
                        <span class="fa-solid fa-cube"></span>
                        <span class="product-detail-span">${product.productDetailName}</span>
                    </div>
                </li>
            `;
        });
        
        setProductDetailAddSpanClickEvent(productGroup.productDetailList);
    }
}

function getProductDetailList(categoryCode) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/${company}/default/${categoryCode}`,
        dataType: "json",
        success: (response) => {
            setProductDetailList(response.data);
        },
        error: errorMessage
    });
}

function setProductDetailList(productDetailList) {
    mainProductDiv.innerHTML = `
        <span class="sortation-span">제품</span>
        <ul class="main-product-ul product-ul"></ul>
    `;

    const mainProductUl = document.querySelector(".main-product-ul");
    
    if(productDetailList != null) {
        productDetailList[0].productDetailList.forEach((product, index) => {
            mainProductUl.innerHTML += `
                <li class="main-product-li">
                    <div>
                        <span class="fa-solid fa-cube"></span>
                        <span class="product-detail-span">${product.productDetailName}</span>
                    </div>
                </li>
            `;
        });

        setProductDetailAddSpanClickEvent(productDetailList[0].productDetailList);
    }
}

function setProductDetailAddSpanClickEvent(productDetailList) {
    const productDetailSpanItems = document.querySelectorAll(".main-product-ul .product-detail-span");

    productDetailSpanItems.forEach((span, index) => {
        span.onclick = () => selectProduct(productDetailList[index]);
    });
}

function selectProduct(productDetail) {
    productCode = productDetail.productCode;

    removeVisibleClass(summerNoteContent);
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

function setSolutionTypeInputEnterEvent() {
    solutionTypeInput.onkeypress = (e) => {
        if(e.keyCode == 13) {
            solutionTypeRequestButton.click();
        }
    }
}

function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function errorMessage(request, status, error) {
    alert("요청 에러");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
const solutionTypeManageDiv = document.querySelector(".solution-type-manage-div");
const solutionBoardManageDiv = document.querySelector(".solution-board-manage-div");
const registrationSolutionBoardManageDiv = document.querySelector(".registration-solution-board-manage-div");

const productBox = document.querySelector(".product-box");

const modifyTypeButtonItems = document.querySelectorAll(".choice-modify-type-div button");

const solutionBoardTable = document.querySelector(".solution-board-table");

const solutionSelectDiv = document.querySelectorAll(".solution-select-div div");
const addSolutionSelectDivItems = document.querySelectorAll(".add-solution-select-div div");

const mainGroupDiv = document.querySelector(".main-group-div");
const mainProductDiv = document.querySelector(".main-product-div");

const solutionTypeInputDiv = document.querySelector(".solution-type-input-div");
const solutionTypeInput = document.querySelector(".solution-type-input");
const solutionTypeRequestButton = document.querySelector(".solution-type-request-button");

const addSolutionBoardTable = document.querySelector(".add-solution-board-table");

const productSolutionListDiv = document.querySelector(".product-solution-list-div");
const solutionListDiv = document.querySelector(".solution-list-div");

const solutionTbody = document.querySelector(".not-include-solution-tbody");
const addProductSolutionButton = document.querySelector(".add-product-solution-button");

let selectProductObject = {
    "productCategoryName": productCategoryName,
    "productGroupName": productGroupName,
    "productDetailName": productDetailName
}

setModifyTypeButtonClickEvent();
setSolutionTypeInputEnterEvent();
setLastRequestView(loadLastRequestInLocalStorage());

function setModifyTypeButtonClickEvent() {
    modifyTypeButtonItems[0].onclick = solutionTypeManage;
    modifyTypeButtonItems[1].onclick = solutionBoardManage;
    modifyTypeButtonItems[2].onclick = registrationSolutionBoardManage;
}



function solutionTypeManage() {
    let solutionTypeList = getAllSolutionTypeList();

    hideElseManageView("solutionTypeManage");
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
    solutionTypeInput.value = "";

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

            solutionSelectDiv.forEach(div => {
                if(div.textContent == solutionBoardType) {
                    div.click();
                    return false;
                }
            });

            localStorage.removeItem("solutionBoardType");
    
        }else if(lastRequest == "registrationSolutionBoardManage") {
            modifyTypeButtonItems[2].click();
            let selectProductObject = localStorage.selectProductObject;

            if(selectProductObject != null) {
                selectProductObject = JSON.parse(selectProductObject);

                setLastSelectProductView(selectProductObject);
            }
    
        }

        localStorage.removeItem("lastRequest");
    }
}

function setLastSelectProductView(selectProductObject) {
    
}

function setSolutionSelectDivClickEvent() {
    solutionSelectDiv.forEach(solution => solution.onclick = (e) => selectSolutionBoardType(solutionSelectDiv, e.target));
}

function selectSolutionBoardType(solutionBoardTypeDivItems, div) {
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

    hideElseManageView("solutionBoardManage");
    removeVisibleClass(solutionBoardManageDiv);
    removeVisibleClass(solutionSelectDiv);
    setSolutionSelectDivClickEvent();
}

function getAllSolutionTitleList(solutionBoardType) {
    let solutionTitleList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/solution/${solutionBoardType}/title/list?productCode=all&notInclude=false`,
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
    removeVisibleClass(registrationSolutionBoardManageDiv);
    hideElseManageView("registrationSolutionBoardManage");
    getCompanyList();
    
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
    addVisibleClass(productSolutionListDiv);
    addVisibleClass(solutionListDiv);

    let companyCode = companyObject.companyCode;
    selectProductObject.companyName = companyObject.companyName;

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

    removeVisibleClass(productBox);
    hideSolutionListDiv();

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
    addVisibleClass(productSolutionListDiv);
    addVisibleClass(solutionListDiv);

    selectProductObject.productObjectroductCategoryName = category.productCategoryName;

    if(category.groupFlag) {
        let productGroupList = getProductGroupList(category.productGroupCode);
        setProductGroupList(productGroupList);
        clearDomObject(mainProductDiv);

    }else {
        getProductDetailList(category.productCategoryCode);
        clearDomObject(mainGroupDiv);
        selectProductObject.productGroupName = null;
        
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
    hideSolutionListDiv();

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

    selectProductObject.productGroupName = productGroup.productCategoryName;
    removeVisibleClass(productSolutionListDiv);
    hideSolutionListDiv();

    if(productGroup != null) {

        if(productGroup.productDetailList[0].productDetailName != productGroup.productCategoryName) {
            productGroup.productDetailList.forEach((product, index) => {
                if(productGroup.productCategoryName == product.productDetailName) {
                    return;
                }else {
                    addVisibleClass(productSolutionListDiv);
                    addVisibleClass(solutionListDiv);
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
            
            setProductDetailSpanClickEvent(productGroup.productDetailList);

        }else {
            getProducSolutionList(productGroup);
        }
        
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
    hideSolutionListDiv();
    
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

        setProductDetailSpanClickEvent(productDetailList[0].productDetailList);
    }
}

function setProductDetailSpanClickEvent(productDetailList) {
    const productDetailSpanItems = document.querySelectorAll(".main-product-ul .product-detail-span");

    productDetailSpanItems.forEach((span, index) => {
        span.onclick = () => getProducSolutionList(productDetailList[index]);
    });
}

function getProducSolutionList(productDetail) {
    productCode = productDetail.productCode;
    selectProductObject.productDetailName = productDetail.productDetailName;

    removeVisibleClass(productSolutionListDiv);

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/solution/all/title/list?productCode=${productCode}&notInclude=false`,
        dataType: "json",
        success: (response) => {
            setProductSolutionList(response.data, productCode);
        },
        error: errorMessage
    });
    
}

function setProductSolutionList(solutionList, productCode) {
    const solutionTbody = document.querySelector(".has-solution-tbody");
    hideSolutionListDiv();

    if(solutionList != null) {
        clearDomObject(solutionTbody);

        solutionList.forEach(solution => {
            solutionTbody.innerHTML += `
            <tr>
                <td>${solution.solutionBoardCode}</td>
                <td>
                    <span class="product-solution-title-span">${solution.solutionTitle}</span>
                </td>
                <td>${solution.solutionType}</td>
                <td>${solution.solutionBoardType}</td>
                <td>
                    <span class='fa-regular fa-trash-can product-solution-delete-span'></span>
                </td>
            </tr>
            `;
        });


    }else {
        solutionTbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <span>데이터가 없습니다.</span>
                </td>
            </tr>
        `;
    }

    solutionTbody.innerHTML += `
        <tr>
            <td colspan="5">
                <span class="fa-solid fa-plus"></span>
                <span class="product-solution-add-span">추가</span>
            </td>
        </tr>
    `;

    if(solutionList != null) {        
        setDeleteSpanClickEvent(solutionList);
    }
    setProductSolutionAddSpanClickEvent(productCode);
}

function setDeleteSpanClickEvent(solutionList) {
    const productSolutionDeleteSpanItems = document.querySelectorAll(".product-solution-delete-span");

    productSolutionDeleteSpanItems.forEach((deleteSpan, index) => {
        deleteSpan.onclick = () => deleteProductSolution(solutionList[index].solutionBoardCode);
    })
}

function deleteProductSolution(solutionBoardCode) {
    if(confirm("정말 삭제하시겠습니까?")) {
        $.ajax({
            async: false,
            type: "delete",
            url: `/api/v1/manager/solution-board/${solutionBoardCode}`,
            dataType: "json",
            success: (response) => {
                if(response.data) {
                    alert("삭제 완료");
                    location.replace("/manager/solution/modification");
                    saveLastRequestInLocalStorage("registrationSolutionBoardManage");

                }else {
                    alert("삭제 실패");
                }
            },
            error: errorMessage
        });
    }
}

function setProductSolutionAddSpanClickEvent(productCode) {
    const productSolutionAddSpan = document.querySelector(".product-solution-add-span");

    productSolutionAddSpan.onclick = () => showSolutionListDiv(productCode);
}

function showSolutionListDiv() {
    removeVisibleClass(solutionListDiv);
    
    setAddSolutionSelectDivClickEvent(productCode);
}

function setAddSolutionSelectDivClickEvent(productCode) {
    addSolutionSelectDivItems.forEach(div => {
        div.onclick = (e) => getSolutionList(e.target, productCode);
    })
}

function getSolutionList(div, productCode) {
    showAddSolutionBoardTable(div);
    let solutionBoardType = div.textContent == "자주하는 질문" ? "faq" : "self-check";

    $.ajax({
        async: false,
        type: "get",
        url:`/api/v1/solution/${solutionBoardType}/title/list?productCode=${productCode}&notInclude=true`,
        dataType: "json",
        success: (response) => {
            setNewSolutionList(response.data, productCode);
        },
        error: errorMessage
    });
}

function showAddSolutionBoardTable(titleDiv) {
    removeVisibleClass(addProductSolutionButton);
    removeVisibleClass(addSolutionBoardTable);
    
    initializationSelectOption(addSolutionSelectDivItems);

    titleDiv.classList.add("select-div");
}

function setNewSolutionList(solutionList, productCode) {
    if(solutionList != null) {
        clearDomObject(solutionTbody);

        solutionList.forEach(solution => {
            solutionTbody.innerHTML += `
            <tr>
                <td>${solution.solutionCode}</td>
                <td>
                    <span class="product-solution-title-span">${solution.solutionTitle}</span>
                </td>
                <td>${solution.solutionType}</td>
                <td>${solution.solutionBoardType}</td>
                <td>
                    <input class="add-solution-check-box" type="checkbox">
                </td>
            </tr>
            `;
        });

    }else {
        solutionTbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <span>데이터가 없습니다.</span>
                </td>
            </tr>
        `;
    }

    setAddProductSolutionButtonClickEvnet(solutionList, productCode);
}

function setAddProductSolutionButtonClickEvnet(solutionList, productCode) {
    addProductSolutionButton.onclick = () => addProductSolutionRequest(solutionList, productCode);
}

function addProductSolutionRequest(solutionList, productCode) {
    let solutionCodeList = getSelectedSoltuionCodeList(solutionList);

    console.log(solutionCodeList);
    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/manager/solution/product/${productCode}`,
        contentType: "application/json",
        data: JSON.stringify({
            "solutionCodeList": solutionCodeList,
            "productCode": productCode
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("추가 성공");
                location.replace("/manager/solution/modification");
                saveLastRequestInLocalStorage("registrationSolutionBoardManage");
            }else {
                alert("추가 실패");
            }
        },
        error: errorMessage
    });
}

function getSelectedSoltuionCodeList(solutionList) {
    const addSolutionCheckBoxList = document.querySelectorAll(".add-solution-check-box");
    let solutionCodeList = new Array();

    addSolutionCheckBoxList.forEach((checkBox, index) => {
        if(checkBox.checked) {
            solutionCodeList.push(solutionList[index].solutionCode);
        }
    });

    return solutionCodeList;
}

function hideSolutionListDiv() {
    addVisibleClass(solutionListDiv);
    addVisibleClass(addSolutionBoardTable);
    addVisibleClass(addProductSolutionButton);
    initializationSelectOption(addSolutionSelectDivItems);
}

function hideElseManageView(type) {
    if(type == "solutionTypeManage") {
        addVisibleClass(solutionBoardManageDiv);
        addVisibleClass(registrationSolutionBoardManageDiv);
        addVisibleClass(productBox);
        addVisibleClass(solutionBoardTable);
        addVisibleClass(productSolutionListDiv);
        initializationSelectOption(addSolutionSelectDivItems);
        initializationSelectOption(solutionSelectDiv);
        hideSolutionListDiv();

    }else if(type == "solutionBoardManage") {
        addVisibleClass(solutionTypeManageDiv);
        addVisibleClass(registrationSolutionBoardManageDiv);
        addVisibleClass(productBox);
        addVisibleClass(solutionTypeInputDiv);
        addVisibleClass(productSolutionListDiv);
        initializationSelectOption(addSolutionSelectDivItems);
        hideSolutionListDiv();

    }else {
        addVisibleClass(solutionTypeManageDiv);
        addVisibleClass(solutionBoardManageDiv);
        addVisibleClass(solutionBoardTable);
        addVisibleClass(solutionTypeInputDiv);
        initializationSelectOption(solutionSelectDiv);

    }
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

function setCompany(companyCode) {
    company = companyCode == 1 ? "daewoo" : "winia";
}

function errorMessage(request, status, error) {
    alert("요청 에러");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
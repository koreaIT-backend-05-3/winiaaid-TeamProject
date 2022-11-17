let companyDiv = null;
let categorySpanItems = null;
let groupSpanItems = null;

const mainGroupDiv = document.querySelector(".main-group-div");
const mainProductDiv = document.querySelector(".main-product-div");

let productDetailDiv = document.querySelector(".product-detail-div");
const categorySelect = document.querySelector(".category-select");
const mainCategoryCheckDiv = document.querySelector(".main-category-check-div");
let productDetailNameInput = document.querySelector(".product-detail-name");

let productGroupModifyDiv = document.querySelector(".product-group-modify-div");
let productGroupModifyCheckBox = document.querySelector(".product-group-modify-input");

let mainCategorySelect = document.querySelector(".main-category-select");
let groupSelect = document.querySelector(".group-select");
let showImageDiv = document.querySelector(".show-image-div");

let productModifyButton = document.querySelector(".product-detail-modify-button");

let mainTroubleSymptomModifyDiv = document.querySelector(".main-trouble-symptom-modify-div");   
let mainTroubleSymptomAddDiv = document.querySelector(".main-trouble-symptom-add-div");
    

let registrationFlag = false;
let modifyFlag = false;
let mainCategoryFlag = false;
let productDetailUpdateFlag = false;
let productMap = null;

let registrationType = null;
let imageObject = null;
let deleteTempImageName = null;

let company = null;
let companyCode = 0;

let selectCategoryCode = 0;
let selectGroupCode = 0;
let keyCode = 0;
let originalProductName = null;

let historyInfo = {
    "companyName": null,
    "mainProductCategoryName": null,
    "productGroupName": null
}

let pastHistoryInfo = null;

setManageType();


if(registrationFlag) {
    getCompanyList();

    setFileInputChangeEvent();

}else if(modifyFlag) {
    setModifyView();

    mainCategorySelect = document.querySelector(".main-category-select");
    groupSelect = document.querySelector(".group-select");
    showImageDiv = document.querySelector(".show-image-div");
    productGroupModifyDiv = document.querySelector(".product-group-modify-div");
    productGroupModifyCheckBox = document.querySelector(".product-group-modify-input");
    productModifyButton = document.querySelector(".product-detail-modify-button");
    productDetailDiv = document.querySelector(".product-detail-div");
    mainTroubleSymptomModifyDiv = document.querySelector(".main-trouble-symptom-modify-div");   
    mainTroubleSymptomAddDiv = document.querySelector(".main-trouble-symptom-add-div");
    
    productMap = new Map();

    getCompanyList();
    setProductGroupModifyCheckBoxChangeEvent();
    setFileInputChangeEvent();
    setModifyRequestClickEvent();

}

pastHistoryInfo = getHistoryInfoInLocalStorage();

if(pastHistoryInfo != null) {
    loadHistoryInfo(pastHistoryInfo);

}


function setManageType() {
    let uri = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    uri == "modification" ? modifyFlag = true : registrationFlag = true;
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
    addVisibleClass(productDetailDiv);

    companyCode = companyObject.companyCode;
    historyInfo.companyName = companyObject.companyName;

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


    if(modifyFlag) {
        productMap.set("productMainCategoryInfo", productCategoryList);

    }

    
    removeMainCategoryListInfoInLocalStorage();

    saveMainCategoryListInfoInLocalStorage(productCategoryList);


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
                    ${modifyFlag ? "<span class='product-main-category-modify-span'> 수정</span>" : ""}
                </div>
                ${modifyFlag ? "<span class='fa-regular fa-trash-can product-main-category-delete-span'></span>" : ""}
            </li>
        `;

        if(modifyFlag) {
            productMap.set("productMainCategoryInfo" + product.productCategoryCode, product);

        }
    });

    if(registrationFlag) {
        mainCategoryUl.innerHTML += `
            <li class="main-category-li add-li">
                <div>
                    <span class="fa-solid fa-plus"></span>
                    <span class="main-category-add-span">추가</span>
                </div>
            </li>
        `;

        setMainCategoryAddSpanClickEvent();
    }else {
        setMainCategoryModifySpanClickEvent(productCategoryList);
        setMainCategoryDeleteSpanClickEvent(productCategoryList);

    }

    setProductCategoryListClickEvent(productCategoryList);

}

function setProductCategoryListClickEvent(productCategoryList) {
    categorySpanItems = document.querySelectorAll(".main-category-ul .product-detail-span");

    categorySpanItems.forEach((category, index) => {
        category.onclick = () => checkGroupFlag(productCategoryList[index]);
    })
}

function checkGroupFlag(category) {
    historyInfo.mainProductCategoryName = category.productCategoryName;
    addVisibleClass(productDetailDiv);

    if(modifyFlag) {
        visibleTroubleSymptomDiv();

    }
    
    if(category.groupFlag) {
        selectCategoryCode = 0;
        selectGroupCode = category.productGroupCode;
        
        let productGroupList = getProductGroupList(category.productGroupCode);
        setProductGroupList(productGroupList);
        clearDomObject(mainProductDiv);

    }else {
        selectGroupCode = 0;
        selectCategoryCode = category.productCategoryCode;

        getProductDetailList(category.productCategoryCode);
        clearDomObject(mainGroupDiv);

        if(registrationFlag) {
            showAddMainGroupDivView();

        }
        
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
                        ${modifyFlag ? "<span class='product-category-modify-span'> 수정</span>" : ""}
                    </div>
                    ${modifyFlag ? "<span class='fa-regular fa-trash-can product-category-delete-span'></span>" : ""}
                </li>
            `;
        });

    }else {
        setProductDetailList(null);

    }

    if(registrationFlag) {
        mainGroupUl.innerHTML += `
            <li class="main-group-li add-li">
                <div>
                    <span class="fa-solid fa-plus"></span>
                    <span class="category-add-span">추가</span>
                </div>
            </li>
        `;

        setCategoryAddSpanClickEvent();
    }else {
        setCategoryModifySpanClickEvent(productGroupList);
        setCategoryDeleteSpanClickEvent(productGroupList);
    }

    setProductGroupListClickEvent(productGroupList);


}

function setProductGroupListClickEvent(productGroupList) {
    groupSpanItems = document.querySelectorAll(".main-group-ul .product-detail-span");

    groupSpanItems.forEach((group, index) => {
        group.onclick = () => setProductDetailListByGroupCode(productGroupList[index]);
    })
}

function setProductDetailListByGroupCode(productGroup) {
    selectCategoryCode = productGroup.productCategoryCode;
    
    historyInfo.productGroupName = productGroup.productCategoryName;
    
    mainProductDiv.innerHTML = `
        <span class="sortation-span">제품</span>
        <ul class="main-product-ul product-ul"></ul>
    `;

    const mainPorductUl = document.querySelector(".main-product-ul");

    addVisibleClass(productDetailDiv);


    if(productGroup != null) {

        productGroup.productDetailList.forEach((product, index) => {
            if(productGroup.productCategoryName == product.productDetailName) {
                return;
            }
            mainPorductUl.innerHTML += `
                <li class="main-product-li">
                    <div>
                        <span class="fa-solid fa-cube"></span>
                        <span class="product-detail-span">${product.productDetailName}</span>
                        ${modifyFlag ? "<span class='product-detail-modify-span'> 수정</span>" : ""}
                    </div>
                    ${modifyFlag ? "<span class='fa-regular fa-trash-can product-detail-delete-span'></span>" : ""}
                </li>
            `;
        });

        if(modifyFlag) {
            console.log(productGroup);
            let productDetailList = productGroup.productDetailList.filter(productDetail => 
                productGroup.productCategoryName != productDetail.productDetailName);

            console.log(productDetailList);

            visibleTroubleSymptomDiv();
            setProductDetailModifySpanClickEvent(productDetailList);
            setProductDetailDeleteSpanClickEvent(productDetailList);
        }
    }
    
    if(registrationFlag) {
        mainPorductUl.innerHTML += `
            <li class="main-product-li add-li">
                <div>
                    <span class="fa-solid fa-plus"></span>
                    <span class="product-detail-add-span">추가</span>
                </div>
            </li>
        `;

        setProductDetailAddSpanClickEvent();
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
                        ${modifyFlag ? "<span class='product-detail-modify-span'> 수정</span>" : ""}
                    </div>
                    ${modifyFlag ? "<span class='fa-regular fa-trash-can product-detail-delete-span'></span>" : ""}
                </li>
            `;
        });

    }

    if(registrationFlag) {
        mainProductUl.innerHTML += `
            <li class="main-product-li add-li">
                <div>
                    <span class="fa-solid fa-plus"></span>
                    <span class="product-detail-add-span">추가</span>
                </div>
            </li>
        `;
    
        setProductDetailAddSpanClickEvent();
    }else {

        if(productDetailList != null) {
            setProductDetailModifySpanClickEvent(productDetailList[0].productDetailList);
            setProductDetailDeleteSpanClickEvent(productDetailList[0].productDetailList);
        }
    }

}

function setMainCategoryAddSpanClickEvent() {
    const mainCategoryAddSpan = document.querySelector(".main-category-add-span");

    mainCategoryAddSpan.onclick = () => showProductDetailAddView("category");
}

function setMainCategoryModifySpanClickEvent(mainCategoryList) {
    const productMainCategoryModifySpanItems = document.querySelectorAll(".product-main-category-modify-span");

    productMainCategoryModifySpanItems.forEach((modifySpan, index) => {
        modifySpan.onclick = () => setProductMainCategoryModifyView(mainCategoryList[index]);
    })
}

function setProductMainCategoryModifyView(mainCategory) {
    let troubleSymptomListOfProduct = null;
    let allTroubleSymptomList = null;

    console.log(mainCategory);

    addVisibleClass(productGroupModifyDiv);
    removeVisibleClass(productDetailDiv);
    setProductName(mainCategory.productCategoryName);
    setProductImage(mainCategory.productCategoryName, mainCategory.productMainCategoryImage, "mainCategory");
    isMainCategory();
    setKeyCode(mainCategory.productCategoryCode);
    buttonRemoveDisabled();

    if(!mainCategory.groupFlag) {
        troubleSymptomListOfProduct = getTroubleSymptomListByProductCategoryCode(mainCategory.productCategoryCode);
        setTroubleSymptomListOfProduct(troubleSymptomListOfProduct);
        allTroubleSymptomList = getAllTroubleSymptomList(mainCategory.productCategoryCode);
        setAllTroubleSymptomList(allTroubleSymptomList, mainCategory.productCategoryCode);

    }else {
        visibleTroubleSymptomDiv();

    }

    productDetailUpdateFlag = false;
    historyInfo.productGroupName = null;
}

function setCategoryAddSpanClickEvent() {
    const categoryAddSpan = document.querySelector(".category-add-span");
    categoryAddSpan.onclick = () => showProductDetailAddView("group");
}

function showProductDetailAddView(paramsRegistrationType) {

    registrationType = getRegistrationType(paramsRegistrationType);
    
    if(registrationType == "product-category") {
        historyInfo.productGroupName = null;
        setCategorySelectOptions(categorySelect);
        removeVisibleClass(categorySelect);
    }else {
        addVisibleClass(categorySelect);
        addVisibleClass(mainCategoryCheckDiv);

    }
    clearAllValue();
    removeVisibleClass(productDetailDiv);
    setProductAddButtonClickEvent();
}

function setCategoryModifySpanClickEvent(productGroupList) {
    const categoryModifySpanItems = document.querySelectorAll(".product-category-modify-span");

    categoryModifySpanItems.forEach((categoryModifySpan, index) => {
        categoryModifySpan.onclick = () => setProductCategoryModifyView(productGroupList[index]);

    })
}

function setProductCategoryModifyView(productGroup) {
    let troubleSymptomListOfProduct = null;
    let allTroubleSymptomList = null;

    console.log(productGroup);

    setProductName(productGroup.productCategoryName);
    setProductImage(productGroup.productCategoryName ,productGroup.productMainImage, "productDetail");
    setKeyCode(productGroup.productCategoryCode);
    
    removeVisibleClass(productGroupModifyDiv);
    removeVisibleClass(productDetailDiv);
    notMainCategory();
    productDetailUpdateFlag = false;
    
    clearDomObject(mainCategorySelect);
    clearDomObject(groupSelect);

    troubleSymptomListOfProduct = getTroubleSymptomListByProductCategoryCode(productGroup.productCategoryCode);
    setTroubleSymptomListOfProduct(troubleSymptomListOfProduct);
    allTroubleSymptomList = getAllTroubleSymptomList(productGroup.productCategoryCode);
    setAllTroubleSymptomList(allTroubleSymptomList, productGroup.productCategoryCode);

    groupSelect.setAttribute("disabled", true);
    buttonRemoveDisabled();

    productMap.get("productMainCategoryInfo").forEach(mainCategory => {
        if(mainCategory.groupFlag) {
            mainCategorySelect.innerHTML += `
                <option value="${mainCategory.productGroupCode}">${mainCategory.productCategoryName}</option>
            `;

        }
    });

}

function setProductDetailModifySpanClickEvent(productDetailList) {
    const productDetailModifySpanItems = document.querySelectorAll(".product-detail-modify-span");

    productDetailModifySpanItems.forEach((productDetailModifySpan, index) => {
        productDetailModifySpan.onclick = () => setProductDetailModifyView(productDetailList[index]);
    });
}

function setProductDetailModifyView(productDetail) {
    let productMainCategoryList = productMap.get("productMainCategoryInfo");

    console.log(productDetail);

    setProductName(productDetail.productDetailName);
    setProductImage(productDetail.productDetailName ,productDetail.productDetailImage, "productDetail");
    setKeyCode(productDetail.productCode);

    removeVisibleClass(productGroupModifyDiv);
    removeVisibleClass(productDetailDiv);
    
    visibleTroubleSymptomDiv();
    
    productDetailUpdateFlag = true;
    notMainCategory();
    
    clearDomObject(groupSelect);
    clearDomObject(mainCategorySelect);
    buttonRemoveDisabled();

    productMainCategoryList.forEach(mainCategory => {
        mainCategorySelect.innerHTML += `
            <option value="${mainCategory.productCategoryCode}">${mainCategory.productCategoryName}</option>
        `;

    });

    if(!productMainCategoryList[0].groupFlag) {
        setDisabled();
    }


    setMainCategorySelectChangeEvent(mainCategorySelect);
}


function setProductDetailAddSpanClickEvent() {
    const productDetailAddSpan = document.querySelector(".product-detail-add-span");

    productDetailAddSpan.onclick = () => showProductDetailAddView("detail");
}


function setCategorySelectOptions(categorySelect) {
    let mainCategoryInfo = loadMainCategoryListInfoInLocalStorage();

    categorySelect.innerHTML = `
        <option value="0">새로 생성</option>
    `;

    if(mainCategoryInfo != null) {

        mainCategoryInfo.forEach(mainCategory => {
            if(!mainCategory.groupFlag) {
                return;
            }
            categorySelect.innerHTML += `
                <option value="${mainCategory.productGroupCode}">${mainCategory.productCategoryName}</option>
            `;
        });
    }

    setCategorySelectChangeEvent();
    
}

function setCategorySelectChangeEvent() {
    categorySelect.onchange = checkValueAndShowNewCategoryCheckBox;
}

function checkValueAndShowNewCategoryCheckBox() {
    if(!selectValueIsNewCategory()) {
        addVisibleClass(mainCategoryCheckDiv);
    }else {
        removeVisibleClass(mainCategoryCheckDiv);
    }
}

function selectValueIsNewCategory() {
    return categorySelect.value == 0;
}

function setProductAddButtonClickEvent() {
    const productDetailAddButton = document.querySelector(".product-detail-add-button");
    productDetailAddButton.onclick = addProductDetail;
}

function addProductDetail() {
    let formData = null;

    formData = setFormData(formData);

    if(formData == null) {
        return;
    }

    $.ajax({
        async: false,
        type: "post",
        url : `/api/v1/manager/${registrationType}`,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("추가 성공");
                replace();
            }else {
                alert("추가 실패");
            }
        },
        error: errorMessage
    });
}

function setFileInputChangeEvent() {
    const productDetailImageInput = document.querySelector(".product-detail-image-input");

    productDetailImageInput.onchange = setImageObject;
}

function setImageObject() {
    const formData = new FormData(document.querySelector("form"));

    if(isChangeFileResult(formData)) {
        setImage(formData.get("file"));
    }
}

function isChangeFileResult(formData) {
    let changeFlag = false;

    formData.forEach( (value) => {
        if(value.size != 0) {
            changeFlag = true;
        }
    });

    return changeFlag;
}

function setImage(file) {
    const reader = new FileReader();

    imageObject = file;

    reader.onload = (e) => {
        showImageDiv.innerHTML = `
            <img src="${e.target.result}">
        `;
    }

    reader.readAsDataURL(file);
    
}

function setCompany(companyCode) {
    company = companyCode == 1 ? "daewoo" : "winia";
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function getHistoryInfoInLocalStorage() {
    let historyInfo = localStorage.managerProductHistoryInfo;

    if(historyInfo != null) {
        historyInfo = JSON.parse(historyInfo);
    }

    return historyInfo;
}

function loadHistoryInfo(historyInfo) {

    companyDiv.forEach(company => {
        if(company.textContent == historyInfo.companyName) {
            company.click();
            return false;
        }
    });

    categorySpanItems.forEach(category => {
        if(category.textContent == historyInfo.mainProductCategoryName) {
            category.click();
            return false;
        }
    });

    if(historyInfo.productGroupName != null) {
        groupSpanItems.forEach(group => {
            if(group.textContent == historyInfo.productGroupName) {
                group.click();
                return false;
            }
        });
    }

    localStorage.removeItem("managerProductHistoryInfo");
}

function showAddMainGroupDivView() {
    mainGroupDiv.innerHTML = `
        <span class="sortation-span">카테고리</span>
        <li class="main-group-li add-li">
            <div>
                <span class="fa-solid fa-plus"></span>
                <span class="category-add-span">추가</span>
            </div>
        </li>
    `;

    
    setCategoryAddSpanClickEvent();
}

function setFormData() {
    let formData = null;
    const productDetailName = productDetailNameInput.value;

    if(isEmpty(productDetailName)) {
        alert("제품 이름을 입력해 주세요.");
        return null;
    }else if((registrationFlag && isEmpty(imageObject)) || (modifyFlag && isEmpty(deleteTempImageName) && isEmpty(imageObject))) {
        alert("이미지를 추가해 주세요.");
        return null;
    }

    formData = new FormData();

    if(registrationFlag) {
        if(registrationType == "product-detail") {
            formData.append("productCategoryCode", selectCategoryCode);
            formData.append("productDetailName", productDetailName);
            formData.append("productImage", imageObject);
    
        }else if(registrationType == "product-group") {
    
            if(selectGroupCode == 0) {
                let message = "기존의 디테일 상품이 새로 만든 그룹으로 이동됩니다.";
    
                if(!confirm(message)) {
                    return null;
    
                }
            }
    
            formData.append("productCategoryCode", selectCategoryCode);
            formData.append("productCategoryName", productDetailName);
            formData.append("companyCode", companyCode);
            formData.append("productGroupCode", selectGroupCode);
            formData.append("mainGroupFlag", false);
            formData.append("productImage", imageObject);
            formData.append("newGroupFlag", true);
    
        }else {
            const mainCategoryCheckInput = document.querySelector(".main-category-check-input");
    
            formData.append("productCategoryName", productDetailName);
            formData.append("companyCode", companyCode);
            formData.append("productGroupCode", categorySelect.value);
            formData.append("mainGroupFlag", categorySelect.value == 0 && mainCategoryCheckInput.checked);
            formData.append("topCategoryFlag", mainCategoryCheckInput.checked);
            formData.append("productImage", imageObject);
    
        }
        
    }else {
        let keyCode = 0;

        keyCode = getProductKeyCodeByCategorySelect();

        if(productGroupModifyCheckBox.checked && keyCode == 0) {
            alert("이동시킬 그룹을 정확히 설정해 주세요.");
            return null;
        }

        formData.append("originalProductName", originalProductName);
        formData.append("productDetailName", productDetailName);
        formData.append("productGroupModifyFlag", productGroupModifyCheckBox.checked);

        if(imageObject != null) {
            formData.append("productImage", imageObject);

        }
        formData.append("mainCategoryFlag", mainCategoryFlag);

        formData.append("productKeyCode", keyCode);
        formData.append("productDetailUpdateFlag", productDetailUpdateFlag);
        formData.append("deleteTempImageName", deleteTempImageName);

        console.log(formData.get("productDetailUpdateFlag"));
    }
    

    return formData;
}

function getRegistrationType(registrationType) {
    return registrationType == "detail" ? "product-detail" : registrationType == "group" ? "product-group" : "product-category";
}

function replace() {
    let manageTypeUri = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    saveHistoryInfoInLocalStorage();
    location.replace(`/manager/product/${manageTypeUri}`);
}

function saveHistoryInfoInLocalStorage() {
    localStorage.managerProductHistoryInfo = JSON.stringify(historyInfo);
    historyInfo = {
        "companyName": null,
        "mainProductCategoryName": null,
        "productGroupName": null
    }
}

function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function saveMainCategoryListInfoInLocalStorage(mainCategoryList) {
    localStorage.mainCategoryList = JSON.stringify(mainCategoryList);
}

function removeMainCategoryListInfoInLocalStorage() {
    localStorage.removeItem("mainCategoryList");
}

function loadMainCategoryListInfoInLocalStorage() {
    let mainCAtegoryInfo = localStorage.mainCategoryList;

    if(mainCAtegoryInfo != null) {
        mainCAtegoryInfo = JSON.parse(mainCAtegoryInfo);
    }

    return mainCAtegoryInfo;
}

function clearAllValue() {
    productDetailNameInput.value = "";
    imageObject = null;
    clearDomObject(showImageDiv);
}

function setModifyView() {
    const mainProductDetailDiv = document.querySelector(".main-product-detail-div");

    mainProductDetailDiv.style.justifyContent = "space-between";

    mainProductDetailDiv.innerHTML = `
        <div class="product-detail-div detail-modify visible">
            <div class="custom-setting-div">
                <input class="product-detail-name" type="text" placeholder="제품 상세 이름">
                <div class="product-group-modify-div">
                    <input type="checkbox" id="product-group-modify" class="product-group-modify-input">
                    <label for="product-group-modify">카테고리 및 제품 그룹 변경</label>
                </div>
                <div class="modify-select-div visible">
                    <select class="main-category-select">

                    </select>
                    <select class="group-select">

                    </select>
                </div>
            </div>
            <form class="image-form">
                <label for="product-detail-image">이미지 선택</label>
                <input type="file" id="product-detail-image" class="product-detail-image-input visible" name="file">
                <div class="show-image-div">

                </div>
            </form>
            <button class="product-detail-modify-button" type="button">제품 수정</button>
        </div>
        <div class="main-trouble-symptom-modify-div visible">
            <div class="trouble-symptom-modify-div">

            </div>
        </div>
        <div class="main-trouble-symptom-add-div visible">
            <div class="trouble-symptom-add-div">
                <button class="trouble-symptom-add-request-button" type="button">추가</button>
            </div>
        </div>
    `;
}

function setProductGroupModifyCheckBoxChangeEvent() {
    productGroupModifyCheckBox.onchange = () => checkInputBoxAndShowSelectBox(productGroupModifyCheckBox.checked);
}

function checkInputBoxAndShowSelectBox(status) {
    const modifySelectDiv = document.querySelector(".modify-select-div");

    if(status) {
        removeVisibleClass(modifySelectDiv);
    }else {
        addVisibleClass(modifySelectDiv);
    }
}

function setProductName(productName) {
    productDetailNameInput = document.querySelector(".product-detail-name");

    productDetailNameInput.value = productName;
    originalProductName = productName;
}

function setProductImage(productName, productImage, type) {
    if(productImage != null) {
        showImageDiv.innerHTML = `
            <img src="${productImage}" alt="${productName}">
        `;

        // <img src="/static/winiaaid-images/winia-product/${type == "productDetail" ? "images/" : "category-images/"}${productImage}" alt="${productName}">
    }else {
        clearDomObject(showImageDiv);
    }
    
    setDeleteImageVariable(productImage);
}

function setDeleteImageVariable(tempImageName) {
    deleteTempImageName = tempImageName;

}

function setMainCategorySelectChangeEvent() {
    mainCategorySelect.onchange = () => setGroupSelectOptions(mainCategorySelect.value);
}

function setGroupSelectOptions(productCategoryCode) {
    let productMainCategory = productMap.get("productMainCategoryInfo" + productCategoryCode);

    if(productMainCategory.groupFlag) {
        groupSelect.removeAttribute("disabled");

        clearDomObject(groupSelect);

        let productGroupList = getProductGroupList(productMainCategory.productGroupCode);

        if(productGroupList != null) {
            buttonRemoveDisabled();
            productGroupList.forEach(productGroup => {
                groupSelect.innerHTML += `
                    <option value="${productGroup.productCategoryCode}">${productGroup.productCategoryName}</option>
                `;
            })

        }else {
            alert("해당 제품에는 카테고리가 존재하지 않습니다.");
            buttonDisabled();
        }
        

    }else {
        buttonRemoveDisabled();
        setDisabled();

    }
}

function setDisabled() {
    groupSelect.setAttribute("disabled", true);
    clearDomObject(groupSelect);
}

function buttonDisabled() {
    productModifyButton.setAttribute("disabled", true);
}

function buttonRemoveDisabled() {
    productModifyButton.removeAttribute("disabled");
}

function setModifyRequestClickEvent() {
    productModifyButton.onclick = productModifyRequest;
}

function getProductKeyCodeByCategorySelect() {
    return getProductGroupCodeByGroupSelect() == 0 ? getProductCategoryCodeByCategorySelect() : getProductGroupCodeByGroupSelect();
}

function getProductGroupCodeByGroupSelect() {
    return isEmpty(groupSelect.value) ? 0 : groupSelect.value;
}

function getProductCategoryCodeByCategorySelect() {
    return productGroupModifyCheckBox.checked ? mainCategorySelect.value : 0;
}

function productModifyRequest() {
    let formData = setFormData();

    if(formData == null) {
        return;
    }

    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/manager/product/${keyCode}`,
        data: formData,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        success: (response) => {
            if(response.data) {
                alert("제품을 수정했습니다.");
                replace();
            }else {
                alert("제품 수정 실패");
            }
        },
        error: errorMessage
    });
}

function isMainCategory() {
    mainCategoryFlag = true;
}

function notMainCategory() {
    mainCategoryFlag = false;
}

function setKeyCode(selectKeyCode) {
    keyCode = selectKeyCode;
}

function setMainCategoryDeleteSpanClickEvent(productMainCategoryList) {
    const productMainCategoryDeleteSpanItems = document.querySelectorAll(".product-main-category-delete-span");

    console.log(productMainCategoryList);
    productMainCategoryDeleteSpanItems.forEach((deleteSpan, index) => {
        deleteSpan.onclick = () => deleteProductInfo(productMainCategoryList[index], "mainCategory");
    })
}

function setCategoryDeleteSpanClickEvent(productCategoryList) {
    const productCategoryDeleteSpanItems = document.querySelectorAll(".product-category-delete-span");

    console.log(productCategoryList);
    productCategoryDeleteSpanItems.forEach((deleteSpan, index) => {
        deleteSpan.onclick = () => deleteProductInfo(productCategoryList[index], "group");
    })
}

function setProductDetailDeleteSpanClickEvent(productDetailList) {
    const productDetailDeleteSpanItems = document.querySelectorAll(".product-detail-delete-span");

    console.log(productDetailList);
    productDetailDeleteSpanItems.forEach((deleteSpan, index) => {
        deleteSpan.onclick = () => deleteProductInfo(productDetailList[index], "detail");
    })
}

function deleteProductInfo(product, deleteProductType) {
    let keyCode = 0;

    if(deleteProductType == "detail") {
        keyCode = product.productCode;

    }else {
        keyCode = product.productCategoryCode;
    }

    console.log(keyCode);

    let message = null;

    message = deleteProductType != "detail" ? "하위 카테고리도 함께 삭제 됩니다.\n그대로 진행 하시겠습니까?"
    : "삭제 후 복구할 수 없습니다.\n그대로 진행 하시겠습니까?";
    
    if(!confirm(message)) {
        return;
    }
    
    $.ajax({
        async: false,
        type: "delete",
        url: `/api/v1/manager/product/${deleteProductType}/${keyCode}`,
        contentType: "application/json",
        data: JSON.stringify({
            "productGroupCode": product.productGroupCode,
            "mainGroupFlag": product.groupFlag
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("삭제 성공");
                replace();
            }else {
                alert("삭제 실패");
            }
        },
        error: errorMessage
    })
}

function getTroubleSymptomListByProductCategoryCode(productCategoryCode) {
    return getTroubleSymptomList(productCategoryCode, "default");
}

function getTroubleSymptomList(productCategoryCode, loadType) {
    let troubleSymptomList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/trouble/category/${productCategoryCode}?loadType=${loadType}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                troubleSymptomList = response.data;
            }
        },
        error: errorMessage
    });

    return troubleSymptomList;
}

function setTroubleSymptomListOfProduct(troubleSymptomList) {
    const troubleSymptomModifyDiv = document.querySelector(".trouble-symptom-modify-div");
    
    removeVisibleClass(mainTroubleSymptomModifyDiv);

    troubleSymptomModifyDiv.innerHTML = `
        <span class="sortation-span">고장증상 삭제</span>
        <ul class="main-trouble-symptom-ul"></ul>
    `;

    if(troubleSymptomList != null) {
        const mainTroubleSymptomUl = document.querySelector(".main-trouble-symptom-ul");
    
        troubleSymptomList.forEach((trouble, index) => {
            mainTroubleSymptomUl.innerHTML += `
            <li class="main-trouble-symptom-li">
                <div>
                    <span class="fa-solid fa-hammer"></span>
                    <label class="trouble-symptom-label" for="trouble-sypmtom-${index}">${trouble.troubleSymptom}</label>
                </div>
                <input id="trouble-sypmtom-${index}" type="checkbox" class="trouble-symptom-delete-input"></span>
            </li>
        `;
        });
    
        troubleSymptomModifyDiv.innerHTML += `
            <button class="trouble-symptom-modify-request-button" type="button">수정</button>
        `;
    
        setTroubleSymptomModifyRequestButtonClickEvent(troubleSymptomList);

    }
}

function setTroubleSymptomModifyRequestButtonClickEvent(troubleSymptomList) {
    const troubleSymptomModifyRequestButton = document.querySelector(".trouble-symptom-modify-request-button");

    troubleSymptomModifyRequestButton.onclick = () => removeTroubleSymptomOfProduct(troubleSymptomList);
}

function removeTroubleSymptomOfProduct(troubleSymptomList) {
    const troubleSymptomDeleteInputItems = document.querySelectorAll(".trouble-symptom-delete-input");
    let troubleSymptomIdList = new Array();

    troubleSymptomDeleteInputItems.forEach((input, index) => {
        if(input.checked) {
            troubleSymptomIdList.push(troubleSymptomList[index].id);
        }
    });

    ajaxRemoveTroubleSymptomOfProduct(troubleSymptomIdList);
}

function ajaxRemoveTroubleSymptomOfProduct(troubleSymptomIdList) {
    $.ajax({
        async: false,
        type: "delete",
        url: `/api/v1/manager/product-category/trouble-symptom`,
        contentType: "application/json",
        data: JSON.stringify({
            "troubleSymptomIdList": troubleSymptomIdList
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("고장 증상을 수정했습니다.");
                replace();
            }else {
                alert("고장 증상 수정 오류");
            }
        },
        error: errorMessage
    });
}

function getAllTroubleSymptomList(productCategoryCode) {
    return getTroubleSymptomList(productCategoryCode, "minus");
}

function setAllTroubleSymptomList(troubleSymptomList, productCategoryCode) {
    const troubleSymptomAddDiv = document.querySelector(".trouble-symptom-add-div");
    
    removeVisibleClass(mainTroubleSymptomAddDiv);

    troubleSymptomAddDiv.innerHTML = `
        <span class="sortation-span">고장증상 추가</span>
        <ul class="main-trouble-symptom-add-ul main-trouble-symptom-ul"></ul>
    `;

    if(troubleSymptomList != null) {
        const mainTroubleSymptomAddUl = document.querySelector(".main-trouble-symptom-add-ul");
        
        troubleSymptomList.forEach((trouble, index) => {
            mainTroubleSymptomAddUl.innerHTML += `
            <li class="main-trouble-symptom-li">
                <div>
                    <span class="fa-solid fa-hammer"></span>
                    <label class="trouble-symptom-label" for="delete-trouble-sypmtom-${index}">${trouble.troubleSymptom}</label>
                </div>
                <input id="delete-trouble-sypmtom-${index}" type="checkbox" class="trouble-symptom-add-input"></span>
            </li>
        `;
        });
    
        troubleSymptomAddDiv.innerHTML += `
            <button class="trouble-symptom-add-request-button" type="button">추가</button>
        `;
    
        setTroubleSymptomAddRequestButtonClickEvent(troubleSymptomList, productCategoryCode);

    }
}

function setTroubleSymptomAddRequestButtonClickEvent(troubleSymptomList, productCategoryCode) {
    const troubleSymptomAddRequestButton = document.querySelector(".trouble-symptom-add-request-button");

    troubleSymptomAddRequestButton.onclick = () => addTroubleSymptomOfProduct(troubleSymptomList, productCategoryCode);
}

function addTroubleSymptomOfProduct(troubleSymptomList, productCategoryCode) {
    const troubleSymptomAddInputItems = document.querySelectorAll(".trouble-symptom-add-input");
    let troubleSymptomCodeList = new Array();

    troubleSymptomAddInputItems.forEach((input, index) => {
        if(input.checked) {
            troubleSymptomCodeList.push(troubleSymptomList[index].troubleCode);
        }
    });

    ajaxAddTroubleSymptomOfProduct(troubleSymptomCodeList, productCategoryCode);
}

function ajaxAddTroubleSymptomOfProduct(troubleSymptomCodeList, productCategoryCode) {
    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/manager/product-category/trouble-symptom`,
        contentType: "application/json",
        data: JSON.stringify({
            "productCategoryCode": productCategoryCode,
            "troubleSymptomCodeList": troubleSymptomCodeList
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("고장 증상을 추가했습니다.");
                replace();
            }else {
                alert("고장 증상 추가 오류");
            }
        },
        error: errorMessage
    });
}

function visibleTroubleSymptomDiv() {
    addVisibleClass(mainTroubleSymptomModifyDiv);
    addVisibleClass(mainTroubleSymptomAddDiv);
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
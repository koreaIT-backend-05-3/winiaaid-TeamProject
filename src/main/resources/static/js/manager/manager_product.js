let companyDiv = null;
let categorySpanItems = null;
let groupSpanItems = null;

const mainGroupDiv = document.querySelector(".main-group-div");
const mainProductDiv = document.querySelector(".main-product-div");

const productDetailNameInput = document.querySelector(".product-detail-name");
const showImageDiv = document.querySelector(".show-image-div");

let registrationFlag = true;
let registrationType = null;
let imageObject = null;

let company = null;
let companyCode = 0;

let selectGroupCode = 0;
let selectCategoryCode = 0;

let historyInfo = {
    "companyName": null,
    "mainProductCategoryName": null,
    "productGroupName": null
}

let pastHistoryInfo = null;


if(registrationFlag) {
    getCompanyList();

    setFileInputChangeEvent();
    
    pastHistoryInfo = getHistoryInfoInLocalStorage();

    if(pastHistoryInfo != null) {
        loadHistoryInfo(pastHistoryInfo);

    }

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

    mainCategoryDiv.innerHTML = `<span class="sortation-span">메인 카테고리</span>`;
   
    productCategoryList.forEach(product => {
        mainCategoryDiv.innerHTML += `
            <ul class="main-category-ul product-ul">
                <li class="main-category-li">
                    <span class="product-detail-span fa-solid fa-cube"> ${product.productCategoryName}</span>
                </li>
            </ul>
        `;

    });

    mainCategoryDiv.innerHTML += `
        <li class="main-category-li add-li">
            <span class="main-category-add-span fa-solid fa-plus"> 추가</span>
        </li>
    `;

    setProductCategoryListClickEvent(productCategoryList);
    setMainCategoryAddSpanClickEvent();

}

function setProductCategoryListClickEvent(productCategoryList) {
    categorySpanItems = document.querySelectorAll(".main-category-ul .product-detail-span");

    categorySpanItems.forEach((category, index) => {
        category.onclick = () => checkGroupFlag(productCategoryList[index]);
    })
}

function checkGroupFlag(category) {
    historyInfo.mainProductCategoryName = category.productCategoryName;
    
    if(category.groupFlag) {
        selectCategoryCode = 0;
        selectGroupCode = category.productGroupCode;
        
        getProductGroupList(category.productGroupCode);
        clearDomObject(mainProductDiv);

    }else {
        selectGroupCode = 0;
        selectCategoryCode = category.productCategoryCode;

        getProductDetailList(category.productCategoryCode);
        showAddMainGroupDivView();
        
    }
}

function getProductGroupList(groupCode) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/${company}/group/${groupCode}`,
        dataType: "json",
        success: (response) => {
            setProductGroupList(response.data);
        },
        error: errorMessage
    });
}

function setProductGroupList(productGroupList) {

    mainGroupDiv.innerHTML = `<span class="sortation-span">카테고리</span>`;

    productGroupList.forEach((product, index) => {
        mainGroupDiv.innerHTML += `
            <ul class="main-group-ul product-ul">
                <li class="main-group-li">
                    <span class="product-detail-span fa-solid fa-cube"> ${product.productCategoryName}</span>
                </li>
            </ul>
        `;

    });

    mainGroupDiv.innerHTML += `
        <li class="main-group-li add-li">
            <span class="category-add-span fa-solid fa-plus"> 추가</span>
        </li>
    `;

    setProductGroupListClickEvent(productGroupList);

    setCategoryAddSpanClickEvent();

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
    
    mainProductDiv.innerHTML = `<span class="sortation-span">제품</span>`;

    productGroup.productDetailList.forEach((product, index) => {
        if(productGroup.productCategoryName == product.productDetailName) {
            return;
        }
        mainProductDiv.innerHTML += `
            <ul class="main-product-ul product-ul">
                <li class="main-product-li">
                    <span class="product-detail-span fa-solid fa-cube"> ${product.productDetailName}</span>
                </li>
            </ul>
        `;
    });

    mainProductDiv.innerHTML += `
        <li class="main-product-li add-li">
            <span class="product-detail-add-span fa-solid fa-plus"> 추가</span>
        </li>
    `;

    setProductDetailAddSpanClickEvent();
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

    mainProductDiv.innerHTML = `<span class="sortation-span">제품</span>`;
    
    productDetailList[0].productDetailList.forEach((product, index) => {
        mainProductDiv.innerHTML += `
            <ul class="main-product-ul product-ul">
                <li class="main-product-li">
                    <span class="product-detail-span fa-solid fa-cube"> ${product.productDetailName}</span>
                </li>
            </ul>
        `;
    });

    mainProductDiv.innerHTML += `
        <li class="main-product-li add-li">
            <span class="product-detail-add-span fa-solid fa-plus"> 추가</span>
        </li>
    `;

    setProductDetailAddSpanClickEvent();

}

function setMainCategoryAddSpanClickEvent() {
    const mainCategoryAddSpan = document.querySelector(".main-category-add-span");

    mainCategoryAddSpan.onclick = () => showProductDetailAddView("category");
}

function setCategoryAddSpanClickEvent() {
    const categoryAddSpan = document.querySelector(".category-add-span");
    categoryAddSpan.onclick = () => showProductDetailAddView("group");
}

function setProductDetailAddSpanClickEvent() {
    const productDetailAddSpan = document.querySelector(".product-detail-add-span");

    productDetailAddSpan.onclick = () => showProductDetailAddView("detail");
}

function showProductDetailAddView(paramsRegistrationType) {
    const productDetailAddDiv = document.querySelector(".product-detail-add-div");

    registrationType = getRegistrationType(paramsRegistrationType);

    clearAllValue();
    removeVisibleClass(productDetailAddDiv);
    setProductAddButtonClickEvent();
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

    reader.readAsDataURL(file)
    
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
        console.log(category.textContent.replaceAll(" ", ""));
        console.log(historyInfo.mainProductCategoryName);
        if(category.textContent.replaceAll(" ", "") == historyInfo.mainProductCategoryName) {
            category.click();
            return false;
        }
    });

    if(historyInfo.productGroupName != null) {
        groupSpanItems.forEach(group => {
            if(group.textContent.replaceAll(" ", "") == historyInfo.productGroupName) {
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
            <span class="category-add-span fa-solid fa-plus"> 추가</span>
        </li>
    `;

    
    setCategoryAddSpanClickEvent();
}

function setFormData() {
    let formData = null;
    const productDetailName = productDetailNameInput.value;

    if(isEmpty(productDetailName)) {
        alert("제품 이름을 입력해주세요.");
        return null;
    }

    formData = new FormData();

    if(registrationType == "product-detail") {
        formData.append("productCategoryCode", selectCategoryCode);
        formData.append("productDetailName", productDetailName);
        formData.append("productImage", imageObject);

    }else if(registrationType == "product-group") {

        if(selectGroupCode != 0) {
            formData.append("productCategoryName", productDetailName);
            formData.append("companyCode", companyCode);
            formData.append("productGroupCode", selectGroupCode);
            formData.append("mainGroupFlag", false);
            formData.append("productImage", imageObject);

        }else {
            if(confirm("기존의 디테일 상품이 새로 만든 그룹으로 이동됩니다.")) {
                formData.append("productCategoryName", productDetailName);
                formData.append("companyCode", companyCode);
                formData.append("productGroupCode", selectGroupCode);
                formData.append("mainGroupFlag", false);
                formData.append("productImage", imageObject);
                
            }else {
                return null;
            }

        }

    }else {


    }

    return formData;
}

function getRegistrationType(registrationType) {
    return registrationType == "detail" ? "product-detail" : registrationType == "group" ? "product-group" : "product-category";
}

function replace() {
    saveHistoryInfoInLocalStorage();
    location.replace("/manager/product/registration");
}

function saveHistoryInfoInLocalStorage() {
    localStorage.managerProductHistoryInfo = JSON.stringify(historyInfo);
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

function clearAllValue() {
    productDetailNameInput.value = "";
    imageObject = null;
    clearDomObject(showImageDiv);
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
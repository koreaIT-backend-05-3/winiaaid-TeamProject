const mainGroupDiv = document.querySelector(".main-group-div");
const mainProductDiv = document.querySelector(".main-product-div");

getCompanyList();


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
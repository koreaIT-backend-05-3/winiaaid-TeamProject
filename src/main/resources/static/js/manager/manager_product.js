let registrationFlag = true;
let imageObject = null;

let company = null;

if(registrationFlag) {
    getCompanyList();

    setFileInputChangeEvent();
    
    setProductAddButtonClickEvent();

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
    const companyDiv = document.querySelectorAll(".company-div");

    companyDiv.forEach((company, index) => {
        company.onclick = () => getProductMainCategoryList(companyList[index].companyCode);
    });
}

function getProductMainCategoryList(companyCode) {

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

function setCompany(companyCode) {
    company = companyCode == 1 ? "daewoo" : "winia";
}

function setProductMainCategoryList(productCategoryList) {
    const mainCategoryDiv = document.querySelector(".main-category-div");

    mainCategoryDiv.innerHTML = `<span class="sortation-span">메인 카테고리</span>`;
    
    if(productCategoryList != null) {

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
            <li class="main-group-li">
                <span class="product-detail-add-span fa-solid fa-plus"> 추가</span>
            </li>
        `;

        setProductCategoryListClickEvent(productCategoryList);

    }else {
        setNotData(mainCategoryDiv);

    }
}

function setProductCategoryListClickEvent(productCategoryList) {
    const categorySpanItems = document.querySelectorAll(".main-category-ul .product-detail-span");

    categorySpanItems.forEach((category, index) => {
        category.onclick = () => checkGroupFlag(productCategoryList[index]);
    })
}

function checkGroupFlag(category) {
    if(category.groupFlag) {
        getProductGroupList(category.productGroupCode);

    }else {
        getProductDetailList(category.productCategoryCode);

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

function setProductGroupList(productGroupList) {
    console.log(productGroupList);
    const mainGroupDiv = document.querySelector(".main-group-div");

    mainGroupDiv.innerHTML = `<span class="sortation-span">카테고리</span>`;

    if(productGroupList != null) {
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
            <li class="main-group-li">
                <span class="product-detail-add-span fa-solid fa-plus"> 추가</span>
            </li>
        `;

    }else {
        setNotData(mainGroupDiv);

    }


}

function setProductDetailList() {

}

function setNotData(div) {
    div.innerHTML = `

    `;
}

function setMainCategoryAddSpanClickEvent() {
    const mainCategoryAddSpan = document.querySelector(".main-category-add-span");

}

function setCategoryAddSpanClickEvent() {
    const categoryAddSpan = document.querySelector(".category-add-span");

}

function setDetailProductAddSpanClickEvent() {
    const productDetailAddSpan = document.querySelector(".product-detail-add-span");

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
    const showImageDiv = document.querySelector(".show-image-div");
    const reader = new FileReader();

    imageObject = file;

    reader.onload = (e) => {
        showImageDiv.innerHTML = `
            <img src="${e.target.result}">
        `;
    }

    reader.readAsDataURL(file)
    
}

function setProductAddButtonClickEvent() {
    const productDetailAddButton = document.querySelector(".product-detail-add-button");

    productDetailAddButton.onclick = addProductDetail;
}

function addProductDetail() {
    const productDetailName = document.querySelector(".product-detail-name").value;

    if(isEmpty(productDetailName)) {
        alert("제품 이름을 입력해주세요.");
        return;
    }

    $.ajax({
        async: false,
        type: "post",
        url : `/api/v1/manager/product-detail`,
        data: JSON.stringify({
            "productCategoryCode": productCategoryCode,
            "productName": productDetailName,
            "productImage": imageObject
        }),
        success: (response) => {
            if(response.data) {
                alert("추가 성공");
            }else {
                alert("추가 실패");
            }
        },
        error: errorMessage
    });
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
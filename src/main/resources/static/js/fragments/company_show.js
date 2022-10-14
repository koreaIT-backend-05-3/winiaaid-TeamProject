const productArea = document.querySelector(".product-area");
const productResult = document.querySelector(".product-result");
const explainationP = document.querySelector(".explaination-p");

const winia = document.querySelector(".li-winia");
const daewoo = document.querySelector(".li-daewoo");

let company = null;

winia.onclick = checkWiniaProduct;
daewoo.onclick = checkDaewooProduct;

function checkWiniaProduct() {
    if(checkFaQPageAndSelfPage()) {
        company = "winia";
        showCompanyProduct();
        
        addVisibleClass(productArea);
        addVisibleClass(explainationP);
        removeVisibleClass(productResult);
        
        getAllProductSolutionByCompany(1);

        productResult.innerHTML = `<span>위니아 제품</span>`;

        selectProductCategoryCode = 0;
        selectProductCode = 0;
        selectProductGroupCode = 0;

    }else if(historyDataFlag) {
        historyDataFlag = false;
        company = "winia";
        showCompanyProduct();

    }else if(company != null) {
        if(confirm("다시 처음으로 돌아갑니다.\n괜찮으시겠습니까?")) {
            location.replace("/service/visit/request");
        }

    }else {
        company = "winia";
    
        alert("위니아 제품이 맞습니까?\n아닐경우 방문이 되지 않습니다.\n제조사를 다시 한번 확인해 주세요.");
    
        showCompanyProduct();
    }
}

function checkDaewooProduct() {
    if(checkFaQPageAndSelfPage()) {
        company = "daewoo";
        showCompanyProduct();
        
        addVisibleClass(productArea);
        addVisibleClass(explainationP);
        removeVisibleClass(productResult);

        getAllProductSolutionByCompany(1);
        
        productResult.innerHTML = `<span>대우전자 제품</span>`;

        selectProductCategoryCode = 0;
        selectProductCode = 0;
        selectProductGroupCode = 0;

    }else if(historyDataFlag) {
        historyDataFlag = false;
        company = "daewoo";
        showCompanyProduct();

    }else if(company != null) {
        if(confirm("다시 처음으로 돌아갑니다.\n괜찮으시겠습니까?")) {
            location.replace("/service/visit/request");
        }

    }else {
        company = "daewoo";
    
        alert("위니아전자(구 대우전자) 제품이 맞습니까?\n아닐경우 방문이 되지 않습니다.\n제조사를 다시 한번 확인해 주세요.");
    
        showCompanyProduct();
    }
}

function checkFaQPageAndSelfPage() {
    return location.pathname.indexOf("faq") != -1 || location.pathname.indexOf("self") != -1;
}

function showCompanyProduct() {
    const serviceRequestDiv = document.querySelector(".service-request-div");

    let categoryInfoList = getMainCategoryList(company);
    showMainCategory(categoryInfoList);

    if(!checkFaQPageAndSelfPage()) {
        removeVisibleClass(serviceRequestDiv);
        activationStepTitle(stepTitleItems[0], stepTitleDivItems[0]);
    }
}

function getMainCategoryList(company) {
    let categoryInfoList = null;
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/${company}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                categoryInfoList = response.data;
            }
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        } 
    });

    return categoryInfoList;
}

function showMainCategory(categoryInfoList) {
    // const categoryImageUl = document.querySelector(".category-image-ul");

    // clearDomObject(categoryImageUl);

    setProductImages(null, categoryInfoList, "mainCategory", false);

}

function clearDomObject(object) {
    object.innerHTML = "";
}

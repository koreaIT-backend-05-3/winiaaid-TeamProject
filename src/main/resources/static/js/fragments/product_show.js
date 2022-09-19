const swiperWrapper = document.querySelector(".swiper-wrapper");

let productNameLi = document.querySelector(".product-name-li");

let modifyFlag = false;

let productInfoObject = {
    "productCategoryCode": 0,
    "productCode": 0,
    "modelCode": 0,
    "troubleCode": 0,
    "description": null,
    "sameProductFlag": false
};

function setProductImages(domObject, productInfoList, type, isGroup) {
    if(type == "mainCategory") {
        productInfoList.forEach(categoryInfo => {
            domObject.innerHTML += `
            <li class="category-image-li">
                <div>
                    <img src="/image/winia-product/category-images/${categoryInfo.productMainCategoryImage}" alt="${categoryInfo.productCategoryName}">
                </div>
            </li>
            `;
            
        });
        setCategoryClickEvent(productInfoList);

    }else if(type == "detailProduct" && !isGroup) {
        setProductDetail(domObject, productInfoList);
        
    }else if(type == "detailProduct" && isGroup) {
        setGroupProductDetail(domObject, productInfoList);
        
    }
}

function setCategoryClickEvent(productInfoList) {
    let categoryImages = document.querySelectorAll(".category-image-li img");

    for(let i = 0; i < productInfoList.length; i++){
        if(productInfoList[i].groupFlag) {
            categoryImages[i].onclick = () => {
                getProductDetail(productInfoList[i].productGroup, true);
                setModelName(productNameLi, {"productTitle": productInfoList[i].productCategoryName}, "category");
                
                if(!checkFaQPageAndSelfPage()) {
                    initializationTroubleSymptom();

                }else {
                    selectProductCategoryCode = productInfoList[i].productCategoryCode;
                    getSolutionListByProductCategoryCode();
                }
            }
        }else {
            categoryImages[i].onclick = () => {
                getProductDetail(productInfoList[i].productCategoryCode, false);
                setModelName(productNameLi, {"productTitle": productInfoList[i].productCategoryName}, "category");
                
                if(!checkFaQPageAndSelfPage()) {
                    initializationTroubleSymptom();

                }else {
                    selectProductCategoryCode = productInfoList[i].productCategoryCode;
                    getSolutionListByProductCategoryCode();
                }
            }
        }
    }
}

function getProductDetail(code, isGroup) {
    let type = isGroup ? "group" : "default";
    let url = checkFaQPageAndSelfPage() ? `/api/v2/product/list/category/${company}/${type}/${code}` : `/api/v1/product/list/category/${company}/${type}/${code}`;

    $.ajax({
        async: false,
        type: "get",
        url: url,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                showProductList(response.data, isGroup);
            }else {
                showHaveNotProductMark();
            }
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        } 
    });

}

function showProductList(productInfoList, isGroup) {
    clearDomObject(swiperWrapper);

    setProductImages(swiperWrapper, productInfoList, "detailProduct", isGroup);
}


function showHaveNotProductMark() {
    let innerHTML = "";
    
    clearDomObject(swiperWrapper);

    innerHTML += `<div class="swiper-slide">`;
    innerHTML += `<ul class="detail-product-ul">`;

    innerHTML += `<li>
                    <i class="fa-solid fa-ban"></i>
                    <span>등록된 제품이 없습니다.</span>
                </li>
                `;
        
    innerHTML += `</ul></div>`;
    swiperWrapper.innerHTML += innerHTML;

    makeSwiper();
    checkSlideAmount();
}

function setProductDetail(domObject, productInfoList) {
    let totalPage = 0;
    let size = 0;
    console.log(productInfoList);
    if(checkFaQPageAndSelfPage()) {
        totalPage = productInfoList[0].productDetailList.length % 6 == 0 ? productInfoList[0].productDetailList.length : Math.floor(productInfoList[0].productDetailList.length / 6) + 1;
        size = productInfoList[0].productDetailList.length;
    }else {
        totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;
        size = productInfoList.length;
    }
    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 6 * i;
        let endIndex = i == totalPage - 1 ? size : startIndex + 6;

        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="detail-product-ul">`;

        for(startIndex; startIndex < endIndex; startIndex++) {
            innerHTML += `<li>
                            <img class="product-detail-image" src="/image/winia-product/detail-images/${checkFaQPageAndSelfPage() ? productInfoList[0].productDetailList[startIndex].productDetailImage : productInfoList[startIndex].productDetailImage}" alt="${checkFaQPageAndSelfPage() ? productInfoList[0].productDetailList[startIndex].productDetailName : productInfoList[startIndex].productName}">
                            <span>${checkFaQPageAndSelfPage() ? productInfoList[0].productDetailList[startIndex].productDetailName : productInfoList[startIndex].productName}</span>
                        </li>
                        `;
        }
        
        innerHTML += `</ul></div>`;
        domObject.innerHTML += innerHTML;
    }
    
    makeSwiper();
    checkSlideAmount();
    setImageClickEvent(document.querySelectorAll(".detail-product-ul img"), checkFaQPageAndSelfPage() ? productInfoList[0].productDetailList : productInfoList);
   
}

function checkIntegratedProduct(productList) {
    if(checkFaQPageAndSelfPage()) {
        return productList.productDetailList.length == 1 && productList.productDetailList[0].productDetailName == productList.productCategoryName;

    }else {
        return productList.readProductDetailResponseDtoList.length == 1
        && productList.readProductDetailResponseDtoList[0].productCategoryName == productList.readProductDetailResponseDtoList[0].productName;
    }
}

function makeSwiper() {
    const swiper = new Swiper(".swiper-container", {
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev'
        }
    });
}

function checkSlideAmount() {
    const swiperSlides = document.querySelectorAll(".swiper-slide");
    const swiperMoveDivs = document.querySelectorAll(".slide-div");
    if(swiperSlides.length > 1) {
        removeVisibles(swiperMoveDivs);
    }else {
        addVisibles(swiperMoveDivs);
    }
}

function setImageClickEvent(domObject, productInfoList) {
    for(let i = 0; i < domObject.length; i++) {
        domObject[i].onclick = () => {
            let productDetailName = domObject[i].getAttribute("alt");
            
            productInfoObject.productCategoryCode = productInfoList[i].productCategoryCode;
            productInfoObject.productCode = productInfoList[i].productCode;

            if(checkFaQPageAndSelfPage()) {
                productNameLi = document.querySelector(".product-name-result");
            }

            setModelName(productNameLi, {"productName": productDetailName, "keyCode": checkFaQPageAndSelfPage() ? productInfoList[i].productCode : productInfoList[0].productCategoryCode}, "default");
        }
    }
}

function setModelName(domObject, productInfoObject, type) {
    if(checkFaQPageAndSelfPage()) {
        const selectExplaination = document.querySelector(".select-explaination");
        domObject = document.querySelector(".product-result");

        addVisibleClass(selectExplaination);
        removeVisibleClass(domObject);
    }

    if(type == "buttonClick") {
        domObject.innerHTML = productInfoObject.productName;
        productInfoObject.modelCode = 0;
    }else if(type == "default"){

        if(haschild(domObject)) {
            removeSomeChild(domObject);
        }

        createProductNameSpan(domObject, productInfoObject, true);

    }else if(type == "group") {
        removeAllChild(domObject);
        
        createProductTitleSpan(domObject, productInfoObject);

        createProductNameSpan(domObject, productInfoObject, true);

    }else if(type == "integrated") {
        removeAllChild(domObject);

        if(!checkFaQPageAndSelfPage()) {
            initializationTroubleSymptom();

        }

        if(productInfoObject.productName != null) {
            createProductNameSpan(domObject, productInfoObject, false);
        }

    }else if(type == "category") {
        removeAllChild(domObject);

        createProductTitleSpan(domObject, productInfoObject);
        
    }
}

function haschild(domObject) {
    return domObject.hasChildNodes();
}

function removeSomeChild(domObject) {
    if(domObject.lastChild.classList.contains("model-name-span")) {
        domObject.removeChild(domObject.lastChild);
    }
}

function removeAllChild(domObject) {
    while(haschild(domObject)) {
        domObject.removeChild(domObject.lastChild);
    }

}

function createProductTitleSpan(domObject, productInfoObject) {
    let newSpan = document.createElement("span");
    let newText = null;
    newSpan.setAttribute("class", "model-title-span");
    if(checkFaQPageAndSelfPage()) {
        newText = document.createTextNode(productInfoObject.productTitle);
        selectProductCategoryCode = productInfoObject.productCategoryCode;

        if(productInfoObject.isCategory) {
            getSolutionListByProductCategoryCode(productInfoObject.productCategoryCode);
        }
    }else {
        newText = document.createTextNode(productInfoObject.productTitle);
    }

    newSpan.appendChild(newText);
    domObject.appendChild(newSpan);
}

function createProductNameSpan(domObject, productInfoObject, categoryIncludeFlag) {
    if(categoryIncludeFlag) {
        newSpan = document.createElement("span");
        newSpan.setAttribute("class", "model-name-span category-include-model");
        newText = document.createTextNode(productInfoObject.productName);

        newSpan.appendChild(newText);
        domObject.appendChild(newSpan);

    }else {
        let newSpan = document.createElement("span");
        newSpan.setAttribute("class", "model-name-span");
        let newText = document.createTextNode(productInfoObject.productName);
    
        newSpan.appendChild(newText);
        domObject.appendChild(newSpan);
    }
    
    if(checkFaQPageAndSelfPage()) {
        selectProductCode = productInfoObject.keyCode;
        getSolutionListByProductCode();

    }else {
        getProductTroubleSymptom(productInfoObject.keyCode);
        addVisibleClass(modelSearchTr);
        addVisibleClass(modelDetailSpan);
    }
}

function setGroupProductDetail(domObject, productInfoList) {
    let totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;
    let productFirstInfo = {};
    let productAllInfo = [];

    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 6 * i;
        let endIndex = i == totalPage - 1 ? productInfoList.length : startIndex + 6;

        let swiperDiv = document.createElement("div");
        swiperDiv.setAttribute("class", "swiper-slide");

        let detailProductUl = document.createElement("ul");
        detailProductUl.setAttribute("class", "detail-product-ul");
        swiperDiv.appendChild(detailProductUl);
        
        for(startIndex; startIndex < endIndex; startIndex++) {
            let integratedFlag = checkIntegratedProduct(productInfoList[startIndex]);

            if(!checkFaQPageAndSelfPage()) {
                productFirstInfo = getProductFirstInfo(productInfoList[startIndex]);
                productAllInfo = getProdutListInfo(productInfoList[startIndex]);
            }
            
            let productCategoryLi = document.createElement("li");
            productCategoryLi.setAttribute("class", `product-category-${startIndex}`);

            let productImage = document.createElement("img");
            productImage.setAttribute("class", integratedFlag ? "integrated product-detail-image" : "");
            productImage.setAttribute("src", `/image/winia-product/main-images/${checkFaQPageAndSelfPage() ? productInfoList[startIndex].productMainImage : productFirstInfo.productMainImage}`);
            productImage.setAttribute("alt", checkFaQPageAndSelfPage() ? productInfoList[startIndex].productDetailName : productFirstInfo.productName);

            let productCategoryNameP = document.createElement("p");
            productCategoryNameP.setAttribute("class", `category-title-${checkFaQPageAndSelfPage() ? productInfoList[startIndex].productCategoryCode : productFirstInfo.productCategoryCode} detail-product-name`);
            productCategoryNameP.appendChild(document.createTextNode(checkFaQPageAndSelfPage() ? productInfoList[startIndex].productCategoryName : productFirstInfo.productCategoryName));


            productCategoryLi.appendChild(productImage);
            productCategoryLi.appendChild(productCategoryNameP);


            if(integratedFlag) {
                detailProductUl.appendChild(productCategoryLi);
                swiperDiv.appendChild(detailProductUl);
                domObject.appendChild(swiperDiv);
                const groupImage = document.querySelector(`.product-category-${startIndex} img`);
                setGroupImageClickEvent(groupImage, checkFaQPageAndSelfPage() ? productInfoList[startIndex] : productAllInfo[0]);
                continue;
            }

            let productNameUl = document.createElement("ul");
            productNameUl.setAttribute("class", "product-name-ul");

            let size = checkFaQPageAndSelfPage() ? productInfoList[startIndex].productDetailList.length : productAllInfo.length;

            for(let j = 0; j < size; j++) {
                let newLi = document.createElement("li");
                let newSpan = document.createElement("span");
                newSpan.setAttribute("class", `product-category-${checkFaQPageAndSelfPage() ? productInfoList[startIndex].productCategoryCode : productAllInfo[j].productCategoryCode} detail-product-name`);
                newSpan.appendChild(document.createTextNode(checkFaQPageAndSelfPage() ? productInfoList[startIndex].productDetailList[j].productDetailName : productAllInfo[j].productName));
                newLi.appendChild(newSpan);

                productNameUl.appendChild(newLi);

            }

            productCategoryLi.appendChild(productNameUl);
            detailProductUl.appendChild(productCategoryLi);
            swiperDiv.appendChild(detailProductUl);
            domObject.appendChild(swiperDiv);
            
            const productSpans = document.querySelectorAll(`.product-category-${startIndex} span`);
            console.log(productAllInfo);
            setProductClickEvent(productSpans, checkFaQPageAndSelfPage() ? productInfoList[startIndex] : productAllInfo);
            const groupImage = document.querySelector(`.product-category-${startIndex} img`);
            setGroupImageClickEvent(groupImage, checkFaQPageAndSelfPage() ? productInfoList[startIndex] : productAllInfo[0]);
        }

    }

    makeSwiper();
    checkSlideAmount();
}

function setGroupImageClickEvent(domObject, productInfoList) {
    if(checkFaQPageAndSelfPage()) {
        productNameLi = document.querySelector(".product-name-result");
    }

    domObject.onclick = () => {
        if(domObject.classList.contains("integrated")) {
            setModelName(productNameLi,
                {
                   "productName": productInfoList.productCategoryName,
                   "keyCode": checkFaQPageAndSelfPage() ? productInfoList.productDetailList[0].productCode : productInfoList.productCategoryCode
               }, 
               "integrated");

               if(!checkFaQPageAndSelfPage()) {
                   productInfoObject.productCategoryCode = productInfoList.productCategoryCode;
                   productInfoObject.productCode = productInfoList.productCode;
               }

        }else if(checkFaQPageAndSelfPage()){
            setModelName(productNameLi,
                {
                   "productTitle": productInfoList.productCategoryName,
                   "isCategory": true,
                //    "keyCode": productInfoList.productDetailList[0].productCode,
                   "productCategoryCode": checkFaQPageAndSelfPage() ? productInfoList.productCategoryCode :  productInfoList[i].productCategoryCode
               }, 
               "category");
        }else {
            setModelName(productNameLi, {"productName": null}, "integrated");
        }
    }
    
}

function setProductClickEvent(domObject, productInfoList) {
    for(let i = 0; i < domObject.length; i++) {
        domObject[i].onclick = () => {
            setModelName(productNameLi, {
                "productTitle": checkFaQPageAndSelfPage() ? productInfoList.productCategoryName : productInfoList[i].productCategoryName, 
                "isCategory": false,
                "productName": domObject[i].textContent,
                "keyCode": checkFaQPageAndSelfPage() ? productInfoList.productDetailList[i].productCode : productInfoList[i].productCategoryCode
            }, "group");
            
            if(!checkFaQPageAndSelfPage()) {
                productInfoObject.productCategoryCode = productInfoList[i].productCategoryCode;
                productInfoObject.productCode = productInfoList[i].productCode;
                
            }

           
        }

    }
}

function addVisibles(objects) {
    objects.forEach(object => object.classList.add("visible"));
}

function removeVisibles(objects) {
    objects.forEach(object => object.classList.remove("visible"));
}

function addVisibleClass(object) {
    object.classList.add("visible");
}

function removeVisibleClass(object) {
    object.classList.remove("visible");
}

function getProductFirstInfo(productList) {
    return productList.readProductDetailResponseDtoList[0];
}

function getProdutListInfo(productList) {
    return productList.readProductDetailResponseDtoList;
}

function errorMessage(request, status, error) {
    alert("요청중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
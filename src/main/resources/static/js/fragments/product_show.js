const swiperCategory = document.querySelector(".swiper-category .swiper-wrapper");
const swiperProduct = document.querySelector(".swiper-product .swiper-wrapper");

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
        const swiperWrapper = document.querySelector(".swiper-category .swiper-wrapper");

        let totalPage = 0;
        let size = 0;

        totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;
        size = productInfoList.length;
        swiperWrapper.innerHTML = "";

        for(let i = 0; i < totalPage; i++) {
            let innerHTML = "";
            let startIndex = 6 * i;
            let endIndex = i == totalPage - 1 ? size : startIndex + 6;

            
            innerHTML += `<div class="swiper-slide">`;
            innerHTML += `<ul class="category-image-ul">`;
            
            for(startIndex; startIndex < endIndex; startIndex++) {
                innerHTML += `
                            <li class="category-image-li">
                                <div>
                                    <img src="/image/winiaaid-images/winia-product/category-images/${productInfoList[startIndex].productMainCategoryImage}" alt="${productInfoList[startIndex].productCategoryName}">
                                </div>
                            </li>
                            `;

                            // <img src="/static/winiaaid-images/winia-product/category-images/${productInfoList[startIndex].productMainCategoryImage}" alt="${productInfoList[startIndex].productCategoryName}">
                                
            }
            
            innerHTML += `</ul></div>`;
            swiperWrapper.innerHTML += innerHTML;
        }
        
        makeCategorySwiper();
        checkCategorySlideAmount();

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
                getProductDetail(productInfoList[i].productGroupCode, true);
                setModelName(productNameLi, {"productTitle": productInfoList[i].productCategoryName}, "category");
                
                if(!checkFaQPageAndSelfPage()) {
                    initializationTroubleSymptom();

                }else {
                    selectProductGroupCode = productInfoList[i].productGroupCode;
                    selectProductCategoryCode = 0;
                    selectProductCode = 0;
                    getSolutionList(1);
                    removeVisibleClass(productArea);
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
                    selectProductCode = 0;
                    selectProductGroupCode = 0;
                    getSolutionList(1);
                    removeVisibleClass(productArea);
                }
            }
        }
    }
}

function getProductDetail(code, isGroup) {
    let type = isGroup ? "group" : "default";

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/${company}/${type}/${code}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                if(response.data[0].productDetailList.length == 0) {
                    showHaveNotProductMark();

                }else {
                    showProductList(response.data, isGroup);

                }
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
    clearDomObject(swiperProduct);

    setProductImages(swiperProduct, productInfoList, "detailProduct", isGroup);
}


function showHaveNotProductMark() {
    let innerHTML = "";
    
    clearDomObject(swiperProduct);

    innerHTML += `<div class="swiper-slide">`;
    innerHTML += `<ul class="detail-product-ul">`;

    innerHTML += `<li>
                    <i class="fa-solid fa-ban"></i>
                    <span>등록된 제품이 없습니다.</span>
                </li>
                `;
        
    innerHTML += `</ul></div>`;
    swiperProduct.innerHTML += innerHTML;

    makeProductSwiper();
    checkProductSlideAmount();
}

function setProductDetail(domObject, productInfoList) {
    let totalPage = 0;
    let size = 0;

    totalPage = productInfoList[0].productDetailList.length % 6 == 0 ? productInfoList[0].productDetailList.length / 6 : Math.floor(productInfoList[0].productDetailList.length / 6) + 1;
    size = productInfoList[0].productDetailList.length;

    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 6 * i;
        let endIndex = i == totalPage - 1 ? size : startIndex + 6;

        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="detail-product-ul">`;

        for(startIndex; startIndex < endIndex; startIndex++) {
            innerHTML += `<li>
                            <img class="product-detail-image" src="/image/winiaaid-images/winia-product/images/${productInfoList[0].productDetailList[startIndex].productDetailImage}" alt="${productInfoList[0].productDetailList[startIndex].productDetailName}">
                            <span>${productInfoList[0].productDetailList[startIndex].productDetailName}</span>
                        </li>
                        `;
                        // <img class="product-detail-image" src="/static/winiaaid-images/winia-product/images/${productInfoList[0].productDetailList[startIndex].productDetailImage}" alt="${productInfoList[0].productDetailList[startIndex].productDetailName}">
                            
        }
        
        innerHTML += `</ul></div>`;
        domObject.innerHTML += innerHTML;
    }
    
    makeProductSwiper();
    checkProductSlideAmount();

    setImageClickEvent(document.querySelectorAll(".detail-product-ul img"), productInfoList[0]);
   
}

function checkIntegratedProduct(productList) {
    return productList.productDetailList.length == 1 && productList.productDetailList[0].productDetailName == productList.productCategoryName;
}

function makeCategorySwiper() {
    const swiper = new Swiper(".swiper-category", {
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev'
        }
    });
}

function makeProductSwiper() {
    const swiper = new Swiper(".swiper-product", {
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev'
        }
    });
}

function checkCategorySlideAmount() {
    const swiperSlides = document.querySelectorAll(".swiper-category .swiper-slide");
    const swiperMoveDivs = document.querySelectorAll(".swiper-category .slide-div");
    if(swiperSlides.length > 1) {
        removeVisibles(swiperMoveDivs);
    }else {
        addVisibles(swiperMoveDivs);
    }
}

function checkProductSlideAmount() {
    const swiperSlides = document.querySelectorAll(".swiper-product .swiper-slide");
    const swiperMoveDivs = document.querySelectorAll(".swiper-product .slide-div");

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
            
            console.log(productInfoList);
            productInfoObject.productCategoryCode = productInfoList.productCategoryCode;
            productInfoObject.productCode = productInfoList.productDetailList[i].productCode;

            if(checkFaQPageAndSelfPage()) {
                productNameLi = document.querySelector(".product-name-result");
            }

            setModelName(productNameLi, {"productName": productDetailName, "keyCode": checkFaQPageAndSelfPage() ? productInfoList.productDetailList[i].productCode : productInfoList.productCategoryCode}, "default");
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
        selectProductCode = 0;
        selectProductGroupCode = 0;

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

        selectProductCategoryCode = 0;
        selectProductGroupCode = 0;
        getSolutionList(1);

    }else {
        getProductTroubleSymptom(productInfoObject.keyCode);
        addVisibleClass(modelSearchTr);
        addVisibleClass(modelDetailSpan);
    }
}

function setGroupProductDetail(domObject, productInfoList) {
    let totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;

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
            
            let productCategoryLi = document.createElement("li");
            productCategoryLi.setAttribute("class", `product-category-${startIndex}`);

            let productImage = document.createElement("img");
            productImage.setAttribute("class", integratedFlag ? "integrated product-detail-image" : "");

            productImage.setAttribute("src", `/image/winiaaid-images/winia-product/images/${productInfoList[startIndex].productMainImage}`);
            // productImage.setAttribute("src", `/static/winiaaid-images/winia-product/images/${productInfoList[startIndex].productMainImage}`);
            productImage.setAttribute("alt", productInfoList[startIndex].productCategoryName);

            let productCategoryNameP = document.createElement("p");
            productCategoryNameP.setAttribute("class", `category-title-${productInfoList[startIndex].productCategoryCode} detail-product-name`);
            productCategoryNameP.appendChild(document.createTextNode(productInfoList[startIndex].productCategoryName));


            productCategoryLi.appendChild(productImage);
            productCategoryLi.appendChild(productCategoryNameP);


            if(integratedFlag) {
                detailProductUl.appendChild(productCategoryLi);
                swiperDiv.appendChild(detailProductUl);
                domObject.appendChild(swiperDiv);
                const groupImage = document.querySelector(`.product-category-${startIndex} img`);
                setGroupImageClickEvent(groupImage, productInfoList[startIndex]);
                continue;
            }

            let productNameUl = document.createElement("ul");
            productNameUl.setAttribute("class", "product-name-ul");

            let size = productInfoList[startIndex].productDetailList.length;

            for(let j = 0; j < size; j++) {
                let newLi = document.createElement("li");
                let newSpan = document.createElement("span");

                newSpan.setAttribute("class", `product-category-${productInfoList[startIndex].productCategoryCode} detail-product-name`);
                newSpan.appendChild(document.createTextNode(productInfoList[startIndex].productDetailList[j].productDetailName));

                newLi.appendChild(newSpan);

                productNameUl.appendChild(newLi);

            }

            productCategoryLi.appendChild(productNameUl);
            detailProductUl.appendChild(productCategoryLi);
            swiperDiv.appendChild(detailProductUl);
            domObject.appendChild(swiperDiv);
            
            const productSpans = document.querySelectorAll(`.product-category-${startIndex} span`);

            setProductClickEvent(productSpans, productInfoList[startIndex]);
            const groupImage = document.querySelector(`.product-category-${startIndex} img`);
            setGroupImageClickEvent(groupImage, productInfoList[startIndex]);
        }

    }

    makeProductSwiper();
    checkProductSlideAmount();
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
                   productInfoObject.productCode = productInfoList.productDetailList[0].productCode;
               }

        }else if(checkFaQPageAndSelfPage()){
            setModelName(productNameLi,
                {
                   "productTitle": productInfoList.productCategoryName,
                   "isCategory": true,
                   "productCategoryCode": productInfoList.productCategoryCode
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
                "productTitle": productInfoList.productCategoryName, 
                "isCategory": false,
                "productName": domObject[i].textContent,
                "keyCode": checkFaQPageAndSelfPage() ? productInfoList.productDetailList[i].productCode : productInfoList.productCategoryCode
            }, "group");
            
            if(!checkFaQPageAndSelfPage()) {
                productInfoObject.productCategoryCode = productInfoList.productCategoryCode;
                productInfoObject.productCode = productInfoList.productDetailList[i].productCode;
                
            }

           
        }

    }
}

function addVisibles(objects) {
    objects.forEach(object => object.classList.add("visible"));
}

function removeVisibles(objects) {
    console.log(objects);
    objects.forEach(object => object.classList.remove("visible"));
}

function addVisibleClass(object) {
    object.classList.add("visible");
}

function removeVisibleClass(object) {
    object.classList.remove("visible");
}

function errorMessage(request, status, error) {
    alert("요청중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
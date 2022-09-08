const winia = document.querySelector(".li-winia");
const daewoo = document.querySelector(".li-daewoo");

const stepTitleItems = document.querySelectorAll(".step-title-div");
const stepTitleDivItems = document.querySelectorAll(".step-div");

let modelNameSpan = document.querySelector(".model-name-span");
const modelSearchTr = document.querySelector(".model-search-tr");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const productNameTd = document.querySelector(".product-name-td");
const modelDetailSpan = document.querySelector(".model-result-span");
const modelCheckButtonList = document.querySelectorAll(".model-check-button-list button");
const modelSearchInput = document.querySelector(".model-search-input");
const modelSearchButton = document.querySelector(".model-search-button");
const troubleSymptomTd = document.querySelector(".trouble-symptom-td select");
const descriptionInput = document.querySelector(".description-input");

const firstEmail = document.querySelector(".email-1");
const secondEmail = document.querySelector(".email-2");
const emailBoxSelect = document.querySelector(".email-box select")

const searchAddressButton = document.querySelector(".search-address-button");
const postalCodeInput = document.querySelector(".postal-code");
const mainAddressInput = document.querySelector(".main-address");
const detailAddressInput = document.querySelector(".detail-address");


let dayDivItems = null;
let timeTables = null;
const mainTimeContent = document.querySelector(".main-time-content");
const reservationDiv = document.querySelector(".reservation-div");
const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

const stepLocks = document.querySelectorAll(".step-lock");
const modifyButton = document.querySelector(".modify-button button");
const requestButton = document.querySelector(".request-button");
const cancelButton = document.querySelector(".cancel-button");


let company = null;

let tempPhoneNumber = null;

let nowDate = null;
let dateObject = {};
let selectReservationDay = null;

let reservationFlag = false;

let productInfoObject = {
    "productCode": 0,
    "productName": null,
    "modelName": null,
    "trouble": null
};

let userInfoObject = {};
let reservationInfoObject = {};

winia.onclick = showWiniaProduct;


setNowDate();
setCalendarData();
setChangeMonthButton("pre");
setReservationableDaySpan();

modelCheckButtonList[0].onclick = () => {
    if(checkModelNameSpan()) {
        toggleVisibleClass(modelSearchTr);
    }
};

modelCheckButtonList[1].onclick = () => {
    addVisibleClass(modelSearchTr);
    removeVisibleClass(modelDetailSpan);
    setModelName(modelDetailSpan, {productName: "모델명 모름"}, "buttonClick");

};

modelCheckButtonList[2].onclick = showModelNumberCheckPopup;

modelSearchInput.onkeyup = (e) => {
    if(e.keyCode == 13) {
        modelSearchButton.click();
    }
}

modelSearchButton.onclick = searchModelByModelName;



descriptionInput.onkeyup = (e) => checkByte(e.target);


searchAddressButton.onclick = loadAddressPopup;


emailBoxSelect.onchange = setEmail;


preMonthButton.onclick = setPreMonth;

nextMonthButton.onclick = setNextMonth;

stepTitleItems[0].onclick = checkRequireProductBrand;

stepTitleItems[1].onclick = () => {
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModel()) {
        return
    }
}

stepTitleItems[2].onclick = () =>{
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModel()) {
        return
    }else if(!checkRequireInput()) {
        return
    }
}

stepTitleItems[3].onclick = () => {
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModel()) {
        return
    }else if(!checkRequireInput()) {
        return
    }else if(!checkReservationFlag()) {
        return
    }
}

modifyButton.onclick = requestDivActivation;

requestButton.onclick = checkAllRequireItems;


function checkAllRequireItems() {
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModel()) {
        return
    }else if(!checkRequireInput()) {
        return
    }else if(!checkReservationFlag()) {
        return
    }
    alert("신청!");
}

/*>>>>>>>>>>>>>>>>> STEP 1 <<<<<<<<<<<<<<<<<<<<<<<<*/ 

function showWiniaProduct() {
    const serviceRequestDiv = document.querySelector(".service-request-div");
    company = "winia";

    alert("위니아 제품이 맞습니까?\n아닐경우 방문이 되지 않습니다.\n제조사를 다시 한번 확인해 주세요.");

    let categoryInfoList = getMainCategoryList(company);
    showMainCategory(categoryInfoList);
    removeVisibleClass(serviceRequestDiv);
    activationStepTitle(stepTitleItems[0], stepTitleDivItems[0]);
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
        error: errorMessage     
    });

    return categoryInfoList;
}

function showMainCategory(categoryInfoList) {
    const categoryImageUl = document.querySelector(".category-image-ul");

    clearDomObject(categoryImageUl);

    setProductImages(categoryImageUl, categoryInfoList, "mainCategory", false);

}

function setModelName(domObject, productInfoObject, type) {
    if(type == "buttonClick") {
        domObject.innerHTML = productInfoObject.productName;
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
        initializationTroubleSymptom();

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
    while(domObject.hasChildNodes()) {
        domObject.removeChild(domObject.firstChild);
    }

}

function createProductTitleSpan(domObject, productInfoObject) {
    let newSpan = document.createElement("span");
    newSpan.setAttribute("class", "model-title-span");
    let newText = document.createTextNode(productInfoObject.productTitle);

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
    
    getProductTroubleSymptom(productInfoObject.categoryCode);
    addVisibleClass(modelSearchTr);
    addVisibleClass(modelDetailSpan);
}

function getProductTroubleSymptom(categoryCode) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/trouble/category/${categoryCode}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                setProductTroubleSymptom(response.data);
            }
        },
        error: errorMessage
    });
}

function setProductTroubleSymptom(toubleSymptomList) {
    initializationTroubleSymptom();

    toubleSymptomList.forEach(trouble => {
        troubleSymptomTd.innerHTML += `
        <option value="${trouble.troubleCode}">${trouble.troubleName}</option>
        `;
    });
}

function initializationTroubleSymptom() {
    troubleSymptomTd.innerHTML = `<option value="0">선택</option>`;
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
                showProductList(response.data, isGroup);
            }else {
                showHaveNotProductMark();
            }
        },
        error: errorMessage
    });

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



function showProductList(productInfoList, isGroup) {
    clearDomObject(swiperWrapper);

    setProductImages(swiperWrapper, productInfoList, "detailProduct", isGroup);
}

function clearDomObject(object) {
    object.innerHTML = "";
}

function setProductImages(domObject, productInfoList, type, isGroup) {
    if(type == "mainCategory") {
        productInfoList.forEach(categoryInfo => {
            domObject.innerHTML += `
            <li class="category-image-li">
                <div>
                    <img src="/image/winia-product/category-images/${categoryInfo.productMainCategoryImage}" alt="${categoryInfo.categoryName}">
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

function setProductDetail(domObject, productInfoList) {
    let totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;

    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 6 * i;
        let endIndex = i == totalPage - 1 ? productInfoList.length : startIndex + 6;

        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="detail-product-ul">`;

        for(startIndex; startIndex < endIndex; startIndex++) {
            innerHTML += `<li>
                            <img  src="/image/winia-product/detail-images/${productInfoList[startIndex].productDetailImage}" alt="${productInfoList[startIndex].productName}">
                            <span>${productInfoList[startIndex].productName}</span>
                        </li>
                        `;
        }
        
        innerHTML += `</ul></div>`;
        domObject.innerHTML += innerHTML;
    }
    
    makeSwiper();
    checkSlideAmount();
    setImageClickEvent(document.querySelectorAll(".detail-product-ul img"), productInfoList);
   
}

function setGroupProductDetail(domObject, productInfoList) {

    let totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;

    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 6 * i;
        let endIndex = i == totalPage - 1 ? productInfoList.length : startIndex + 6;

        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="detail-product-ul">`;
        
        for(startIndex; startIndex < endIndex; startIndex++) {
            let integratedFlag = checkIntegratedProduct(productInfoList[startIndex]);
            let productInfo = getProductInfo(productInfoList[startIndex]);
            innerHTML += `
                <li class="product-category">
                    <img class="${integratedFlag ? "integrated" : ""}" src="/image/winia-product/main-images/${productInfo.productMainImage}" alt="${productInfo.productName}">
                    <p class="category-title-${productInfo.categoryCode}">${productInfo.categoryName}</p>
                `;

            if(integratedFlag) {
                innerHTML += `</li>`;
                continue;
            }

            innerHTML += `<ul class="product-name-ul">`;
            productInfoList[startIndex].readProductDetailResponseDtoList.forEach(detailProduct => {
                innerHTML += `
                    <li>
                        <span class="product-category-${detailProduct.categoryCode}">${detailProduct.productName}</span>
                    </li>
                    `;
            });
            innerHTML += `</ul></li>`;
        }

        innerHTML += `</ul></div>`;
        domObject.innerHTML += innerHTML;
    }

    makeSwiper();
    checkSlideAmount();

    const groupImages = document.querySelectorAll(".product-category img");
    const productSpans = document.querySelectorAll(".product-name-ul span");

    setGroupImageClickEvent(groupImages, productInfoList);
    setProductClickEvent(productSpans);
}

function setGroupImageClickEvent(domObject, productInfoList) {
    for(let i = 0; i < domObject.length; i++) {
        let productInfo = getProductInfo(productInfoList[i]);
        domObject[i].onclick = () => {
            if(domObject[i].classList.contains("integrated")) {
                setModelName(productNameTd, {"productName": productInfo.productName, "categoryCode": productInfo.categoryCode}, "integrated");
    
            }else {
                setModelName(productNameTd, {"productName": null}, "integrated");
            }
        }
    }

    // //  let index = 0;

    //  for(obj of domObject) {
    //     // let productInfo = getProductInfo(productInfoList[index]);
    //     obj.onclick = () => {
    //         if(obj.classList.contains("integrated")) {
    //             // setModelName(productNameTd, {"productName": productInfo.productName, "categoryCode": productInfo.categoryCode}, "integrated");
    
    //         }else {
    //             // setModelName(productNameTd, {"productName": null}, "integrated");
    //         }
    //     }
    //     // index++;
    // }

    // domObject.forEach(object => {
    //     object.onclick = () => {
    //         if(object.classList.contains("integrated")) {
    //             let categoryCode = getCategoryCodeByDomObject(object, true);
                    
    //             setModelName(productNameTd, {"productName": object.getAttribute("alt"), "categoryCode": categoryCode}, "integrated");
    //         }else {
    //             setModelName(productNameTd, {"productName": null}, "integrated");
    //         }
    //     }
    // })

    
}

function getCategoryCodeByDomObject(object, isImage) {
    let categoryCode = 0;
    if(isImage) {
        categoryCode = object.getAttribute("src")
        .substring(
            object.getAttribute("src").lastIndexOf("-") + 1, object.getAttribute("src").lastIndexOf(".")
            );
    }else {
        categoryCode = object.classList.item(0).substring(object.classList.item(0).lastIndexOf("-") + 1);
    }

    return categoryCode;
}

function checkIntegratedProduct(productList) {
    return productList.readProductDetailResponseDtoList.length == 1 
    && productList.readProductDetailResponseDtoList.categoryName == productList.readProductDetailResponseDtoList.productName;
}

function getProductInfo(productList) {
    return productList.readProductDetailResponseDtoList[0];
}

function addVisibleClass(object) {
    object.classList.add("visible");
}

function removeVisibleClass(object) {
    object.classList.remove("visible");
}

function toggleVisibleClass(object) {
    object.classList.toggle("visible");
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

function addVisibles(objects) {
    objects.forEach(object => object.classList.add("visible"));
}

function removeVisibles(objects) {
    objects.forEach(object => object.classList.remove("visible"));
}

function setCategoryClickEvent(productInfoList) {
    const categoryImages = document.querySelectorAll(".category-image-li img");

    for(let i = 0; i < productInfoList.length; i++){
        if(productInfoList[i].groupFlag) {
            categoryImages[i].onclick = () => {
                getProductDetail(productInfoList[i].productGroup, true);
                setModelName(productNameTd, {"productTitle": productInfoList[i].categoryName}, "category");
                initializationTroubleSymptom();
            }
        }else {
            categoryImages[i].onclick = () => {
                getProductDetail(productInfoList[i].categoryCode, false);
                setModelName(productNameTd, {"productTitle": productInfoList[i].categoryName}, "category");
                initializationTroubleSymptom();
            }
        }
    }
}

function setImageClickEvent(domObject, productInfoList) {
    for(let i = 0; i < domObject.length; i++) {
        domObject[i].onclick = () => {
            let productDetailName = domObject[i].getAttribute("alt");
            console.log(productInfoList[i]);
            productInfoObject.productCode = productInfoList[i].productCode;

            setModelName(productNameTd, {"productName": productDetailName, "categoryCode": productInfoList[0].categoryCode}, "default");
        }
    }
}

function setProductClickEvent(domObject) {

    domObject.forEach(object => {
        object.onclick = () => {
            let categoryCode = getCategoryCodeByDomObject(object, false);
            
            const categoryTitle = document.querySelector(`.category-title-${categoryCode}`).textContent;
            setModelName(productNameTd, {"productTitle": categoryTitle, "productName": object.textContent, "categoryCode": categoryCode}, "group");
        }
    })
}

function checkModelNameSpan() {
    modelNameSpan = document.querySelector(".model-name-span");
    if(isEmpty(modelNameSpan)) {
        alert("제품을 먼저 선택해 주세요.");
        return false;
    }
    return true;
}

function searchModelByModelName() {
    $.ajax({
        type: "get",
        url: `/api/v1/product/model/list/${modelSearchInput.value}?code=${productInfoObject.productCode}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                setModelNameList(response.data);
            }else {
                alert("제품에 해당되는 모델명이 없습니다.\n확인 후 다시 입력해주세요.");
            }
        },
        error: errorMessage
    });
}

function setModelNameList(modelNameList) {
    const modelResult = document.querySelector(".model-result");
    const modelResultUl = document.querySelector(".model-result ul");

    clearDomObject(modelResultUl);
    removeVisibleClass(modelResult);

    modelNameList.forEach(model => {
        modelResultUl.innerHTML += `<li class="model-number">${model.modelNumber}</li>`;
    });

    const modelNumberItems = document.querySelectorAll(".model-number");

    setModelClickEvent(modelNumberItems);

}

function setModelClickEvent(modelNumberItems) {
    modelNumberItems.forEach(model => {
        model.onclick = () => {
            modelDetailSpan.innerHTML = model.textContent;
            removeVisibleClass(modelDetailSpan);
        }
    })
}

function checkByte(object) {
    const maxByte = 40;
    const text = object.value;
    const textSize = text.length;
    
    let totalByte=0;
    for(let i = 0; i < textSize; i++){
    	const each_char = text.charAt(i);
        const uni_char = escape(each_char);
        if(uni_char.length>4){
            totalByte += 2;
        }else{
            totalByte += 1;
        }
    }

    const allowedByteDisplay = document.querySelector(".allowed-byte-display");

    if(totalByte > maxByte) {
        object.value = text.substring(0, textSize - 1);
        alert("최대 40Bytes(한글 20자, 영문 40자)까지 입력 가능합니다");
    }

    allowedByteDisplay.textContent = totalByte;
}

function clearModelName(domObject) {
    domObject.innerHTML = "";
}


/*>>>>>>>>>>>>>>>>> STEP 2 <<<<<<<<<<<<<<<<<<<<<<<<*/ 

function setEmail() {

    if(emailBoxSelect.options[emailBoxSelect.selectedIndex].value != "custom") {
        secondEmail.value = emailBoxSelect.options[emailBoxSelect.selectedIndex].value;
        secondEmail.setAttribute("readonly", true);
    }else {
        secondEmail.value = "";
        secondEmail.removeAttribute("readonly", false);
    }
}

function setAddressInput(postalCode, mainAddress, detailAddress) {
    postalCodeInput.value = postalCode;
    mainAddressInput.value = mainAddress;
    detailAddressInput.value = detailAddress;

    detailAddressInput.focus();
}

/*>>>>>>>>>>>>>>>>> STEP 3 <<<<<<<<<<<<<<<<<<<<<<<<*/ 

function setNowDate() {
    const nowDateDiv = document.querySelector(".now-date");
    nowDate = new Date();

    console.log(dateObject);
    nowDateDiv.innerHTML = `${dateObject.year}년 ${dateObject.month}월`;
}

function setCalendarData() {
    dateObject = setDateObject(dateObject);
    insertCalendar(setCalendarDate(dateObject));
}

function checkChangeableMonth() {
    return nowDate.getMonth() + 1 == dateObject.month;
}

function setChangeMonthButton(type) {
    if(type == "next"){
        nextMonthButton.classList.add("inactive-button");
        preMonthButton.classList.remove("inactive-button");
        setNowDate();
    }else {
        preMonthButton.classList.add("inactive-button");
        nextMonthButton.classList.remove("inactive-button");
        setNowDate();
    }
}

function setNextMonth() {
    if(checkChangeableMonth()) {
        dateObject.month = dateObject.month + 1;
        dateObject = setDateObject(dateObject);
        insertCalendar(setCalendarDate(dateObject));
        setChangeMonthButton("next");
    }
}

function setPreMonth() {
    if(!checkChangeableMonth()) {
        dateObject.month = dateObject.month - 1;
        dateObject = setDateObject(dateObject);
        insertCalendar(setCalendarDate(dateObject));
        setChangeMonthButton("pre");
    }
}


function setDateObject(dateObject) {
    let month = 0;
    if(dateObject.month != null) {
        month = dateObject.month;
        console.log(month)
    }else {
        month = nowDate.getMonth() + 1;
    }

    let year = nowDate.getFullYear();
    let date = nowDate.getDate();

    let monthStartDay = new Date(year, month - 1, 1).getDay();
    let monthLastDay = new Date(year, month, 0).getDate();
    let weekCount = Math.ceil((monthStartDay + monthLastDay) / 7);

    dateObject.year = year;
    dateObject.month = month;
    dateObject.date = date;
    dateObject.monthStartDay = monthStartDay;
    dateObject.monthLastDay = monthLastDay;
    dateObject.weekCount = weekCount;

    return dateObject;
}

function setCalendarDate(dateObject) {
    let blankCount = 0;
    let dayCount = 0;

    let calendar = "";
    
    for(let i = 0; i < dateObject.weekCount; i++) {
        let saturdayCount = 0;
        calendar += "<tr>";
    
        for(let j = 0; j < 7; j++) {
    
            calendar += "<td>";
            if(dateObject.monthStartDay < blankCount + 1 && dayCount < dateObject.monthLastDay) {
                dayCount++;

                let dayResult = blankCount == 0 
                    || blankCount % 7 == 0 ? "sunday"
                    : dayCount < dateObject.date
                    && nowDate.getMonth() + 1 == dateObject.month ? "past-day" 
                    :nowDate.getMonth() + 1 != dateObject.month 
                    && nowDate.getDate() < dayCount ? "future-day" 
                    : saturdayCount == 6 ? "saturday"
                    : "day-div";

                calendar += `<div class=${dayResult}>${dayCount}<div>`;

            }
            calendar += "</td>";
            blankCount++;
            saturdayCount++;
        }
        calendar += "</tr>";
    }

    clearReservationTime();

    return calendar;

}

function clearReservationTime() {
    mainTimeContent.innerHTML = "";
    reservationFlag = false;
}

function insertCalendar(calendar) {
    const calendarBody = document.querySelector(".calendar-body");

    calendarBody.innerHTML = calendar;

    setCalendarClickEvent(calendarBody);
}

function setCalendarClickEvent(calendarBody) {
    dayDivItems = calendarBody.querySelectorAll("div");

    dayDivItems.forEach(dayDiv => {
        if(dayDiv.classList.contains("saturday") || dayDiv.classList.contains("day-div")) {
            dayDiv.onclick = () => {
                selectDay(dayDiv.textContent, dayDiv);
                reservationFlag = false;
            }
        }
    });
}

function setReservationableDaySpan() {
    const showDateSpan = document.querySelector(".show-date-span");

    showDateSpan.innerHTML = `${nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1}월 ${nowDate.getDate()}일 ~ ${nowDate.getMonth() + 2 < 10 ? "0" + (nowDate.getMonth() + 2) : nowDate.getMonth() + 2}월 ${nowDate.getDate()}일`;
}

function getTheUnbookableTime(selectDay) {
    let unbookableTimeByEngineerList = null;

    let date = new Date(dateObject.year, dateObject.month - 1, selectDay);
    
    date = date.getFullYear().toString() + "." + (date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "." +  (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());

    reservationInfoObject.reservationDay = date;

    selectReservationDay = date.replaceAll(".", "");

    console.log(date);
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/engineer/reservation/${selectReservationDay}/time`,
        dataType: "json",
        success: (response) => {
            unbookableTimeByEngineerList = response.data;
            console.log(unbookableTimeByEngineerList);
        },
        error: errorMessage
    });

    return unbookableTimeByEngineerList;
}

function setReservationTime(engineerList, selectDay) {
    clearMainTimeContent(mainTimeContent);

    for(engineerInfo of engineerList) {
        createReservationTimeTable(engineerInfo);
        timeTables = document.querySelectorAll(`.time-table-${engineerInfo.engineerCode} label`);
        setReservationTimeClickEvent(timeTables, engineerInfo);
    }
    
    let unbookableTimeByEngineerList = getTheUnbookableTime(selectDay);
    
    if(unbookableTimeByEngineerList.length != 0) {
        for(engineer of unbookableTimeByEngineerList) {
            let engineerInfo = engineer.engineerReservationInfoDtoList[0];
            
            timeTables = document.querySelectorAll(`.time-table-${engineerInfo.engineerCode} label`);
            
            // let reservationListIndex = 0;
    
            // let reservationDayList = new Array();
    
            // engineer.engineerReservationInfoDtoList.forEach(info => {
            //     if(info.reservationDay.replaceAll("-", "") == selectReservationDay) {
            //         reservationDayList.push(info);
            //     }
            // });
    
            // console.log(reservationDayList);
            for(engineerInfo of engineer.engineerReservationInfoDtoList) {
                console.log(engineerInfo);
                for(timeTable of timeTables) {
                    if(engineerInfo.reservationTime == timeTable.textContent) {
                        timeTable.classList.add("unbookable");
                        break;
                    }

                }
            }
            
            // if(reservationDayList.length != 0) {
            //     for(timeTable of timeTables) {
            //         if(timeTable.textContent == reservationDayList[reservationListIndex].reservationTime) {
            //             timeTable.classList.add("unbookable")
            //             reservationListIndex++;
            //         }
            //         if(reservationListIndex == reservationDayList.length) {
            //             break;
            //         }
            //     }
            // }
        }
    }

}

function getEngineerList() {
    let engineerList = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/engineer/list",
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                engineerList = response.data;
            } 
        },
        error: errorMessage
    });

    return engineerList;
}

function createReservationTimeTable(engineerInfo) {
    const newDl = document.createElement("dl");
    newDl.setAttribute("class", "engineer-content");

    let rawHTML = `
    <dl class="engineer-content">
        <dt>${engineerInfo.engineerName}님</dt>
            <dd class="time-table-${engineerInfo.engineerCode}">
                <label class="activation">09:00</label>
                <label class="activation">09:30</label>
                <label class="activation">10:00</label>
                <label class="activation">10:30</label>
                <label class="activation">11:00</label>
                <label class="activation">11:30</label>
                <label class="activation">13:00</label>
                <label class="activation">13:30</label>
                <label class="activation">14:00</label>
                <label class="activation">14:30</label>
                <label class="activation">15:00</label>
                <label class="activation">15:30</label>
                <label class="activation">16:00</label>
                <label class="activation">16:30</label>
                <label class="activation">17:00</label>
                <label class="activation">17:30</label>
            </dd>
    </dl>
    `;

    newDl.innerHTML = rawHTML;
    mainTimeContent.appendChild(newDl);
}

function setReservationTimeClickEvent(reservationTimes, engineerInfo) {
    reservationTimes.forEach(time => {
        time.onclick = () => {
            selectTime(time, engineerInfo);
        }
    })
}

function clearMainTimeContent(mainTimeContent) {
    mainTimeContent.innerHTML = "";
}

function selectDay(day, object) {
    removeSelectDayClass();

    object.classList.add("select-day");

    setReservationTime(getEngineerList(), day);
    // setReservationTime(getTheUnbookableTime(day));
}

const mainConfirmDiv = document.querySelector(".main-confirm-div");

function selectTime(object, engineerInfo) {
    if(!object.classList.contains("unbookable")) {
        removeSelectTimeClass();
        object.classList.add("select-time");
        removeVisibles(stepLocks);
        removeVisibleClass(mainConfirmDiv);
        reservationFlag = true;

        reservationInfoObject.reservationTime = object.textContent;
        reservationInfoObject.engineerInfo = engineerInfo;

        activationStepTitle(stepTitleItems[3], stepTitleDivItems[3]);
        setFinalInfo();
    }
}



function setFinalInfo() {
    console.log(productInfoObject);
    console.log(userInfoObject);
    console.log(reservationInfoObject);
    setProductInfo();
    setUserInfo();
    setReservationInfo()
}

function setProductInfo() {
    const productInfo = document.querySelector(".product-info");
    const troubleSymptomInfo = document.querySelector(".trouble-symptom-info");

    productInfo.textContent = `${productInfoObject.productName}/ ${productInfoObject.modelName}`;
    troubleSymptomInfo.textContent = `${productInfoObject.trouble}`;

}

function setUserInfo() {
    const nameInfo = document.querySelector(".name-info");
    const mainPhoneNumberInfo = document.querySelector(".main-phone-number-info");
    const addressInfo = document.querySelector(".address-info");

    nameInfo.textContent = `${userInfoObject.name}`;
    mainPhoneNumberInfo.textContent = `${userInfoObject.mainPhone}`;
    addressInfo.textContent = `${userInfoObject.mainAddress} ${userInfoObject.detailAddress}`;

    if(!isEmpty(userInfoObject.email)){
        const emailInfo = document.querySelector(".email-info");

        emailInfo.textContent = `${userInfoObject.email}`;
    }
    if(!isEmpty(userInfoObject.subPhone)) {
        const subPhoneNumberInfo = document.querySelector(".sub-phone-number-info");

        subPhoneNumberInfo.textContent = `${userInfoObject.subPhone}`;
    }
}

function setReservationInfo() {
    const reservationInfo = document.querySelector(".reservation-info")
    const reservationEngineerInfo = document.querySelector(".reservation-engineer-info");

    reservationInfo.textContent = `${reservationInfoObject.reservationDay} ${reservationInfoObject.reservationTime}`;
    reservationEngineerInfo.textContent = `${reservationInfoObject.engineerInfo.engineerName}님/ 부산점`;
}



function removeSelectDayClass() {
    for(dayDiv of dayDivItems) {
        if(dayDiv.classList.contains("select-day")) {
            dayDiv.classList.remove("select-day");
            break;
        }
    }
}

function removeSelectTimeClass() {
    const reservationTimeItems = document.querySelectorAll(".activation");
    for(reservationTime of reservationTimeItems) {
        if(reservationTime.classList.contains("select-time")) {
            reservationTime.classList.remove("select-time");
            break;
        }
    }

}

function requestDivActivation() {
    if(confirm("예약날짜와 시간이 초기화 됩니다.\n다시 수정 하시겠습니까?")) {
        addVisibles(stepLocks);
        addVisibleClass(mainConfirmDiv);
        setCalendarData();
        disableStepTitle(stepTitleItems[3], stepTitleDivItems[3]);
    }
}

function isEmpty(data) {
    return data == null || data == undefined || data == "";
}

function errorMessage(request, status, error) {
    alert("요청중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}

function activationStepTitle(stepTitle, stepDiv) {
    stepTitle.classList.add("activation-step-title");
    stepDiv.classList.add("activation-step-div");
}

function disableStepTitle(stepTitle, stepDiv){
    stepTitle.classList.remove("activation-step-title");
    stepDiv.classList.remove("activation-step-div");
}


/* >>>>>>>>>>>>>>>>>>>>>>>>> 체크 <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function checkRequireProductBrand() {
    if(company == null) {
        alert("예약신청 제품의 브랜드를 선택해주세요.");
        return false;
    }
    return true;
}


function checkRequireProductModel() {
    if(isEmpty(modelNameSpan)) {
        alert("예약신청 제품을 선택해주세요.");
        return false;
    }else if(modelDetailSpan.classList.contains("visible")) {
        alert("모델명을 선택해주세요.");
        return false;
    }else if(troubleSymptomTd.options[troubleSymptomTd.selectedIndex].value == 0) {
        alert("고장증상을 선택해주세요.");
        return false;
    }else if(isEmpty(descriptionInput.value)) {
        alert("접수내용을 입력해주세요");
        descriptionInput.focus();
        return false;
    }

    productInfoObject.productName = modelNameSpan.textContent;
    productInfoObject.modelName = modelDetailSpan.textContent;
    productInfoObject.trouble = troubleSymptomTd.options[troubleSymptomTd.selectedIndex].text;

    const userInfoContent = document.querySelector(".user-info-content");
    removeVisibleClass(userInfoContent);
    activationStepTitle(stepTitleItems[1], stepTitleDivItems[1]);
    return true;
}



function checkRequireInput() {
    const nameInput = document.querySelector(".name-input");

    const mainFirstPhoneNumber = document.querySelector(".phone-box select");
    const mainMiddlePhoneNumber = document.querySelector(".middle-number");
    const mainLastPhoneNumber = document.querySelector(".last-number");

    let mainFirstNumber = mainFirstPhoneNumber.options[mainFirstPhoneNumber.selectedIndex].value;
    let mainPhoneNumber = mainFirstNumber +"-"+ mainMiddlePhoneNumber.value +"-"+ mainLastPhoneNumber.value;

    let regPhone = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const subFirstPhoneNumber = document.querySelector(".sub-phone-box select");
    const subMiddlePhoneNumber = document.querySelector(".sub-phone-box .middle-number");
    const subLastPhoneNumber = document.querySelector(".sub-phone-box .last-number");

    let subFirstNumber = subFirstPhoneNumber.options[subFirstPhoneNumber.selectedIndex].value;
    let subPhoneNumber = subFirstNumber +"-"+ subMiddlePhoneNumber.value +"-"+ subLastPhoneNumber.value;

    let regPhone2 = /^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/;

    const agreeConsentToUse = document.querySelector(".agree-consent-to-use-box")
    const agreeConsignmentProcessing = document.querySelector(".agree-consignment-processing-box");

    if(isEmpty(nameInput.value)) {
        alert("성명을 입력해 주세요.");
        nameInput.focus();
        return false;
    }else if(isEmpty(mainFirstNumber) && isEmpty(mainMiddlePhoneNumber.value) && isEmpty(mainLastPhoneNumber.value)) {
        alert("휴대폰번호를 입력해주세요.");
        mainMiddlePhoneNumber.focus();
        return false;
    }else if(!regPhone.test(mainPhoneNumber)) {
        alert("휴대폰번호를 확인해주세요.");
        mainMiddlePhoneNumber.focus();
        return false;
    }else if(isEmpty(postalCodeInput.value) || isEmpty(mainAddressInput.value) || isEmpty(detailAddressInput.value)) {
        alert("주소를 입력해주세요.");
        detailAddressInput.focus();
        return false;
    }else if(!agreeConsentToUse.checked) {
        alert("개인정보 수집 및 이용에 동의해주세요.")
        agreeConsentToUse.focus();
        return false;
    }else if(!agreeConsignmentProcessing.checked) {
        alert("개인정보 위탁처리에 동의해주세요.");
        agreeConsignmentProcessing.focus();
        return false;
    }

    userInfoObject.name = nameInput.value;
    userInfoObject.postalCode = postalCodeInput.value;
    userInfoObject.mainAddress = mainAddressInput.value;
    userInfoObject.detailAddress = detailAddressInput.value;


    if(!isEmpty(firstEmail.value) || !isEmpty(secondEmail.value)) {
        let email = firstEmail.value + "@" + secondEmail.value;
        let regEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;

        if(!regEmail.test(email)) {
            alert("이메일 주소를 올바르게 입력해주세요.");
            firstEmail.focus();
            return false;
        }

        userInfoObject.email = email;
    }else if(!isEmpty(subPhoneNumber.replaceAll("-", ""))) {
        if(!regPhone2.test(subPhoneNumber)) {
            alert("휴대폰번호를 확인해주세요.");
            subMiddlePhoneNumber.focus();
            return false;
        }

        userInfoObject.subPhone = subPhoneNumber;
    }

    if(mainPhoneNumber != tempPhoneNumber) {
        if(!confirm(`입력하신 전화번호가\n${mainPhoneNumber}이 맞습니까?\n연락처가 틀린 경우 방문이 되지 않습니다.\n다시 한 번 확인해주세요.`)){
            return false;
        }

        tempPhoneNumber = mainPhoneNumber;
        userInfoObject.mainPhone = mainPhoneNumber;
    }
    removeVisibleClass(reservationDiv);
    activationStepTitle(stepTitleItems[2], stepTitleDivItems[2]);
    return true;
}

function checkReservationFlag() {
    if(!reservationFlag) {
        alert("예약날짜와 시간을 선택해주세요.");
        return false;
    }
    return reservationFlag;
}
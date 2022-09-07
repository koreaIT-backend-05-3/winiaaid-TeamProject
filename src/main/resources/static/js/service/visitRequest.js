const winia = document.querySelector(".li-winia");
const daewoo = document.querySelector(".li-daewoo");

const stepTitleItems = document.querySelectorAll(".step-title-div");

const modelSearchTr = document.querySelector(".model-search-tr");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const productNameTd = document.querySelector(".product-name-td");
const modelDetailSpan = document.querySelector(".model-result-span");
const modelCheckButtonList = document.querySelectorAll(".model-check-button-list button");
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
const mainTimeContent = document.querySelector(".main-time-content");
const reservationDiv = document.querySelector(".reservation-div");
const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

const stepLocks = document.querySelectorAll(".step-lock");
const modifyButton = document.querySelector(".modify-button button");
const requestButton = document.querySelector(".request-button");
const cancelButton = document.querySelector(".cancel-button");

let company = null;
let productCategoryTitle = null;

let tempPhoneNumber = null;

let nowDate = null;
let dateObject = {};
let selectReservationDay = null;

let reservationFlag = false;

winia.onclick = showWiniaProduct;


setNowDate();
setCalendarData();
setChangeMonthButton("pre");
setReservationableDaySpan();


modelCheckButtonList[0].onclick = () => {
    addVisibleClass(modelDetailSpan);
    toggleVisibleClass(modelSearchTr);
};

modelCheckButtonList[1].onclick = () => {
    addVisibleClass(modelSearchTr);
    toggleVisibleClass(modelDetailSpan);
    setModelName(modelDetailSpan, {productName: "모델명 모름"}, "buttonClick");

};

modelCheckButtonList[2].onclick = showModelNumberCheckPopup;



searchAddressButton.onclick = loadAddressPopup;


// function setAddress() {
//     const postalCode = document.querySelector(".postal-code");
//     const addressMain = document.querySelector(".address-main");
//     const addressDetail = document.querySelector(".address-detail");

//     new daum.Postcode({
//         oncomplete: function(data) {
            
//             let address = "";
//             let extraAddress = "";

//             if (data.userSelectedType === 'R') {
//                 address = data.roadAddress;
//             } else {
//                 address = data.jibunAddress;
//             }

//             postalCode.value = data.zonecode;
//             addressMain.value = address;

//             addressDetail.focus();

//         }
//     }).open();
    
// }


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
    // const detailProductUl = document.querySelector(".detail-product-ul");

    clearDomObject(swiperWrapper);
    
    // removeVisibleClass(detailProductUl);

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
                    <img src="/image/winia-product/category-images/product-category-${categoryInfo.categoryCode}.png" alt="${categoryInfo.categoryName}">
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
                            <img  src="/image/winia-product/detail-images/product-code-${productInfoList[startIndex].productCode}.png" alt="${productInfoList[startIndex].productName}">
                            <span>${productInfoList[startIndex].productName}</span>
                        </li>
                        `;
        }
        
        innerHTML += `</ul></div>`;
        domObject.innerHTML += innerHTML;
    }
    
    makeSwiper();
    checkSlideAmount();
    setImageClickEvent(document.querySelectorAll(".detail-product-ul img"), productInfoList[0].categoryCode);
    // productInfoList.forEach(detailProduct => {
    //     domObject.innerHTML += `
    //     <li>
    //         <img src="/image/winia-product/detail-images/product-code-${detailProduct.productCode}.png" alt="${detailProduct.productName}">
    //         <span>${detailProduct.productName}</span>
    //     </li>
    //     `;
    // });
}

function setGroupProductDetail(domObject, productInfoList) {

    let totalPage = productInfoList.length % 6 == 0 ? productInfoList.length / 6 : Math.floor(productInfoList.length / 6) + 1;

    console.log(domObject);
    console.log(totalPage);
    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 6 * i;
        let endIndex = i == totalPage - 1 ? productInfoList.length : startIndex + 6;

        console.log("startIndex: " + startIndex);
        console.log("endIndex: " + endIndex);

        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="detail-product-ul">`;
        
        for(startIndex; startIndex < endIndex; startIndex++) {
            let productInfo = getProductInfo(productInfoList[startIndex], 0);
            innerHTML += `
                <li class="product-category">
                    <img class="${productInfo.integratedFlag ? "integrated" : ""}" src="/image/winia-product/main-images/product-main-code-${productInfo.categoryCode}.png" alt="${productInfo.productName}">
                    <p class="category-title-${productInfo.categoryCode}">${productInfo.categoryName}</p>
                `;

            if(productInfo.integratedFlag) {
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

    setGroupImageClickEvent(groupImages);
    setProductClickEvent(productSpans);
}

function setGroupImageClickEvent(domObject) {
    domObject.forEach(object => {
        object.onclick = () => {
            if(object.classList.contains("integrated")) {
                let categoryCode = getCategoryCodeByDomObject(object, true);
                    
                setModelName(productNameTd, {"productName": object.getAttribute("alt"), "categoryCode": categoryCode}, "integrated");
            }else {
                setModelName(productNameTd, {"productName": null}, "integrated");
            }
        }
    })
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

function getProductInfo(productList, index) {
    return productList.readProductDetailResponseDtoList[index];
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

function setImageClickEvent(domObject, categoryCode) {
    domObject.forEach(object => {
        object.onclick = () => {
            let productDetailName = object.getAttribute("alt");

            setModelName(productNameTd, {"productName": productDetailName, "categoryCode": categoryCode}, "default");
        }
    })
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

function clearModelName(domObject) {
    domObject.innerHTML = "";
}

function checkRequireStep1() {

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

    nowDateDiv.innerHTML = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;
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
    }else {
        preMonthButton.classList.add("inactive-button");
        nextMonthButton.classList.remove("inactive-button");
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

function getTheUnbookableTime(day) {
    let unbookableTimeByEngineerList = null;

    let date = new Date(dateObject.year, dateObject.month - 1, day);
    
    date = date.getFullYear().toString() + (date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());

    selectReservationDay = date;

    console.log(date);
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/engineer/reservation/time`,
        dataType: "json",
        success: (response) => {
            unbookableTimeByEngineerList = response.data;
        },
        error: errorMessage
    });

    return unbookableTimeByEngineerList;
}

function setReservationTime(unbookableTimeByEngineerList) {
    clearMainTimeContent(mainTimeContent);

    for(engineer of unbookableTimeByEngineerList) {
        let engineerInfo = engineer.engineerReservationInfoDtoList[0];

        const newDl = document.createElement("dl");
        newDl.setAttribute("class", "engineer-content");

        let rawHTML = `
        <dl class="engineer-content">
            <dt>${engineerInfo.engineerName}</dt>
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

        const timeTables = document.querySelectorAll(`.time-table-${engineer.engineerReservationInfoDtoList[0].engineerCode} label`);

        let reservationListIndex = 0;

        let reservationDayList = new Array();

        engineer.engineerReservationInfoDtoList.forEach(info => {
            if(info.reservationDay.replaceAll("-", "") == selectReservationDay) {
                reservationDayList.push(info);
            }
        });

        console.log(reservationDayList);
        
        if(reservationDayList.length != 0) {
            for(timeTable of timeTables) {
                if(timeTable.textContent == reservationDayList[reservationListIndex].reservationTime) {
                    timeTable.classList.add("unbookable")
                    reservationListIndex++;
                }
                if(reservationListIndex == reservationDayList.length) {
                    break;
                }
            }
        }
        setReservationTimeClickEvent(timeTables, engineerInfo.engineerCode);
    }
    // test(document.querySelectorAll(".activation"));
    
    // setReservationTimeClickEvent(document.querySelectorAll(".activation"), 1);
}

function setReservationTimeClickEvent(reservationTimes, enginnerCode) {
    reservationTimes.forEach(time => {
        time.onclick = () => {
            selectTime(time, enginnerCode);
        }
    })
}

function clearMainTimeContent(mainTimeContent) {
    mainTimeContent.innerHTML = "";
}

function selectDay(day, object) {
    removeSelectDayClass();

    object.classList.add("select-day");

    setReservationTime(getTheUnbookableTime(day));
}

const mainConfirmDiv = document.querySelector(".main-confirm-div");

function selectTime(object, engineerCode) {
    if(!object.classList.contains("unbookable")) {
        removeSelectTimeClass();
        object.classList.add("select-time");
        removeVisibles(stepLocks);
        removeVisibleClass(mainConfirmDiv);
        reservationFlag = true;
    }
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

function checkRequireProductBrand() {
    if(company == null) {
        alert("예약신청 제품의 브랜드를 선택해주세요.");
        return false;
    }
    return true;
}

function checkRequireProductModel() {
    const modelNameSpan = document.querySelector(".model-name-span");

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

    const userInfoContent = document.querySelector(".user-info-content");
    removeVisibleClass(userInfoContent);

    return true;
}

function checkRequireInput() {
    const nameInput = document.querySelector(".name-input");

    const firstPhoneNumber = document.querySelector(".phone-box select");
    const middlePhoneNumber = document.querySelector(".middle-number");
    const lastPhoneNumber = document.querySelector(".last-number");

    let firstNumber = firstPhoneNumber.options[firstPhoneNumber.selectedIndex].value;
    let phoneNumber = firstNumber +"-"+ middlePhoneNumber.value +"-"+ lastPhoneNumber.value;

    let regPhone = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const secondFirstPhoneNumber = document.querySelector(".second-phone-box select");
    const secondMiddlePhoneNumber = document.querySelector(".second-phone-box .middle-number");
    const secondLastPhoneNumber = document.querySelector(".second-phone-box .last-number");

    let secondFirstNumber = secondFirstPhoneNumber.options[secondFirstPhoneNumber.selectedIndex].value;
    let secondNumber = secondFirstNumber +"-"+ secondMiddlePhoneNumber.value +"-"+ secondLastPhoneNumber.value;

    let regPhone2 = /^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/;

    const agreeConsentToUse = document.querySelector(".agree-consent-to-use-box")
    const agreeConsignmentProcessing = document.querySelector(".agree-consignment-processing-box");

    if(isEmpty(nameInput.value)) {
        alert("성명을 입력해 주세요.");
        nameInput.focus();
        return false;
    }else if(isEmpty(firstNumber) && isEmpty(middlePhoneNumber.value) && isEmpty(lastPhoneNumber.value)) {
        alert("휴대폰번호를 입력해주세요.");
        middlePhoneNumber.focus();
        return false;
    }else if(!regPhone.test(phoneNumber)) {
        alert("휴대폰번호를 확인해주세요.");
        middlePhoneNumber.focus();
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

    if(!isEmpty(firstEmail.value) || !isEmpty(secondEmail.value)) {
        let email = firstEmail.value + "@" + secondEmail.value;
        let regEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;

        if(!regEmail.test(email)) {
            alert("이메일 주소를 올바르게 입력해주세요.");
            firstEmail.focus();
            return false;
        }
    }else if(!isEmpty(secondNumber.replaceAll("-", ""))) {
        if(!regPhone2.test(secondNumber)) {
            alert("휴대폰번호를 확인해주세요.");
            secondMiddlePhoneNumber.focus();
            return false;
        }
    }

    if(phoneNumber != tempPhoneNumber) {
        if(!confirm(`입력하신 전화번호가\n${phoneNumber}이 맞습니까?\n연락처가 틀린 경우 방문이 되지 않습니다.\n다시 한 번 확인해주세요.`)){
            return false;
        }
        tempPhoneNumber = phoneNumber;
    }
    removeVisibleClass(reservationDiv);
    
    return true;
}

function checkReservationFlag() {
    if(!reservationFlag) {
        alert("예약날짜와 시간을 선택해주세요.");
        return false;
    }
    return reservationFlag;
}
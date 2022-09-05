const winia = document.querySelector(".li-winia");
const daewoo = document.querySelector(".li-daewoo");

const productNameTd = document.querySelector(".product-name-td");
const modelNameSpan = document.querySelector(".model-name-span");
const modelCheckButtonList = document.querySelectorAll(".model-check-button-list button");

const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

let company = null;

let nowDate = null;
let dateObject = {};
let selectReservationDay = null;


winia.onclick = showWiniaProduct;


setNowDate();
dateObject = setDateObject(dateObject);
insertCalendar(setCalendarDate(dateObject));
setChangeMonthButton("pre");
setReservationableDaySpan();


modelCheckButtonList[0].onclick = () => {
    const modelSearchTr = document.querySelector(".model-search-tr");

    removeVisibleClass(modelSearchTr);
};

modelCheckButtonList[1].onclick = () => {
    setModelName(modelNameSpan, "모델명 모름");

};

modelCheckButtonList[2].onclick = showModelNumberCheckPopup;

function setModelName(domObject, categoryTitle, modelName) {
    if(modelName == null) {
        domObject.textContent = categoryTitle;
    }else {
        clearModelName(modelNameSpan);
        productNameTd.innerHTML = `<span>${categoryTitle} > </span><span class="model-name-span">${modelName}</span>`;
    }
}




preMonthButton.onclick = setPreMonth;

nextMonthButton.onclick = setNextMonth;



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
            }
        },
        error: errorMessage
    });

}

function showProductList(productInfoList, isGroup) {
    // const detailProductUl = document.querySelector(".detail-product-ul");
    const swiperWrapper = document.querySelector(".swiper-wrapper");

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
                            <img src="/image/winia-product/detail-images/product-code-${productInfoList[startIndex].productCode}.png" alt="${productInfoList[startIndex].productName}">
                            <span>${productInfoList[startIndex].productName}</span>
                        </li>
                        `;
        }
        
        innerHTML += `</ul></div>`;
        domObject.innerHTML += innerHTML;
    }
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
                    <img src="/image/winia-product/main-images/product-main-code-${productInfo.categoryCode}.png" alt="${productInfo.productName}">
                    <p class="category-title-${productInfo.categoryCode}">${productInfo.categoryName}</p>
                `;

            if(productInfo.integratedFlag) {
                innerHTML += `</li>`;
                continue;
            }

            innerHTML += `<ul class="product-detail">`;
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






    // let innerHTML = "";
    // for(productList of productInfoList) {
    //     let index = 0;
    //     let productInfo = getProductInfo(productList, index);

    //     innerHTML += `
    //         <li class="product-category">
    //             <img src="/image/winia-product/main-images/product-main-code-${productInfo.categoryCode}.png" alt="${productInfo.productName}">
    //             <p class="category-title-${productInfo.categoryCode}">${productInfo.categoryName}</p>
    //         `;

    //         if(productInfo.integratedFlag) {
    //             innerHTML += `</li>`;
    //             domObject.innerHTML = innerHTML;
    //             continue;
    //         }
    //         innerHTML += `<ul class="product-detail">`;
    //         productList.readProductDetailResponseDtoList.forEach(detailProduct => {
    //             innerHTML += `
    //             <li>
    //                 <span class="product-category-${detailProduct.categoryCode}">${detailProduct.productName}</span>
    //             </li>
    //             `;
    //     });
    //     innerHTML += `</ul></li>`;
    //     domObject.innerHTML += innerHTML;

    // }
    const swiper = new Swiper(".swiper-container", {
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev'
        }
    });

    checkSlideAmount();

    const productSpans = document.querySelectorAll(".product-detail span");

    setProductClickEvent(productSpans);
}

function getProductInfo(productList, index) {
    return productList.readProductDetailResponseDtoList[index];
}

function removeVisibleClass(object) {
    object.classList.remove("visible");
}

function checkSlideAmount() {
    const swiperSlides = document.querySelectorAll(".swiper-slide");
    const swiperMoveDivs = document.querySelectorAll(".slide-div");
    if(swiperSlides.length > 1) {
        removeVisible(swiperMoveDivs);
    }else {
        addVisible(swiperMoveDivs);
    }
}

function addVisible(slideObjects) {
    slideObjects.forEach(object => object.add("visible"));
}

function removeVisible(slideObjects) {
    slideObjects.forEach(object => object.classList.remove("visible"));
}

function setCategoryClickEvent(productInfoList) {
    const categoryImages = document.querySelectorAll(".category-image-li img");

    for(let i = 0; i < productInfoList.length; i++){
        if(productInfoList[i].groupFlag) {
            categoryImages[i].onclick = () => {
                getProductDetail(productInfoList[i].productGroup, true);
                setModelName(productNameTd, productInfoList[i].categoryName);
            }
        }else {
            categoryImages[i].onclick = () => {
                getProductDetail(productInfoList[i].categoryCode, false);
                setModelName(productNameTd, productInfoList[i].categoryName);
            }
        }
    }
}

function setProductClickEvent(domObject) {

    domObject.forEach(object => {
        object.onclick = () => {
            let code = object.classList.item(0).substring(object.classList.item(0).lastIndexOf("-") + 1);
            
            const categoryTitle = document.querySelector(`.category-title-${code}`);
            setModelName(modelNameSpan, categoryTitle.textContent, object.textContent);
        }
    })
}

function clearModelName(domObject) {
    domObject.innerHTML = "";
}




function setNowDate() {
    const nowDateDiv = document.querySelector(".now-date");
    nowDate = new Date();

    nowDateDiv.innerHTML = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;
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

                calendar += `
                <div class=${blankCount == 0 
                    || blankCount % 7 == 0 ? "sunday"
                    : dayCount < dateObject.date
                    && nowDate.getDate > dayCount ? "past-day" 
                    :nowDate.getMonth() + 1 != dateObject.month 
                    && nowDate.getDate() < dayCount ? "future-day" 
                    : saturdayCount == 6 ? "saturday"
                    : "day-div"} onclick="selectDay(${dayCount})">${dayCount}
                  <div>`;

            }
            calendar += "</td>";
            blankCount++;
            saturdayCount++;
        }
        calendar += "</tr>";
    }

    return calendar;

}

function insertCalendar(calendar) {
    const calendarBody = document.querySelector(".calendar-body");

    calendarBody.innerHTML = calendar;
    
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
    const mainTimeContent = document.querySelector(".main-time-content");
    clearMainTimeContent(mainTimeContent);

    for(engineer of unbookableTimeByEngineerList) {
        console.log(engineer.engineerReservationInfoDtoList[0].engineerName);
        mainTimeContent.innerHTML += `
        <dl class="engineer-content">
            <dt>${engineer.engineerReservationInfoDtoList[0].engineerName}</dt>
                <dd class="time-table-${engineer.engineerReservationInfoDtoList[0].engineerCode}">
                    <label class="activation" onclick="selectTime(this)">09:00</label>
                    <label class="activation" onclick="selectTime(this)">09:30</label>
                    <label class="activation" onclick="selectTime(this)">10:00</label>
                    <label class="activation" onclick="selectTime(this)">10:30</label>
                    <label class="activation" onclick="selectTime(this)">11:00</label>
                    <label class="activation" onclick="selectTime(this)">11:30</label>
                    <label class="activation" onclick="selectTime(this)">13:00</label>
                    <label class="activation" onclick="selectTime(this)">13:30</label>
                    <label class="activation" onclick="selectTime(this)">14:00</label>
                    <label class="activation" onclick="selectTime(this)">14:30</label>
                    <label class="activation" onclick="selectTime(this)">15:00</label>
                    <label class="activation" onclick="selectTime(this)">15:30</label>
                    <label class="activation" onclick="selectTime(this)">16:00</label>
                    <label class="activation" onclick="selectTime(this)">16:30</label>
                    <label class="activation" onclick="selectTime(this)">17:00</label>
                    <label class="activation" onclick="selectTime(this)">17:30</label>
                </dd>
        </dl>
        `;

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
        
    }

}

function clearMainTimeContent(mainTimeContent) {
    mainTimeContent.innerHTML = "";
}

function selectDay(day) {
    setReservationTime(getTheUnbookableTime(day));
}

function selectTime(object) {
    if(!object.classList.contains("unbookable")) {
        console.log(object.textContent);
    }
}

function errorMessage(request, status, error) {
    alert("요청중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
const winia = document.querySelector(".li-winia");
const daewoo = document.querySelector(".li-daewoo");

const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

let nowDate = null;
let dateObject = {};
let selectReservationDay = null;


winia.onclick = showWiniaProduct;


setNowDate();
dateObject = setDateObject(dateObject);
insertCalendar(setCalendarDate(dateObject));
setChangeMonthButton("pre");
setReservationableDaySpan();


preMonthButton.onclick = setPreMonth;

nextMonthButton.onclick = setNextMonth;



function showWiniaProduct() {
    const serviceRequestDiv = document.querySelector(".service-request-div");

    alert("위니아 제품이 맞습니까?\n아닐경우 방문이 되지 않습니다.\n제조사를 다시 한번 확인해 주세요.");

    let categoryInfoList = getMainCategoryList();
    showMainCategory(categoryInfoList);
    removeVisibleClass(serviceRequestDiv);
}

function getMainCategoryList() {
    let categoryInfoList = null;
    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/product/list/category",
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

    setProductImages(categoryImageUl, categoryInfoList, "mainCategory");

}

function clearDomObject(object) {
    object.innerHTML = "";
}

function setProductImages(domObject, productInfoList, type) {
    if(type == "mainCategory") {
        productInfoList.forEach(categoryInfo => {
            domObject.innerHTML += `
            <li class="category-image-li">
                <div>
                    <img onclick="getProductDetail(${categoryInfo.categoryCode})" src="/image/winia-product/category-images/product-category-${categoryInfo.categoryCode}.png" alt="${categoryInfo.categoryName}">
                </div>
            </li>
            `;
        });
    }else if(type == "detailProduct") {
        productInfoList.forEach(detailProduct => {
            domObject.innerHTML += `
            <li>
                <img src="/image/winia-product/detail-images/product-code-${detailProduct.productCode}.png" alt="${detailProduct.productName}">
                <span>${detailProduct.productName}</span>
            </li>
            `;
        });
    }
}

function getProductDetail(code) {
    let productInfoList = null;
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/default/${code}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                showProductList(response.data);
            }
        },
        error: errorMessage
    });

}

function showProductList(productInfoList) {
    const detailProductUl = document.querySelector(".detail-product-ul");

    clearDomObject(detailProductUl);
    
    removeVisibleClass(detailProductUl);

    setProductImages(detailProductUl, productInfoList, "detailProduct");
}


function removeVisibleClass(object) {
    object.classList.remove("visible");
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
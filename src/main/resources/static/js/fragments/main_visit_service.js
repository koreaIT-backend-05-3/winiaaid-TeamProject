const uri = location.pathname;

const stepTitleItems = document.querySelectorAll(".step-title-div");
const stepTitleDivItems = document.querySelectorAll(".step-div");

const checkLastReqeustButton = document.querySelector(".check-last-request-list-button");

let categoryImages = null;
let modelNameSpan = document.querySelector(".model-name-span");
const modelSearchTr = document.querySelector(".model-search-tr");
const modelResult = document.querySelector(".model-result");
const modelResultUl = document.querySelector(".model-result ul");
const productNameTd = document.querySelector(".product-name-td");
const modelDetailSpan = document.querySelector(".model-result-span");
const modelCheckButtonList = document.querySelectorAll(".model-check-button-list button");
const modelSearchInput = document.querySelector(".model-search-input");
const modelSearchButton = document.querySelector(".model-search-button");
const troubleSymptomTd = document.querySelector(".trouble-symptom-td select");
const descriptionInput = document.querySelector(".description-input");

const userInfoContent = document.querySelector(".user-info-content");
const nameInput = document.querySelector(".name-input");
const mainFirstPhoneNumber = document.querySelector(".phone-box select");
const mainPhoneNumberOptionItems = mainFirstPhoneNumber.querySelectorAll("option");
const mainMiddlePhoneNumber = document.querySelector(".middle-number");
const mainLastPhoneNumber = document.querySelector(".last-number");
const subFirstPhoneNumber = document.querySelector(".sub-phone-box select");
const subMiddlePhoneNumber = document.querySelector(".sub-phone-box .middle-number");
const subLastPhoneNumber = document.querySelector(".sub-phone-box .last-number");
const firstEmail = document.querySelector(".email-1");
const secondEmail = document.querySelector(".email-2");
const emailBoxSelect = document.querySelector(".email-box select")

const searchAddressButton = document.querySelector(".search-address-button");
const postalCodeInput = document.querySelector(".postal-code");
const mainAddressInput = document.querySelector(".main-address");
const detailAddressInput = document.querySelector(".detail-address");
const defaultAddressInput = document.querySelector(".default-address-input");
const pastAddressInput = document.querySelector(".past-address-input");
const agreeConsentToUse = document.querySelector(".agree-consent-to-use-box")
const agreeConsignmentProcessing = document.querySelector(".agree-consignment-processing-box");


let dayDivItems = null;
let timeTables = null;
const mainTimeContent = document.querySelector(".main-time-content");
const reservationDiv = document.querySelector(".reservation-div");
const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

const mainConfirmDiv = document.querySelector(".main-confirm-div");
const stepLocks = document.querySelectorAll(".step-lock");
const modifyButton = document.querySelector(".modify-button button");
const requestButton = document.querySelector(".request-button");
const cancelButton = document.querySelector(".cancel-button");


let tempPhoneNumber = null;

let nowDate = null;
let dateObject = {};
let selectReservationDay = null;

let historyDataFlag = false;
let reservationFlag = false;

let pastHistoryInfoObject = null;
let reservatedDayFlag = false;


let userInfoObject = {
    "userCode": userCode,
    "userName": null,
    "email": null,
    "mainPhoneNumber": null,
    "subPhoneNumber": null,
    "postalCode": 0,
    "mainAddress": null,
    "detailAddress": null
};

let reservationInfoObject = {
    "engineerCode": 0,
    "reservationDay": null,
    "reservationTime": null,
    "serviceType": null
};


setNowDate();
setCalendarData();
setChangeMonthButton("pre");
setReservationableDaySpan();

setSigninUserView();
checkLocalStorageHasPastRequetsServiceData();

function setSigninUserView() {
    if(userCode != 0) {
        const checkLastRequestListDiv = document.querySelector(".check-last-request-list-div");
        const addressTd = document.querySelector(".address-td");
        const addressButton = document.querySelector(".address-button");
    
        mainAddressInput.classList.add("main-address-user-view");
        detailAddressInput.classList.add("detail-address-user-view");
        addressTd.setAttribute("colspan", 1);
        removeVisibleClass(checkLastRequestListDiv);
        removeVisibleClass(addressButton);

        setDefaultUserInfo(user);
    }
}

function setDefaultUserInfo(user) {
    const mainFirstPhoneNumberOptionItems = document.querySelectorAll(".phone-box select option");
    const subFirstPhoneNumberOptionItems = document.querySelectorAll(".sub-phone-box select option");

    let mainPhoneNumber = user.mainPhoneNumber;
    let subPhoneNumber = user.subPhoneNumber;

    nameInput.value = user.userName;
    setReadOnly(nameInput);

    setFirstPhoneNumber(mainFirstPhoneNumberOptionItems, mainPhoneNumber);
    setDisabled(mainFirstPhoneNumber);

    setMiddlePhoneNumber(mainMiddlePhoneNumber, mainPhoneNumber);
    setReadOnly(mainMiddlePhoneNumber);
    setLastPhoneNumber(mainLastPhoneNumber, mainPhoneNumber);
    setReadOnly(mainLastPhoneNumber);

    setFirstEmail(firstEmail, user.userEmail);
    setReadOnly(firstEmail);

    setLastEmail(secondEmail, user.userEmail);
    setReadOnly(secondEmail);

    setDisabled(emailBoxSelect);
    
    setAddressInfo(user);

    if(subPhoneNumber != null) {
        setFirstPhoneNumber(subFirstPhoneNumberOptionItems, subPhoneNumber);
        setDisabled(subFirstPhoneNumber);
    
        setMiddlePhoneNumber(subMiddlePhoneNumber, subPhoneNumber);
        setReadOnly(subMiddlePhoneNumber);
        setLastPhoneNumber(subLastPhoneNumber, subPhoneNumber);
        setReadOnly(subLastPhoneNumber);
    };
}

function setReadOnly(input) {
    input.setAttribute("readonly", true);
}

function setDisabled(select) {
    select.setAttribute("disabled", true);
}


checkLastReqeustButton.onclick = loadPastRequestInfoPopup;

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

defaultAddressInput.onclick = isCheckedDefatulAddressRadioInput;
pastAddressInput.onclick = isCheckedPastAddressRadioInput;

// function isModifyPage() {
//     return uri.contains("updateView");
// }

function isCheckedDefatulAddressRadioInput() {
    if(defaultAddressInput.checked) {
        setAddressInfo(user);
    }
}

function isCheckedPastAddressRadioInput() {
    if(pastAddressInput.checked) {
        loadPastAddressListInfoPopup();
    }
}


preMonthButton.onclick = setPreMonth;

nextMonthButton.onclick = setNextMonth;

stepTitleItems[0].onclick = checkRequireProductBrand;

stepTitleItems[1].onclick = () => {
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModelAndSaveProductInfo()) {
        return
    }
}

stepTitleItems[2].onclick = () =>{
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModelAndSaveProductInfo()) {
        return
    }else if(!checkRequireInputAndSaveUserInfo()) {
        return
    }
}

stepTitleItems[3].onclick = () => {
    if(!checkRequireProductBrand()) {
        return
    }else if(!checkRequireProductModelAndSaveProductInfo()) {
        return
    }else if(!checkRequireInputAndSaveUserInfo()) {
        return
    }else if(!checkReservationFlagAndSaveReservationInfo()) {
        return
    }
}

modifyButton.onclick = requestDivActivation;

requestButton.onclick = requestSubmit;

cancelButton.onclick = goHistoryBack;

function goHistoryBack() {
    history.back();
}

function requestSubmit() {
    if(modifyFlag) {
        reservationInfoModify();

    }else {
        reservationRequest();
    }
}

function reservationInfoModify() {
    productInfoObject.serviceCode = serviceCode;

    $.ajax({
        type: "put",
        url: `/api/v1/service/repair/modify/${serviceCode}`,
        contentType: "application/json",
        data: JSON.stringify({
            "productInfoObject": productInfoObject,
            "userInfoObject": userInfoObject,
            "reservationInfoObject": reservationInfoObject
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("예약 날짜가 변경되었습니다.");
                location.replace(`/service/visit/inquiry/detail/${serviceCode}`);
            }else {
                alert("예약 정보 변경중 오류가 발생했습니다.");
            }
        },
        error: errorMessage
    });
}

function reservationRequest() {
    $.ajax({
        type: "post",
        url: "/api/v1/service/visit/request",
        contentType: "application/json",
        data: JSON.stringify({
            "productInfoObject": productInfoObject,
            "userInfoObject": userInfoObject,
            "reservationInfoObject": reservationInfoObject
        }),
        dataType: "json",
        success: (response) => {
            if(response.data) {
                alert("서비스 신청 성공");
                if(userCode == 0) {
                    localStorage.serviceRequestData = JSON.stringify(response.data);
                    location.replace(`/service/visit/inquiry/detail/${response.data.serviceCode}`);


                }else {
                    location.replace(`/service/visit/inquiry/detail/${response.data.serviceCode}`);

                }
            }else {
                alert("서비스 신청중에 오류가 발생했습니다.");
            }
        },
        error: errorMessage
    });
}


/*>>>>>>>>>>>>>>>>> STEP 1 <<<<<<<<<<<<<<<<<<<<<<<<*/ 


function getProductTroubleSymptom(productCategoryCode) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/trouble/category/${productCategoryCode}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                setProductTroubleSymptom(response.data);
            }
        },
        error: errorMessage
    });
}

function setProductTroubleSymptom(troubleSymptomList) {
    initializationTroubleSymptom();

    troubleSymptomList.forEach(trouble => {
        troubleSymptomTd.innerHTML += `
        <option value="${trouble.troubleCode}">${trouble.troubleSymptom}</option>
        `;
    });
}

function toggleVisibleClass(object) {
    object.classList.toggle("visible");
}

function initializationTroubleSymptom() {
    troubleSymptomTd.innerHTML = `<option value="0">선택</option>`;
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
        url: `/api/v1/product/model/list/${modelSearchInput.value}?requestType=repair&code=${productInfoObject.productCode}`,
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

    setModelClickEvent(modelNumberItems, modelNameList);

}

function setModelClickEvent(modelNumberItems, modelNameList) {
    for(let i = 0; i < modelNumberItems.length; i++) {
        modelNumberItems[i].onclick = () => {
            modelDetailSpan.innerHTML = modelNumberItems[i].textContent;
            productInfoObject.modelCode = modelNameList[i].modelCode;
            removeVisibleClass(modelDetailSpan);
        }
    }
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

    if(modifyFlag) {
        reservatedDayFlag = selectReservationDay == pastHistoryInfoObject.reservationDay.replaceAll("-", "");
    }

    console.log(date);
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/engineer/reservation/${selectReservationDay}/time`,
        dataType: "json",
        success: (response) => {
            unbookableTimeByEngineerList = response.data;
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
    
    if(unbookableTimeByEngineerList != null) {
        for(engineerReservationInfo of unbookableTimeByEngineerList) {
            timeTables = document.querySelectorAll(`.time-table-${engineerReservationInfo.engineerCode} label`);
            
            for(reservationTime of engineerReservationInfo.reservationTimeList) {
                for(timeTable of timeTables) {
                    if(reservationTime == timeTable.textContent) {
                        timeTable.classList.add("unbookable");
                        break;
                    }

                }
            }
            if(reservatedDayFlag) {
                if(engineerReservationInfo.engineerCode == pastHistoryInfoObject.engineerCode) {
                    console.log(pastHistoryInfoObject.engineerCode);
                    for(timeTable of timeTables) {
                        console.log(pastHistoryInfoObject.reservationTime);
                        if(timeTable.textContent == pastHistoryInfoObject.reservationTime) {
                            timeTable.classList.remove("unbookable");
                        }
                    }
                }

            }
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
}

function selectTime(object, engineerInfo) {
    if(!object.classList.contains("unbookable")) {
        reservationFlag = true;
        if(checkAllRequireItems()){
            removeSelectTimeClass();
            object.classList.add("select-time");
            removeVisibles(stepLocks);
            removeVisibleClass(mainConfirmDiv);
    
            reservationInfoObject.reservationTime = object.textContent;
            reservationInfoObject.engineerCode = engineerInfo.engineerCode;
            reservationInfoObject.engineerName = engineerInfo.engineerName;
    
            activationStepTitle(stepTitleItems[3], stepTitleDivItems[3]);
            
            setFinalInfo();

        }else {
            reservationFlag = false;
        }
    }
}


function setFinalInfo() {
    setProductInfo();
    setUserInfo();
    setReservationInfo()
}

function setProductInfo() {
    const productInfo = document.querySelector(".product-info");
    const troubleSymptomInfo = document.querySelector(".trouble-symptom-info");

    productInfo.textContent = `${modelNameSpan.textContent}/ ${modelDetailSpan.textContent}`;
    troubleSymptomInfo.textContent = `${troubleSymptomTd.options[troubleSymptomTd.selectedIndex].text}`;

}

function setUserInfo() {
    const nameInfo = document.querySelector(".name-info");
    const mainPhoneNumberInfo = document.querySelector(".main-phone-number-info");
    const addressInfo = document.querySelector(".address-info");

    nameInfo.textContent = `${userInfoObject.userName}`;
    mainPhoneNumberInfo.textContent = `${userInfoObject.mainPhoneNumber}`;
    addressInfo.textContent = `${userInfoObject.mainAddress} ${userInfoObject.detailAddress}`;

    if(!isEmpty(userInfoObject.email)){
        const emailInfo = document.querySelector(".email-info");

        emailInfo.textContent = `${userInfoObject.email}`;
    }
    if(!isEmpty(userInfoObject.subPhoneNumber)) {
        const subPhoneNumberInfo = document.querySelector(".sub-phone-number-info");

        subPhoneNumberInfo.textContent = `${userInfoObject.subPhoneNumber}`;
    }
}

function setReservationInfo() {
    const reservationInfo = document.querySelector(".reservation-info")
    const reservationEngineerInfo = document.querySelector(".reservation-engineer-info");

    reservationInfo.textContent = `${reservationInfoObject.reservationDay} ${reservationInfoObject.reservationTime}`;
    reservationEngineerInfo.textContent = `${reservationInfoObject.engineerName}님/ 부산점`;
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


/*>>>>>>>>>>>>>>>>> 이전 접수 목록 불러오기 <<<<<<<<<<<<<<<<<<<*/

function checkLocalStorageHasPastRequetsServiceData(){
    pastHistoryInfoObject = localStorage.pastHistoryInfoObject;
    localStorage.removeItem("pastHistoryInfoObject");
    if(pastHistoryInfoObject != null) {
        pastHistoryInfoObject = JSON.parse(pastHistoryInfoObject);

        historyDataFlag = true;
        pastHistoryInfoObject.companyCode == 1 ? daewoo.click() : winia.click();
        pastRequestServiceDataLoad(pastHistoryInfoObject);
    }
}

function changeUpdateView() {
    pastHistoryInfoObject = localStorage.pastHistoryInfoObject;
    localStorage.removeItem("pastHistoryInfoObject");
    if(pastHistoryInfoObject != null) {
        modifyFlag = true;
        pastHistoryInfoObject = JSON.parse(pastHistoryInfoObject);

        historyDataFlag = true;
        pastHistoryInfoObject.companyCode == 1 ? daewoo.click() : winia.click();
        pastRequestServiceDataLoad(pastHistoryInfoObject);
    }
}

function savePastRequestServiceDataToLocalStorageAndReplacePage(pastHistoryInfoObject) {
    localStorage.pastHistoryInfoObject = JSON.stringify(pastHistoryInfoObject);

    location.replace("/service/visit/request");
}

function pastRequestServiceDataLoad(pastHistoryInfoObject) {
    pastRequestServiceCategoryLoad(pastHistoryInfoObject);
    pastRequestServiceDetailProductLoad(pastHistoryInfoObject);
    pastRequestServiceModelNumberLoad(pastHistoryInfoObject);
    pastRequestServiceTroubleSymptomLoad(pastHistoryInfoObject);
    pastRequestServiceDescriptionLoad(pastHistoryInfoObject);

    removeVisibleClass(userInfoContent);

    pastRequestServiceUserInfoLoad(pastHistoryInfoObject);
}

function pastRequestServiceCategoryLoad(pastHistoryInfoObject) {
    categoryImages = document.querySelectorAll(".category-image-li img");
    for(categoryImage of categoryImages) {
        if(categoryImage.getAttribute("alt") == pastHistoryInfoObject.productCategoryName) {
            categoryImage.click();
            break;
        }else if(categoryImage.getAttribute("alt") == pastHistoryInfoObject.productGroupName) {
            categoryImage.click();
            break;
        }
    }
}

function pastRequestServiceDetailProductLoad(pastHistoryInfoObject) {
    const productDetailNameItems= document.querySelectorAll(".detail-product-name");
    const productDetailImageItems = document.querySelectorAll(".product-detail-image");

    for(productDetailImage of productDetailImageItems) {
        if(productDetailImage.getAttribute("alt") == pastHistoryInfoObject.productDetailName) {

            productDetailImage.click();
            return;
        }
    }    
    for(productDetailName of productDetailNameItems) {
        if(productDetailName.textContent == pastHistoryInfoObject.productDetailName) {
            productDetailName.click();
            return;
        }
    }  
}

function pastRequestServiceModelNumberLoad(pastHistoryInfoObject) {
    clearDomObject(modelDetailSpan);
    removeVisibleClass(modelDetailSpan);
    modelDetailSpan.innerHTML = "모델명 " + pastHistoryInfoObject.productModelNumber;
}

function pastRequestServiceTroubleSymptomLoad(pastHistoryInfoObject) {
    const troubleSymptomItems = document.querySelectorAll(".trouble-symptom-td option");

    for(troubleSymptom of troubleSymptomItems) {
        if(troubleSymptom.value == pastHistoryInfoObject.troubleCode) {
            troubleSymptom.setAttribute("selected", true);
        }
    }
}

function pastRequestServiceDescriptionLoad(pastHistoryInfoObject) {
    descriptionInput.value = pastHistoryInfoObject.description;
}

function pastRequestServiceUserInfoLoad(pastHistoryInfoObject) {
    nameInput.value = pastHistoryInfoObject.userName;

    setFirstPhoneNumber(mainPhoneNumberOptionItems, pastHistoryInfoObject.mainPhoneNumber);
    setMiddlePhoneNumber(mainMiddlePhoneNumber, pastHistoryInfoObject.mainPhoneNumber);
    setLastPhoneNumber(mainLastPhoneNumber, pastHistoryInfoObject.mainPhoneNumber);
    
    if(pastHistoryInfoObject.subPhoneNumber != null) {
        const subPhoneNumberOptionItems = subFirstPhoneNumber.querySelectorAll("option");
       
        setFirstPhoneNumber(subPhoneNumberOptionItems, pastHistoryInfoObject.subPhoneNumber);
        setMiddlePhoneNumber(subMiddlePhoneNumber, pastHistoryInfoObject.subPhoneNumber);
        setLastPhoneNumber(subLastPhoneNumber, pastHistoryInfoObject.subPhoneNumber);

    }

    if(pastHistoryInfoObject.email != null) {
        setFirstEmail(firstEmail, pastHistoryInfoObject.email);
        setLastEmail(secondEmail, pastHistoryInfoObject.email);
    }

    setAddressInfo(pastHistoryInfoObject);
    agreeCheckBox();
    removeVisibleClass(reservationDiv);
}

function agreeCheckBox() {
    agreeConsentToUse.setAttribute("checked", true);
    agreeConsignmentProcessing.setAttribute("checked", true);
}

function setFirstPhoneNumber(optionItems, phoneNumber) {
    let firstPhoneNumber = phoneNumber.substring(0, phoneNumber.indexOf("-"));
    
    for(optionItem of optionItems) {
        if(optionItem.value == firstPhoneNumber) {
            optionItem.setAttribute("selected", true);
            break;
        }
    }
}

function setMiddlePhoneNumber(phoneNumberInput, phoneNumber) {
    let middlePhoneNumber = phoneNumber.substring(phoneNumber.indexOf("-") + 1, phoneNumber.lastIndexOf("-"));
    phoneNumberInput.value = middlePhoneNumber;
}

function setLastPhoneNumber(phoneNumberInput, phoneNumber) {
    let lastPhoneNumber = phoneNumber.substring(phoneNumber.lastIndexOf("-") + 1);
    phoneNumberInput.value = lastPhoneNumber;
}

function setFirstEmail(emailInput, email) {
    emailInput.value = email.substring(0, email.indexOf("@"))
}

function setLastEmail(emailInput, email) {
    emailInput.value = email.substring(email.lastIndexOf("@") + 1);
}

function setAddressInfo(object) {
    postalCodeInput.value = object.postalCode;
    mainAddressInput.value = object.mainAddress;
    detailAddressInput.value = object.detailAddress;
}


/* >>>>>>>>>>>>>>>>>>>>>>>>> 체크 <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function checkRequireProductBrand() {
    if(company == null) {
        alert("예약신청 제품의 브랜드를 선택해주세요.");
        return false;
    }
    return true;
}


function checkRequireProductModelAndSaveProductInfo() {
    const modelTitleSpan = document.querySelector(".model-title-span");
    modelNameSpan = document.querySelector(".model-name-span");
    if(isEmpty(modelNameSpan.textContent)) {
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

    productInfoObject.troubleCode = troubleSymptomTd.options[troubleSymptomTd.selectedIndex].value;
    productInfoObject.description = descriptionInput.value;

    removeVisibleClass(userInfoContent);
    activationStepTitle(stepTitleItems[1], stepTitleDivItems[1]);
    return true;
}



function checkRequireInputAndSaveUserInfo() {
    let mainFirstNumber = mainFirstPhoneNumber.options[mainFirstPhoneNumber.selectedIndex].value;
    let mainPhoneNumber = mainFirstNumber +"-"+ mainMiddlePhoneNumber.value +"-"+ mainLastPhoneNumber.value;

    let regPhone = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;


    let subFirstNumber = subFirstPhoneNumber.options[subFirstPhoneNumber.selectedIndex].value;
    let subPhoneNumber = subFirstNumber +"-"+ subMiddlePhoneNumber.value +"-"+ subLastPhoneNumber.value;

    let regPhone2 = /^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/;
    
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

    userInfoObject.userName = nameInput.value;
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
    }
    if(!isEmpty(subPhoneNumber.replaceAll("-", ""))) {
        if(!regPhone2.test(subPhoneNumber)) {
            alert("휴대폰번호를 확인해주세요.");
            subMiddlePhoneNumber.focus();
            return false;
        }

        userInfoObject.subPhoneNumber = subPhoneNumber;
    }

    if(mainPhoneNumber != tempPhoneNumber) {
        if(!confirm(`입력하신 전화번호가\n${mainPhoneNumber}이 맞습니까?\n연락처가 틀린 경우 방문이 되지 않습니다.\n다시 한 번 확인해주세요.`)){
            return false;
        }

        tempPhoneNumber = mainPhoneNumber;
        userInfoObject.mainPhoneNumber = mainPhoneNumber;
    }
    removeVisibleClass(reservationDiv);
    activationStepTitle(stepTitleItems[2], stepTitleDivItems[2]);
    return true;
}

function checkReservationFlagAndSaveReservationInfo() {
    if(!reservationFlag) {
        alert("예약날짜와 시간을 선택해주세요.");
        return false;
    }
    
    reservationInfoObject.serviceType = "방문서비스 (A/S)";
    return reservationFlag;
}

function checkAllRequireItems() {
    if(!checkRequireProductBrand()) {
        return false;
    }else if(!checkRequireProductModelAndSaveProductInfo()) {
        return false;
    }else if(!checkRequireInputAndSaveUserInfo()) {
        return false;
    }else if(!checkReservationFlagAndSaveReservationInfo()) {
        return false;
    }
    return true;
}
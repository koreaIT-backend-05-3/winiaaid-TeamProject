const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

let nowDate = null;
let dateObject = {};
let selectReservationDay = null;

setNowDate();
dateObject = setDateObject(dateObject);
insertCalendar(setCalendarDate(dateObject));
setChangeMonthButton("pre");
setReservationableDaySpan();

preMonthButton.onclick = setPreMonth;

nextMonthButton.onclick = setNextMonth;

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
    console.log("전체 들고옴: " + unbookableTimeByEngineerList);
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
            console.log("확인: " + info.reservationDay);
            console.log("selectReservationDay: " + selectReservationDay);
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
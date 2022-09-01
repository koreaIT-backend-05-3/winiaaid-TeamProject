const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

let nowDate = null;
let dateObject = {};

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
    let nextMonth = new Date();
    let blankCount = 0;
    let dayCount = 0;
    let sundayCheck = 0;

    let inacticeFlag = false;
    
    let calendar = "";
    
    for(let i = 0; i < dateObject.weekCount; i++) {
        calendar += "<tr>";
    
        for(let j = 0; j < 7; j++) {
    
            calendar += "<td>";
            if(dateObject.monthStartDay < blankCount + 2 && dayCount < dateObject.monthLastDay + 1) {
                
                calendar += `
                <div class=${dayCount == 0 ? "" 
                : sundayCheck == 0 
                || sundayCheck % 7 ==0 ? "sunday-day" :
                 dayCount < dateObject.day ? "past-day" :
                  nowDate.getMonth() + 1 != dateObject.month 
                  && nowDate.getDate() < dayCount ? "future-day" 
                  : "day-div"}>${dayCount == 0 ? "" 
                  : dayCount}
                  <div>`;

                dayCount++; 
            }
            calendar += "</td>";
            blankCount++;
            sundayCheck++;
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
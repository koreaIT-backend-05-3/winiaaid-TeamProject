const preMonthButton = document.querySelector(".pre-month-button");
const nextMonthButton = document.querySelector(".next-month-button");

let date = null;
let dateObject = {};

setNowDate();
dateObject = setDateObject();
insertCalendar(setCalendarDate(dateObject));

preMonthButton.onclick = setPreMonth;

nextMonthButton.onclick = setNextMonth;

function setNowDate() {
    const nowDate = document.querySelector(".now-date");
    date = new Date();

    nowDate.innerHTML = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

function setChangeMonthButton() {

}

function setNextMonth() {
    alert("클릭");
    dateObject.month = dateObject.month + 1;
    insertCalendar(setCalendarDate(dateObject));
}

function setPreMonth() {
    alert("클릭");
    dateObject.month = dateObject.month - 1;
    insertCalendar(setCalendarDate(dateObject));
}


function setDateObject() {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let monthStartDay = new Date(year, month - 1, 1).getDay();
    let monthLastDay = new Date(year, month, 0).getDate();
    let weekCount = Math.ceil((monthStartDay + monthLastDay) / 7);

    let dateObject = {};

    dateObject.year = year;
    dateObject.month = month;
    dateObject.day = day;
    dateObject.monthStartDay = monthStartDay;
    dateObject.monthLastDay = monthLastDay;
    dateObject.weekCount = weekCount;

    return dateObject;
}

function setCalendarDate(dateObject) {
    let blankCount = 0;
    let dayCount = 0;
    let sundayCheck = 0;
    
    let calendar = "";
    
    for(let i = 0; i < dateObject.weekCount; i++) {
        calendar += "<tr>";
    
        for(let j = 0; j < 7; j++) {
    
            calendar += "<td>";
            if(dateObject.monthStartDay < blankCount + 2 && dayCount < dateObject.monthLastDay + 1) {
                calendar += `<div class=${dayCount == 0 ? "" : sundayCheck == 0 || sundayCheck % 7 ==0 ? "sunday-div" : dayCount < dateObject.day ? "past-day" : "day-div"}>${dayCount == 0 ? "" : dayCount}<div>`;
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
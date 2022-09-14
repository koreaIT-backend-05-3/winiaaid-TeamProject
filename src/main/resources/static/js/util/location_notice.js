setLocationNotice();

function setLocationNotice() {
    const locationDiv = document.querySelector(".location-div");

    let uri = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    if(uri == "inquiry" || uri == "detail") {
        locationDiv.innerHTML = `
        <i class="fa-solid fa-house"></i>
        <ul>
            <li class="location-li">
                <span>서비스 신청/변경</span>
            </li>
            <li class="location-li">
                <span>방문서비스 조회/변경/취소</span>
            </li>
        </ul>`;
    }else if(uri == "request") {
        locationDiv.innerHTML = `
        <i class="fa-solid fa-house"></i>
        <ul>
            <li class="location-li">
                <span>서비스 신청/변경</span>
            </li>
            <li class="location-li">
                <span>방문서비스 신청</span>
            </li>
        </ul>`;
        
    }
    
    setHomeImageClickEvent();
}

function setHomeImageClickEvent() {
    const homeImage = document.querySelector(".fa-house");
    homeImage.onclick = loadMainPage;
}

function loadMainPage() {
    location.href = "/main";
}
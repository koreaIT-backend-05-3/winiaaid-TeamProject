setLocationNotice();

function setLocationNotice() {
    const locationDiv = document.querySelector(".location-div");

    let uri = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    if(uri == "inquiry" || uri == "detail") {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                    <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                서비스 신청/변경
            </li>
            <li class="location-li">
                방문서비스 조회/변경/취소
            </li>
        </ul>`;
    }else if(uri == "request" || "updateView") {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                    <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            	</li>
            <li class="location-li">
                서비스 신청/변경
            </li>
            <li class="location-li">
                방문서비스 신청
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
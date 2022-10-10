setLocationNotice();

function setLocationNotice() {
    const locationDiv = document.querySelector(".location-div");


    if(isInclude("service/visit/inquiry") || isInclude("service/visit/detail")) {
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
    }else if(isInclude("service/visit/request") || isInclude("service/request/update-view")) {
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
        
    }else if(isInclude("solution/faq/list")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                간편해결
            </li>
            <li class="location-li">
                자주하는 질문
            </li>
        </ul>`;
    }else if(isInclude("solution/self-check/list")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                간편해결
            </li>
            <li class="location-li">
                자가진단
            </li>
        </ul>`;
    }else if(isInclude("mypage/service/history/")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                마이페이지
            </li>
            <li class="location-li">
                서비스 이력
            </li>
        </ul>`;
    }else if(isInclude("mypage/writing/")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                마이페이지
            </li>
            <li class="location-li">
                나의 글보기
            </li>
        </ul>`;
    }else if(isInclude("signin")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                로그인
            </li>
        </ul>`;
    }else if(isInclude("customer/praise")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                고객의소리
            </li>
            <li class="location-li">
                칭찬합니다
            </li>
        </ul>`;
    }else if(isInclude("customer/complaint")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                고객의소리
            </li>
            <li class="location-li">
                불편합니다
            </li>
        </ul>`;
    }else if(isInclude("customer/suggestion")) {
        locationDiv.innerHTML = `
        <ul>
        	<li class="home">
                <a href="/main"><img src="/static/images/icon_home.png" alt="메인페이지"></a>
            </li>
            <li class="location-li">
                고객의소리
            </li>
            <li class="location-li">
                제안합니다
            </li>
        </ul>`;
    }
}

function isInclude(customUri) {
    let uri = location.pathname;

    return uri.indexOf(customUri) != -1;
}
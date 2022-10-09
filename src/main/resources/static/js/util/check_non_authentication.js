let authenticationInfo = null;
authenticationInfo = getAuthenticationRequestDataInLocalStorage();

checkNonAuthentication();

function getAuthenticationRequestDataInLocalStorage() {

    if(isInclude("/visit/inquiry/detail") || isInclude("/recall/request/complete") || isInclude("/recall/inquiry/detail") || isInclude("/visit/request/update-view")) {
        authenticationInfo = localStorage.serviceAuthenticationInfo;
        
    }else {
        authenticationInfo = localStorage.boardAuthenticationInfo;

    }
    
    if(authenticationInfo != null) {
        authenticationInfo = JSON.parse(authenticationInfo);
    }

    return authenticationInfo;
}


function checkNonAuthentication() {
    if(userCode == 0 && authenticationInfo == null && !isInclude("regist-view")) {
        alert("잘못된 접근입니다.");
        location.replace("/main");
    }
}



function getUserNameByAuthenticationInfo() {
    let userName = null;

    if(authenticationInfo != null) {
        userName = authenticationInfo.userName;
    }

    return userName;
}

function getAuthenticationNumberByAuthenticationInfo() {
    let authenticationNumber = null;

    if(authenticationInfo != null) {
        authenticationNumber = authenticationInfo.authenticationNumber;
    }

    return authenticationNumber;
}

function getMainPhoneNumberByAuthenticationInfo() {
    let mainPhoneNumber = null;

    if(authenticationInfo != null) {
        mainPhoneNumber = authenticationInfo.mainPhoneNumber;
    }

    return mainPhoneNumber;
}

function isInclude(customUri) {
    let uri = location.pathname;

    return uri.indexOf(customUri) != -1;
}
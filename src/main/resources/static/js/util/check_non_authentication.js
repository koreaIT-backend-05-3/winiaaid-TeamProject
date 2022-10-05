let uri = location.pathname;
let authenticationInfo = null;
authenticationInfo = getAuthenticationRequestDataInLocalStorage();

checkNonAuthentication();

function getAuthenticationRequestDataInLocalStorage() {

    if(isInclude("/visit/inquiry/detail") || isInclude("/recall/request/complete") || isInclude("/recall/inquiry/detail")) {
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
    if(userCode == 0 && authenticationInfo == null) {
        alert("잘못된 접근입니다.");
        location.replace("/main");
    }
}


function getUserNameByAuthenticationInfo(authenticationInfo) {
    let userName = null;

    if(authenticationInfo != null) {
        userName = authenticationInfo.userName;
    }

    return userName;
}

function isInclude(customUri) {
    return uri.indexOf(customUri) != -1;
}
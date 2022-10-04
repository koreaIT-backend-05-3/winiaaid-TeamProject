let authenticationInfo = null;
authenticationInfo = getAuthenticationRequestDataInLocalStorage();

checkNonAuthentication();

function getAuthenticationRequestDataInLocalStorage() {
    authenticationInfo = localStorage.authenticationInfo;
    
    if(authenticationInfo != null) {
        authenticationInfo = JSON.parse(authenticationInfo);
    }

    return authenticationInfo;
}


function checkNonAuthentication() {
    if(userCode == 0 && authenticationInfo == null) {
        alert("잘 못 된 접근입니다.");
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
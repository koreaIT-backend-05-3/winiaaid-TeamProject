removeNonMemberAuthenticationInfoInLocalStorage();

function removeNonMemberAuthenticationInfoInLocalStorage() {
    if(location.pathname.indexOf("non-member") == -1) {
        localStorage.removeItem("nonMemberInquiryList");
        localStorage.removeItem("nonMemberRequestData");
        alert("삭제")
    }
}
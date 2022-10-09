let stepPass = getStepPassInLocalStorage();

if(!stepPass) {
    alert("잘 못 된 접근입니다.");
    location.replace("/main");
}

function getStepPassInLocalStorage() {
    let stepPass = localStorage.stepPass;

    localStorage.removeItem("stepPass");

    return stepPass ? stepPass : false;
}
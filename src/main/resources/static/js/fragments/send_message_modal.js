const sendMessageModal = document.querySelector(".send-message-modal-div");
const cancelImage = document.querySelector(".cancel-image");
const phoneNumberInput = document.querySelector(".input-div input[type=tel]");
const sendMessageCancelButton = document.querySelector(".send-message-cancel");
const sendMessageSubmitButton = document.querySelector(".send-message-submit");


let solutionInfoObject = {
    "solutionTitle": null,
    "solutionContent": null,
    "productGroupName": null,
    "productCategoryName": null,
    "productDetailName": null,
    "solutionName": null
}

cancelImage.onclick = () => addVisibleClass(sendMessageModal);

sendMessageCancelButton.onclick = () => addVisibleClass(sendMessageModal);

sendMessageSubmitButton.onclick = checkPhoneNumber;

function setSolutionTitleClickEvent(solutionInfoDataList) {
    const solutionTitleItems = document.querySelectorAll(".solution-content .title");

    for(let i = 0; i < solutionTitleItems.length; i++) {
        solutionTitleItems[i].onclick = () =>
            loadSolutionDetailPage(solutionInfoDataList[i].solutionBoardCode);
    }
}

function setSendMessageButtonClickEvent(solutionInfoDataList) {
    clearValue(phoneNumberInput);

    if(checkDetailPage()) {
        const sendMessageButton = document.querySelector(".send-message");

        sendMessageButton.onclick = () => {

        removeVisibleClass(sendMessageModal);
        setSolutionInfoObject(solutionInfoDataList);
        setModalInputToSolutionInfo();
        }
    }else {
        const sendMessageButtonItems = document.querySelectorAll(".send-message");
        
        for(let i = 0 ; i < sendMessageButtonItems.length; i++) {
            sendMessageButtonItems[i].onclick = () => {
                console.log(sendMessageModal);
    
                removeVisibleClass(sendMessageModal);
                setSolutionInfoObject(solutionInfoDataList[i]);
                setModalInputToSolutionInfo();
            }
        }

    }
}

function clearValue(domObject) {
    domObject.value = "";
}

function setSolutionInfoObject(solutionInfoData) {
    solutionInfoObject.solutionTitle = solutionInfoData.solutionTitle;
    solutionInfoObject.solutionContent = solutionInfoData.solutionContent;
    solutionInfoObject.productCategoryName = solutionInfoData.productCategoryName;
    solutionInfoObject.productDetailName = solutionInfoData.productDetailName;
    solutionInfoObject.solutionName = solutionInfoData.solutionName;

}

function setModalInputToSolutionInfo() {
    const solutionTitleInput = document.querySelector(".input-div input[type=text]");

    solutionTitleInput.value = solutionInfoObject.solutionTitle;
    
}

function setSolutionInfoObject(solutionInfoData) {
    solutionInfoObject.solutionTitle = solutionInfoData.solutionTitle;
    solutionInfoObject.solutionContent = solutionInfoData.solutionContent;
    solutionInfoObject.productCategoryName = solutionInfoData.productCategoryName;
    solutionInfoObject.productDetailName = solutionInfoData.productDetailName;
    solutionInfoObject.solutionName = solutionInfoData.solutionName;

}

function setModalInputToSolutionInfo() {
    const solutionTitleInput = document.querySelector(".input-div input[type=text]");

    solutionTitleInput.value = solutionInfoObject.solutionTitle;
    
}

function checkPhoneNumber() {
    let phoneNumber = phoneNumberInput.value;
    let regPhone = /^[0-9]{10,11}$/;

    if(isEmpty(phoneNumber)) {
        alert("휴대폰 번호를 입력해주세요.");
    }else if(!regPhone.test(phoneNumber)) {
        alert("휴대폰번호는 숫자로 10~11자리만 입력해주세요.");
    }else {
        alert("정상적으로 전송되었습니다.")
        console.log(solutionInfoObject);
    }
}

function checkDetailPage() {
    return location.pathname.indexOf("detail") != -1;
}

function addVisibleClass(domObject) {
    domObject.classList.add("visible");
}

function removeVisibleClass(domObject) {
    domObject.classList.remove("visible");
}
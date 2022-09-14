const cancelImage = document.querySelector(".cancel-image");
const addressSearchButton = document.querySelector(".address-search-button");

const postalCodeCheck = document.querySelector(".postal-code-check");
const mainAddressCheck = document.querySelector(".main-address-check");
const detailAddressCheck = document.querySelector(".detail-address-check");

const searchKeyword = document.querySelector(".search-address-div input");
const writeButton = document.querySelector(".request-button");
const writeCancelButton = document.querySelector(".cancel-button");

let nowPage = 1;

cancelImage.onclick = cancelPopup;

searchKeyword.onkeypress = (e) => {
    if(e.keyCode == 13) {
        searchAddress(nowPage);
    }
}

addressSearchButton.onclick = () => searchAddress(nowPage);

detailAddressCheck.onkeypress = (e) => {
    if(e.keyCode == 13) {
        writeButton.click();
    }
}

writeButton.onclick = setAddressToParentWindow;

writeCancelButton.onclick = cancelPopup;


function setAddressToParentWindow() {

    window.opener.setAddressInput(postalCodeCheck.value, mainAddressCheck.value, detailAddressCheck.value);
    cancelPopup();
}

function loadPage(nowPage) {
    searchAddress(nowPage);
}

function searchAddress(nowPage) {
    let confirmKey = "devU01TX0FVVEgyMDIyMDkwNzAyNTExNTExMjk1ODg=";
    $.ajax({
        url: "https://business.juso.go.kr/addrlink/addrLinkApi.do",
        type: "get",
        data: {
            currentPage: nowPage,
            countPerPage: 10,
            confmKey: "devU01TX0FVVEgyMDIyMDkwNzAyNTExNTExMjk1ODg=",
            keyword: searchKeyword.value,
            resultType: "json",
            hstryYn: "Y"
        },
        success: (response) => {
            let addressData = response.results;

            let totalCount = addressData.common.totalCount;
            let totalPage = getTotalPage(totalCount, 10);
            setPage(totalPage);

            setAddressData(addressData.juso);
        },
        error: (error) => {
            alert("에러");
            console.log(error);
        }
    });
}

function setAddressData(addressData) {
    const addressResultTbody = document.querySelector(".address-reuslt-tbody");

    domObjectClear(addressResultTbody);

    addressData.forEach(data => {
        
        addressResultTbody.innerHTML += `
            <tr>
                <td>
                    <p class="postal-code-p">${data.zipNo}</p>
                </td>
                <td class="address-info-td">
                    <p class="address-road">${data.roadAddr}</p>
                    <p class="address-jibun">${data.jibunAddr}</p>
                </td>
            </tr>
        `;
    })

    const addressRoads = document.querySelectorAll(".address-road");
    const addressJibuns = document.querySelectorAll(".address-jibun");

    setRoadAddressClickEvent(addressRoads, addressData);
    setJibunAddressClickEvent(addressJibuns, addressData);


}

function setRoadAddressClickEvent(domObject, addressData) {
    domObject.forEach(object => {
        object.onclick = () => {

            addressData.forEach(data => {
                if(object.textContent == data.roadAddr) {
                    postalCodeCheck.value = data.zipNo;
                    mainAddressCheck.value = object.textContent;
                }
            });

            detailAddressCheck.focus();
        }
    });
}

function setJibunAddressClickEvent(domObject, addressData) {
    domObject.forEach(object => {
        object.onclick = () => {

            addressData.forEach(data => {
                if(object.textContent == data.jibunAddr) {
                    postalCodeCheck.value = data.zipNo;
                    mainAddressCheck.value = object.textContent;
                }
            });

            detailAddressCheck.focus();
        }
    });
}
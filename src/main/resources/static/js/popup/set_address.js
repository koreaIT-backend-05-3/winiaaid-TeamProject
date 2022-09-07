const cancelImage = document.querySelector(".cancel-image");
const addressSearchButton = document.querySelector(".address-search-button");

const postalCodeCheck = document.querySelector(".postal-code-check");
const mainAddressCheck = document.querySelector(".main-address-check");
const detailAddressCheck = document.querySelector(".detail-address-check");

const searchKeyword = document.querySelector(".search-address-div input");
const writeButton = document.querySelector(".write-button");
const writeCancelButton = document.querySelector(".write-cancel-button");

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
            let totalPage = getTotalPage(totalCount);
            setPage(totalPage);

            console.log(response);

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

function getTotalPage(totalCount) {
    return totalCount % 10 ? totalCount / 10 : Math.floor(totalCount / 10) + 1;
}

function setPage(totalPage) {
    const pageButton = document.querySelector(".page-button-div");
    let startPage = nowPage % 5 == 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
    
    let endPage = startPage + 4 < totalPage + 1 ? startPage + 4 : totalPage;

    domObjectClear(pageButton);

    if(startPage != 1) {
        pageButton.innerHTML += `
            <button class="pre-button" type="button">&lt;</button>
        `;
    }

    for(let i = startPage; i < endPage + 1; i++) {
        pageButton.innerHTML += `
            <button class="page-button ${nowPage == i ? "select-page-button" : ""}" type="button">${i}</button>
        `;
    }

    if(endPage != totalPage) {
        pageButton.innerHTML += `
            <button class="next-button" type="button">&gt;</button>
        `;
    }

    if(startPage != 1) {
        setPageButtonClickEvent("pre", startPage);
    }

    if(endPage != totalPage) {
        setPageButtonClickEvent("next", endPage);
    }

    setPageButtonClickEvent("page", null);
}

function domObjectClear(domObject) {
    domObject.innerHTML = "";
}

function setPageButtonClickEvent(type, page) {
    if(type == "pre") {
        const prePageButton = document.querySelector(".pre-button");

        prePageButton.onclick = () => {
            nowPage = page - 1;
            console.log("nowPage: " + nowPage);
            searchAddress(nowPage);
        }
    }else if(type == "next") {
        const nextPageButton = document.querySelector(".next-button");

        nextPageButton.onclick = () => {
            nowPage = page + 1;
            console.log("nowPage: " + nowPage);
            searchAddress(nowPage);
        }

    }else {
        const pageButtons = document.querySelectorAll(".page-button");

        pageButtons.forEach(pageButton => {
            pageButton.onclick = () => {
                nowPage = pageButton.textContent;
                searchAddress(nowPage);
            }
        });
    }
}
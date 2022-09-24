const cancelImage = document.querySelector(".cancel-image");
const amountSpan = document.querySelector(".amount-span");
const requestButton = document.querySelector(".request-button");
const cancelButton = document.querySelector(".cancel-button");

let addressInfoMap = new Map();

cancelImage.onclick = cancelPopup;
requestButton.onclick = setAddressToParentWindow;
cancelButton.onclick = cancelPopup;

let userCode = 0;

loadPage(1);

function loadPage(page) {
    getPastReceptionAddress(page);
}

function getPastReceptionAddress(page) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/address/history/user/${userCode}?page=${nowPage}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                let totalPage = getTotalPage(response.data[0].totalCount, 4);
                setPage(totalPage);
            }
            setPastReceptionAddress(response.data);
        },
        error: (request, status, error) => {
            alert("요청중에 오류가 발생했습니다.");
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function setPastReceptionAddress(addressList) {
    const tbody = document.querySelector("tbody");

    amountSpan.textContent = addressList[0].totalCount;
    clearObject(tbody);

    if(addressList != null) {
        
        for(address of addressList) {
            let addressInfoObject = {
                "postalCode": null,
                "mainAddress": null,
                "detailAddress": null
            };

            addressInfoObject.postalCode = address.postalCode;
            addressInfoObject.mainAddress = address.mainAddress;
            addressInfoObject.detailAddress = address.detailAddress;
            
            addressInfoMap.set(address.postalCode, addressInfoObject);

            tbody.innerHTML += `
                <tr>
                    <td>
                        <input class="input-radio" type="radio" name="address-radio" value=${address.postalCode}>
                    </td>
                    <td>
                        ${address.postalCode}
                    </td>
                    <td class="address-td">
                        ${address.mainAddress} ${address.detailAddress}
                    </td>
                </tr>
            `;
        }
    }else {
        tbody.innerHTML = `
            <tr>
                <td colspan="3">
                    이전 접수 내역이 없어 주소록이 없습니다.
                </td>
            </tr>
        `;
    }

}

function clearObject(domObject) {
    domObject.innerHTML = "";
}

function setAddressToParentWindow() {
    let addressInfoObject = null;

    addressInfoObject = getSelectedValue();
    window.opener.setAddressInput(addressInfoObject.postalCode, addressInfoObject.mainAddress, addressInfoObject.detailAddress);
    cancelPopup();
}

function getSelectedValue() {
    const inputRadioItems = document.querySelectorAll(".input-radio");
    let postalCode = null;

    for(inputRadio of inputRadioItems) {
        if(inputRadio.checked) {
            postalCode = inputRadio.value;
            break;
        }
    }

    return addressInfoMap.get(postalCode);
}
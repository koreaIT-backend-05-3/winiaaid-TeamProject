const cancelImage = document.querySelector(".cancel-image");
const requestButton = document.querySelector(".request-button");
const cancelButton = document.querySelector(".cancel-button");

let pastHistoryInfoMap = new Map();

cancelImage.onclick = cancelPopup;

requestButton.onclick = getCheckedInputIdAndExecuteParentsMethod;
cancelButton.onclick = cancelPopup;

loadPage(1);

function loadPage(page) {
    getRepairServiceHistory(page);
}

function getRepairServiceHistory(page) {
    let company = window.opener.company;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/service/repair/history/detail/list/user/${userCode}?page=${page}`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                let totalPage = getTotalPage(response.data[0].reservationInfo.totalCount, 3);
                setPage(totalPage);
                setRepairDataList(response.data, totalPage);
            }
        },
        error: errorMessage
    });
}

function setRepairDataList(repairDataList, totalPage) {
    const requestInfoDiv = document.querySelector(".request-info-div");

    const amountSpan = document.querySelector(".amount-span");

    amountSpan.textContent = repairDataList[0].reservationInfo.totalCount;

    clearDomObject(requestInfoDiv);

    for(repairData of repairDataList) {
        let pastHistoryInfoObject = {
            "companyCode": repairData.productInfo.companyCode,
            "productGroupName": repairData.productInfo.productGroupName,
            "productCategoryName": repairData.productInfo.productCategoryName,
            "productDetailName": repairData.productInfo.productDetailName,
            "productModelNumber": repairData.productInfo.modelNumber,
            "troubleCode": repairData.productInfo.troubleCode,
            "description": repairData.productInfo.description,

            "userName": repairData.userInfo.userName,
            "email": repairData.userInfo.email,
            "mainPhoneNumber": repairData.userInfo.mainPhoneNumber,
            "subPhoneNumber": repairData.userInfo.subPhoneNumber,
            "postalCode": repairData.userInfo.postalCode,
            "mainAddress": repairData.userInfo.mainAddress,
            "detailAddress": repairData.userInfo.detailAddress
        };

        pastHistoryInfoMap.set(`${repairData.productInfo.serviceCode}`, pastHistoryInfoObject);

        requestInfoDiv.innerHTML += `
        <table>
            <tbody>
                <tr>
                    <th>
                        <input class="check-radio" id=">${repairData.productInfo.serviceCode}" type="radio" name="check">
                        <label for=">${repairData.productInfo.serviceCode}" class="check-radio">?????????</label>
                    </th>
                    <td class="product-name-td">${repairData.productInfo.productCategoryName == repairData.productInfo.productDetailName ? "" : repairData.productInfo.productCategoryName + " > "} ${repairData.productInfo.productDetailName}</td>
                    <th>?????????</th>
                    <td class="product-model-name-td">${repairData.productInfo.modelNumber}</td>
                </tr>
                <tr>
                    <th>????????????</th>
                    <td class="request-number-td">${repairData.productInfo.serviceCode}</td>
                    <th>???????????????</th>
                    <td class="service-type-td">${repairData.reservationInfo.serviceTypeName}</td>
                </tr>
                <tr>
                    <th>????????????</th>
                    <td class="product-purchase-day-td"></td>
                    <th>????????????</th>
                    <td class="trouble-symptom-td">${repairData.productInfo.troubleSymptom}</td>
                </tr>
                <tr>
                    <th>?????????</th>
                    <td class="request-time-td">${repairData.reservationInfo.requestDate}</td>
                    <th>??????????????????</th>
                    <td class="reservation-day-td">${repairData.reservationInfo.reservationDate}</td>
                </tr>
                <tr>
                    <th>?????????</th>
                    <td class="customer-name-td">${repairData.userInfo.userName}</td>
                    <th>???????????????	</th>
                    <td class="phone-number-td">${repairData.userInfo.mainPhoneNumber}</td>
                </tr>
                <tr>
                    <th>??????</th>
                    <td class="address-td" colspan="3">${repairData.userInfo.mainAddress} ${repairData.userInfo.detailAddress}</td>
                </tr>
            </tbody>
        </table>
        `;
    }
}

function getCheckedInputIdAndExecuteParentsMethod() {
    const radioInputItems = document.querySelectorAll(".check-radio");

    for(input of radioInputItems) {
        if(input.checked) {
            let pastHistoryInfoObject = pastHistoryInfoMap.get(input.getAttribute("id").substring(1));
            window.opener.savePastRequestServiceDataToLocalStorageAndReplacePage(pastHistoryInfoObject);
            cancelPopup();
        }
    }
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function errorMessage(request, status, error) {
    alert("???????????? ????????? ??????????????????.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}
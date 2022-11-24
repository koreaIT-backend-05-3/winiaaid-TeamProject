window.onload = () => {
    DataLoadTypeSetter.getInstance();
}

function loadPage(page) {
    ServiceDataLoader.getInstance().getServiceDataList(page);
}

class DataLoadTypeSetter {
    static #instance = null;

    serviceDataLoader = null;

    boardType = null;
    progressStatus = null;

    mainServiceTypeItems = null;
    statusTypeSelect = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new DataLoadTypeSetter();
        }

        return this.#instance;
    }

    constructor() {
        this.serviceDataLoader = ServiceDataLoader.getInstance();
        this.setServiceTypeClickEvent();
        this.setProgressStatusSelectEvent();

    }

    setServiceTypeClickEvent() {
        this.mainServiceTypeItems = document.querySelectorAll(".main-service-type-div div");

        this.mainServiceTypeItems.forEach(serviceTypeDiv => {
            serviceTypeDiv.onclick = (e) => this.selectBoardType(e.target);
        })

    }

    setProgressStatusSelectEvent() {
        this.statusTypeSelect = document.querySelector(".status-type-select");

        this.statusTypeSelect.onchange = () => this.selectProgressStatus();

    }

    selectBoardType(div) {
        this.initializeSelectServiceType();

        this.boardType = div.textContent == "방문 서비스" ? "visit" : "recall";
        div.classList.add("select-div");

        nowPage = 1;
        this.serviceDataLoader.getServiceDataList(1);

    }

    selectProgressStatus() {
        nowPage = 1;
        this.serviceDataLoader.getServiceDataList(1);

    }

    initializeStatusTypeSelect() {
        console.log(this.statusTypeSelect.querySelectorAll("option"))
        this.statusTypeSelect.querySelectorAll("option")[0].selected = true;

    }

    initializeSelectServiceType() {
        this.mainServiceTypeItems.forEach(div => div.classList.remove("select-div"));

    }




    getBoardType() {
        return this.boardType;
    }

    getProgressStatus() {
        const statusTypeSelect = document.querySelector(".status-type-select");
        return statusTypeSelect.value;
    }

}

class ServiceDataLoader {
    static #instance = null;

    serviceType = null;
    progressStatus = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ServiceDataLoader();
        }

        return this.#instance;
    }

    getServiceDataList(page) {
        this.serviceType = DataLoadTypeSetter.getInstance().getBoardType();
        this.progressStatus = DataLoadTypeSetter.getInstance().getProgressStatus();

        if(this.serviceType != null) {
            $.ajax({
                async: false,
                type: "get",
                url: `/api/v1/manager/${this.serviceType}/service/title/list`,
                data: {
                    "progressStatus": this.progressStatus,
                    "page": page
                },
                dataType: "json",
                success: (response) => {
                    this.setServiceData(response.data);
                },
                error: (request, status, error) => {
                    alert("에러");
                    console.log(request.status);
                    console.log(request.responseText);
                    console.log(error);
                }
            });

        }else {
            alert("서비스 타입을 선택해주세요.");
            DataLoadTypeSetter.getInstance().initializeStatusTypeSelect();
        }
        
    }

    setServiceData(dataList) {
        const serviceViewThead = document.querySelector("thead");
        const serviceViewTbody = document.querySelector("tbody");
        let visitServiceTypeFlag = this.serviceType == "visit";

        serviceViewThead.innerHTML = `
            <tr class="title-tr">
                <th>접수번호</th>
                ${visitServiceTypeFlag ? 
                    `<th>제품</th>
                    <th>고장 증상</th>` : ``}
                <th>모델 넘버</th>
                <th>상태</th>
                <th>고객 성명</th>
                <th>접수 시간</th>
            </tr>
        `;

        if(dataList != null) {
            this.clearDomObject(serviceViewTbody);

            dataList.forEach(data => {
                serviceViewTbody.innerHTML += `
                    <tr>
                        <td><span class="service-code-span">${data.serviceCode}</span></td>
                        ${visitServiceTypeFlag ? 
                            `<td>${data.productName}</td>
                            <td>${data.troubleSymptom}</td>` : ``}
                        <td>${data.modelNumber}</td>
                        <td ${data.progressStatusCode == 0 ? "class='cancel-td'" :
                                data.progressStatusCode == 1 ? "class='register-td'"
                                : "class='complete-td'"}>
                            ${data.progressStatus}
                        </td>
                        <td>${data.userName}</td>
                        <td>${data.requestDate}</td>
                    </tr>
                `;
            })

            let totalPage = getTotalPage(dataList[0].totalCount, 10);
            setPage(totalPage);
            this.setTotalCount(dataList[0].totalCount);
            this.setServiceCodeClickEvent(dataList);
            
        }else {
            serviceViewTbody.innerHTML = `
                    <tr>
                        <td colspan="${visitServiceTypeFlag ? 7 : 5}">접수 내역이 없습니다.</td>
                    </tr>
                `;

                
            this.setTotalCount(0);
        }
    }

    setServiceCodeClickEvent(dataList) {
        const serviceCodeSpanItems = document.querySelectorAll(".service-code-span");

        serviceCodeSpanItems.forEach((span, index) => {
            span.onclick = () => this.loadDetailPage(dataList[index]);
        })
    }

    loadDetailPage(dataList) {
        this.setLastRequestInfoInLocalStorage();
        location.href = `/service/${this.serviceType}/inquiry/detail/${dataList.serviceCode}`;
    }

    setLastRequestInfoInLocalStorage() {
        let lastRequestInfoObject = {
            "serviceType": this.serviceType,
            "progressStatus": this.progressStatus,
            "page": nowPage
        };

        localStorage.locationInfo = "manager";
        localStorage.lastRequestInfo = JSON.stringify(lastRequestInfoObject);
    }

    setTotalCount(totalCount) {
        const totalCountSpan = document.querySelector(".total-count-span");

        totalCountSpan.innerHTML = `${totalCount}개`
    }

    clearDomObject(domObject) {
        domObject.innerHTML = "";
    }
}
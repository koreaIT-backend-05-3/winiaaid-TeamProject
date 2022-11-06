const addTroubleSymptomInput = document.querySelector(".add-trouble-symptom-input");
const addTroubleSymptomButton = document.querySelector(".add-trouble-symptom-button");

loadAllTroubleSymptomList();
setTroubleSymptomAddButtonClickEvent();
setEnterKeyPressEvent();

function loadAllTroubleSymptomList() {
    let troubleSymptomList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/trouble/category/0?loadType=all`,
        dataType: "json",
        success: (response) => {
            setTroubleSymptomList(response.data);
        },
        error: errorMessage
    });

    return troubleSymptomList;
}

function setTroubleSymptomList(troubleSymptomList) {
    const troubleSymptomUl = document.querySelector(".trouble-symptom-div ul");

    clearDomObject(troubleSymptomUl);

    if(troubleSymptomList != null) {
        troubleSymptomList.forEach(trouble => {
            troubleSymptomUl.innerHTML += `
                <li class="trouble-symptom-li">
                    <div>
                        <span class="fa-solid fa-hammer"></span>
                        <span class="trouble-symptom-span">${trouble.troubleSymptom}</span>
                    </div>
                    <span class='fa-regular fa-trash-can trouble-symptom-delete-span'></span>
                </li>
            `;
        });
    }else {
        troubleSymptomUl.innerHTML += `
            <li class="trouble-symptom-li">
                <div>
                    <span class="fa-solid fa-hammer"></span>
                    <span class="trouble-symptom-span">데이터가 없습니다.</span>
                </div>
            </li>
        `;
    }

    setTroubleSymptomDeleteSpanClickEvent(troubleSymptomList);
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function setTroubleSymptomDeleteSpanClickEvent(troubleSymptomList) {
    const troubleSymptomDeleteSpanItems = document.querySelectorAll(".trouble-symptom-delete-span");

    troubleSymptomDeleteSpanItems.forEach((deleteSpan, index) => {
        deleteSpan.onclick = () => deleteTroubleSymptom(troubleSymptomList[index].troubleCode);
    });
}

function deleteTroubleSymptom(troubleSymptomCode) {
    let message = "복구할 수 없습니다.\n정말로 삭제하시겠습니까?"

    if(confirm(message)) {
        $.ajax({
            async: false,
            type: "delete",
            url: `/api/v1/manager/trouble-symptom/${troubleSymptomCode}`,
            dataType: "json",
            success: (response) => {
                if(response.data) {
                    alert("고장 증상 삭제 완료");
                    replace();
                }else {
                    alert("고장 증상 삭제 오류");
                }
            },
            error: errorMessage
        });
    }
}

function replace() {
    location.replace("/manager/trouble-symptom");
}

function setTroubleSymptomAddButtonClickEvent() {
    addTroubleSymptomButton.onclick = addTroubleSymptomRequest;
}

function addTroubleSymptomRequest() {
    if(isEmpty(addTroubleSymptomInput.value)) {
        alert("고장 증상 내용을 입력해주세요.");

    }else {
        $.ajax({
            async: false,
            type: "post",
            url: `/api/v1/manager/trouble-symptom`,
            contentType: "application/json",
            data: JSON.stringify({
                "troubleSymptom": addTroubleSymptomInput.value
            }),
            dataType: "json",
            success: (response) => {
                if(response.data) {
                    alert("고장 증상 추가 완료");
                    replace();
                }else {
                    alert("고장 증상 추가 오류");
                }
            },
            error: errorMessage
        });
    }
}

function isEmpty(data) {
    return data == "" || data == undefined || data == null;
}

function setEnterKeyPressEvent() {
    addTroubleSymptomInput.onkeypress = (e) => {
        if(e.keyCode == 13) {
            addTroubleSymptomButton.click();
        }
    }
}

function errorMessage(request, status, error) {
    console.log(request.status);
    console.log(request.responseText);
    console.lor(error);
}
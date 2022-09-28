const uploadButton = document.querySelector(".upload-button");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const phoneNumber = document.querySelector(".phone-number");
const titleInput = document.querySelector(".title-input");
const contentInput = document.querySelector(".content-td textarea")
const brandInputItems = document.querySelectorAll(".brand-td input");
const responseInputItems = document.querySelectorAll(".susin-td input");

let userCode = 0;

uploadButton.onclick = () =>{
    let form = new FormData(document.querySelector("form"));

    let boardType = getBoardType();
    
    form = setFormData(form, boardType);

    $.ajax({
        type: "post",
        url: "/api/v1/board/write",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
        success: (response) => {
            location.href = `/customer/${boardType}/detail/${response.data}`;
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });
}

function getBoardType(){
    let uri = location.pathname;
    return uri.indexOf("praise")!= -1?"praise"
    :uri.indexOf("complaint")!= -1?"complaint"
    :"suggestion";
}

function setFormData(form, boardType) {

    form.append("userCode", userCode);
    form.append("userName",name.textContent);
    form.append("email",email.textContent);
    form.append("mainPhoneNumber",phoneNumber.textContent);
    form.append("boardTitle", titleInput.value);
    form.append("boardContent", contentInput.value);  
    form.append("boardTypeCode", boardType == "praise" ? 1 : boardType == "complaint" ? 2 : 3); 

    brandInputItems.forEach(brandInput=>{
        if(brandInput.checked){
            form.append("companyCode",brandInput.value);
        }
    });
    
    responseInputItems.forEach(responseInput=>{
        if(responseInput.checked){
            form.append("responseFlag",responseInput.value);
            
        }
    });

    return form;
}
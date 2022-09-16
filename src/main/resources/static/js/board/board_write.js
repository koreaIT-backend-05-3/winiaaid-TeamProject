const uploadButton = document.querySelector(".upload-button");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const phoneNumber = document.querySelector(".phone-number");
const titleInput = document.querySelector(".title-input");
const contentInput = document.querySelector(".content-td textarea")
const brandInputItems = document.querySelectorAll(".brand-td input");
const responseInputItems = document.querySelectorAll(".susin-td input");

uploadButton.onclick = () =>{
    console.log("!!!")
    let form = new FormData(document.querySelector("form"));
    

    form.append("name",name.textContent);
    form.append("email",email.textContent);
    form.append("mainPhoneNumber",phoneNumber.textContent);
    form.append("boardTitle", titleInput.value);
    form.append("boardContent", contentInput.value);    

    brandInputItems.forEach(brandInput=>{
        if(brandInput.checked){
            form.append("companyCode",brandInput.value);
            
        }


    })
    responseInputItems.forEach(responseInput=>{
        if(responseInput.checked){
            form.append("responseFlag",responseInput.value);
            
        }
    })

    form.forEach((v,k)=>{
        console.log("키 값" + k)
        console.log("벨류 값" + v)
    });

    $.ajax({
        type:"post",
        url:"/api/v1/board/write",
        enctype:"multipart/form-data",
        contentType:false,
        processData:false,
        data:form,
        dataType:"json",
        success: (response) => {
            alert(response.data + "번 공지사항 작성 완료")
            location.href = "/notice/detail/" + response.data;
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    })
}
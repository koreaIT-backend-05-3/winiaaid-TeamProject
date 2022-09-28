const deleteButton = document.querySelector(".delete-button");

let boardCode = getBoardCodeByUri();
getBoardDetailByBoardCode(boardCode);

deleteButton.onclick = deleteBoard;

function getBoardCodeByUri(){
    return location.pathname.substring(location.pathname.lastIndexOf("/") +1);
}

function getBoardDetailByBoardCode(){
    $.ajax({
        type:"get",
        url:`/api/v1/board/${boardCode}`,
        dataType:"json",    
        success:(response)=>{
            setBoardDetail(response.data);
        },
        error:(error)=>{
            console.log(error);
        }
    })
}

function deleteBoard(){
    $.ajax({
        type:"delete",
        url:`/api/v1/board/${boardCode}`,
        dataType:"json",
        success:(response)=>{
            if(response.data){
                alert("게시글삭제성공");
                let boardType = getBoardType();
                location.replace(`/customer/${boardType}/list`);
            }


        },
        error:(error)=>{
            console.log(error);
        }
    })
}

function setBoardDetail(boardDetail){
    const userName = document.querySelector(".username");
    const company = document.querySelector(".company");
    const createDate = document.querySelector(".updatedate");
    const contentTitle = document.querySelector(".contenttitle");
    const content = document.querySelector(".content");

    userName.textContent = boardDetail.userName;
    company.textContent = boardDetail.userName;
    createDate.textContent = boardDetail.createDate;
    contentTitle.textContent = boardDetail.boardTitle;
    content.textContent = boardDetail.boardContent;

}

function getBoardType(){
    let uri = location.pathname;
    return uri.indexOf("praise")!= -1?"praise"
    :uri.indexOf("complaint")!= -1?"complaint"
    :"suggestion";
}
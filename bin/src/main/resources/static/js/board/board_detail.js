let boardCode = getBoardCodeByUri();
getBoardDetailByBoardCode(boardCode);


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
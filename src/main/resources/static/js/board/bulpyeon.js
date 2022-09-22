let userCode = 0;

getBoardList();

function getBoardList(){
    $.ajax({
        type:"get",
        url:`/api/v1/board/list/user/${userCode}`,
        dataType:"json",
        success:(response)=>{
            if(response.data!=null){
                setTotalCount(response.data[0].totalCount);
                setBoardList(response.data)
            }
        
        }
        ,error:(error)=>{
            console.log(error)
        }
    })
}

function setBoardList(boardList){
    const contentTableBody = document.querySelector(".content-table-body");

    clearDomObject(contentTableBody);

    for(board of boardList){
        let date = board.createDate.substring(0, 10);
        let time = board.createDate.substring(11, 16);

        contentTableBody.innerHTML += `
            <tr>
                <td>${board.boardTitle}</td>
                <td class="content-name">${board.userName}</td>
                <td class="content-date">${date} ${time}</td>
            </tr>
        `
    }
}

function setTotalCount(totalCount) {
    const totalCountSpan = document.querySelector(".total-count-span");

    totalCountSpan.textContent = totalCount;
}

function clearDomObject(domObject){
    domObject.innerHTML="";
}
const writeButton = document.querySelector(".write-button");
const showMyWritingHistoryButton = document.querySelector(".board-history-button");
const searchKeyword = document.querySelector(".input-box");
const searchButton = document.querySelector(".search-btn");

const contentTableBody = document.querySelector(".content-table-body");


let authenticationInfo = null;
let boardType = null;
let authenticationNumber = null;



boardType = getBoardType();


loadPageHistoryByLocalStorage();

checkHasNonMemberInquiryListData();

setBoardContentByBoardType();
setBoardTableByBoardType();

writeButton.onclick = loadBoardWritePage;
showMyWritingHistoryButton.onclick = loadWritingHistoryPage;

searchButton.onclick = () => getBoardList(1);



function getBoardType() {
    return location.pathname.indexOf("complaint") != -1 ? "complaint" : location.pathname.indexOf("praise") != -1 ? "praise" : "suggestion";
}

function isNonMemberView() {
    return location.pathname.indexOf("non-member") != -1;
}

function checkHasNonMemberInquiryListData() {
    let nonMemberInquiryList = localStorage.nonMemberInquiryList;

    if(nonMemberInquiryList != null){
        nonMemberInquiryList = JSON.parse(nonMemberInquiryList);

        let totalPage = getTotalPage(nonMemberInquiryList[0].totalCount, 5);
        setPage(totalPage);
        setTotalCount(nonMemberInquiryList[0].totalCount);
        setBoardList(nonMemberInquiryList);

        localStorage.removeItem("nonMemberInquiryList");
    }else {
        loadPage(nowPage);
    }
}

function loadPage(page) {
    getBoardList(page)
}

function getBoardList(page){
    let searchType = getSelectedOptionValue();
    let keyword = getSearchKeyword();
    
    let boardAuthenticationInfo = localStorage.boardAuthenticationInfo;

    if(!isNonMemberView()) {
        $.ajax({
            type:"get",
            url:`/api/v1/board/${boardType}/list/member`,
            data: {
                "userCode": userCode,
                "searchType": searchType,
                "keyword": keyword,
                "page": page
            },
            dataType:"json",
            success:(response)=>{
                if(response.data != null){
                    let totalPage = getTotalPage(response.data[0].totalCount, 5);
                    setPage(totalPage);
    
                    setTotalCount(response.data[0].totalCount);
                    setBoardList(response.data);
                }else {
                    boardListNoResult();
                    setTotalCount(0);
                }
            },
            error:(request, status, error)=>{
                console.log(request.status);
                console.log(request.responseText);
                console.log(error);
            }
        });

    }else {
        if(boardAuthenticationInfo != null) {
            authenticationInfo = JSON.parse(boardAuthenticationInfo);
            $.ajax({
                type:"get",
                url:`/api/v1/board/${boardType}/list/non-member`,
                data: {
                    "userName": authenticationInfo.userName,
                    "mainPhoneNumber": authenticationInfo.mainPhoneNumber,
                    "authenticationNumber": authenticationInfo.authenticationNumber,
                    "searchType": searchType,
                    "keyword": keyword,
                    "page": page
                },
                dataType:"json",
                success:(response)=>{
                    if(response.data != null){
                        let totalPage = getTotalPage(response.data[0].totalCount, 5);
                        setPage(totalPage);
        
                        setTotalCount(response.data[0].totalCount);
                        setBoardList(response.data)
                    }else {
                        boardListNoResult();
                        setTotalCount(0);
                    }
                },
                error:(request, status, error)=>{
                    console.log(request.status);
                    console.log(request.responseText);
                    console.log(error);
                }
            });

        }else {
            boardListNoResult();
            setTotalCount(0);
        }
    }
}

function setTotalCount(totalCount) {
    const totalCountSpan = document.querySelector(".total-count-span");

    totalCountSpan.textContent = totalCount;
}

function setBoardList(boardList){
    clearDomObject(contentTableBody);

    if(boardType == "praise") {
        for(board of boardList){
            let date = board.createDate.substring(0, 10);
            let time = board.createDate.substring(11, 16);
    
            contentTableBody.innerHTML += `
                <tr>
                    <td class="content-title"><span>${board.boardTitle}</span></td>
                    <td class="content-name">${board.userName}</td>
                    <td class="content-date">${date} ${time}</td>
                </tr>
            `
        }

    }else {
        for(board of boardList){
            let date = board.createDate.substring(0, 10);
            let time = board.createDate.substring(11, 16);
    
            contentTableBody.innerHTML += `
                <tr>
                    <td class="company-name">${board.companyName}</td>
                    <td class="content-title"><span>${board.boardTitle}</span></td>
                    <td class="progress-status">${board.progressStatus}</td>
                    <td class="content-name">${board.userName}</td>
                    <td class="content-date">${date} ${time}</td>
                </tr>
            `
        }
    }

    setBoardTitleClickEvent(boardList);
}

function boardListNoResult() {
    contentTableBody.innerHTML = `
        <tr class="list-unit">
            <td class="data-none" colspan="${boardType == "praise" ? 3 : 5}">검색된 결과가 없습니다.</td>
        </tr>`;
}

function setBoardTitleClickEvent(boardList) {
    const boardTitle = document.querySelectorAll("tbody .content-title span");

    for(let i = 0; i < boardTitle.length; i++) {
        boardTitle[i].onclick = () => loadBoardDetailPage(boardList[i].boardCode);
    }
}

function setBoardContentByBoardType() {
    const boardTypeTile = document.querySelector(".board-type-title");
    const menuLi = document.querySelector(".menu-li");

    if(boardType == "praise") {
        boardTypeTile.textContent = "칭찬합니다";
        document.title = "[위니아에이드] 칭찬합니다";

        menuLi.innerHTML = `
            <p>고객님의 따스한 격려 한마디를 본보기로 삼아 더욱 친절한 서비스를 위해 노력하겠습니다.</p>
            <ul class="menu-li-ul">
                <li>제품 서비스 및 상담 시 고객님께 감동을 주었던 사례나 잘하였던 내용을 올려주십시오.</li>
                <li>게시판 성격에 맞지 않는 게시물은 사전 통보 없이 삭제 및 "고객의 소리 → 불편합니다" 메뉴로 이관됨을 양해 부탁드립니다.</li>
            </ul>
        `;
    }else if(boardType == "suggestion") {
        boardTypeTile.textContent = "제안합니다"
        document.title = "[위니아에이드] 제안합니다"

        menuLi.innerHTML = `
        <p>위니아를 이용하면서 느꼈던 여러 사항들에 대해 고객님의 의견을 올려주십시오.</p>
        <p>항상 고객님의 소리에 귀 기울이겠습니다.<p>
        <ul class="menu-li-ul">
            <li>게시된 내용은 공개로 처리가 되며 본인이 게시한 내용 조회 및 진행사항을 확인하실 수 있습니다.</li>
        </ul>
    `;
    }
}

function setBoardTableByBoardType() {
    if(boardType != "praise") {
        const tableHead = document.querySelector(".content-table-head");

        tableHead.innerHTML = `
            <tr>
                <th class="company-name">접수 대상 브랜드</th>
                <th class="content-title">제목</th>
                <th class="progress-status">진행상태</th>
                <th class="content-name">작성자</th>
                <th class="content-date">등록일</th>
            </tr>
        `;
    }
}

function getSelectedOptionValue() {
    const searchTypeSelect = document.querySelector(".select-btn");

    return searchType = searchTypeSelect.options[searchTypeSelect.selectedIndex].value;
}

function getSearchKeyword() {
    return searchKeyword.value;
}

function clearDomObject(domObject){
    domObject.innerHTML="";
}

function loadBoardDetailPage(boardCode) {
    setPageInfoLocalStorage();

    localStorage.locationInfo = "board";

    if(checkNonMemberViewPage()) {
        location.href = `/customer/praise/non-member/detail/${boardCode}`;

    }else {
        location.href = `/customer/${boardType}/detail/${boardCode}`;

    }

}

function loadBoardWritePage() {
    location.href = `/customer/${boardType}/regist-view`;
}

function loadWritingHistoryPage() {
    location.href = `/mypage/writing/customer`;
}


function setPageInfoLocalStorage() {
    let searchType = getSelectedOptionValue();
    let keyword = getSearchKeyword();
    
    let boardPageInfoObject = {
        "searchType": searchType,
        "keyword": keyword,
        "page": nowPage
    };

    localStorage.boardPageInfo = JSON.stringify(boardPageInfoObject);
}

function getLocalStorageData() {
    let pageHistory = localStorage.boardPageInfo;

    if(pageHistory != null) {
        return pageHistory;
    }else {
        return null;
    }
}

function loadPageHistoryByLocalStorage() {
    let localStorageData = getLocalStorageData();
    if(localStorageData != null) {
        const selectOptionItems = document.querySelectorAll(".select-btn option");

        localStorageData = JSON.parse(localStorageData);
    
        selectOptionItems.forEach(option => {
            if(option.value == localStorageData.searchType) {
                option.setAttribute("selected", true);
            }
        });
        searchKeyword.value = localStorageData.keyword;
        nowPage = localStorageData.page;
        
        localStorage.removeItem("boardPageInfo");
    }
}

function checkNonMemberViewPage() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "non-member";
}
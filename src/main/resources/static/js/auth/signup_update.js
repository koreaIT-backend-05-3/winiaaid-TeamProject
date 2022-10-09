const signupButton = document.querySelector(".signup-button")
const signupStep3Table = document.querySelector(".signup-step3-table");









function signupLastFom() {

    if(userInfo != null){
        userInfo = JSON.parse(userInfo);

        const userInfo = localStorage.userInfoObject
    } 

    console.log(userInfo);
    signupStep3Table.innerHTML = `
                                <tr>
                                    <th scope="row">
                                        <span class="essential">이름</span></th>
                                    <td>${userInfo.userName}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><span class="">성별</span></th>
                                    <td>${userInfo.userGender}</td>  
                                </tr>
                                <tr>
                                    <th scope="row"><span class="essential">생년월일</span></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <span class="essential"><label for="username">아이디</label></span>
                                    </th>
                                    <td class="user-id-div">
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <span class="essential">비밀번호</span>
                                    </th>
                                    <td>
                                       
                                    </td>
                                </tr>
                               
                                <tr>
                                    <th scope="row">
                                        <span class="essential">주소</span>
                                    </th>
                                    <td>
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <th class="row">
                                        <span>일반전화</span>
                                    </th>
                                    <td>
                                     
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <span class="essential">휴대전화</span>
                                    </th>
                                    <td>
                                     
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <span class="essential">이메일</span>
                                    </th>
                                    <td>
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <span class="">수신동의</span>
                                    </th>
                                    <td>
                                        <ul>
                                            <li>
                                                <strong>메일 수신</strong>
                                  
                                                <label for="email-receive">위니아 브랜드사이트</label>
                                            </li>
                                            <li>
                                                <strong>SMS 수신</strong>
                                               
                                                <label for="dm3">위니아 브랜드사이트</label>
                                            </li>
                                            <li>
                                                <strong>우편물 수신</strong>
                                              
                                                <label for="mail-receive">위니아 브랜드사이트</label>
                                            </li>
                                        </ul>
                                        <p class="email-guide">※ 이메일, SMS, 우편물 수신에 동의하시면 제품 문의에 대한 답변 및 위니아에서 제공하는 다양한 혜택을 알려드리는 뉴스레터, 이벤트 정보를 받아보실 수 있습니다.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <span class="">그룹사명</span>
                                    </th>
                                    <td>
                                        그룹사명
                                </td>
                                <tr>
                                    <th class="row">
                                        <span>임직원 사번</span>
                                    </th>
                                    <td>	
                                       임직원사번
                                    </td>
                                </tr>

`


    
}

signupLastFom;





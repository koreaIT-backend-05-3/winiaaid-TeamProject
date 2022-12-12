window.onload = () => {
    UserLoader.getInstance().setUserList();
}

class UserLoader {
    static #instance = null;

    userList = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserLoader();
        }

        return this.#instance;
    }

    setUserList() {
        const tbody = document.querySelector("tbody");

        const userList = this.loadUserList();

        if(userList != null) {
            this.clearDomObject(tbody);
            userList.forEach(user => {
                tbody.innerHTML += `
                    <tr>
                        <td>${user.userName}</td>
                        <td>${user.userId}</td>
                        <td>${user.createDateToString}</td>
                        <td>${user.mainPhoneNumber}</td>
                        <td>${user.userEmail}</td>
                        <td><button class="withdrawal-button" type="button">탈퇴</button></td>
                    </tr>
                `;
            })

            UserRemover.getInstance();
            
        }else {
            tbody.innerHTML += `
                <tr>
                    <td colspan="6">회원이 존재하지 않습니다.</td>
                </tr>
        `;

        }
    }

    loadUserList() {
        let userList = null;

        $.ajax({
            async: false,
            type: "get",
            url: `/api/v1/manager/user/list`,
            dataType: "json",
            success: (response) => {
                userList = response.data;
            },
            error: (request, status, error) => {
                console.log(request.status);
                console.log(request.responseText);
                console.log(error);
            }
        })

        return userList;
    }

    clearDomObject(domObject) {
        domObject.innerHTML = "";
    }
}

class UserRemover {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserRemover();
        }

        return this.#instance;
    }

    constructor() {
        this.setUserWithdrawalButtonClickEvent();
    }

    setUserWithdrawalButtonClickEvent() {
        const withdrawalButtonItems = document.querySelectorAll(".withdrawal-button");
        const userList = UserLoader.getInstance().userList;

        withdrawalButtonItems.forEach((button, index) => {
            button.onclick = () => this.withdrawalUser(userList[index]);
        })
    }

    withdrawalUser(user) {
        if(confirm("해당 회원을 탈퇴합니다.")) {
            $.ajax({
                async: false,
                type: "delete",
                url: `/api/v1/manager/user/${user.userCode}`,
                dataType: "json",
                success: (response) => {
                    if(response.data) {
                        alert("회원 삭제 완료");
                        location.replace("/manager/member");
                    }
                },
                error: (request, status, error) => {
                    console.log(request.status);
                    console.log(request.responseText);
                    console.log(error);
                }
            })
        }
    }
}
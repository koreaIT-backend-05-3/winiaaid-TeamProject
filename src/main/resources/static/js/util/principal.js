let user = getUser();
let userCode = setUserCode();


function getUser() {
    let user = null;
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/auth/principal`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                user = response.data;
            }
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    });

    return user;
}

function setUserCode() {
    let userCode = 0;
    if(user != null) {
        userCode = user.userCode;
    }

    return userCode;
}
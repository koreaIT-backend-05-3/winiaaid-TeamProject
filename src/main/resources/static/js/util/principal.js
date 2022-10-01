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
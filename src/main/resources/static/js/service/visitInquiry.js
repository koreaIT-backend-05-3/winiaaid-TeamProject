let userCode = 0;

let repairData = getRepairServiceHistory(userCode);

function getRepairServiceHistory(userCode) {
    let repairData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/service/repair/history",
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                repairData = response.data
            }
        },
        error: errorMessage
    });

    return repairData;
}
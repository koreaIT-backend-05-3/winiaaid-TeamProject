function modifyReservationService(repairServiceCode) {
    location.href = `/service/visit/request/updateView/${repairServiceCode}`;
}

function cancelReservationService(repairServiceCode) {
    if(confirm("약속일자, 시간, 엔지니어 변경은 '예약변경'에서 가능합니다.\n서비스 예약을 취소하시겠습니까?")) {
        $.ajax({
            type: "put",
            url: `/api/v1/service/repair/cancel/${repairServiceCode}`,
            dataType: "json",
            success: (response) => {
                if(response.data) {
                    alert("접수 내역을 취소하였습니다.");
                    location.href = "/service/visit/inquiry";
                }else {
                    alert("접수 내역 취소 실퍠");
                }
            },
            error: errorMessage
        });
    }
}
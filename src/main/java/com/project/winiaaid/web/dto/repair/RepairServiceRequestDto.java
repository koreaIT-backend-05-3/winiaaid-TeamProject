package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.RepairServiceInfo;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RepairServiceRequestDto {
    private ProductInfoDto productInfoObject;
    private UserInfoDto userInfoObject;
    private ReservationInfoDto reservationInfoObject;

    public RepairServiceInfo toRepairServiceInfoEntity(LocalDateTime reservation_date) {
        return RepairServiceInfo.builder()
                .productInfoEntity(productInfoObject.toProductInfoEntity())
                .userInfoEntity(userInfoObject.toUserInfoEntity())
                .reservationInfoEntity(reservationInfoObject.toReservationEntity(reservation_date))
                .build();
    }
}
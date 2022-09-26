package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RepairServiceRequestDto {
    private RepairProductInfoDto productInfoObject;
    private RepairUserInfoDto userInfoObject;
    private RepairReservationInfoDto reservationInfoObject;

    public ServiceInfo toServiceInfoEntity(LocalDateTime reservationDate) {
        return ServiceInfo.builder()
                .productInfoEntity(productInfoObject.toProductInfoEntity())
                .userInfoEntity(userInfoObject.toUserInfoEntity())
                .reservationInfoEntity(reservationInfoObject.toReservationEntity(reservationDate))
                .build();
    }
}

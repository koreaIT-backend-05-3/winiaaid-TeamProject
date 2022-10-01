package com.project.winiaaid.web.dto.requestInfo;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 강사님께 여쭤보고 삭제
@Data
@NoArgsConstructor
public class ServiceRequestDto {
    private ProductInfoDto productInfoObject;
    private UserInfoDto userInfoObject;
    private ReservationInfoDto reservationInfoObject;

    public ServiceInfo toServiceInfoEntity(LocalDateTime reservationDate) {
        return ServiceInfo.builder()
                .productInfoEntity(productInfoObject.toProductInfoEntity())
                .userInfoEntity(userInfoObject.toUserInfoEntity())
                .reservationInfoEntity(reservationInfoObject.toReservationEntity(reservationDate))
                .build();
    }
}
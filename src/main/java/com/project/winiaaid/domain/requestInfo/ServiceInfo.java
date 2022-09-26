package com.project.winiaaid.domain.requestInfo;

import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceInfo {
    private ProductInfoEntity productInfoEntity;
    private UserInfoEntity userInfoEntity;
    private ReservationInfoEntity reservationInfoEntity;

    public ReadServiceInfoResponseDto toServiceResponseDto() {
        return ReadServiceInfoResponseDto.builder()
                .productInfo(productInfoEntity.toProductInfoDto())
                .userInfo(userInfoEntity.toUserInfoDto())
                .reservationInfo(reservationInfoEntity.toReservationInfoDto())
                .build();
    }
}

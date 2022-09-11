package com.project.winiaaid.domain.repair;

import com.project.winiaaid.web.dto.repair.ProductInfoDto;
import com.project.winiaaid.web.dto.repair.RepairServiceResponseDto;
import com.project.winiaaid.web.dto.repair.ReservationInfoDto;
import com.project.winiaaid.web.dto.repair.UserInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepairServiceInfo {
    private ProductInfoEntity productInfoEntity;
    private UserInfoEntity userInfoEntity;
    private ReservationInfoEntity reservationInfoEntity;

    public RepairServiceResponseDto toRepairServiceResponseDto() {
        return RepairServiceResponseDto.builder()
                .productInfo(productInfoEntity.toProductInfoDto())
                .userInfo(userInfoEntity.toUserInfoDto())
                .reservationInfo(reservationInfoEntity.toReservationInfoDto())
                .build();
    }
}

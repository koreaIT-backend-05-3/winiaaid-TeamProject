package com.project.winiaaid.domain.repair;

import com.project.winiaaid.web.dto.repair.ProductInfoDto;
import com.project.winiaaid.web.dto.repair.ReservationInfoDto;
import com.project.winiaaid.web.dto.repair.UserInfoDto;

import lombok.Data;

@Data
public class RepairServiceInfo {
    private ProductInfoDto productInfoEntity;
    private UserInfoDto userInfoOEntity;
    private ReservationInfoDto reservationInfoEntity;
}

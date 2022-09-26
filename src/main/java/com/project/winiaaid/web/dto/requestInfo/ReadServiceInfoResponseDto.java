package com.project.winiaaid.web.dto.requestInfo;

import com.project.winiaaid.web.dto.requestInfo.ProductInfoDto;
import com.project.winiaaid.web.dto.requestInfo.ReservationInfoDto;
import com.project.winiaaid.web.dto.requestInfo.UserInfoDto;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadServiceInfoResponseDto {
    private ProductInfoDto productInfo;
    private UserInfoDto userInfo;
    private ReservationInfoDto reservationInfo;
}
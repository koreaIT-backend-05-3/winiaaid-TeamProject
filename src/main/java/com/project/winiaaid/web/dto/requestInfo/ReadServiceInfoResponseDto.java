package com.project.winiaaid.web.dto.requestInfo;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadServiceInfoResponseDto {
    private ProductInfoDto productInfo;
    private UserInfoDto userInfo;
    private ReservationInfoDto reservationInfo;
}
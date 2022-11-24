package com.project.winiaaid.domain.requestInfo;

import com.project.winiaaid.web.dto.requestInfo.ReservationInfoDto;

public interface ReservationInfoEntity {
    public ReservationInfoDto toReservationInfoDto();
    public boolean isEmpty();
}

package com.project.winiaaid.web.dto.requestInfo;

import com.project.winiaaid.domain.requestInfo.ReservationInfoEntity;

import java.time.LocalDateTime;

public interface ReservationInfoDto {
    public ReservationInfoEntity toReservationEntity(LocalDateTime reservationDate);
}

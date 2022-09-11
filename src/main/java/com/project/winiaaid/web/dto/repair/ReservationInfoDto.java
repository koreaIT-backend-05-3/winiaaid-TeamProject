package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.ReservationInfoEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationInfoDto {
    private int engineerCode;
    private String reservationDay;
    private String reservationTime;
    private String serviceType;

    public ReservationInfoEntity toReservationEntity(LocalDateTime reservation_date) {
        return ReservationInfoEntity.builder()
                .engineer_code(engineerCode)
                .reservation_date(reservation_date)
                .service_type(serviceType)
                .build();
    }
}
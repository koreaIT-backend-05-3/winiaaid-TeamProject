package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.ReservationInfoEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReservationInfoDto {
    private int engineerCode;
    private String engineerName;
    private String reservationDay;
    private String reservationTime;
    private String serviceType;
    private String completedFlag;
    private String requestDate;
    private String reservationDate;
    private String note;


    public ReservationInfoEntity toReservationEntity(LocalDateTime reservation_date) {
        return ReservationInfoEntity.builder()
                .engineer_code(engineerCode)
                .reservation_date(reservation_date)
                .service_type(serviceType)
                .build();
    }
}
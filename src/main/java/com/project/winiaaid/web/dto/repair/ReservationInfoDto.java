package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.ReservationInfoEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationInfoDto {
    private int engineerCode;
    private String engineerName;
    private String reservationDay;
    private String reservationTime;
    private String serviceTypeName;
    private int completedFlag;
    private String requestDate;
    private String reservationDate;
    private int totalCount;


    public ReservationInfoEntity toReservationEntity(LocalDateTime reservation_date) {
        return ReservationInfoEntity.builder()
                .engineer_code(engineerCode)
                .request_date(LocalDateTime.now())
                .reservation_date(reservation_date)
                .service_type_code(2)
                .completed_flag(1)
                .build();
    }
}
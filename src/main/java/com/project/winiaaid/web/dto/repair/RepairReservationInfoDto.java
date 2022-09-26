package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.RepairReservationInfoEntity;

import com.project.winiaaid.domain.requestInfo.ReservationInfoEntity;
import com.project.winiaaid.web.dto.requestInfo.ReservationInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepairReservationInfoDto implements ReservationInfoDto {
    private int engineerCode;
    private String engineerName;
    private String reservationDay;
    private String reservationTime;
    private String serviceTypeName;
    private int progressStatus;
    private String requestDate;
    private String reservationDate;
    private int totalCount;


    public ReservationInfoEntity toReservationEntity(LocalDateTime reservationDate) {
        return RepairReservationInfoEntity.builder()
                .engineer_code(engineerCode)
                .request_date(LocalDateTime.now())
                .reservation_date(reservationDate)
                .service_type_code(2)
                .progress_status(1)
                .build();
    }
}
package com.project.winiaaid.web.dto.engineer;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EngineerReservationInfoDto {
    private int engineerCode;
    private String engineerName;
    private String reservationDay;
    private String reservationTime;
}
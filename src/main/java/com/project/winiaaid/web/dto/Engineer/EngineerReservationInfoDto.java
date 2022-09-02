package com.project.winiaaid.web.dto.Engineer;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class EngineerReservationInfoDto {
    private int engineerCode;
    private String engineerName;
    private String reservationDay;
    private String reservationTime;
}
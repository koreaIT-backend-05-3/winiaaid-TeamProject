package com.project.winiaaid.web.dto.engineer;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ReadEngineerReservationInfoResponseDto {
    private int engineerCode;
    private String engineerName;
    private List<String> reservationDayList;
    private List<String> reservationTimeList;
}
package com.project.winiaaid.web.dto.Engineer;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReadEngineerReservationResponseDto {
    private List<EngineerReservationInfoDto> engineerReservationInfoDtoList;
}
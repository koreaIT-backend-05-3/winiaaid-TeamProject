package com.project.winiaaid.web.dto.Engineer;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ReadEngineerResponseDto {
    private List<EngineerReservationInfoDto> engineerReservationInfoDtoList;
}
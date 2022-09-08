package com.project.winiaaid.web.dto.Engineer;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadEngineerInfoResponseDto {
    private int engineerCode;
    private String engineerName;
}
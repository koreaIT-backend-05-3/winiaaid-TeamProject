package com.project.winiaaid.web.dto.solution;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadSolutionTypeResponseDto {
    private int solutionTypeCode;
    private String solutionName;
}
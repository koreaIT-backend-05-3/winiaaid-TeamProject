package com.project.winiaaid.web.dto.solution;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadSolutionTitleResponseDto {
    private int solutionCode;
    private String solutionTitle;
    private String solutionBoardType;
}
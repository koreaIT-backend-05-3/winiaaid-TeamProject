package com.project.winiaaid.web.dto.manager.solution;

import com.project.winiaaid.web.dto.solution.SolutionFileDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReadSolutionDetailResponseDto {
    private String solutionTitle;
    private String solutionContent;
    private int solutionTypeCode;
    private String solutionBoardType;
    private List<SolutionFileDto> fileList;
}
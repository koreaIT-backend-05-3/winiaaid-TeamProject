package com.project.winiaaid.web.dto.solution;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class ReadSolutionDetailResponseDto {
    private int companyCode;
    private String solutionTitle;
    private String solutionContent;
    private String productCategoryName;
    private String productDetailName;
    private String solutionName;
    private String productGroupName;
    private List<SolutionFileDto> solutionFileList;
    private LocalDateTime createDate;
}
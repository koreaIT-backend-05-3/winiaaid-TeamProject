package com.project.winiaaid.web.dto.solution;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReadSolutionResponseDto {
    private int solutionBoardCode;
    private String productCategoryName;
    private String productDetailName;
    private String solutionTitle;
    private String solutionContent;
    private String solutionName;
    private int totalCount;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
package com.project.winiaaid.web.dto.solution;

import lombok.Data;

@Data
public class ReadSolutionKeywordRequestDto {
    private String keyword;
    private String boardType;
    private int solutionType;
    private String sortType;
}
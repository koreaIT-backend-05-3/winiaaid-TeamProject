package com.project.winiaaid.web.dto.solution;

import lombok.Data;

@Data
public class ReadSolutionRequestDto {
    private String company;
    private String codeType;
    private int keyCode;
    private int solutionType;
    private String sortType;
    private String keyword;
    private int page;
}
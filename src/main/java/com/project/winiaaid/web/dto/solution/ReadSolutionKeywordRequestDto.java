package com.project.winiaaid.web.dto.solution;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReadSolutionKeywordRequestDto {
    private String keyword;
    @JsonProperty("board-type")
    private String boardType;
    @JsonProperty("solution-type")
    private int solutionType;
    @JsonProperty("sort-type")
    private String sortType;
}
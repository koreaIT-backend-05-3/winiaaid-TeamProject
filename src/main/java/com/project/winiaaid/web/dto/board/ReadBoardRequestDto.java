package com.project.winiaaid.web.dto.board;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReadBoardRequestDto {
    @JsonProperty("user")
    private int userCode;
    @JsonProperty("board-type")
    private String boardType;
    private int page;
}
package com.project.winiaaid.web.dto.board;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReadBoardRequestDto {
    private String boardType;
    private int page;
}
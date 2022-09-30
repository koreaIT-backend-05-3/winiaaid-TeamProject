package com.project.winiaaid.web.dto.board;

import lombok.Data;

@Data
public class ReadBoardRequestDto {
    private int userCode;
    private String boardType;
    private String searchType;
    private String keyword;
    private int page;
}
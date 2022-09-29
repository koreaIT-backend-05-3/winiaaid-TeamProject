package com.project.winiaaid.web.dto.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadBoardFileDto {
    private int fileCode;
    private String originalFileName;
    private String tempFileName;
}
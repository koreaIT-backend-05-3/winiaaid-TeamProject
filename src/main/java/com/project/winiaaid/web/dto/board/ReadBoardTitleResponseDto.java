package com.project.winiaaid.web.dto.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadBoardTitleResponseDto {
    private String boardCode;
    private int boardTypeCode;

    private String boardTitle;
    private String boardContent;

    private int userCode;
    private String userName;
    private String companyName;

    private String progressStatus;
    private int totalCount;
    private String createDate;
}
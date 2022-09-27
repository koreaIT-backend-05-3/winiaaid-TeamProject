package com.project.winiaaid.web.dto.history;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadWritingServiceHistoryTitleResponseDto {
    private String companyName;
    private int boardCode;
    private int boardTypeCode;
    private String boardTypeName;
    private String boardTitle;
    private String boardContent;
    private String createDate;
    private int progressStatus;
    private String assessment;
    private int counselTotalCount;
    private int customerTotalCount;
    private int totalCount;
}
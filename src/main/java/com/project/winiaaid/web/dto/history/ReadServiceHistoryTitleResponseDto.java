package com.project.winiaaid.web.dto.history;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadServiceHistoryTitleResponseDto {
    private String serviceCode;
    private String companyName;
    private int serviceTypeCode;
    private String serviceTypeName;
    private String productName;
    private String requestDate;
    private int progressStatus;
    private int completedTotalCount;
    private int incompletedTotalCount;
    private int totalCount;
}
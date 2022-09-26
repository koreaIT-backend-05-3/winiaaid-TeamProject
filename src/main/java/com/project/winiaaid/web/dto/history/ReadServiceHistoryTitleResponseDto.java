package com.project.winiaaid.web.dto.history;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReadServiceHistoryTitleResponseDto {
    private String serviceCode;
    private String serviceTypeName;
    private String productName;
    private LocalDateTime requestDate;
    private String progressStatus;
    private int completedTotalCount;
    private int incompletedTotalCount;
}
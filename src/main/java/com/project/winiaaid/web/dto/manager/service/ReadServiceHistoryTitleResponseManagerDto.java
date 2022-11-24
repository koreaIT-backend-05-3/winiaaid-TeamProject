package com.project.winiaaid.web.dto.manager.service;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadServiceHistoryTitleResponseManagerDto {
    private String serviceCode;
    private String userName;
    private int progressStatusCode;
    private String progressStatus;
    private String modelNumber;
    private String productName;
    private String troubleSymptom;
    private String requestDate;
    private int totalCount;
}
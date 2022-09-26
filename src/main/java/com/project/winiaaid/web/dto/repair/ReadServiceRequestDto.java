package com.project.winiaaid.web.dto.repair;

import lombok.Data;

@Data
public class ReadServiceRequestDto {
    private String serviceType;
    private String requestType;
    private String progressStatus;
    private int page;
}
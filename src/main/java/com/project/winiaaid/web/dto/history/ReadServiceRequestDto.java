package com.project.winiaaid.web.dto.history;

import lombok.Data;

@Data
public class ReadServiceRequestDto {
    private String serviceType;
    private String requestType;
    private String progressStatus;
    private String menuType;
    private String keyword;
    private boolean completedResponse;
    private int page;
}
package com.project.winiaaid.web.dto.requestInfo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServiceRequestResponseDto {
    private String serviceCode;
    private String userName;
}
package com.project.winiaaid.web.dto.repair;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReadServiceRequestDto {
    @JsonProperty("service-type")
    private String serviceType;
    @JsonProperty("request-type")
    private String requestType;
    private int page;
}
package com.project.winiaaid.web.dto.service;

import lombok.Data;

import java.util.Map;

@Data
public class ApplyServiceReqsetDto {
    private Map<String, Object> productInfoMap;
    private Map<String, Object> userInfoMap;
    private Map<String, Object> reservationInfoMap;
}
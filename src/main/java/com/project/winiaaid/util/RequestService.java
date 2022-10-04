package com.project.winiaaid.util;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;

public interface RequestService {
    public ServiceRequestResponseDto buildServiceRequestResponseDto(String userName, String serviceCode) throws Exception;
    public ReadServiceInfoResponseDto changeToRepairServiceResponseDto(ServiceInfo repairServiceInfo) throws Exception;
}
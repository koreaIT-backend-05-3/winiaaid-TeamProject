package com.project.winiaaid.util;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService {

    @Override
    public ServiceRequestResponseDto buildServiceRequestResponseDto(String userName, String serviceCode) throws Exception {
        return ServiceRequestResponseDto.builder()
                .userName(userName)
                .serviceCode(serviceCode)
                .build();
    }

    @Override
    public ReadServiceInfoResponseDto changeToRepairServiceResponseDto(ServiceInfo repairServiceInfo) {
        return repairServiceInfo.toServiceResponseDto();
    }
}
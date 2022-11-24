package com.project.winiaaid.util;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
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
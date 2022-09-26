package com.project.winiaaid.service.history;

import com.project.winiaaid.domain.history.ServiceHistoryRepository;
import com.project.winiaaid.domain.history.ServiceHistoryTitle;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryServiceImpl implements HistoryService {

    private final ConfigMap configMapper;
    private final ServiceHistoryRepository serviceHistoryRepository;

    @Override
    public List<ReadServiceInfoResponseDto> getServiceHistoryInfoByUserCode(int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        List<ServiceInfo> serviceInfoEntityList = null;
        List<ReadServiceInfoResponseDto> serviceResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadHistoryConfigMap(userCode, readServiceRequestDto);

        serviceInfoEntityList = serviceHistoryRepository.findRepairServiceHistoryInfoByUserCode(configMap);

        if(serviceInfoEntityList != null && serviceInfoEntityList.size() != 0) {
            serviceResponseDtoList = changeToServiceResponseDtoList(serviceInfoEntityList);
        }

        return serviceResponseDtoList;
    }

    @Override
    public List<ReadServiceHistoryTitleResponseDto> getServiceHistoryTitleInfoByServiceTypeCode(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        List<ServiceHistoryTitle> serviceHistoryTitleEntityList = null;
        List<ReadServiceHistoryTitleResponseDto> serviceHistoryTitleResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadServiceHistoryTitleConfigMap(serviceType, userCode, readServiceRequestDto);

        serviceHistoryTitleEntityList = serviceHistoryRepository.findServiceHistoryTitleInfoByServiceTypeCode(configMap);

        if(serviceHistoryTitleEntityList != null && serviceHistoryTitleEntityList.size() != 1) {
            serviceHistoryTitleResponseDtoList = changeToServiceHistoryTitleResponseDtoList(serviceHistoryTitleEntityList);
        }

        return serviceHistoryTitleResponseDtoList;
    }

    private List<ReadServiceInfoResponseDto> changeToServiceResponseDtoList(List<ServiceInfo> serviceResponseDtoList) {
        return serviceResponseDtoList.stream()
                .map(ServiceInfo::toServiceResponseDto)
                .collect(Collectors.toList());
    }

    private List<ReadServiceHistoryTitleResponseDto> changeToServiceHistoryTitleResponseDtoList(List<ServiceHistoryTitle> serviceResponseDtoList) {
        return serviceResponseDtoList.stream()
               .map(ServiceHistoryTitle::toReadServiceHistoryTitleResponseDto)
               .collect(Collectors.toList());
    }
}
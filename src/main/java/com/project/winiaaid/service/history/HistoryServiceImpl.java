package com.project.winiaaid.service.history;

import com.project.winiaaid.domain.history.HistoryRepository;
import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.util.ConfigMap;
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
    private final HistoryRepository historyRepository;

    @Override
    public List<ReadServiceInfoResponseDto> getServiceHistoryInfoByUserCode(int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        List<ServiceInfo> serviceInfoEntityList = null;
        List<ReadServiceInfoResponseDto> serviceResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setConfigMap(userCode, readServiceRequestDto);

        serviceInfoEntityList = historyRepository.findServiceHistoryInfoByUserCode(configMap);

        if(serviceInfoEntityList != null && serviceInfoEntityList.size() != 0) {
            serviceResponseDtoList = changeToServiceResponseDtoList(serviceInfoEntityList);
        }

        return serviceResponseDtoList;
    }

    private List<ReadServiceInfoResponseDto> changeToServiceResponseDtoList(List<ServiceInfo> serviceResponseDtoList) {
        return serviceResponseDtoList.stream()
                .map(repairServiceInfo -> repairServiceInfo.toServiceResponseDto())
                .collect(Collectors.toList());
    }
}
package com.project.winiaaid.service.history;

import com.project.winiaaid.domain.history.ServiceHistoryRepository;
import com.project.winiaaid.domain.history.ServiceHistoryTitle;
import com.project.winiaaid.domain.history.WritingServiceHistoryTitle;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import com.project.winiaaid.web.dto.history.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.history.ReadWritingServiceHistoryTitleResponseDto;
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
    public List<ReadServiceHistoryTitleResponseDto> getServiceHistoryInfoListByServiceTypeCode(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        List<ServiceHistoryTitle> serviceHistoryTitleEntityList = null;
        List<ReadServiceHistoryTitleResponseDto> serviceHistoryTitleResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadServiceHistoryListConfigMap(serviceType, userCode, readServiceRequestDto);

        serviceHistoryTitleEntityList = serviceHistoryRepository.findServiceHistoryInfoListByServiceTypeCode(configMap);

        if(serviceHistoryTitleEntityList != null) {
            serviceHistoryTitleResponseDtoList = changeToServiceHistoryTitleResponseDtoList(serviceHistoryTitleEntityList);
        }

        return serviceHistoryTitleResponseDtoList;
    }

    @Override
    public List<ReadWritingServiceHistoryTitleResponseDto> getWritingServiceHistoryInfoListByServiceTypeCode(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception {
        List<WritingServiceHistoryTitle> serviceHistoryTitleEntityList = null;
        List<ReadWritingServiceHistoryTitleResponseDto> serviceHistoryTitleResponseDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadWritingServiceHistoryListConfigMap(serviceType, userCode, readServiceRequestDto);

        serviceHistoryTitleEntityList = serviceHistoryRepository.findWritingServiceHistoryInfoListByServiceTypeCode(configMap);

        if(serviceHistoryTitleEntityList != null && serviceHistoryTitleEntityList.size() != 1) {
            serviceHistoryTitleResponseDtoList = changeTodWritingServiceHistoryTitleResponseDto(serviceHistoryTitleEntityList);
        }

        return serviceHistoryTitleResponseDtoList;
    }

    private List<ReadServiceHistoryTitleResponseDto> changeToServiceHistoryTitleResponseDtoList(List<ServiceHistoryTitle> serviceResponseDtoList) {
        return serviceResponseDtoList.stream()
               .map(ServiceHistoryTitle::toReadServiceHistoryTitleResponseDto)
               .collect(Collectors.toList());
    }

    private List<ReadWritingServiceHistoryTitleResponseDto> changeTodWritingServiceHistoryTitleResponseDto(List<WritingServiceHistoryTitle> writingServiceHistoryTitleList) {
        return writingServiceHistoryTitleList.stream()
                .map(WritingServiceHistoryTitle::toReadWritingServiceHistoryTitleDto)
                .collect(Collectors.toList());
    }
}
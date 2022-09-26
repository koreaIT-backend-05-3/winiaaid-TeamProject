package com.project.winiaaid.service.history;

import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;

import java.util.List;

public interface HistoryService {
    public List<ReadServiceInfoResponseDto> getServiceHistoryInfoByUserCode(int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
    public List<ReadServiceHistoryTitleResponseDto> getServiceHistoryTitleInfoByServiceTypeCode(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
}

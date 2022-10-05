package com.project.winiaaid.service.history;

import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import com.project.winiaaid.web.dto.history.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.history.ReadWritingServiceHistoryTitleResponseDto;

import java.util.List;

public interface HistoryService {
    public List<ReadServiceHistoryTitleResponseDto> getServiceHistoryInfoListByServiceTypeCode(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
    public List<ReadWritingServiceHistoryTitleResponseDto> getWritingServiceHistoryInfoListByServiceTypeCode(String serviceType, int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
    public int getNonMemberServiceCodeTypeByServiceCodeAndUserName(String serviceCode, String userName) throws Exception;
}
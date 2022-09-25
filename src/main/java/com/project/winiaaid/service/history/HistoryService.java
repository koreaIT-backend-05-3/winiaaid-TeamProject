package com.project.winiaaid.service.history;

import com.project.winiaaid.web.dto.repair.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;

import java.util.List;

public interface HistoryService {
    public List<ReadServiceInfoResponseDto> getServiceHistoryInfoByUserCode(int userCode, ReadServiceRequestDto readServiceRequestDto) throws Exception;
}

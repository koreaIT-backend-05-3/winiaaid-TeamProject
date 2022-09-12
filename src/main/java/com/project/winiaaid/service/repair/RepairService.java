package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.repair.RepairServiceResponseDto;

import java.util.List;

public interface RepairService {
    public boolean addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception;
    public List<RepairServiceResponseDto> getRepairServiceByUserCode(String type, int userCode, String company, int page) throws Exception;
}
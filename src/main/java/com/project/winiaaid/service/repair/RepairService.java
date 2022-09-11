package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;

public interface RepairService {
    public boolean addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception;
    public RepairServiceInfo getRepariServiceByUserCode() throws Exception;
}
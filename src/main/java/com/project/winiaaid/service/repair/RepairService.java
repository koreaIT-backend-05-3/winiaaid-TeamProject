package com.project.winiaaid.service.repair;

import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.repair.RepairServiceResponseDto;

import java.util.List;

public interface RepairService {
    public boolean addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception;
    public List<RepairServiceResponseDto> getRepairServiceHistoryInfoByUserCode(String type, int userCode, int page) throws Exception;
    public RepairServiceResponseDto getRepairServiceDetailHistoryInfo(String repairServiceCode) throws Exception;
    public List<AddressResponseDto> getPastReceptionAddressListByUserCode(int userCode, int page) throws Exception;
    public boolean cancelRepairServiceByRepairServiceCode(String repairServiceCode) throws Exception;
}
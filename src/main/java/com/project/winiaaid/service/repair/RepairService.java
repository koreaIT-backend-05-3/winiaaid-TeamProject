package com.project.winiaaid.service.repair;

import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.repair.ReadServiceInfoResponseDto;

import java.util.List;

public interface RepairService {
    public String addRepairServiceRequest(RepairServiceRequestDto applyServiceRequestDto) throws Exception;
    public ReadServiceInfoResponseDto getRepairServiceDetailHistoryInfo(String repairServiceCode) throws Exception;
    public List<AddressResponseDto> getPastReceptionAddressListByUserCode(int userCode, int page) throws Exception;
    public String modifyRepairReservationInfoByRepairServiceCode(RepairServiceRequestDto repairServiceRequestDto) throws Exception;
    public boolean cancelRepairServiceByRepairServiceCode(String repairServiceCode) throws Exception;
}
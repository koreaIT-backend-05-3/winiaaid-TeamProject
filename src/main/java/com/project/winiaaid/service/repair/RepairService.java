package com.project.winiaaid.service.repair;

import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;

import java.util.List;

public interface RepairService {
    public String addRepairServiceRequest(RepairServiceRequestDto repairServiceRequestDto) throws Exception;
    public List<ReadServiceInfoResponseDto> getServiceHistoryDetailInfoListByUserCode(int userCode, int page) throws Exception;
    public ReadServiceInfoResponseDto getRepairServiceDetailHistoryInfo(String serviceCode, int userCode) throws Exception;
    public List<AddressResponseDto> getPastReceptionAddressListByUserCode(int userCode, int page) throws Exception;
    public String modifyRepairReservationInfoByRepairServiceCode(RepairServiceRequestDto repairServiceRequestDto) throws Exception;
    public boolean cancelRepairServiceByRepairServiceCode(String repairServiceCode) throws Exception;
}
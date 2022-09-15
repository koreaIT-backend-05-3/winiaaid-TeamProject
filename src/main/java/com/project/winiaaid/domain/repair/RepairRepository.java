package com.project.winiaaid.domain.repair;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RepairRepository {
    public int addRepairServiceRequest(RepairServiceInfo repairServiceInfo) throws Exception;
    public List<RepairServiceInfo> findRepairServiceByUserCode(Map<String, Object> config_map) throws Exception;
    public RepairServiceInfo findRepairServiceDetailHistoryInfo(String repair_service_code) throws Exception;
    public List<Address> findPastReceptionAddressListByUserCode(Map<String, Object> config_map) throws Exception;
}
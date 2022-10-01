package com.project.winiaaid.domain.repair;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RepairRepository {
    public int addRepairServiceRequest(ServiceInfo repairServiceInfo) throws Exception;
    public RepairServiceCode findRepairServiceCode(Map<String, Object> config_map) throws Exception;
    public List<ServiceInfo> findRepairServiceHistoryDetailInfoListByUserCode(Map<String, Object> config_map) throws Exception;
    public ServiceInfo findRepairServiceDetailHistoryInfo(String service_code) throws Exception;
    public List<Address> findPastReceptionAddressListByUserCode(Map<String, Object> config_map) throws Exception;
    public int updateRepairReservationInfoByRepairServiceCode(ServiceInfo repairServiceInfo) throws Exception;
    public int cancelRepairServiceByRepairServiceCode(String repair_service_code) throws Exception;
}
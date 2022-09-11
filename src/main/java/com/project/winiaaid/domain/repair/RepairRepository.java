package com.project.winiaaid.domain.repair;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RepairRepository {
    public int addRepairServiceRequest(RepairServiceInfo repairServiceInfo) throws Exception;
    public RepairServiceInfo findRepariServiceByUserCode() throws Exception;
}
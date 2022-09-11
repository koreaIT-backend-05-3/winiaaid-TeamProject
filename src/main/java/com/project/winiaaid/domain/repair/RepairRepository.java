package com.project.winiaaid.domain.repair;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RepairRepository {
    public int addRepairServiceRequest(RepairServiceInfo repairServiceInfo) throws Exception;
    public List<RepairServiceInfo> findRepairServiceByUserCode(int user_code) throws Exception;
}
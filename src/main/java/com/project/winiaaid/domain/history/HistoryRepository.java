package com.project.winiaaid.domain.history;

import com.project.winiaaid.domain.repair.ServiceInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface HistoryRepository {
    public List<ServiceInfo> findServiceHistoryInfoByUserCode(Map<String, Object> config_map) throws Exception;
}
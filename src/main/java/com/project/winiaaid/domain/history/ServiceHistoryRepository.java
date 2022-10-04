package com.project.winiaaid.domain.history;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ServiceHistoryRepository {
    public List<ServiceHistoryTitle> findServiceHistoryInfoListByServiceTypeCode(Map<String, Object> config_map) throws Exception;
    public List<WritingServiceHistoryTitle> findWritingServiceHistoryInfoListByServiceTypeCode(Map<String, Object> config_map) throws Exception;
    public int findNonMemberRequestDetailInfoByServiceCodnAndUserName(Map<String, Object> config_map) throws Exception;
}
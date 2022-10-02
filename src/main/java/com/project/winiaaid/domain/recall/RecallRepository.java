package com.project.winiaaid.domain.recall;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface RecallRepository {
	public int addRecallRequest(ServiceInfo recallServiceInfo) throws Exception;
	public RecallServiceCode findServiceCode(Map<String, Object> config_map) throws Exception;
	public ServiceInfo getRecallRequest(Map<String, Object> config_map) throws Exception;
	public List<ServiceInfo> getRecallRequestList(Map<String, Object> config_map) throws Exception;
	public int updateCancelRecallRequest(String service_code) throws Exception;
}

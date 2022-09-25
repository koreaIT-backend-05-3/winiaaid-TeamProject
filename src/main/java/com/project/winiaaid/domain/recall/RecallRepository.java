package com.project.winiaaid.domain.recall;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface RecallRepository {
	public int addRecallRequest(Recall recall) throws Exception;
	public RecallServiceCode findServiceCode(Map<String, Object> config_map) throws Exception;
	public Recall getRecallRequest(Map<String, Object> config_map) throws Exception;
}

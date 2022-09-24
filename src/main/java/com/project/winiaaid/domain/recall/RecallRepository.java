package com.project.winiaaid.domain.recall;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecallRepository {
	public int addRecallRequest(Recall recall) throws Exception;
	public Recall getRecallRequest(Map<String, Object> map) throws Exception;
}

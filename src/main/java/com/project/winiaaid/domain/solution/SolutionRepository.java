package com.project.winiaaid.domain.solution;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SolutionRepository {
    public List<Solution> findSolutionListByProductCode(Map<String, Object> confing_map) throws Exception;
}
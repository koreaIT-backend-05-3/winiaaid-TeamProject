package com.project.winiaaid.domain.solution;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SolutionRepository {
    public List<Solution> findAllSolutionListByCompanyCode(Map<String, Object> config_map) throws Exception;
    public List<Solution> findSolutionListByProductCategoryCode(Map<String, Object> confing_map) throws Exception;
    public List<Solution> findSolutionListByProductGroupCode(Map<String, Object> confing_map) throws Exception;
    public List<Solution> findSolutionListByProductCode(Map<String, Object> confing_map) throws Exception;
}
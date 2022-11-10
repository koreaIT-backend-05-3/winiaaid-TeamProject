package com.project.winiaaid.domain.solution;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SolutionRepository {
    public List<Solution> findAllSolutionListByCompanyCodeAndKeyword(Map<String, Object> config_map) throws Exception;
    public List<Solution> findSolutionListByKeyCodeAndKeyword(Map<String, Object> confing_map) throws Exception;
    public Solution findSolutionDetailBySolutionBoardCode(int solution_board_code) throws Exception;
    public List<SolutionType> findAllSolutionTypeList() throws Exception;
    public List<SolutionTitle> findAllSolutionTitleListBySolutionBoardType(int solution_board_type) throws Exception;
    public int updateViewCountBySolutionBoardCode(int solution_board_code) throws Exception;
}
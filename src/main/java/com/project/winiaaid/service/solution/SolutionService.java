package com.project.winiaaid.service.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;

import java.util.List;

public interface SolutionService {
    public List<ReadSolutionResponseDto> getAllSolutionListByCompany(String company, String boardType) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByProductCategoryCode(int productCategoryCode, String boardType, int solutionType) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByProductCode(int productCode, String boardType, int solutionType) throws Exception;
}
package com.project.winiaaid.service.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;

import java.util.List;

public interface SolutionService {
    public List<ReadSolutionResponseDto> getSolutionListByProductCode(int productCode, String type) throws Exception;
}
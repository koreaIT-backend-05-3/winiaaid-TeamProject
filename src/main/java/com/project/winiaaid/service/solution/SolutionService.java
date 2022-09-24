package com.project.winiaaid.service.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;

import java.util.List;

public interface SolutionService {
    public List<ReadSolutionResponseDto> getAllSolutionListByCompanyAndKeyword(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByProductCategoryCodeAndKeyword(int productCategoryCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByProductGroupCodeAndKeyword(int productGroupCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByProductCodeAndKeyword(int productCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDtoe) throws Exception;
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionBoardCode(int solutionBoardCode, String solutionBoardType) throws Exception;
    public boolean updateViewCountBySolutionBoardCode(int solutionBoardCode) throws Exception;
}
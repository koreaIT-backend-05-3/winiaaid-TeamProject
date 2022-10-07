package com.project.winiaaid.service.solution;

import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;

import java.util.List;

public interface SolutionService {
    public List<ReadSolutionResponseDto> getAllSolutionListByCompanyAndKeyword(String company, String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByKeyCodeAndKeyword(String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception;
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionBoardCode(String solutionBoardType, int solutionBoardCode) throws Exception;
    public boolean updateViewCountBySolutionBoardCode(int solutionBoardCode) throws Exception;
}
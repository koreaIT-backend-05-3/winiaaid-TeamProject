package com.project.winiaaid.service.solution;

import com.project.winiaaid.web.dto.solution.*;

import java.util.List;

public interface SolutionService {
    public List<ReadSolutionResponseDto> getAllSolutionListByCompanyAndKeyword(String company, String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception;
    public List<ReadSolutionResponseDto> getSolutionListByKeyCodeAndKeyword(String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception;
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionBoardCode(int solutionBoardCode) throws Exception;
    public List<ReadSolutionTypeResponseDto> getAllSolutionTypeList() throws Exception;
    public List<ReadSolutionTitleResponseDto> getSolutionTitleListBySolutionBoard(String boardType) throws Exception;
    public boolean updateViewCountBySolutionBoardCode(int solutionBoardCode) throws Exception;
}
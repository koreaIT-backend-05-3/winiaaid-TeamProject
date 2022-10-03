package com.project.winiaaid.service.solution;

import com.project.winiaaid.domain.solution.Solution;
import com.project.winiaaid.domain.solution.SolutionRepository;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SolutionServiceImpl implements SolutionService{
    private final SolutionRepository solutionRepository;

    private final ConfigMap configMapper;

    @Override
    public List<ReadSolutionResponseDto> getAllSolutionListByCompanyAndKeyword(String company, String boardType, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadSolutionListByCompanyConfigMap(company, boardType, readSolutionKeywordRequestDto);

        solutionEntityList = solutionRepository.findAllSolutionListByCompanyCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Override
    public List<ReadSolutionResponseDto> getSolutionListByProductCategoryCodeAndKeyword(String boardType, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadSolutionListByKeyCodeConfigMap(boardType, readSolutionKeywordRequestDto);

        log.info("configMap: {}", configMap);

        solutionEntityList = solutionRepository.findSolutionListByKeyCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Log
    @Override
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionBoardCode(String solutionBoardType, int solutionBoardCode) throws Exception {
        Solution solutionEntity = null;
        ReadSolutionDetailResponseDto solutionDto = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadSolutionDetailConfigMap(solutionBoardType, solutionBoardCode);

        log.info("configMap: {}", configMap);

        solutionEntity = solutionRepository.findSolutionDetailBySolutionBoardCode(configMap);

        if(solutionEntity != null){
            solutionDto = changeToReadSolutionDetailResponseDto(solutionEntity);
        }

        return solutionDto;
    }

    @Override
    public boolean updateViewCountBySolutionBoardCode(int solutionBoardCode) throws Exception {
        return solutionRepository.updateViewCountBySolutionBoardCode(solutionBoardCode) > 0;
    }

    private List<ReadSolutionResponseDto> changeToReadSolutionResponseDtoList(List<Solution> solutionList) {
        return solutionList.stream()
                .map(Solution::toReadSolutionResponseDto)
                .collect(Collectors.toList());
    }

    private ReadSolutionDetailResponseDto changeToReadSolutionDetailResponseDto(Solution solutionEntity) {
        return solutionEntity.toReadSolutionDetailResponseDto();
    }
}
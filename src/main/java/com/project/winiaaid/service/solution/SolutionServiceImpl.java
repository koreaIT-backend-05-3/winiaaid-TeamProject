package com.project.winiaaid.service.solution;

import com.project.winiaaid.domain.solution.Solution;
import com.project.winiaaid.domain.solution.SolutionRepository;
import com.project.winiaaid.domain.solution.SolutionType;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionTypeResponseDto;
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
    public List<ReadSolutionResponseDto> getAllSolutionListByCompanyAndKeyword(String company, String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadSolutionListByCompanyConfigMap(company, boardType, readSolutionRequestDto);

        solutionEntityList = solutionRepository.findAllSolutionListByCompanyCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Override
    public List<ReadSolutionResponseDto> getSolutionListByKeyCodeAndKeyword(String boardType, ReadSolutionRequestDto readSolutionRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadSolutionListByKeyCodeConfigMap(boardType, readSolutionRequestDto);

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
    public List<ReadSolutionTypeResponseDto> getAllSolutionTypeList() throws Exception {
        List<SolutionType> solutionTypeList = null;
        List<ReadSolutionTypeResponseDto> readSolutionTypeResponseDtos = null;

        solutionTypeList = solutionRepository.findAllSolutionTypeList();

        if(solutionTypeList != null && solutionTypeList.size() > 0){
            readSolutionTypeResponseDtos = changeToReadSolutionTypeResponseDto(solutionTypeList);
        }

        return readSolutionTypeResponseDtos;
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

    private List<ReadSolutionTypeResponseDto> changeToReadSolutionTypeResponseDto(List<SolutionType> solutionTypeList) {
        return solutionTypeList.stream()
                .map(SolutionType::toReadSolutionTypeResponseDto)
                .collect(Collectors.toList());
    }
}
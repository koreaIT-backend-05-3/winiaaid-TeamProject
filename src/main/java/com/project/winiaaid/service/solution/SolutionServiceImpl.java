package com.project.winiaaid.service.solution;

import com.project.winiaaid.domain.solution.Solution;
import com.project.winiaaid.domain.solution.SolutionRepository;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public List<ReadSolutionResponseDto> getAllSolutionListByCompanyAndKeyword(String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setConfigMap(company, readSolutionKeywordRequestDto);

        solutionEntityList = solutionRepository.findAllSolutionListByCompanyCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Override
    public List<ReadSolutionResponseDto> getSolutionListByProductCategoryCodeAndKeyword(int productCategoryCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setConfigMap(productCategoryCode,readSolutionKeywordRequestDto);

        solutionEntityList = solutionRepository.findSolutionListByProductCategoryCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Override
    public List<ReadSolutionResponseDto> getSolutionListByProductGroupCodeAndKeyword(int productGroupCode, String company, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setConfigMap(productGroupCode, company, readSolutionKeywordRequestDto);

        solutionEntityList = solutionRepository.findSolutionListByProductGroupCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Override
    public List<ReadSolutionResponseDto> getSolutionListByProductCodeAndKeyword(int productCode, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setConfigMap(productCode, readSolutionKeywordRequestDto);

        solutionEntityList = solutionRepository.findSolutionListByProductCodeAndKeyword(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    @Override
    public ReadSolutionDetailResponseDto getSolutionDetailBySolutionBoardCode(int solutionBoardCode) throws Exception {
        Solution solutionEntity = null;
        ReadSolutionDetailResponseDto solutionDto = null;

        solutionEntity = solutionRepository.findSolutionDetailBySolutionBoardCode(solutionBoardCode);

        if(solutionEntity != null){
            solutionDto = changeToReadSolutionDetailResponseDto(solutionEntity);
        }

        return solutionDto;
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
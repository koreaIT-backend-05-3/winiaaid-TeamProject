package com.project.winiaaid.service.solution;

import com.project.winiaaid.domain.solution.Solution;
import com.project.winiaaid.domain.solution.SolutionRepository;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SolutionServiceImpl implements SolutionService{
    private final SolutionRepository solutionRepository;

    @Override
    public List<ReadSolutionResponseDto> getSolutionListByProductCode(int productCode, String type) throws Exception {
        List<Solution> solutionEntityList = null;
        List<ReadSolutionResponseDto> readSolutionDtoList = null;
        Map<String, Object> configMap = null;

        configMap = setConfigMap(productCode, type);

        solutionEntityList = solutionRepository.findSolutionListByProductCode(configMap);

        if(solutionEntityList != null && solutionEntityList.size() > 0){
            readSolutionDtoList = changeToReadSolutionResponseDtoList(solutionEntityList);
        }

        return readSolutionDtoList;
    }

    private Map<String, Object> setConfigMap(int productCode, String type) {
        Map<String, Object> configMap = new HashMap<>();

        configMap.put("product_code", productCode);
        configMap.put("type", type.equals("faq") ? 1 : 2);

        return configMap;
    }

    private List<ReadSolutionResponseDto> changeToReadSolutionResponseDtoList(List<Solution> solutionList) {
        return solutionList.stream()
                .map(Solution::toReadSolutionResponseDto)
                .collect(Collectors.toList());
    }
}